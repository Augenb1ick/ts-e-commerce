import { useAppDispatch } from '../hooks/reduxHook';
import { ProductType } from '../models/Product';
import { memo } from 'react';
import { addToCart, removeFromCart } from '../store/cartSlice';

type PropsType = {
  product: ProductType;
  inCart: boolean;
};

function Product({ product, inCart }: PropsType) {
  const dispatch = useAppDispatch();

  const img: string = new URL(`../images/${product.id}.jpg`, import.meta.url)
    .href;

  const onAddToCart = () => dispatch(addToCart({ ...product, qty: 1 }));

  const onDelFromCart = () => dispatch(removeFromCart({ ...product, qty: 1 }));

  const itemInCart = inCart ? ' ✔️' : null;

  const content = (
    <article className='product'>
      <img src={img} alt={product.name} className='product__img' />
      <h3 className='product__name'>{product.name}</h3>
      <p className='product__price'>
        {new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        }).format(product.price)}
        {itemInCart}
      </p>
      <button className='product__button' onClick={onAddToCart}>
        В корзину
      </button>
      {itemInCart && (
        <button className='remove-btn' onClick={onDelFromCart}>
          ❌
        </button>
      )}
    </article>
  );

  return content;
}

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
