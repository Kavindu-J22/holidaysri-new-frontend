import React, { useEffect, useState } from 'react';
import Hsllogo from '../../assets/Hsllogo.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHotel, FaCar, FaPeopleArrows, FaMoneyBillTransfer} from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import './Adminstyl.css';
import VehicleSections from '../agents/Local Agents/LocalVehicle'
import AddaHotel from '../hotel/AddHotel/AddaHotel'
import Viewpartnrs from "../../pages/partner/Allparnters"
import Alltourguides from "../../pages/tourguide/Alltourguides"
import WholeEvents from "../../pages/events/Whole"
import Allmarcketplace from "../../pages/marcketplace/Allmarcketplace"
import { CiLogout } from "react-icons/ci";


const AdmminPanel = () => {
  const logout = () => {
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("userRole");
    window.location = "/access";
  };

  const handleSignout = () => {
    // Remove userRole and authToken from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    // Redirect to login page or any other page after signout
    window.location.href = '/';
}

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const userRole = localStorage.getItem("userRole");

        if (!authToken || !userRole || userRole !== "admin") {
          logout();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      }
    };

    checkAuthentication();
  }, []);
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [selectedOption, setSelectedOption] = useState('Agents');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebarAdmin">
        <div className='logobox'>
        <a href='/'><img className="logoimg" src={Hsllogo} alt="" /></a>
        </div>
        <button onClick={() => handleOptionSelect('Agents')}><FaHotel />&nbsp; Manage Agents</button>
        <button onClick={() => handleOptionSelect('Hotels')}><FaHotel />&nbsp; Manage Hotels</button>
        <button onClick={() => handleOptionSelect('Vehicle')}><FaCar />&nbsp; Manage Vehicles</button>
        <button onClick={() => handleOptionSelect('Partners')}><FaPeopleArrows />&nbsp; View Partners</button>
        <button onClick={() => handleOptionSelect('Guides')}><MdEventAvailable />&nbsp; Manage Guides</button>
        <button onClick={() => handleOptionSelect('Events')}><MdEventAvailable />&nbsp; Manage Events</button>
        <button onClick={() => handleOptionSelect('Products')}><IoFastFoodSharp />&nbsp; Manage Products</button>
        <button onClick={() => handleOptionSelect('Earns')}><FaMoneyBillTransfer />&nbsp; Manage Earns</button>
        <button onClick={() => handleOptionSelect('Rates')}><FaMoneyBillTransfer />&nbsp; Manage Rates</button>
        <button onClick={handleSignout}><CiLogout />&nbsp;Logout </button>
        
      </div>
        
      <div className='Adminback'>
        <div className='dsbHeader'>
            <h2>Admin Panel</h2>
        </div>

        <div className="main-content">
            {selectedOption === 'Agents' && <AgentSection />}
            {selectedOption === 'Hotels' && <HotelSection />}
            {selectedOption === 'Vehicle' && <VehicleSection />}
            {selectedOption === 'Partners' && <PartnersSection />}
            {selectedOption === 'Guides' && <GuidesSection />}
            {selectedOption === 'Events' && <EventsSection />}
            {selectedOption === 'Products' && <ProductsSection />}
            {selectedOption === 'Earns' && <EarnsSection />}
            {selectedOption === 'Rates' && <RatesSection />}
        </div>
      </div>
    </div>
  );
};


const AgentSection = () => {
  return (
    <div data-aos="zoom-in">
      <h2>Agent Section :</h2>
<section className='v-section'>
      <div className='v-cards'>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>01</h2>
                                
                                <h3>View All Agents</h3>
                                <h5>Add your hotel advertisements here</h5>   
                                <a href='/add-Hotel-admin'>Add</a>
                            </div>
                        </div>

                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>02</h2>
                                
                                <h3>Promo Code Free Requests</h3>
                                <h5>View and Manage hotel advertisements here</h5>   
                                <a href='/manageFreePromoCodeRequests'>View</a>
                                </div>
                        </div>                               
                    </div>

      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const HotelSection = () => {
  return (
    <div data-aos="zoom-in">
      <h2>Hotels Section :</h2>
<section className='v-section'>
      <div className='v-cards'>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>01</h2>
                                
                                <h3>Add Hotels</h3>
                                <h5>Add your hotel advertisements here</h5>   
                                <a href='/add-Hotel-admin'>Add</a>
                            </div>
                        </div>

                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>02</h2>
                                
                                <h3>View and Manage Hotels</h3>
                                <h5>View and Manage hotel advertisements here</h5>   
                                <a href='/allpayments'>View</a>
                                </div>
                        </div>                               
                    </div>

      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const VehicleSection = () => {
  return (
    <div data-aos="zoom-in">
      <VehicleSections/>   
    </div>
  );
};

const PartnersSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Partners section content */}
      <h2>Partners Section :</h2>
      <Viewpartnrs/>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const GuidesSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Guides and Events section content */}
      <h2>Manage Guides :</h2>
      <Alltourguides/>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const EventsSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Guides and Events section content */}
      <h2>Manage Events :</h2>
      <WholeEvents/>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const ProductsSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Products section content */}
      <h2>Products Section :</h2>
      <Allmarcketplace/>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const EarnsSection = () => {

  return (
    <div data-aos="zoom-in">
      {/* Earns section content */}
      <h2>Earns Section :</h2>
      <section className='v-section'>
      <div className='v-cards'>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>01</h2>
                                
                                <h3>All Earns</h3>
                                <h5>View all earns</h5>   
                                <a href='/allearns'>View</a>
                            </div>
                        </div>

                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>02</h2>
                                
                                <h3>All Payment Requests</h3>
                                <h5>View all payment requests</h5>   
                                <a href='/allpayments'>View</a>
                                </div>
                        </div>

                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>03</h2>
                                
                                <h3> Paid Payment Requests</h3>
                                <h5>View all Payment Requests</h5>   
                                <a href='/archivedearns'>View</a>
                                </div>
                        </div>
                                              
                    </div>

      </section>
    </div>
  );
};

const RatesSection = () => {

  return (
    <div data-aos="zoom-in">
      {/* Earns section content */}
      <h2>Rates Section :</h2>
      <section className='v-section'>
      <div className='v-cards'>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>01</h2>
                                
                                <h3>All Rates</h3>
                                <h5>Manage All rates</h5>   
                                <a href='/rates'>View</a>
                            </div>
                        </div>
                                              
                    </div>

      </section>
    </div>
  );
};

export default AdmminPanel;