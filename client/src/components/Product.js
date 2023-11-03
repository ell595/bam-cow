import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Product = ({product}) => {

    return (
        <Fragment>
                    <div className="card">
                        <img src={`images/${product.img}`}></img>
                        <div className="product-info">
                            <input type="hidden" id="product_id" name="id" value={product.id}></input>
                            <h2>{product.name}</h2>
                        </div>
                    </div>
            
        </Fragment>
    );
};

export default Product;