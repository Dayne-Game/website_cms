import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="vh-100">
        <Sidebar />
        <div className="main_wrapper">
          <Outlet />
        </div>
    </div>
  )
}

export default Layout