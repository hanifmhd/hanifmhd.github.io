import React, { useEffect } from 'react'
import classnames from 'classnames'
import { InputBox, InputWrap, InputLabel, InputValue } from './styles'
import PropTypes from 'prop-types'
//

export default function InputPhone ({
  classProps,
  classPropsBox,
  placeholder,
  onChange,
  valueSet,
  onFocus,
  onClick,
  onSubmitPhone = false,
  name = 'default',
  textType = 'center',
  iconRight,
  onClickIcon,
  label
}) {
  const inputValueText = document.getElementsByClassName('input-value')
  useEffect(() => {
    inputValueText[0].addEventListener('keypress',
      (e) => {
        const range = document.createRange()
        const sel = window.getSelection()

        range.setStart(inputValueText[0], 1)
        range.collapse(true)

        sel.removeAllRanges()
        sel.addRange(range)
        inputValueText[0].focus()
        if (e.which < 48 || e.which > 57 || e.currentTarget.textContent.length > 12) {
          e.preventDefault()
        }
      })
    inputValueText[0].addEventListener('keyup',
      (e) => {
        onChange(name, e.currentTarget.textContent)
      })
  }, [])

  const notFocusValueSetStyle = 'font-poppins font-medium leading-[24px] tracking-[0.5px] text-[#00253A]'
  const focusSetStyle = 'font-poppins font-medium leading-[24px] tracking-[0.5px] text-[#00253A]'
  const notFocusStyle = 'font-poppins font-medium leading-[20px] tracking-[0.0035em] text-[#BABEC1]'

  const generateStyle = () => {
    if (!onFocus && valueSet !== '') {
      return `${notFocusValueSetStyle}`
    } else {
      if (onFocus) {
        return `${focusSetStyle}`
      } else {
        return `${notFocusStyle}`
      }
    }
  }

  return (
      <div className={classnames(`${classProps}`)} onClick={() => { onClick() }}>
          {
          label && (
            <label className={classnames('text-[14px] leading-[24px] font-[poppins] text-[#003E60] text-left')} >
              {label}
            </label>
          )}
        <InputBox className={classnames(`${classPropsBox}`)}>
            <InputWrap className={classnames(`${textType === 'center' ? 'w-full' : '!pl-[16px]'}`)}>
                <InputLabel className={classnames('font-poppins leading-[24px] tracking-[0.5px] font-medium text-primary')}>
                  +62
                </InputLabel>
                <InputValue contentEditable="true" suppressContentEditableWarning={true} className={classnames(`input-value focus:outline-0  ${generateStyle()} cursor-text  ${!onFocus && valueSet === '' ? '!pt-[12px]' : '!pt-[10px]'}`)}>
                    {!onFocus && onSubmitPhone ? valueSet : onFocus ? '' : placeholder}</InputValue>
            </InputWrap>

        {
          iconRight && (
            <button onClick={() => { onClickIcon && onClickIcon() }} className={classnames('absolute right-[19px] top-[13px] w-[18px]')}>
              <img src={iconRight}/>
            </button>
          )
         }
        </InputBox>
      </div>
  )
}

InputPhone.propTypes = {
  classProps: PropTypes.string,
  classPropsBox: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  valueSet: PropTypes.string,
  onFocus: PropTypes.bool,
  onClick: PropTypes.func,
  onSubmitPhone: PropTypes.bool,
  name: PropTypes.string,
  textType: PropTypes.string,
  iconRight: PropTypes.string,
  onClickIcon: PropTypes.func,
  label: PropTypes.string
}
