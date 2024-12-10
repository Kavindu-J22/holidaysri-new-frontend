import React, { useRef, useEffect, useState } from "react";
import img1 from "../../../assets/feimg1.jpg";
import img2 from "../../../assets/feimg2.jpg";
import img3 from "../../../assets/feimg3.jpg";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import { Grid, Box, Button, Typography, Modal } from "@mui/material";
import AdIcon from '@mui/icons-material/Campaign'; 
import { useNavigate } from 'react-router-dom';

function PopularDestinations() {
  const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds
  
      return () => clearInterval(intervalId);
    }, [images]);
  
    return (
      <img   src={images[currentImageIndex]}
      alt={`Location Image ${currentImageIndex + 1}`} loading="lazy" />

      
    );
  };
  AOS.init({ duration: 1000 });
  const gridRef = useRef(null);
  const colombo = [
    "https://www.andbeyond.com/wp-content/uploads/sites/5/colombo-sri-lanka.jpg",
    "https://www.cunard.com/content/dam/cunard/inventory-assets/ports/CLB/CLB.jpg",
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/og9ytzikvohsybtom0dj/Colombo%20City%20Half%20Day%20Tour.jpg",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733340105/image_473433260f_ygg7wd.webp",
    "https://assets.airtrfx.com/media-em/ul/cities/colombo-CMB.jpg",
  ];
  const kandy = [
    
    "https://whc.unesco.org/uploads/thumbs/site_0450_0020-1200-630-20151105154018.jpg",
    "https://cdn.kimkim.com/files/a/images/ecbe56e399c3923af4a252257ca8bbf695889832/original-87b0d9e056e5fc5c9f185869168c0de0.jpg",
    "https://overatours.com/wp-content/uploads/2021/10/Kandy-Lake-view-Kandy-in-Sri-Lanka.jpg",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733340237/Slide4_z91fc5.webp",
    "https://www.tourslanka.com/wp-content/uploads/2018/02/Kandy-City-Sri-Lanka.jpg",
  ];
  const galle = [
    "https://www.heritancehotels.com/ahungalla/wp-content/uploads/sites/20/2019/09/heritance-hotels-ahungalla-2-1.jpg",
    "https://images.musement.com/cover/0003/45/sri-lanka-ahungalla-beach-with-boats-fotolia-jpg_header-244613.jpeg",
    "https://www.pelago.co/img/products/LK-Sri%20Lanka/coastal-ride-to-galle-from-ahungalla/ff02fd32-fead-4311-9210-0736f81cb563_coastal-ride-to-galle-from-ahungalla-medium.jpg",
    "https://www.andbeyond.com/wp-content/uploads/sites/5/Fortress-Resort-Galle-Locals-Fishing-and-Balancing-On-Sticks-In-the-Sea.jpg",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733340318/galle-feat-2_cwanlq.webp",
  ];
  const image = [
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351053/dinuka-lankaloka-2KMQwHFvHew-unsplash_iiiril_grj981.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351051/pexels-domenicobertazzo-4769075_ynmga5_udljfa.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351050/pexels-elina-sazonova-4403902_ewixcc_tfheey.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351050/pexels-msahirs-10727551_fzhddu_aled1u.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351048/fredrik-ohlander-ETqneTbwPdI-unsplash_tolixz_qr6xgw.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351046/pexels-tomas-malik-793526-1998439_pqevvr_e1570o.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351045/pexels-charith-kodagoda-14023536_uycnhn_froq37.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351039/kevin-olson-ScBHbYokiQE-unsplash_g2lff6_jcuhav.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351038/pexels-michael-swigunski-3825040-6045035_kkibs4_cjxbsd.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351037/dinuka-lankaloka-KRezxB3pr5A-unsplash_kppsqd_wyobwy.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351037/christoph-theisinger-9PPYa3LK6II-unsplash_frxn5m_irc9d3.webp",
    "https://res.cloudinary.com/dqdcmluxj/image/upload/v1733351034/jessica-knowlden-lUpg5bCRPX8-unsplash_cbudpp_dnbanh.webp",
  ];
  useEffect(() => {
    const gridElement = gridRef.current;

    const scrollRight = () => {
      if (gridElement) {
        gridElement.scrollLeft += 1;

        if (
          gridElement.scrollLeft >=
          gridElement.scrollWidth - gridElement.clientWidth
        ) {
          gridElement.scrollLeft = 0;
        }

        requestAnimationFrame(scrollRight);
      }
    };

    const animationId = requestAnimationFrame(scrollRight);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const navigate = useNavigate();

  const handleAddClick = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'seller') {
      navigate('/foreign-dashboard');
    } else if (userRole === 'agent') {
      navigate('/local-dashboard');
    } else {
      navigate('/prising');
    }
  };


  const renderLogos = () => {
    const repetitions = 20;
    let count = 0;
    const logoElements = [];

    while (count < repetitions) {
      image.forEach((image, index) => {
        logoElements.push(
          <img
            key={`${index}-${count}`}
            src={image}
            alt={`image${index + 1}`}
            style={{
              margin: "8px",
              width: "70%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "30px",
            }}
          />
        );
      });

      count++;
    }

    return <>{logoElements}</>;
  };
  return (
    <section className="popular" id="destination">
      <div className="container">
        <p className="section-subtitle">hOLIDAY SRI</p>
        <h2 className="h2 section-title">Discover your perfect <span className="keywordcolor">Destination</span></h2>
        <p className="section-text">
          Explore the ideal getaway for you with Holidaysri - personalized
          destinations tailored to your interests and dreams.
        </p>
        <Box className="frist-slideshow"
          marginTop={{ lg: "32px", xs: "32px" }}
          marginBottom={{ lg: "32px", xs: "32px" }}
          marginRight={{ lg: "-20%" }}
          sx={{
            height: { lg: "250px" },
            width: { lg: "96.7%" },
            marginLeft: { lg: "40px" },
            borderRadius: { lg: "20px", xs: "16px" },
            overflowX: "auto",
            overflow: "hidden",
            animation: "scrollRight 60s linear infinite",
          }}
        >
          <Grid
            container
            sx={{
              flexWrap: "nowrap",
              display: "flex",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                height: { lg: "250px", xs: "200px" },
                overflowX: "auto",
                overflow: "hidden",
              }}
              ref={gridRef}
            >
              <Grid
                container
                sx={{
                  marginTop: { lg: "16px", xs: "16px" },
                  flexWrap: "nowrap",
                  display: "flex",
                  height: { lg: "200px", xs: "150px" },
                }}
              >
                {renderLogos()}
              </Grid>
            </Box>
          </Grid>
        </Box>
        <Box sx={{ marginLeft: { lg: "39px" } }}>
          <ul className="popular-list">
            <li>
              <div className="popular-card">
                <figure className="card-img">
                <ImageSlider images={kandy} />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                  </div>
                  <a href="/destination/65f2c1bac6f9894f6cbc4627">
                    
                    <h3 className="h3 card-title">
                      <a href="#">Kandy</a>
                    </h3>
                    <p className="card-text">
                      Discover Kandy: Sri Lanka's cultural and scenic gem.{" "}
                    </p>
                  </a>
                </div>
              </div>
            </li>
            <li>
              <div className="popular-card">
                <figure className="card-img">
                <ImageSlider images={galle} />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                  </div>
                  <a href="/destination/65f3ffbd81282237adb179f8">
                    
                    <h3 className="h3 card-title">
                      <a href="#">Galle</a>
                    </h3>
                    <p className="card-text">
                      Historic Galle: Coastal beauty and colonial charm.
                    </p>
                  </a>
                </div>
              </div>
            </li>
            <li>
              <div className="popular-card">
                <figure className="card-img">
                <ImageSlider images={colombo} />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                    <ion-icon name="star">
                      <FaStar />
                    </ion-icon>
                  </div>
                  <a href="/destination/65f3fe1081282237adb179f4">
                    
                    <h3 className="h3 card-title">
                      <a href="#">Colombo</a>
                    </h3>
                    <p className="card-text">
                      Discover vibrant culture in Colombo, Sri Lanka
                    </p>
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <a href="/all-locations">
            <button className="btn btn-primary">More destination</button>
          </a>

          <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '25px', // Adjust spacing as needed
              }}
            >
                  <Button
            variant="contained"
            startIcon={<AdIcon />}
            onClick={handleAddClick}
            sx={{
              backgroundColor: '#065a60',
              color: '#fff',
              padding: '12px 24px', // Increase padding (top/bottom, left/right)
              borderRadius: '12px', // Increase border radius
              fontSize: '12px', // Optional: increase font size
              '&:hover': {
                backgroundColor: '#0a9396',
              },
            }}
                >
                  Post Your Advertisement
                </Button>
            </Box>

        </Box>
      </div>
    </section>
  );
}

export default PopularDestinations;
