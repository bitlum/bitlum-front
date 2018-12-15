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
    const {
      payments,
      match: {
        params: { puid },
      },
    } = this.props;
    payments.getById.run(puid);
  }

  componentWillUnmount() {
    const { payments } = this.props;
    payments.getById.cleanup();
  }

  render() {
    return React.createElement(observer(view), this.props);
  }
}

Wrapper.propTypes = {};

export default withNamespaces()(inject('payments')(withRouter(Wrapper)));
