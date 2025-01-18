import React, {lazy} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'




//Auth
let Registration_login = lazy(()=>import("./pages/Auth/registration_login"))
let Account = lazy(()=>import("./pages/Auth/account"))



//pages
let Home = lazy(()=>import("./pages/home/home"))
let Products = lazy(()=>import("./pages/products/products"))
let Wishlist = lazy(()=>import("./pages/wishlist/wishlist"))
let About = lazy(()=>import("./pages/about/about"))
let Cart = lazy(()=>import("./pages/cart/cart"))
let Checkout = lazy(()=>import("./pages/checkout/checkout"))
let Contact = lazy(()=>import("./pages/contact/contact"))
let Product_details = lazy(()=>import("./pages/products/product_details"))
let Notfound = lazy(()=>import("./pages/notFound/notfound"))




const App = () => {
  return (
    <BrowserRouter> 
      <Routes>


        {/* Auth */}

        <Route path='/registration_login' element={<Registration_login/>}/>


        <Route path='/account' element={<Account/>}/>


        {/* pages */}
        <Route path="/" element={<Home />}/>

        <Route path='/products' element={<Products/>}/>

        <Route path="/about" element={<About />}/>

        <Route path="/wishlist" element={<Wishlist />}/>

        <Route path='/cart' element={<Cart/>}/>

        <Route path="/checkout" element={<Checkout />}/>

        <Route path='/contact' element={<Contact/>}/>

        <Route path='/product_details' element={<Product_details/>}/>

        <Route path="*" element={<Notfound />}/>   
        
      </Routes>
    </BrowserRouter>
    
  )
} 

export default App