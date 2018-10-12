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

import Theme from 'theme';

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
  <div className="App">
    <Theme />
    <header className="App-header">
      <NavLink to="/" data-net={getNet() !== 'mainnet' ? getNet().toUpperCase() : ''}>
        {/* <ProductLogo className="logo" /> */}
      </NavLink>
    </header>
    <section>
      <Route exact path="/" component={Home} />
    </section>
    {process.env.NODE_ENV === 'development' ? <MobxDevTools /> : null}
  </div>
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

// registerServiceWorker();
