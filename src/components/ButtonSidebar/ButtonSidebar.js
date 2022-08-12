import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//
//

import classnames from 'classnames'

function ButtonSidebar ({
  title = '',
  icon = '',
  active = false,
  url = '',
  classProps
}) {
  return (
      <Link to={url}>
        <div className={classnames(`text-center flex flex-col items-center mt-[15px] pr-[10px] pl-[10px] ${classProps}`)}>
                <p className={classnames('text-[10px] mb-[5px] w-[60px] font-normal')}>{title}</p>
                <img src={icon} className={classnames(' w-[45px]')}/>
        </div>
      </Link>
  )
}

ButtonSidebar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  url: PropTypes.string,
  classProps: PropTypes.string
}

export default ButtonSidebar
