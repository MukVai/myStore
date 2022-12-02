import React from 'react';

import { Product, FooterBanner, HeroBanner } from '../components';

const Home = () => {
  return (
    <div >
      <HeroBanner />
      <div className="products-heading">
        <h2> Best Selling Products </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia aliquid vitae, nemo repellat impedit esse quasi at laboriosam laudantium cum ducimus? Dolorum, dolor?</p>
      </div>

      <div className="products-container">{
        ['Product 1', 'Product 2'].map((product) => product)
      }
      </div>

      <FooterBanner />
    </div>
  )
}

export default Home
