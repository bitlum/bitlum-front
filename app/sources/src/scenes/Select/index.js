/**
 * Data fetching and final component export
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import { observer, inject } from 'mobx-react';
import { withNamespaces } from 'react-i18next';

import view from './view';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

class Wrapper extends React.Component {
  async componentDidMount() {
    const { payments } = this.props;
    payments.receive.run('blockchain', null, 'BTC');
  }

  componentWillUnmount() {
    const { payments } = this.props;
    payments.receive.cleanup();
  }

  render() {
    return React.createElement(observer(view), { ...this.props });
  }
}

Wrapper.propTypes = {};

export default withNamespaces()(inject('payments')(observer(Wrapper)));
