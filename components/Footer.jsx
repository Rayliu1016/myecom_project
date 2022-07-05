import React from 'react'
// import some social icons 
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
        <p>2022 Raymond Headphones All Rights Reserved</p>
        <p className='icons'>
            <AiFillInstagram/>
            <AiOutlineTwitter/>
        </p>
    </div>
  )
}

export default Footer