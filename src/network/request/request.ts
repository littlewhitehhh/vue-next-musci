import axios from 'axios'

import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

interface interceptorsHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig

  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

interface MyRequestConfig extends AxiosRequestConfig {
  interceptorsHooks?: interceptorsHooks
}

//封装自己的axios

class MyRequest {
  config: AxiosRequestConfig
  interceptorHooks?: interceptorsHooks
  instance: AxiosInstance

  constructor(config: MyRequestConfig) {
    this.config = config
    this.interceptorHooks = config.interceptorsHooks
    this.instance = axios.create(config)

    // 示例的拦截器
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        const token = window.localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )
  }

  //方法
  request<T = any>(config: MyRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: MyRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: MyRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  delete<T = any>(config: MyRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  patch<T = any>(config: MyRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
}

export default MyRequest
