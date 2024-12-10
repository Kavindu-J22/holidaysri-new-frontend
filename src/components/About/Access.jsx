import React, { useEffect, useState } from 'react';
import './Access.css'; 
import { IoMdHome } from "react-icons/io";

const Unauthorized = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [subRole, setSubRole] = useState('');

  useEffect(() => {
    // Fetch user data from localStorage
    const email = localStorage.getItem('userEmail') || '';
    const role = localStorage.getItem('userRole') || '';
    const subRole = localStorage.getItem('subRole') || '';

    setUserEmail(email);
    setUserRole(role);
    setSubRole(subRole);

    // Redirect to '/' when the user clicks the back button
    const handlePopState = () => {
      window.location.href = '/'; // Redirects to the homepage
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const getRoleMessage = () => {
    if (userRole === 'agent') {
      return subRole ? `Currently, you are logged in as an <strong>agent (${subRole})</strong>` : 'Currently, you are logged in as an <strong>agent</strong> With Us.!';
    }
    if (userRole) {
      return `Currently, you are logged in as a <strong>${userRole}</strong> With Us.!`;
    }
    return 'Currently, you are only a <strong>viewer</strong> on our website.';
  };

  const roleMessage = userEmail
    ? `Hello <strong>${userEmail.split('@')[0]}</strong>, ${getRoleMessage()} It was not authorized to access this page.`
    : `Currently, you are only a <strong>viewer</strong> on our website.`;

  return (
    <div className="forgotPasswordForm">
      <div className="fgpcontent unzer">
        <a href='/' className='unauthmsgpghl'><IoMdHome /></a>
        <h1 className='unzhone'><strong>Unauthorized Access</strong></h1>
        <p dangerouslySetInnerHTML={{ __html: roleMessage }} />
        <p>To access this content and explore more features, please <strong>Sign in</strong> with Us if you have the relevant account</p>
        <a href="/login">
          <button className="login-button">Login</button>
        </a>

        <p>If you don't have a particular account yet <strong>(Advertiser, Guider, Partner, or Agent Account (promo Code))</strong>,</p>
        <p>you can <strong>register</strong> here and continue your journey. <strong>Good luck!</strong></p>
        <a href="/register">
          <button className="login-button">Register</button>
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
