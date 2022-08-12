import axios from 'axios'
import { DETAIL_PROFILE, LOGIN_ACTION, VERIFY_OTP } from '../constants/serviceURL'
import { PLATFORM_NAME, PLATFORM_LANG } from './helpers'
import { loadFromLocalStorage } from '../utils/local-storage-helper'

export const loginActionServ = data =>
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVICE_URL}${LOGIN_ACTION}`,
    headers: {
      'x-platform-name': PLATFORM_NAME,
      'x-platform-lang': PLATFORM_LANG,
      'content-type': 'application/json'
    },
    data: JSON.stringify(data)
  })

export const verifyOTPActionServ = data =>
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVICE_URL}${VERIFY_OTP}`,
    headers: {
      'x-platform-name': PLATFORM_NAME,
      'x-platform-lang': PLATFORM_LANG,
      'content-type': 'application/json'
    },
    data: JSON.stringify(data)
  })

export const detailProfileServ = () =>
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVICE_URL}${DETAIL_PROFILE}`,
    headers: {
      'x-platform-name': PLATFORM_NAME,
      'x-platform-lang': PLATFORM_LANG,
      'content-type': 'application/json',
      Authorization: loadFromLocalStorage('auth_token')
    }
  })

export const phoneLaporanServ = (phone) =>
  axios({
    method: 'GET',
    url: `http://159.223.72.199/api/testingPhone?msisdn=${phone.phone_no}`,
    headers: {
      'x-platform-name': PLATFORM_NAME,
      'x-platform-lang': PLATFORM_LANG,
      'content-type': 'application/json',
      Authorization: loadFromLocalStorage('auth_token')
    }
  })

export const countLaporanServ = (data) =>
  axios({
    method: 'POST',
    url: 'http://159.223.72.199/api/countDokumen',
    headers: {
      'x-platform-name': PLATFORM_NAME,
      'x-platform-lang': PLATFORM_LANG,
      'content-type': 'application/json',
      Authorization: loadFromLocalStorage('auth_token')
    },
    data: JSON.stringify(data)
  })
