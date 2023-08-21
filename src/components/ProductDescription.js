import React from 'react';

const ProductDescription = ({ products }) => {
  const generateDescription = () => {
    return products.map((product, index) => {
      return (
        <div key={index}>
          <h2>Product {index + 1}</h2>
          <p>
            <strong>Brand:</strong> {product.brand}
            <br />
            <strong>Color:</strong> {product.dominant_color}
            <br />
            <strong>Description:</strong> {product.body}
            <br />
            <strong>Price:</strong> ${product.variant_price}
            <br />
            <strong>Ideal For:</strong> {product.ideal_for}
            <br />
            <strong>Specifications:</strong> {product.specifications}
          </p>
        </div>
      );
    });
  };

  return <div>{generateDescription()}</div>;
};

export default ProductDescription;
