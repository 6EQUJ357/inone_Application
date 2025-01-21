import React, {lazy} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config/config';
import {useFormik} from "formik"
import * as Yup from "yup"


let NavBar = lazy(()=>import("../../components/navBar/NavBar"))
let Footer = lazy(()=>import("../../components/footer/Footer"))

const Checkout = () => {


    let location = useLocation();
    const navigate = useNavigate();
  
    const checkOutObj = location.state;  
    console.log("checkOutObj", checkOutObj);




    //order form

    const formik = useFormik({
        initialValues: {
            cartArrayObj : [...checkOutObj.cartArrayObj],
            totalAmount : checkOutObj.totalAmount,
            fullName : "",
            Mobile_no : "",
            pincode : "",
            state : "",
            city : "",
            address : "",
            // coupon : 0,
            platform_fee : 0,
            delivery_charges : "Free Delivery",
            totalAmount_includeAll : 0
          
        },
        validationSchema:Yup.object().shape({
              fullName : Yup.string().required("Name Required"),
              Mobile_no : Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must only contain numbers').min(10, 'Phone number must be exactly 10 digits').max(10, 'Phone number must be exactly 10 digits'),  
              pincode : Yup.string().required("Pincode Required"),
              state : Yup.string().required("State Required"),
              city : Yup.string().required("City Required"),
              address : Yup.string().required("Address Required"),               
            
          }),
        onSubmit: async(values, {resetForm}) => {
          console.log("company profile", values);

             try{
                // const data = await editProductData(productData._id, formData);
                // if(data){
                //     navigate("/productlist");
                // }

                navigate("/successpayment")

            }
            catch(error){

                console.error(error);
            }
            
        } 
    })

 
    //totalAmount_includeAll
    const handleFullnameChande= (e)=>{
        formik.setFieldValue("fullName", e.target.value);
        formik.setFieldValue("totalAmount_includeAll", formik.values.totalAmount + formik.values.platform_fee);


    }
    


  return (
    <div>


        {/* navbar */}

        < NavBar/>

        {/* navbar end */}

        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Checkout</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><a href="">Pages</a></li>
                <li className="breadcrumb-item active text-white">Checkout</li>
            </ol>
        </div>
        {/* Single Page Header End */}


        {/* Checkout Page Start */}
        <div className="container-fluid py-5">
            <div className="container py-5">
                <h1 className="mb-4">Billing details</h1>

                <form onSubmit={formik.handleSubmit}>
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">

                            {/* <div className="row">

                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Name<sup>*</sup></label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                               
                            </div> */}



                            <div className="form-item">
                                <label className="form-label my-3">Full Name<sup>*</sup></label>
                                <input type="text" className="form-control" name="fullName" value={formik.values.fullName} onChange={handleFullnameChande}/>

                                {(formik.errors.fullName && formik.touched.fullName) ? <small style={{color:"red"}}>{formik.errors.fullName}</small> : null}

                            </div>

                            <div className="form-item">
                                <label className="form-label my-3">Mobile<sup>*</sup></label>
                                <input type="tel" className="form-control" name="Mobile_no" {...formik.getFieldProps("Mobile_no")}/>

                                {(formik.errors.Mobile_no && formik.touched.Mobile_no) ? <small style={{color:"red"}}>{formik.errors.Mobile_no}</small> : null}
                            </div>


                            <div className="row">

                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Pincode<sup>*</sup></label>
                                        <input type="text" className="form-control" name="pincode" {...formik.getFieldProps("pincode")}/>

                                        {(formik.errors.pincode && formik.touched.pincode) ? <small style={{color:"red"}}>{formik.errors.pincode}</small> : null}
                                    </div>
                                </div>

                                {/* mylocation */}
                                <div className="col-md-12 col-lg-6">
                                    {/* <div className="form-item w-100">
                                        <label className="form-label my-3">Pincode<sup>*</sup></label>
                                        <input type="text" className="form-control" />
                                    </div> */}
                                </div>


                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">State<sup>*</sup></label>
                                        <input type="text" className="form-control" name="state" {...formik.getFieldProps("state")}/>

                                        {(formik.errors.state && formik.touched.state) ? <small style={{color:"red"}}>{formik.errors.state}</small> : null}
                                    </div>
                                </div>

                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">City<sup>*</sup></label>
                                        <input type="text" className="form-control" name="city" {...formik.getFieldProps("city")}/>

                                        {(formik.errors.city && formik.touched.city) ? <small style={{color:"red"}}>{formik.errors.city}</small> : null}
                                    </div>
                                </div>

                               
                            </div>

                           

                            <div className="form-item">
                                <label className="form-label my-3">Address <sup>*</sup></label>

                                <textarea className="form-control" id="productdesc" placeholder="House No., Building name, Street Name, Area, Colony" rows="4" name="address" {...formik.getFieldProps("address")} ></textarea>

                                {(formik.errors.address && formik.touched.address) ? <small style={{color:"red"}}>{formik.errors.address}</small> : null}

                            </div>


                            {/* <div className="mt-5">
                                <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" name="coupon" {...formik.getFieldProps("coupon")}/>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                            </div> */}
                                                                          

                            {/* <div className="form-item">
                                <label className="form-label my-3">Email Add /ress<sup>*</sup></label>
                                <input type="email" className="form-control" />
                            </div>

                            <div className="form-check my-3">
                                <input type="checkbox" className="form-check-input" id="Account-1" name="Accounts" value="Accounts" />
                                <label className="form-check-label" for="Account-1">Create an account?</label>
                            </div>

                            <hr />
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" id="Address-1" name="Address" value="Address" />
                                <label className="form-check-label" for="Address-1">Ship to a different address?</label>
                            </div>

                            <div className="form-item">
                                <textarea name="text" className="form-control" spellcheck="false" cols="30" rows="11" placeholder="Oreder Notes (Optional)"></textarea>
                            </div> */}

                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>

                                    
                                    <tbody>
                                        {checkOutObj.cartArrayObj.length > 0 ? checkOutObj.cartArrayObj.map(res=>
                                        <tr>
                                            <th scope="row">
                                                <div className="d-flex align-items-center mt-2">
                                                    <img src={`${BACKEND_URL}/assets/product_upload_images/${res.productImg[0]}`} className="img-fluid rounded-circle" style={{width: "90px", height: "90px"}} alt="img" />
                                                </div>
                                            </th>
                                            <td className="py-5">{res.productName} {res.productWeight}</td>
                                            <td className="py-5">{res.productPrice}</td>
                                            <td className="py-5">{res.productCategory}</td>
                                            <td className="py-5">{res.enterQuantity}</td>
                                            <td className="py-5">{res.netAmount}</td>
                                        </tr>
                                        )
                                        :
                                        <tr>
                                            <p>no Data...</p>
                                        </tr>
                                        }



                                        {/* <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-3">Subtotal</p>
                                            </td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">$414.00</p>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark py-4">Shipping</p>
                                            </td>
                                            <td colspan="3" className="py-5">
                                                <div className="form-check text-start">
                                                    <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-1" name="Shipping-1" value="Shipping" />
                                                    <label className="form-check-label" for="Shipping-1">Free Shipping</label>
                                                </div>
                                                <div className="form-check text-start">
                                                    <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-2" name="Shipping-1" value="Shipping" />
                                                    <label className="form-check-label" for="Shipping-2">Flat rate: $15.00</label>
                                                </div>
                                                <div className="form-check text-start">
                                                    <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-3" name="Shipping-1" value="Shipping" />
                                                    <label className="form-check-label" for="Shipping-3">Local Pickup: $8.00</label>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th scope="row">
                                            </th>
                                            <td className="py-5">
                                                <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                            </td>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5">
                                                <div className="py-3 border-bottom border-top">
                                                    <p className="mb-0 text-dark">$135.00</p>
                                                </div>
                                            </td>
                                        </tr> */}

                    

                                    </tbody>
                                    
                                </table>
                            </div>

                           

                            {/* total Amount */}
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-sm-8 col-md-7 col-lg-12 col-xl-12">
                                    <div className="bg-light rounded">
                                        <div className="p-4">
                                            <h1 className="display-6 mb-4">Price <span className="fw-normal">Details</span></h1>

                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="mb-0 me-4">Subtotal ({checkOutObj.cartArrayObj ? checkOutObj.cartArrayObj.length : 0}) :</h5>
                                                <p className="mb-0">&#8377; {checkOutObj ? checkOutObj.totalAmount : "nill"} /-</p>
                                            </div> 

                                            {/* <div className="d-flex justify-content-between mb-2">
                                                <h5 className="mb-0 me-4">Discount</h5>
                                                <div className="">
                                                    <p className="mb-0">- &#8377; 0</p>
                                                </div>
                                            </div> */}

                                            {/* <div className="d-flex justify-content-between mb-2">
                                                <h5 className="mb-0 me-4">Coupons For You</h5>
                                                <div className="">
                                                    <p className="mb-0">- &#8377; {formik.values.coupon} /-</p>
                                                </div>
                                            </div> */}

                                            <div className="d-flex justify-content-between mb-3">
                                                <h5 className="mb-0 me-4">Platform Fee</h5>
                                                <div className="">
                                                    <p className="mb-0">- &#8377; {formik.values.platform_fee} /-</p>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <h5 className="mb-0 me-4">Delivery Charges</h5>
                                                <div className="">
                                                    <p className="mb-0" style={{fontWeight : "bolder", color : "#81c408"}}>Free Delivery</p>
                                                </div>
                                            </div>

                                            <p className="mb-0 text-end">Deliver to {formik.values.city}.</p>
                                        </div>
                                        
                                        <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                            <h5 className="mb-0 ps-4 me-4">Total Amount</h5>
                                            <p className="mb-0 pe-4">&#8377; {formik.values.totalAmount_includeAll} /-</p>
                                        </div>

                                        <div className="py-2 mb-2 border-bottom d-flex justify-content-between">
                                           
                                            <p className="mb-0 pe-2 ps-4 me-4" style={{fontWeight : "bolder", color : "#81c408", fontSize : "1rem"}}> You Will Save &#8377; 100 on this order</p>
                                        </div>


                                        {/* <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button" >Proceed Checkout</button> */}
                                    </div>
                                </div>
                            </div>


                            {/* <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Transfer-1" name="Transfer" value="Transfer" />
                                        <label className="form-check-label" for="Transfer-1">Direct Bank Transfer</label>
                                    </div>
                                    <p className="text-start text-dark">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                </div>
                            </div>

                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Payments-1" name="Payments" value="Payments" />
                                        <label className="form-check-label" for="Payments-1">Check Payments</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Delivery-1" name="Delivery" value="Delivery" />
                                        <label className="form-check-label" for="Delivery-1">Cash On Delivery</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Paypal-1" name="Paypal" value="Paypal" />
                                        <label className="form-check-label" for="Paypal-1">Paypal</label>
                                    </div>
                                </div>
                            </div> */}

                            {/* place order Button */}
                            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                                <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
        {/* Checkout Page End */}


        {/* footer */}

        < Footer/>

        {/* footer end */}



    </div>
  )
}

export default Checkout