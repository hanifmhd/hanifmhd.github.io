/* eslint-disable no-unreachable */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
// Pages
import InputText from '../../components/InputText/InputText'
import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import InputOTP from '../../components/InputOTP/InputOTP'
import Character from '../../components/Character/Character'
import Copyright from '../../components/Copyright/Copyright'
import InputPhoneNew from '../../components/InputPhone/InputPhoneNew'
// Assets
import PatternBG from '../../assets/image/Pattern.png'
import Country from '../../assets/icon/country.png'
import Edit from '../../assets/icon/Edit.png'
import Clear from '../../assets/icon/clear.png'
import Logo from '../../assets/image/LogoTel.png'
import OTP from '../../assets/icon/OTP.png'
import ButtonCountDown from '../../components/ButtonCountdown/ButtonCountdown'
import Snackbar from '../../components/Snackbar/Snackbar'
import Modal from 'react-modal'
import AlertOTP from '../../components/AlertOTP/AlertOTP'
import { SUB_TITLE_ALERT_OTP, TEXT_VALIDASI_PHONE, TITLE_ALERT_OTP, TITLE_SEND_OTP } from './helpers'
// Services
import { get } from 'lodash/fp'
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/local-storage-helper'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginAction,
  verifyOTPAction
} from '../../store/actions/login/login.actions'
import {
  detailProfileAction
} from '../../store/actions/profile/profile.actions'
//

