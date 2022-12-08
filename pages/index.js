import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => {
  return (
    <div >
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />    {/* check if banner-len!=0 and if so, return 1st element */}
      <div className="products-heading">
        <h2> Best Selling Products </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia aliquid vitae, nemo repellat impedit esse quasi at laboriosam laudantium cum ducimus? Dolorum, dolor?</p>
      </div>

      <div className="products-container">{
        products?.map((product) => <Product key={product._id} product={product} />)
      }
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}
export default Home
