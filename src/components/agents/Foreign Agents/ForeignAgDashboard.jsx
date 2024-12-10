import React, { useEffect, useState } from "react";
import Hsllogo from "../../../assets/Hsllogo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaHotel,
  FaCar,
  FaPeopleArrows,
  FaMoneyBillTransfer,
  FaUser,
} from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdEventAvailable } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDashboard } from "react-icons/md";
import { MdNoFood } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdOutlineHourglassEmpty } from "react-icons/md";
import NotificationPage from "../Local Agents/Notifications";
import ExpiredAddsPage from "../Local Agents/ExpiredAdds"

const ForeignAgentDashboard = () => {

  const agentEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Check if the page has already been refreshed
    const hasRefreshed = localStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      // Refresh the page and set the flag in local storage
      localStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, []);
  //

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
    window.location.href = "/";
  };
  const user = localStorage.getItem("userRole");
  console.log(user)
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const userRole = localStorage.getItem("userRole");
        const email = localStorage.getItem("userEmail");

        if (
          !authToken ||
          !userRole ||
          userRole == "agent" ||
          userRole == "user" ||
          userRole !== "seller"
        ) {
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
  const [selectedOption, setSelectedOption] = useState("Hotels");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Check localStorage for notificationStatus
  const hasNotifications = localStorage.getItem("notificationStatus") === "have";


  // const handleCheckoutLiveRide = async () => {
  //   try {
  //     const backendUrl = 'https://holidaysri-backend-9xm4.onrender.com';
  //     const id = '65f58296f707aa390b10db8a';
      
  //     // Fetch rates from the backend
  //     const responseRates = await axios.get(`${backendUrl}/rate/get/${id}`);
  //     const rates = responseRates.data.rate;
  //     console.log(rates)
  //     // Navigate to checkout page with the fetched rates and discount
  //     navigate('/checkout', { 
  //       state: { 
  //         discount: rates.discountDailyPercentage, 
  //         rate: rates.liveRideDailyRate,
  //         path: '/add-live-ride',
  //         currency: 'LKR',
  //         items: 'Live Ride Advertisement',
  //         earns: rates.dailyEarnRate,
  //       } 
  //     });
  //   } catch (error) {
  //     console.error('Error fetching rates or navigating to checkout:', error.message);
  //   }
  // };


  const handleCheckoutLiveRide = async () => {
    try {
      // Navigate directly to the /add-live-ride route
      navigate('/add-live-ride');
    } catch (error) {
      console.error('Error navigating to /add-live-ride:', error.message);
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

  const handleClickToUserDB = () => {
    navigate("/MainuserDashboard");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logobox">
          <a href="/">
            <img className="logoimg" src={Hsllogo} alt="" />
          </a>
        </div>
        <div>
          <h2 className='useremailindb'><FaUser />&nbsp;{agentEmail}</h2>
        </div>
        <button className={selectedOption === 'Hotels' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Hotels")}>
        <i><FaHotel /></i>
          &nbsp; Hotels
        </button>
        <button className={selectedOption === 'Vehicle' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Vehicle")}>
        <i><FaCar /></i>
          &nbsp; Vehicle
        </button>
        <button className={selectedOption === 'Partners' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Partners")}>
          <i><FaPeopleArrows /></i>
          &nbsp; Partners
        </button>
        <button className={selectedOption === 'Guides' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Guides")}>
          <i><FaPeopleArrows /></i>
          &nbsp; Guides
        </button>
        <button className={selectedOption === 'Events' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Events")}>
         <i><MdEventAvailable /></i>
          &nbsp; Events
        </button>
        <button className={selectedOption === 'Products' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Products")}>
          <i><IoFastFoodSharp /></i>
          &nbsp; Products
        </button>
          <button className={selectedOption === 'Earns' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Earns")}>
          <i><FaMoneyBillTransfer /></i>
          &nbsp; Earns
        </button>
        <button className={selectedOption === 'Live Rides' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Live Rides")}>
          <i><FaCar /></i>
          &nbsp; Live Rides
        </button>
        <button className={selectedOption === 'Foods' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Foods")}>
          <i><MdNoFood  /></i>
          &nbsp; Foods
        </button>
        <br/>
        <button className={selectedOption === 'Notifications' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Notifications")}>
          <i><MdNotifications  /></i>
          &nbsp; Notifications
          &nbsp;{hasNotifications && <span className="red-dot"></span>}
        </button>
        <button className={selectedOption === 'Expired adds' ? 'activee' : 'dbbtns'} onClick={() => handleOptionSelect("Expired adds")}>
          <i><MdOutlineHourglassEmpty  /></i>
          &nbsp; Expired Adds
        </button>
        <button className='dbbtns' onClick={handleClickToUserDB}>
          <i><MdDashboard /></i>
          &nbsp; User Dashboard
        </button>
        <br/>
        <button className='dbbtns' onClick={handleSignout}>
          <i><CiLogout /></i>
          &nbsp;Logout{" "}
        </button>
      </div>

      <div className="powermain">
        <div className="dsbHeader">
          <h2>Advertiser Dashboard</h2>
        </div>

        <div className="main-content">
          {selectedOption === "Hotels" && <HotelSection />}
          {selectedOption === "Vehicle" && <VehicleSection />}
          {selectedOption === "Partners" && <PartnersSection />}
          {selectedOption === "Guides" && <GuidesSection />}
          {selectedOption === "Events" && <GuidesEventsSection />}
          {selectedOption === "Products" && <ProductsSection />}
          {user != "seller" && selectedOption === "Earns" && <EarnsSection />}  
          {user === "seller" && selectedOption === "Earns" && <EarnsSectionSeller />}  
          {selectedOption === "Live Rides" && (
            <LiveRideSection handleCheckoutLiveRide={handleCheckoutLiveRide}
            handleCheckoutMonthlyLiveRide={handleCheckoutMonthlyLiveRide} />
          )}
          {selectedOption === "Foods" && (
            <FoodSection />
          )}

          {selectedOption === 'Notifications' && <NotificationSection />}
          {selectedOption === 'Expired adds' && <ExpiredAddsSection />}

        </div>
      </div>
    </div>
  );
};

const HotelSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Hotel section content */}
      <h2>Hotels Section :</h2>

      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>01</h2>

              <h3>Add Hotels</h3>
              <a href="/add-Hotel">Add</a>
            </div>
          </div>

          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>View Hotels</h3>
              <a href="/allhotels">View</a>
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
      {/* Vehicle section content */}
      <h2>Vehicle Section :</h2>

      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>01</h2>

              <h3>Add Vehicles</h3>
              <a href="/add-vehicle">Add</a>
            </div>
          </div>

          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>View Vehicles</h3>
              <a href="/all-vehicles">View</a>
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

      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>View Partners</h3>
              <a href="/all-partners">View</a>
            </div>
          </div>
        </div>
      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};
const GuidesSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Partners section content */}
      <h2>Guides Section :</h2>

      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>View Guides</h3>
              <a href="/all-tourguides">View</a>
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
      <h2> Events Section :</h2>
      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>View Events</h3>
              <a href="/everyevent">View</a>
            </div>
          </div>
          <div className="v-text-card">
            <div className="v-content">
              <h2>03</h2>

              <h3>Add Events</h3>
              <a href="/add-event">Add</a>
            </div>
          </div>
        </div>
      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};

const ProductsSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Products section content */}
      <h2>Products Section :</h2>
      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>01</h2>

              <h3>Add Products</h3>
              <a href="/seller">Add</a>
            </div>
          </div>

          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>View Products</h3>
              <a href="/all-marcketplace">View</a>
            </div>
          </div>
        </div>
      </section>
      {/* Add more components and functionalities here */}
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

const EarnsSectionSeller = () => {
  return (
    <div data-aos="zoom-in">
      {/* Earns section content */}
      <h2>Earns Section :</h2>
      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>01</h2>

              <h3>Register as a agent to earn from HolidaySri</h3>
              <a href="/Register">Register</a>
            </div>
          </div>

         
        </div>
      </section>
      {/* Add more components and functionalities here */}
    </div>
  );
};
const EarnsSection = () => {
  return (
    <div data-aos="zoom-in">
      {/* Earns section content */}
      <h2>Earns Section :</h2>
      <section className="v-section">
        <div className="v-cards">
          <div className="v-text-card">
            <div className="v-content">
              <h2>01</h2>

              <h3>Total Earns</h3>
              <a href="#">View</a>
            </div>
          </div>

          <div className="v-text-card">
            <div className="v-content">
              <h2>02</h2>

              <h3>Amount</h3>
              <a href="#">View</a>
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

export default ForeignAgentDashboard;
