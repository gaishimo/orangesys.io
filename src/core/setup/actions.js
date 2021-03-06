import { createAction } from 'redux-act';

export const selectPlan = createAction('select plan');
export const startRegisteringPayment = createAction('start registering payment');
export const stripeTokenGenerationError = createAction('stripe token generation error');
export const registerPayment = createAction('register payment');
export const registerPaymentError = createAction('register payment error');
export const clearMessage = createAction('clear message');
export const getTokenForServerSetup = createAction('get token for server setup');
export const startBuildingServers = createAction('start building servers');
export const keepWaitingForServerBuild = createAction('keep waiting for server build');
