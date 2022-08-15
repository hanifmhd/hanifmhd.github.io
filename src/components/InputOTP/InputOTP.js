/**
 *
 * InputOTP
 * Component documentation goes here
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Wrapper, CodeWrapper, CodeInput } from './styles'

function InputOTP ({
  onChange,
  setOTPInvalidity,
  classProps,
  validOTP = 'first',
  setValidOTP,
  messageError
}) {
  const doms = []
  const focusOn = i => {
    if (doms[i]) doms[i].focus()
  }
  useEffect(() => {
    focusOn(0)
    document.getElementById('input0').removeAttribute('readOnly')
  }, [])

  const handleChange = (e, i) => {
    e.target.value = e.target.value.replace(/[^0-9]/gi, '')
    if (e.target.value !== '') {
      focusOn(i + 1)
    }

    const newCode = doms.map(d => d.value).join('')
    if (newCode.length === 6) {
      setValidOTP('sukses')
      onChange('otpNumber', newCode)
    } else {
      focusOn(newCode.length)
      document.getElementById(`input${newCode.length}`).removeAttribute('readOnly')
      setValidOTP('first')
    }
    // remove error message
    // setOTPInvalidity(newCode.length !== 6)
  }

  const handleKeyDown = (e, i) => {
    const keyCodeDel = 8
    if (e.keyCode === keyCodeDel && e.target.value === '' && i !== 0) {
      document.getElementById(`input${i}`).style.borderColor = '#D7DCDF'
      focusOn(i - 1)
    }
  }
  const handleClick = (e, i) => {
    const newCode = doms.map(d => d.value).join('')
    newCode.length === 6 ? focusOn(newCode.length - 1) : focusOn(newCode.length)
    document.getElementById(`input${newCode.length}`).removeAttribute('readOnly')
    if (e.target.value === '' && i !== 0) {
      document.getElementById(`input${i}`).style.borderColor = '#D7DCDF'
    }
  }
  const codeBoxItems = [0, 1, 2, 3, 4, 5].map(i => (
      <CodeInput key={i}>
        <input
          id={`input${i}`}
          type="tel"
          maxLength="1"
          autoComplete="false"
          autoCorrect="off"
          autoCapitalize="off"
          readOnly
          spellCheck="false"
          onChange={e => handleChange(e, i)}
          onClick={(e) => {
            handleClick(e, i)
          }}
          onKeyDown={e => handleKeyDown(e, i)}
          onFocus={() => {
            document.getElementById(`input${i}`).style.borderWidth = '2px'
            document.getElementById(`input${i}`).style.borderColor = '#33AD5C'
          }}
          key={i}
          className={classnames(`text-[24px] text-medium font-poppins rounded-lg ${(validOTP === 'sukses') && '!border-2 !border-[#33AD5C] !text-[#33AD5C]'} ${validOTP === 'error' && '!border-2 !border-red-600 !text-[#000000]'} focus:border-[#33AD5C]`)}
          ref={dom => {
            doms[i] = dom
          }}
        />
      </CodeInput>
  ))

  return (
      <Wrapper className={classnames(`${classProps} relative`)}>
        <CodeWrapper>{codeBoxItems}</CodeWrapper>
        {
         messageError !== '' && (
          <p className={classnames('text-[#FF0025] text-[14px] font-poppins tracking-[0.0035em] leading-[20px] mt-[3px] ')}>{messageError}</p>
         )
        }
      </Wrapper>
  )
}

InputOTP.propTypes = {
  validate: PropTypes.func,
  validationMessage: PropTypes.string,
  afterValidate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  setOTPInvalidity: PropTypes.func,
  cRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  classProps: PropTypes.string,
  validOTP: PropTypes.string,
  setValidOTP: PropTypes.func,
  messageError: PropTypes.string
}
export default InputOTP
