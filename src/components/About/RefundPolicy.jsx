import React from "react";
import "./About.css";
import img1 from "../../assets/Hsllogo.png";
import Nav from "../../pages/Nav/Nav";
import Footer from "../hotel/footer/Footer";
import Grid from '@mui/material/Grid';

const RefundPolicy = () => {
  return (
    <>
      <Nav />
      <Grid sx={{marginTop:{lg:'8px',xs:'16px'}}}></Grid>
      <div className="about-us-container">
        <div className="about-us-header">
          <h2>
            Refund <span>Policy</span>
          </h2>
          <p>Refund Policy for Holidaysri Pvt Ltd</p>
        </div>

        <div className="main-abt-Content">
          <div className="about-us-content">
            <p>
              Thank you for booking with Holidaysri Pvt Ltd. Your satisfaction
              is our top priority, and we aim to provide you with an exceptional
              travel experience. If you need to cancel or make changes to your
              booking, our Refund Policy below outlines the steps and
              conditions.
            </p>
            <p>
              <b>Cancellation and Refunds</b>
            </p>
            <p>Tours and Packages:</p>
            <p>
              1. Cancellation by Customer:
              <br></br>• 30 Days or More Before Departure: Full refund minus a
              [10% administration fee].
              <br></br>• 15 to 29 Days Before Departure: 50% refund of the total
              booking amount.
              <br></br>• 14 Days or Less Before Departure: No refund.<br></br>
              <br></br>
              2. Cancellation by Holidaysri:
              <br></br>• In rare cases where we must cancel a tour or service
              due to unforeseen circumstances, you will receive a full refund or
              the option to reschedule your tour.
              <br></br>
              <br></br>3. Refund Processing:<br></br>• Once we receive your
              cancellation request, we will process your refund within [7-10]
              business days. The refunded amount will be credited back to your
              original method of payment. Please note that your bank or payment
              provider may take additional time to reflect the refund in your
              account.
            </p>

            <p>Special Considerations</p>
            <p>
              1. Non-Refundable Items:
              <br></br>• Certain services and items are non-refundable once
              booked or purchased. These include:
              <br></br> - Flight tickets and related fees
              <br></br> - Personalized or custom itineraries
              <br></br> - Non refundable hotel reservations
              <br></br> - Event tickets
              <br></br>
              <br></br>
              2. Partially Used Services:
              <br></br>• If you have used part of the service or tour, we will
              only refund the unused portion, provided that the conditions for
              partial refunds are met and detailed in the service terms.
              <br></br>
              <br></br>
              <b>Changes and Exchanges</b>
              <br></br> <br></br>1. Modifying Your Booking:
              <br></br>• If you need to change your tour dates or make other
              modifications to your booking, please contact us at least [30]
              days before the scheduled departure. Changes are subject to
              availability and may incur additional fees.
              <br></br> <br></br>
              2. Exchanging Services:
              <br></br>• You may exchange your tour or service for another of
              equal or greater value (subject to additional payment) if the
              request is made at least [30] days before the original departure
              date.
              <br></br> <br></br>
              <b>Damaged or Defective Services</b>
              <br></br> <br></br>1.	Service Issues:
              <br></br>• If you encounter any problems or issues with your tour or service, please contact us immediately. We will work to resolve the issue, which may include a replacement service or a refund, depending on availability and the nature of the issue.
              <br></br> <br></br>

              <b>Return Shipping for Physical Products</b>
              <br></br> <br></br>1.	Returning Merchandise:
              <br></br>• For physical items such as travel kits or merchandise purchased from our website, you are responsible for the return shipping costs unless the item is defective or the wrong item was shipped. In such cases, we will provide a prepaid shipping label.
              <br></br> <br></br>
              2. Condition of Returned Items:
              <br></br>• To be eligible for a refund, returned items must be unused, in their original packaging, and in the same condition as received.

              <br></br> <br></br>
              <b>Refund and Exchange Processing Time</b>
              <br></br> <br></br>1.	Processing Time:
              <br></br>• Refunds and exchanges will be processed within [7-10] business days after we receive and verify your request or returned item. The time taken for the refund to appear in your account will depend on your payment provider.
              <br></br> <br></br>
            
            </p>
            <p>
              <b>Contact Us</b>
            </p>
            <p>
            If you have any questions or concerns about our Refund Policy, please contact our customer support team. We are here to assist you and ensure that your experience with Holidaysri is smooth and enjoyable.
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
          </div>
          <Grid sx={{display:{lg:'block',xs:'none'}}}>
          <img src={img1} alt="About Us" />

          </Grid>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RefundPolicy;
