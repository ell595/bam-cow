import React, { Fragment, useState, useEffect } from 'react';
import { Container, Heading, Text, Flex } from '@chakra-ui/react';
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
            <Flex className="jumbotron" align="center" justify="space-center" flexDir="column">
                <Heading display="block">Welcome to BamCow</Heading>
                <Text>Hand-crafted candles with unique scents</Text>
            </Flex>
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