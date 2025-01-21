import React, {lazy, useState, useEffect} from 'react'
import { getCartData, DeleteCartData } from './cartService/cartService'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../config/config'
import { useSelector } from 'react-redux'
import { addToCart } from '../../redux/reducers/Slices/CartSlice'
import { useDispatch } from 'react-redux';



let NavBar = lazy(()=>import("../../components/navBar/NavBar"))
let Footer = lazy(()=>import("../../components/footer/Footer"))


const Cart = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

      
           // all cart state value
      const [items, setItems] = useState([]);


          //    customer data form store
             const customerData = useSelector((state) => state.Reducer.auth.customer);
             //console.log("customerData from store", customerData)




      //all products from database 
      useEffect(()=>{
    
        const fetchData = async () => { 
                    try{

                       
                            //get product data
                            const cartDetails = await getCartData();
                            await setItems(cartDetails.cartData);
                           console.log("cart date received", cartDetails.cartData);   
                           
                           //add to  cart
                            await dispatch(addToCart( cartDetails.cartData))
                        
                    }
                    catch(error){
            
                        console.error(error);
                    }
                };
            
                fetchData();
    
    
      },[]) 



     // Handle quantity increment for a specific product
  const quantityIncre = (id) => {
    //increase quantity
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, enterQuantity: item.enterQuantity + 1 }
          : item
      )
    );


     //increase netAmount
     setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id
            ? { ...item, netAmount: item.productPrice * item.enterQuantity }
            : item
        )
      );
  };

  // Handle quantity decrement for a specific product
  const quantityDecre = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.enterQuantity > 1
          ? { ...item, enterQuantity: item.enterQuantity - 1 }
          : item
      )
    );


     //increase netAmount
     setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id
            ? { ...item, netAmount: item.productPrice * item.enterQuantity }
            : item
        )
      ); 
  };




  //delete products from DB
  const deleteCartHandle = async(res)=>{
    let response = window.confirm(`you try to delete the #${res.productName} | ${res.productWeight}...`)
    if(response){
        let data = await DeleteCartData(res._id);
        setItems(data.cartData);
    }
  }


  //totalAmount cal...
  const totalAmount = items.reduce((total, item) => total + (item.netAmount), 0)

  //handleCheckOutHandle

  const handleCheckOutHandle = ()=>{

    let checkOutObj = {
        cartArrayObj : [...items], totalAmount : totalAmount
    }

    navigate("/checkout", {state : checkOutObj})


    //console.log("checkOutObj", checkOutObj)
  }



  return (
    <div>


        {/* navbar */}
        < NavBar/>
        {/* navbar end */}


        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Cart</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><a href="">Pages</a></li>
                <li className="breadcrumb-item active text-white">Cart</li>
            </ol>
        </div>
        {/* Single Page Header End */}


        {/* Cart Page Start */}
        <div className="container-fluid py-5">
            <div className="container py-5">
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
                            <th scope="col">Handle</th>
                          </tr>
                        </thead>

                        <tbody>
                            {items.length > 0 ? items.map(res=>
                            <tr key={res._id}>
                                <th scope="row">
                                    <div className="d-flex align-items-center">
                                        <img src={`${BACKEND_URL}/assets/product_upload_images/${res.productImg[0]}`} className="img-fluid me-5 rounded-circle" style={{width: "80px", height: "80px"}} alt="img" />
                                    </div>
                                </th>
                                <td>
                                    <p className="mb-0 mt-4">{res.productName} {res.productWeight}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{res.productPrice}</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">{res.productCategory}</p>
                                </td>

                                {/* incre/decre quantity */}
                                <td>
                                    <div className="input-group quantity mt-4" style={{width: "100px"}}>

                                        <div className="input-group-btn">                                       
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={()=>quantityDecre(res._id)}>
                                            <i className="fa fa-minus"></i>
                                            </button>
                                        </div>

                                        <input type="text" className="form-control form-control-sm text-center border-0" value={res.enterQuantity} />

                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={()=>quantityIncre(res._id)}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>

                                {/* total price */}
                                <td>
                                    <p className="mb-0 mt-4">{res.netAmount}</p>
                                </td>

                                {/* delete button */}
                                <td>
                                    <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={()=>deleteCartHandle(res)}>
                                        <i className="fa fa-times text-danger"></i>
                                    </button>
                                </td>
                            
                            </tr>
                            )
                            :
                            <tr>
                                 <h3>No Cart Data...</h3>
                               
                            </tr>
                        }


                            {/* <tr>
                                <th scope="row">
                                    <div className="d-flex align-items-center">
                                        <img src="assets/img/vegetable-item-5.jpg" className="img-fluid me-5 rounded-circle" style={{width: "80px", height: "80px"}} alt="" />
                                    </div>
                                </th>
                                <td>
                                    <p className="mb-0 mt-4">Potatoes</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">2.99 $</p>
                                </td>
                                <td>
                                    <div className="input-group quantity mt-4" style={{width: "100px"}}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control form-control-sm text-center border-0" value="1" />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">2.99 $</p>
                                </td>
                                <td>
                                    <button className="btn btn-md rounded-circle bg-light border mt-4" >
                                        <i className="fa fa-times text-danger"></i>
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <div className="d-flex align-items-center">
                                        <img src="assets/img/vegetable-item-2.jpg" className="img-fluid me-5 rounded-circle" style={{width: "80px", height: "80px"}} alt="" />
                                    </div>
                                </th>
                                <td>
                                    <p className="mb-0 mt-4">Awesome Brocoli</p>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">2.99 $</p>
                                </td>
                                <td>
                                    <div className="input-group quantity mt-4" style={{width: "100px"}}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                            <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control form-control-sm text-center border-0" value="1" />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="mb-0 mt-4">2.99 $</p>
                                </td>
                                <td>
                                    <button className="btn btn-md rounded-circle bg-light border mt-4" >
                                        <i className="fa fa-times text-danger"></i>
                                    </button>
                                </td>
                            </tr> */}

                        </tbody>
                    </table>
                </div>
                {/* <div className="mt-5">
                    <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
                    <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                </div> */}
                <div className="row g-4 justify-content-end">
                    <div className="col-8"></div>
                    <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                        <div className="bg-light rounded">
                            <div className="p-4">
                                <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>

                                {/* <div className="d-flex justify-content-between mb-4">
                                    <h5 className="mb-0 me-4">Subtotal:</h5>
                                    <p className="mb-0">$96.00</p>
                                </div> */}

                                {/* <div className="d-flex justify-content-between">
                                    <h5 className="mb-0 me-4">Shipping</h5>
                                    <div className="">
                                        <p className="mb-0">Flat rate: $3.00</p>
                                    </div>
                                </div>
                                <p className="mb-0 text-end">Shipping to Ukraine.</p> */}
                            </div>
                            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                <h5 className="mb-0 ps-4 me-4">Total</h5>
                                <p className="mb-0 pe-4">&#8377; {totalAmount} /-</p>
                            </div>


                            <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button" onClick={handleCheckOutHandle}>Proceed Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Cart Page End */}


        {/* footer */}
        < Footer/>
        {/* footer end */}


    </div>
  )
}

export default Cart