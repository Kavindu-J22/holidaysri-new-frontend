import React, { useEffect, useState } from 'react';
import axios from "axios";
import Hsllogo from '../../../assets/Hsllogo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHotel, FaCar, FaPeopleArrows, FaMoneyBillTransfer,FaMountainSun, FaUser  } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import './Dashboard.css';
import { CiLogout } from "react-icons/ci";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { MdNoFood } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdOutlineHourglassEmpty } from "react-icons/md";
import NotificationPage from "./Notifications";
import ExpiredAddsPage from "./ExpiredAdds"

const LocalAgentDashboard = () => {

  const agentSubRole = localStorage.getItem("subRole");
  const agentEmail = localStorage.getItem("userEmail");

   // Check localStorage for notificationStatus
   const hasNotifications = localStorage.getItem("notificationStatus") === "have";
 
  useEffect(() => {
    // Check if the page has already been refreshed
    const hasRefreshed = localStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // Refresh the page and set the flag in local storage
      localStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    }
  }, []);


  const navigate = useNavigate();

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
const handleCheckoutLiveRide = async () => {
    try {
      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';
      
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
      console.log(rates)
      // Navigate to checkout page with the fetched rates and discount
      navigate('/checkout', { 
        state: { 
          discount: rates.discountDailyPercentage, 
          rate: rates.liveRideDailyRate,
          path: '/add-live-ride',
          currency: 'LKR',
          items: 'Live Ride Advertisement',
          earns: rates.dailyEarnRate,
        } 
      });
    } catch (error) {
      console.error('Error fetching rates or navigating to checkout:', error.message);
    }
  };


