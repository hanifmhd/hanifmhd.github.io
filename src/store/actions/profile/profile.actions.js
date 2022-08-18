/* eslint-disable no-async-promise-executor */
import { detailProfileServ } from '../../../services/services'
import Profile from '../../../models/profile/profile'
import * as actionType from '../../../constants/action-type/profile'
import { handleError } from '../handleError/handleError'

export const detailProfileAction = () => dispatch =>
  new Promise(async (resolve) => {
    try {
      const resData = await detailProfileServ()
      const datas = new Profile(resData.data.data)
      datas.id = resData.data.data.id
      datas.email = resData.data.data.email
      datas.fullname = resData.data.data.fullname
      datas.phone_no = resData.data.data.phone_no
      datas.code_role = resData.data.data.current_role.code
      datas.code_id = resData.data.data.current_role.id
      datas.profile_picture = resData.data.data.profile_picture
      datas.default_role_picture = resData.data.data.default_role_picture
      datas.flag = resData.data.data.flag

      dispatch({
        data: datas,
        type: actionType.PROFILE_SUCCESS,
        status: 'sukses'
      })
      resolve(resData)
      return resData
    } catch (err) {
      if (err.response.status === 417 || err.response.status === 412 || err.response.status === 403) {
        handleError(err, detailProfileAction(), dispatch)
      } else {
        dispatch({
          data: {
            code: err.response.status,
            message: err.response.data.meta.message,
            status: 'error'
          },
          type: actionType.PROFILE_FAILED
        })
      }
      return err
    }
  })
