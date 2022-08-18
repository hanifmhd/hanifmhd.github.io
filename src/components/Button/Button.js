/**
 *
 * Button
 * Component documentation goes here
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button ({
  text,
  type = 'button',
  variant = 'primary',
  disabled,
  onClick,
  color,
  noFill = false,
  classProps,
  ...rest
}) {
  // Function Mapping Style
  const mappingStyle = (variantStyle) => {
    if (!disabled) {
      if (variantStyle === 'primary') {
        if (!noFill) {
          return 'btn-primary'
        } else {
          return 'btn-no-fill-primary'
        }
      } else if (variantStyle === 'success') {
        if (!noFill) {
          return 'btn-success'
        } else {
          return 'btn-no-fill-success'
        }
      } else if (variantStyle === 'warning') {
        if (!noFill) {
          return 'btn-warning'
        } else {
          return 'btn-no-fill-warning'
        }
      } else if (variantStyle === 'danger') {
        if (!noFill) {
          return 'btn-danger'
        } else {
          return 'btn-no-fill-danger'
        }
      } else if (variantStyle === 'default') {
        if (!noFill) {
          return 'btn-default'
        } else {
          return 'btn-no-fill-default'
        }
      }
    } else {
      return 'btn-disabled'
    }
  }
  /* eslint-disable */
  return (
    <button
      className={classnames(`${mappingStyle(variant)} font-poppins ${classProps}`)}
      type={type}
      onClick={onClick}
      disabled={disabled}
      color={color}
      {...rest}
    >
      {text}
    </button>
  )
   /* eslint-enable */
}

Button.propTypes = {
  text: PropTypes.any,
  type: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  noBorder: PropTypes.bool,
  noFill: PropTypes.bool,
  classProps: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
