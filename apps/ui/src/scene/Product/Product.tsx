// src/components/ProductDetail.js
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/products';

const ProductDetail = () => {
  const { id = '' } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!data) return <div>No product found</div>;

  return (
    <div className="product-detail">
      <h1>{data.name}</h1>
      <p>Category: {data.dataCategory}</p>
      <p>Record Count: {data.recordCount}</p>
      <p>Fields: {data.fields}</p>
    </div>
  );
};

export default ProductDetail;
