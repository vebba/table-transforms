import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import Root from './components/layout/Root'
import Header from './components/layout/Header'
import IndexPage from './pages/index'
import TransformsPage from './pages/transforms'

const Routes: React.SFC = () => (
  <Root>
    <Header title="Glencore Test" />
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route path="/transforms" component={TransformsPage} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  </Root>
)

export default Routes
