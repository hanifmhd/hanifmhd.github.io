import { combineReducers } from 'redux'
import { login, verifyOTP } from './reducers/login/login.reducers'
import { report, countDokumen } from './reducers/report/report.reducers'
import profile from './reducers/profile/profile.reducers'

// import resetPassword from './reducers/reset-password/reset-password.reducers';

const rootReducer = combineReducers({
  login,
  profile,
  verifyOTP,
  laporan: report,
  countDokumen
})

export default rootReducer
