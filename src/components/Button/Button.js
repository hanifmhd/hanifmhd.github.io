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
  noBorder = false,
  noFill = false,
  classProps,
  ...rest
}) {
  /* eslint-disable */
   switch (variant) {
     case 'primary':
       return (
         <button
           className={classnames(`py-[12px] px-[15px] rounded-[4px] cursor-pointer block ${!disabled ? !noFill ? 'bg-[#00446A] text-white border-none hover:opacity-[.7]' : 'bg-[#ffff] text-[#00446A] border border-[#00446A]' : 'bg-[#D7DCDF] text-white'} font-poppins ${classProps}`)}
           type={type}
           onClick={onClick}
           disabled={disabled}
           color={color}
           {...rest}
         >
           {text}
         </button>
       );
 
     case 'success':
        return (
            <button
              className={classnames(`py-[12px] px-[15px] rounded-[4px] cursor-pointer block ${!disabled ?!noFill ? 'bg-[#33AD5C] text-white border-none hover:opacity-[.7]' : 'bg-[#ffff] hover:bg-[#33AD5C] hover:text-white text-[#33AD5C] border border-[#33AD5C]' : 'bg-[#D7DCDF] text-white'} font-poppins ${classProps}`)}
              type={type}
              onClick={onClick}
              disabled={disabled}
              color={color}
              {...rest}
            >
              {text}
            </button>
          );

          case 'warning':
            return (
                <button
                  className={classnames(`py-[12px] px-[15px] rounded-[4px] cursor-pointer block ${!disabled ? !noFill ? 'bg-[#F89C30] text-white border-none hover:opacity-[.7]' : 'bg-[#ffff] text-[#F89C30] border border-[#F89C30]' : 'bg-[#D7DCDF] text-white'} font-poppins ${classProps}`)}
                  type={type}
                  onClick={onClick}
                  disabled={disabled}
                  color={color}
                  {...rest}
                >
                  {text}
                </button>
              );

          case 'noColor':
            return (
                <button
                  className={classnames(`py-[12px] px-[15px] rounded-[4px] cursor-pointer block text-[#003E60] font-semibold font-poppins ${classProps}`)}
                  type={type}
                  onClick={onClick}
                  disabled={disabled}
                  color={color}
                  {...rest}
                >
                  {text}
                </button>
              );
 
     default:
        return (
            <button
              className={classnames(`py-[12px] px-[15px] rounded-[4px] cursor-pointer block ${!noFill ? 'bg-[#00446A] text-white border-none hover:opacity-[.7]' : 'bg-[#ffff] text-[#00446A] border border-[#00446A]'} font-poppins ${classProps}`)}
              type={type}
              onClick={onClick}
              disabled={disabled}
              color={color}
              {...rest}
            >
              {text}
            </button>
          );
       break;
   }
   /* eslint-enable */
}

Button.propTypes = {
  text: PropTypes.string,
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
