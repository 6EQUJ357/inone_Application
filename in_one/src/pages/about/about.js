import React, {lazy, Link} from 'react'

let NavBar = lazy(()=>import("../../components/navBar/NavBar"))
let Footer = lazy(()=>import("../../components/footer/Footer"))


const About = () => {
  return (
    <div>
       {/* navbar */}
       <NavBar/>
        {/* navbar end */}

        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">About</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="">Pages</a></li>
                <li className="breadcrumb-item active text-white">About</li>
            </ol>
        </div>
        {/* Single Page Header End */}



        <div className="container-fluid contact py-5">

            <div className="container py-5">
                <div className="p-5 bg-light rounded">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="text-center mx-auto" style={{maxWidth: "700px"}}>

                                <h1 className="text-primary">our story</h1>
                                <p className="mb-4">everything we do is a celebration of food - from how we source our dishes and shellfish to serving up new ways for you to enjoy it. since 1976, we've heen committed to bringing you different dishes experience you won't find anywhere else. that's how our dishes differently.</p>


                                <h1 className="text-primary">from the kitchen</h1>
                                <p className="mb-4">crispy... spicy... softy... if there's a particular kind of dishes you crave, find the perfect time to come in and discover new way to love it.</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>


                 {/* Featurs Section Start */}
        <div className="container-fluid featurs py-5">
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-md-6 col-lg-3">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i className="fas fa-car-side fa-3x text-white"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Free Shipping</h5>
                                <p className="mb-0">Free on order over $300</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i className="fas fa-user-shield fa-3x text-white"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Security Payment</h5>
                                <p className="mb-0">100% security payment</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i className="fas fa-exchange-alt fa-3x text-white"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>30 Day Return</h5>
                                <p className="mb-0">30 day money guarantee</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                                <i className="fa fa-phone-alt fa-3x text-white"></i>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>24/7 Support</h5>
                                <p className="mb-0">Support every time fast</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Featurs Section End */}


        
        {/* Fact Start */}
        <div className="container-fluid py-5">
            <div className="container">
                <div className="bg-light p-5 rounded">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-secondary"></i>
                                <h4>satisfied customers</h4>
                                <h1>1963</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-secondary"></i>
                                <h4>quality of service</h4>
                                <h1>99%</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-secondary"></i>
                                <h4>quality certificates</h4>
                                <h1>33</h1>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="counter bg-white rounded p-5">
                                <i className="fa fa-users text-secondary"></i>
                                <h4>Available Products</h4>
                                <h1>789</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Fact Start */}
        


        {/* footer */}
        < Footer/>
        {/* footer end */}


    </div>
  )
}

export default About