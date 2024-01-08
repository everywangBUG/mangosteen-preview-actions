import { useState } from 'react'
import { DatePicker } from '../../components/DatePicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'

interface Props {
  className: string
}

export const DateAndAmount: React.FC<Props> = ({ className }) => {
  const [date, setDate] = useState(new Date())
  const { popup, toggle, closePopup } = usePopup(false,
    <DatePicker onConfirm={d => { setDate(d); closePopup() }} onCancel={() => closePopup()}/>
  )

  return (
    <>
      <div>
        <div>
          <div flex items-center p-16px b-t-1px b-t="#ddd">
            <span flex items-center gap-x-8px onClick={toggle}>
              <Icon className="h-24px w-24px" name="calendar" grow-0 shrink-0/>
              <span grow-0 shrink-0 text-14px text="gray">{ time(date).format() }</span>
            </span>
            <code flex-1 text-right text="#53A867" text-20px>12345678.123</code>
          </div>
        </div>
        <div py="0.5px" b="#ddd" children-bg-white bg="#ddd" grid grid-cols="[repeat(4,1fr)]" grid-rows="[repeat(4,48px)]" gap-1px children-text-16px
          className={className}
        >
          <button style={{ gridArea: '1 / 1 / 2 / 2' }}>1</button>
          <button style={{ gridArea: '1 / 2 / 2 / 3' }}>2</button>
          <button style={{ gridArea: '1 / 3 / 2 / 4' }}>3</button>
          <button style={{ gridArea: '2 / 1 / 3 / 2' }}>4</button>
          <button style={{ gridArea: '2 / 2 / 3 / 3' }}>5</button>
          <button style={{ gridArea: '2 / 3 / 3 / 4' }}>6</button>
          <button style={{ gridArea: '3 / 1 / 4 / 2' }}>7</button>
          <button style={{ gridArea: '3 / 2 / 4 / 3' }}>8</button>
          <button style={{ gridArea: '3 / 3 / 4 / 4' }}>9</button>
          <button style={{ gridArea: '4 / 1 / 5 / 3' }}>0</button>
          <button style={{ gridArea: '4 / 3 / 5 / 4' }}>.</button>
          <button style={{ gridArea: '1 / 4 / 3 / 5' }}>清空</button>
          <button style={{ gridArea: '3 / 4 / 5 / 5' }}>提交</button>
        </div>
      </div>
      { popup }
    </>
  )
}