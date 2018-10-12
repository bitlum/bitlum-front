import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';

import view from './view';

class Wrapper extends React.Component {
  componentDidMount() {
    const { payments } = this.props;
    payments.get.run();
    setInterval(() => {
      payments.get.run();
    }, 5000);
  }

  render() {
    return React.createElement(observer(view), this.props);
  }
}

Wrapper.propTypes = {
  // payments: PropTypes.observableObject.isRequired,
};

export default inject('payments', 'accounts')(Wrapper);
