import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';

type Props = {
  data: {
    key: string;
    password: string;
    callbackUrl: string;
    returnUrl: string;
    gate: string;
    info: string;
    email: string;
    phone: string;
    amount: number;
    orderId: string;
  } | null;
};

const AlifPayAutoSubmit: React.FC<Props> = ({ data }) => {
  useEffect(() => {
    if (!data) return;

    const orderId = data.orderId;
    const amount = parseFloat(String(data.amount)).toFixed(2);

    // Step 1: Generate token
    const tkn = data.key + orderId + amount + data.callbackUrl;
    const hashedPassword = CryptoJS.HmacSHA256(data.password, data.key).toString(CryptoJS.enc.Hex);
    const token = CryptoJS.HmacSHA256(tkn, hashedPassword).toString(CryptoJS.enc.Hex);

    // Step 2: Build hidden form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://web.alif.tj';

    const fields: Record<string, string> = {
      key: data.key,
      token,
      callbackUrl: data.callbackUrl,
      returnUrl: data.returnUrl,
      amount,
      orderId,
      gate: data.gate,
      info: data.info,
      email: data.email,
      phone: data.phone,
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }, [data]);

  return null;
};

export default AlifPayAutoSubmit;
