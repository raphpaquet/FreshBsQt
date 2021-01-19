import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [product, setProduct] = useState('')


  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios.get('/api/products')
         .then((response) => {
            console.log(response.data)
            setProduct(response.data[0])
        })
        .catch(error => {
            console.log(error);
        })
    }

  return (
    <>
    <div className="products">
      <span>Product name: {product.name}</span>
      <br></br>
      <span>Product price: {product.price}</span>
    </div>
    </>
  )
}