import React from 'react'
import { Outlet } from 'react-router-dom'
import classnames from 'classnames'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import SidebarFull from '../../components/SidebarFull/SidebarFull'
import PropTypes from 'prop-types'

const Layout = ({ showSidebarProps }) => {
  const [showSide, setShowSide] = React.useState(true)

  const showSidebar = (value) => {
    setShowSide(!showSide)
    showSidebarProps(!showSide)
  }
  return (<>
    <div className={classnames('bg-[#F5F8FB] min-h-screen flex flex-col text-white z-0 w-full')}>
        <Header/>
      <div className={classnames('flex relative overflow-hidden')}>
        {
            <SidebarFull showSidebar={showSidebar} id="sidebar_full" className={`${showSide ? 'active_sidebar_full w-[256px]' : 'non_active_sidebar_full  w-[150px]'}`}/>
        }
        {
          <Sidebar id="sidebar" className={showSide ? 'active_sidebar' : 'non_active_sidebar'}/>
        }
        <div className={classnames('ml-[35px] relative mr-[48px] mt-[35px] ease-in duration-700 transition')} style={{ width: showSide ? 'calc(100vw - 257px)' : 'calc(100vw - 150px)' }}>
            <main className='App'>
                <Outlet />
            </main>

        </div>
      </div>
    </div>
  </>
  )
}

Layout.propTypes = {
  showSidebarProps: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.func
  ])
}

export default Layout
