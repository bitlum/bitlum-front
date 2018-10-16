/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Input, Button } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.div`
  padding: 4em;
`;

export const Submit = styled(Button)`
color:red;
line-height: 2em;
`;

export default Root;
