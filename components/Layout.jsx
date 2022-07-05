import React, { Children } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

// we access to the children prop through the components pageProps from _app.js
const Layout = ({children}) => {
  return (
    <div className='layout'>
        <Head>
            <title>Raymond Headphones</title>
        </Head>
        <header>
            <Navbar/>
        </header>
        <main className='main-container'>
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Layout