export default function Login () {
  const dispatch = useDispatch()
  const loginSelector = useSelector(state => state)
  const initialForm = {
    phone: '',
    otpNumber: ''
  }
  const notifAlert = {
    alertPhoneValidasi: false,
    alertPhoneWrong: false,
    alertPhoneWrongAlways: false,
    clickedModalAlert: 0,
    messageError: ''
  }
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)
  const [disabledButton, setDisabledButton] = useState(true)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [showAlert, setShowAlert] = useState(notifAlert)
  const [validOTP, setValidOTP] = useState('first')
  const [ticketID, setTicketID] = useState('')
  const [validLogin, setValidLogin] = useState(false)
  const [minutesState, setMinutesState] = useState(4)
  const [seconds, setSeconds] = useState(59)
  const [messageError, setMessageError] = useState('')
  const OTP_RESEND_LIMIT = 5
  //
  const controller = new AbortController()

  const handleSubmit = () => {
    setLoading(true)
    setValidOTP('first')
    setDisabledButton(true)
    if (step === 1) {
      // Action Login
      dispatch(
        loginAction({
          phone_no: '\+62' + formData.phone
        })
      )
      saveToLocalStorage('phone_no', '\+62' + formData.phone)
    } else if (step === 2) {
      dispatch(
        verifyOTPAction({
          otp: formData.otpNumber,
          ticket_id: ticketID
        })
      )
    }
    setShowAlert((prevState) => ({
      ...prevState,
      clickedModalAlert: showAlert.clickedModalAlert + 1
    }))
  }

  const onChange = (name, value) => {
    if (name === 'phone') {
      if (value.length >= 8 && value.length <= 15) {
        setDisabledButton(false)
        setShowAlert((prevState) => ({
          ...prevState,
          alertPhoneValidasi: false
        }))
      } else {
        if ((value.length > 0 && value.length < 8) || value.length > 15) {
          setShowAlert((prevState) => ({
            ...prevState,
            alertPhoneValidasi: true
          }))
        }
        setDisabledButton(true)
      }
    } else if (name === 'otpNumber') {
      dispatch(
        verifyOTPAction({
          otp: value,
          ticket_id: ticketID
        })
      )
      setShowAlert((prevState) => ({
        ...prevState,
        clickedModalAlert: showAlert.clickedModalAlert + 1
      }))
    }
    setFormData(old => ({
      ...old,
      [name]: value
    }))
  }

  useEffect(() => {
    if (showAlert.clickedModalAlert > OTP_RESEND_LIMIT) {
      setValidOTP('first')
      setShowAlert((prevState) => ({
        ...prevState,
        alertPhoneWrongAlways: true
      }))
    }
    return () => {
      controller.abort()
    }
  }, [showAlert.clickedModalAlert])

  const generateButtonSubmit = () => {
    if (loading) {
      return 'Loading'
    } else {
      if (step === 1) {
        return 'Kirimkan OTP'
      } else {
        return 'Masuk'
      }
    }
  }

  const onCloseModal = () => {
    setStep(1)
    setLoading(false)
    setDisabledButton(false)
    setValidOTP('first')
    setShowAlert((prevState) => ({
      ...prevState,
      alertPhoneWrongAlways: false,
      clickedModalAlert: 0
    }))
  }

  const clearPhone = () => {
    setDisabledButton(true)
    setFormData({
      ...formData,
      phone: ''
    })
  }
  const backToPhone = () => {
    setStep(1)
    setLoading(false)
    setDisabledButton(false)
    setShowAlert((prevState) => ({
      ...prevState,
      alertPhoneWrongAlways: false,
      clickedModalAlert: 0
    }))
  }
  const resendOTP = () => {
    dispatch(
      loginAction({
        phone_no: '\+62' + formData.phone
      })
    )
    setValidOTP('success')
    setShowAlert((prevState) => ({
      ...prevState,
      messageError: '',
      clickedModalAlert: showAlert.clickedModalAlert + 1
    }))
  }
  // Use Selector Login
  // Login Selector
  React.useEffect(() => {
    const responseSelector = get('login')(loginSelector)
    if (responseSelector?.status === 'error') {
      if (responseSelector?.error.code_message === '8201') {
        const splitArray = responseSelector?.error.message.split('[')
        const splitSecond = splitArray[1].split(']')
        const minutes = Math.floor(splitSecond[0] / 60)
        const seconds = splitSecond[0] - minutes * 60
        setMinutesState(minutes)
        setSeconds(seconds)
        setStep(2)
        setDisabledButton(true)
      }
      setShowAlert((prevState) => ({
        ...prevState,
        alertPhoneWrong: true,
        messageError: responseSelector.error.message
      }))
      setLoading(false)
      //
      setTimeout(() => {
        setShowAlert((prevState) => ({
          ...prevState,
          alertPhoneWrong: false,
          messageError: ''
        }))
        if (responseSelector?.error.code_message !== '8201') {
          setDisabledButton(false)
        }
      }, 2000)
      //
    } else if (responseSelector?.status === 'sukses') {
      // setSubmitPhone(true)
      setTicketID(responseSelector.sukses.ticket_id)
      setMinutesState(4)
      setSeconds(59)
      setShowAlert((prevState) => ({
        ...prevState,
        clickedModalAlert: 0
      }))
      if (step === 1) {
        setDisabledButton(true)
      }
      setLoading(false)
      setTimeout(() => {
        setStep(2)
      }, 500)
    }
    return () => {
      controller.abort()
    }
  }, [loginSelector?.login])
  //
  // Verify OTP
  React.useEffect(() => {
    const responseSelector = get('verifyOTP')(loginSelector)
    if (responseSelector?.status === 'error') {
      if (ticketID === '') {
        setShowAlert((prevState) => ({
          ...prevState,
          alertPhoneWrong: true,
          messageError: responseSelector?.error.message
        }))
        setTimeout(() => {
          setShowAlert((prevState) => ({
            ...prevState,
            alertPhoneWrong: false,
            messageError: ''
          }))
        }, 1000)
      }
      setMessageError(responseSelector?.error.message)
      setValidOTP('error')
      setTimeout(() => {
        setLoading(false)
        setDisabledButton(false)
      }, 2000)
      // saveTo
    } else if (responseSelector?.status === 'sukses') {
      setValidLogin(true)
      setValidOTP('success')
      saveToLocalStorage('auth_token', responseSelector.sukses.token)
      saveToLocalStorage('refresh_token', responseSelector.sukses.refresh_token)
      // setValidLogin(true)
      saveToLocalStorage('expire', responseSelector.sukses.expire)
    }
    return () => {
      controller.abort()
    }
  }, [loginSelector?.verifyOTP])

  // AFter Verify Action Get Profile
  React.useEffect(() => {
    const responseSelector = get('profile')(loginSelector)
    if (responseSelector?.status === 'error') {
      setShowAlert((prevState) => ({
        ...prevState,
        alertPhoneWrong: true,
        messageError: responseSelector.error.message
      }))
      setTimeout(() => {
        setShowAlert((prevState) => ({
          ...prevState,
          alertPhoneWrong: false
        }))
        setLoading(false)
        setDisabledButton(false)
      }, 2000)
      // saveTo
    } else if (responseSelector?.status === 'sukses') {
      setTimeout(() => {
        setAuth({ user: responseSelector.sukses.fullname, pwd: 'tes', roles: 1, accessToken: loadFromLocalStorage('auth_token') })
        // Save To Local Storage
        const data = {
          fullname: responseSelector.sukses.fullname,
          phone_no: btoa(responseSelector.sukses.phone_no),
          email: btoa(responseSelector.sukses.email),
          profile_picture: responseSelector.sukses.profile_picture,
          id: btoa(responseSelector.sukses.id),
          role_id: responseSelector.sukses.code_id,
          role_name: responseSelector.sukses.code_role
        }
        saveToLocalStorage('user', data)
        //
        navigate('/', { replace: true })
        setLoading(false)
      }, 500)
    }
    return () => {
      controller.abort()
    }
  }, [loginSelector?.profile])

  React.useEffect(() => {
    if (validLogin) {
      dispatch(
        detailProfileAction()
      )
    }
    return () => {
      controller.abort()
    }
  }, [validLogin])

  return (
      <div className={classnames('min-h-screen grid h-screen place-items-center')} style={{ background: `url(${PatternBG}), #E6F5EB` }}>
          <Card classProps="lg:w-[1000px] md:w-[800px] min-h-[600px]  sm:min-w-[400px] flex flex-col items-center  transition duration-300 ease-in rounded-2xl md:transition-all" classPropsCard="!pt-[64px] flex flex-col items-center">
              <img src={Logo} className={classnames('w-[250px] ')}/>
                {
                  step === 1 && (
                  <div className={classnames(`${step === 1 ? 'items-center justify-center flex flex-col translate-x-0 mb-[24px]' : 'translate-x-[200px]'} ease-in-out   duration-500 mt-[44px]`)}>
                    <h5 className={classnames('text-[#003E60] font-[20px] leading-[24px] font-semibold font-poppins ')}>Masuk sebagai admin</h5>
                    {/* Character */}
                      <Character/>
                    {/*  */}
                    <p className={classnames('font-[14px] text-[#003E60] font-semibold font-poppins leading-[20px] tracking-[0.035em]')}>Nomor Ponsel</p>

                      {/*  */}
                      <div className={classnames('relative')}>
                        <InputPhoneNew
                          classProps={'w-[460px] mt-2'}
                          classPropsInput={'text-[16px]'}
                          placeholder="e.g. 82100001234"
                          valueSet={`${formData.phone}`}
                          iconRight={Clear}
                          onChange={(name, value) => { onChange(name, value) }}
                          onClickIcon={() => { clearPhone() }}
                          name="phone"
                          iconLeft={Country}
                          typeInput="noBorder"
                          type="text"
                          validateOptions={
                            {
                              minLen: 8,
                              maxLen: 15
                            }
                          }
                        />
                        {
                          showAlert.alertPhoneValidasi && (
                            <p className={classnames('absolute bottom-[-25px] text-[16px] text-[#EE4949] font-medium font-poppins tracking-[0.2px] leading-[24px] left-[100px]')}>{TEXT_VALIDASI_PHONE}</p>
                          )
                        }
                      </div>
                  </div>
                  )
                }
              {/* Step 2 */}
              {
                  step === 2 && (
                    <div className={classnames(` relative flex flex-col ${step === 2 ? 'translate-x-0' : 'translate-x-[200px]'} ease-in-out  duration-500 w-[460px]  mt-[68px]`)}>
                      <p className={classnames('text-[14px] text-[#003E60] leading-[20px] tracking-[0.0035em]  place-self-center font-poppins')}>{TITLE_SEND_OTP}</p>
                      {/* Input Phone */}
                      <InputText classProps={'mt-2'} classPropsInput="text-left relative" placeholder="Nomor Ponsel" valueSet={`+62 ${formData.phone}`} readonly iconRight={Edit} onChange={(name, value) => {}} onClickIcon={() => { backToPhone() }} name="phone_number" />
                      {/* End Input Phone */}
                      {/* Input OTP */}
                      <InputOTP
                        classProps="mt-[40px] place-self-center ml-[16px]"
                        onChange={(name, value) => { onChange(name, value) }}
                        validOTP={validOTP}
                        name='otpNumber'
                        setValidOTP={(value) => { setValidOTP(value) }}
                        messageError={messageError}
                      />
                      <div className={classnames(`block ${validOTP === 'error' ? 'mt-[2px]' : 'mt-[24px]'}`)} >
                        {/* End Input */}
                      <ButtonCountDown
                          resendText="Kirim ulang kode dalam"
                          total={minutesState}
                          onClickResend={() => { resendOTP() }}
                          seconds={seconds}
                          clickableCount={OTP_RESEND_LIMIT}
                          classProps="text-left content-start items-start ml-[21px]"
                        />
                      </div>

                    </div>
                  )
                }
              {/* Button */}
              <Button
                variant="success"
                classProps="w-[460px] mt-[8px]"
                text={generateButtonSubmit()}
                onClick={() => { handleSubmit() }}
                disabled={disabledButton}
               />
              {/* Copyright  */}
              <Copyright/>

              {/* Snackbar */}
              <Snackbar type="danger" text={showAlert.messageError} classProps={classnames(` ${showAlert.alertPhoneWrong ? 'translate-y-1 opacity-1' : ' opacity-0 translate-y-[200px] '} transform duration-500 ease-in-out  transition`)}/>
          </Card>
          {/* Show Modal */}
          {
            showAlert.alertPhoneWrongAlways && (
              <Modal
                isOpen={showAlert.alertPhoneWrongAlways}
                ariaHideApp={false}
                style={{
                  overlay: {
                    backgroundColor: 'rgba(0, 29, 45, 0.5)',
                    zIndex: 1,
                    overflowX: 'auto'
                  },
                  content: {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: 'none',
                    left: '5%',
                    right: '5%',
                    inset: '20% 50%',
                    transform: 'translateX(-50%)',
                    boxShadow: '0px 0px 2px rgba(51, 173, 92, 0.2), 0px 2px 10px rgba(51, 173, 92, 0.1)',
                    borderEadius: '6px',
                    width: '400px',
                    borderRadius: '16px',
                    padding: '0px 0px 0px 0px',
                    overflow: 'inherit',
                    height: 'fit-content'
                  }
                }}
              >
                  <AlertOTP
                    title={TITLE_ALERT_OTP}
                    thumbnail={OTP}
                    subTitle={SUB_TITLE_ALERT_OTP}
                    closeModal={() => { onCloseModal() }}
                    onClick={() => { onCloseModal() }}
                    />
              </Modal>
            )
          }
      </div>
  )
}