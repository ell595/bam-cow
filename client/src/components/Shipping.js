import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';

const Shipping = ({url}) => {
    const [allProducts, setAllProducts] = useState([]);

    async function getProducts() {
        try {
            const response = await fetch("http://localhost:3000/products/", {
                method: "GET",
                headers: {token: localStorage.token, },
            });

            const parseRes = await response.json();

            setAllProducts(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProducts()
    },[]);

    return (
        <Fragment>
            <h1>Shipping Details</h1>
            <h2>{url}</h2>
        </Fragment>
    );
};

export default Shipping;