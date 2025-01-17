import React from 'react'
import "./auth_styles/registration.css"
import ReUseFooter from '../reusecomponents/reUseFooter'
import ReUseNavBar from '../reusecomponents/reUseNavBar'

const Registration_login = () => {
  return (

	<div>

	{/* navbar */}
	<ReUseNavBar/>
	{/* navbar end */}

	{/* Single Page Header start */}
	<div className="container-fluid page-header py-5">
		<h1 className="text-center text-white display-6">Login</h1>
		<ol className="breadcrumb justify-content-center mb-0">
			<li className="breadcrumb-item"><a className = "a_style" href="#">Home</a></li>
			<li className="breadcrumb-item"><a className = "a_style" href="#">Pages</a></li>
			<li className="breadcrumb-item active text-white">Contact</li>
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
								<div className="card-front">
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3 h4_style">Log In</h4>


											<div className="form-group">
												<input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off" />
												<i className="input-icon uil uil-at"></i>
											</div>	
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off" />
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											<a href="#" className="btnn mt-4 a_style">submit</a>
                            				<p className="mb-0 mt-4 text-center p_style"><a href="" className="link a_style">Forgot your password?</a></p>
				      					</div>
			      					</div>
			      				</div>
								<div className="card-back">
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3 h4_style">Sign Up</h4>
											<div className="form-group">
												<input type="text" name="logname" className="form-style" placeholder="Your Full Name" id="logname" autocomplete="off" />
												<i className="input-icon uil uil-user"></i>
											</div>	
											<div className="form-group mt-2">
												<input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off" />
												<i className="input-icon uil uil-at"></i>
											</div>	
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off" />
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											<a href="#" className="btnn mt-4 a_style">submit</a>
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
	 < ReUseFooter/>
	{/* footer end */}


	</div>


  )
}

export default Registration_login