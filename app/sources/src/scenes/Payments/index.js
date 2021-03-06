/**
 * Data fetching and final component export
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { useEffect } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import { withNamespaces } from 'react-i18next';

import view from './view';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Wrapper = props => {
  const { payments, accounts, ui, info } = props;

  useEffect(() => {
    accounts.get.run();
    payments.get.run();
    ui.getLiveChat.run();
    info.get.run();
    info.getSkippedAnnouncements.run();

    const polling = setInterval(() => {
      payments.get.run();
      accounts.get.run();
      info.get.run();
    }, 3000);

    return () => {
      clearInterval(polling);
    };
  });

  return React.createElement(observer(view), props);
};

Wrapper.propTypes = {
  // payments: PropTypes.observableObject.isRequired,
};

export default withNamespaces()(inject('payments', 'accounts', 'settings', 'info', 'ui')(Wrapper));
