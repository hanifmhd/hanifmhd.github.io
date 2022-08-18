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
  setDisabledButon,
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
      setDisabledButon(false)
    } else {
      focusOn(newCode.length)
      document.getElementById(`input${newCode.length}`).removeAttribute('readOnly')
      setValidOTP('first')
      setDisabledButon(true)
    }
    // remove error message
    // setDisabledButon(newCode.length !== 6)
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
    console.log('input newCode.length}', newCode.length)
    if (document.getElementById(`input${newCode.length - 1}`).hasAttribute('readOnly')) {
      document.getElementById(`input${newCode.length - 1}`).removeAttribute('readOnly')
    }
    if (e.target.value === '' && i !== 0) {
      document.getElementById(`input${i}`).style.borderColor = '#D7DCDF'
    }
  }

  const generateStyle = () => {
    if (validOTP === 'sukses') {
      return '!border-2 !border-success !text-success'
    }
    if (validOTP === 'error') {
      return '!border-2 !border-[#FF0025] !text-semiblack'
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
          className={classnames(`text-[24px] text-medium font-poppins rounded-lg ${generateStyle()} focus:border-success`)}
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
          <p className={classnames('text-danger text-[14px] font-poppins letter-spacing-default leading-[20px] mt-[3px] ')}>{messageError}</p>
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
  setDisabledButon: PropTypes.func,
  cRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  classProps: PropTypes.string,
  validOTP: PropTypes.string,
  setValidOTP: PropTypes.func,
  messageError: PropTypes.string
}
export default InputOTP
