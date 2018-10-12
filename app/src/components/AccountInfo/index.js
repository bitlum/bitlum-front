import React from 'react';
import { observer, inject } from 'mobx-react';

import view from './view';

class Wrapper extends React.Component {
  componentDidMount() {
    const { accounts } = this.props;
    accounts.get.run();
    setInterval(() => {
      accounts.get.run();
    }, 5000);
  }

  render() {
    return React.createElement(observer(view), this.props);
  }
}

export default inject('accounts')(observer(Wrapper));
