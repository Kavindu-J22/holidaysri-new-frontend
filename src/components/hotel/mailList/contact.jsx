import React from 'react';

function CTASection() {
  return (
    <section className="cta" id="contact" >
      <div className="container">
        <div className="cta-content">
          <p className="section-subtitle">Call To Action</p>
          <h2 className="h2 section-title">Ready For Unforgettable Travel. <span className="keywordcolor">Remember Us!</span></h2>
          <p className="section-text">
          Ready for an unforgettable adventure? Book with Holidaysri and create lasting memories. Your dream journey awaits!          </p>
        </div>
        <a href='https://api.whatsapp.com/send?phone=94765345234'>
        <button className="btn btn-secondary">Contact Us!</button>
        </a>
      </div>
    </section>
  );
}

export default CTASection;
