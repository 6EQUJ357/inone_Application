import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCompanyData } from '../../pages/contact/contactService/contactService'
import { logoutCustomer } from '../../pages/Auth/authService/authService'
import { useSelector } from 'react-redux'
import { getCartData } from '../../pages/cart/cartService/cartService'


const NavBar = () => {

    const navigate = useNavigate();
       const [companyData, setCompanyData] = useState([]);


    //    customer data form store
       const customerData = useSelector((state) => state.Reducer.auth.customer);
       //console.log("customerData from store", customerData)

    //    //cart length from store
    //    const cartLength = useSelector((state) => state.Reducer.cart.cartItems);
    //           console.log("cart", cartLength)

            // all cart state value
          const [items, setItems] = useState([]);



       // verify dashboard
           useEffect(()=>{ 
            const fetchData = async () => { 
                try{
                    
                        //get company data
                        const companyDetails = await getCompanyData();
                        await setCompanyData(companyDetails.companyData);
                       //console.log("date received", companyDetails.companyData);


                       if(localStorage.getItem("customertoken")){
                        //get product data
                        const cartDetails = await getCartData();
                        await setItems(cartDetails.cartData);
                        //console.log("date cart received", cartDetails.cartData); 
                       }
                    
                }
                catch(error){
        
                    console.error(error);
                }
            };
        
            fetchData();  
            }, [])


    //handle logour fonction
    const logouthandle = async () => {
        await logoutCustomer();
        };


  return (
    <div>
         {/* Navbar start */}
         <div className="container-fluid fixed-top">
            <div className="container topbar bg-primary d-none d-lg-block">

                <div className="d-flex justify-content-between">
                    <div className="top-info ps-2">
                        <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <Link to="/contact" className="text-white">{companyData ? companyData.map(res=>res.companyAddress) : "Loading..."}</Link></small>
                        <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><a href={`mailto:${companyData && companyData.map(res=>res.companyEmail)}`} className="text-white">{companyData ? companyData.map(res=>res.companyEmail) : "Loading..."}</a></small>
                    </div>


                    <div className="top-link pe-2">
                        <span className="text-white"><small className="text-white mx-2">Welcome Back <span style={{fontWeight : "bolder", fontSize : "1rem", color : "#ffb524"}}>{customerData?.customerName}</span></small></span>
                    </div>


                    {/* <div className="top-link pe-2">
                        <a href="" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                        <a href="" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                        <a href="" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                    </div> */}
                </div>
            </div>
            <div className="container px-0">
                <nav className="navbar navbar-light bg-white navbar-expand-xl">
                    <Link to="/" className="navbar-brand"><h1 className="text-primary display-6">{companyData ? companyData.map(res=>res.companyName) : "Loading..."}</h1></Link>
                    <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars text-primary"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                        <div className="navbar-nav mx-auto">
                            <Link to="/" className="nav-item nav-link">Home</Link>
                            <Link to="/about" className="nav-item nav-link">About</Link>
                            <Link to="/products" className="nav-item nav-link">Products</Link>
                            <Link to="/contact" className="nav-item nav-link">Contact</Link>
                            <Link to="/wishlist" className="nav-item nav-link"> <i class="fa fa-regular fa-heart" style={{color:"#81c408"}}></i> Wishlist</Link>
                            

                            {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                    <a href="cart.html" className="dropdown-item">Cart</a>
                                    <a href="chackout.html" className="dropdown-item">Chackout</a>
                                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                    <a href="404.html" className="dropdown-item">404 Page</a>
                                </div>
                            </div> */}

                           
                        </div>

                        <div className="d-flex m-3 me-0">
                            <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary"></i></button>

                          

                            {/* <Link to ="/cart" className="position-relative me-4 my-auto">
                            <i class="fa fa-regular fa-heart fa-2x"></i>
                               
                            </Link> */}



                            <Link to ="/cart" className="position-relative me-4 my-auto">
                                <i className="fa fa-shopping-bag fa-2x"></i>
                                <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{top: "-5px", left: "15px", height: "20px", minWidth: "20px"}}>{items ? items.length : 0}</span>
                            </Link>


                            {/* <a href="#" className="my-auto">
                                <i className="fas fa-user fa-2x"></i>
                            </a> */}

                             <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><a href="#" className="my-auto">
                                <i className="fas fa-user fa-2x"></i>
                                </a>
                                </a>

                                <div className="dropdown-menu m-0 bg-secondary rounded-0">

                                {localStorage.getItem("customertoken") ? 
                                <>
                                    <Link onClick={logouthandle} className="dropdown-item">Log out</Link>
                                    <Link to="/account" className="dropdown-item">My Account</Link>
                                </>
                                    :
                                    <Link to="/registration_login" className="dropdown-item">Login</Link>
                                }
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        {/* Navbar End */}


        {/* Modal Search Start */}
        <div className="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex align-items-center">
                        <div className="input-group w-75 mx-auto d-flex">
                            <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                            <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Modal Search End */}
    </div>
  )
}

export default NavBar