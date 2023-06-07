import useCart from "../hooks/useCart"
import { useState } from "react"
import CartLineItem from "./CartLineItem"

type PropsType = {
  onBackToProducts: () => {}
}

function Cart({onBackToProducts}: PropsType) {

  const [confirm, setComfirm] = useState<boolean>(false)
  const {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart} = useCart();

  const onSubmitOrder = () => {
    dispatch({type: REDUCER_ACTIONS.SUBMIT})
    setComfirm(true)
  }

  const pageContent = confirm
  ?<div className="after-sbmt-container"> 
    <h2>Спасибо за заказ!</h2>
    <button onClick={onBackToProducts}>Вернуться к списку товаров</button>
  </div>
  : <>
  <ul className="cart">
    {cart.map(item => {
      return (
        <CartLineItem
        key={item.id}
        item={item}
        dispatch={dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
        />
      )
    })}
  </ul>
  <div className="cart__totals"
  children={
    totalItems !==0 ?
    <>
    <p>Всего товаров в корзине: {totalItems}</p>
    <p>Сумма товаров в корзине: {totalPrice}</p>
    <button className="cart__submit-btn" 
    disabled={!totalItems}
    onClick={onSubmitOrder}
    >
    Подтвердить заказ
    </button> 
    </>
    : <div className="back-to-products-container"> 
        <h2>Корзина пуста</h2>
        <button onClick={onBackToProducts}>Вернуться к списку товаров</button>
      </div>
  }/>
  </>

  const content = (
    <main className="main">
      {pageContent}
    </main>
  )

  return content
}

export default Cart