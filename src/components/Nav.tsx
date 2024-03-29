import React from 'react';

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Nav({ viewCart, setViewCart }: PropsType) {
  const button = viewCart ? (
    <button onClick={() => setViewCart(false)}>Список продуктов</button>
  ) : (
    <button onClick={() => setViewCart(true)}>Корзина</button>
  );

  const content = <nav className='nav'>{button}</nav>;

  return content;
}

export default Nav;
