import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function Snackbar ({ type, text, classProps }) {
  switch (type) {
    case 'danger' :
      return (
        <div className={classnames(`bg-[#EE4949] w-[480px] rounded-md text-white py-[16px] pl-[24px] absolute bottom-[50px] ${classProps}`)}>
            <span className={classnames('font-poppins text-[16px] font-medium tracking-[0.2px]')}>
                {text}
            </span>
        </div>
      )
    default:
      return (
            <div className={classnames(`bg-[#EE4949] w-[480px] rounded-md text-white py-[16px] pl-[24px] absolute bottom-[50px] ${classProps}`)}>
            <span className={classnames('font-poppins text-[16px] font-medium tracking-[0.2px]')}>
                {text}
            </span>
        </div>
      )
  }
}
Snackbar.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  classProps: PropTypes.string
}

export default Snackbar
