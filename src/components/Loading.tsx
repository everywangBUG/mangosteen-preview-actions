import styled from 'styled-components'
import c from 'classnames'
import { Icon } from './Icon'

const Div = styled.div`
  height: 100%;
  svg {
    color: #5926b9;
    animation: svg 2s infinite;
  }

  @keyframes svg {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`

interface IProps {
  message?: string
  className?: string
}

export const Loading: React.FC<IProps> = ({ message, className }) => {
  return (
    <Div className={c('flex flex-col items-center justify-center', className)}>
      <Icon name='loading' className="w-48px h-48px text-violet"/>
      <p mt-8px text-xl>{ message || '加载中...' }</p>
    </Div>
  )
}
