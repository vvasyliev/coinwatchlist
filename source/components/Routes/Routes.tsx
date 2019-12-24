import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AllCryptos from '~/pages/AllCryptos/AllCryptos';
import LeaderBoard from '~/pages/LeaderBoard/LeaderBoard';
import { LEADER_BOARD_ROUTE, ALL_CRYPTOS_ROUTE } from '~/utils/const';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path={LEADER_BOARD_ROUTE} component={LeaderBoard} />
    <Route exact path={ALL_CRYPTOS_ROUTE} component={AllCryptos} />
    <Redirect to={LEADER_BOARD_ROUTE} />
  </Switch>
);

export default Routes;
