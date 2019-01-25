import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import VideoPage from './containers/VideoPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.VIDEO} component={VideoPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);