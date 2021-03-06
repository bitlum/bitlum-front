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
  HashRouter as Router,
  Route,
  NavLink,
  withRouter,
  Redirect,
  Switch,
} from 'react-router-dom';
import { I18nextProvider, withNamespaces } from 'react-i18next';

// import registerServiceWorker from 'registerServiceWorker';
import GA from 'utils/GA';
import HA from 'utils/HA';
import LiveChat from 'utils/LiveChat';
import logger from 'utils/logging';

import i18nConfig from 'locales';

import stores from 'stores';

import Login from 'scenes/Login';
import Signup from 'scenes/Signup';
import Restore from 'scenes/Restore';
import Settings from 'scenes/Settings';
import Payments from 'scenes/Payments';
import Payment from 'scenes/Payment';
import Check from 'scenes/Check';
import Confirm from 'scenes/Confirm';
import Receive from 'scenes/Receive';
import Select from 'scenes/Select';

import { Global as GlobalStyles, Root, Footer, Main } from './styles';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

log.debug(`Running on React v${React.version}`);
log.debug('MobX is in strict mode');
configure({
  enforceActions: 'observed',
});

class App extends Component {
  componentWillMount() {
    // eslint-disable-next-line
    const { history, accounts } = this.props;
    GA({ type: 'pageview', page: window.location.pathname });
    const query = window.location.hash.match(/\?(.*)/);
    const updatedAt = localStorage.getItem('updatedAt');
    const updatedEventSentAt = localStorage.getItem('updatedEventSentAt');
    if (updatedEventSentAt <= updatedAt) {
      GA({
        type: 'event',
        category: 'extension',
        action: 'update',
        label: window.chrome.runtime.getManifest().version,
      });
      localStorage.setItem('updatedEventSentAt', new Date().getTime());
    }
    if (!query || (query && !new URLSearchParams(query[0]).get('nopopup'))) {
      window.chrome.tabs.query({ active: true, highlighted: true }, tab => {
        GA({
          type: 'event',
          category: 'lnDomains',
          action: 'openPopup',
          label: (tab[0].url && new URL(tab[0].url).hostname) || 'unknown',
        });
      });
    }

    this.unlisten = history.listen(location => {
      let page = location.pathname;
      if (location.pathname.match(/payments\/(\d+)/)) {
        page = '/payments/details';
      }
      GA({ type: 'pageview', page });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    // eslint-disable-next-line
    const { accounts } = this.props;

    return (
      <Root>
        <GlobalStyles />
        <Main>
          {!accounts.authenticate.data ? (
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/restore" component={Restore} />
              <Redirect to="/login" />
            </Switch>
          ) : (
            [
              <Switch key="Switch">
                <Route path="/payments/receive/check" component={Select} />
                <Route path="/payments/receive/confirm" component={Receive} />
                <Route path="/payments/check" component={Check} />
                <Route path="/payments/confirm" component={Confirm} />
                <Route path="/payments/:puid" component={Payment} />
                <Route path="/payments" component={Payments} />
                <Route path="/settings" component={Settings} />
                <Route
                  path="/signout"
                  render={() => {
                    accounts.authenticate.cleanup('all');
                    return null;
                  }}
                />
                <Redirect to="/payments" />
              </Switch>,
            ]
          )}
        </Main>
      </Root>
    );
  }
}

const AppWrap = withRouter(withNamespaces()(inject('accounts')(observer(App))));

(async () => {
  await stores.init();
  if (process.env.NODE_ENV === 'production') {
    const accountData = stores.accounts.get.data;
    const settingsData = stores.settings.get.data;
    const dataToSend = {
      email: accountData && accountData.email,
      user_id: accountData && accountData.auid,
      signed_up_at: accountData && parseInt(accountData.createdAt / 1000, 10),
      permission_handleLinks_granted:
        settingsData && settingsData.content_script_permissions === 'granted',
      extension_version: window.chrome.runtime.getManifest().version,
    };

    Object.keys((accountData && accountData.balances) || {}).forEach(asset => {
      dataToSend[`${asset}_balance`] = accountData.balances[asset].available;
    });

    // GA({
    //   type: 'set',
    //   category: 'userId',
    //   id: accountData && accountData.auid,
    // });

    LiveChat.boot(dataToSend);
  }
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
})();

if (process.env.NODE_ENV === 'development') {
  window.stores = stores;
  ReactDOM.render(<MobxDevTools />, document.getElementById('dev'));
}

// registerServiceWorker();
