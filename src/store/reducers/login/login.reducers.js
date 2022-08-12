import * as actionType from '../../../constants/action-type/login'

const initialState = {
  status: '',
  error: {
    message: '',
    code: '',
    code_message: ''
  },
  sukses: {
    ticket_id: '',
    duration: ''
  }
}

const initialStateVerify = {
  status: '',
  error: {
    message: '',
    code: '',
    code_message: ''
  },
  sukses: {
    token: '',
    refresh_token: '',
    expire: ''
  }
}

export const login = (state = initialState, action = null) => {
  switch (action.type) {
    case actionType.LOGIN_FAILED:
      return {
        ...state,
        status: action.data.status,
        error: {
          message: action.data.message,
          code: action.data.code,
          code_message: action.data.code_message
        },
        sukses: {
          ticket_id: '',
          duration: ''
        }
      }
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        status: action.status,
        sukses: {
          ticket_id: action.data.ticket_id,
          duration: action.data.duration
        },
        error: {
          message: '',
          code: '',
          code_message: ''
        }
      }
    default:
      return state
  }
}

export const verifyOTP = (state = initialStateVerify, action = null) => {
  switch (action.type) {
    case actionType.VERIFY_FAILED:
      return {
        ...state,
        status: action.data.status,
        error: {
          message: action.data.message,
          code: action.data.code,
          code_message: action.data.code_message
        },
        sukses: {
          token: '',
          refresh_token: '',
          expire: ''
        }
      }
    case actionType.VERIFY_SUCCESS:
      return {
        ...state,
        status: action.status,
        sukses: {
          token: action.data.token,
          refresh_token: action.data.refresh_token,
          expire: action.data.expire
        },
        error: {
          message: '',
          code: '',
          code_message: ''
        }
      }
    default:
      return state
  }
}
