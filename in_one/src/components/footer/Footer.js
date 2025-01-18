import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getCompanyData } from '../../pages/contact/contactService/contactService'
import "./footer.css"


const Footer = () => {

       const [companyData, setCompanyData] = useState([]);

       // verify dashboard
           useEffect(()=>{ 
            const fetchData = async () => { 
                try{
                    
                        //get company data
                        const companyDetails = await getCompanyData();
                        await setCompanyData(companyDetails.companyData);
                       //console.log("date received", companyDetails.companyData);
                    
                }
                catch(error){
        
                    console.error(error);
                }
            };
        
            fetchData();  
            }, [])
  return (
    <div>

         {/* Footer Start */}
         <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
            <div className="container py-5">
                <div className="pb-4 mb-4" style={{borderBottom: "1px", solid :"rgba(226, 175, 24, 0.5)"}}>
                    <div className="row g-4">
                        <div className="col-lg-3">
                            <a href="#">
                                <h1 className="text-primary mb-0">{companyData ? companyData.map(res=>res.companyName) : "Loading..."}</h1>
                                <p className="text-secondary mb-0">Fresh products</p>
                            </a>
                        </div>

                        <div className="col-lg-6">
                            <div className="position-relative mx-auto">
                                <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
                                <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{top: "0", right: "0"}}>Subscribe Now</button>
                            </div>
                        </div>
                        
                        <div className="col-lg-3">
                            <div className="d-flex justify-content-end pt-3">
                                <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">Why People Like us!</h4>
                            <p className="mb-4 Why_People_Like_us">Choose us for unparalleled quality, exceptional service, and results that truly speak for themselves. We deliver consistent excellence, exceeding the expectations with every Customer.</p>
                            <Link to="/about" className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More...</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex flex-column text-start footer-item">
                            <h4 className="text-light mb-3">Shop Info</h4>
                            <Link  className="btn-link" to="/">Home</Link>
                            <Link  className="btn-link" to="/about">About Us</Link>
                            <Link  className="btn-link" to="/contact">Contact Us</Link>
                           
                            
                            {/* <a className="btn-link" href="">Return Policy</a>
                            <a className="btn-link" href="">FAQs & Help</a> */}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="d-flex flex-column text-start footer-item">
                            <h4 className="text-light mb-3">Account</h4>
                            <Link  className="btn-link" to="/products">Products</Link>
                            <Link className="btn-link" to="/registration_login">Login</Link>
                            <Link className="btn-link" to="/account">My Account</Link>
                            <Link  className="btn-link" to="/wishlist">Wishlist</Link>
                            {/* <a className="btn-link" href="">Order History</a>
                            <a className="btn-link" href="">International Orders</a> */}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-light mb-3">Contact</h4>
                            <p>Address : {companyData ? companyData.map(res=>res.companyAddress) : "Loading..."}</p>

                            <p>Email :  
                                <a href={`mailto:${companyData && companyData.map(res=>res.companyEmail)}`}>    {companyData ? companyData.map(res=>res.companyEmail) : "Loading..."}</a>
                            </p>
                            <p>Phone : {companyData ? companyData.map(res=>res.companyMobile_No) : "Loading..."}</p>
                            <p>Payment Accepted</p>
                            <img src="assets/img/payment.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Footer End */}

        {/* Copyright Start */}
        <div className="container-fluid copyright bg-dark py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <span className="text-light"><a href="#"><i className="fas fa-copyright text-light me-2"></i>{companyData ? companyData.map(res=>res.companyName) : "Loading..."}</a>, All right reserved.</span>
                    </div>
                    <div className="col-md-6 my-auto text-center text-md-end text-white">
                        {/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. ***/}
                        {/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, ***/}
                        {/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". ***/}
                        Designed & Developed By <a className="border-bottom" href=""> <i class="fa fa-regular fa-heart"></i> Sujji</a> 
                    </div>
                </div>
            </div>
        </div>
        {/* Copyright End */}



        {/* Back to Top */}
        <a href="" className="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>
    </div>
  )
}

export default Footer