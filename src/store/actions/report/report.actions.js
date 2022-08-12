/* eslint-disable no-async-promise-executor */
import { phoneLaporanServ, countLaporanServ } from '../../../services/services'
import Report from '../../../models/report/report'
import * as actionType from '../../../constants/action-type/report'

export const laporanPhoneAct = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const resData = await phoneLaporanServ(data)
      const datas = new Report(resData.data.data)
      datas.phone = resData.data.phone
      const optionMapping = []
      resData.data.data.map((key) => {
        return optionMapping.push(
          {
            label: key.land_name,
            value: key.id
          }
        )
      })
      datas.optionValue = optionMapping
      dispatch({
        data: datas,
        type: actionType.LAPORAN_SUCCESS,
        status: 'sukses'
      })
      resolve(resData)
      return resData
    } catch (err) {
      dispatch({
        data: {
          code: err.response.status,
          message: err.response.data.meta?.message ? err.response.data.meta.message : 'Terjadi Kesalahan Sistem',
          status: 'error'
        },
        type: actionType.LAPORAN_FAILED
      })
      return err
    }
  })

export const getCountDokumen = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const resData = await countLaporanServ(data)
      console.log('resData', resData)
      const datas = new Report(resData.data.data)
      datas.doc_drone_mapping = resData.data.data.doc_drone_mapping
      datas.doc_sensor_iot = resData.data.data.doc_sensor_iot
      datas.doc_test_lab = resData.data.data.doc_test_lab
      datas.doc_agronom = resData.data.data.doc_agronom
      datas.doc_video = resData.data.data.doc_video
      dispatch({
        data: datas,
        type: actionType.GET_LAPORAN_SUCCESS,
        status: 'sukses'
      })
      resolve(resData)
      return resData
    } catch (err) {
      console.log('Error : ', err)
      dispatch({
        data: {
          code: err.response.status,
          message: err.response.data?.meta?.message ? err.response?.data.meta.message : 'Terjadi Kesalahan Sistem',
          status: 'error'
        },
        type: actionType.GET_LAPORAN_FAILED
      })
      return err
    }
  })
