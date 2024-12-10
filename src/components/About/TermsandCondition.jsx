import React from "react";
import "./About.css";
import img1 from "../../assets/Hsllogo.png";
import Nav from "../../pages/Nav/Nav";
import Footer from "../hotel/footer/Footer";
import Grid from '@mui/material/Grid';

const TermsandCondition = () => {
  return (
    <>
      <Nav />
      <Grid sx={{marginTop:{lg:'8px',xs:'16px'}}}></Grid>

      <div className="about-us-container">
        <div className="about-us-header">
          <h2>
            Terms & <span>Conditions </span>
          </h2>
          <p>Terms and Conditions for Holidaysri Pvt Ltd</p>
        </div>

        <div className="main-abt-Content">
          <div className="about-us-content">
            <p>
              Welcome to Holidaysri Pvt Ltd (referred to as "Holidaysri", "we",
              "our", or "us"). These Terms and Conditions outline the rules and
              regulations for using our website and the terms of purchasing our
              travel services. By accessing or using www.holidaysri.com, you
              agree to comply with these terms. Please read them carefully
              before proceeding with any bookings or transactions.
            </p>
            <p>
              <b>Use of the Website</b>
            </p>
            <p>a. Eligibility:</p>
            <p>
              • You must be at least 18 years old to use our website or make
              bookings. By accessing or using our services, you confirm that you
              meet this age requirement.
            </p>
            <p>b. Account Security:</p>
            <p>
              • You are responsible for maintaining the confidentiality of your
              account information, including your username and password. Any
              activity under your account is your responsibility.
            </p>
            <p>c. Information Accuracy:</p>
            <p>
              • You agree to provide accurate and up-to-date information during
              the registration and booking process. This includes personal
              details, payment information, and travel preferences.
            </p>
            <p>d. Prohibited Activities:</p>
            <p>
              • You may not use our website for any unlawful or unauthorized
              purposes. This includes but is not limited to the misuse of our
              services or engaging in activities that could harm our website or
              reputation.
            </p>
            <p>
              <b>Travel Services and Pricing</b>
            </p>
            <p>a. Service Descriptions:</p>
            <p>
              • We strive to provide accurate descriptions, images, and details
              of our travel services and packages. However, we do not guarantee
              the completeness or accuracy of this information. Travel
              itineraries and services are subject to change based on
              availability and conditions.
            </p>
            <p>b. Pricing: </p>
            <p>
              • Prices for tours and services are subject to change without
              notice. Any promotions or discounts are valid for a limited time
              and may have specific terms and conditions.
            </p>
            <p>c. Inclusions and Exclusions: </p>
            <p>
              • Our service descriptions specify what is included in your
              purchase. Additional costs, such as optional activities, personal
              expenses, and travel insurance, are typically not included unless
              stated otherwise.
            </p>
            <p>
              <b>Bookings and Payments</b>
            </p>
            <p>
              a. Booking Confirmation:<br></br>• By placing a booking on our
              website, you make an offer to purchase the selected travel
              services. Your booking is confirmed only when we issue a booking
              confirmation.
            </p>
            <p>
              b. Right to Refuse:<br></br>• We reserve the right to refuse or
              cancel any booking for any reason. This includes but is not
              limited to, availability, pricing errors, or suspected fraudulent
              activity.
            </p>
            <p>
              c. Payment Terms:<br></br>• You agree to provide valid and
              up-to-date payment information and authorize us to charge the
              total booking amount, including applicable taxes and fees, to your
              chosen payment method.
              <br></br>
            </p>
            <p>
              d. Secure Payments:<br></br>• We use trusted third-party payment
              processors to handle your payment information securely. We do not
              store or have access to your full payment details
            </p>
            <p>
              <b>Cancellations, Returns, and Refunds</b>
            </p>
            <p>a. Cancellation Policy:</p>
            <p>
              • Our Refund Policy outlines the conditions and procedures for
              cancelling bookings and obtaining refunds. Please refer to this
              policy for detailed information.
            </p>
            <p>b. Non-Refundable Services:</p>
            <p>
              • Certain services and bookings are non-refundable or subject to
              specific cancellation terms. Please review the service details and
              our Refund Policy carefully before booking.{" "}
            </p>
            <p>
              <b>Shipping and Delivery (For Physical Merchandise)</b>
            </p>
            <p>a. Shipping Information:</p>
            <p>
              • We will make reasonable efforts to ship and deliver any physical
              merchandise purchased from our website in a timely manner.{" "}
            </p>
            <p>b. Delivery Estimates: </p>
            <p>
              • Shipping and delivery times are estimates and may vary depending
              on your location and other factors. Holidaysri is not responsible
              for delays beyond our control.{" "}
            </p>
            <p>
              <b>Intellectual Property</b>
            </p>
            <p>a. Content Ownership:</p>
            <p>
              • All content and materials on our website, including text,
              images, logos, and graphics, are protected by intellectual
              property rights and are the property of Holidaysri or our
              licensors.
            </p>
            <p>b. Usage Restrictions:</p>
            <p>
              • You may not use, reproduce, distribute, or modify any content
              from our website without our prior written consent. Unauthorized
              use of our content is prohibited.
            </p>
            <p>
              <b>Limitation of Liability</b>
            </p>
            <p>a. No Liability for Indirect Damages: </p>
            <p>
              • Holidaysri, its directors, employees, or affiliates will not be
              liable for any direct, indirect, incidental, special, or
              consequential damages arising out of or in connection with your
              use of our website or the purchase and use of our services.{" "}
            </p>
            <p>b. Service Warranties: </p>
            <p>
              • We make no warranties or representations, express or implied,
              regarding the quality, accuracy, or suitability of the travel
              services offered on our website. All services are provided "as
              is".{" "}
            </p>
            <p>
              <b>Amendments and Termination</b>
            </p>
            <p>a. Policy Updates:</p>
            <p>
              • We reserve the right to modify, update, or terminate these Terms
              and Conditions at any time without prior notice. It is your
              responsibility to review these terms periodically for any changes.
            </p>
            <p>b. Termination of Access: </p>
            <p>
              • We may terminate or suspend your access to our website and
              services without prior notice if we believe you have violated
              these Terms and Conditions or engaged in harmful conduct.{" "}
            </p>
            <p>
              <b>Governing Law</b>
            </p>
            <p>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of [Your Jurisdiction]. Any disputes
              arising out of or related to these terms will be resolved in the
              courts of [Your Jurisdiction].
            </p>
            <p>
              <b>Contact Us</b>
            </p>
            <p>
              If you have any questions or concerns regarding these Terms and
              Conditions, please contact us at:
            </p>
            <p>
              <b>Holidaysri Pvt Ltd</b><br></br>
              Email:{" "}
              <a
                style={{ textDecoration: "underline", color: "white" }}
                href="mailto:holidaysri7@gmail.com"
              >
                holidaysri7@gmail.com
              </a><br></br>
              Website:{" "}
              <a
                style={{ textDecoration: "underline", color: "white" }}
                href="https://holidaysri.com/"
              >
                www.holidaysri.com
              </a><br></br>
              Phone: +94 76 534 5234
            </p>
            <p>
              By using our website and services, you acknowledge that you have
              read, understood, and agreed to these Terms and Conditions.
            </p>{" "}
          </div>
          <Grid sx={{display:{lg:'block',xs:'none'}}}>
          <img src={img1} alt="About Us" />

          </Grid>          </div>
      </div>
      <Footer/>
    </>
  );
};

export default TermsandCondition;
