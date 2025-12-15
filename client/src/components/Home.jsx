import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetProducts } from '../../redux/slicers/productSlicres'
import { useEffect } from 'react'
import "../styles/home.css"
import ProductBox from './ProductBox'

import { ToastContainer } from 'react-toastify'
const Home = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)


    console.log(products)
    useEffect(() => {
        dispatch(GetProducts())
    }, [])





    return (
        <div className="home">

            <div className="home-header">
                <h1>Products</h1>
                <p>Discover the best products at the best prices</p>
            </div>


            <div className="home-content">
                {
                    products?.length > 0 && products.map((product) => {
                        return (
                            <ProductBox
                                key={product._id}
                                product={product}

                            />
                        )
                    })
                }
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />

        </div>
    )
}

export default Home