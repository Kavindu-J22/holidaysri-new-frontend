import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGem, FaCrown, FaStar, FaRecycle, FaGift } from 'react-icons/fa';
import axios from 'axios';

const PromoCodePage = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const id = "677c3cf4d1f1323d5ca309a4";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/rate/get/${id}`);
        setData(response.data.rate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  const handlePurchase = (priceLKR, priceUSD, title) => {
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

    const price = countryCode === '+94' ? priceLKR : priceUSD;
    const currency = countryCode === '+94' ? 'LKR' : 'USD';

    navigate('/checkout', {
        state: { Price: price, Currency: currency, Title: title, Subject: 'Promo code Purchase' },
    });
};


  const promoCodes = [
    {
      title: 'Diamond Promo Code',
      description: (
        <>
          As a HolidaySri agent, unlock your potential by using the Diamond Promo Code. Offer exclusive discounts to advertisers and earn a remarkable <span style={{ color: 'rgb(102, 248, 224)', fontWeight: '600' }}>450 LKR</span> per advertisement. An Extra benefit we give you <span style={{ color: 'rgb(233, 235, 116)' }}>Free 2000 HSC (HolidaySri Coins).</span> You can even sell this premium promo code at the highest price, ensuring you get the most value from your efforts. Start your journey to financial success today!
        </>
      ),
      priceLKR: data.diamondPromocodeRate || 'Loading...',
      priceUSD: data.diamondPromocodeRateForeign || 'Loading...',
      buttonText: 'Purchase Now',
      color: 'rgb(52, 250, 233)',
      icon: <FaGem size={40} color="rgb(52, 250, 233)" />,
      onClick: () => handlePurchase(data.diamondPromocodeRate, data.diamondPromocodeRateForeign, 'Diamond Promo Code'),
    },
    {
      title: 'Gold Promo Code',
      description: (
        <>
          Elevate your earning potential with the Gold Promo Code. Share it with advertisers to give them exclusive discounts and earn <span style={{ color: 'rgb(240, 214, 98)', fontWeight: '600' }}>300 LKR</span> per advertisement. An Extra benefit we give you <span style={{ color: 'rgb(233, 235, 116)' }}>Free 1700 HSC (HolidaySri Coins).</span> This code provides a golden opportunity to maximize your profits while delivering value to others.
        </>
      ),
      priceLKR: data.goldPromocodeRate || 'Loading...',
      priceUSD: data.goldPromocodeRateForeign || 'Loading...',
      buttonText: 'Purchase Now',
      color: 'rgb(240, 214, 98)',
      icon: <FaCrown size={40} color="rgb(240, 214, 98)" />,
      onClick: () => handlePurchase(data.goldPromocodeRate, data.goldPromocodeRateForeign, 'Gold Promo Code'),
    },
    {
      title: 'Silver Promo Code',
      description: (
        <>
          Start earning with the Silver Promo Code. Help advertisers save money and receive <span style={{ color: '#BDC3C7', fontWeight: '600'}}>200 LKR</span> per advertisement. An Extra benefit we give you Free <span style={{ color: 'rgb(233, 235, 116)'}}>800 HSC (HolidaySri Coins).</span> Affordable and effective, this promo code is perfect for those starting their agent journey.
        </>
      ),
      priceLKR: data.silverPromocodeRate || 'Loading...',
      priceUSD: data.silverPromocodeRateForeign || 'Loading...',
      buttonText: 'Purchase Now',
      color: '#BDC3C7',
      icon: <FaStar size={40} color="#BDC3C7" />,
      onClick: () => handlePurchase(data.silverPromocodeRate, data.silverPromocodeRateForeign, 'Silver Promo Code'),
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
      onClick: () => navigate('/freePromoCodeGen'),
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
              <h3 style={{ color: 'rgb(248, 180, 102)', marginBottom: '15px', fontSize: '17px' }}>
                {(promo.title === 'Pre-Used Promo Code' || promo.title === 'Get Free Promo Code') ? (
                  promo.price
                ) : (
                  promo.priceLKR !== undefined && promo.priceUSD !== undefined ? (
                    <>
                      {localStorage.getItem('countryCode') ? (
                        <>{localStorage.getItem('countryCode') === '+94' ? promo.priceLKR : promo.priceUSD} {localStorage.getItem('countryCode') === '+94' ? 'LKR' : 'USD'}</>
                      ) : (
                        `${promo.priceLKR} LKR / ${promo.priceUSD} USD`
                      )}
                    </>
                  ) : (
                    'Loading...'
                  )
                )}
              </h3>
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
    </div>
  );
};

export default PromoCodePage;
