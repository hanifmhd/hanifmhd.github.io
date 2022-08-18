/* eslint-disable no-unused-vars */

/**
 *
 * Dropdown
 * Component documentation goes here
 */

import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { InputWrapper } from './styles'

function Dropdown ({
  validationMessage,
  options,
  onChange,
  value,
  name,
  placeholder,
  isDisabled,
  isSearchable,
  isCreatable,
  hide = false,
  label,
  id,
  displayInput = 'block',
  classProps,
  ...rest
}) {
  const [currentOptions, setCurrentOptions] = useState(options || [])
  const makeHandleOnChange = nameProp => event => {
    onChange(nameProp, event.value)
  }

  useEffect(() => {
    setCurrentOptions(options)
  }, [options])

  return (
     <InputWrapper
       status={false}
       style={{ display: hide ? 'none' : displayInput }}
       className={classnames(`${classProps}`)}
     >
       {label && (
         <label
           className={classnames('text-[14px] text-primary')}
           htmlFor={id}
         >
           {label}
         </label>
       )}
       <div style={{ position: 'relative', marginTop: '3px' }}>
         {!isCreatable && (
           <Select
             {...rest}
             id={id}
             placeholder={placeholder}
             isSearchable={isSearchable || false}
             options={currentOptions}
             value={value}
             onChange={makeHandleOnChange(name)}
             isDisabled={isDisabled}
             theme={theme => ({
               ...theme,
               colors: {
                 ...theme.colors,
                 primary25: 'transparent'
               }
             })}
           />
         )}
       </div>
       {validationMessage && (
          <p className={classnames(`text-danger text-md leading-[20px] letter-spacing-default text-left ${rest.errors ? 'block' : 'hidden'}`)}>
            {rest.errors?.message}
          </p>
       )}
     </InputWrapper>
  )
}

Dropdown.propTypes = {
  validate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  validationMessage: PropTypes.string,
  afterValidate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    })
  ),
  cRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.any]),
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isCreatable: PropTypes.bool,
  hide: PropTypes.bool,
  label: PropTypes.string,
  iconLeft: PropTypes.string,
  id: PropTypes.string,
  displayInput: PropTypes.string,
  labelSub: PropTypes.string,
  classProps: PropTypes.string
}

export default Dropdown
