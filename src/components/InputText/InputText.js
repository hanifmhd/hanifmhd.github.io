/* eslint-disable no-unused-expressions */
/**
 *
 * InputText
 * Component documentation goes here
 */

import React, { useRef } from 'react'
import PropTypes from 'prop-types'
// import { useIntl } from 'react-intl';
//
import classnames from 'classnames'
// import messages from './messages';
import { InputWrapper } from './styles'
function InputText ({
  onChange,
  name,
  id,
  type = 'text',
  label,
  validationMessage,
  cRef,
  pattern,
  formatter,
  validate,
  validateOptions,
  iconLeft,
  placeholder,
  valueSet,
  errorTextId,
  maxLength = 100,
  notOnBlur,
  register = () => {},
  classProps,
  classPropsInput,
  iconRight,
  onClickIcon,
  ...inputProps
}) {
  // const intl = useIntl();
  const ref = useRef()

  const handleChange = ({ currentTarget: { value } }) => {
    let newValue = pattern
      ? value.replace(pattern, '').replace(/(^\s*)/g, '')
      : value.replace(/(^\s*)/g, '')

    if (type === 'numeric') {
      newValue = newValue.replace(/[^0-9]/gi, '').trim()
      const formated = formatter ? formatter(newValue) : newValue
      onChange(name, formated)
    } else {
      const formated = formatter ? formatter(newValue) : newValue
      onChange(name, formated)
    }
  }

  const handleOnBlur = async e => {
    const newValue = pattern
      ? e.target.value.replace(pattern, '').replace(/(^\s*)|(\s*$)/g, '')
      : e.target.value.replace(/(^\s*)|(\s*$)/g, '')
    const formated = formatter ? formatter(newValue) : newValue
    onChange(name, formated)
  }
  // Focus
  const handleOnFocus = e => {
    if (type === 'numeric') {
      const targetVal = e.target.value.replace(/[^0-9]/gi, '').trim()
      onChange(name, targetVal)
    }
  }

  return (
     <InputWrapper
       className={classnames(`flex relative  ${classProps}`)}
       {...inputProps}
     >
       {label && (
         <label className={classnames('text-[14px] leading-[24px] font-[poppins] text-black text-left')} htmlFor={id}>
           {label}
         </label>
       )}

       <input
           className={classnames(`w-full border border-[#D7DCDF]  text-[#6C757D]  ${inputProps.readonly && '!bg-[#EBF0F4] !text-[#000000]'} rounded-md py-[10px] px-[16px] tracking-[0.5px] gap-[10px] leading-[24px] font-[poppins] ${classPropsInput}`)}
           type={type}
           readOnly={inputProps.readonly}
           id={id}
           name={name}
           onChange={handleChange}
           ref={ref}
           placeholder={placeholder}
           defaultValue={valueSet}
           // value={valueSet}
           maxLength={maxLength}
           onBlur={e => {
             !notOnBlur ? handleOnBlur(e) : ''
           }}
           onFocus={e => handleOnFocus(e)}
           disabled={inputProps.disabled}
           {...register(name, {
             required: inputProps.required,
             minLength: {
               value:
                 validateOptions &&
                 validateOptions.minLen !== undefined &&
                 validateOptions.minLen
             }
           })}
         />
         {
          iconRight && (
            <button onClick={() => { onClickIcon && onClickIcon() }} className={classnames('absolute right-[19px] top-[13px] w-[18px]')}>
              <img src={iconRight}/>
            </button>
          )
         }
     </InputWrapper>
  )
}

InputText.propTypes = {
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
  onClickIcon: PropTypes.func
}

export default InputText
