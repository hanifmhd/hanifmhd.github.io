import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ArrowDown from '../../assets/image/arrow_down.png'
import PropTypes from 'prop-types'
import { Links } from './styles'

import classnames from 'classnames'

function CardUserHeader ({
  fullname = '',
  role = '',
  icon = '',
  url = '',
  onClick
}) {
  const [showLinks, setShowLinks] = useState(false)
  const ref = useRef()

  const handleToggle = () => {
    setShowLinks(!showLinks)
  }

  useOnClickOutside(ref, () => {
    setShowLinks(false)
  })

  // Hook
  function useOnClickOutside (ref, handler) {
    useEffect(() => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    }, [ref, handler])
  }

  return (
      <Link to={url}>
        <div className={classnames('relative flex flex-row')}>
            <div className={classnames('pl-[10px] pr-[12px] bg-[#FF546D] rounded-[100px] text-[12px] pr-[40px] pb-[3px] pt-[3px] font-medium cursor-default relative')}>
                {role}
                <div className={classnames('rounded-full absolute top-[-10px] right-[-10px] bg-white p-[3px]')}>
                    <img src={icon} className={classnames('w-[40px] h-[40px]')}/>
                </div>
            </div>

            <div className={classnames('pl-[15px] pr-[12px] bg-[#fff] rounded-[100px] rounded-tl-none rounded-bl-none text-[14px] text-black  pb-[3px] pt-[3px]')} onClick={handleToggle}>
                <span className={classnames('pr-[20px] font-medium')}>
                    {fullname}
                </span>
                <button>
                    <img src={ArrowDown} className={classnames('w-[16px] relative top-[0px] right-[5px]')} />
                </button>
            </div>
            {showLinks && (
                <Links className={classnames('shadow-md shadow-gray-400 rounded-md')}>
                    <button type="button" onClick={() => onClick()}>
                        Logout
                    </button>
                </Links>
            )}
        </div>
      </Link>
  )
}

CardUserHeader.propTypes = {
  fullname: PropTypes.string,
  role: PropTypes.string,
  role_id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  icon: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func
}

export default CardUserHeader
