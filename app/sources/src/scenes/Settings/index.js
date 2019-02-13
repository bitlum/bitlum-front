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
import { withRouter } from 'react-router';

import view from './view';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

class Wrapper extends React.Component {
  componentDidMount() {
    const { settings, denominations } = this.props;
    if (settings.get.data) {
      settings.get.run();
    }
    if (denominations.get.data) {
      denominations.get.run();
    }
  }

  render() {
    return React.createElement(observer(view), this.props);
  }
}

Wrapper.propTypes = {};

export default withNamespaces()(inject('settings', 'denominations', 'accounts')(withRouter(Wrapper)));
