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
import { Provider } from 'mobx-react';
import MobxDevTools from 'mobx-react-devtools';
import { HashRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';
import { t } from 'i18next';
import { I18nextProvider } from 'react-i18next';

import registerServiceWorker from 'registerServiceWorker';
import GA from 'utils/GA';
import IC from 'utils/IC';
import log from 'utils/logging';
import getNet from 'utils/cryptonetChecker';
import i18nConfig from 'locales';

import stores from 'stores';

import Home from 'scenes/Home';

import { Global, Root, Header, Footer, Nav, Main, Aside } from './styles';

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

const App = () => (
  <Root>
    <Global />
    <Header>Heading and logo here</Header>
    <Aside>
      <Nav>
        <NavLink to="/" data-net={getNet() !== 'mainnet' ? getNet().toUpperCase() : ''}>
          {/* <ProductLogo className="logo" /> */}
        </NavLink>
        <NavLink to="/" data-net={getNet() !== 'mainnet' ? getNet().toUpperCase() : ''}>
          Link
        </NavLink>
        <NavLink to="/" data-net={getNet() !== 'mainnet' ? getNet().toUpperCase() : ''}>
          Link
        </NavLink>
        <NavLink to="/" data-net={getNet() !== 'mainnet' ? getNet().toUpperCase() : ''}>
          Link
        </NavLink>
      </Nav>
    </Aside>
    <Main>
      <Route exact path="/" component={Home} />
    </Main>
  </Root>
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
