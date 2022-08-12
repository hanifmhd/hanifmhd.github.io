import axios from 'axios'
import { PLATFORM_LANG, PLATFORM_NAME } from './helpers'
const BASE_URL = process.env.REACT_APP_SERVICE_URL

export default axios.create({
  baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-platform-name': PLATFORM_NAME,
    'x-platform-lang': PLATFORM_LANG
  }
})
