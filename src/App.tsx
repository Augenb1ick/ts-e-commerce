import { Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductList from './components/ProductList';
import About from './pages/About';

import { useState } from 'react';

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? (
    <Cart onBackToProducts={async () => setViewCart(false)} />
  ) : (
    <ProductList />
  );

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={pageContent} />
      </Routes>
      <Footer />
    </>
  );

  return content;
}

export default App;
