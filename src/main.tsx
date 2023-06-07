import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './context/CardProvider.tsx'
import { ProductsProvider } from './context/ProductsProvider.tsx'
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
  </BrowserRouter>,
)
