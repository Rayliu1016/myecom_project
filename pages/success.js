import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs'

import { useStateContext } from '../context/StateContext';
import { runFireWorks } from '../lib/utils';

const Success = () => {
  // grab some of the global properties from useStateContext 
  const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();

  // clearing the state of the cart. Since the person has purchased we want to clear all the states 
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireWorks();
  }, [])
  
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your support!</h2>
            <p className='email-msg'>Check your email for the receipt</p>
            <p 
                className='description'>If you have any questons, please email
                <a className='email' href='mailto:rayliu1016@gmail.com'>rayliu1016@gmail.com</a>
            </p>
            <Link href="/">
                <button type='button' width='300px' className='btn'>
                    continue shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success