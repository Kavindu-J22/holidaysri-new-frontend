// PayPalButton.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ onSuccess, onError }) => {

  // Retrieve the authToken from localStorage
  const Price = localStorage.getItem("Price");
  console.log(Price);

  return (
    <PayPalScriptProvider options={{ 'client-id': 'AZk6OXLs85DRfEodVlN7NzudePJH8zUdReaJ4Fqdw6VZDWx_68AlegupnDf2wZy1Dku7eMWPb9C7woSR' }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: Price || '1.00', 
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function(details) {
            console.log('Transaction completed by ' + details.payer.name.given_name);
            onSuccess(); // You can trigger any success actions here
          });
        }}
        onError={(err) => {
          console.error('Error:', err);
          onError(); // You can trigger any error handling actions here
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
