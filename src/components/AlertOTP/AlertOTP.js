import React from 'react'
import classnames from 'classnames'
import Button from '../Button/Button'
import Close from '../../assets/icon/close.png'
import PropTypes from 'prop-types'

function AlertOTP ({ className, thumbnail, title, subTitle, closeModal, onClick }) {
  return (
      <div className={classnames(`flex items-center justify-center flex-col relative px-[48px] pt-[48px] pb-[24px] ${className} `)}>
        <button onClick={() => { closeModal() }}>
            <img src={Close} className={classnames('w-[24px] absolute right-[16px] top-[16px]')}/>
        </button>
        <img src={thumbnail} alt="thumbnail" className={classnames('w-[228px]')}/>
        <h5 className={classnames('font-poppins text-lg font-semibold text-semiblack mt-[20px]')}>{title}</h5>
        <p className={classnames('font-poppins text-[14px]  text-semiblack mt-[16px] text-left')}>{subTitle}</p>

        <Button
            text='Coba Lagi'
            noFill
            variant='default'
            classProps={classnames('w-full font-semibold rounded-full mt-[44px]')}
            onClick={() => { onClick() }}
        />
      </div>
  )
}

AlertOTP.propTypes = {
  className: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  closeModal: PropTypes.func,
  onClick: PropTypes.func
}

export default AlertOTP
