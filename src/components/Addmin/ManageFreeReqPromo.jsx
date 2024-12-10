import React, { useEffect, useState } from 'react';

const ViewPromoCodeRequests = () => {
  const [promoRequests, setPromoRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPromoRequests = async () => {
      try {
        const response = await fetch('https://holidaysri-backend.onrender.com/FreeProcodeReq/getAllReqProCode');
        if (response.ok) {
          const data = await response.json();
          setPromoRequests(data.data);
        } else {
          setError('Failed to fetch promo code requests.');
        }
      } catch (err) {
        setError('Error fetching promo code requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchPromoRequests();
  }, []);

  const handleAction = async (id, action, email) => {
    try {
      if (action === 'accept') {
        // Generate promo code
        await fetch('https://holidaysri-backend.onrender.com/promo/generate-Free-promo-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        // Update status to accepted
        await fetch(`https://holidaysri-backend.onrender.com/FreeProcodeReq/promo-code-requests/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestStatus: 'Accepted' }),
        });
      } else if (action === 'reject') {
        // Update status to rejected
        await fetch(`https://holidaysri-backend.onrender.com/FreeProcodeReq/promo-code-requests/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestStatus: 'Rejected' }),
        });
      }

      // Refresh the data
      setPromoRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, requestStatus: action === 'accept' ? 'Accepted' : 'Rejected' } : request
        )
      );
    } catch (err) {
      alert('Failed to perform the action. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' }}>
      <h2>Promo Code Requests</h2>
      {promoRequests.length === 0 ? (
        <p>No promo code requests found.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={headerCellStyle}>#</th>
              <th style={headerCellStyle}>Full Name</th>
              <th style={headerCellStyle}>Email</th>
              <th style={headerCellStyle}>Contact Number</th>
              <th style={headerCellStyle}>Reason</th>
              <th style={headerCellStyle}>Status</th>
              <th style={headerCellStyle}>Date</th>
              <th style={headerCellStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {promoRequests.map((request, index) => (
              <tr key={request._id} style={{ textAlign: 'left' }}>
                <td style={bodyCellStyle}>{index + 1}</td>
                <td style={bodyCellStyle}>{request.fullName}</td>
                <td style={bodyCellStyle}>{request.email}</td>
                <td style={bodyCellStyle}>{request.contactNumber}</td>
                <td style={bodyCellStyle}>{request.reason}</td>
                <td
                  style={{
                    ...bodyCellStyle,
                    color:
                      request.requestStatus === 'Approved'
                        ? 'green'
                        : request.requestStatus === 'Rejected'
                        ? 'red'
                        : 'black',
                  }}
                >
                  {request.requestStatus}
                </td>
                <td style={bodyCellStyle}>{new Date(request.createdAt).toLocaleDateString()}</td>
                <td style={bodyCellStyle}>
                  {request.requestStatus === 'Pending' && (
                    <>
                      <button
                        style={buttonStyle('green')}
                        onClick={() => handleAction(request._id, 'accept', request.email)}
                      >
                        Accept
                      </button>
                      <button
                        style={buttonStyle('red')}
                        onClick={() => handleAction(request._id, 'reject')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {request.requestStatus === 'Accepted' && (
                    <button
                      style={buttonStyle('red')}
                      onClick={() => handleAction(request._id, 'reject')}
                    >
                      Reject
                    </button>
                  )}
                  {request.requestStatus === 'Rejected' && (
                    <button
                      style={buttonStyle('green')}
                      onClick={() => handleAction(request._id, 'accept', request.email)}
                    >
                      Accept
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styling for table cells
const headerCellStyle = {
  borderBottom: '2px solid #ccc',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f9f9f9',
  fontWeight: 'bold',
};

const bodyCellStyle = {
  borderBottom: '1px solid #ccc',
  padding: '10px',
};

const buttonStyle = (color) => ({
  backgroundColor: color,
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  margin: '0 5px',
  cursor: 'pointer',
  borderRadius: '5px',
});

export default ViewPromoCodeRequests;
