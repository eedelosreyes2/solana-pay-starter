import React, { useState, useEffect } from 'react';
import CreateProduct from '../components/CreateProduct';
import Product from '../components/Product';
import HeadComponent from '../components/Head';
import { useWallet } from '@solana/wallet-adapter-react';

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = publicKey
    ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY
    : false;
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // if (publicKey) {
    fetch(`/api/fetchProducts`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log('Products', data);
      });
    // }
  }, []);

  const renderFooter = () => (
    <div>
      Built by{' '}
      <a
        className="footer-text"
        href="https://elijahdr.vercel.app"
        target="_blank"
        rel="noreferrer"
      >
        Elijah
      </a>{' '}
      on{' '}
      <a
        className="footer-text"
        href="https://twitter.com/_buildspace"
        target="_blank"
        rel="noreferrer"
      >
        buildspace
      </a>
    </div>
  );

  return (
    <div className="App">
      <HeadComponent />
      <div className="container">
        <header className="header-container">
          <p className="header">Solana Pay Store</p>
          <p className="sub-text">
            An online digital store that accepts SPL tokens (Devnet)
          </p>

          {isOwner && (
            <button
              className="create-product-button"
              onClick={() => setCreating(!creating)}
            >
              {creating ? 'Close' : 'Create Product'}
            </button>
          )}
        </header>

        {creating && <CreateProduct />}
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              isConnected={publicKey}
            />
          ))}
        </div>

        <div className="footer-container">{renderFooter()}</div>
      </div>
    </div>
  );
};

export default App;
