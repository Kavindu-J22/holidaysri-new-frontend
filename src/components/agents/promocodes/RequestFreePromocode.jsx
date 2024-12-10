import React, { useState, useEffect } from 'react';

const RequestFreePromoCode = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');  // New state for Full Name
  const [reason, setReason] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Fetch user email from localStorage
    const storedEmail = localStorage.getItem('userEmail') || 'user@example.com';
    setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert('You must agree to the terms to submit.');
      return;
    }

    // Prepare the data to send
    const formData = {
      email,
      fullName,  // Include Full Name in the data
      reason,
      contactNumber,
      agreed,
    };

    try {
      // Make the POST request to the backend
      const response = await fetch('https://holidaysri-backend.onrender.com/FreeProcodeReq/reqfreeprocode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Response from backend:', result);
        alert('Your request has been submitted successfully!');
      } else {
        console.error('Failed to submit request:', response.statusText);
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error: Unable to send the request.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' }}>
      <h2>Request Free Promo Code</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Email Field */}
        <label>
          User Email:
          <input
            type="email"
            value={email}
            readOnly
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        {/* Full Name Field */}
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Enter your full name"
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        {/* Reason Field */}
        <label>
          Reason for Applying:
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={{ width: '100%', height: '80px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          ></textarea>
        </label>

        {/* Contact Number Field */}
        <label>
          Contact Number:
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            placeholder="Enter your contact number"
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        {/* Agreement Checkbox */}
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          I agree to the terms and conditions.
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestFreePromoCode;
