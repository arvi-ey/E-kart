import { ShoppingCart, Star } from "lucide-react";
import "../styles/product.css";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveFromCart } from "../../redux/slicers/cartSlicer";
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProductBox = ({ product }) => {
    const {
        title,
        price,
        images,
        ratings,
        discount,
        stock,
    } = product;
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const { cartitems } = useSelector(state => state.cart)
    const Navigate = useNavigate()


    const finalPrice = discount
        ? Math.round(price - (price * discount) / 100)
        : price;

    useEffect(() => {
        const found = cartitems.find(item => item.product_id === product._id);
        if (found) setIsAdded(true)
        else setIsAdded(false)


    }, [cartitems, product])



    const handleAddToCart = async (product) => {
        if (!isAdded) {

            setLoading(true)
            const cartObj = {
                title: product?.title,
                userId: "iouDG3978DH92X8B7928",
                subTotal: product?.price && product.price * (1 - 0.40) || 0,
                count: 1,
                product_id: product?._id,
                description: product?.description || '',
                stock: product?.stock || 0,
                image: product?.images?.[0] || '',
                numReviews: product?.numReviews || 0,
                ratings: product?.ratings || 0,
                deliveryTime: product?.deliveryTime || 0,
                createdAt: Date.now().toString(),
                category: product?.category || '',
                price: product?.price,
                discount: product?.discount,
                actualprice: Math.floor(product?.price + product?.price * product?.discount / 100),
                size: "M"
            }
            const data = await dispatch(AddToCart(cartObj))

            if (data?.payload?._id) {
                toast.success("Item added to cart!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.error("Failed to add item to cart", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
            setLoading(false)

        }
        else {
            Navigate("/cart")
        }
    };


    return (
        <div className="product-card">
            <img
                src={images?.[0]}
                alt={title}
                className="product-image"
            />

            <div className="product-body">
                <div className="rating">
                    <Star size={14} fill="#facc15" stroke="none" />
                    <span>{ratings}</span>
                </div>

                <h4 className="title">{title}</h4>

                <div className="price">
                    <span className="final">₹{finalPrice}</span>

                    {discount && (
                        <>
                            <span className="original">₹{price}</span>
                            <span className="off">{discount}% OFF</span>
                        </>
                    )}
                </div>

                <button
                    className="add-cart"
                    disabled={stock === 0}
                    onClick={() => handleAddToCart(product)}
                >
                    <ShoppingCart size={16} />
                    {loading ? "Adding to cart ..." : !loading && isAdded ? "Go to Cart" : "Add to Cart"}
                </button>
            </div>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default ProductBox;
