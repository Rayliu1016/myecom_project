// this file is named [slug] because the square brackets indicated the slug name will be pulled dynamically 
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { Product } from '../../components';
import {client, urlFor} from '../../lib/client';
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({product, products}) => {
  // unpack the product property into it's various attributes
  const { image, name, details, price } = product;
  // use state management here 
  const [index, setIndex] = useState(0)
  // destructure the state context and get relevant attributes and functons from it 
  const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext()

  // buy now function 
  const handleBuyNow = () => { 
    onAdd(product, qty);
    setShowCart(true);
  }
  
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index])} className='product-detail-image'/>
                </div>
                {/* this is where our carousel functionality comes in*/}
                <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img 
                        key = {i}
                        src={urlFor(item)}
                        className = {i == index ? 'small-image selected-image':'small-image'}
                        onMouseEnter= {() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
            {/* Start the product details description here: reviews, quantity, and buttons to buy and add to cart */}
            <div className='product-detail-desc'> 
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}> <AiOutlineMinus/> </span>
                        <span className='num'>{qty}</span>
                        <span className='plus' onClick={incQty}> <AiOutlinePlus/> </span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className="add-to-cart" onClick={() => onAdd(product, qty)}>
                        Add to Cart
                    </button> 
                    <button type='button' className="buy-now" onClick={handleBuyNow}>
                        Buy Now 
                    </button>
                </div>
            </div>
        </div>
        {/* add related products / products which are similar section */}
        <div className='maylike-products-wrapper'>
            <h2>You may also like:</h2>
            {/* list of scrolling divs given by marquee */}
            <div className='marquee'> 
                <div className='maylike-products-container track'>
                    {products.map((item) => (
                        <Product key={item._id} product={item}/>
                    ))}
                </div>
            </div>
        </div>

    </div>
  )
}

// if a page uses getStaticProps, it needs to define a list of paths to be statically generated 
export const getStaticPaths = async () => {
    // get all of the products, but do not give me all the data of the products, just return to me the current slug property
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;

    // get the products which map the query
    const products = await client.fetch(query);
    
    // for all the products which matched the query, generate the paths
    const paths = products.map(
        (product) => ({
            params: {
                slug: product.slug.current
            }
        })
    );

    return {
        paths, 
        fallback: 'blocking'
    }
}

// getStaticProps is used to pre-render the page at build time using props returned from getStaticProps 
export const getStaticProps = async ({params: {slug}}) => {
    // grab the first product from our sanity dashboard which match this specific slug 
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

    // fetch similar products to this one - in this case we are fetching all products though... 
    const productsQuery = `*[_type == "product"]`

    // Actually fetch the products from the queries above 
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery)
  
    return {
      props: {products, product}
    }
  }


export default ProductDetails