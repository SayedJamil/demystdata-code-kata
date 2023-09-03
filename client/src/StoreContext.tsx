import React, {createContext, useReducer} from "react";

export const actions = {
    LOGGED: 'LOGGED',
    SET_BALANCES: 'SET_BALANCES',
}

export type Balance = {
    year: number
    month: number
    profitOrLoss: number
    assetsValue: number
}

type State = {
    isLoggedIn: boolean
    balances: Balance[]
}

type Action = {
    type: string
    payload?: any
}

const initialState: State = {
    isLoggedIn: false,
    balances: []
}

export const StoreContext = createContext<{ state: State, dispatch: React.Dispatch<Action> }>(
    {
        state: initialState,
        dispatch: () => {
        }
    }
)


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case actions.LOGGED:
            return {...state, isLoggedIn: true};
        case actions.SET_BALANCES:
            return {...state, balances: action.payload}
        default:
            throw new Error('reducer action not implemented!')
    }
}

export const StoreProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {props.children}
        </StoreContext.Provider>
    );
}