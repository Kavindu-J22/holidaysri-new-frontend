import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGem, FaCrown, FaStar, FaRecycle, FaGift } from 'react-icons/fa';
import axios from 'axios';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { FaUserCheck, FaUserPlus, FaStarHalfAlt } from 'react-icons/fa';
import { FaCopy, FaCheck } from 'react-icons/fa';

const PromoCodePage = () => {
  const [data, setData] = useState({});
  const [promoAgents, setPromoAgents] = useState([]);
  const navigate = useNavigate();
  const id = "677c3cf4d1f1323d5ca309a4";
  const userEmail = localStorage.getItem('userEmail');
  const [userFriends, setUserFriends] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch rate data based on the id
        const response = await axios.get(`http://localhost:8000/rate/get/${id}`);
        setData(response.data.rate);
        setExchangeRate(response.data.rate.exchangeateUSD);

        // Fetch promocodes that are on and not expired
        const promoResponse = await axios.get('http://localhost:8000/newPromocodes/all');
        const filteredPromos = promoResponse.data.filter(promo => promo.advertise === "on" && new Date(promo.expirationDate) > new Date());

        // Fetch user data for each promo and include profile pictures
        const agentsWithPictures = await Promise.all(filteredPromos.map(async (promo) => {
          const { data } = await axios.get(`http://localhost:8000/api/user/findByEmail/${promo.userEmail}`);
          const { ProfilePicture } = data.user || {};
          return { ...promo, profilePicture: ProfilePicture };
        }));

        // Sort agents based on boostPoints
        setPromoAgents(agentsWithPictures.sort((a, b) => b.boostPoints - a.boostPoints));

        // Fetch user friends data
        const friendsResponse = await axios.get('http://localhost:8000/friends/getAllFriends', {
          params: { email: userEmail }
        });
        console.log('Friends Response:', friendsResponse.data); // Log to verify response
        setUserFriends(friendsResponse.data
          .filter(friend => friend.email) // Filter out undefined emails
          .map(friend => friend.email.toLowerCase())); // Convert to lowercase

        // Fetch user favorites data
        const favoritesResponse = await axios.get('http://localhost:8000/favorites/getFavorites', {
          params: { email: userEmail }
        });
        console.log('Favorites Response:', favoritesResponse.data); // Log to verify response
        setUserFavorites(favoritesResponse.data
          .filter(favorite => favorite.promocode) // Filter out undefined promo codes
          .map(favorite => favorite.promocode.toLowerCase())); // Convert to lowercase

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [id, userEmail]); // Dependency array includes id and userEmail
  
  

  const handleAddFriend = async (friendEmail) => {
    const userEmail = localStorage.getItem('userEmail');
    
    // Check if userEmail exists in localStorage
    if (!userEmail) {
      // Show confirmation dialog
      const isConfirmed = window.confirm("You need to sign in first. Do you want to go to the login page?");
      if (isConfirmed) {
        // Redirect to login page if user clicks "OK"
        navigate('/login');
      }
      return; // Stop execution if user is not signed in
    }
  
    try {
      // Check if the friend is already in the user's friend list
      const checkFriendResponse = await axios.post('http://localhost:8000/friends/check-friend', { email: userEmail, friendEmail });
      console.log("Check Friend Response:", checkFriendResponse.data); // Log the response for debugging
  
      if (checkFriendResponse.data.isFriend) {
        // Alert the user that the friend is already in the list
        alert("This user is already in your friend list.");
      } else {
        // Add the friend if they are not already in the list
        const addFriendResponse = await axios.post('http://localhost:8000/friends/add-friend', { email: userEmail, friendEmail });
        console.log("Add Friend Response:", addFriendResponse.data); // Log the response for debugging
  
        // Alert the user that the friend has been added successfully
        alert("Friend added successfully!");
      }
    } catch (error) {
      console.error("Error adding friend:", error.response ? error.response.data : error.message);
  
      // Show a generic error alert if the API call fails
      alert("There was an error adding the friend. Please try again later.");
    }
  };
  

  
  const handleAddFavorite = async (promoCode) => {
    const userEmail = localStorage.getItem('userEmail');
    
    // Check if userEmail exists in localStorage
    if (!userEmail) {
      // Show confirmation dialog
      const isConfirmed = window.confirm("You need to sign in first. Do you want to go to the login page?");
      if (isConfirmed) {
        // Redirect to login page if user clicks "OK"
        navigate('/login');
      }
      return; // Stop execution if user is not signed in
    }
  
    console.log("Checking if the promoCode is in favorites:", promoCode); // Log the promoCode
  
    try {
      const checkFavoriteResponse = await axios.post('http://localhost:8000/favorites/check-favorite', { email: userEmail, item: promoCode });
      console.log("Check favorite response:", checkFavoriteResponse.data); // Log the response from check-favorite
  
      if (!checkFavoriteResponse.data.isFavorite) {
        console.log("Item not in favorites. Adding it now...");
        const addFavoriteResponse = await axios.post('http://localhost:8000/favorites/add-favorite', { email: userEmail, item: promoCode });
        console.log("Add favorite response:", addFavoriteResponse.data); // Log the response from add-favorite
        alert("Promo code added to your favorites!");
      } else {
        alert("This promo code is already in your favorites.");
        console.log("Item already in favorites.");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("An error occurred while adding the promo code to your favorites. Please try again.");
    }
  };

  

  const handlePurchase = (priceHSC, title) => {
    const userEmail = localStorage.getItem('userEmail');
    const countryCode = localStorage.getItem('countryCode');

    if (!userEmail) {
        if (window.confirm("Sign In first to purchase. Click OK to go to the Sign In page.")) {
            navigate('/login');
        }
        return;
    }

    if (!countryCode) {
        if (window.confirm("Complete your profile first to purchase. Click OK to go to the profile dashboard.")) {
            navigate('/profile-Dashboard');
        }
        return;
    }

    const price = priceHSC ;

    navigate('/genaratePromoCode', {
        state: { Price: price, Currency: 'HSC', Title: title, Subject: 'Promo code Purchase' },
    });
};

 // State to track which promo code has been copied
 const [copiedPromocodeIndex, setCopiedPromocodeIndex] = useState(null);

 // Function to handle copying the promo code
 const handleCopyPromocode = (promocode, index) => {
   navigator.clipboard.writeText(promocode);
   setCopiedPromocodeIndex(index);
   setTimeout(() => setCopiedPromocodeIndex(null), 1000); // Reset after 3 seconds
 };


  const promoCodes = [
    {
      title: 'Diamond Promo Code',
      description: (
        <>
          As a HolidaySri agent, unlock your potential by using the Diamond Promo Code. Offer exclusive discounts to advertisers and earn a remarkable <span style={{ color: 'rgb(102, 248, 224)', fontWeight: '600' }}>450 LKR</span> per advertisement. An Extra benefit we give you <span style={{ color: 'rgb(233, 235, 116)' }}>Free 2000 HSC (HolidaySri Coins).</span> You can even sell this premium promo code at the highest price, ensuring you get the most value from your efforts. Start your journey to financial success today!
        </>
      ),
      priceHSC: data.diamondPromocodeRate || 'Loading...',
      buttonText: 'Purchase Now',
      color: 'rgb(52, 250, 233)',
      icon: <FaGem size={40} color="rgb(52, 250, 233)" />,
      onClick: () => handlePurchase(data.diamondPromocodeRate, 'Diamond Promo Code'),
    },
    {
      title: 'Gold Promo Code',
      description: (
        <>
          Elevate your earning potential with the Gold Promo Code. Share it with advertisers to give them exclusive discounts and earn <span style={{ color: 'rgb(240, 214, 98)', fontWeight: '600' }}>300 LKR</span> per advertisement. An Extra benefit we give you <span style={{ color: 'rgb(233, 235, 116)' }}>Free 1700 HSC (HolidaySri Coins).</span> This code provides a golden opportunity to maximize your profits while delivering value to others.
        </>
      ),
      priceHSC: data.goldPromocodeRate || 'Loading...',
      buttonText: 'Purchase Now',
      color: 'rgb(240, 214, 98)',
      icon: <FaCrown size={40} color="rgb(240, 214, 98)" />,
      onClick: () => handlePurchase(data.goldPromocodeRate, 'Gold Promo Code'),
    },
    {
      title: 'Silver Promo Code',
      description: (
        <>
          Start earning with the Silver Promo Code. Help advertisers save money and receive <span style={{ color: '#BDC3C7', fontWeight: '600'}}>200 LKR</span> per advertisement. An Extra benefit we give you Free <span style={{ color: 'rgb(233, 235, 116)'}}>800 HSC (HolidaySri Coins).</span> Affordable and effective, this promo code is perfect for those starting their agent journey.
        </>
      ),
      priceHSC: data.silverPromocodeRate || 'Loading...',
      buttonText: 'Purchase Now',
      color: '#BDC3C7',
      icon: <FaStar size={40} color="#BDC3C7" />,
      onClick: () => handlePurchase(data.silverPromocodeRate, 'Silver Promo Code'),
    },
    {
      title: 'Pre-Used Promo Code',
      description: (
        <>
        Get a head start with a Pre-Used Promo Code. These codes have <span style={{ color: 'rgb(233, 235, 116)' }}>already been promoted by other agents</span> and come with an established track record. Purchase now to begin earning immediately and watch your profits grow.
        </>
      ),
      price: 'View and Purchase',
      buttonText: 'View and Purchase Now',
      color: '#2ECC71',
      icon: <FaRecycle size={40} color="#2ECC71" />,
      onClick: () => navigate('/preeUseedPromocodes'),
    },
    {
      title: 'Get Free Promo Code',
      description:(
        <>
        Kickstart your earnings for free! Get a Free Promo Code and earn <span style={{ color: '#E74C3C', fontWeight: '600' }}>100 LKR</span> per advertisement. Once you reach a total earning of <span style={{ color: 'rgb(233, 235, 116)' }}>15,000 LKR, you can sell</span> your code and <span style={{ color: '#E74C3C', fontWeight: '600' }}>Earn Rate Increase to 200 LKR</span>. continue your journey to financial independence.
        </>
      ),
      price: 'Free for All',
      buttonText: 'Get Now',
      color: '#E74C3C',
      icon: <FaGift size={40} color="#E74C3C" />,
      onClick: () => handlePurchase( 0 , 'Free Promo Code'),
    },
  ];

  return (
    <div
      style={{
        paddingTop: '70px',
        paddingBottom: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#FFF', margin: '20px', fontSize: '30px' }}>🎫 Who is the HolidaySri Agent?</h1>
      <p
        style={{
          textAlign: 'center',
          margin: '0 auto 40px',
          color: 'rgb(212, 208, 208)',
          fontSize: '14px',
          maxWidth: '800px',
          paddingLeft: '30px',
          paddingRight: '30px',
        }}
      >
        Become a HolidaySri agent and unlock a world of earning opportunities! Share promo codes with advertisers, earn money for each advertisement they post, and even resell your promo codes at premium prices. Choose the right plan and start earning today!
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        {promoCodes.map((promo, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              border: `3px solid ${promo.color}`,
              borderRadius: '15px',
              padding: '20px',
              width: '300px',
              textAlign: 'center',
              backgroundColor: 'rgb(20, 20, 20)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = 'rgba(37, 37, 34, 0.62)';
              e.currentTarget.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'rgb(20, 20, 20)';
              e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.3)';
            }}
          >
            <div
              style={{
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                zIndex: '-1',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(0, 0, 0, 0.5))',
                opacity: '0.6',
                borderRadius: 'inherit',
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease',
              }}
            />
            <div>
              <div style={{ marginBottom: '15px' }}>{promo.icon}</div>
              <h2 style={{ color: promo.color, marginBottom: '10px', fontSize: '22px' }}>{promo.title}</h2>
              <p
                style={{
                  color: 'rgba(211, 205, 205, 0.69)',
                  fontSize: '12px',
                  marginBottom: '20px',
                  lineHeight: '1.6',
                }}
              >
                {promo.description}
              </p>

              <h3 style={{ color: 'rgb(240, 209, 142)', marginBottom: '15px', fontSize: '17px' }}>
                {(promo.title === 'Pre-Used Promo Code' || promo.title === 'Get Free Promo Code') ? (
                  null // Return nothing for these titles
                ) : (
                  `${promo.priceHSC} HSC / =`
                )}
              </h3>

              <p style={{ color: 'rgb(248, 180, 102)', marginBottom: '15px', fontSize: '12px' }}>
                {(promo.title === 'Pre-Used Promo Code' || promo.title === 'Get Free Promo Code') ? (
                  promo.price
                ) : (
                  promo.priceHSC !== undefined && promo.priceHSC !== null ? (
                    exchangeRate ? (
                      <>
                        {localStorage.getItem('countryCode') ? (
                          localStorage.getItem('countryCode') === '+94' ? (
                            `${promo.priceHSC * 100} LKR / =`
                          ) : (
                            `${((promo.priceHSC * 100) / exchangeRate).toFixed(2)} USD / =`
                          )
                        ) : (
                          `${promo.priceHSC * 100} LKR / ${((promo.priceHSC * 100) / exchangeRate).toFixed(2)} USD / =`
                        )}
                      </>
                    ) : (
                      'Loading exchange rate...'
                    )
                  ) : (
                    'Loading...'
                  )
                )}
              </p>

            </div>
            <button
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#444',
                backgroundColor: promo.color,
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
              onClick={promo.onClick}
            >
              {promo.buttonText}
            </button>
          </div>
        ))}
      </div>


