import '../styles/globals.css'
import React from 'react'
import {Toaster} from 'react-hot-toast'

import {Layout} from '../components'
import {StateContext} from '../context/StateContext'


function MyApp({ Component, pageProps }) {
  return (
    // we are simply passing the data from our state context to every single component we have in our application 
    // we aren't explicitly passing it, but since Layout and Component are children of StateContext, they will be able to share the data
    <StateContext>
      <Layout> 
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
