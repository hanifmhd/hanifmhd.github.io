/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
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
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import Unauthorized from '../Unauthorized/Unauthorized'
import Report from '../Report/Report'
import PersistLogin from '../../components/PersistLogin/PersistLogin'
import { AppWrapper } from './styles'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
// End Pages
// Utils
import '../../utils/modal.css'
import './App.css'

function App () {
  const store = createStore(
    rootReducers,
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunk)
      : composeWithDevTools(applyMiddleware(thunk))
  )
  const [showSide, setShowSide] = React.useState(true)
  return (
      <Provider store={store}>
           <AppWrapper>
           <Routes>
           <Route path="login" element={<Login/>}/>
                   <Route path="/" element={<Layout showSidebarProps={setShowSide}/>}>
                       <Route element={<PersistLogin/>}>
                        {/* Private */}
                           <Route element={<RequiredAuth allowedRoles={[2]} />}>
                              <Route path="/dashboard" element={<Dashboard/>}/>
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
        </AppWrapper>
      </Provider>
  )
}

export default App