const handleCheckoutMonthlyLiveRide = async () => {
  const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
  const id = '65f58296f707aa390b10db8a';

  try {
    // Get current user's email from local storage
    const currentUserEmail = localStorage.getItem('userEmail');

    if (!currentUserEmail) {
      console.error('User email not found in local storage');
      return;
    }

    // Check if the user has any vehicles
    const responseVehicles = await axios.get(`${backendUrl}/vehicle/vehicle?email=${currentUserEmail}`);
    const vehicles = responseVehicles.data;

    console.log(vehicles);

    if (vehicles) {
      // If vehicle data is available, navigate to /add-Month-live-ride
      navigate('/add-Month-live-ride');

    } else{
      console.log("Else")
    }

  } catch (error) {

    const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
      // Navigate to the checkout page with the appropriate data
      navigate('/checkout', {
        state: {
          discount: rates.discountMonthlyPercentage,
          rate: rates.liveRideMonthlyRate,
          path: '/add-Month-live-ride',
          currency: 'LKR',
          items: 'Live Ride Advertisement',
          earns: rates.monthlyEarnRate,
        }
      });

      console.error('Error fetching data or navigating:', error.message);
  }
};

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const userRole = localStorage.getItem("userRole");

        if (!authToken || !userRole || userRole == "seller" || userRole == "user" || userRole !== "agent") {
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
  const [selectedOption, setSelectedOption] = useState('Hotels');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCheckoutPromo = async () => {
    try {
      const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
      const id = '65f58296f707aa390b10db8a';
      
      // Fetch rates from the backend
      const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
      const rates = responseRates.data.rate;
  
      // Check subRole from localStorage
      const subRole = localStorage.getItem("subRole");
      let currency = 'LKR'; // Default to LKR
      let rate = rates.promoCodeLocalRate;
      let discount = rates.discountPromoCodeLocalPercentage;
      let earns = rates.promoCodeLocalEarnRate;
  
      // Set currency based on subRole
      if (subRole === "Local Agent") {
        currency = 'LKR';
        rate = rates.promoCodeLocalRate;
        discount = rates.discountPromoCodeLocalPercentage;
        earns = rates.promoCodeLocalEarnRate;
      } else if (subRole === "Foreign Agent") {
        currency = 'USD';
        rate = rates.promoCodeForeignRate;
        discount = rates.discountPromoCodeForeignPercentage;
        earns = rates.promoCodeForeignEarnRate;
      }
  
      // Navigate to checkout page with the fetched rates and discount
      navigate('/checkout', { 
        state: { 
          discount: discount, 
          rate: rate,
          path: '/purchase-promo-code',
          currency: currency, // Use the currency based on subRole
          items: 'Promo Code Purchase',
          earns: earns,
        } 
      });
    } catch (error) {
      console.error('Error fetching rates or navigating to checkout:', error.message);
    }
  };
  

  const handleClickToUserDB = () => {
    navigate('/MainuserDashboard');
};

const handleClickToResetPW = () => {
  navigate('/forgotPassword');
};



  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className='logobox'>
          <a href='/'>        <img className="logoimg" src={Hsllogo} alt="" />
          </a>
        </div>
        <div>
          <h2 className='useremailindb'><FaUser />&nbsp;{agentEmail}</h2>
        </div>
        <button className={selectedOption === 'Hotels' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Hotels')}><i><FaHotel /></i>&nbsp; Agent Code</button>
        <button className={selectedOption === 'Vehicle' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Vehicle')}><i><FaCar /></i>&nbsp; Vehicle</button>
        <button className={selectedOption === 'LocalPackage' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('LocalPackage')}><i><FaMountainSun  /></i>&nbsp; Local Packages</button>
        <button className={selectedOption === 'Partners' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Partners')}><i><FaPeopleArrows /></i>&nbsp; Partners</button>
        <button className={selectedOption === 'Guides and Events' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Guides and Events')}><i><MdEventAvailable /></i>&nbsp; Guides and Events</button>
        <button className={selectedOption === 'Live Rides' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Live Rides')}><i><FaCar /></i>&nbsp;Live Rides</button>  
        <button className={selectedOption === 'Foods' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Foods')}><i><MdNoFood /></i>&nbsp; Foods</button>
        <br/>
        <button className={selectedOption === 'tet notification' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Notifications')}><i><MdNotifications /></i>&nbsp; Notifications &nbsp;{hasNotifications && <span className="red-dot"></span>}</button>
        <button className={selectedOption === 'test expiration' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Expired adds')}><i><MdOutlineHourglassEmpty /></i>&nbsp; Expired Ads</button>
        {/* <button className={selectedOption === 'Reactivate' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Reactivate')}><i><FaHotel /></i>&nbsp; Renew agent Code</button> */}
        <button className={selectedOption === 'Earns' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect('Earns')}><i><FaMoneyBillTransfer /></i>&nbsp; Earns</button>
        <button className = 'dbbtns' onClick={handleClickToUserDB} ><i><MdDashboard /></i>&nbsp; User Dashboard</button>
        <button className = 'dbbtns' onClick={handleClickToResetPW} ><i><MdDashboard /></i>&nbsp; Reset Password</button>
        <br/>
        <button className = 'dbbtns' onClick={handleSignout}><i><CiLogout /></i>&nbsp;Logout </button>
      </div>
        
      <div className='powermain'>
        <div className='dsbHeader'>
            <h2>Travel Agent Dashboard <br/> ( {agentSubRole} )</h2>
        </div>

        <div className="main-content">
            {selectedOption === 'Hotels' && <HotelSection handleCheckoutPromo={handleCheckoutPromo} />}
            {selectedOption === 'Vehicle' && <VehicleSection />}
            {selectedOption === 'LocalPackage' && <PackageSection />}
            {selectedOption === 'Partners' && <PartnersSection />}
            {selectedOption === 'Guides and Events' && <GuidesEventsSection />}
            {/* {selectedOption === 'Reactivate' && <ReactiveSection handleCheckoutReactive={handleCheckoutReactive} />} */}
            
            {selectedOption === 'Notifications' && <NotificationSection />}
            {selectedOption === 'Expired adds' && <ExpiredAddsSection />}
            
            {selectedOption === 'Earns' && <EarnsSection />}
            {selectedOption === 'Foods' && <FoodSection />}
            {selectedOption === "Live Rides" && (
            <LiveRideSection handleCheckoutLiveRide={handleCheckoutLiveRide}
            handleCheckoutMonthlyLiveRide={handleCheckoutMonthlyLiveRide} />
          )}
            
        </div>
      </div>
    </div>
  );
};

const HotelSection = ({ handleCheckoutPromo }) => {
  const userEmail = localStorage.getItem("userEmail");
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getAllPromo() {
      try {
        const res = await axios.get(
          `https://holidaysri-backend.onrender.com/promo/promo-exist?email=${userEmail}`
        );
        setPromo(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Promo Codes:", error);
        setLoading(false);
       // alert("Error fetching Promo Codes: " + error.message);
      }
    }
    getAllPromo();
  }, []);

  const handleCopyPromoCode = () => {
    navigator.clipboard.writeText(promo.promoCode).then(() => {
      alert('PromoCode Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy promo code: ', err);
    });
  };

  // const handleCheckoutReactive = async () => {
  //   try {
  //     const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
  //     const id = '65f58296f707aa390b10db8a';
      
  //     // Fetch rates from the backend
  //     const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
  //     const rates = responseRates.data.rate;

  //     // Check subRole from localStorage
  //     const subRole = localStorage.getItem("subRole");
  //     let currency = 'LKR'; // Default to LKR
  //     let rate = rates.promoCodeLocalRate;
  //     let discount = rates.discountPromoCodeLocalPercentage;
  //     let earns = rates.promoCodeLocalEarnRate;
  
  //     // Set currency based on subRole
  //     if (subRole === "Local Agent") {
  //       currency = 'LKR';
  //       rate = rates.promoCodeLocalRate;
  //       discount = rates.discountPromoCodeLocalPercentage;
  //       earns = rates.promoCodeLocalEarnRate;
  //     } else if (subRole === "Foreign Agent") {
  //       currency = 'USD';
  //       rate = rates.promoCodeForeignRate;
  //       discount = rates.discountPromoCodeForeignPercentage;
  //       earns = rates.promoCodeForeignEarnRate;
  //     }
  
  //     // Navigate to checkout page with the fetched rates and discount
  //     navigate('/checkout', { 
  //       state: { 
  //         discount: discount, 
  //         rate: rate,
  //         path : '/reactivate',
  //         currency: currency,
  //         items: 'Promo Code Reactivation',
  //         earns: earns,
  //       } 
  //     });
  //   } catch (error) {
  //     console.error('Error fetching rates or navigating to checkout:', error.message);
  //   }
  // };

  return (
    <div data-aos="zoom-in">
      {/* Hotel section content */}
      <h2>Promo Code Section :</h2>
      <section className='v-section'>
        {loading?<><img style={
          {width:'150px'}
        } src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733336963/07-57-40-974_512_as8qhn_atlkmq.webp"></img> </>:<>
          {promo.promoCode ? <>
            <div className='v-cards'>
              <div className='v-text-card'>
                <div className='v-content'>
                  <h2>01</h2>
                  <h4>Promo Code:</h4>
                  <h3>{promo.promoCode}</h3>

                  <h4 style={{ marginTop: '16px' }}>
                    Status: {(!promo.isActive || new Date(promo.expirationDate) < new Date()) ? 
                      <span style={{ color: "#f94449" }}>Expired</span> : 
                      <span style={{ color: "#98FF98" }}>Active</span>}
                  </h4>


                  {(!promo.isActive || new Date(promo.expirationDate) < new Date()) ? (
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "30px",
                        borderColor: "white",
                        boxShadow: "none",
                        width: { lg: "220px", xs: "200px" },
                        backgroundColor: "white",
                        color: "black",
                        marginTop: { lg: "16px", xs: "20px" },
                        height: "32px",
                        "&:hover": {
                          backgroundColor: "grey",
                          color: "black",
                          borderColor: "white",
                          boxShadow: "none",
                        },
                      }}
                      onClick={handleCheckoutPromo}
                    >
                      Renew Agent Code
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "30px",
                        borderColor: "white",
                        boxShadow: "none",
                        width: { lg: "220px", xs: "200px" },
                        backgroundColor: "white",
                        color: "black",
                        marginTop: { lg: "16px", xs: "20px" },
                        height: "32px",
                        "&:hover": {
                          backgroundColor: "grey",
                          color: "black",
                          borderColor: "white",
                          boxShadow: "none",
                        },
                      }}
                      onClick={handleCopyPromoCode}
                    >
                      Copy Promo Code
                    </Button>
                  )}

                </div>
              </div>
            </div>

        </>:<>

        <div className='v-cards'>
          <div className='v-text-card'>
            <div className='v-content'>
              <h2>01</h2>
              <h3>Buy Fresh Promo Code</h3>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  borderColor: "white",
                  boxShadow: "none",
                  width: { lg: "210px", xs: "170px" },
                  backgroundColor: "white",
                  color: "black",
                  marginTop: { lg: "16px", xs: "20px" },
                  height: "32px",
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "black",
                    borderColor: "white",
                    boxShadow: "none",
                  },
                }}
                onClick={handleCheckoutPromo}
              >
                Purchase New Promo Code
              </Button>
            </div>
          </div>                               
        </div>

        <div style={{ display: 'flex', flexDirection: 'row'}}>
       
        <div className='v-cards'>
          <div className='v-text-card'>
            <div className='v-content'>
              <h2>01</h2>
              <h3>Buy Profitable Promo Code</h3>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  borderColor: "white",
                  boxShadow: "none",
                  width: { lg: "210px", xs: "170px" },
                  backgroundColor: "white",
                  color: "black",
                  marginTop: { lg: "16px", xs: "20px" },
                  height: "32px",
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "black",
                    borderColor: "white",
                    boxShadow: "none",
                  },
                }}
                onClick={() => navigate('#')}
              >
                Buy now
              </Button>
            </div>
          </div>                               
        </div>

        <div className='v-cards'>
          <div className='v-text-card'>
            <div className='v-content'>
              <h2>01</h2>
              <h3>Request for free Promo Code</h3>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  borderColor: "white",
                  boxShadow: "none",
                  width: { lg: "210px", xs: "170px" },
                  backgroundColor: "white",
                  color: "black",
                  marginTop: { lg: "16px", xs: "20px" },
                  height: "32px",
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "black",
                    borderColor: "white",
                    boxShadow: "none",
                  },
                }}
                onClick={() => navigate('/requestFreePromocode')}
              >
                Request Now
              </Button>
            </div>
          </div>                               
        </div>

        </div>
        
        </>}

        </>}
        
      </section>
    </div>
  );
};

const VehicleSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Vehicle section content */}
      <h2>Vehicle Section :</h2>

      <section className='v-section'>
      <div className='v-cards'>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>01</h2>
                                
                                <h3>Add Vehicles</h3>
                                <a href='/add-vehicle'>Add</a>
                            </div>
                        </div>

                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>02</h2>
                                
                                <h3>View Vehicles</h3>
                                <a href='/all-vehicles'>View</a>
                                </div>
                        </div>
                                              
                    </div>

      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const PackageSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Vehicle section content */}
      <h2>Local package Section :</h2>

      <section className='v-section'>
      <div className='v-cards'>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>01</h2>
                                
                                <h3>Add / view Local Packages</h3>
                                <a href='/add-local-package'>Add</a>
                            </div>
                        </div>

                       
                                              
                    </div>

      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};


const PartnersSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Partners section content */}
      <h2>Partners Section :</h2>

      <section className='v-section'>
      <div className='v-cards'>

                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>02</h2>
                                
                                <h3>View Partners</h3>
                                <a href='/all-partners'>View</a>
                                </div>
                        </div>
                                              
                    </div>

      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const GuidesEventsSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Guides and Events section content */}
      <h2>Guides and Events Section :</h2>
      <section className='v-section'>
      <div className='v-cards'>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>02</h2>
                                
                                <h3>View Guides</h3>
                                <a href='/all-tourguides'>View</a>
                                </div>
                        </div>

                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>02</h2>
                                
                                <h3>View Events</h3>
                                <a href='/everyevent'>View</a>
                                </div>
                        </div>
                                              
                    </div>

      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const NotificationSection = () => {
  return (
    <div data-aos="zoom-in">
      <NotificationPage />
    </div>
  );
};


