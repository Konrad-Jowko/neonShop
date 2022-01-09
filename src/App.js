import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import MainLayout   from './components/layout/MainLayout/MainLayout';
import Homepage   from './components/views/Homepage/HomepageContainer';
import Product  from './components/views/Product/ProductContainer';
import  Cart   from './components/views/Cart/CartContainer';
import  CartUpdate   from './components/views/CartUpdate/CartUpdate';
import  Summary   from './components/views/Summary/SummaryContainer';
import  SummaryResponse   from './components/views/SummaryResponse/SummaryResponseContainer';
import  Products   from './components/views/Products/ProductsContainer';
import  About   from './components/views/About/AboutContainer';
import NotFound   from './components/views/NotFound/NotFound';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/products/:categoryId/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart/updated' element={<CartUpdate />} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/summary/response' element={<SummaryResponse />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export default App ;
