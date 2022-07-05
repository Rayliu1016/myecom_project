import React, {createContext, useContext, useState, useEffect} from 'react'
import {toast} from 'react-hot-toast' 
import product from '../sanity_ecom/schemas/product';

const Context = createContext(); 

// holds all of the different states of the application 
export const StateContext = ({children}) => {
    // different states of different items we have
    const [showCart, setShowCart] = useState(false); 
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct; 
    let index 

    // this function will help us deal with the logic that is used for adding items to cart 
    const onAdd = (product, quantity) => {
        // check if this specific item is in the cart or not
        const checkProductInCart = cartItems.find((items) => items._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price*quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        // if the item is in the cart already and we are adding more of it, then we can set the total price and total quantity 
        // by updating the old price and old quantity using the price*quantity and quantity respectively 
        if (checkProductInCart){

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            // update the state of the cart using setCartItems
            setCartItems(updatedCartItems)
        } 
        // the item is not already added to the cart
        else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}]);
        }

        // set toast to let customer know they added to the cart correctly 
        toast.success(`${qty} ${product.name} added to cart`);
    }

    const onRemove = (product) => {
        // this helps us find the exact product we are trying to update in the cart 
        foundProduct = cartItems.find((item) => item._id === product._id);

         // this will filter the item we want to remove, out of the array
         // filter is used instead of something like splice because splice mutates the cart's state which is BAD 
         const filterCartItems = cartItems.filter((item) => item._id !== product._id)
         // update the total price because we are removing this product
         setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price * foundProduct.quantity)
         // set the quantity since removing this product will cause us to have less items
         setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
         // set the cart items to be this new cart given by fitler cart items 
         setCartItems(filterCartItems)
    }

    // function used to update the quanity of the items we have in our cart so that we can add/remove items 
    const toggleCartItemQuqantity = (id, value) => {
        // this helps us find the exact product we are trying to update in the cart 
        foundProduct = cartItems.find((item) => item._id === id);
        // this helps us find the index of the product
        index = cartItems.find((product) => product._id === id);
         // this will filter the item we want to update the value of, out of the array, so we do not get duplicates 
         // filter is used instead of something like spice because splice mutates the cart's state which is BAD 
         const filterCartItems = cartItems.filter((item) => item._id !== id)

        // how should we act if we are incrementing or decrementing
        if (value === 'inc') {
           
            // ...splicedCartItems spreads the old cart items into this new variable - essentially creating a new cart variable
            // increment the product quantity using quantity: product.quantity+1 
            let newCartItems = [...filterCartItems, {...foundProduct, quantity: foundProduct.quantity+1}];
            
            // update the cart at this index to this new quantity update 
            setCartItems(newCartItems);
            // update the price 
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            // set the total quantities 
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            // only decrement when we have greater than 0 items 
            if (foundProduct.quantity > 1) {
                // decrement the quantity and create a new cart item so we can set the state properly 
                let newCartItems = [...filterCartItems, {...foundProduct, quantity: foundProduct.quantity-1}];
                // set the cart items 
                setCartItems(newCartItems);
                // set/change the total cart price 
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                // set/change the total quantity 
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
    }


    // function used to increase the quantity of an item  
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    // function used to decrease the quantity of an item
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1; 
            
            return prevQty - 1 
        })
    }

    return (
        <Context.Provider
            value = {{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuqantity,
                onRemove,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);