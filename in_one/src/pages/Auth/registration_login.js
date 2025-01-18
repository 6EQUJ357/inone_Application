import React,{lazy} from 'react'
import "./auth_styles/registration.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { registerCustomer, loginCustomer } from './authService/authService'


let NavBar = lazy(()=>import("../../components/navBar/NavBar"))
let Footer = lazy(()=>import("../../components/footer/Footer"))



const Registration_login = () => {

	const navigate = useNavigate();

	//signup  formik_signUp

	const  formik_signUp = useFormik({
 
		initialValues : {
			customerName : "",
			customerMobile_NO : "",
            customerPassword : "",
		},
		validationSchema:Yup.object().shape({

            customerName : Yup.string().required("Name is Required"),
			customerMobile_NO : Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must only contain numbers').min(10, 'Phone number must be exactly 10 digits').max(10, 'Phone number must be exactly 10 digits'),
            customerPassword : Yup.string().min(6, 'Password must be at least six characters long.').required("Password Required"),

            }),
		onSubmit:async(values, {resetForm})=>{
			//console.log("form values", values);
            
 
            try{
                const data = await registerCustomer(values);
                //console.log("date received", data.Admin);

                navigate("/registration_login");

				 // Reset the form after successful submission
				 resetForm(); 

            }
            catch(error){

                console.error(error);
            }
		}
	})





	//signup  formik_login

	const  formik_login = useFormik({
 
		initialValues : {
			customerMobile_NO : "",
            customerPassword : "",
		},
		validationSchema:Yup.object().shape({

			customerMobile_NO : Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must only contain numbers').min(10, 'Phone number must be exactly 10 digits').max(10, 'Phone number must be exactly 10 digits'),
            customerPassword : Yup.string().min(6, 'Password must be at least six characters long.').required("Password Required"),

            }),
		onSubmit:async(values, {resetForm})=>{
			//console.log("form values", values);
            
 
            try{
                const data = await loginCustomer(values);
                //console.log("date received", data.customerData);

                
				if(localStorage.getItem("customertoken")){

					//await dispatch(SET_ADMIN(data.Admin));

				   navigate("/");
				}

            }
            catch(error){

                console.error(error);
            }
		}
	})

  return (

	<div>

	{/* navbar */}
	<NavBar/>
	{/* navbar end */}

	{/* Single Page Header start */}
	<div className="container-fluid page-header py-5">
		<h1 className="text-center text-white display-6">Authentication</h1>
		<ol className="breadcrumb justify-content-center mb-0">
			<li className="breadcrumb-item"><Link className = "a_style" to="/">Home</Link></li>
			<li className="breadcrumb-item"><a className = "a_style" href="">Pages</a></li>
			<li className="breadcrumb-item active text-white">Authentication</li>
		</ol>
	</div>
	{/* Single Page Header End */}


	{/* Contact Start */}
	<div className="container-fluid contact py-5">
	<div className="section">
		<div className="container">
			<div className="row full-height justify-content-center">
				<div className="col-12 text-center align-self-center py-5">
					<div className="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 className="mb-0 pb-3 h6_style"><span>Log In </span><span>Sign Up</span></h6>
						
			          	<input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label for="reg-log"></label>
						
						<div className="card-3d-wrap mx-auto">
							<div className="card-3d-wrapper">


								{/* login */}
								<div className="card-front">
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3 h4_style">Log In</h4>


											<form onSubmit={ formik_login.handleSubmit}>


												<div className="form-group mt-2">
													<input type="text" className="form-style" placeholder="Your Mobile No" id="logemail" autocomplete="off" name="customerMobile_NO" value={ formik_login.values.customerMobile_NO} onChange={ formik_login.handleChange}/>
													<i className="input-icon uil uil-at"></i>

													{( formik_login.touched.customerMobile_NO &&  formik_login.errors.customerMobile_NO) && <small style={{color:"red"}}>{ formik_login.errors.customerMobile_NO}</small>}
												</div>	
												


												<div className="form-group mt-2">
													<input type="password"  className="form-style" placeholder="Your Password" id="logpass" autocomplete="off" name="customerPassword" value={ formik_login.values.customerPassword} onChange={ formik_login.handleChange}/>
													<i className="input-icon uil uil-lock-alt"></i>

													{( formik_login.touched.customerPassword &&  formik_login.errors.customerPassword) && <small style={{color:"red"}}>{ formik_login.errors.customerPassword}</small>}
												</div>
												

												<button type="submit" className="btnn mt-4 a_style">submit</button>
											</form>

                            				<p className="mb-0 mt-4 text-center p_style"><a href="" className="link a_style">Forgot your password?</a></p>
				      					</div>
			      					</div>
			      				</div>


								{/* sighup */}
								<div className="card-back">
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3 h4_style">Sign Up</h4>

											<form onSubmit={ formik_signUp.handleSubmit}>

												<div className="form-group">
													<input type="text" className="form-style" placeholder="Your Full Name" id="logname" autocomplete="off"  name="customerName" value={ formik_signUp.values.customerName} onChange={ formik_signUp.handleChange}/>
													<i className="input-icon uil uil-user"></i>

													{( formik_signUp.touched.customerName &&  formik_signUp.errors.customerName) && <small style={{color:"red"}}>{ formik_signUp.errors.customerName}</small>}
												</div>
												


												<div className="form-group mt-2">
													<input type="text" className="form-style" placeholder="Your Mobile No" id="logemail" autocomplete="off" name="customerMobile_NO" value={ formik_signUp.values.customerMobile_NO} onChange={ formik_signUp.handleChange}/>
													<i className="input-icon uil uil-at"></i>

													{( formik_signUp.touched.customerMobile_NO &&  formik_signUp.errors.customerMobile_NO) && <small style={{color:"red"}}>{ formik_signUp.errors.customerMobile_NO}</small>}
												</div>	
												


												<div className="form-group mt-2">
													<input type="password"  className="form-style" placeholder="Your Password" id="logpass" autocomplete="off" name="customerPassword" value={ formik_signUp.values.customerPassword} onChange={ formik_signUp.handleChange}/>
													<i className="input-icon uil uil-lock-alt"></i>

													{( formik_signUp.touched.customerPassword &&  formik_signUp.errors.customerPassword) && <small style={{color:"red"}}>{ formik_signUp.errors.customerPassword}</small>}
												</div>
												

												<button type="submit" className="btnn mt-4 a_style">submit</button>
											</form>

				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
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

export default Registration_login