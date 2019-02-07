/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';
import { withLoader, Form, Button, Message } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = withLoader(styled(Form)`
  & ${Button} {
    height: 2.7em;
  }
  & ${Message} {
    margin: 1em 0;
  }
  & input {
    font-size: 0.9em;
  }
  & label {
    left: 1.4em;
  }
`);

export default Root;
