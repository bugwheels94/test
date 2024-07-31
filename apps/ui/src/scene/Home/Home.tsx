// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../services/products';
import './Home.scss';
import { Loader } from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
const ProductList = () => {
  const [filters, setFilters] = useState({ dataCategory: '', name: '' });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters.dataCategory, filters.name),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="filter-container">
        <input
          className="search-field w-full md:w-fit"
          type="text"
          name="dataCategory"
          value={filters.dataCategory}
          onChange={handleFilterChange}
          placeholder="Filter by Category"
        />
        <input
          className="search-field w-full md:w-fit"
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Filter by Name"
        />
      </div>
      {error && <div>Error loading products {error.message}</div>}
      {isLoading ? (
        <Loader />
      ) : data?.length === 0 ? (
        <span>No Products Found!</span>
      ) : (
        <ul>
          {data?.map((product) => (
            <li key={product.id} className="product-item">
              <h2>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h2>
              <p>Category: {product.dataCategory}</p>
              <p>Record Count: {product.recordCount}</p>
              <p>Fields: {product.fields}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
