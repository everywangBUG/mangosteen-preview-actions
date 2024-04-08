import React, { useState } from 'react'
import useSWR from 'swr'
import { TopNav } from '../components/TopNav'
import { TopTimeBar } from '../components/TopTimeBar'
import { Gradient } from '../components/Gradient'
import type { TimeRange } from '../components/TopTimeBar'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'
import { BackIcon } from '../components/BackIcon'
import { useAjax } from '../lib/ajax'
import type { Time } from '../lib/time'
import { time } from '../lib/time'

interface GroupHappenAt {
  groups: { happen_at: string; amount: number }[]
  total: number
}

interface GroupTag {
  amount: number
  tag: Tag
  tag_id: number
}

interface GroupTagId {
  groups: GroupTag[]
}

interface Params {
  start: Time
  end: Time
  kind: ExpendIncome
  group_by: 'happen_at' | 'tag_id'
}

export const Statistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const [kind, setKind] = useState<ExpendIncome>('expenses')
  const { get } = useAjax({ showLoading: false, handleError: true })
  const format = 'yyyy-MM-dd'

  const getKey = ({ start, end, kind, group_by }: Params) => {
    return `/api/v1/items/summary?happen_after=${start.format(format)}&happen_before=${end.format(format)}&kind=${kind}&group_by=${group_by}`
  }

  const generateDefaultItems = (time: any) => {
    return Array.from({ length: time.dayCountOfMonth }).map((_, index) => {
      const x = start.clone.add(index, 'day').format(format)
      return { x, y: 0 }
    })
  }
  const { start, end } = timeRange
  const defaultItems = generateDefaultItems(start)
  const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happen_at' }),
    async (path) => {
      const response = await get<GroupHappenAt>(path)
      return response.data.groups.map(it => ({ x: it.happen_at, y: it.amount / 100 }))
    })

  const lineItems = defaultItems?.map((defaultItem) =>
    items?.find(item => item.x === defaultItem.x) ?? defaultItem
  )

  const { data: tagItems } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }),
    async (path) => {
      const response = await get<GroupTagId>(path)
      return response.data.groups
    })

  const pieItems = tagItems?.map(it => ({ name: it.tag.name, value: it.amount / 100 })) ?? []

  const rankItems = tagItems?.map(it => ({ name: it.tag.name, value: it.amount / 100, icon: it.tag.sign }))

  const timeRanges: { key: TimeRange; value: string }[] = [
    { key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') }, value: '本月' },
    { key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') }, value: '上月' },
    { key: { name: 'twoMonthsAgo', start: time().add(-2, 'month').firstDayOfMonth, end: time().add(-2, 'month').lastDayOfMonth.add(1, 'day') }, value: '两月前' },
    { key: { name: 'threeMonthsAgo', start: time().add(-3, 'month').firstDayOfMonth, end: time().add(-3, 'month').lastDayOfMonth.add(1, 'day') }, value: '三月前' },
  ]

  return (
    <div>
      <Gradient>
        <TopNav title='账目列表' icon={<BackIcon />} />
      </Gradient>
      <TopTimeBar selected={timeRange} onSelect={setTimeRange} timeRanges={timeRanges} />
      <div flex items-center px-16px gap-x-16px p-16px>
        <span grow-0 shrink-0>类型</span>
        <div grow-1 shrink-1>
          <Input type='select' options={[
            { value: '19', text: '红色' },
            { value: '支出', text: '白色' }
          ]}
          value={kind}
          disableError={true}
          onChange={value => setKind(value) }
        />
        </div>
      </div>
      <LineChart className="h-120px mt-10" items={lineItems} />
      <PieChart className="h-400px mt-10" items={pieItems} />
      <RankChart className="h-100px mt-10" items={rankItems} />
    </div>
  )
}

export default Statistics
