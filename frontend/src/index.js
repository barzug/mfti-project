import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from "redux";
import {connect, Provider} from 'react-redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// import {createStore} from "redux";
//
// const initialState = {
//   count: 0,
// };
//
// function reducer(state = initialState, action) {
//   console.log('action, state > ',action, state);
//
//   switch (action.type) {
//     case 'ADD':
//       return {...state, count: state.count + action.payload};
//
//     default:
//       return state;
//   }
// }
//
// const store = createStore(reducer);
//
// const addOne = {
//   type: 'ADD',
//   payload: 1
// };
//
// console.log('store.getState()', store.getState());
//
// store.dispatch(addOne);
//
// console.log('store.getState()', store.getState());
//
// store.dispatch(addOne);
//
// console.log('store.getState()', store.getState());
