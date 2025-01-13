import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HSCPayment = () => {
  const { state } = useLocation();
  const { Currency, calculatedHSCAmount, Title, item, UsedPromocode, UsedPromocodeOwner, Earns, DiscountedAmount } = state;
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

  const handlePayNow = async () => {
    if (userCurrentHsc < calculatedHSCAmount) {
      // Show insufficient balance popup
      alert(`Insufficient HSC Balance: ${userCurrentHsc} ${Currency}. You need ${calculatedHSCAmount} ${Currency}. Please recharge to continue.`);
      return;
    }
  
    setLoading(true);
    try {
      const userEmail = localStorage.getItem('userEmail');
      const userId = localStorage.getItem('userId');
      
      // Step 1: Validate user ID and ProfileStatus
      console.log("Validating user ID and profile status...");
      const userResponse = await axios.get(`http://localhost:8000/api/user/findByEmail/${userEmail}`);
      const user = userResponse.data.user;
  
      if (user._id !== userId || user.ProfileStatus === "inactive") {
        alert("User validation failed. Please check your profile status or credentials.");
        console.error("User validation failed. User ID or ProfileStatus mismatch.");
        setLoading(false);
        return;
      }
      console.log("User validation successful.");
  
      // Step 2: Update user subscription and agent status
      console.log("Updating user subscription and agent status...");
      await axios.put(`http://localhost:8000/api/user/updateUsers/${userEmail}`, {
        isSubscribed: "Subscribed",
        isAgent: "True",
      });
      console.log("User subscription and agent status updated successfully.");
      alert("User subscription and agent status updated successfully.");
  
      // Step 3: Handle UsedPromocode updates if applicable
      if (UsedPromocode) {
        console.log("Processing promocode updates...");
  
        // Update Promocode Owner's Earn Record
        try {
          await axios.put("http://localhost:8000/newPromocodes/update-earns", {
            promocode: UsedPromocode,
            earns: Earns,
          });
          console.log("Promocode owner's earnings updated successfully.");
          alert("Promocode owner's earnings updated successfully.");
        } catch (error) {
          console.error("Error updating promocode owner's earnings:", error);
          alert("Error updating promocode owner's earnings.");
        }
  
        // Add Earn record to database
        try {
          await axios.post("http://localhost:8000/earnings/addEarn", {
            buyeremail: userEmail,
            category: "Promo Codes",
            amount: Earns,
            promoCode: UsedPromocode,
            promoCodeOwner: UsedPromocodeOwner,
            item: `${item} - ${Title}`,
          });
          console.log("Earning record added successfully.");
          alert("Earning record added successfully.");
        } catch (error) {
          console.error("Error adding earning record:", error);
          alert("Error adding earning record.");
        }
      }
  
      // Step 4: Add Payment Activity to database
      console.log("Adding payment activity to database...");
      try {
        await axios.post("http://localhost:8000/paymentAct/payment-activities", {
          itemID: Title,
          quantity: 1,
          item: item,
          category: "Promo Codes",
          buyeremail: userEmail,
          amount: calculatedHSCAmount,
          discountedAmount: DiscountedAmount,
          promoCode: UsedPromocode,
          promoCodeOwner: UsedPromocodeOwner,
          forEarns: Earns,
        });
        console.log("Payment activity added successfully.");
        alert("Payment activity added successfully.");
      } catch (error) {
        console.error("Error adding payment activity:", error);
        alert("Error adding payment activity.");
      }
  
      // Step 5: Update coin balance (existing functionality)
      console.log("Updating coin balance...");
      const newBalance = userCurrentHsc - calculatedHSCAmount;
      try {
        const coinResponse = await axios.put(`http://localhost:8000/coin/updateCoins/${userEmail}`, {
          coins: newBalance,
        });
        if (coinResponse.data.success) {
          console.log("Coin balance updated successfully.");
          alert(`HSC balance updated successfully.\nCurrent Balance: ${newBalance} ${Currency}`);
        } else {
          console.error("Error updating coin balance.");
          alert("Error updating coin balance.");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error updating coin balance:", error);
        alert("Error updating coin balance.");
      }
  
      // Step 6: Add new promocode to the system
      console.log("Adding new promocode to the system...");
      try {
        await axios.post("http://localhost:8000/newPromocodes/add", {
          userEmail: userEmail,
          promocodeType: Title,
          promocode: item,
        });
        console.log("New promocode added successfully.");
        alert("New promocode added successfully.");
      } catch (error) {
        console.error("Error adding new promocode:", error);
        alert("Error adding new promocode.");
      }
  
      // Final Success Message
      console.log("Payment process completed successfully.");
      alert(`Congratulations! Payment Successful.\nPaid Amount: ${calculatedHSCAmount} ${Currency}\nCurrent HSC Balance: ${newBalance} ${Currency}`);
      navigate("/dashboardAgentPage");
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("An error occurred while processing your payment. Please try again later.");
    } finally {
      setLoading(false);
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
      <h1>Payment ( HSC ) For - {Title} </h1>
      <p>Your Current HSC Amount: {userCurrentHsc} {Currency}</p>
      <p>Item: {Title} - {item}</p>
      <p>Used Promocode: {UsedPromocode}</p>
      <p>Payable Amount: {calculatedHSCAmount} {Currency} (After deducting {DiscountedAmount} HSC discount Amount )</p>
      <button onClick={handlePayNow} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      {loading && <div>Loading...</div>}
      
      {userCurrentHsc < calculatedHSCAmount ? (
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
