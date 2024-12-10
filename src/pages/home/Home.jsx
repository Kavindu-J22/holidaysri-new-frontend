import Footer from "../../components/hotel/footer/Footer";
import "./home.css";
import VehicleHeader from "../../components/vehicle/header/VehicleHeader";
import MarketPlaceHeader from "../../components/marketplace/header/MarketPlaceHeader";
import TravelPartnerHeader from "../../components/travelPartner/header/TravelPartnerHeader";
import TourGuideHeader from "../../components/tourGuide/header/TourGuideHeader";
import Homepagemmain from "../../components/hotel/landing/NewLanding"
import Newfeatured from "../../components/hotel/featured/Newfeatured";
import Newprpetylist from "../../components/hotel/propertyList/Newpropetylist";
import Tourpacnew from "../../components/tourPackages/tourPackageFeatured/Tourpacnew";
import Contact from "../../components/hotel/mailList/contact";
import Gallery from "../../components/hotel/mailList/Galary";
import AgentHeader from "../../components/agents/Agentheader";
import Agentfetuures from "../../components/agents/Agentfeturess";
import FeaturedVehicle from "../../components/vehicle/featured/FeaturedVehicle";
import VehicleList from "../../components/vehicle/vehicleList/VehicleList";
import FeaturedMarket from "../../components/marketplace/featuredMarket/FeaturedMarket";
import FeaturedMarketPlace from "../../components/marketplace/featured/FeaturedMarketPlace";

const Home = () => {
  return (
    <div className="full-home-container">
      <Homepagemmain />


      <div className="main_container">
        <div className="homeContainer" id="deswithhomecontainer">
          <Newfeatured />
          <div className="hotels" id="hotels">
            <Newprpetylist />
          </div>
        </div>
        <div className="tourPackage" id="tour-packages">
          <Tourpacnew />
        </div>
        <div className="vehicle" id="vehicles">
          <VehicleHeader />
        </div>
        
        {/* <div className="vehicleContiner" >
          <FeaturedVehicle />
          <VehicleList />
        </div>   */}

        <div className="Agents" id="Agents">
          <AgentHeader />
          <div className="agentContainer">
            <Agentfetuures />
          </div>
        </div>

        <div className="travelPartner" id="travel-partner">
          <TravelPartnerHeader />
        </div>
        {/* <div className="travelPartnerContainer" >
          <TravelPartnerFeatured />
        </div> */}
        <div className="tourGuide" id="tour-guide">
          <TourGuideHeader />
        </div>
        {/* <div className="tourGuideContainer" >
          <TourGuideFeatured />
        </div> */}
        <div className="marketplace" id="market-place">
          <MarketPlaceHeader />
        </div>
        {/* <div className="marketPlaceContainer" >
          <FeaturedMarketPlace />
          <h1 className="homeTitle">Gifts guests love</h1>
          <FeaturedMarket />
        </div>  */}
        <div className="Ctgalary" id="CT-Gallery">
          <Contact />
        </div>
        <div className="Ctgalaryto" id="CT-Galleryto">
          <Gallery />
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default Home;
