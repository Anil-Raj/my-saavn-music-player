import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const store = createStore(rootReducer, applyMiddleware(
    thunk
  ));
console.log(store.getState().data);

export default store;