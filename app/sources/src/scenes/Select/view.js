/**
 * Receive scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, Header, SelectReceiveAsset, P, BackButton, Support, Message, Span, Maintenance } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Select = ({ payments, info, t }) => (
  <Root loading={payments.receive.loading}>
    <Header>
      <BackButton />
      <P>Receive</P>
      <Support className="openIntercom" />
    </Header>
    {payments.receive.error ? (
      <Message type="error">
        {t([`errors.${payments.receive.error.code}`, 'errors.default'], {
          ...payments.receive.error,
        })}
      </Message>
    ) : null}
    {info.get.data && info.get.data.status === 'maintenance' && info.get.data.statusMessage ? (
      <Maintenance>
        <Span>{info.get.data.statusMessage.split('\n')[0]}</Span>
        {info.get.data.statusMessage
          .split('\n')
          .slice(1)
          .join('\n')}
      </Maintenance>
    ) : null}
    <SelectReceiveAsset
      disabled={payments.receive.error || (info.get.data && info.get.data.status === 'maintenance')}
    />
  </Root>
);

export default Select;
