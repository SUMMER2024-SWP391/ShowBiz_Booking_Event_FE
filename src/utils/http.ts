import axios, { AxiosError, AxiosInstance } from 'axios'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  setTokenToLS,
  setProfileToLS
} from './auth'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'

//
//https://showbiz-booking-event-be.onrender.com
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    ;(this.instance = axios.create({
      baseURL: 'https://showbiz-booking-event-be.onrender.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })),
      this.instance.interceptors.request.use(
        (config) => {
          this.accessToken = this.accessToken
            ? this.accessToken
            : getAccessTokenFromLS()
          if (this.accessToken) {
            config.headers.Authorization = `Bearer ${this.accessToken}`
            return config
          }
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    this.instance.interceptors.response.use(
      (response) => {
        const endPoint = response.config.url?.split('/').pop()
        if (endPoint === 'login') {
          this.accessToken = response.data.data.result.access_token

          setTokenToLS(
            this.accessToken,
            response.data.data.result.refresh_token
          )
          setProfileToLS(response.data.data.user)
        } else if (endPoint === 'logout') {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
