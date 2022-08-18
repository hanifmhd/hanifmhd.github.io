/* eslint-disable no-async-promise-executor */
import { phoneLaporanServ, countLaporanServ, testingCode } from '../../../services/services'
import Report from '../../../models/report/report'
import * as actionType from '../../../constants/action-type/report'
import { handleError } from '../handleError/handleError'

export const laporanPhoneAct = data => dispatch =>
  new Promise(async (resolve) => {
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
      // Handle
      if (err.response.status === 417 || err.response.status === 412 || err.response.status === 403) {
        handleError(err, laporanPhoneAct(data), dispatch)
      } else {
        dispatch({
          data: {
            code: err.response.status,
            message: err.response.data?.meta?.message ? err.response.data.meta.message : 'Terjadi Kesalahan Sistem',
            status: 'error'
          },
          type: actionType.LAPORAN_FAILED
        })
      }
      //
      return err
    }
  })

export const getCountDokumen = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const resData = await countLaporanServ(data)
      const datas = new Report(resData.data.data)
      if (resData.data.data.length > 0 || resData.data.data !== null) {
        const agronom = resData.data.data.find(c => c.doc_type === 'AGRONOM')
        const droneMapping = resData.data.data.find(c => c.doc_type === 'DRONE_MAPPING')
        const iot = resData.data.data.find(c => c.doc_type === 'IOT')
        const labTanah = resData.data.data.find(c => c.doc_type === 'LAB_TANAH')
        const vidDocument = resData.data.data.find(c => c.doc_type === 'VID_DOCUMENT')

        // Mapping
        datas.doc_agronom = agronom === undefined ? 'Tidak ada dokumen' : `${agronom.count} dokumen`
        datas.doc_drone_mapping = droneMapping === undefined ? 'Tidak ada dokumen' : `${droneMapping.count} dokumen`
        datas.doc_sensor_iot = iot === undefined ? 'Tidak ada dokumen' : `${iot.count} dokumen`
        datas.doc_test_lab = labTanah === undefined ? 'Tidak ada dokumen' : `${labTanah.count} dokumen`
        datas.doc_video = vidDocument === undefined ? 'Tidak ada dokumen' : `${vidDocument.count} dokumen`
      } else {
        datas.doc_agronom = 'Tidak ada dokumen'
        datas.doc_drone_mapping = 'Tidak ada dokumen'
        datas.doc_sensor_iot = 'Tidak ada dokumen'
        datas.doc_test_lab = 'Tidak ada dokumen'
        datas.doc_video = 'Tidak ada dokumen'
      }
      dispatch({
        data: datas,
        type: actionType.GET_LAPORAN_SUCCESS,
        status: 'sukses'
      })
      resolve(resData)
      return resData
    } catch (err) {
      if (err.response.status === 417 || err.response.status === 412 || err.response.status === 403) {
        handleError(err, getCountDokumen(data), dispatch)
      } else {
        dispatch({
          data: {
            code: err.response.status,
            message: err.response.data?.meta?.message ? err.response.data.meta.message : 'Terjadi Kesalahan Sistem',
            status: 'error'
          },
          type: actionType.LAPORAN_FAILED
        })
      }
      return err
    }
  })

export const testingCodeAct = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const resData = await testingCode(data)
      resolve(resData)
      return resData
    } catch (err) {
      // Handle
      if (err.response.status === 417 || err.response.status === 412 || err.response.status === 403) {
        handleError(err, testingCodeAct(data), dispatch)
      } else {
        dispatch({
          data: {
            code: err.response.status,
            message: err.response.data?.meta?.message ? err.response.data.meta.message : 'Terjadi Kesalahan Sistem',
            status: 'error'
          },
          type: actionType.LAPORAN_FAILED
        })
      }
      //
      return err
    }
  })
