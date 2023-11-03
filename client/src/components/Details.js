import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Details = ({id}) => {
    const { product_id } = useParams();

    const addToCart = async () => {

        try {
            console.log(id)
            const body = {id, product_id};
            const response = await fetch(`http://localhost:3000/cart/`, {
               method: "POST", 
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify(body)
           });

           const parseRes = response.json();
           console.log(response.status);

        } catch (err) {
            console.error(err.message);
        }
    };





    return (
        <Fragment>
            <p>Test</p>
            <p></p>
            <button onClick={addToCart}>Add to Cart</button>
        </Fragment>
    );
};

export default Details;