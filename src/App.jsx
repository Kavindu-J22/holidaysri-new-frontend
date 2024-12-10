import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Register from "./components/hotel/Register/Register";
import Destination from "./pages/destinations/Destination";
import Loader from "./components/loader/Loader";
import LoginMobile from "./components/hotel/Login/LoginMobile";
import Seller from "./pages/Seller/Seller";
import Location from "./pages/Locations/Location";
import LocalVehicleForm from "./components/agents/Local Agents/LocalVehicle";
import Events from "./pages/events/Events";
import Vehicles from "./pages/vehicles/Vehicle";
import PurchasePromoCodePage from "./components/referral/purchasepromocode";
import CheckoutPage from "./components/referral/Checkout";
import LocalAgentDashboard from "./components/agents/Local Agents/localDashboard.";
import ForeignAgentDashboard from "./components/agents/Foreign Agents/ForeignAgDashboard";
import Newlanding from "./components/hotel/landing/NewLanding";
import AdmminPanel from "./components/Addmin/AdminPanel";
import AllLocation from "./pages/alllocations/Locations";
import Test from "./pages/destinations/Test";
import AllVehicles from "./pages/vehicles/Allvehicles";
import AddHotel from "./components/hotel/AddHotel/AddHotel";
import Destination2 from "./pages/destinations/Destination2";
import About from "./components/About/About";
import Marcketplace from "./pages/marcketplace/Marcketplace";
import Food from "./pages/foods/Foods";
import TourGuide from "./pages/tourguide/TourGuide";
import Partner from "./pages/partner/Partner";
import EventComponent from "./pages/Locations/Addevent";
import Allparnters from "./pages/partner/Allparnters";
import Alltourguides from "./pages/tourguide/Alltourguides";
import Allmarcketplace from "./pages/marcketplace/Allmarcketplace";
import Addpackage from "./pages/Packages/Addpackage";
import Allpackages from "./pages/Packages/Allpackages";
import Packagedata from "./pages/Packages/Packagedata";
import HotelMain from "./components/hotel/AddHotel/HotelMain";
import PrivecyPolicy from "./components/About/privecypolicy";
import LocationHotel from "./components/hotel/AddHotel/LocationHotel";
import AddaHotel from "./components/hotel/AddHotel/AddaHotel";
import AddHotelForm from "./components/hotel/AddHotel/AddHotel";
import TextPage from "./components/Offers/Offers";
import BookingPage from "./components/Booking/booking";
import SubscriptionPage from "./components/Payments/payment";
import Allevents from "./pages/events/Allevents";
import AllHotels from "./components/hotel/AddHotel/AllHotel";
import RecordsPage from "./components/Earns/Earning";
import WholeEvents from "./pages/events/Whole";
import Access from "./components/About/Access";
import NotFound from "./components/About/NotFound";
import AllvehiclesCategory from "./pages/vehicles/AllvehiclesCategory";
import AllFoods from "./pages/foods/AllFoods";
import AddProduct from "./components/marketplace/AddMarcketplace/AddProduct";
import AllpartnersCategory from "./pages/partner/AllpartnerCategory";
import AllmarketsCategory from "./pages/marcketplace/AllmarketCategories";
import AddRideForm from "./pages/liveride/addliveride";
import AddMonthRideForm from "./pages/liveride/addmonthliveride";
import AllridesCategory from "./pages/liveride/AllRideCategories";
import Newliverides from "./pages/liveride/liveridesNew";
import TermsandCondition from "./components/About/TermsandCondition";
import RefundPolicy from "./components/About/RefundPolicy";
import PayHereForm from "./components/Payments/PayHereForm";
import PayHerePage from "./components/Payments/PayHerePage";
import LocalPackageAdd from "./components/agents/Local Agents/LocalPackageAdd";
import Localpackages from "./pages/Packages/Localpackages";
import ReactivatePromoCodePage from "./components/referral/ReactivatePromoCode"
import AddForm from "./components/hotel/AddHotel/AddForm";
import AddVehicleForm from "./components/agents/Local Agents/AddVehicleForm";
import AddeventForm from "./pages/Locations/AddeventForm";
import AddSellerForm from "./pages/Seller/AddSellerForm";
import AddLocalPackageForm from "./components/agents/Local Agents/AddLocalPackageForm";
import Earns from "./components/referral/Earns";
import AllPaymentRequests from "./components/referral/PaymentRequest";
import AllEarns from "./components/referral/AllEarns";
import AllPayments from "./components/referral/AllPayments";
import AllArchivedEarns from "./components/referral/ArchivedEarns";
import AddFormAdmin from "./components/hotel/AddHotel/AdminHotelAdd";
import CheckoutPageUpdate from "./components/referral/CheckoutUpdate";
import PayHerePageUpdated from "./components/Payments/PayHereUpdated";
import CheckoutPageUsers from "./components/referral/CheckoutUsers";
import PayHerePageGuides from "./components/Payments/PayHereGuides";
import PayHerePageUsers from "./components/Payments/PayHereUsers";
import PayHerePageLive from "./components/Payments/PayHereLive";
import BackToTop from "./components/backtoTopBTN/BackToTop";
import ForgotPassword from "./components/hotel/Login/ForgotPassword";
import ResetPassword from "./components/hotel/Login/ResetPassword";
import PasswordResetSent from "./components/hotel/Login/Resetmesegsent";
import MuDashboard from "./components/hotel/landing/MuDashbord";
import FoodAdd from "./pages/Seller/FoodAdd";
import GuiderDashboard from "./components/tourGuide/guideDashbord/guiderDashboars";
import PartnerDashboard from "./pages/partner/partnerDashboard/PartnerDashboard";
import ExpiredAddPage from "./components/agents/Local Agents/ExpiredAdds";
import HotelRenewPage from "./components/agents/Renew Advertiesments/HotelRenew";
import VehicleRenewPage from "./components/agents/Renew Advertiesments/VehicleRenew"
import LiveRideRenewPage from "./components/agents/Renew Advertiesments/LiveRideRenew"
import GuiderProfileRenewPage from "./components/agents/Renew Advertiesments/GuiderProfileRenew"
import PartnerProfileRenewPage from "./components/agents/Renew Advertiesments/PartnerProfileRenew"
import PayDailyLiveRide from "./components/Payments/payhereaddDaily"
import CustamizeWeddingForm from "./components/tourPackages/custamizePackages/CustamizeWeddingForm"
import PrisingNew from "./components/prising"
import RequestFreePromocode from "./components/agents/promocodes/RequestFreePromocode"
import ManageFreePromoCodeRequests from "./components/Addmin/ManageFreeReqPromo"

