import React, {useState, useEffect, lazy} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProductData } from './productService/productService';
import { BACKEND_URL } from '../../config/config';
import "./product.css"

let NavBar = lazy(()=>import("../../components/navBar/NavBar"))
let Footer = lazy(()=>import("../../components/footer/Footer"))
let Pegination = lazy(()=>import("../../components/pegination/pegination"))


const Products = () => {

    let navigate = useNavigate();

       // all products state value
  const [items, setItems] = useState([]);


  
  // search product state value
  const [searchproduct, setSearchproduct] = useState("");



  
  //all products from database
  useEffect(()=>{

    const fetchData = async () => { 
                try{
                   
                        //get product data
                        const productDetails = await getProductData();
                        await setItems(productDetails.productData);
                       console.log("date received", productDetails.productData);                   
                    
                }
                catch(error){
        
                    console.error(error);
                }
            };
        
            fetchData();


  },[]) 



   // product data send to product details page 
 const viewProductDetails = (data)=>{
    navigate("/product_details", {state : data})
}


   //   Begin Pagination
   const [currentItems, setCurrentItems] = useState([]);
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);
   const itemsPerPage = 9;
 
   useEffect(() => {
     const endOffset = itemOffset + itemsPerPage;
 
     setCurrentItems(items.slice(itemOffset, endOffset));
     setPageCount(Math.ceil(items.length / itemsPerPage));
   }, [itemOffset, itemsPerPage, items]);
 
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % items.length;
     setItemOffset(newOffset);
   };

   //Pagination ends





  return (
    <div>


  {/* navbar */}
  <NavBar />
       {/* navbar end */}


        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Product</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
                <li className="breadcrumb-item active text-white">Product</li>
            </ol>
        </div>
        {/* Single Page Header End */}


        {/* Fruits Shop Start*/}
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <h1 className="mb-4">Fresh Products</h1>
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">

                            {/* search */}
                            <div className="col-xl-3">

                                <div className="input-group w-100 mx-auto d-flex">
                                    <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" name="searchProducts" value={searchproduct} onChange={(e)=>setSearchproduct(e.target.value)}/>

                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                </div>
                            </div>

                            <div className="col-6"></div>

                            <div className="col-xl-3">
                                <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                    <label for="fruits">Default Sorting:</label>
                                    <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                        <option value="volvo">Nothing</option>
                                        <option value="saab">Popularity</option>
                                        <option value="opel">Organic</option>
                                        <option value="audi">Fantastic</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="row g-4">
                            <div className="col-lg-3">

                                <div className="row g-4">

                                    {/* category */}
                                    <div className="col-lg-12">
                                        <div className="mb-3">
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


                                    {/* price */}
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4 className="mb-2">Price</h4>
                                            <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min="0" max="500" value="0" oninput="amount.value=rangeInput.value" />
                                            <output id="amount" name="amount" min-velue="0" max-value="500" for="rangeInput">0</output>
                                        </div>
                                    </div>


                                    {/* Additional */}
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4>Additional</h4>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-1" name="Categories-1" value="Beverages" />
                                                <label for="Categories-1"> Organic</label>
                                            </div>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-2" name="Categories-1" value="Beverages" />
                                                <label for="Categories-2"> Fresh</label>
                                            </div>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-3" name="Categories-1" value="Beverages" />
                                                <label for="Categories-3"> Sales</label>
                                            </div>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-4" name="Categories-1" value="Beverages" />
                                                <label for="Categories-4"> Discount</label>
                                            </div>
                                            <div className="mb-2">
                                                <input type="radio" className="me-2" id="Categories-5" name="Categories-1" value="Beverages" />
                                                <label for="Categories-5"> Expired</label>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Featured products */}
                                    {/* <div className="col-lg-12">
                                        <h4 className="mb-3">Featured products</h4>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <div className="rounded me-4" style={{width: "100px", height: "100px"}}>
                                                <img src="assets/img/featur-1.jpg" className="img-fluid rounded" alt="" />
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
                                            <div className="rounded me-4" style={{width: "100px", height: "100px"}}>
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
                                            <div className="rounded me-4" style={{width: "100px", height: "100px"}}>
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
                                        <div className="d-flex justify-content-center my-4">
                                            <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                                        </div>
                                    </div> */}


                                    {/* banner */}
                                    <div className="col-lg-12">
                                        <div className="position-relative">
                                            <img src="assets/img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                                            <div className="position-absolute" style={{top: "50%", right: "10px", transform: "translateY(-50%)"}} >
                                                <h3 className="text-secondary fw-bold">Fresh <br/> Fruits <br/> Banner</h3>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>



                                <div className="col-lg-9">

                                <div className="row g-4 justify-content-center">

                                    {currentItems.length >= 0 ? currentItems.filter(list=>list.productName.toLowerCase().startsWith(searchproduct.toLowerCase())).map(res=>

                                   
                                        <div className="col-md-6 col-lg-6 col-xl-4" key={res._id} onClick={()=>viewProductDetails(res)} style={{cursor : "pointer"}}>
                                            <div className="rounded position-relative fruite-item">

                                                {/* product image */}
                                                <div className="fruite-img ">
                                                    <img  src={`${BACKEND_URL}/assets/product_upload_images/${res.productImg[Math.floor(Math.random() * res.productImg.length)]}`} className="img-fluid w-100 rounded-top product_img" alt="image not support..." />
                                                </div>

                                                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: "10px", left: "10px"}}>{res.productCategory}</div>

                                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                    <h4>{res.productName.length >15 ? `${res.productName.substring(0, 15)}...` : res.productName}</h4>
                                                    {/* <p>{res.productdesc.length > 30 ? `${res.productdesc.substring(0, 30)}...` : res.productdesc}</p> */}
                                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                                        <p className="text-dark fs-5 fw-bold mb-0">  &#8377; {res.productPrice} / {res.productWeight}</p>

                                                        {/* <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    )
                                    :

                                    <div className="col-md-6 col-lg-6 col-xl-4">
                                      <p>No Product data...</p>
                                    </div>
                                    }

                                    {/* <div className="col-md-6 col-lg-6 col-xl-4">
                                        <div className="rounded position-relative fruite-item">
                                            <div className="fruite-img">
                                                <img src="assets/img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt="" />
                                            </div>
                                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{top: "10px", left: "10px"}}>Fruits</div>
                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                <h4>Raspberries</h4>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                    <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    */}


                                    {/* pegination */}

                                    <Pegination 
                                        onPageChange={handlePageClick} 
                                        pageCount={pageCount}
                                    />
                                    {/* <div className="col-12">
                                        <div className="pagination d-flex justify-content-center mt-5">
                                            <a href="#" className="rounded">&laquo;</a>
                                            <a href="#" className="active rounded">1</a>
                                            <a href="#" className="rounded">2</a>
                                            <a href="#" className="rounded">3</a>
                                            <a href="#" className="rounded">4</a>
                                            <a href="#" className="rounded">5</a>
                                            <a href="#" className="rounded">6</a>
                                            <a href="#" className="rounded">&raquo;</a>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                            </div>
                            
                            
                        </div>

                    </div>
                </div>
            </div>
       
        {/* Fruits Shop End */}

    {/* footer */}
    <Footer />
    {/* footer end */}
       
       
    </div>
  )
}

export default Products