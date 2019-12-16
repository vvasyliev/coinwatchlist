import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Header from '~/components/Header/Header';
import { IPriceStore } from '~/types/stores';

export interface ILeaderBoardProps {
  PriceStore: IPriceStore;
}

export interface ILeaderBoardState {
  page: number;
}

@inject('PriceStore')
@observer
class LeaderBoard extends Component<ILeaderBoardProps, ILeaderBoardState> {
  readonly state = {
    page: 1
  };

  componentDidMount() {
    const { PriceStore } = this.props;
    PriceStore.getCoins();
  }

  handlePageChange = (nextPage: number): void => this.setState({ page: nextPage });

  render() {
    const { PriceStore } = this.props;
    console.info(PriceStore);

    return (
      <div>
        <Header PriceStore={PriceStore} />
      </div>
    );
  }
}

export default LeaderBoard;
