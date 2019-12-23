import { Store } from 'redux';
import { Provider } from 'react-redux';
import normalize from 'styled-normalize';
import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import configureStore, { history } from '~/configureStore';
import LeaderBoard from '~/pages/LeaderBoard/LeaderBoard';
import Routes from '~/components/Routes/Routes';
import { IStore } from '~/types/reducers';
import theme from '~/theme.json';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

const store: Store<IStore> = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme.dark}>
          <ConnectedRouter history={history}>
            <Routes />
            <GlobalStyle />
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
