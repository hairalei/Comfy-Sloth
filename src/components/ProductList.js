import React from 'react';
import { useFilterContext } from '../context/filter_context';
import products_reducer from '../reducers/products_reducer';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();

  if (filteredProducts.length < 1) {
    return (
      <h4 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h4>
    );
  }

  if (!gridView) {
    return <ListView filteredProducts={filteredProducts} />;
  }

  return <GridView filteredProducts={filteredProducts}>product list</GridView>;
};

export default ProductList;
