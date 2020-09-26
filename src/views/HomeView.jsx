import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { Row, Col, Card, Input } from 'antd';

const { Meta } = Card;
const { Search } = Input;

const HomeView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = axios.get('https://react-workshop-v1.herokuapp.com/products');
    getProducts.then((value) => {
      setProducts(value.data);
    });
  }, []);

  const onSearchProducts = (value) => {
    axios.get('https://react-workshop-v1.herokuapp.com/products', { params: { q: value } })
      .then((result) => {
        setProducts(result.data);
      });
  };

  const renderedProducts = products.map((product) => {
    const image = product.images.split('|');

    return <Col key={product.id} className="gutter-row" span={8} style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
      <Link to={`/products/${product.id}`}>
        <Card
          hoverable
          style={{ width: 270 }}
          cover={<img alt="example" src={image[0]} />}
        >
          <Meta title={product.postTitle} description={product.postContent} />
        </Card>
      </Link>
    </Col>;
  });

  return (
    <div>

      <Search
        style={{ marginTop: '20px' }}
        enterButton="Search"
        onSearch={(value) => onSearchProducts(value)}
      />
      <Row gutter={16} >
        { renderedProducts }
      </Row>
    </div>

  );
};

export default HomeView;
