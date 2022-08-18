/**
 *
 * InputPhoneNew
 * Component documentation goes here
 */

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
// import { useIntl } from 'react-intl';
//
import classnames from 'classnames'
// import messages from './messages';
import { InputWrapper } from './styles'
function InputPhoneNew ({
  onChange,
  name,
  id,
  type = 'text',
  label,
  pattern = /[^0-9]/gi,
  formatter,
  validateOptions,
  iconLeft,
  placeholder,
  valueSet,
  register = () => {},
  classProps,
  classPropsInput,
  iconRight,
  onClickIcon,
  typeInput,
  ...inputProps
}) {
  // const intl = useIntl();
  const ref = useRef()
  const [showButtonClear, setShowButtonClear] = useState('')

  const handleChange = ({ currentTarget: { value } }) => {
    const newValue = pattern
      ? value.replace(pattern, '').replace(/(^\s*)/g, '')
      : value.replace(/(^\s*)/g, '')
    const formated = formatter ? formatter(newValue) : newValue
    if (formated.substring(0, 1) === 0 || formated.substring(0, 1) === '0') {
      const convertReplace = replaceZero(formated, 0, '')
      onChange(name, convertReplace)
    } else {
      onChange(name, formated)
    }
  }
  const replaceZero = (str, index, chr) => {
    if (index > str.length - 1) return str
    return str.substring(0, index) + chr + str.substring(index + 1)
  }
  useEffect(() => {
    if (valueSet !== '') {
      setShowButtonClear(true)
    } else {
      setShowButtonClear(false)
    }
  }, [valueSet])

  const generateStyleComponent = (typeComponent) => {
    if (typeComponent === 'noBorder') {
      return 'w-full text-left relative ml-[25px] min-h-[32px] bg-white !py-[4px] pr-[2em] border-t-0 border-l-0 border-r-0 border-b-2 border-lightgrey pl-[8px] focus:border-lightgrey'
    } else {
      return 'w-full py-[9px] pr-[2em] pl-[8px] focus:border-none'
    }
  }

  const generateIconLeft = () => {
    if (iconLeft) {
      return (
        <div className={classnames('flex flex-row justify-center items-center h-[32px] bg-[#EBF0F4] pl-[4px] pr-[4px] pt-[4px] pb-[4px] min-w-[71px] rounded-[4px]')}>
            <img src={iconLeft} className={classnames('w-[16px] h-[16px] mr-[4px]')}/>
            <span className={classnames('font-medium font-poppins')}>+62</span>
        </div>
      )
    } else {
      return (
        <div className={classnames('flex flex-row justify-center items-center  text-semiblack font-poppins pl-[16px]')}>
            <span className={classnames('font-poppins text-[14px] pt-[2px]')}>+62</span>
        </div>
      )
    }
  }

  return (
    <InputWrapper
      className={classnames(`flex relative  ${classProps}`)}
      {...inputProps}
    >
      {label && (
        <label className={classnames('text-[14px] leading-[24px] font-[poppins] text-primary text-left mb-[4px]')} htmlFor={id}>
          {label}
        </label>
      )}
       <div className={classnames(`flex ${typeInput === 'default' ? 'text-primary flex-row  relative border border-[#E4E8EC] rounded-[4px] text-[14px]' : 'w-full'}`)}>
       {generateIconLeft()}
          <input
            className={classnames(`${generateStyleComponent(typeInput)} ${classPropsInput}`)}
            type={type}
            readOnly={inputProps.readonly}
            id={id}
            name={name}
            onChange={handleChange}
            ref={ref}
            placeholder={placeholder}
            value={valueSet}
            maxLength={validateOptions.maxLen}
            disabled={inputProps.disabled}
            {...register(name, {
              required: inputProps.required,
              minLength: {
                value:
                  validateOptions &&
                  validateOptions.minLen !== undefined &&
                  validateOptions.minLen
              },
              maxLength: {
                value:
                validateOptions &&
                validateOptions.maxLen !== undefined &&
                validateOptions.maxLen
              }
            })}
          />
          {
          iconRight && showButtonClear && (
            <button onClick={() => { onClickIcon && onClickIcon() }} type="button" className={classnames('absolute right-[8px] top-[10px] w-[16px]')}>
              <img src={iconRight}/>
            </button>
          )
          }
        </div>
    </InputWrapper>
  )
}

InputPhoneNew.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  validationMessage: PropTypes.string,
  pattern: PropTypes.instanceOf(RegExp),
  cRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  formatter: PropTypes.func,
  validate: PropTypes.func,
  validateOptions: PropTypes.object,
  afterValidate: PropTypes.func,
  iconLeft: PropTypes.string,
  placeholder: PropTypes.string,
  errorTextId: PropTypes.string,
  maxLength: PropTypes.number,
  notOnBlur: PropTypes.bool,
  valueSet: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isDisabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.object
  ]),
  displayInput: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.object
  ]),
  labelSub: PropTypes.string,
  bgNone: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.object
  ]),
  register: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.object
  ]),
  classProps: PropTypes.string,
  classPropsInput: PropTypes.string,
  iconRight: PropTypes.string,
  onClickIcon: PropTypes.func,
  typeInput: PropTypes.string
}

export default InputPhoneNew
