import React, { useState, useEffect } from 'react';
import Logo from '../../../assets/Hsllogo.png';
import { MdOutlineMenu } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import './Newlanding.css';
import AOS from 'aos';
import { Link } from "react-scroll";
import { IoMdLogIn } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import {useNavigate } from 'react-router-dom'; 

function Newlanding() {
    const navigate = useNavigate(); // added useNavigate hook

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const [timeRunning, setTimeRunning] = useState(3000);
    const [timeAutoNext, setTimeAutoNext] = useState(7000);
    let runTimeOut, runNextAuto;

    // Check localStorage for notificationStatus
    const hasNotifications = localStorage.getItem("notificationStatus") === "have";

    useEffect(() => {
        const runNextAuto = setTimeout(() => {
            next();
        }, timeAutoNext);

        return () => clearTimeout(runNextAuto);
    }, [timeAutoNext]);

    const next = () => {
        showSlider('next');
    }

    const prev = () => {
        showSlider('prev');
    }

    const showSlider = (type) => {
        let SliderItemsDom = document.querySelectorAll('.carousel .list .item');
        let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
        const carouselDom = document.querySelector('.carousel');
        const SliderDom = carouselDom.querySelector('.carousel .list');
        const thumbnailBorderDom = document.querySelector('.carousel .thumbnail');


        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            next();
        }, timeAutoNext);
    }

    const handleSignout = () => {
        // Show confirmation dialog before signing out
        const confirmation = window.confirm("Are you sure you want to sign out?");
    
        // If the user clicks "Yes", proceed with the sign-out
        if (confirmation) {
            // Remove userRole, authToken, and userEmail from localStorage
            localStorage.removeItem("authToken");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userEmail");
    
            // Redirect to login page or any other page after sign-out
            window.location.href = '/';
        }
        // If the user clicks "No", do nothing
    };

    // Check if authToken and userRole exist in localStorage
    const authToken = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");

    const handleNavItemClick = () => {
        // Hide the navbar and uncheck the checkbox when a nav item is clicked
        const navbar = document.querySelector('.newnavbar');
        const checkbox = document.getElementById('check');

        if (navbar && checkbox) {
            navbar.style.display = 'block';
            checkbox.checked = false;
        }
    }

    const handleProfileClick = () => {
        const role = localStorage.getItem("userRole");

        if (role === "admin") {
            window.location.href = "/admin";
        } else if (role === "seller") {
            window.location.href = "/foreign-dashboard";
        } else if (role === "agent") {
            window.location.href = "/local-dashboard";
        } else if (role === "guide") {
            window.location.href = "/Guider-Dashboard";
        }else if (role === "partner") {
            window.location.href = "/Partner-Dashboard";
        } else {
            window.location.href = "/MainuserDashboard";
        }
    }

       // MODIFIED: Check userRole before redirecting to respective dashboard
   const handleAgentDashboard = () => {
    if (userRole === 'agent') {
      navigate('/local-dashboard');
    } else {
      navigate('/access');
    }
  };

  const handleAdvertiserDashboard = () => {
    if (userRole === 'seller') {
      navigate('/foreign-dashboard');
    } else {
      navigate('/access');
    }
  };


    return (
        <div className='mainhomebg' data-aos="fade">
            <div className='bgnheader'>
                <div className='mainlogoo'>
                    <a href='#'><img src={Logo} alt="mainlogoo" /></a>
                </div>

                <input type="checkbox" id="check" />
                <label for="check" className="iconsnav">
                    <i id='menu-ico'><MdOutlineMenu /></i>
                    <i id='close-ico'><IoIosCloseCircle /></i>
                </label>

                <div className='newnavbar'>

                <div className='navitems'>
                        <Link to="deswithhomecontainer" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 0 }} onClick={handleNavItemClick}>Destinations</Link>
                        <Link to="hotels" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 1 }} onClick={handleNavItemClick}>Hotels</Link>
                        <Link to="tour-packages" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 2 }} onClick={handleNavItemClick}>Tour Packages</Link>
                        <Link to="vehicles" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 3 }} onClick={handleNavItemClick}>Vehicles</Link>
                        <Link to="Agents" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 4 }} onClick={handleNavItemClick}>Promo Code</Link>
                        <Link to="travel-partner" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 5 }} onClick={handleNavItemClick}>Travel Partner</Link>
                        <Link to="tour-guide" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 6 }} onClick={handleNavItemClick}>Tour Guide</Link>
                        <Link to="market-place" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 7 }} onClick={handleNavItemClick}>All Advertisements</Link>
                        <Link to="CT-Gallery" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 8 }} onClick={handleNavItemClick}>Contact</Link>
                        <Link to="CT-Galleryto" spy={true} smooth={true} duration={500} className="navButton" style={{ '--i': 9 }} onClick={handleNavItemClick}>Gallery</Link>
                        <a href="/about" className="navButton" style={{ '--i': 10 }} onClick={handleNavItemClick}>About</a>

                        {/* Conditionally render the sign-in button */}
                        {!authToken && !userRole && !userEmail && (
                            <a className='signinproicons' href="/login">
                             <span>Sign in <IoMdLogIn /></span>
                            </a>
                        )}

                        {/* Render sign-out button if either authToken and userRole exist, or userEmail exists */}
                        {(authToken && userRole) || userEmail ? (
                         <>
                            <a className='signinupproicons' onClick={handleSignout}>
                                <CiLogout /> Sign Out
                            </a>

                            <a className='profile-icon-container' onClick={handleProfileClick}>
                                <FaCircleUser className='profileIco' />
                                {hasNotifications && <span className="red-dot"></span>}
                            </a>
                            </>
                        ) : null}
                        
                    </div>




                </div>
            </div>

            <div className="carousel">
                <div className="list">
                    {/* Your carousel items go here */}
                    <div className="item">
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443585/img1_tdu9xv.webp" alt="carousel item" />
                        <div className="content">
                            <div className="author">Holiday Sri</div>
                            <div className="title">Welcome To..</div>
                            <div className="topic">SRI LANKA</div>
                            <div className="des">Be a travel agent and earn money!Travel is the act of moving from one place to another, typically for leisure, exploration, business, or cultural exchange. It is a fundamental aspect of human experience, dating back to ancient times when people traversed vast distances on foot, by animal, or by sea to discover new lands, trade goods, or establish connections with distant communities.</div>
                            <div className="buttons">
                                <a href="all-hotels">Find a Hotel</a>
                                <a href="all-locations">See What's around</a>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443585/img2_sllia3.webp" alt="carousel item" />
                        <div className="content">
                            <div className="author">Holiday Sri</div>
                            <div className="title">Welcome To..</div>
                            <div className="topic">SRI LANKA</div>
                            <div className="des">Travel is the act of moving from one place to another, typically for leisure, exploration, business, or cultural exchange. It is a fundamental aspect of human experience, dating back to ancient times when people traversed vast distances on foot, by animal, or by sea to discover new lands, trade goods, or establish connections with distant communities.</div>
                            <div className="buttons">
                                <a href="all-vehicles">Book Vehicle</a>
                                <a hred="all-packages">View Products</a>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443584/img3_c2ou67.webp" alt="carousel item" />
                        <div className="content">
                            <div className="author">Holiday Sri</div>
                            <div className="title">Welcome To..</div>
                            <div className="topic">SRI LANKA</div>
                            <div className="des">Travel is the act of moving from one place to another, typically for leisure, exploration, business, or cultural exchange. It is a fundamental aspect of human experience, dating back to ancient times when people traversed vast distances on foot, by animal, or by sea to discover new lands, trade goods, or establish connections with distant communities.</div>
                            <div className="buttons">
                                <a onClick={handleAgentDashboard}>Travel Agent</a>
                                <a onClick={handleAdvertiserDashboard}>Advertiser</a>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443582/img4_ldczcn.webp" alt="carousel item" />
                        <div className="content">
                            <div className="author">Holiday Sri</div>
                            <div className="title">Welcome To..</div>
                            <div className="topic">SRI LANKA</div>
                            <div className="des">Travel is the act of moving from one place to another, typically for leisure, exploration, business, or cultural exchange. It is a fundamental aspect of human experience, dating back to ancient times when people traversed vast distances on foot, by animal, or by sea to discover new lands, trade goods, or establish connections with distant communities.</div>
                            <div className="buttons">
                                <a>View Events</a>
                                <a>Hire Guides</a>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443582/img5_yxchtg.webp" alt="carousel item" />
                        <div className="content">
                            <div className="author">Holiday Sri</div>
                            <div className="title">Welcome To..</div>
                            <div className="topic">SRI LANKA</div>
                            <div className="des">Travel is the act of moving from one place to another, typically for leisure, exploration, business, or cultural exchange. It is a fundamental aspect of human experience, dating back to ancient times when people traversed vast distances on foot, by animal, or by sea to discover new lands, trade goods, or establish connections with distant communities.</div>
                            <div className="buttons">
                                <a href="all-vehicles">Book Vehicle</a>
                                <a hred="all-packages">View Products</a>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443582/img6_q8lflj.webp" alt="carousel item" />
                        <div className="content">
                            <div className="author">Holiday Sri</div>
                            <div className="title">Welcome To..</div>
                            <div className="topic">SRI LANKA</div>
                            <div className="des">Travel is the act of moving from one place to another, typically for leisure, exploration, business, or cultural exchange. It is a fundamental aspect of human experience, dating back to ancient times when people traversed vast distances on foot, by animal, or by sea to discover new lands, trade goods, or establish connections with distant communities.</div>
                            <div className="buttons">
                                <a onClick={handleAgentDashboard}>Travel Agent</a>
                                <a onClick={handleAdvertiserDashboard}>Advertiser</a>
                            </div>
                        </div>
                    </div>

                    {/* Add more carousel items as needed */}
                </div>
                <div className="thumbnail">
                    {/* Your thumbnail items go here */}
                    <div className="item" onClick={next}>
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443585/img2_sllia3.webp" alt="thumbnail item" />
                        <div className="content">
                            <div className="title">Book Vehicle</div>
                            <div className="description">View Products</div>
                        </div>
                    </div>
                    <div className="item" onClick={next}>
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443584/img3_c2ou67.webp" alt="thumbnail item" />
                        <div className="content">
                            <div className="title">Local Travel Agent</div>
                            <div className="description">Foreign Travel Agent</div>
                        </div>
                    </div>
                    <div className="item" onClick={next}>
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443582/img4_ldczcn.webp" alt="thumbnail item" />
                        <div className="content">
                            <div className="title">View Events</div>
                            <div className="description">Hire Guides</div>
                        </div>
                    </div>
                    <div className="item" onClick={next}>
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443582/img5_yxchtg.webp" alt="thumbnail item" />
                        <div className="content">
                            <div className="title">Book Vehicle</div>
                            <div className="description">View Products</div>
                        </div>
                    </div>
                    <div className="item" onClick={next}>
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443582/img6_q8lflj.webp" alt="thumbnail item" />
                        <div className="content">
                            <div className="title">Local Travel Agent</div>
                            <div className="description">Foreign Travel Agent</div>
                        </div>
                    </div>
                    <div className="item" onClick={next}>
                        <img src="https://res.cloudinary.com/dqdcmluxj/image/upload/v1733443585/img1_tdu9xv.webp" alt="thumbnail item" />
                        <div className="content">
                            <div className="title">Book your Hotel</div>
                            <div className="description">View Hotel</div>
                        </div>
                    </div>
                    {/* Add more thumbnail items as needed */}
                </div>
                <div className="arrows">
                    <button id="prev" onClick={prev}>{'<'}</button>
                    <button id="next" onClick={next}>{'>'}</button>
                </div>
                <div className="time"></div>
            </div>
        </div>
    );
}

export default Newlanding;
