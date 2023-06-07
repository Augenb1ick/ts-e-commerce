import { configureStore } from "@reduxjs/toolkit";
import { CartItemType } from "../context/CardProvider";
import { CartStateType } from "../context/CardProvider";  


export const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType
}

export const reducer = (state: CartStateType, action: ReducerAction):
CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('action.payload missing in ADD action')
            }
            const { id, name, price } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            const itemExists: CartItemType | undefined = state.cart.find(item => item.id === id)

            const qty = itemExists? itemExists.qty +1 : 1

            return {...state, cart: [...filteredCart, {id, name, price, qty}]}
        }

        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload missing in REMOVE action')
            }

            const { id } = action.payload
            
            const filteredCart: CartItemType[] = state.cart.filter(item => item.id != id)

            return {...state, cart: [...filteredCart]}
        }

        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('action.payload missing in QUANTITY action')
            }

            const { id, qty } = action.payload

            const itemExists: CartItemType | undefined = state.cart.find(item => item.id === id)

            if (!itemExists) {
                throw new Error('Item must exist in order to update quantuty')
            }

            const updatedItem: CartItemType = {...itemExists, qty}

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id != id)

            return {...state, cart: [...filteredCart, updatedItem]}

        }

        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: []}
        }

        default:
        throw new Error('Unidentified reducer action type')
    }
}

export const store = configureStore(reducer)