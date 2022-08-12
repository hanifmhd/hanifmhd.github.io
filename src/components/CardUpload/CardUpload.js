import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function CardUpload ({ title, subTitle, icon, onClick, opacity = 1 }) {
  return (
      <div className={classnames('flex w-min-screen  bg-white relative pt-[10px] pb-[10px] pr-[20px] pl-[20px] items-center place-items-center content-center border border-[#E4E8EC] rounded-lg transition duration-300 ease-in')} style={{ opacity }}>
            <img src={icon} className={classnames('w-[24px] h-[24px]')}/>
            <div className={classnames('flex flex-col mt-[10px] ml-[8px] text-left')}>
                <p className={classnames('text-[12px] text-black font-medium ')} >{title}</p>
                <p className={classnames('text-[10px] text-[#BABEC1] font-semibold')} >{subTitle}</p>
            </div>
            <button className="absolute right-[16px] text-[#33AD5C] font-medium" type="button" aria-label="Unggah Dokumen" onClick={onClick}>
                <p className={classnames('text-[10px]')}>Unggah Dokumen</p>
            </button>
      </div>
  )
}

CardUpload.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  opacity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default CardUpload
