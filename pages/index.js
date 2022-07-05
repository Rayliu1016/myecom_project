import React from 'react'
import {Product, FooterBanner, HeroBanner, Footer} from '../components'
import {client} from '../lib/client'

// In our home page we use custom componentes that we made... heroBanner, Product, and FooterBanner which are defined in components

const Home = ({products, bannerData}) => {
  return (
    <div>
      <HeroBanner heroBanner = {bannerData.length && bannerData[0]}/>

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Everday Favorites</p>
      </div>
      
      <div className='products-container'> 
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
    
      <FooterBanner footBanner ={bannerData && bannerData[0]}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  // grab all the products from our sanity dashboard 
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // grab the information for our banner from our sanity dashboard 
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  }
}

export default Home

/*
The home page is essentially... 
1. Hero banner at the top 
2. Best selling products 
3. Footer 
*/
