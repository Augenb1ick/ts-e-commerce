import { useState } from 'react';
import CartLineItem from './CartLineItem';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { submitCart } from '../store/cartSlice';

type PropsType = {
  onBackToProducts: () => void;
};

function Cart({ onBackToProducts }: PropsType) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.list);
  const totalItems = cart.reduce((s, i) => (s = s + i.qty), 0);
  const totalPrice = cart.reduce((s, i) => (s = s + i.price), 0);

  const [confirm, setComfirm] = useState<boolean>(false);

  const onSubmitOrder = () => {
    dispatch(submitCart());
    setComfirm(true);
  };

  const pageContent = confirm ? (
    <div className='after-sbmt-container'>
      <h2>Спасибо за заказ!</h2>
      <button onClick={onBackToProducts}>Вернуться к списку товаров</button>
    </div>
  ) : (
    <>
      <ul className='cart'>
        {cart.map((item) => {
          return <CartLineItem key={item.id} item={item} />;
        })}
      </ul>
      <div
        className='cart__totals'
        children={
          totalItems !== 0 ? (
            <>
              <p>Всего товаров в корзине: {totalItems}</p>
              <p>Сумма товаров в корзине: {totalPrice}</p>
              <button
                className='cart__submit-btn'
                disabled={!totalItems}
                onClick={onSubmitOrder}
              >
                Подтвердить заказ
              </button>
            </>
          ) : (
            <div className='back-to-products-container'>
              <h2>Корзина пуста</h2>
              <button onClick={onBackToProducts}>
                Вернуться к списку товаров
              </button>
            </div>
          )
        }
      />
    </>
  );

  const content = <main className='main'>{pageContent}</main>;

  return content;
}

export default Cart;
