import React from 'react';
import { Link } from 'react-router-dom';
import "./successPaymentCard.css";

const PaymentSuccessCard = () => {

    
  return (

    <div className='success_body'>
        <div class="container con">
            <div class="printer-top"></div>
    
            <div class="paper-containerss">
                <div class="printer-bottom"></div>
    
                <div class="paper">
                    <div class="main-contentsss">
                        <div class="success-iconnn">&#10004;</div>
                        <div class="success-titleee">
                            Payment Complete
                        </div>
                        <div class="success-description">
                            Thank you for completing the payment! You will shortly receive an email of your payment.
                        </div>
                        <div class="order-details">
                            <div class="order-number-label">Transaction ID</div>
                            <div class="order-number">123456789</div>
                            <div class="complement">Thank You!</div>
                        </div>

                       
                    </div>
                    <div class="jagged-edge"></div>
                </div>


            </div>

            <div className='button_sty'>
            <Link to="/" className='btn btn-success'>Home</Link>
            </div>
           
        </div>
    </div>

  );
};

export default PaymentSuccessCard;