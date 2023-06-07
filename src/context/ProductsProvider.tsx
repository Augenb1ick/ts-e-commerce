import { ReactElement, createContext, useState} from "react"
import { products } from "../data/products"


export type ProductType = {
    id: string,
    name: string,
    price: number,
    category: string
}

const initState: ProductType[] = products

export type UseProductsContextType = {products: ProductType[]}

const initContextState: UseProductsContextType = {products: [] }

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products] = useState<ProductType[]>(initState)
    

    return (
        <ProductsContext.Provider value= {{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;