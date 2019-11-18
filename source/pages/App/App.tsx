import normalize from 'styled-normalize';
import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from '~/components/Header/Header';
import PriceStore from '~/stores/PriceStore';
import theme from '~/theme.json';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

const stores = { PriceStore };

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <ThemeProvider theme={theme.dark}>
          <GlobalStyle />
          <Header />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
