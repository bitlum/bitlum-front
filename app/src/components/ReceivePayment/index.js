import { observer, inject } from 'mobx-react';

import view from './view';

export default inject('payments')(observer(view));
