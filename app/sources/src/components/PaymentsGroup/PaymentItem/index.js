import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router';

import view from './view';

export default withNamespaces()(withRouter(view));
