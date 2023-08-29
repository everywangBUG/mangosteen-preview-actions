import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { ErrorPage } from '../components/ErrorPage'
import { welcomeRoute } from './welcomeRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      welcomeRoute
    ]
  }
])
