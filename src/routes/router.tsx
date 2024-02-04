import { createBrowserRouter } from 'react-router-dom'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { ErrorPage } from '../components/ErrorPage'
import { Home } from '../pages/Home'
import { Root } from '../components/Root'
import { Items } from '../pages/Itmes'
import { SignIn } from '../pages/SignIn'
import { ItemsNew } from '../pages/ItemsNew'
import { TagsNew } from '../pages/TagsNew'
import { TagsEditNew } from '../pages/TagsEditNew'
import { Statistics } from '../pages/Statistics'
import { ItemsErrors } from '../pages/itemsError'
import { errors } from '../constants/itemErrors'
import { welcomeRoute } from './welcomeRoute'

export const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/home', element: <Home title='首页' /> },
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      welcomeRoute
    ]
  },
  {
    path: '/items',
    element: <Items />,
    errorElement: <ItemsErrors />,
    loader: async () => {
      const onError = (error: AxiosError) => {
        if (error.response?.status === 401) {
          throw new Error(errors.UNAUTHORIZED)
        }
      }
      const response = await axios.get<IResources<IItems>>('/api/v1/items?page=1').catch(onError)
      if (response.data.resources.length > 0) {
        return response.data
      }
      else {
        throw new Error(errors.EMPTY_DATA)
      }
    }
  },
  { path: '/items/new', element: <ItemsNew /> },
  { path: '/tags/new', element: <TagsNew /> },
  { path: '/tags/:id', element: <TagsEditNew /> },
  { path: '/sign_in', element: <SignIn /> },
  { path: '/statistics', element: <Statistics /> },
  { path: '/export', element: <div>不做</div> },
  { path: '/tags', element: <div>标签</div> },
  { path: '/noty', element: <div>不做</div> },
])
