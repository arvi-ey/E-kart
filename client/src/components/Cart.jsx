import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from './CartProduct'

export const Cart = () => {
    const { cartitems } = useSelector(state => state.cart)

    return (
        <div style={{ marginTop: "50px" }} >

            {
                cartitems.length == 0 &&
                <div style={{ width: "100%", height: "100vh", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <p style={{ fontWeight: "bold", fontSize: "30px" }}>Cart is empty</p>

                </div>
            }

            {
                cartitems?.length > 0 && cartitems.map((item) => {
                    return (
                        <CartProduct
                            item={item}
                        />
                    )
                })
            }</div>
    )
}
