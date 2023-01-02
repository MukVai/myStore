import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { Product } from "../components";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    const onAdd = (product, quantity) => {
        const checkIfItemIsAlreadyInCart = cartItems.find((item) => item._id === product._id);
        //loop on all items in the cart and return where id is equal
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkIfItemIsAlreadyInCart) {

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);

    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id);
        // remove '1' item from 'index' position in the array - use splice - but splice is a mutative method and we must not mutate a state in react, thus we use filter which is non-mutative, and thus remove the item we are updating out of the list so as to re-add it later while updateing the state by setCartItems without mutating the state.

        if (value === 'inc') {
            setCartItems([...newCartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity + 1 }, ...newCartItems.slice(index)])
            // slice is used to update the product and keep it at the same index as it was before
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                // updating the cartItems by removing 1 more quantity to a product
                // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setCartItems([...newCartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity - 1 }, ...newCartItems.slice(index)])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    return (
        < Context.Provider value={{
            showCart, setShowCart, cartItems, totalPrice, totalQuantities, qty,
            incQty, decQty, onAdd, toggleCartItemQuantity, onRemove
        }} >
            {children}
        </Context.Provider >
    )
}

export const useStateContext = () => useContext(Context); 