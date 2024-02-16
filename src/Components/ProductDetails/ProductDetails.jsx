import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Triangle } from 'react-loader-spinner'

export default function ProductDetails() {
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true)
   let {id} = useParams();
   
   async function getProductDetails(id){
     let {data} = await axios.get (`https://ecommerce.routemisr.com/api/v1/products/${id}`) 
        setDetails(data.data)
        setLoading(false)
     }

     useEffect(()=>{
        getProductDetails(id)
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
    </div> :<div className="container">
                <div className="row align-items-center ">
                    <div className="col-md-4">
                        <img src={details.imageCover} className='w-100' alt="" />
                    </div>

                    <div className="col-md-8">
                        <div className="details">
                            <h3 className='h5'>{details.title}</h3>
                            <p className='py-3 text-muted '>{details.description}</p>
                            <span className='font-sm text-main'>{details.category.name}</span>
                            <h3 className='h6'>{details.title.split(" ").splice(0,2).join(" ")}</h3>
                            <div className="d-flex py-3 align-items-center  justify-content-between">
                                <span className='font-sm'>{details.price} EGP</span>
                                <span>
                                    {details.ratingsAverage}
                                    <i className='fas fa-star rating-color mx-1 '></i>
                                </span>
                            </div>
                            <button className='btn bg-main text-light w-100 btn-sm mb-1'>Add to Cart</button>
                        </div>
                    </div>
                </div> 
            </div> }
    </>
}
