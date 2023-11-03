import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';

const Home = ({setAuth}) => {
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
            <div className="container">
                {allProducts.map((product) => (
                    <Link to={`/products/${product.id}`} state={ product }>
                        <Product product={product} />
                    </Link>
                ))}
            </div>
        </Fragment>
    );
};

export default Home;