import React from 'react'
import ReUseFooter from '../reusecomponents/reUseFooter'
import ReUseNavBar from '../reusecomponents/reUseNavBar'

const About = () => {
  return (
    <div>
       {/* navbar */}
       <ReUseNavBar/>
        {/* navbar end */}

        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">About</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                <li className="breadcrumb-item active text-white">About</li>
            </ol>
        </div>
        {/* Single Page Header End */}


        {/* footer */}
        < ReUseFooter/>
        {/* footer end */}


    </div>
  )
}

export default About