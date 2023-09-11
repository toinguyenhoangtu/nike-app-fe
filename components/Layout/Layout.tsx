import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'
const Header = dynamic(()=> import("@components/Layout/Header/Header"),{
    ssr:true
})
const Footer = dynamic(()=> import("@components/Layout/Footer/Footer"),{
  ssr:true
})

const Layout = ({children} :{children : ReactNode} ) => {
  return (
    <>
        <Header/>
        {children}
        <Footer/>
    </>
  )
}
export default Layout
