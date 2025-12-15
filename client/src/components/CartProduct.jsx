import { Minus, Plus, Trash2 } from "lucide-react";
import "../styles/cart.css";
import { useDispatch } from "react-redux";
import { RemoveFromCart, UpdateCartItem } from "../../redux/slicers/cartSlicer";

const CartProduct = ({ item }) => {
    const {
        title,
        image,
        price,
        actualprice,
        discount,
        count,
        size,
        deliveryTime,
    } = item;

    const dispatch = useDispatch()



    const UpdateItemCount = async (value) => {
        if (value === 0 && item?.count === 1) dispatch(RemoveFromCart(item?._id))

        const countValue = item?.count + (value === 1 ? 1 : -1);
        const body = { count: countValue, subTotal: countValue * item.price };
        dispatch(UpdateCartItem({ cartId: item._id, body }));
    }

    const onRemove = async (item) => {
        dispatch(RemoveFromCart(item?._id))

    }

    return (
        <div className="cart-item">
            <img src={image} alt={title} className="cart-image" />

            <div className="cart-info">
                <h4 className="cart-title">{title}</h4>

                <p className="cart-size">Size: {size}</p>

                <div className="cart-price">
                    <span className="final-price">₹{price}</span>

                    {actualprice && (
                        <>
                            <span className="actual-price">₹{actualprice}</span>
                            <span className="discount">{discount}% OFF</span>
                        </>
                    )}
                </div>

                <p className="delivery">
                    Delivery in {deliveryTime} days
                </p>

                <div className="quantity-control">
                    <button onClick={() => UpdateItemCount(0)}>
                        <Minus size={16} />
                    </button>

                    <span>{count}</span>

                    <button onClick={() => UpdateItemCount(1)}>
                        <Plus size={16} />
                    </button>
                </div>
                <div style={{ backgroundColor: "yellow", width: "200px", textAlign: "center", borderRadius: "7px", marginTop: '10px', cursor: 'pointer', padding: "10px" }}>
                    <span>Place order ₹{item.subTotal}</span>
                </div>
            </div>
            <button
                className="remove-btn"
                onClick={() => onRemove(item)}
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default CartProduct;
