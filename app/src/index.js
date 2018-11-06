/**
 * App entrypoint
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
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
import { I18nextProvider, withNamespaces } from 'react-i18next';

// import registerServiceWorker from 'registerServiceWorker';
import GA from 'utils/GA';
import LiveChat from 'utils/LiveChat';
import log from 'utils/logging';
import getNet from 'utils/cryptonetChecker';
import i18nConfig from 'locales';

import stores from 'stores';

import Login from 'scenes/Login';
import Signup from 'scenes/Signup';
import Landing from 'scenes/Landing';
import Account from 'scenes/Account';
import Payments from 'scenes/Payments';
import Send from 'scenes/Send';
import Receive from 'scenes/Receive';

import { ReactComponent as CloseIcon } from 'assets/icons/back.svg';

import {
  Global as GlobalStyles,
  Root,
  Header,
  Footer,
  Nav,
  Main,
  Aside,
  AsideToggle,
  Logo,
  AccountSummary,
  BalanceSummary,
  HamburgerIcon,
} from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

log.debug(`Running on React v${React.version}`);
log.debug('MobX is in strict mode');
configure({
  enforceActions: 'observed',
});

LiveChat.boot();

class App extends Component {
  componentWillMount() {
    // eslint-disable-next-line
    const { history } = this.props;
    GA({ type: 'pageview', page: window.location.pathname });
    window.localStorage.setItem(
      'referral',
      new URLSearchParams(window.location.search).get('referral'),
    );
    this.unlisten = history.listen(location => {
      GA({ type: 'pageview', page: location.pathname });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    // eslint-disable-next-line
    const { accounts, ui, t } = this.props;

    return (
      <Root>
        <GlobalStyles />
        <Header>
          <AsideToggle
            onClick={() => {
              ui.toggleAside();
            }}
          >
            {accounts.authenticate.isAuthenticated &&
              (ui.isAsideShown ? <CloseIcon /> : <HamburgerIcon />)}
          </AsideToggle>

          {!accounts.authenticate.isAuthenticated ? (
            <Nav key="Nav">
              <NavLink to="/login">Login</NavLink>
              <NavLink exact to="/">
                {t('nav.signup')}
              </NavLink>
            </Nav>
          ) : (
            <Nav key="Nav">
              <NavLink to="/">
                <Logo />
              </NavLink>
            </Nav>
          )}
        </Header>
        <Aside shown={ui.isAsideShown}>
          {accounts.authenticate.isAuthenticated
            ? [
                <AccountSummary key="AccountSummary" />,
                <Nav key="Nav" column>
                  <NavLink
                    to="/payments"
                    onClick={() => {
                      ui.toggleAside(false);
                    }}
                  >
                    Payments
                  </NavLink>
                  {/* <NavLink
                    to="/account"
                    onClick={() => {
                      ui.toggleAside(false);
                    }}
                  >
                    Account
                  </NavLink> */}
                  <NavLink
                    to="/send"
                    onClick={() => {
                      ui.toggleAside(false);
                    }}
                  >
                    Send
                  </NavLink>
                  <NavLink
                    to="/receive"
                    onClick={() => {
                      ui.toggleAside(false);
                    }}
                  >
                    Receive
                  </NavLink>
                </Nav>,
              ]
            : null}
        </Aside>
        <Main>
          {!accounts.authenticate.isAuthenticated ? (
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Redirect to="/login" />
            </Switch>
          ) : (
            [
              <BalanceSummary key="BalanceSummary" />,
              <Switch key="Switch">
                <Route path="/payments" component={Payments} />
                {/* <Route path="/account" component={Account} /> */}
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
    );
  }
}

const AppWrap = withRouter(withNamespaces()(inject('accounts', 'ui')(observer(App))));

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
  ReactDOM.render(<MobxDevTools />, document.getElementById('dev'));
}

// registerServiceWorker();
