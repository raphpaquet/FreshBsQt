import React, { useEffect } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([])

  const url = 'http://localhost:3001/api/items'

  useEffect(() => {
    getAllProducts();
  })

  const getAllProducts = () => {
    axios.get(url)
    .then((response) => {
      const allProducts = response.data.products.allProducts;
      setItems(allProducts)
    })
    .catch(error => console.error(`Error: ${error}`))
  }
  return (
    <></>
  )
}