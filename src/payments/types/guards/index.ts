import type { PaymentData, PaymentFailure, PaymentSuccess } from '..';

export const isPaymentSuccess = (data: PaymentData): data is PaymentSuccess => {
  return data.status === 'success';
};

export const isPaymentFailure = (data: PaymentData): data is PaymentFailure => {
  return data.status !== 'success' && 'err_code' in data;
};
