import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import marketReducer from '~/reducers/market';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    market: marketReducer
  });

export default createRootReducer;
