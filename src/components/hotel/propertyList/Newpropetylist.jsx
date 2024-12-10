import React, { useEffect } from 'react';
import "./propertyList.css";
import { FaHotel } from "react-icons/fa6";
import { MdApartment, MdVilla, MdCabin } from "react-icons/md";
import { GiVillage } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { Grid, Box, Button, Typography, Modal } from "@mui/material";
import AdIcon from '@mui/icons-material/Campaign'; 
import { useNavigate } from 'react-router-dom';


function ProgressBar() {
    useEffect(() => {
        const valueDisplaycounts = document.querySelectorAll(".upnums");
        const contInterval = 4000;

        valueDisplaycounts.forEach((valueDisplaycount) => {
            let startValue = 0;
            const endValue = parseInt(valueDisplaycount.getAttribute("data-val"));

            const duration = Math.floor(contInterval / endValue);
            const counter = setInterval(() => {
                startValue += 1;
                valueDisplaycount.textContent = startValue;
                if (startValue === endValue) {
                    clearInterval(counter);
                }
            }, duration);

            return () => clearInterval(counter);
        });
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

    return (
        <div className='myProgressBar' id='progressbarAvailable'>
            <div className='honecontentdiv'>
            <h1 className="homeTitlen">Browse by property type :</h1>
            <div className='myProgressBar-wrapper'>

                <div className='myProgressBar-container'>
                <div>
                    <div><img src='https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=' /></div>
                    <div className='forPlussmark'><span className='upnums' data-val="33">000</span><p>+</p></div>
                    <span className='upnumsText'>Hotels</span>
                    <Link to={`/all-hotels?category=${"Hotels"}`} className='bpexbtn'>Explore</Link>
                </div>
                </div>

                <div className='myProgressBar-container'>
                <div>
                    <div><img src='data:image/jpeg;base64,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' /></div>
                    <div className='forPlussmark'><span className='upnums' data-val="60">000</span><p>+</p></div>
                    <span className='upnumsText'>Restaurants</span>
                    <Link to={`/all-hotels?category=${"Restaurants"}`} className='bpexbtn'>Explore</Link>
                </div>
                </div>

                <div className='myProgressBar-container'>
                <div >
                <div><img src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg' /></div>
                    <div className='forPlussmark'><span className='upnums' data-val="48">000</span><p>+</p></div>
                    <span className='upnumsText'>Apartments</span>
                    <Link to={`/all-hotels?category=${"Apartments"}`} className='bpexbtn'>Explore</Link>
                </div>
                </div>

                <div className='myProgressBar-container'>
                <div>
                <div><img src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg' /></div>
                    <div className='forPlussmark'><span className='upnums' data-val="59">00</span><p>+</p></div>
                    <span className='upnumsText'>Resorts</span>
                    <Link to={`/all-hotels?category=${"Resorts"}`} className='bpexbtn'>Explore</Link>
                </div>
                </div>

                <div className='myProgressBar-container'>
                <div>
                <div><img src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg' /></div>
                    <div className='forPlussmark'><span className='upnums' data-val="42">00</span><p>+</p></div>
                    <span className='upnumsText'>Villas</span>
                    <Link to={`/all-hotels?category=${"Villas"}`} className='bpexbtn'>Explore</Link>
                </div>
                </div>

                <div className='myProgressBar-container'>
                <div>
                <div><img src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg' /></div>
                    <div className='forPlussmark'><span className='upnums' data-val="12">00</span><p>+</p></div>
                    <span className='upnumsText'>Bungalows</span>
                    <Link to={`/all-hotels?category=${"Bungalows"}`} className='bpexbtn'>Explore</Link>
                </div>
                </div>
            </div>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '5px', // Adjust spacing as needed
                marginBottom: '25px',
              }}
            >
                  <Button
            variant="contained"
            startIcon={<AdIcon />}
            onClick={handleAddClick}
            sx={{
              backgroundColor: '#065a60',
              color: '#fff',
              padding: '10px 20px', // Increase padding (top/bottom, left/right)
              borderRadius: '12px', // Increase border radius
              fontSize: '12px', // Optional: increase font size
              '&:hover': {
                backgroundColor: '#0a9396',
              },
            }}
                >
                  Post Your property
                </Button>
            </Box>

            </div>
        </div>
    );
}

export default ProgressBar;
