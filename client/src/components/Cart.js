import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Product from './Product';
import Shipping from './Shipping';

const Cart = ({id}) => {
    const [cart, setCart] = useState([]);
    const [url, setUrl] = useState();

    async function getCart() {
        console.log(id);
        try {
            const response = await fetch(`http://localhost:3000/cart/?id=${id}`, {
                method: "GET",
            });
            if (response.status === 200) {
                const parseRes = await response.json();
                setCart(parseRes);
                console.log(parseRes);
            } else {
                console.error(response.status);
            };
        } catch (err) {
            console.error(err.message);
        }
    };

    async function checkout() {
        console.log('checkout');
        console.log(cart);
        try {
            const response = await fetch('http://localhost:3000/checkout/create-checkout-session', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: cart,
                    id: id
                }),
            });

            const parseRes = await response.json();
            const url = parseRes.url;
            setUrl(parseRes.url);
            console.log(url);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getCart();
        console.log(id);
    }, [id]);

    return (
        <Fragment>
            <p>Cart</p>
            <button onClick={getCart}>get cart</button>
            <table>
            {cart.map((product) => (
                <tr>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td> X {product.quantity}</td>
                </tr>
                ))}
            </table>
            <button onClick={checkout}>Checkout</button>
        </Fragment>
    );
};

export default Cart;