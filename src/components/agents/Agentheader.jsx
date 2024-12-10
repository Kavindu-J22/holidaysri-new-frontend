import React from 'react';
import AOS from 'aos';
import { useNavigate } from 'react-router-dom';

function AgentHeader() {

  const navigate = useNavigate();

  const handleAgentdbClick = () => {
    const userRole = localStorage.getItem('userRole'); // checking localStorage for userRole
    if (userRole === 'agent') {
      navigate('/local-dashboard'); // redirect to /local-dashboard if userRole is agent
    } else {
      navigate('/access'); // redirect to /access if userRole is neither seller nor agent
    }
  };

  AOS.init({ duration: 1000 });

  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta-content">
          <p className="section-subtitle">Agent Code</p>
          <h2 className="h2 section-title">Get your Local or Foreign <span className="keywordcolor">Agent code</span> Today!</h2>
          <p className="section-text">
          Empower your passion for travel: Get a local or foreign Agent code and explore the world with us!
          </p>
        </div>
        <a onClick={handleAgentdbClick}>
    <button className="btn btn-secondary">Get Agent Code</button>
</a>
      </div>
    </section>
  );
}

export default AgentHeader;