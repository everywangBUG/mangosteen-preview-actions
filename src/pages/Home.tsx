import { Link, Navigate } from 'react-router-dom'
import useSWR from 'swr'
import { useAjax } from '../lib/ajax'
import pig from '../assets/images/pig.svg'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddButton } from '../components/AddButton'

interface IProps {
  title?: string
}

export const Home: React.FC<IProps> = (props) => {
  useTitle(props.title || '')
  const { get } = useAjax({ handleError: false })
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path => {
    const response = await get<IResource<IUser>>(path)
    return response.data.resource
  })
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await get<IResources<Tag>>(path)).data
  )
  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError
  if (isLoadingMe || isLoadingItems) {
    return <Loading message='正在加载中...' className='h-screen' />
  }
  if (itemsData?.resources[0]) {
    return <Navigate to='/items' />
  }
  return (
    <div h='100vh' relative>
      <div flex flex-col justify-around items-center>
        <div mt-20vh>
          <img src={pig} w='128px' h='130px' />
        </div>
        <div mt-20vh w='90%' text-center>
          <Link to='/items/new'>
            <button j-btn>开始记账</button>
          </Link>
        </div>
        <AddButton />
      </div>
    </div>
  )
}

export default Home
