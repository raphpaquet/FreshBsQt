import React, { useEffect } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [product, setProductData] = useState([])


  useEffect(() => {
    getAllProducts();
  })

  function getAllProducts() {
    axios.get('https://localhost:3001/api/products')
         .then(response => {
            console.log(response.data)
            const { data } = response.data
            SetProductData(data)
        }).catch(error => {
            console.log(error);
        })
    }
  return (
    <></>
  )
}