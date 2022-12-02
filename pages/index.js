import React from 'react'

const Home = () => {
  return (
    <div>
      Herobanner 
      <div>
        <h2> Best Selling Products </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia aliquid vitae, nemo repellat impedit esse quasi at laboriosam laudantium cum ducimus? Dolorum, dolor?</p>
      </div>

      <div>{
        ['Product 1', 'Product 2'].map((product)=>product)
      }
      </div>

      Footer 
    </div>
  )
}

export default Home
