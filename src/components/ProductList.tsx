import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import { UseProductsContextType } from "../context/ProductsProvider"
import { ReactElement, useEffect, useState } from "react"
import Product from "./Product"


function ProductList() {

  const {dispatch, REDUCER_ACTIONS, cart} = useCart()
  let {products} = useProducts()

  const [currentProducts, setCurrentProducts] = useState(products);

  let pageContent: ReactElement | ReactElement[] = <p>Загрузка...</p>

  if (products?.length) {
    pageContent = currentProducts.map(product => {
      const inCart: boolean = cart.some(item => item.id === product.id)
      return (
        <Product 
        key = {product.id}
        product = {product}
        dispatch = {dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
        inCart={inCart}
        />
      )
    })
  }
  
  function onAllProducts() {
    setCurrentProducts(products)
  }

  function onFurniture() {
    setCurrentProducts(products.filter(product => product.category === "Мебель"))
  }

  function onLighting() {
    setCurrentProducts(products.filter(product => product.category === "Освещение"))
  }

  function onCosmetics() {
    setCurrentProducts(products.filter(product => product.category === "Косметика"))
  }

  

  const content = (
    <>
    <div className="categories-btn">
    <button onClick={() => onAllProducts()}>Все</button>
    <button onClick={() => onFurniture()}>Мебель</button>
    <button onClick={() => onCosmetics()}>Косметика</button>
    <button onClick={() => onLighting()}>Освещение</button>
    </div>
    <main className="main">
      {pageContent}
    </main>
    </>
  )
 
  return content
}

export default ProductList