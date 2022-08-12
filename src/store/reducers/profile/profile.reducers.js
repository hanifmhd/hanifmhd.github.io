import * as actionType from '../../../constants/action-type/profile'

const initialState = {
  status: '',
  error: {
    message: '',
    code: ''
  },
  sukses: {
    id: '',
    email: '',
    fullname: '',
    phone_no: '',
    code_id: '',
    code_role: '',
    profile_picture: '',
    default_role_picture: '',
    flag: ''
  }
}

const profile = (state = initialState, action = null) => {
  switch (action.type) {
    case actionType.PROFILE_FAILED:
      return {
        ...state,
        status: action.data.status,
        error: {
          message: action.data.message,
          code: action.data.code
        },
        sukses: {
          id: '',
          email: '',
          fullname: '',
          phone_no: '',
          code_id: '',
          code_role: '',
          profile_picture: '',
          default_role_picture: '',
          flag: ''
        }
      }
    case actionType.PROFILE_SUCCESS:
      return {
        ...state,
        status: action.status,
        sukses: {
          id: action.data.id,
          email: action.data.email,
          fullname: action.data.fullname,
          phone_no: action.data.phone_no,
          code_role: action.data.code_role,
          code_id: action.data.code_id,
          profile_picture: action.data.profile_picture,
          default_role_picture: action.data.default_role_picture,
          flag: action.data.flag
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

export default profile
