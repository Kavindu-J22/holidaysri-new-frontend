import React from 'react';
import './About.css';
import img1 from '../../assets/Hsllogo.png'
import Footer from "../../components/hotel/footer/Footer";

const AboutUs = () => {
    return (
        <div>
        <div className="about-us-container">
            <a className='backtohomebtn' href='/'>Back to Home</a>
            <div className="about-us-header">
                <h2>About <span>Us</span></h2>
                <p>Welcome to HolidaySri, your ultimate destination for immersive accommodation booking experiences!</p>
            </div>

            <div className='main-abt-Content'>
                <div className="about-us-content">
                    <p>At HolidaySri, we are dedicated to providing you with a user-friendly platform to explore, compare, and book accommodations seamlessly. Whether you're planning a vacation, a business trip, or a weekend getaway, we've got you covered.</p>
                    <p>What sets us apart is our commitment to innovation and customer satisfaction. We strive to deliver a cutting-edge user interface that ensures a delightful experience for every user.</p>
                    <p>One of our distinctive features is the integration of an agent referral system. We believe in rewarding our loyal users and empowering our agents. Users can enter an agent's referral code to unlock exclusive discounts, while agents receive specific cash incentives.</p>
                    <p>Join us on this exciting journey and let us make your travel dreams a reality!</p>
                </div>
                <img src={img1} alt="About Us" />
            </div> 
        </div>
        <Footer />
        </div>
    );
};

export default AboutUs;
