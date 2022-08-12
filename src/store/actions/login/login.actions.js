/* eslint-disable no-async-promise-executor */
import { loginActionServ, verifyOTPActionServ } from '../../../services/services'
import Login from '../../../models/login/login'
import * as actionType from '../../../constants/action-type/login'

export const loginAction = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const resData = await loginActionServ(data)
      const datas = new Login(resData.data.data)
      datas.ticket_id = resData.data.data.ticket_id
      datas.duration = resData.data.data.duration
      dispatch({
        data: datas,
        type: actionType.LOGIN_SUCCESS,
        status: 'sukses'
      })
      resolve(resData)
      return resData
    } catch (err) {
      dispatch({
        data: {
          code: err.response.status,
          code_message: err.response.data?.meta?.code ? err.response.data.meta.code : 400,
          message: err.response.data?.meta?.message ? err.response.data.meta.message : 'Terjadi Kesalahan Jaringan / Sistem',
          status: 'error'
        },
        type: actionType.LOGIN_FAILED
      })
      return err
    }
  })

export const verifyOTPAction = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const resData = await verifyOTPActionServ(data)
      const datas = new Login(resData.data.data)
      datas.token = resData.data.data.token
      datas.expire = resData.data.data.expire
      datas.refresh_token = resData.data.data.refresh_token

      dispatch({
        data: datas,
        type: actionType.VERIFY_SUCCESS,
        status: 'sukses'
      })
      resolve(resData)
      return resData
    } catch (err) {
      dispatch({
        data: {
          code: err.response.status,
          code_message: err.response.data?.meta?.code ? err.response.data.meta.code : 400,
          message: err.response.data?.meta?.message ? err.response.data.meta.message : 'Terjadi Kesalahan Jaringan / Sistem',
          status: 'error'
        },
        type: actionType.VERIFY_FAILED
      })
      return err
    }
  })
