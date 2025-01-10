import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HSCPayment = () => {
  const { state } = useLocation();
  const { Currency, calculatedHSCAmount, Title, item, UsedPromocode } = state;
  const [userCurrentHsc, setUserCurrentHsc] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    axios
      .get(`http://localhost:8000/coin/coins/${userEmail}`)
      .then((response) => {
        setUserCurrentHsc(response.data.coins); // Assuming response.data.amount contains the HSC balance
      })
      .catch((error) => {
        console.error('Error fetching HSC balance:', error);
      });
  }, []);

  const handlePayNow = () => {
    if (userCurrentHsc === 0 || userCurrentHsc < calculatedHSCAmount) {
      // Show insufficient balance popup
      alert(`Insufficient HSC Balance: ${userCurrentHsc} ${Currency}. You need ${calculatedHSCAmount} ${Currency}. Please recharge to continue.`);
    } else {
      setLoading(true);
      const userEmail = localStorage.getItem('userEmail');
      const newBalance = userCurrentHsc - calculatedHSCAmount;
      console.log(userCurrentHsc);
      console.log(calculatedHSCAmount);
      console.log(newBalance);
  
      axios
        .put(`http://localhost:8000/coin/updateCoins/${userEmail}`, {
          coins: newBalance, // Correct field as per controller
        })
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            alert(`Congratulations! Payment Successful.\nPaid Amount: ${calculatedHSCAmount} ${Currency}\nCurrent HSC Balance: ${newBalance} ${Currency}`);
            navigate('/dashboardAgentPage');
          } else {
            alert('Error: ' + response.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error updating HSC balance:', error);
          alert('An error occurred while processing your payment. Please try again later.');
        });
    }
  };
  

  const handleRecharge = () => {
    navigate('/getHSCpage');
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div style={{ marginTop: '70px' }}>
      <h1>Payment With HSC</h1>
      <p>Your Current HSC Amount: {userCurrentHsc} {Currency}</p>
      <h2>{Title}</h2>
      <p>Item: {Title} - {item}</p>
      <p>Payable Amount: {calculatedHSCAmount} {Currency}</p>
      <button onClick={handlePayNow} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      {loading && <div>Loading...</div>}
      
      {userCurrentHsc === 0 || userCurrentHsc < calculatedHSCAmount ? (
        <div className="popup">
          <p>Insufficient HSC Balance: {userCurrentHsc} {Currency}. You need {calculatedHSCAmount} {Currency}.</p>
          <p>Please recharge to continue with HSC.</p>
          <button onClick={handleRecharge}>Get More HSC Now</button>
          <button onClick={handleBack}>Go Back To Checkout Page</button>
        </div>
      ) : null}
    </div>
  );
};

export default HSCPayment;
