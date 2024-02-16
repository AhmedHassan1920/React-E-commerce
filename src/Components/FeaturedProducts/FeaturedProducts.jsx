import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Triangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
 const [products, setProducts] = useState([])
 const [loading, setLoading] = useState(true)
 
    async function getProducts() {
   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        setProducts(data.data)
        setLoading(false)
  }
  useEffect(()=>{
        getProducts()
  },[])

    return <>
    {loading?
    <div className="row">
        <div className="container">
        <Triangle
          visible={true}
          height="100"
          width="100"
          color="#0aad0a"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass="d-flex justify-content-center mt-5"
          /> 
        </div>
    </div>   
    : <div className="container">
        <div className="row gy-4">
      {products.map( product =>
            <div className="col-lg-2">
                <Link to={`/productdeatils/${product.id}`}>
                    <div className="product px-2 ">
                        <img src={product.imageCover} className='w-100' alt={product.title} />
                        <span className='font-sm text-main'>{product.category.name}</span>
                        <h3 className='h6'>{product.title.split(" ").splice(0,2).join(" ")}</h3>
                        <div className="d-flex py-3 align-items-center  justify-content-between">
                            <span className='font-sm'>{product.price} EGP</span>
                            <span>
                                {product.ratingsAverage}
                                <i className='fas fa-star rating-color me-1 '></i>
                            </span>
                        </div>
                        <button className='btn bg-main text-light w-100 btn-sm mb-1'>Add to Cart</button>
                    </div>
                </Link>
        </div>
        )}  
    </div> 
    </div>
    }
    </>
}
