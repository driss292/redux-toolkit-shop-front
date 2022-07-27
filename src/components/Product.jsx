import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    };
    return (
        <div className="product">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />

            <div className="details">
                <span>{product.desc}</span>
                <span className="price">€{product.price}</span>
            </div>
            <button onClick={() => handleAddToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
};

export default Product;
