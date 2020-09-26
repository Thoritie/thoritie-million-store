import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'antd';

const ProductDetailView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`https://react-workshop-v1.herokuapp.com/products/${id}`).then((value) => {
      setProduct(value.data);
    });
  }, []);

  const image = product.images ? product.images.split('|')[0] : '';

  return (
    <div className="product-detail">
      <Image
        width={200}
        src={image}
      />
      {product.postTitle}
    </div>
  );
};

export default ProductDetailView;