{/* New Promocode Agents Section */}
<Box
  sx={{
    padding: 4,
    backgroundColor: 'rgba(80, 98, 94, 0.208)',
    marginTop: '40px',
    backdropFilter: 'blur(3px)',
  }}
>
<Typography
  variant="h4"
  component="h2"
  sx={{
    marginBottom: 6,
    color: 'rgba(227, 235, 235, 0.75)', // Darker, professional color
    fontWeight: '700', // Slightly bolder
    fontSize: '1.8rem', // Larger for more emphasis
    textAlign: 'center',
    letterSpacing: '0.5px', // Subtle spacing for clarity
  }}
>
💶 Travel Agents - Promo Code Promotions
</Typography>

  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      gap: 4,
    }}
  >
    {promoAgents.map((agent, index) => (
      <Box
        key={index}
        sx={{
          background: 'linear-gradient(135deg, rgba(240, 240, 255, 0.9), rgba(230, 230, 255, 0.6))',

          borderRadius: 2,
          boxShadow: 2,
          padding: 3,
          textAlign: 'center',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
          backdropFilter: 'blur(10px)',
        }}
      >
        <Avatar
          src={agent.profilePicture}
          alt={`${agent.firstName} Profile`}
          sx={{
            width: 100,
            height: 100,
            border: '2px solid rgba(119, 122, 122, 0.9)',
            margin: '0 auto 16px',
            '@media (max-width:600px)': {
              width: 80,
              height: 80,
            },
          }}
        />

        <Typography variant="h6" component="h3" sx={{ marginBottom: 1, fontWeight: '600', color: '#333'}}>
          {agent.promocode}
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          {agent.userEmail}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {/* Friend Icons */}
          {userFriends.find(friend => friend === agent.userEmail) ? (
            <IconButton onClick={() => null} title="Already a Friend">
              <FaUserCheck size={24} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleAddFriend(agent.userEmail)} title="Add as Friend">
              <FaUserPlus size={24} />
            </IconButton>
          )}

          {/* Favorite Icons */}
          {userFavorites.find(favorite => favorite === agent.promocode) ? (
            <IconButton onClick={() => null} title="Already a Favorite">
              <FaStar size={24} style={{ color: 'yellow' }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleAddFavorite(agent.promocode)} title="Add to Favorites">
              <FaStarHalfAlt size={24} />
            </IconButton>
          )}

          {/* Copy Promo Code Icon */}
          <IconButton
            onClick={() => handleCopyPromocode(agent.promocode, index)}
            title="Copy Promo Code"
          >
            {copiedPromocodeIndex === index ? <FaCheck size={24} style={{ color: 'green' }} /> : <FaCopy size={24} />}
          </IconButton>
        </Box>
      </Box>
    ))}
  </Box>
</Box>


    </div>
  );
};

export default PromoCodePage;
