import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Dashboard from '../../assets/icon/Dashboard_Active.png'
import SidebarIcon from '../../assets/icon/SidebarIcon.png'
import PropTypes from 'prop-types'

function SidebarFull ({ showSidebar, className }) {
  const hideSidebar = () => {
    showSidebar(false)
  }

  return (
      <div className={classnames(`min-h-screen bg-white shadow-md shadow- border-grey border-[#E6F5EB] relative ${className} `)} >
        {/* <div> */}
            <h4 className={classnames('text-[#006D24] font-semibold leading-[32px] tracking-[0.25px] text-[24px] text-center mt-[32px] mr-[40px] font-poppins mb-[25px]')}>
                Panel Admin
            </h4>
            <hr/>
            <Link to="/">
                <div style={{ height: '52px' }} className={classnames('flex flex-row p-[24px] bg-[#E6F5EB] mt-[28px] items-center relative rounded-tr-lg rounded-br-lg mr-[15px]')}>
                    <div className={classnames('absolute h-[52px] mr-[8px] w-[6px] bg-success left-0 rounded-tr-md rounded-br-md')}>&nbsp;</div>
                    <img className={classnames('w-[20px] h-[20px]')} src={Dashboard}/>  <span className={classnames('font-semibold tracking-[0.0035em] text-success ml-[15px]')}>Laporan</span>
                </div>
            </Link>
        <button className={classnames('w-[45px] rounded-full h-[45px] z-99 bg-white flex items-center place-content-center shadow-md border border-slate-200 shadow-[#00000] absolute top-[25px] right-[-20px]')} onClick={() => { hideSidebar() }}>
            <img className={classnames(' w-[20px] h-[20px]')} src={SidebarIcon}/>
        </button>
      </div>
  )
}

SidebarFull.propTypes = {
  showSidebar: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  id: PropTypes.string,
  className: PropTypes.string
}
export default SidebarFull
