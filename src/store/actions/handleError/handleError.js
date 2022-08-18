import { refreshTokenAct } from '../login/login.actions'
import { decrypt } from '../../../utils/crypt'
import { clearLocalStorage, loadFromLocalStorage } from '../../../utils/local-storage-helper'
import { logout } from '../../../services/services'
// Handle Error
const clearDataLogout = () => {
  clearLocalStorage('persist')
  clearLocalStorage('user')
  clearLocalStorage('auth_token')
  clearLocalStorage('refresh_token')
  clearLocalStorage('phone_no')
  clearLocalStorage('expire')
}
//
export const handleError = async (err, functionDispatch, dispatch) => {
  // const navigate = useNavigate()
  if (err.response.status === 417) {
    dispatch(refreshTokenAct({ phone_no: decrypt(loadFromLocalStorage('phone_no')) }, functionDispatch))
  } else if (err?.response?.status === 412 || err?.response?.status === 403) {
    try {
      await logout()
      clearDataLogout()
      location.reload('/login')
    } catch (error) {
      clearDataLogout()
      location.reload('/login')
    }
  }
}
