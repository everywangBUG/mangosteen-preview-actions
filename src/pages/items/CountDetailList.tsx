import useSWRInfinite from 'swr/infinite'
import { AddButton } from '../../components/AddButton.js'
import type { IItems, Resources } from '../../global.d.ts'
import { ajax } from '../../lib/ajax'

const items: IItems[] = []

function getKey(pageIndex: number) {
  return `/api/v1/items/?page=${pageIndex + 1}`
}

export const CountDetailList: React.FC = () => {
  const { data, error } = useSWRInfinite(
    getKey, async (path) => (await ajax.get<Resources<IItems>>(path)).data
  )
  console.log('data', data, error)
  return (
    <div>
      <ol>
        { items.map(item =>
          <li key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-8px border-b-1 b="#EEE">
            <div row-start-1 col-start-1 row-end-3 col-end-2 w-48px h-48px text-24px bg="#D8D8D8" rounded="50%"
              flex justify-center items-center
            >
              💖
            </div>
            <div row-start-1 col-start-2 row-end-2 col-end-3 flex items-center>旅行</div>
            <div row-start-2 col-start-2 row-end-3 col-end-3 text="#999999" flex items-center>{item.created_at}</div>
            <div row-start-1 col-start-3 row-end-3 col-end-4 flex items-center text="#53A867">
              { `￥${item.amount}` }
            </div>
          </li>
        )}
      </ol>
      <div flex justify-center items-center p-16px>
        <button w-btn>加载更多</button>
      </div>
      <AddButton />
    </div>
  )
}
