import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router';
import { observer } from 'mobx-react';

import view from './view';

export default withNamespaces()(withRouter(observer(view)));
