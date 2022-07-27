import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity++;
                toast.info(
                    `increased ${state.cartItems[itemIndex].name} cart quantity`,
                    {
                        position: "bottom-left",
                    }
                );
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position: "bottom-left",
                });
            }
            state.cartTotalQuantity++;

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );
            state.cartItems = nextCartItems;
            // state.cartTotalQuantity--;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            toast.error(`${action.payload.name} removed from cart`, {
                position: "bottom-left",
            });
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity--;
                toast.info(`Decreased ${action.payload.name} cart quantity`, {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );
                state.cartItems = nextCartItems;
                // state.cartTotalQuantity--;

                toast.error(`${action.payload.name} removed from cart`, {
                    position: "bottom-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            localStorage.clear("cartItems");

            toast.error(`Cart has been cleared`, {
                position: "bottom-left",
            });
        },
    },
});

export const { addToCart, removeFromCart, clearCart, decreaseCart } =
    cartSlice.actions;

export default cartSlice.reducer;