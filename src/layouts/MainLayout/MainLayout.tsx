import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/Components/Footer/Footer'
import Header from 'src/Components/HeaderHomePage/HeaderHomePage'
import useRouteElements from 'src/useRouteElements'

export const MainLayout = () => {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}
