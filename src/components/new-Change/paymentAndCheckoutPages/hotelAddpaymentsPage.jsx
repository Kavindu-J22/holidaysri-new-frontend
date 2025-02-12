import { useLocation, useNavigate } from "react-router-dom";

const HotelAddPaymentsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotelPaymentData = location.state; // Retrieve data

  const handleProceedToPayment = () => {
    if (hotelPaymentData) {
      navigate("/PaymentPage", { state: { ...hotelPaymentData } });
    }
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <h2>Hotel Payment Details</h2>
      {hotelPaymentData ? (
        <div>
          <p><strong>Hotel Name:</strong> {hotelPaymentData.hotelName}</p>
          <p><strong>Advertise Rate:</strong> {hotelPaymentData.hotelAdvertiseRate}</p>
          <p><strong>Total Additional Cost:</strong> {hotelPaymentData.totalAdditionalCost}</p>
          <p><strong>Total Hotel Add Value:</strong> {hotelPaymentData.totalHotelAddValue}</p>
          <p><strong>Open for Agents:</strong> {hotelPaymentData.isOpenForAgents ? "Yes" : "No"}</p>

          <button onClick={handleProceedToPayment}>Proceed to Final Payment</button>
        </div>
      ) : (
        <p>No payment details available.</p>
      )}
    </div>
  );
};

export default HotelAddPaymentsPage;
