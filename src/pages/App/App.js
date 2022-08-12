/* eslint-disable no-unused-vars */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducers from '../../store/rootReducers'
// End Redux
// Auth
import RequiredAuth from '../../components/RequiredAuth/RequiredAuth'
import useAuth from '../../hooks/useAuth'
// End Auth
// Pages
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import Testing from '../Testing/Testing'
import Unauthorized from '../Unauthorized/Unauthorized'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import SidebarFull from '../../components/SidebarFull/SidebarFull'
import Report from '../Report/Report'
import PersistLogin from '../../components/PersistLogin/PersistLogin'

import GlobalStyle from '../../utils/global-styles'
import { AppWrapper } from './styles'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
// End Pages
// Utils
import '../../utils/modal.css'
import classnames from 'classnames'
import './App.css'
import { loadFromLocalStorage } from '../../utils/local-storage-helper'
// End Utils

function App () {
  const store = createStore(
    rootReducers,
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunk)
      : composeWithDevTools(applyMiddleware(thunk))
  )
  const [showSide, setShowSide] = useState(true)
  const showSidebar = (value) => {
    setShowSide(!showSide)
  }
  const { auth } = useAuth()
  const user = loadFromLocalStorage('user')

  return (
    <Provider store={store}>
         <AppWrapper>
          {
            !user && (
              <Routes>
              {/* Public */}
                  <Route path="login" element={<Login/>}/>
                  <Route element={<RequiredAuth allowedRoles={[2]} />}>
                    <Route path="/" element={<Report/>}/>
                    <Route path="/report" element={<Report/>}/>

                  </Route>
                  <Route path="*" element={<NotFoundPage/>} />
              {/* End Public */}
            </Routes>
            )
          }

      {
        user && (
          <>
          {/* Private */}
          <div className={classnames('bg-[#F5F8FB] min-h-screen flex flex-col text-white z-0 w-full')}>
            <Header/>
            <div className={classnames('flex relative overflow-hidden')}>
            {
                <SidebarFull showSidebar={showSidebar} id="sidebar_full" className={showSide ? 'active_sidebar_full w-[256px]' : 'non_active_sidebar_full  w-[150px]'}/>
            }
            {
              <Sidebar id="sidebar" className={showSide ? 'active_sidebar' : 'non_active_sidebar'}/>
            }
              <div className={classnames('ml-[35px] relative mr-[48px] mt-[35px] ease-in duration-700 transition')} style={{ width: showSide ? 'calc(100vw - 257px)' : 'calc(100vw - 150px)' }}>
                <Routes>
                  <Route path="/" element={<Layout/>}>
                  <Route element={<PersistLogin/>}>
                      {/* Private */}
                        <Route element={<RequiredAuth allowedRoles={[2]} />}>
                          <Route path="/" element={<Report showSide={showSide}/>}/>
                          <Route path="/report" element={<Report />}/>

                        </Route>
                      {/* End Private */}
                      {/* Nout Found */}
                      <Route path="*" element={<NotFoundPage/>} />
                      {/* End Not FOund */}
                      {/* Authorized */}
                      <Route path="unauthorized" element={<Unauthorized/>}/>
                      {/* End Authorized */}
                      </Route>
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
          </>
        )
      }
      {/* End Private */}
      {/* <GlobalStyle/> */}
      </AppWrapper>
    </Provider>
  )
}

export default App
