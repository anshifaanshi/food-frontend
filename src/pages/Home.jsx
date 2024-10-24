import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
function Home() {
  return (
    <>
   
    

      <main>
        <div className='headerdiv'>
          <div className='container'>
<div className='toper'>

</div>
<div className='blue'>
            <h1 className='welcome bg-inherit'>Order Your Favourite Food Here </h1>
            <p className='text-secondary fw-bold'>
              Order your favorite meals online and enjoy fast, fresh, and delicious food delivered right to your doorstep
              
            </p></div>
            <div className='buttondiv'>
            <Link to={'/signup'}>
              <button className='btn'>Join With Us</button>
            </Link>
            <Link to={'/login'}>
              <button className='btn'>LogIn</button>
            </Link>
            <br />
            <button className='btn'>
              <Link className='nav-link' to='/hotel/hotels'>
                Restaurants
              </Link>
            </button>
            </div>
          </div>


        </div>



        <div>
        <div className="image-container">
  <img src="https://www.talabat.com/assets/images/banner-img-1.webp" alt="" className="talabatpic1" />
  

  <p className="between-text">Discover your favorite meals and get them delivered fresh to your door with just a few clicks!</p>
  
  <img src="https://www.talabat.com/assets/images/banner-img-2.webp" className="talabatpic2" />


</div>






<div className='crave'>

          <p className='beautiful-text'>Whats Whould You Like Craves Today?</p>
        </div>

        <div className='container'>
          <div  className='row'>
            <div className='col-lg-3 col-sm'>
              <img src='https://tse3.mm.bing.net/th?id=OIP.Wp6XgnYRrIXB2P0mSTBhBAHaEo&pid=Api&P=0&h=220' className='styled-image'></img>

            </div>
            <div className='col-lg-3 col-sm'>
              <img src='https://tse2.mm.bing.net/th?id=OIP.OH41atW7q-eLSj8pIbe-XAHaE8&pid=Api&P=0&h=220' className='styled-image'></img>

            </div>
            
            <div className='col-lg-3 col-sm'>
              <img src='https://tse1.mm.bing.net/th?id=OIP.5l-sUrth0kbLqcqaAh6fzAHaEo&pid=Api&P=0&h=220' className='styled-image'></img>

            </div>
            <div className='col-lg-3 col-sm'>
              <img src='https://tse4.mm.bing.net/th?id=OIP.aL8FhlTSUXOq-w3h57t8AQHaEo&pid=Api&P=0&h=220' className='styled-image'></img>

            </div>

          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-sm'>
          
              <img src='https://tse3.mm.bing.net/th?id=OIP.exHSDmjH3d6p7xu6xlK9egHaE8&pid=Api&P=0&h=220' className='styled-image'></img>
             
            </div>
            <div className='col-lg-3 col-sm'>
          
    <img src='https://www.ubereats.com/_static/88d55f7112efe55f.webp' className='styled-image'></img>
         
        </div>
        <div className='col-lg-3 col-sm'>
          
          <img src='https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*' className='styled-image'></img>
               
              </div>
              <div className='col-lg-3 col-sm'>
          
          <img src='https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*' className='styled-image'></img>
               
              </div>
            </div>
          </div>
    
      </div>
      </main>
      
<div className='work'>
  <div className='row'>
    <div className='col-lg-4 col-sm'>
      <div className='image-container1'>
      <img src='https://food-order-frontend-henna.vercel.app/assets/cafe-C9yyjXGa.png' className='workimage'/></div>


      <div>
        <p>select your menu</p>
      </div>
      </div>
      <div className='col-lg-4 col-sm'>
        <div className='image-container1'>
        <img src='https://food-order-frontend-henna.vercel.app/assets/food-DxWcjOl0.png' className='workimage'></img>/</div>
        <div>
          <p>confirm your order</p>
        </div>
        </div>
        <div className='col-lg-4 col-sm'><div className='image-container1'>
          <img src='https://food-order-frontend-henna.vercel.app/assets/delivery-B5z5n2Qz.png' className='workimage'></img></div>
          <div>
          <p>wait for your delivery</p></div>
        </div>
        </div>
      </div>
  

      
   <div className='download-platform'>
    <h1>Available In</h1>
    <img src='https://zepto-1-ajzu.vercel.app/assets/play_store-B2tFv0Hy.png'/>
    <img src='https://zepto-1-ajzu.vercel.app/assets/app_store-C8O_cY6s.png'/>
   </div>

    </>
  );
}

export default Home;
