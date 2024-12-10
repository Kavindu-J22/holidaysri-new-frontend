import AOS from 'aos';
import './agentfe.css';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Button, Typography, Modal } from "@mui/material";
import AdIcon from '@mui/icons-material/Campaign'; 

const Agentfetuures = () => {
  const navigate = useNavigate();

  const handleAgentClick = (type) => {
    const userRole = localStorage.getItem('userRole');
    const subRole = localStorage.getItem('subRole');

    if (userRole === 'agent') {
      if (type === 'local') {
        if (subRole === 'Local Agent') {
          navigate('/local-dashboard');
          alert('Welcome to Local Agent Dashboard');
        } else if (subRole === 'Foreign Agent') {
          alert('You are a Foreign Agent right now. You can\'t access the Local Agent Dashboard. Try to connect with your Foreign Agent Dashboard. If you need access to the Local Agent Dashboard, sign in/sign up as a Local Agent.');
        }
      } else if (type === 'foreign') {
        if (subRole === 'Foreign Agent') {
          navigate('/local-dashboard');
          alert('Welcome to Foreign Agent Dashboard');
        } else if (subRole === 'Local Agent') {
          alert('You are a Local Agent right now. You can\'t access the Foreign Agent Dashboard. Try to connect with your Local Agent Dashboard. If you need access to the Foreign Agent Dashboard, sign in/sign up as a Foreign Agent.');
        }
      }
    } else {
      navigate('/access');
    }
  };

  const handleAddClick = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'agent') {
      navigate('/local-dashboard');
    } else {
      navigate('/prising');
    }
  };

  AOS.init({ duration: 1000 });

  return (
    <div className="agentfemaincont">
      <div className="agffedisccipbox">
        <h1>Get your <span className="keywordcolor">Agent code</span></h1>
        <p>What is the Agent Code ? - Buy A Code For Earn Money!</p>
        <p>Imagine a life where your love for travel not only fulfills your wanderlust but also fills your pockets with endless earnings. At HolidaySRI, we're offering you the chance to turn your passion for exploration into a lifetime of income!</p>

        <Box
              sx={{
                display: 'flex',
                justifyContent: 'left',
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
                  Promote Advertisements with Agent Code
                </Button>
            </Box>

      </div>

      <div className="agentfeimgbox">

        <div className='agfecentr'>
          <div className='front-face ff1'>
            <div className='contentafe front'>
              <p>Local Agent code</p>
              <span>Unveil the treasures of your hometown, sharing insider knowledge and personalized experiences with travelers</span>
            </div>
          </div>
          <div className='back-face bb1'>
            <div className='contentafe back'>
              <h2>Local Agent code</h2>
              <a onClick={() => handleAgentClick('local')}>Connect Now</a>
            </div>
          </div>
        </div>

        <div className='agfecentr'>
          <div className='front-face ff2'>
            <div className='contentafe front'>
              <p>Foreign Agent code</p>
              <span>Embark on a journey to distant lands, offering cultural immersion and unforgettable adventures to global explorers</span>
            </div>
          </div>
          <div className='back-face bb2'>
            <div className='contentafe back'>
              <h2>Foreign Agent code</h2>
              <a onClick={() => handleAgentClick('foreign')}>Connect Now</a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};


export default Agentfetuures;
