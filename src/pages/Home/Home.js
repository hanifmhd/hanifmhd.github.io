import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Testing from '../Testing/Testing'
import RequiredAuth from '../../components/RequiredAuth/RequiredAuth'
import classnames from 'classnames'
import Layout from '../../components/Layout/Layout'

function Home () {
  const { path } = useMatch()
  return (
    <Routes>
    <Route path="/" element={<Layout/>}>
    <div className={classnames('bg-black min-h-screen flex flex-row text-white')}>
      <Route element={<RequiredAuth allowedRoles={1} />}>
        <Route path={path} render={<Dashboard/>}/>
        <Route path="/testing" render={<Testing/>}/>
    </Route>
   </div>
   </Route>
   </Routes>
  )
}

export default Home
