import React, {lazy, useState, useEffect} from 'react'
import Slider from 'react-slick';
import { Link, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../config/config';
import "./product.css"
import { useSelector } from 'react-redux';
import { cartForm } from '../cart/cartService/cartService';



let NavBar = lazy(()=>import("../../components/navBar/NavBar"))
let Footer = lazy(()=>import("../../components/footer/Footer"))




const Product_details = () => {


    // customer data form store
    const customerData = useSelector((state) => state.Reducer.auth.customer);
    //console.log("customerData from store", customerData)
    
    let location = useLocation();
  
    const productDetails = location.state;  
    //console.log("productDetails", productDetails);


    //images
    const [images, setImages] = useState(productDetails.productImg) 
    const [currentImage, setCurrentImage] = useState(images[0])
    //console.log("img", images)


      //product discription
      let proDesc = productDetails.productdesc
      let proDescArray = proDesc.split("|") ;

      let IngredientsArray = proDescArray[3]?.split("?");
      let healthBenefitsArray = proDescArray[4]?.split("?");


      const handleCart = async()=>{
        
        let cartObj = {
            productImg : [...productDetails.productImg],
			productName : productDetails.productName,
			productCategory : productDetails.productCategory, 
			productPrice : productDetails.productPrice,
            productWeight : productDetails.productWeight,
            customerName : customerData.customerName,
			customerMobile_NO : customerData.customerMobile_NO
        }

        //console.log("cartObj", cartObj);


        try{

         
            const data = await cartForm(cartObj);
            //console.log("product form", data.cartData);
           // navigate("/productlist");

        }
        catch(error){

            console.error(error);
        }


      }


    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={`${className} custom-arrow custom-next`}
            style={{ ...style, display: 'block', background: 'black'}}
            onClick={onClick}
          />
        );
      };
    
      const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={`${className} custom-arrow custom-prev`}
            style={{ ...style, display: 'block', background: 'black'}}
            onClick={onClick}
          />
        );
      };
    
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
              {
                breakpoint: 1024, 
        
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
        
          const carouselItems = [
            {
              imageSrc: "assets/img/vegetable-item-6.jpg",
              title: "Product 1",
              description: "This is a description of product 1.",
              price: "$19.99",
              category : "vegetables",
              addToCartLink: "/cart/add/1"
            },
            {
              imageSrc: "assets/img/vegetable-item-1.jpg",
              title: "Product 2",
              description: "This is a description of product 2.",
              price: "$29.99",
              category : "vegetables",
              addToCartLink: "/cart/add/2"
            },
            {
              imageSrc: "assets/img/vegetable-item-3.png",
              title: "Product 3",
              description: "This is a description of product 3.",
              price: "$39.99",
              category : "vegetables",
              addToCartLink: "/cart/add/3"
            }
          ];

  return (
    <div>


        {/* navbar */}
        <NavBar/>
        {/* navbar end */}


        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Product Detail</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
                <li className="breadcrumb-item active text-white">Product Detail</li>
            </ol>
        </div>
        {/* Single Page Header End */}


        {/* Single Product Start */}
        <div className="container-fluid py-5 mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div className="col-lg-12 col-xl-9">
                        <div className="row g-4">


                            {/* image */}
                            <div className="col-lg-6">
                                <div className="border rounded">
                                    
                                        <img src={`${BACKEND_URL}/assets/product_upload_images/${currentImage}`} className="img-fluid rounded product_view_img" alt="Image" />
                                   
                                </div>

                                {images ? (
                                    <div className="image_grid"> 
                                        {images.map((img, index) => (
                                        <div key={index} className="image_item"> 
                                            <img
                                            src={`${BACKEND_URL}/assets/product_upload_images/${img}`}
                                            className="product_view_img_small"
                                            alt="img not supported..."
                                            onClick={() => setCurrentImage(images[index])}
                                            />
                                        </div>
                                        ))}
                                    </div>
                                    ) : (
                                    <p>no images found...</p> 
                                )}
                            </div>

                           
                            {productDetails ? 
                            <div className="col-lg-6" >
                                <h3 className="fw-bold mb-3">{productDetails.productName} | {productDetails.productWeight}</h3>
                                <p className="mb-3">Category: {productDetails.productCategory}</p>
                                <h5 className="fw-bold mb-3"> &#8377; {productDetails.productPrice} /-</h5>
                                <div className="d-flex mb-4">
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star text-secondary"></i>
                                    <i className="fa fa-star"></i>
                                </div>

                                <p>Weight : {productDetails.productWeight}</p>
                                <p>Pieces : {productDetails.noofPieces} Approx.</p>

                               
                               <p >Availibility : {Number(productDetails.inStock) >= 1 ? <span style={{color:"#81c408"}}>In Stock</span> : <span style={{color:"red"}}>Out Of Stock</span>}</p> 
                               
                                                        
                                {/* incre/decre quantity */}
                                {/* <div className="input-group quantity mb-5" style={{width: "100px"}}>
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
                                </div> */}

                               {/* add to cart */}
                               {Number(productDetails.inStock) >= 1 ?
                               <button type="submit" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" onClick={handleCart}><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
                               
                                :
                                 <p className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" style={{cursor:"default"}}><i className="fa fa-shopping-bag me-2 text-primary"></i> Out Of Stock</p>
                               }
                            </div>
                            : 
                            <div className="col-lg-6">
                                <p>no product data...</p>
                            </div>
                            }


                            {/* description list */}
                            <div className="col-lg-12">
                                <nav>
                                    <div className="nav nav-tabs mb-3">

                                        <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                            id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description"
                                            aria-controls="nav-description" aria-selected="true">Description</button>

                                        <button className="nav-link border-white border-bottom-0" type="button" role="tab"
                                            id="nav-Ingredients-tab" data-bs-toggle="tab" data-bs-target="#nav-Ingredients"
                                            aria-controls="nav-Ingredients" aria-selected="false">Ingredients</button>


                                        <button className="nav-link border-white border-bottom-0" type="button" role="tab"
                                            id="nav-Health-tab" data-bs-toggle="tab" data-bs-target="#nav-Health"
                                            aria-controls="nav-Health" aria-selected="false">Health benefits</button>

                                        <button className="nav-link border-white border-bottom-0" type="button" role="tab"
                                            id="nav-Reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-Reviews"
                                            aria-controls="nav-Reviews" aria-selected="false">Reviews</button>
                                    </div>
                                </nav>


                                <div className="tab-content mb-5">

                                {/* description */}
                                    <div className="tab-pane active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">

                                    <p>{proDescArray[0]}</p>
                                    <p>{proDescArray[1]}</p>


                                    <h3>Product information</h3>
                                    <p>{proDescArray[2]}</p>

                                       
                                       
                                    </div>

                                {/* Ingredients */}
                                <div className="tab-pane" id="nav-Ingredients" role="tabpanel" aria-labelledby="nav-Ingredients-tab">
                                    <div className="px-2">
                                            {/* <div className="row g-4">
                                                <div className="col-6">
                                                    <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Weight</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">1 kg</p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Country of Origin</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">Agro Farm</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Quality</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">Organic</p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Сheck</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">Healthy</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Min Weight</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">250 Kg</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        {IngredientsArray && IngredientsArray.map((list, index)=>
                                        <ul key={index}>
                                            <li>{list}</li>
                                        </ul>
                               )}
                                    </div>
                                </div>

                                {/* Health */}
                                <div className="tab-pane " id="nav-Health" role="tabpanel" aria-labelledby="nav-Health-tab">
                                   
                                    {healthBenefitsArray && healthBenefitsArray.map((list, index)=>
                                    <ul key={index}>
                                        <li>{list}</li>
                                    </ul>
                               )}
                                           
                                </div>

                                {/* reviews */}
                                <div className="tab-pane" id="nav-Reviews" role="tabpanel" aria-labelledby="nav-Reviews-tab">
                                    <div className="d-flex">
                                        <img src="assets/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{width: "100px" , height: "100px"}} alt="" />
                                        <div className="">
                                            <p className="mb-2" style={{fontSize: "14px"}}>April 12, 2024</p>
                                            <div className="d-flex justify-content-between">
                                                <h5>Jason Smith</h5>
                                                <div className="d-flex mb-3">
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic 
                                                words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <img src="assets/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{width: "100px" , height: "100px"}} alt="" />
                                        <div className="">
                                            <p className="mb-2" style={{fontSize: "14px"}}>April 12, 2024</p>
                                            <div className="d-flex justify-content-between">
                                                <h5>Sam Peters</h5>
                                                <div className="d-flex mb-3">
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <p className="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic 
                                                words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                        </div>
                                    </div>
                                </div>

                                    
                                </div>
                            </div>


                            {/* <form action="#">
                                <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="border-bottom rounded">
                                            <input type="text" className="form-control border-0 me-4" placeholder="Yur Name *" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="border-bottom rounded">
                                            <input type="email" className="form-control border-0" placeholder="Your Email *" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="border-bottom rounded my-4">
                                            <textarea name="" id="" className="form-control border-0" cols="30" rows="8" placeholder="Your Review *" spellcheck="false"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="d-flex justify-content-between py-3 mb-5">
                                            <div className="d-flex align-items-center">
                                                <p className="mb-0 me-3">Please rate:</p>
                                                <div className="d-flex align-items-center" style={{fontSize: "12px"}}>
                                                    <i className="fa fa-star text-muted"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <a href="#" className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</a>
                                        </div>
                                    </div>
                                </div>
                            </form> */}
                        </div>
                    </div>


                    {/* <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <div className="col-lg-12">
                                <div className="input-group w-100 mx-auto d-flex mb-4">
                                    <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                </div>

                                <div className="mb-4">
                                    <h4>Categories</h4>
                                    <ul className="list-unstyled fruite-categorie">
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Apples</a>
                                                <span>(3)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Oranges</a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Strawbery</a>
                                                <span>(2)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Banana</a>
                                                <span>(8)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Pumpkin</a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <h4 className="mb-4">Featured products</h4>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded" style={{width: "100px" , height: "100px"}}>
                                        <img src="assets/img/featur-1.jpg" className="img-fluid rounded" alt="Image" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Big Banana</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded" style={{width: "100px" , height: "100px"}}>
                                        <img src="assets/img/featur-2.jpg" className="img-fluid rounded" alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Big Banana</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded" style={{width: "100px" , height: "100px"}}>
                                        <img src="assets/img/featur-3.jpg" className="img-fluid rounded" alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Big Banana</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded me-4" style={{width: "100px" , height: "100px"}}>
                                        <img src="assets/img/vegetable-item-4.jpg" className="img-fluid rounded" alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Big Banana</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded me-4" style={{width: "100px" , height: "100px"}}>
                                        <img src="assets/img/vegetable-item-5.jpg" className="img-fluid rounded" alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Big Banana</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <div className="rounded me-4" style={{width: "100px" , height: "100px"}}>
                                        <img src="assets/img/vegetable-item-6.jpg" className="img-fluid rounded" alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Big Banana</h6>
                                        <div className="d-flex mb-2">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="d-flex mb-2">
                                            <h5 className="fw-bold me-2">2.99 $</h5>
                                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center my-4">
                                    <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                                </div>
                            </div>

                           
                           
                        </div>
                    </div> */}


                </div>
                <h1 className="fw-bold mb-0" >Related products</h1> <br/>
                <div className="vesitable">



                    {/* <div className="owl-carousel vegetable-carousel justify-content-center">
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="assets/img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="assets/img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt="" />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="assets/img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt="" />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Banana</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="assets/img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt="" />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Bell Papper</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="assets/img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt="" />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Potatoes</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="assets/img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="assets/img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt="" />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Potatoes</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                <img src="assets/img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt="" />
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                            <div className="p-4 pb-0 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                <Slider {...settings}>
                    {carouselItems.map((item, index) => (
                        <div key={index} className="border border-primary rounded position-relative vesitable-item">
                        <div className="vesitable-img">
                            <img src={item.imageSrc} className="img-fluid w-100 rounded-top" alt="" />
                        </div>
                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: "10px", right: "10px"}}>Vegetable</div>
                        <div className="p-4 rounded-bottom">
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">{item.price}</p>   

                            <a href={item.addToCartLink} className="btn border border-secondary rounded-pill px-3 text-primary">
                                <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                            </a>
                            </div>
                        </div>
                        </div>
                    ))}
                </Slider>


                    
                </div>
            </div>
        </div>
        {/* Single Product End */}



        {/* footer */}
        < Footer/>
        {/* footer end */}


    </div>
  )
}

export default Product_details