// new

import NewNav from "./components/new-Change/navbar"



const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change 3000 to the desired loading time in milliseconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // Show Loading component when loading
  }

  return (
    <BrowserRouter>
      <BackToTop />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginMobile />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/add-food" element={<FoodAdd />} />

        <Route path="/seller-form" element={<AddSellerForm />} />

        <Route path="/location" element={<Location />} />
        <Route path="/add-vehicle" element={<LocalVehicleForm />} />
        <Route path="/add-local-package" element={<LocalPackageAdd />} />
        <Route path="/add-vehicle-form" element={<AddVehicleForm />} />
        <Route
          path="/add-local-package-form"
          element={<AddLocalPackageForm />}
        />

        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/all-locations" element={<AllLocation />} />
        <Route path="/destinationa/:id" element={<Destination />} />
        <Route path="/events/:id" element={<Events />} />
        <Route path="/rides" element={<Vehicles />} />
        <Route path="/local-packages" element={<Localpackages />} />

        <Route path="/local-dashboard" element={<LocalAgentDashboard />} />
        <Route path="/foreign-dashboard" element={<ForeignAgentDashboard />} />
        <Route path="/landing" element={<Newlanding />} />
        <Route path="/admin" element={<AdmminPanel />} />
        <Route path="/destination/:id" element={<Destination2 />} />
        <Route path="/all-vehicles" element={<AllVehicles />} />
        <Route path="/all-partners" element={<Allparnters />} />
        <Route path="/all-tourguides" element={<Alltourguides />} />
        <Route path="/all-packages" element={<Allpackages />} />
        <Route path="/all-Events" element={<Allevents />} />
        <Route
          path="/all-vehicles-category"
          element={<AllvehiclesCategory />}
        />

        <Route path="/privecy-policy" element={<PrivecyPolicy />} />
        <Route path="/terms-and-conditon" element={<TermsandCondition />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-event" element={<EventComponent />} />
        <Route path="/add-event-form" element={<AddeventForm />} />

        <Route path="/add-package" element={<Addpackage />} />
        <Route path="/add-Hotel" element={<AddaHotel />} />
        <Route path="/add-Hotel-Form" element={<AddForm />} />
        <Route path="/add-Hotel-admin" element={<AddFormAdmin />} />

        <Route path="/addhotel" element={<AddHotelForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/marcketplace" element={<Marcketplace />} />
        <Route path="/all-marcketplace" element={<Allmarcketplace />} />
        <Route path="/food/:id/:locationName" element={<Food />} />
        <Route path="/tourguide/:id/:locationName" element={<TourGuide />} />
        <Route path="/partner/:id/:locationName" element={<Partner />} />
        <Route path="/Hotelmain/:id/:locationName" element={<HotelMain />} />
        <Route path="/package" element={<Packagedata />} />
        <Route path="/all-hotels" element={<HotelMain />} />
        <Route path="/hotel" element={<LocationHotel />} />
        <Route
          path="/purchase-promo-code"
          element={<PurchasePromoCodePage />}
        />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/rates" element={<TextPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route path="/allhotels" element={<AllHotels />} />
        <Route path="/everyevent" element={<WholeEvents />} />
        <Route path="/earn" element={<RecordsPage />} />
        <Route path="/partner-section" element={<AllpartnersCategory />} />
        <Route path="/market-section" element={<AllmarketsCategory />} />
        <Route path="/add-live-ride" element={<AddRideForm />} />
        <Route path="/add-Month-live-ride" element={<AddMonthRideForm />} />
        <Route path="/live-rides" element={<AllridesCategory />} />
        <Route path="/newliveride" element={<Newliverides />} />
        <Route path="/reactivate" element={<ReactivatePromoCodePage />} />
        <Route path="/earns" element={<Earns />} />
        <Route path="/payrequest" element={<AllPaymentRequests />} />
        <Route path="/allearns" element={<AllEarns />} />
        <Route path="/allpayments" element={<AllPayments />} />
        <Route path="/archivedearns" element={<AllArchivedEarns />} />
        <Route path="/checkupdate" element={<CheckoutPageUpdate />} />
        <Route path="/checkusers" element={<CheckoutPageUsers />} />

        <Route path="/allfoods" element={<AllFoods />} />

        <Route path="/access" element={<Access />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/payhere" element={<PayHereForm />} />
        <Route path="/payherepage" element={<PayHerePage />} />
        <Route path="/payheupdate" element={<PayHerePageUpdated />} />
        <Route path="/payguiupdate" element={<PayHerePageGuides />} />
        <Route path="/paypartupdate" element={<PayHerePageUsers />} />
        <Route path="/payliveupdate" element={<PayHerePageLive />} />

        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/resetpwmsgpage" element={<PasswordResetSent />} />

        <Route path="/MainuserDashboard" element={<MuDashboard />} />
        <Route path="/Guider-Dashboard" element={<GuiderDashboard />} />
        <Route path="/Partner-Dashboard" element={<PartnerDashboard />} />

        <Route path="/expiredaddpage" element={<ExpiredAddPage />} />
        <Route path="/Hotel-renew" element={<HotelRenewPage />} />
        <Route path="/Vehicle-renew" element={<VehicleRenewPage />} />
        <Route path="/MonthlyRide-renew" element={<LiveRideRenewPage />} />
        <Route path="/GuiderProf-renew" element={<GuiderProfileRenewPage />} />
        <Route path="/PartnerProf-renew" element={<PartnerProfileRenewPage />} />

        <Route path="/payheredailypay" element={<PayDailyLiveRide />} />

        <Route path="/custamizeWedding" element={<CustamizeWeddingForm />} />

        <Route path="/prising" element={<PrisingNew />} />

        <Route path="/requestFreePromocode" element={<RequestFreePromocode />} />
        <Route path="/manageFreePromoCodeRequests" element={<ManageFreePromoCodeRequests />} />


       {/* new  */}

       <Route path="/newNav" element={<NewNav />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
