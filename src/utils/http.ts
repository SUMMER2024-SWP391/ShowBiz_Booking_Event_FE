import axios, { AxiosError, AxiosInstance } from 'axios'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS
} from './auth'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'

//http://localhost:4000
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
          this.accessToken = response.data.data.token.access_token
          setAccessTokenToLS(
            this.accessToken,
            response.data.data.token.refresh_token
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
