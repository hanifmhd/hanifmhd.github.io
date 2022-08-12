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
  validate,
  validationMessage,
  afterValidate,
  options,
  onChange,
  value,
  name,
  cRef,
  placeholder,
  isDisabled,
  isSearchable,
  isCreatable,
  hide = false,
  label,
  iconLeft,
  id,
  showItalic,
  labelItalic,
  displayInput = 'block',
  labelSub,
  classProps,
  ...rest
}) {
  //  const [status, doValidate] = useValidate(validate, afterValidate);
  // const [_, setCurrentValue] = useState()
  const [currentOptions, setCurrentOptions] = useState(options || [])

  const makeHandleOnChange = nameProp => event => {
    onChange(nameProp, event.value)
    // setCurrentValue(event)
    //  doValidate(event.value);
  }

  useEffect(() => {
    setCurrentOptions(options)
  }, [options])
  //  const errorStatus = rest.errors !== undefined ? -1 : status;
  return (
     <InputWrapper
       status={false}
       style={{ display: hide ? 'none' : displayInput }}
       className={classnames(`${classProps}`)}
     >
       {label && (
         <label
           className={classnames('text-[14px] text-[#003E60]')}
           htmlFor={id}
         >
           {label}
         </label>
       )}
       {showItalic && (
         <>
           <br />
           <label
             style={{
               fontSize: '13px',
               fontStyle: 'italic',
               color: '#ADB5BD'
             }}
           >
             {labelItalic}
           </label>
         </>
       )}
       <div style={{ position: 'relative', marginTop: '3px' }}>
         {!isCreatable && (
           <Select
             {...rest}
             id={id}
             placeholder={placeholder}
             isSearchable={isSearchable || false}
             options={currentOptions}
             value={currentOptions.filter(option => option.value === value)
             }
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
      <p className={classnames('absolute bottom-[-25px] text-red-500')}>
        {validationMessage}
      </p>

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
  showItalic: PropTypes.bool,
  labelItalic: PropTypes.string,
  displayInput: PropTypes.string,
  labelSub: PropTypes.string,
  classProps: PropTypes.string
}

export default Dropdown
