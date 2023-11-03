import React, { Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Product from './Product';

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState();
    const [id, setId] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [productToUpdate, setProductToUpdate] = useState({
        name: "",
        price: "",
        category: "",
        quantity: 0
    });
    const [updatedName, setUpdatedName] = useState('');
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');
    const [updatedQuantity, setUpdatedQuantity] = useState();

    async function getName() {
        try {
            const response = await fetch("http://localhost:3000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();

            setName(parseRes.name);

            setId(parseRes.user_id);

            if (parseRes.isAdmin === true) {
                setIsAdmin(true);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    async function getCart() {
        try {
            const response = await fetch("http://localhost:3000/cart/", {
                method: "GET",
                headers: {token: localStorage.token, },
            });

            const parseRes = await response.json();

            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    };

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

    const addProduct = async (e) => {
        e.preventDefault();

        const product_name = e.target.product_name.value;
        const price = e.target.price.value;
        const category = e.target.category.value;
        const quantity = e.target.quantity.value;

        if (product_name === "" || price === "" || category === "" || quantity === "") {
            return;
        } else {
        
        try {
            const body = {product_name, price, category, quantity};
            const response = await fetch("http://localhost:3000/products/", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            setAllProducts(allProducts => [...allProducts, parseRes]);

            var form = document.getElementById("addproductform");
            form.reset();
        } catch (err) {
            console.error(err.message);
        }
    }
    };

    const deleteProduct = async (e) => {
       e.preventDefault();

        console.log(productToUpdate);
        try {
            const body = productToUpdate.name;
            const response = await fetch(`http://localhost:3000/products/?name=${body}`, {
                method: "DELETE", 
                headers: {"Content-Type": "application/json"},
                body: null
            });

            const parseRes = await response.json();
            setAllProducts(parseRes);
            var form = document.getElementById("updateproductform");
            form.reset();
            setProductToUpdate({})
        } catch (err) {
            console.error(err.message);
        }
    }

    const getProductToUpdate = async (e) => {
        e.preventDefault();
 
        try {
             const id = e.target.value;
             const body = { id };

             const response = await fetch(`http://localhost:3000/products/update/?id=${id}`, {
                method: "GET", 
                headers: {"Content-Type": "application/json"},
                body: null
            });

            const parseRes = await response.json();
            setProductToUpdate(parseRes);
            console.log(parseRes);
         } catch (err) {
             console.error(err.message);
         }
     }

    const saveUpdatedProduct = async (e) => {
        e.preventDefault();
        console.log(productToUpdate);



        const id = productToUpdate.id;
        const updatedName = productToUpdate.name;
        const updatedPrice = productToUpdate.price;
        const updatedCategory = productToUpdate.category
        const updatedQuantity = productToUpdate.quantity;
        
 
 ;        try {
             const body = { id, updatedName, updatedPrice, updatedCategory, updatedQuantity };

             const response = await fetch(`http://localhost:3000/products/`, {
                method: "PUT", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            
         var form = document.getElementById("updateproductform");
         form.reset();
         setProductToUpdate({})
         } catch (err) {
             console.error(err.message);
         }
     }

    useEffect(() => {
        getName()
    },[]);

    useEffect(() => {
        getProducts()
    },[]);
    

    if (isAdmin) {
        return (
            <Fragment>
                <div className="jumbotron"><h1>Admin Dashboard {name}</h1></div>
                <div className="addproduct">
                    <h3>Add a product</h3>
                    <form id="addproductform" onSubmit={e => addProduct(e)}>
                        <input type="text" name="product_name" placeholder="name"></input>
                        <input type="number" step="0.01" name="price" placeholder="price"></input>
                        <input type="text" name="category" placeholder="category"></input>
                        <input type="number" name="quantity" placeholder="quantity"></input>
                        <button>Sumbit</button>
                    </form>
                </div>

                <div className="updateproduct">
                    <h3>Update a product</h3>
                    <form onSubmit={e => saveUpdatedProduct(e)} id="updateproductform">
                    <select className="updateproduct" onChange={e => getProductToUpdate(e)}>
                        <option>-------</option>
                        {allProducts.map((product) => (
                            <option value={product.id}>{product.name}</option>
                        ))}
                    </select>
                    <input type="hidden" id="product_id" name="id" value={productToUpdate.id}></input>
                            <input type="text" name="updated_product_name" value={productToUpdate.name}  onChange={e => setProductToUpdate({...productToUpdate, name: e.target.value})}></input>
                            <input type="text" step="0.01" name="price" value={productToUpdate.price}  onChange={e => setProductToUpdate({...productToUpdate, price: e.target.value})}></input>
                            <input type="text" name="category" value={productToUpdate.category}  onChange={e => setProductToUpdate({...productToUpdate, category: e.target.value})}></input>
                            <input type="number" name="quantity" value={productToUpdate.quantity}  onChange={e => setProductToUpdate({...productToUpdate, quantity: e.target.value})}></input>
                            <button type="submit">Save</button>
                            <button onClick={e => deleteProduct(e)}>Delete</button>
                            </form>
                </div>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <h1>User Dashboard {name}</h1>
            </Fragment>
        );
    }

};

export default Dashboard;