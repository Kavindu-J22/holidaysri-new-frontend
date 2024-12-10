import React, { useState } from 'react';
import './mudashbord.css';
import { FaUser } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";

const MuDashboard = () => {
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  // State for showing/hiding feedback form
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const handleSignout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    alert('Sign Out..!');
    window.location.href = '/';
  };

  // Show feedback form
  const handleShowFeedback = () => {
    setFeedbackVisible(true);
  };

  // Hide feedback form with delay for transition
  const handleCloseFeedback = () => {
    setFeedbackVisible(false);
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = (event) => {
     // Prevent the default form submission
    setFeedbackVisible(false); // Hide the form after submission
    setTimeout(() => {
      alert("Feedback Submitted Successfully!");
    }, 500); // Delay alert to allow the form to hide slowly
  };

   // MODIFIED: Check userRole before redirecting to respective dashboard
   const handleAdvertiserDashboard = () => {
    if (userRole === 'agent') {
      navigate('/local-dashboard');
    } else {
      navigate('/access');
    }
  };

  const handleAgentDashboard = () => {
    if (userRole === 'seller') {
      navigate('/foreign-dashboard');
    } else {
      navigate('/access');
    }
  };

  const handleGuiderDashboard = () => {
    if (userRole === 'guide') {
      navigate('/Guider-Dashboard');
    } else {
      navigate('/access');
    }
  };

  const handlePartnerDashboard = () => {
    if (userRole === 'partner') {
      navigate('/Partner-Dashboard');
    } else {
      navigate('/access');
    }
  };

  return (
    <div className="holiday-feature-page">
      {/* Feedback Form */}
      <div className={`feedback ${feedbackVisible ? 'visible' : ''}`}>
        <div className="rehmanuclosepopup" onClick={handleCloseFeedback}>
          <IoMdCloseCircle />
        </div>
        <div className="form-container-feed">
        <h2>Help Us To Improve.!</h2>
          <form action="https://formspree.io/f/mwkjqolj" method="POST" className="contact-form" onSubmit={handleFeedbackSubmit}>
            <div className="form-name-feed">
              <input type="text" name="First Name" placeholder="First Name" required />
              <input type="text" name="Last Name" placeholder="Last Name" required />
            </div>
            <input type="email" name="Email Address" placeholder="Your Email Address" required />
            <textarea name="Message" rows="7" placeholder="Type Your Problem Or Feedback here.." required></textarea>
            <button type="submit" className="contact-btn">Send Message</button>
          </form>
        </div>
      </div>
      
      {/* Header Section */}
      <div className="holiday-navbar">
        <h1>Welcome to HolidaySri..!</h1>
        <p className='hol-nav-p'>Your Gateway to Exotic Travel Destinations and Tailored Holiday Experiences.</p>

        {userRole!='seller' && <>
          <div className='accidinty'>
         <p> <FaUser /> {userEmail} (<div className='greendot'></div> {userRole} )</p>
        </div>
        </>}
        {userRole==='seller' && <>
          <div className='accidinty'>
         <p> <FaUser /> {userEmail} (<div className='greendot'></div> Advertiser )</p>
        </div>
        </>}

      
      </div>

      {/* About the Website */}
      <section className="holiday-about-section">
        <h2>Discover Our Unique Services</h2>
        <p>At HolidaySri, we specialize in creating unforgettable journeys. Whether you're seeking a relaxing beach escape, a thrilling adventure, or a cultural city exploration, we have something for everyone. Here's an overview of the exclusive services and features we provide:</p>
      <a href='/' className='bbtbmbtn'><MdHome /> Back To Home</a>
      </section>

      {/* Features Section */}
      <section className="holiday-services-section">
        <div className="holiday-feature-item">
          <h3>Diverse Holiday Packages</h3>
          <p>Our carefully curated holiday packages cater to all types of travelers. Whether you're planning a family vacation, a romantic getaway, or an adventure-filled trip, we offer a variety of packages that suit every budget and preference. Choose from all-inclusive resorts, guided tours, or self-exploration options. Experience the world the way you want!</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/all-packages')}>Learn More</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Explore Stunning Destinations</h3>
          <p>We bring the world closer to you by showcasing a range of breathtaking destinations across the globe. From pristine beaches and majestic mountains to vibrant cities and historic landmarks, our platform helps you find the perfect spot for your next adventure. Every destination includes travel tips, must-see attractions, and recommended activities for an immersive experience.</p>
          <div className='holiday-feature-item-btnbox'>
            <button className='holiday-feature-item-btn' onClick={() => navigate('/all-locations')}>Discover Destinations</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Seamless Online Booking System</h3>
          <p>Our user-friendly booking system allows you to book your dream vacation effortlessly. Browse through available dates, compare prices, and reserve your spot instantly. With multiple payment options, including credit cards, bank transfers, and digital wallets, planning your trip has never been easier. You can even set up flexible payment plans to fit your budget.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/allhotels')}>Learn About Booking</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Post Your Advertisement</h3>
          <p>Reach thousands of potential customers by posting your advertisement on our platform. Showcase your products or services to a wide audience and grow your business effortlessly. It's the perfect opportunity to make your brand stand out in a competitive market.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/foreign-dashboard')}>Post Your Ad</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Rent A Vehicle</h3>
          <p>Travel in comfort and style by renting a vehicle through our platform. Whether you need a car for a road trip or a bike for a quick commute, we have a wide selection of vehicles to suit your needs. Enjoy convenience and flexibility on your journey.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/all-vehicles')}>Rent A Vehicle</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Get Your Promo Code</h3>
          <p>Unlock amazing discounts and special offers with our exclusive promo codes! Save on your next adventure, whether it's booking a hotel, renting a car, or enjoying a local experience. Don't miss out on the best deals for your travels.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/local-dashboard')}>Get Your Promo Code</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Join a Live Ride</h3>
          <p>Experience the thrill of traveling in real time with our live rides. Whether it's a scenic tour or a cultural exploration, hop on board and enjoy the ride! Interact with locals, share the excitement, and discover new places like never before.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/newliveride')}>Join a Live Ride</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Find A Travel Partner</h3>
          <p>Looking for a companion to share your next adventure? Our platform helps you connect with like-minded travelers who share your interests. Whether it's a group trip or a solo journey, finding the perfect travel partner has never been easier.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/all-partners')}>Find A Travel Partner</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Find a Travel Guide</h3>
          <p>Discover the hidden gems of any destination with a knowledgeable travel guide by your side. Our platform connects you with professional guides who can provide insider tips, historical insights, and personalized itineraries for a unique travel experience.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/all-tourguides')}>Find a Travel Guide</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Discover Perfect Foods, Gifts & Souvenirs</h3>
          <p>Bring home more than memories with our curated selection of local foods, unique gifts, and meaningful souvenirs. From artisanal crafts to delicious local delicacies, find the perfect items to celebrate your travels or share with loved ones.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/all-marcketplace')}>Discover Now</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Exclusive Offers & Promotions</h3>
          <p>Save big with our exclusive seasonal promotions, early-bird discounts, and last-minute deals! We offer special packages and discounts throughout the year for popular destinations. Sign up for our newsletter to stay informed about the latest offers and travel inspiration directly in your inbox.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => alert('No offers available at the moment. Please check back later or stay tuned for upcoming opportunities!')}>Check Offers</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Become a Elite User</h3>
          <p>Unlock exclusive features by registering on our platform. Advertise your hotel, package, vehicle, live ride, and more with Unlock our Advertiser Dashboard. Become an agent to access promo codes and unlock the Agent Dashboard. If you're a travel enthusiast, register as a guide or partner to connect with travelers and share your expertise.</p>
          <div className='holiday-feature-item-btnbox'>
          <button className='holiday-feature-item-btn' onClick={() => navigate('/register')}>Register Now</button>
          </div>
        </div>

        <div className="holiday-feature-item">
          <h3>Help Desk And Your Feedback - Help Us Improve</h3>
          <p>Your experience matters to us! Share your thoughts and suggestions to help us enhance our platform for your future travels. We're committed to continuously improving our services to meet your needs and expectations.</p>
          <div className="holiday-feature-item-btnbox">
            <button className="holiday-feature-item-btn" onClick={handleShowFeedback}>Give Feedback</button>
          </div>
        </div>

      </section>

      {/* Call to Action */}
      <section className="holiday-cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Sign up today to unlock the best deals and start planning your next unforgettable adventure with HolidaySri. From luxury vacations to budget-friendly getaways, your perfect trip is just a click away.</p>
        <div className='mudhbftbtns'>
        <a onClick={() => navigate('/')}>Explore Features</a>
        <a onClick={handleAgentDashboard}>Advertiser Dashboard</a> {/* MODIFIED */}
        <a onClick={handleAdvertiserDashboard}>Agent Dashboard ( promo Code )</a> {/* MODIFIED */}
        <a onClick={handleGuiderDashboard}>Guider Dashboard </a>
        <a onClick={handlePartnerDashboard}>Travel Partner Dashboard </a>
        </div>
        <a className='mudhbftbtnssignout' onClick={handleSignout}><RiLogoutBoxLine /> Sign Out</a>
      </section>

      {/* Footer */}
      <footer className="holiday-footer">
        <p>&copy; 2024 HolidaySri. All rights reserved.</p>
        <ul className="holiday-footer-links">
          <li><a href="/privecy-policy">Privacy Policy</a></li>
          <li><a href="/terms-and-conditon">Terms of Service</a></li>
          <li><a href="/refund-policy">Refund Policy</a></li>
        </ul>
      </footer>

    </div>
  );
};

export default MuDashboard;
