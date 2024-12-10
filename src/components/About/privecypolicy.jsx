import React from "react";
import "./About.css";
import img1 from "../../assets/Hsllogo.png";
import Nav from "../../pages/Nav/Nav";
import Footer from "../hotel/footer/Footer";
import Grid from '@mui/material/Grid';

const PrivacyPolicy = () => {
  return (
    <>
      <Nav />
      <Grid sx={{marginTop:{lg:'8px',xs:'16px'}}}></Grid>
      <div className="about-us-container">
        <div className="about-us-header">
          <h2>
            Privacy <span>Policy</span>
          </h2>
          <p>Privacy Policy for Holiday Sri</p>
        </div>

        <div className="main-abt-Content">
          <div className="about-us-content">
            <p>
              Last updated: 18th June 2024 At Holidaysri.com Pvt Ltd (referred
              to as "Holidaysri", "we", "our", or "us"), we are committed to
              protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy outlines how we collect, use,
              disclose, and protect your information when you visit our website
              www.holidaysri.com or use our services. By accessing our website
              or using our services, you agree to the terms outlined in this
              Privacy Policy.
            </p>
            <p>
              <b>Information We Collect:</b>
            </p>
            <p>
              When you interact with Holidaysri, we may collect and process the
              following types of information:
            </p>
            <p>Personal Information</p>
            <p>
              • Contact Information: Includes your name, email address, phone
              number, and postal address. We collect this information when you
              book tours, register for an account, or subscribe to our
              newsletters.<br></br>• Payment Information: Includes credit or
              debit card details and billing information. Payment transactions
              are securely processed by our trusted third-party payment
              processors.<br></br>• Booking Information: Details of your travel
              arrangements and preferences, such as tour selections, travel
              dates, and special requirements.
            </p>

            <p>Automatically Collected Information</p>
            <p>
              • Browsing Information: Information about your visits to our
              website, including your IP address, browser type, operating
              system, and pages viewed. This data is collected through cookies
              and similar tracking technologies.<br></br>• Device Information:
              Information about the device you use to access our website,
              including device type, operating system, and mobile network
              information.
            </p>
            <p>
              <b>How We Use Your Information</b>
            </p>
            <p>
              We use the information we collect to: <br></br>• Process and
              Manage Bookings: To facilitate your bookings, manage your
              reservations, and provide you with the services you request.
              <br></br>• Communicate with You: To send booking confirmations,
              updates, customer service responses, and promotional offers that
              may interest you.
              <br></br>• Personalize Your Experience: To customize the content
              and offers presented to you based on your preferences and browsing
              history.
              <br></br>• Improve Our Services: To analyze how our website is
              used, improve our offerings, and enhance user experience.
              <br></br>• Ensure Security: To detect and prevent fraud,
              unauthorized activities, and to protect our website and services.
            </p>

            <p>
              <b>Information Sharing and Disclosure</b>
            </p>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. However, we may share your information in the following
              circumstances:
              <br></br>• Trusted Service Providers: We may share your
              information with third-party service providers who assist us in
              operating our website, processing payments, and delivering
              services. These providers are contractually obligated to protect
              your information and use it solely for the purposes specified by
              us.
              <br></br>• Legal Compliance: We may disclose your information if
              required to do so by law or in response to valid legal processes,
              such as a court order or subpoena.
            </p>
            <p>
              <b>Data Security</b>
            </p>
            <p>
              We employ industry-standard security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. While we strive to use commercially
              acceptable means to protect your information, please be aware that
              no method of transmission over the internet or electronic storage
              is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p>
              <b>Cookies and Tracking Technologies</b>
            </p>
            <p>
              We employ industry-standard security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. While we strive to use commercially
              acceptable means to protect your information, please be aware that
              no method of transmission over the internet or electronic storage
              is 100% secure, and we cannot guarantee absolute security. Our
              website uses cookies and similar tracking technologies to enhance
              your browsing experience, gather analytical data, and provide
              personalized content. You can manage your cookie preferences
              through your browser settings. Please note that disabling cookies
              may limit the functionality of our website.
            </p>
            <p>
              <b>Third-Party Links</b>
            </p>
            <p>
              Our website may contain links to external websites or services
              that are not operated by us. We are not responsible for the
              privacy practices or content of these third-party websites. We
              encourage you to review their privacy policies before providing
              any personal information.
            </p>
            <p>
              <b>Data Retention</b>
            </p>
            <p>
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. Changes
              to this Privacy Policy We may update or modify this Privacy Policy
              from time to time. Any changes will be posted on this page with an
              updated "last updated" date. We encourage you to review this
              Privacy Policy periodically to stay informed about how we collect,
              use, and protect your information.
            </p>
            <p>
              <b>Contact Us</b>
            </p>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or the handling of your personal information,
              please contact us at: Holidaysri.com Pvt Ltd
              <br></br>Email:{" "}
              <a
                style={{ textDecoration: "underline", color: "white" }}
                href="mailto:holidaysri7@gmail.com"
              >
                holidaysri7@gmail.com
              </a>
              <br></br>Website:{" "}
              <a
                style={{ textDecoration: "underline", color: "white" }}
                href="https://holidaysri.com/"
              >
                www.holidaysri.com
              </a>
              <br></br>By using our website, you consent to the terms of this
              Privacy Policy. Please review this Privacy Policy periodically for
              any updates or changes.
            </p>
          </div>
          <Grid sx={{display:{lg:'block',xs:'none'}}}>
          <img src={img1} alt="About Us" />

          </Grid>        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PrivacyPolicy;
