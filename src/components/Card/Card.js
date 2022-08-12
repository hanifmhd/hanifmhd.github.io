import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function Card ({ title = '', color, children, classProps, classPropsCard }) {
  return (
      <div className={classnames(`bg-white relative pt-[16px] pb-[24px] ${classProps}`)}>
            {
                title !== '' && (
                    <div className={classnames('flex items-center place-items-center content-center mb-[27px] mt-[19px] pl-[12px] ')}>
                        <div className={classnames(`absolute h-[32px] w-[4px] bg-[${color}] left-0 rounded-tr-md rounded-br-md`)}>&nbsp;</div>
                        <p className={classnames('ml-[12px]  text-[16px] text-black font-semibold')} >{title}</p>
                    </div>
                )
            }
            <div className={classnames(`px-[24px] ${classPropsCard}`)}>
            {children}
            </div>
      </div>
  )
}
Card.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
  classProps: PropTypes.string,
  classPropsCard: PropTypes.string
}

export default Card
