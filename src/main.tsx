import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import { router } from './routes/router'
import 'virtual:uno.css'
import './global.scss'
import 'virtual:svgsprites'

const test = vhCheck()
const div = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(div)
root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
