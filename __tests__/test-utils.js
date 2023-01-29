import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// Import our reducer
import { userList } from "../src/store/user-list/reducer";
import { usedTheme } from "../src/store/themes/reducer";
import { usedSettings } from "../src/store/settings/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { UserListState } from "../src/store/types"; // to access rest of reducers

const _store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    userList: userList,
    usedTheme: usedTheme,
    usedSettings: usedSettings
  }
})

//custom render that includes redux provider
const render = ( ui, {initialState, store = _store, ...renderOptions} = {}) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
