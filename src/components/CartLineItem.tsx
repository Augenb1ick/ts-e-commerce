import { ChangeEvent, ReactElement, memo } from 'react';
import { CartItemType } from '../models/CartItem';
import { changeQuantity, removeFromCart } from '../store/cartSlice';
import { useAppDispatch } from '../hooks/reduxHook';

type PropsType = {
  item: CartItemType;
};

function CartLineItem({ item }: PropsType) {
  const dispatch = useAppDispatch();

  const img: string = new URL(`../images/${item.id}.jpg`, import.meta.url).href;

  const lineTotal: number = item.qty * item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionalValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionalValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeQuantity({ ...item, qty: Number(e.target.value) }));
  };

  const onRemoveFromCart = () => dispatch(removeFromCart(item));

  const content = (
    <li className='cart__item'>
      <img src={img} alt={item.name} className='cart__img' />
      <p className='cart__item-name'>{item.name}</p>
      <div className='cart__item-price' aria-label='Стоимость единицы товара'>
        {new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        }).format(item.price)}
      </div>
      <label htmlFor='itemQty' className='offscreen'>
        Количество товара
      </label>
      <select
        name='itemQty'
        id='itemQty'
        className='cart__select'
        value={item.qty}
        aria-label='Количесво товара'
        onChange={onChangeQty}
      >
        {options}
      </select>
      <div className='cart__item-subtotal' aria-label='Сумма заказа'>
        {new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        }).format(lineTotal)}
      </div>
      <button
        className='cart__button'
        aria-label='Удалить из корзины'
        title='Удалить из корзины'
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );

  return content;
}

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
