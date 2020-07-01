import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import initState from '../lib/init-state'
import reducer from '../lib/reducer'

export const AppDispatchContext = createContext((dispatch:any) => { dispatch =
dispatch })
export const AppStateContext = createContext(initState)

function AppStateProvider(props:any) {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                {props.children}
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    )
}

AppStateProvider.propTypes = {
    children: PropTypes.any.isRequired
}

export default AppStateProvider