const ExpiredAddsSection = () => {
  return (
    <div data-aos="zoom-in">
      <ExpiredAddsPage />
    </div>
  );
};


const FoodSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Products section content */}
      <h2>Food Section :</h2>
      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>01</h2>

              <h3>Add Foods</h3>
              <a href="/add-food">Add</a>
            </div>
          </div>

          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>View All Foods</h3>
              <a href="/allfoods">View</a>
            </div>
          </div>
        </div>
      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};


const LiveRideSection = ({ handleCheckoutLiveRide, handleCheckoutMonthlyLiveRide }) => {
  const [userName, setUserName] = useState({});

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        setUserName(email);
      } catch (error) {
        console.error("Error checking userName:", error);
      }
    };
    getUserEmail();
  }, []);

  return (
    <div data-aos="zoom-in">
      {/* Products section content */}
      <h2>Live Rides Section :</h2>
      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>01</h2>

              <h3>Add Daily Live Ride</h3>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  borderColor: "white",
                  boxShadow: "none",
                  width: { lg: "150px", xs: "200px" },
                  backgroundColor: "white",
                  color: "black",
                  marginTop: { lg: "16px", xs: "20px" },
                  height: "32px",
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "black",
                    borderColor: "white",
                    boxShadow: "none",
                  },
                }}
                onClick={handleCheckoutLiveRide}
              >
                Add Ride
              </Button>
            </div>
          </div>

          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>Add Monthly Live Ride</h3>

              <p style={{ marginTop: "10px", color: "white", fontSize: "12px", lineHeight: "1.5" }}>
                If you are an advertiser and you already have a vehicle advertisement, this option is free 
                within the vehicle advertisement valid time duration (for the month) for your advertised vehicle.
              </p>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  borderColor: "white",
                  boxShadow: "none",
                  width: { lg: "150px", xs: "200px" },
                  backgroundColor: "white",
                  color: "black",
                  marginTop: { lg: "16px", xs: "20px" },
                  height: "32px",
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "black",
                    borderColor: "white",
                    boxShadow: "none",
                  },
                }}
                onClick={handleCheckoutMonthlyLiveRide}
              >
                Add Ride
              </Button>
            </div>
          </div>

          <div className="v-text-card">
            <div className="v-content">
              <h2>03</h2>

              <h3>View Live Rides</h3>
              <a href={`/live-rides?email=${userName}`}>View</a>
            </div>
          </div>
        </div>
      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const EarnsSection = () => {

  const [userName, setUserName] = useState({});

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        setUserName(email);
      } catch (error) {
        console.error("Error checking userName:", error);
      }
    };
    getUserEmail();
  }, []);

  return (
    <div data-aos="zoom-in">
      {/* Earns section content */}
      <h2>Earns Section :</h2>
      <section className='v-section'>
      <div className='v-cards'>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>01</h2>
                                
                                <h3>Total Earns</h3>
                                <a href={`/earns?email=${userName}`}>View</a>
                            </div>
                        </div>
                        <div className='v-text-card'>
                            <div className='v-content'>
                                <h2>02</h2>
                                
                                <h3>Payment Requests</h3>
                                <a href={`/payrequest?email=${userName}`}>View</a>
                            </div>
                        </div>
                                              
                    </div>

      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};

export default LocalAgentDashboard;