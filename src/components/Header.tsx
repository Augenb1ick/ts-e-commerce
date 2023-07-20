import { useAppSelector } from '../hooks/reduxHook';
import Nav from './Nav';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};
function Header({ viewCart, setViewCart }: PropsType) {
  const location = useLocation();
  const cart = useAppSelector((state) => state.cart.list);
  const totalItems = cart.reduce((s, i) => (s = s + i.qty), 0);
  const totalPrice = cart.reduce((s, i) => (s = s + i.price), 0);

  const links = (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Link className='header__links' to='/about'>
              О магазине
            </Link>
            <Link className='header__links' to='/'>
              Товары
            </Link>
          </>
        }
      />
      <Route
        path='/about'
        element={
          <>
            <Link className='header__links' to='/about'>
              О магазине
            </Link>
            <Link className='header__links' to='/'>
              Товары
            </Link>
          </>
        }
      />
    </Routes>
  );

  const content = (
    <header className='header'>
      <div className='header__title-bar'>
        <div className='header-title-container'>
          <h1>Интернетный магазин</h1>
          <div>{links}</div>
        </div>
        {location.pathname === '/' && (
          <div className='header__price-box'>
            <p className=''>Продуктов в корзине: {totalItems}</p>
            <p className=''>На сумму: {totalPrice}</p>
            <Nav viewCart={viewCart} setViewCart={setViewCart} />
          </div>
        )}
      </div>
    </header>
  );
  return content;
}

export default Header;
