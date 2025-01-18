import React, {lazy, useState, useEffect} from 'react'
import { getCompanyData, contactForm } from './contactService/contactService'
import {useFormik} from "formik"
import * as Yup from "yup"


let NavBar = lazy(()=>import("../../components/navBar/NavBar"))
let Footer = lazy(()=>import("../../components/footer/Footer"))

const Contact = () => {

    const [companyData, setCompanyData] = useState([]);


    const formik = useFormik({

		initialValues : {
			contact_name : "",
            contact_email : "",
            contact_message : "",
		},
		validationSchema:Yup.object().shape({

            contact_name : Yup.string().required("Name is Required"),

            contact_email : Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address').required("Email Required"),

            contact_message : Yup.string().required("provide message...")

            }),
		onSubmit:async(values, {resetForm})=>{
			//console.log("form values", values);
            
 
            try{
                const data = await contactForm(values);
                //console.log("date received", data.Admin);

                ///navigate("/");

            }
            catch(error){

                console.error(error);
            }
		}
	})

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

        {/* navbar */}
        <NavBar/>
        {/* navbar end */}

        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Contact</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="">Pages</a></li>
                <li className="breadcrumb-item active text-white">Contact</li>
            </ol>
        </div>
        {/* Single Page Header End */}


        {/* Contact Start */}
        <div className="container-fluid contact py-5">
            <div className="container py-5">
                <div className="p-5 bg-light rounded">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="text-center mx-auto" style={{maxWidth: "700px"}}>
                                <h1 className="text-primary">Get in touch</h1>
                                <p className="mb-4">Should you have any inquiries or require further information, please do not hesitate to contact us. We are available to assist you via the contact form below or by emailing us</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="h-100 rounded">
                                <iframe className="rounded w-100"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                                style={{height: "400px"}}>

                                </iframe>
                            </div>
                        </div>

                          <div className="col-lg-7">

                            <form onSubmit={formik.handleSubmit}>

                                  <input type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Name" name="contact_name" value={formik.values.adminName} onChange={formik.handleChange}/>

                                  {(formik.touched.contact_name && formik.errors.contact_name) && <small style={{color:"red"}}>{formik.errors.contact_name}</small>}


                                  <input type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Email" name="contact_email"/>

                                  {(formik.touched.contact_email && formik.errors.contact_email) && <small style={{color:"red"}}>{formik.errors.contact_email}</small>}



                                  <textarea className="w-100 form-control border-0 mb-4" rows="5" cols="10" placeholder="Your Message" name="contact_message"></textarea>

                                  {(formik.touched.contact_message && formik.errors.contact_message) && <small style={{color:"red"}}>{formik.errors.contact_message}</small>}



                                  <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Submit</button>
                            </form>
                          </div>

                          {companyData ? companyData.map(res=>

                          <div className="col-lg-5" key={res._id}>
                              <div className="d-flex p-4 rounded mb-4 bg-white">
                                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                  <div>
                                      <h4>Address</h4>
                                      <p className="mb-2">{res.companyAddress}</p>
                                  </div>
                              </div>
                              <div className="d-flex p-4 rounded mb-4 bg-white">
                                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                                  <div>
                                      <h4>Mail Us</h4>
                                      <p className="mb-2">{res.companyEmail}</p>
                                  </div>
                              </div>
                              <div className="d-flex p-4 rounded bg-white">
                                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                                  <div>
                                      <h4>Telephone</h4>
                                      <p className="mb-2">{res.companyMobile_No}</p>
                                  </div>
                              </div>
                          </div>
                          )
                        :
                        <div className="col-lg-5">
                            <p>no data...</p>
                        </div>
                        }



                    </div>
                </div>
            </div>
        </div>
        {/* Contact End */}


         {/* footer */}
         < Footer/>
        {/* footer end */}


    </div>
  
  )
}

export default Contact