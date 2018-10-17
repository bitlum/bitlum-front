/**
 * App entrypoint
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';
import MobxDevTools from 'mobx-react-devtools';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
  Redirect,
  Switch,
} from 'react-router-dom';
import { t } from 'i18next';
import { I18nextProvider } from 'react-i18next';

// import registerServiceWorker from 'registerServiceWorker';
import GA from 'utils/GA';
import IC from 'utils/IC';
import log from 'utils/logging';
import getNet from 'utils/cryptonetChecker';
import i18nConfig from 'locales';

import stores from 'stores';

import Auth from 'scenes/Auth';
import Landing from 'scenes/Landing';
import Account from 'scenes/Account';
import Payments from 'scenes/Payments';
import Send from 'scenes/Send';
import Receive from 'scenes/Receive';
import AccountSummary from 'components/AccountSummary';
import BalanceSummary from 'components/BalanceSummary';

import { Global as GlobalStyles, Root, Header, Footer, Nav, Main, Aside } from './styles';

import { ReactComponent as ProductLogo } from 'assets/img/logo/main.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

log.debug(`Running on React v${React.version}`);
log.debug('MobX is in strict mode');
configure({
  enforceActions: 'observed',
});
// IC.boot();

const App = inject('accounts')(
  observer(({ accounts }) => (
    <Root>
      <GlobalStyles />
      <Header>Heading and logo here</Header>
      <Aside>
        {accounts.authenticate.isAuthenticated
          ? [
              <AccountSummary key="AccountSummary" />,
              <Nav key="Nav" column>
                <NavLink to="/payments">Payments</NavLink>
                <NavLink to="/account">Account</NavLink>
                <NavLink to="/send">Send</NavLink>
                <NavLink to="/receive">Receive</NavLink>
              </Nav>,
            ]
          : null}
      </Aside>
      <Main>
        {!accounts.authenticate.isAuthenticated ? (
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/auth" component={Auth} />
            <Redirect to="/auth" />
          </Switch>
        ) : (
          [
            <BalanceSummary key="BalanceSummary" />,
            <Switch key="Switch">
              <Route path="/payments" component={Payments} />
              <Route path="/account" component={Account} />
              <Route path="/send" component={Send} />
              <Route path="/receive" component={Receive} />
              <Route
                path="/signout"
                render={() => {
                  accounts.authenticate.signout();
                  return null;
                }}
              />
              <Redirect to="/payments" />
            </Switch>,
          ]
        )}
      </Main>
      <Footer />
    </Root>
  )),
);

const AppWrap = withRouter(App);

ReactDOM.render(
  <Provider {...stores}>
    <I18nextProvider i18n={i18nConfig}>
      <Router>
        <AppWrap />
      </Router>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development') {
  window.stores = stores;
  ReactDOM.render(
    <Provider {...stores}>
      <I18nextProvider i18n={i18nConfig}>
        <Router>
          <MobxDevTools />
        </Router>
      </I18nextProvider>
    </Provider>,
    document.getElementById('dev'),
  );
}

// registerServiceWorker();
