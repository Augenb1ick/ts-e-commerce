import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "../context/CardProvider";
import { ReducerAction } from "../context/CardProvider";
import { ReducerActionType } from "../context/CardProvider";


type PropsType = {
  item: CartItemType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType
}

function CartLineItem({item, dispatch, REDUCER_ACTIONS}: PropsType) {
  
  const img: string = new URL(`../images/${item.id}.jpg`, import.meta.url).href

  const lineTotal: number = (item.qty * item.price)
  
  const highestQty: number = 20 > item.qty ? 20 : item.qty

  const optionalValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

  const options: ReactElement[] = optionalValues.map(val => {
    return <option key={`opt${val}`} value={val}>{val}</option>
  })

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: {...item, qty: Number(e.target.value)}
    })
  }

  const onRemoveFromCart = () => dispatch({
    type: REDUCER_ACTIONS.REMOVE,
    payload: item
    })

    const content = (
      <li className="cart__item">
        <img src={img} alt={item.name} className="cart__img"/>
        <p className="cart__item-name">{item.name}</p>
        <div className="cart__item-price" aria-label="Стоимость единицы товара">{
      new Intl.NumberFormat('en-US', 
      {style: 'currency', currency: 'USD'})
      .format(item.price)}</div>
      <label htmlFor="itemQty" className="offscreen">
        Количество товара
      </label>
      <select name="itemQty" 
      id="itemQty" 
      className="cart__select"
      value={item.qty}
      aria-label="Количесво товара"
      onChange={onChangeQty}
      >{options}</select>
      <div className="cart__item-subtotal" aria-label="Сумма заказа">
        {new Intl.NumberFormat('en-US', 
      {style: 'currency', currency: 'USD'})
      .format(lineTotal)}
      </div>
      <button 
      className="cart__button"
      aria-label="Удалить из корзины"
      title="Удалить из корзины"
      onClick={onRemoveFromCart}
      >
      ❌
      </button>
      </li>
    )

  return content
}

function areItemsEqual({item: prevItem}:PropsType, {item: nextItem}: PropsType) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType] 
  })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemoizedCartLineItem;