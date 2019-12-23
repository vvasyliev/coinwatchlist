import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LeaderBoard from '~/pages/LeaderBoard/LeaderBoard';

const Routes = () => (
  <Switch>
    <Route exact path='/' render={() => <LeaderBoard />} />
  </Switch>
);

export default Routes;
