import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'


import Home from './components/home'
import Products from './components/products'
import Wishlist from './components/wishlist'
import About from './components/about'
import Cart from './components/cart'
import Checkout from './components/checkout'
import Contact from './components/contact'
import Notfound from './components/notfound'
import Product_details from './components/product_details'

import Registration_login from './Auth/registration_login'
import Account from './Auth/account'




const App = () => {
  return (
    <BrowserRouter> 
      <Routes>

        <Route path="/" element={<Home />}/>

        <Route path='/products' element={<Products/>}/>

        <Route path="/about" element={<About />}/>

        <Route path="/wishlist" element={<Wishlist />}/>

        <Route path='/cart' element={<Cart/>}/>

        <Route path="/checkout" element={<Checkout />}/>

        <Route path='/contact' element={<Contact/>}/>

        <Route path="*" element={<Notfound />}/>

        <Route path='/product_details' element={<Product_details/>}/>

        
      {/* Auth */}

        <Route path='/registration_login' element={<Registration_login/>}/>


        <Route path='/account' element={<Account/>}/>
        
      </Routes>
    </BrowserRouter>
    
  )
} 

export default App