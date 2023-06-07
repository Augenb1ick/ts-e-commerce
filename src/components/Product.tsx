import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CardProvider"
import { memo, useState } from 'react'

type PropsType = {
  product: ProductType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean,
}

function Product({product, dispatch, REDUCER_ACTIONS, inCart}: PropsType) {

  const [liked, setLiked] = useState(false);

  function changeLike() {
    setLiked(!liked)
  }
  
  const img: string = new URL(`../images/${product.id}.jpg`, import.meta.url).href
  
  const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, 
    payload: {...product, qty: 1}});

  const onDelFromCart = () => dispatch({type: REDUCER_ACTIONS.REMOVE, 
    payload: {...product, qty: 1}});
  
  const itemInCart = inCart? ' ✔️' : null

  const content = (
    <article className="product">
      
      <img src={img} alt={product.name} className="product__img" />
      <h3 className="product__name">{product.name}</h3>
      <p className="product__price">{
      new Intl.NumberFormat('ru-RU', 
      {style: 'currency', currency: 'RUB'})
      .format(product.price)}{itemInCart}</p>
      <button className="product__button" onClick={onAddToCart}>В корзину</button>
      {itemInCart && <button className="remove-btn" onClick={onDelFromCart}>❌</button>}
      <button onClick={changeLike} className={`product__like-btn ${liked && "product__like-btn_type_active"}`}></button>
    </article>
  )

  return content
}

function areProductsEqual({product: prevProduct, inCart:
  prevInCart}: PropsType, {product: nextProduct, inCart:
  nextInCart}: PropsType) {
    return (
      Object.keys(prevProduct).every(key => {
        return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
      }) && prevInCart === nextInCart
    )
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual) 

export default MemoizedProduct