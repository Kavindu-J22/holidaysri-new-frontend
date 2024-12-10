import React from 'react';
import md5 from 'crypto-js/md5';

const PayHereForm = () => {
  const details = {
    merchantId: '234525',
    returnUrl: 'https://holidaysri.com/subscribe',
    cancelUrl: 'http://localhost:8000/api/auth/registerseller',
    notifyUrl: 'https://holidaysri-backend.onrender.com/vehicle/allPartnerProfiles',
    firstName: 'Holiday',
    lastName: 'Sri',
    email: 'holidaysri7@gmail.com',
    phone: '0710535108',
    address: 'A/66',
    city: 'Colombo',
    country: 'Sri Lanka',
    orderId: '1001',
    items: 'one',
    currency: 'LKR',
    amount: '1000',
    merchantSecret: 'Mzg0NzkxNDMzMDM0OTIxODQyMzA1NDAyNzUzMzMyNDg1NTEwNzY=',
  };

  const generateHash = () => {
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const amountFormatted = parseFloat(amount)
      .toLocaleString('en-us', { minimumFractionDigits: 2 })
      .replaceAll(',', '');
    const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret)
      .toString()
      .toUpperCase();
    return hash;
  };

  const hash = generateHash();

  return (
    <form
      action="https://www.payhere.lk/pay/checkout"
      method="POST"
    >
      <input type="hidden" name="merchant_id" value={merchantId} />
      <input type="hidden" name="return_url" value={returnUrl} />
      <input type="hidden" name="cancel_url" value={cancelUrl} />
      <input type="hidden" name="notify_url" value={notifyUrl} />
      <input type="hidden" name="first_name" value={firstName} />
      <input type="hidden" name="last_name" value={lastName} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="address" value={address} />
      <input type="hidden" name="city" value={city} />
      <input type="hidden" name="country" value={country} />
      <input type="hidden" name="order_id" value={orderId} />
      <input type="hidden" name="items" value={items} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="hash" value={hash} />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PayHereForm;
