import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { GetCartItems } from '../../redux/slicers/cartSlicer'

const Layout = () => {
    const dispatch = useDispatch()
    const { cartitems } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(GetCartItems())
    }, [])

    return (
        <div >
            <Navbar
                numb={cartitems.length || 0}
            />
            <main >
                <Outlet />
            </main>

        </div>
    )
}

export default Layout