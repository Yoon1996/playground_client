import React from 'react'
import { Outlet } from 'react-router-dom'

const AccountTemplate = () => {
  return (
    <>
    <div className="w-screen h-screen flex justify-center items-center">
    <Outlet></Outlet>
    </div>
    </>
  )
}

export default AccountTemplate