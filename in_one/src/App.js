import React, {lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'



//protect route
import ProtectedRoute from './customHooks/ProtectedRoute/ProtectedRoute';

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

//payment
const PaymentSuccessCard = lazy(()=>import("./pages/successPaymentCard/successPaymentCard"))




const App = () => {
  return (
    <Suspense fallback={
    <div id="spinner" className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
        <div className="spinner-grow text-primary" role="status"></div>
    </div>
    }>

      <BrowserRouter> 
        <Routes>


          {/* Auth */}

          <Route path='/registration_login' element={<Registration_login/>}/>


          <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
  

          {/* pages */}
          <Route path="/" element={<Home />}/>

          <Route path='/products' element={<Products/>}/>

          <Route path="/about" element={<About />}/>

          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>}/>

          <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>

          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>}/>

          <Route path='/contact' element={<Contact/>}/>

          <Route path='/product_details' element={<Product_details/>}/>


          {/* payment */}
          <Route path='/successpayment' element={<ProtectedRoute><PaymentSuccessCard/></ProtectedRoute>}/>



          <Route path="*" element={<Notfound />}/>   
          
        </Routes>
      </BrowserRouter>

    </Suspense>
    
  )
} 

export default App