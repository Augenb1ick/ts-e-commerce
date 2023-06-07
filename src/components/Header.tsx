import Nav from "./Nav"
import useCart from "../hooks/useCart"
import { Routes, Route, Link } from "react-router-dom";

type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}
function Header({viewCart, setViewCart}: PropsType) {
  const { totalItems, totalPrice} = useCart();

  const links = (
    <Routes>
      <Route
      path="/"
      element={
        <>
        <Link className="header__links"
        to="/about"
        >
        О магазине
        </Link>
        <Link className="header__links"
        to="/">
          Товары
        </Link>
        </>
      }
      />
      <Route
      path="/about"
      element={
        <>
        <Link className="header__links"
        to="/about"
        >
        О магазине
        </Link>
        <Link className="header__links"
        to="/">
          Товары
        </Link>
        </>
      }
      />
    </Routes>
  )

  const content = (
    <header className='header'>
      <div className='header__title-bar'>
        <div className="header-title-container">
          <h1>Интернетный магазин</h1>
          <div>{links}</div>
        </div>
        <div className="header__price-box">
          <p className="">Продуктов в корзине: {totalItems}</p>
          <p className="">На сумму: {totalPrice}</p>
          <Nav totalItems={totalItems} viewCart={viewCart} setViewCart={setViewCart}></Nav>
        </div>
      </div>
      
    </header>
  )
  return content
}

export default Header