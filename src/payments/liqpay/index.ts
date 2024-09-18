import axios from 'axios';
import { getEncodedBase64Data, getUtcFormatDate, stringToSignature } from './utils';
import { calcExpireDate } from 'src/utils/calc-expire-date';

const API_URL = process.env.API_URL;
const LIQPAY_API_URL = process.env.LIQPAY_API_URL;
const LIQPAY_API_PUBLIC_KEY = process.env.LIQPAY_API_PUBLIC_KEY;
const LIQPAY_API_PRIVATE_KEY = process.env.LIQPAY_API_PRIVATE_KEY;

export const getPaymentUrl = async (
  paymentId: string,
  amount: number
): Promise<string | null> => {
  const expiresIn = 1000 * 60 * 5;
  const expiredDate = getUtcFormatDate(calcExpireDate(expiresIn));

  const liqpayData = {
    version: 3,
    public_key: LIQPAY_API_PUBLIC_KEY,
    private_key: LIQPAY_API_PRIVATE_KEY,
    language: 'en',
    action: 'pay',
    amount: amount,
    currency: 'UAH',
    description: `CinemaHub | Premium subscribtion`,
    order_id: paymentId,
    expired_date: expiredDate,
    server_url: `${API_URL}/payments/status`,
    result_url: `${API_URL}/payments/status`,
  };

  const liqpayDataEncoded = getEncodedBase64Data(liqpayData);
  const signature = stringToSignature(
    `${LIQPAY_API_PRIVATE_KEY}${liqpayDataEncoded}${LIQPAY_API_PRIVATE_KEY}`
  );

  const { request } = await axios.post(
    `${LIQPAY_API_URL}/3/checkout`,
    {
      data: liqpayDataEncoded,
      signature,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return (request.res.responseUrl as string) || null;
};
