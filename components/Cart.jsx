import React, {useRef} from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import Product from '../sanity_ecom/schemas/product'
import product from '../sanity_ecom/schemas/product'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef();

  const {totalPrice, totalQuantities, cartItems, setShowCart, decQty, incQty, toggleCartItemQuqantity, onRemove} = useStateContext();

  const handleCheckout = async() => {
    // create our stripe object to work with
    const stripe = await getStripe(); 

    // how make a api request to our own NEXT.JS application 
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      // we are passing in all of our products into the body of this request
      body: JSON.stringify(cartItems),
    })

    if (response.statusCode === 500) return; 

    // if the response is not an error code, let's await the response 
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({sessionId: data.id});
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'> 
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart </span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {/* If the cart is empty, let's show place holder image and redirect them to go shopping */}
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size ={150}/>
            <h3> Your Shopping Cart is Empty </h3>
            <Link href = "/">
              <button type="button" onClick={() => setShowCart(false)} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {/* if there are items in the cart, clicking on the cart should show the items, their name, their price, and quantity */}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image'/> 
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuqantity(item._id, 'dec')}> <AiOutlineMinus/> </span>
                      <span className='num' onClick="">{item.quantity}</span>
                      <span className='plus' onClick={() => toggleCartItemQuqantity(item._id, 'inc')}> <AiOutlinePlus/> </span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                    <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* show the subtotal of the cart if we have items */}
        {cartItems. length >= 1 && (
          <div className='cart-bottom'> 
            <div className='total'>
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
        <p>Note: You will not receive any products by purchasing</p>
      </div>
    </div>
  )
}

export default Cart