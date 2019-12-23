import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { History, createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, Store, Middleware, StoreEnhancer } from 'redux';

import createRootReducer from '~/reducers';
import { IStore } from '~/types/reducers';

export const history: History = createBrowserHistory();

const isProduction: boolean = process.env.NODE_ENV === 'production';

const middleware: Middleware[] = [thunk, routerMiddleware(history)];

if (!isProduction) {
  middleware.push(logger);
}

const enchancers: StoreEnhancer[] = [applyMiddleware(...middleware)];

export default function configureStore(initialState?: IStore) {
  const store: Store<IStore> = createStore(createRootReducer(history), initialState, ...enchancers);

  return store;
}
