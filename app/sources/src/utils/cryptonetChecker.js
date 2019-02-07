/**
 * Toolkit for checking current net (simnet/testnet/mainnet)
 * where app operates
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const getCurrentNet = () =>
  (window.location.href.includes('simnet')
    ? 'simnet'
    : window.location.href.includes('testnet') ? 'testnet' : 'mainnet');

export default getCurrentNet;
