import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ButtonSidebar from '../ButtonSidebar/ButtonSidebar'
import ActHome from '../../assets/icon/act_home.png'

function Sidebar ({ className }) {
  return (
      <div className={classnames(`w-20  bg-secondary absolute mt-[136px] rounded-[20px] rounded-bl-none  ${className}`)}>
            <ButtonSidebar classProps={classnames('!pb-[30px]')} title="Laporan" icon={ActHome} url="/" />
      </div>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string
}

export default Sidebar
