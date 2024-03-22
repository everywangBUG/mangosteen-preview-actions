import { useNavigate } from 'react-router-dom'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { useContext } from 'react'
import axios from 'axios'
import { LoadingContext } from '../App'

export const ajax = axios.create({
  baseURL: isDev ? 'https://mangosteen2.hunger-valley.com' : 'http://121.196.236.94:8080/api/v1',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 10000
})

ajax.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (config.headers && jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }
  return config
})

type Options = {
  showLoading?: boolean
  handleError?: boolean
}

export const useAjax = (options?: Options) => {
  const map: Record<string, undefined | (() => void)> = {
    401: () => {
      navigate('/sign_in')
    },
    402: () => {
      alert('请付费')
    },
    403: () => {
      alert('没有权限')
    }
  }
  const { show, hide } = useContext(LoadingContext)
  const showLoading = options?.showLoading ?? false
  const handleError = options?.handleError ?? true
  const navigate = useNavigate()
  const onError = (error: AxiosError) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response
        const fn = map[status] || map.unknown
        fn?.()
      }
    }
    throw error
  }

  const ajax = {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      if (showLoading) { show() }
      return axiosInstance.get<T>(path, config).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { show() }
      return axiosInstance.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },
    patch: <T>(path: string, data: JSONValue) => {
      if (showLoading) { show() }
      return axiosInstance.patch<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },
    destroy: <T>(path: string) => {
      if (showLoading) { show() }
      return axiosInstance.delete<T>(path).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },
  }
  return ajax
}
