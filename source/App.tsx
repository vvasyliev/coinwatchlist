import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import normalize from 'styled-normalize';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from '~/theme.json';
import { IStore } from '~/types/reducers';
import Routes from '~/components/Routes/Routes';
import configureStore, { history } from '~/configureStore';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const store: Store<IStore> = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme.dark}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
