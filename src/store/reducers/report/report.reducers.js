import * as actionType from '../../../constants/action-type/report'

const initialState = {
  status: '',
  error: {
    message: '',
    code: ''
  },
  sukses: {
    phone: '',
    optionValue: []
  }
}

const initialStateCount = {
  status: '',
  error: {
    message: '',
    code: ''
  },
  sukses: {
    doc_drone_mapping: [],
    doc_sensor_iot: [],
    doc_test_lab: [],
    doc_agronom: [],
    doc_video: []
  }
}

export const report = (state = initialState, action = null) => {
  switch (action.type) {
    case actionType.LAPORAN_FAILED:
      return {
        ...state,
        status: action.data.status,
        error: {
          message: action.data.message,
          code: action.data.code
        },
        sukses: {
          phone: '',
          optionValue: []
        }
      }
    case actionType.LAPORAN_SUCCESS:
      return {
        ...state,
        status: action.status,
        sukses: {
          phone: action.data.phone,
          optionValue: action.data.optionValue
        },
        error: {
          message: '',
          code: ''
        }
      }
    default:
      return state
  }
}

export const countDokumen = (state = initialStateCount, action = null) => {
  switch (action.type) {
    case actionType.GET_LAPORAN_FAILED:
      return {
        ...state,
        status: action.data.status,
        error: {
          message: action.data.message,
          code: action.data.code
        },
        sukses: {
          doc_drone_mapping: [],
          doc_sensor_iot: [],
          doc_test_lab: [],
          doc_agronom: [],
          doc_video: []
        }
      }
    case actionType.GET_LAPORAN_SUCCESS:
      return {
        ...state,
        status: action.status,
        sukses: {
          doc_drone_mapping: action.data.doc_drone_mapping,
          doc_sensor_iot: action.data.doc_sensor_iot,
          doc_test_lab: action.data.doc_test_lab,
          doc_agronom: action.data.doc_agronom,
          doc_video: action.data.doc_video
        },
        error: {
          message: '',
          code: ''
        }
      }
    default:
      return state
  }
}
