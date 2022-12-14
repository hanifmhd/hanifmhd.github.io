import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Loader from '../../assets/icon/Loader.png'

function ButtonCountDown ({
  resendText,
  total,
  seconds,
  onClickResend,
  clickableCount,
  classProps,
  setTimesInterval
}) {
  const [clickedCount, setClickedCount] = useState(0)
  const [message, setMessage] = useState(
    `${resendText}`
  )
  const [seconds2, setSeconds2] = useState(seconds)
  const [minute2, setMinute2] = useState(total)

  let timerData

  React.useEffect(() => {
    timerData = setInterval(() => {
      if (minute2 >= 0 && minute2 !== false) {
        setSeconds2(seconds2 - 1)
        const secondsInterval = seconds2 - 1
        setTimesInterval(`${minute2 < 10 ? '0' + minute2 : minute2}:${secondsInterval < 10 ? '0' + secondsInterval : secondsInterval}`)
        if (seconds2 === 0 && minute2 > 0) {
          setMinute2(minute2 - 1)
          setSeconds2(59)
        } else if (minute2 === 0 && seconds2 === 0) {
          setMessage('Belum terima kode OTP ?')
          setMinute2(false)
          setSeconds2(false)
        }
      }
    }, 1000)

    return () => clearInterval(timerData)
  })

  const resetCountDown = useCallback(() => {
    if (clickedCount < clickableCount) {
      setSeconds2(59)
      setMinute2(4)
      setMessage('Kirim ulang kode dalam ')
    }
    setClickedCount(clickedCount + 1)
  }, [clickedCount])

  const handleClick = () => {
    resetCountDown()
    onClickResend()
  }

  const generateComponent = () => {
    if (minute2 !== false && seconds2 !== false) {
      return (
        <>
         <span className={classnames('text-danger text-md  ml-[8px] font-semibold')}>
            {minute2 < 10 ? '0' + minute2 : minute2}:{seconds2 < 10 ? '0' + seconds2 : seconds2}
          </span>
          <img src={Loader} className={classnames('motion-safe:animate-spin 5s ml-[8px] w-[13px] mt-[3px]')} alt="loader"/>
        </>
      )
    } else {
      return (
        <p onClick={() => { handleClick() }} style={{ marginLeft: '5px' }} className={classnames('text-success flex text-md font-poppins cursor-pointer underline underline-offset-1')}>Kirim ulang</p>
      )
    }
  }

  return (
    <div className={classnames('flex')}>
      <p className={classnames(`text-primary flex text-md font-poppins cursor-default ${classProps}`)}>
        {message}
      </p>
      {generateComponent()}
    </div>
  )
}

ButtonCountDown.propTypes = {
  resendText: PropTypes.string,
  counterText: PropTypes.object,
  onClickResend: PropTypes.func,
  total: PropTypes.number,
  seconds: PropTypes.number,
  onClick: PropTypes.func,
  clickableCount: PropTypes.number,
  unclickableText: PropTypes.object,
  classProps: PropTypes.string,
  setTimesInterval: PropTypes.func
}

export default ButtonCountDown
