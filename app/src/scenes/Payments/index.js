/**
 * Data fetching and final component export
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import { withNamespaces } from 'react-i18next';

import view from './view';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

class Wrapper extends React.Component {
  componentDidMount() {
    const { payments, accounts } = this.props;

    accounts.get.run();    
    payments.get.run();

    this.polling = setInterval(() => {
      payments.get.run();
      accounts.get.run();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.polling);
  }

  render() {
    return React.createElement(observer(view), this.props);
  }
}

Wrapper.propTypes = {
  // payments: PropTypes.observableObject.isRequired,
};

export default withNamespaces()(inject('payments', 'accounts')(Wrapper));
