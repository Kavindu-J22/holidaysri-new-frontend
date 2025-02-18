import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Box,
    Checkbox,
    FormControlLabel,
    Chip,
    IconButton,
    Paper, 
    List, 
    ListItem, 
    ListItemText,
    CircularProgress,
    Avatar,
    Snackbar,
    Alert,
    Radio,
    RadioGroup,
    FormLabel,
    Modal,
    useMediaQuery,
  } from '@mui/material';
  import { ArrowForward, ArrowBack, Add, Close } from '@mui/icons-material';
  import { IoIosImages } from "react-icons/io";
  import { useTheme } from "@mui/material/styles";
  import Swal from "sweetalert2";

const provincesAndDistricts = {
    "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
    "Eastern Province": ["Ampara", "Batticaloa", "Trincomalee"],
    "Northern Province": ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
    "Southern Province": ["Galle", "Hambantota", "Matara"],
    "Western Province": ["Colombo", "Gampaha", "Kalutara"],
    "North Western Province": ["Kurunegala", "Puttalam"],
    "North Central Province": ["Anuradhapura", "Polonnaruwa"],
    "Uva Province": ["Badulla", "Monaragala"],
    "Sabaragamuwa Province": ["Kegalle", "Ratnapura"]
  };

const AddHotel = () => {
  const [step, setStep] = useState(1);
  const [hotelData, setHotelData] = useState({
    hotelName: '',
    userEmail: localStorage.getItem('userEmail'),
    category: '',
    description: '',
    climate: '',
    location: {
      address: '',
      city: '',
      province: '',
      mapUrl: '',
    },
    contactInfo: {
      email: '',
      contactNumber: '',
      whatsappNumber: '',
      facebookUrl: '',
      websiteUrl: '',
    },
    rooms: [],
    facilities: {
      internet: false,
      parking: false,
      bbqFacilities: false,
      chef: false,
      cctv: false,
      swimmingPool: false,
      gym: false,
      spa: false,
      kidsPlayArea: false,
      roomService: false,
      restaurant: false,
      laundryService: false,
      airportShuttle: false,
      petFriendly: false,
      smokingArea: false,
      garden: false,
      library: false,
      gameRoom: false,
      conferenceRoom: false,
      banquetHall: false,
      yogaDeck: false,
      privateBeach: false,
      sauna: false,
      bar: false,
      wheelchairAccess: false,
      electricVehicleCharging: false,
      firepit: false,
      hikingTrails: false,
      bikeRental: false,          // For guests who want to explore the area on bicycles
      rooftopTerrace: false,      // A scenic outdoor space for relaxation or events
      wineCellar: false,          // For wine enthusiasts or private tastings
      movieTheater: false,        // An in-house theater for entertainment
      coworkingSpace: false,      // For remote workers or business travelers
      picnicArea: false,          // Outdoor space for picnics and gatherings
      fishingPond: false,         // For recreational fishing
      tennisCourt: false,         // For sports enthusiasts
      golfCourse: false,          // For guests interested in golfing
      skiStorage: false,          // For winter sports enthusiasts
      babysittingService: false,  // For families traveling with young children
      meditationRoom: false,      // A quiet space for mindfulness and relaxation
      rooftopPool: false,         // A pool with a view, often on the rooftop
      artGallery: false,          // For cultural or artistic experiences
      farmToTableDining: false,   // Featuring locally sourced meals
      outdoorJacuzzi: false,      // A hot tub for relaxation outdoors
      birdWatchingArea: false,    // For nature enthusiasts
      EVChargingStation: false,   // For electric vehicle owners (alternative to electricVehicleCharging)
      rooftopBar: false,          // A bar with a view, often on the rooftop
      karaokeRoom: false,         // For entertainment and group activities      
    },
    diningOptions: {
      breakfastIncluded: false,
      breakfastInfo: '',
      breakfastCharge: null,
      restaurantOnSite: false,
      restaurantInfo: '',
    },
    policies: {
      allowsLiquor: false,
      allowsSmoking: false,
      cancellationPolicy: '',
      checkInTime: '',
      checkOutTime: '',
      pets: false,
      petPolicyDetails: '',
      parties: false,
      partyPolicyDetails: '',
      childPolicy: '',
      ageRestriction: false,
      minimumCheckInAge: null,
      damageDeposit: false,
      damageDepositAmount: null,
      refundPolicy: '',
      noShowPolicy: '',
      lateCheckOutPolicy: '',
      earlyCheckInPolicy: '',
      quietHours: '',
      additionalCharges: '',
      taxAndCharges: false,
      taxAndChargesAmount: null,
      acceptedpaymentmethods: [],
    },
    activities: {
      onsiteActivities: [],
      nearbyAttractions: [], // this for nearby locations
      nearbyActivities: [], // this for nearby Attractions and Activities
    },
    images: [],
    otherInfo: [],
    isHaveStars: false,
    howManyStars: null,
    isVerified: false,
    isHaveCertificate: false,
    isHaveLicense: false,
    acceptTeams: false,
    displayPriceMain: null,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [errorAlert, setErrorAlert] = useState('');
  const [warnings, setWarnings] = useState({});
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const id = "677c3cf4d1f1323d5ca309a4";
  const [hotelAdvertiseRate, setHotelAdvertiseRate] = useState(null);
  const [hotelRoomAditionalRoomRate, setHotelRoomAditionalRoomRate] = useState(null);
  const [totalAdditionalCost, setTotalAdditionalCost] = useState(0); // State to track total additional cost
  const [openTerms, setOpenTerms] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
        try {
        const response = await axios.get('https://holidaysri-backend.onrender.com/location/');
        setLocations(response.data);
        } catch (error) {
        console.error('Error fetching locations:', error);
        }
    };
    fetchLocations();
    }, []);

    useEffect(() => {
      async function fetchRateData() {
        try {
          // Fetch rate data based on the id
          const response = await axios.get(`https://holidaysri-backend.onrender.com/rate/get/${id}`);
          setData(response.data.rate);
          setHotelAdvertiseRate(response.data.rate.hotelAdvertiseRate / response.data.rate.HSCRate);
          setHotelRoomAditionalRoomRate(response.data.rate.hotelRoomAditionalRoomRate / response.data.rate.HSCRate);

        } catch (error) {
          console.error('Error fetching rate data:', error);
        }
      }
    
      fetchRateData();
    }, [id]); // Dependency array includes only id

  const filteredNearbyAttractions = (input) => {
        return locations.filter(location =>
          location.locationName.toLowerCase().includes(input.toLowerCase())
        );
      };

 const handleNearbyAttractionsInputChange = (e) => {
        const value = e.target.value;
        setHotelData(prevState => ({
          ...prevState,
          activities: {
            ...prevState.activities,
            nearbyAttractionsInput: value,
            showNearbySuggestions: value.length > 0,
          },
    }));
 };

 const addNearbyAttraction = (attraction) => {
    setHotelData(prevState => ({
      ...prevState,
      activities: {
        ...prevState.activities,
        nearbyAttractions: [...prevState.activities.nearbyAttractions, attraction.locationName],
        nearbyAttractionsInput: '', // Clear input
        showNearbySuggestions: false, // Hide suggestions
      },
    }));
  };

  const removeNearbyAttraction = (index) => {
    setHotelData(prevState => ({
      ...prevState,
      activities: {
        ...prevState.activities,
        nearbyAttractions: prevState.activities.nearbyAttractions.filter((_, i) => i !== index),
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setHotelData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setHotelData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
        // Clear errors when user types
        setErrors({
            ...errors,
            [name]: ''
          });
  };

  const handleRoomChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedRooms = [...hotelData.rooms];
  
    // Step 1: Update the room data
    updatedRooms[index] = {
      ...updatedRooms[index],
      ...(name in updatedRooms[index]
        ? { [name]: type === 'checkbox' ? checked : value } // Handle non-nested properties
        : { pricing: { ...updatedRooms[index].pricing, [name]: value } } // Handle nested properties
      ),
    };
  
    // Update the hotelData state
    setHotelData((prevState) => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  
    // Step 2: Revalidate the specific field and update errors
    const fieldErrorKey = `room${index}_${name}`; // Construct the error key (e.g., "room0_roomName")
    if (value.trim()) {
      // If the field is no longer empty, remove the error
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[fieldErrorKey]; // Remove the error for this field
        return newErrors;
      });
    } else {
      // If the field is empty, add the error
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldErrorKey]: `${name} is required`, // Add the error for this field
      }));
    }
  
    // Step 3: Revalidate discountForPromo and EarnRateForPromo if roomOpenForAgents is true
    if (name === 'roomOpenForAgents') {
      const room = updatedRooms[index];
      if (room.roomOpenForAgents) {
        if (!room.discountForPromo) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [`room${index}_discountForPromo`]: 'Discount for Promo is required',
          }));
        }
        if (!room.EarnRateForPromo) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [`room${index}_EarnRateForPromo`]: 'Earn Rate for Promo is required',
          }));
        }
      } else {
        // If roomOpenForAgents is false, remove discountForPromo and EarnRateForPromo errors
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`room${index}_discountForPromo`];
          delete newErrors[`room${index}_EarnRateForPromo`];
          return newErrors;
        });
      }
    }
  };


  const addRoom = () => {
    // Check if the number of rooms exceeds 3
    if (hotelData.rooms.length >= 3) {
      // Alert the user about the additional cost
      alert(`You can add 3 room Units free. If you add more room Units, each Unit will cost an additional ${hotelRoomAditionalRoomRate} HSC.`);

      // Calculate the additional cost and update the total additional cost
      setTotalAdditionalCost(prevCost => prevCost + hotelRoomAditionalRoomRate);
    }

    // Add the new room to the rooms array
    setHotelData(prevState => ({
      ...prevState,
      rooms: [...prevState.rooms, {
        roomName: '',
        type: '',
        capacity: null,
        beds: null,
        roomDescription: '',
        pricePerNight: null,
        pricePerFullDay: null,
        pricing: {
          fullboardPrice: null,
          fullboardinclude: [],
          halfboardPrice: null,
          halfboardinclude: [],
        },
        isAvailable: true,
        amenities: [],
        images: [],
        noOfRooms: null,
        roomOpenForAgents: false,
        discountForPromo: null,
        EarnRateForPromo: null,
      }]
    }));
  };

  const removeRoom = (index) => {
    // Remove the room from the rooms array
    const updatedRooms = hotelData.rooms.filter((_, i) => i !== index);
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms
    }));
  
    // Recalculate the total additional cost based on the updated rooms array
    const roomsExceedingLimit = Math.max(updatedRooms.length - 3, 0); // Calculate how many rooms exceed the limit
    setTotalAdditionalCost(roomsExceedingLimit * hotelRoomAditionalRoomRate);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      setUploading(true);
      const { data } = await axios.post('https://api.cloudinary.com/v1_1/daa9e83as/image/upload', formData);
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      setUploading(false);
      setError('Error uploading image.');
      return null;
    }
  };   

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length + hotelData.images.length > 6) {
      setWarnings('You can only upload a maximum of 6 images.');
      setSnackbarOpen(true);
      return;
    }

    setUploading(true);
    const uploadedImages = [];
    for (let file of files) {
      const imageUrl = await uploadImage(file); // Replace with your image upload logic
      if (imageUrl) {
        uploadedImages.push(imageUrl);
      }
    }
    setHotelData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...uploadedImages],
    }));
    setUploading(false);
  };

  const removeImageMain = (index) => {
    const updatedImages = hotelData.images.filter((_, i) => i !== index); // Remove the image at the specified index
    setHotelData(prevState => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleRoomImageUpload = async (index, e) => {
    const files = e.target.files;
    const currentImages = hotelData.rooms[index].images.length;

    // Check if adding new images will exceed the limit
    if (currentImages + files.length > 10) {
      setError('You can only upload a maximum of 10 images.');
      return;
    }

    // Clear any previous error message
    setError('');

    const uploadedImages = [];
    for (let file of files) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        uploadedImages.push(imageUrl);
      }
    }

    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index].images = [...updatedRooms[index].images, ...uploadedImages];
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms
    }));
};

  const removeImage = (roomIndex, imageIndex) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[roomIndex].images = updatedRooms[roomIndex].images.filter((_, i) => i !== imageIndex); // Remove the image at the specified index
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const commonAmenities = [
    'TV',
    'Air Conditioning (AC)',
    'Free Wi-Fi',
    'Mini Bar',
    'Mini Fridge',
    'Balcony',
    'Room Service',
    'Safe',
    'Coffee Maker',
    'Tea Maker',
    'Hair Dryer',
    'Iron & Ironing Board',
    'Wardrobe / Closet',
    'Work Desk & Chair',
    'Seating Area / Sofa',
    'Telephone',
    'Refrigerator',
    'Microwave',
    'Electric Kettle',
    'Smart Lock / Keyless Entry',
    'Private Bathroom',
    'Bathtub',
    'Rain Shower',
    'Hot Tub / Jacuzzi',
    'Towels & Toiletries',
    'Complimentary Bottled Water',
    'Slippers & Bathrobe',
    'Blackout Curtains',
    'Soundproofing',
    'Wake-Up Service',
    '24/7 Front Desk Assistance',
    'Daily Housekeeping',
    'Luggage Rack',
    'Non-Smoking Rooms Available',
    'Pet-Friendly Rooms Available',
    'Accessible Rooms for Disabled Guests',
    'In-Room Dining',
    'Flat-Screen TV with Streaming Services (Netflix, Prime, etc.)',
    'USB Charging Ports',
    'Power Outlets Near Bed',
    'City View',
    'Ocean View',
    'Garden View',
    'Swimming Pool Access',
    'Fitness Center Access',
    'Spa & Wellness Access',
    'Laundry Service',
    'Heating',
    'Ceiling Fan',
    'Outdoor Furniture (Balcony/Patio)',
    'Fireplace (For Luxury Suites)',
    'Kitchenette (For Apartments)',
    'Full Kitchen (For Suites & Apartments)',
    'Dining Table',
    'Baby Cot / Extra Bed (On Request)',
    'Books & Magazines',
    'Smart Home Controls (Lighting, Curtains, Temperature)',
    'Gaming Console (On Request)',
    'Hypoallergenic Bedding Available',
  ];
  
  
  const filteredAmenities = (input) => {
    return commonAmenities.filter(amenity =>
      amenity.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleAmenityInputChange = (index, e) => {
    const value = e.target.value;
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index].amenitiesInput = value; // Temporary input value
    updatedRooms[index].showSuggestions = value.length > 0; // Show suggestions if input is not empty
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const addAmenity = (index, amenity) => {
    const updatedRooms = [...hotelData.rooms];
    if (!updatedRooms[index].amenities.includes(amenity)) {
      updatedRooms[index].amenities.push(amenity); // Add amenity to the array
    }
    updatedRooms[index].amenitiesInput = ''; // Clear input
    updatedRooms[index].showSuggestions = false; // Hide suggestions
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const removeAmenity = (index, amenityIndex) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index].amenities.splice(amenityIndex, 1); // Remove amenity
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const commonOnsiteActivities = [
    'Swimming Pool',
    'Heated Indoor Pool',
    'Infinity Pool',
    'Private Beach Access',
    'Gym / Fitness Center',
    'Yoga & Meditation Classes',
    'Spa & Wellness Center',
    'Sauna & Steam Room',
    'Hot Tub / Jacuzzi',
    'Tennis Court',
    'Basketball Court',
    'Golf Course',
    'Mini Golf',
    'Badminton Court',
    'Table Tennis',
    'Bowling Alley',
    'Billiards / Pool Table',
    'Darts & Board Games',
    'Kids Play Area',
    'Children’s Club & Activities',
    'Game Room (Arcade, Video Games, etc.)',
    'Cinema / Movie Nights',
    'Live Music / Entertainment',
    'Karaoke Nights',
    'Themed Dinners & Events',
    'BBQ / Grill Area',
    'Outdoor Fire Pit & Lounge',
    'Nightclub / DJ Events',
    'Rooftop Bar & Lounge',
    'Multiple Restaurants & Cafés',
    'Wine / Whiskey Tasting',
    'Cooking Classes',
    'Cocktail-Making Classes',
    'Cultural Performances & Shows',
    'Art & Craft Workshops',
    'Photography Tours & Sessions',
    'Guided Walking / City Tours',
    'Cycling / Bike Rentals',
    'Water Sports (Kayaking, Paddleboarding, etc.)',
    'Diving & Snorkeling (For Beach Resorts)',
    'Fishing Trips',
    'Boat Tours / Yacht Rentals',
    'Horseback Riding',
    'Hiking / Nature Trails',
    'Skiing / Snowboarding (For Mountain Resorts)',
    'ATV / Off-Road Adventures',
    'Zip Lining & Rope Courses',
    'Bird Watching',
    'Stargazing Sessions',
    'Petting Zoo (For Family-Friendly Resorts)',
    'Farm Experiences (For Rural Hotels)',
    'Business Center',
    'Conference / Meeting Rooms',
    'Co-Working Spaces',
    'Library & Reading Lounge',
    'Wellness Retreat Programs',
    'Personal Trainer / Fitness Classes',
    'Virtual Reality & Gaming Lounges',
    'Escape Room Experiences',
    'Helipad (For Luxury Resorts)',
    'Exclusive VIP Lounges',
  ];
  
  const addOnsiteActivity = (activity) => {
    setHotelData(prevState => ({
        ...prevState,
        activities: {
            ...prevState.activities,
            onsiteActivities: prevState.activities.onsiteActivities.includes(activity)
                ? prevState.activities.onsiteActivities
                : [...prevState.activities.onsiteActivities, activity],
        },
    }));
};

const removeOnsiteActivity = (activity) => {
    setHotelData(prevState => ({
        ...prevState,
        activities: {
            ...prevState.activities,
            onsiteActivities: prevState.activities.onsiteActivities.filter(a => a !== activity),
        },
    }));
};

  const handleNearbyActivitiesInputChange = (e) => {
    const value = e.target.value;
    setHotelData(prevState => ({
      ...prevState,
      activities: {
        ...prevState.activities,
        nearbyActivitiesInput: value,
      },
    }));
  };

  const addNearbyActivity = () => {
    const activity = hotelData.activities.nearbyActivitiesInput.trim();
    if (activity) {
      setHotelData(prevState => ({
        ...prevState,
        activities: {
          ...prevState.activities,
          nearbyActivities: [...prevState.activities.nearbyActivities, activity],
          nearbyActivitiesInput: '', // Clear input
        },
      }));
    }
  };

  const removeNearbyActivity = (index) => {
    setHotelData(prevState => ({
      ...prevState,
      activities: {
        ...prevState.activities,
        nearbyActivities: prevState.activities.nearbyActivities.filter((_, i) => i !== index),
      },
    }));
  };

  const handleOtherInfoInputChange = (e) => {
    const value = e.target.value;
    setHotelData(prevState => ({
      ...prevState,
      otherInfoInput: value, // Temporary input value
    }));
  };

  const addOtherInfo = () => {
    const info = hotelData.otherInfoInput.trim();
    if (info) {
      setHotelData(prevState => ({
        ...prevState,
        otherInfo: [...prevState.otherInfo, info], // Add to array
        otherInfoInput: '', // Clear input
      }));
    }
  };

  const removeOtherInfo = (index) => {
    setHotelData(prevState => ({
      ...prevState,
      otherInfo: prevState.otherInfo.filter((_, i) => i !== index), // Remove item
    }));
  };

  const handleFullboardIncludeInputChange = (index, e) => {
    const value = e.target.value;
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index].pricing.fullboardincludeInput = value;
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const addFullboardInclude = (index) => {
    const value = hotelData.rooms[index].pricing.fullboardincludeInput.trim();
    if (value) {
      const updatedRooms = [...hotelData.rooms];
      updatedRooms[index].pricing.fullboardinclude.push(value);
      updatedRooms[index].pricing.fullboardincludeInput = ''; // Clear input
      setHotelData(prevState => ({
        ...prevState,
        rooms: updatedRooms,
      }));
    }
  };

  const removeFullboardInclude = (index, itemIndex) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index].pricing.fullboardinclude.splice(itemIndex, 1);
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const handleHalfboardIncludeInputChange = (index, e) => {
    const value = e.target.value;
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index].pricing.halfboardincludeInput = value;
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const addHalfboardInclude = (index) => {
    const value = hotelData.rooms[index].pricing.halfboardincludeInput.trim();
    if (value) {
      const updatedRooms = [...hotelData.rooms];
      updatedRooms[index].pricing.halfboardinclude.push(value);
      updatedRooms[index].pricing.halfboardincludeInput = ''; // Clear input
      setHotelData(prevState => ({
        ...prevState,
        rooms: updatedRooms,
      }));
    }
  };

  const removeHalfboardInclude = (index, itemIndex) => {
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index].pricing.halfboardinclude.splice(itemIndex, 1);
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setHotelData({
      ...hotelData,
      location: {
        ...hotelData.location,
        province: selectedProvince,
        city: '' // Reset district when province changes
      }
    });
    setDistricts(provincesAndDistricts[selectedProvince] || []);
  };

   // Common payment methods
   const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Cash', 'Bank Transfer', 'KOKO Pay', 'MINT Pay', 'TAP IT'];

  // Handle adding/removing payment methods
  const handlePaymentMethodClick = (method) => {
    const updatedMethods = hotelData.policies.acceptedpaymentmethods.includes(method)
      ? hotelData.policies.acceptedpaymentmethods.filter((m) => m !== method) // Remove if already selected
      : [...hotelData.policies.acceptedpaymentmethods, method]; // Add if not selected

    handleChange({
      target: {
        name: 'policies.acceptedpaymentmethods',
        value: updatedMethods,
      },
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!hotelData.hotelName) newErrors.hotelName = 'Hotel Name is required';
    if (!hotelData.category) newErrors.category = 'Category is required';
    if (!hotelData.description) newErrors.description = 'Description is required';
    if (!hotelData.climate) newErrors.climate = 'Climate is required';
    if (!hotelData.location.address) newErrors['location.address'] = 'Address is required';
    if (!hotelData.location.province) newErrors['location.province'] = 'Province is required';
    if (!hotelData.location.city) newErrors['location.city'] = 'District is required';
    if (!hotelData.location.mapUrl) newErrors['location.mapUrl'] = 'Map URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!hotelData.contactInfo.email) newErrors['contactInfo.email'] = 'Email is required';
    if (!hotelData.contactInfo.contactNumber) newErrors['contactInfo.contactNumber'] = 'Contact Number is required';
    if (hotelData.contactInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hotelData.contactInfo.email)) {
        newErrors['contactInfo.email'] = 'Invalid email address';
    }
    if (hotelData.contactInfo.contactNumber && !/^\d{10}$/.test(hotelData.contactInfo.contactNumber)) {
        newErrors['contactInfo.contactNumber'] = 'Contact Number must be 10 digits and All Characters must be numeric';
    }
    if (hotelData.contactInfo.whatsappNumber && !/^\d{10}$/.test(hotelData.contactInfo.whatsappNumber)) {
        newErrors['contactInfo.whatsappNumber'] = 'Whatsapp Number must be 10 digits and All Characters must be numeric';
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation function for Step 3
  const validateStep3 = () => {
    const newErrors = {};
  
    // Check if rooms array is empty
    if (hotelData.rooms.length === 0) {
      newErrors.rooms = '💢 Minimum 1 Room Required';
    } else {
      // Clear the rooms error if the array is no longer empty
      delete newErrors.rooms;
    }
  
    // Validate each room's fields
    hotelData.rooms.forEach((room, index) => {
      if (!room.roomName) newErrors[`room${index}_roomName`] = 'Room Name is required';
      if (!room.type) newErrors[`room${index}_type`] = 'Type is required';
      if (!room.beds) newErrors[`room${index}_beds`] = 'Beds is required';
      if (!room.capacity) newErrors[`room${index}_capacity`] = 'Capacity is required';
      if (!room.roomDescription) newErrors[`room${index}_roomDescription`] = 'Room Description is required';
      if (!room.noOfRooms) newErrors[`room${index}_noOfRooms`] = 'Number of Rooms is required';
      if (!room.pricePerNight) newErrors[`room${index}_pricePerNight`] = 'Price Per Night is required';
      if (!room.pricePerFullDay) newErrors[`room${index}_pricePerFullDay`] = 'Price Per Full Day is required';
  
      // Validate discountForPromo and EarnRateForPromo if roomOpenForAgents is true
      if (room.roomOpenForAgents) {
        if (!room.discountForPromo) newErrors[`room${index}_discountForPromo`] = 'Discount for Promo is required';
        if (!room.EarnRateForPromo) newErrors[`room${index}_EarnRateForPromo`] = 'Earn Rate for Promo is required';
      }
    });
  
    // Validate displayPriceMain
    if (!hotelData.displayPriceMain) newErrors.displayPriceMain = 'Advertisement Front Price is required';
  
    // Update the errors state
    setErrors(newErrors);
  
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (errors.rooms) {
        setIsVisible(true); // Show the error message
        const timer = setTimeout(() => {
            setIsVisible(false); // Trigger fade-out
            setTimeout(() => {
                setErrors({ ...errors, rooms: '' }); // Clear the error after fade-out
            }, 500); // Wait for the fade-out animation to complete
        }, 1500); // Wait 1.5 seconds before starting fade-out

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
}, [errors.rooms]);

const validateStep5 = () => {
    const newErrors = {};
    if (hotelData.diningOptions.breakfastIncluded) {
      if (!hotelData.diningOptions.breakfastInfo) {
        newErrors.breakfastInfo = 'Breakfast Info is required';
      }
      if (!hotelData.diningOptions.breakfastCharge) {
        newErrors.breakfastCharge = 'Breakfast Charge is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep6 = () => {
    const newErrors = {};

    // Check-In Time and Check-Out Time are required
    if (!hotelData.policies.checkInTime) {
      newErrors.checkInTime = 'Check-In Time is required';
    }
    if (!hotelData.policies.checkOutTime) {
      newErrors.checkOutTime = 'Check-Out Time is required';
    }

    // If Age Restriction is checked, Minimum Check-In Age is required
    if (hotelData.policies.ageRestriction && !hotelData.policies.minimumCheckInAge) {
      newErrors.minimumCheckInAge = 'Minimum Check-In Age is required';
    }

    // If Damage Deposit is checked, Damage Deposit Amount is required
    if (hotelData.policies.damageDeposit && !hotelData.policies.damageDepositAmount) {
      newErrors.damageDepositAmount = 'Damage Deposit Amount is required';
    }

    // If Tax and Charges is checked, Tax and Charges Amount is required
    if (hotelData.policies.taxAndCharges && !hotelData.policies.taxAndChargesAmount) {
      newErrors.taxAndChargesAmount = 'Tax and Charges Amount is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const handleNext2 = () => {
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

    const handleNext3 = () => {
        if (step === 3 && !validateStep3()) return;
        setStep(step + 1);
      };

      const handleNext5 = () => {
        if (validateStep5()) {
          setStep(6);
        }
      };

      const handleNext6 = () => {
        if (validateStep6()) {
          setStep(7);
        }
      };

      const handleNext8 = () => {
        if (hotelData.images.length < 6) {
          setWarnings('Please upload exactly 6 images.');
          setSnackbarOpen(true);
          return;
        }
        setStep(9);
      };

      const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

  const handleBack = () => {
    setStep(step - 1);
  };

  const totalHotelAddValue = hotelAdvertiseRate + totalAdditionalCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorAlert(""); // Reset error message
  
    // Validation: Check if "How Many Stars" is required
    if (hotelData.isHaveStars && !hotelData.howManyStars) {
      setErrorAlert("Please specify how many stars the hotel has.");
      return;
    }
  
    // Validation: Check if "Accepts Teams" is not allowed
    if (hotelData.acceptTeams === false) {
      setErrorAlert("Submission is not allowed if terms and conditions are not accepted.");
      return;
    }
  
    const isOpenForAgents = hotelData.rooms.some((room) => room.roomOpenForAgents);
    const finalData = {
      ...hotelData,
      isOpenForAgents,
      hotelAdvertiseRate,
      totalAdditionalCost,
      totalHotelAddValue,
    };
  
    // Show Confirmation Alert Before Navigating
    Swal.fire({
      title: "All Done..Double Check Your Advertisement Details",
      text: "Before submitting, please review all details carefully. You can still edit your advertisement after publication. If you're sure, proceed to the payment page.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Check Again",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/hotelAddpaymentsPage", { state: finalData });
      }
    });
  };

  return (
    <Container sx={{ mt: 8, p: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', display: 'flex', alignItems: 'center' }}>
      Post Hotel Advertisement
      </Typography>
      </Grid>
      <Grid item sx={{ backgroundColor: 'rgb(255, 246, 227)', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', p: 2, borderRadius: 1, mb: 2 }}>
        <Typography variant="body1">Hotel Advertisement Amount: {hotelAdvertiseRate} HSC</Typography>
        <Typography variant="body1">Total Additional Cost: {totalAdditionalCost} HSC</Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mt: 1 }}>
          Total: {totalHotelAddValue} HSC
        </Typography>
      </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
      {step === 1 && (
          <Box>
            <Typography variant="body1" gutterBottom sx={{ color: '#333', mb: 2, textAlign: 'justify' }}>
            🎗️ Welcome to the <strong>Hotel Advertisement Form</strong>. This form is designed to help you showcase your hotel effectively by providing all necessary details in a structured manner. To ensure your advertisement is complete and accurate, please follow the <strong>9 steps</strong> below. Each step must be filled out with valid and up-to-date information to ensure the best experience for your potential guests.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
              Step 01 - Primary Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Hotel Name"
                  name="hotelName"
                  value={hotelData.hotelName}
                  onChange={handleChange}
                  error={!!errors.hotelName}
                  helperText={errors.hotelName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={hotelData.category}
                    onChange={handleChange}
                    label="Category"
                    required
                  >
                    <MenuItem value="">Select a category</MenuItem>
                    <MenuItem value="Hotels">Hotels</MenuItem>
                    <MenuItem value="Restaurants">Restaurants</MenuItem>
                    <MenuItem value="Apartments">Apartments</MenuItem>
                    <MenuItem value="Resorts">Resorts</MenuItem>
                    <MenuItem value="Villas">Villas</MenuItem>
                    <MenuItem value="Bungalows">Bungalows</MenuItem>
                    <MenuItem value="Guesthouses">Guesthouses</MenuItem>
                    <MenuItem value="Hostels">Hostels</MenuItem>
                    <MenuItem value="Cottages">Cottages</MenuItem>
                    <MenuItem value="Cabins">Cabins</MenuItem>
                    <MenuItem value="Lodges">Lodges</MenuItem>
                    <MenuItem value="Homestays">Homestays</MenuItem>
                    <MenuItem value="Bed and Breakfasts">Bed and Breakfasts</MenuItem>
                    <MenuItem value="Vacation Rentals">Vacation Rentals</MenuItem>
                    <MenuItem value="Campgrounds">Campgrounds</MenuItem>
                    <MenuItem value="Motels">Motels</MenuItem>
                    <MenuItem value="Inns">Inns</MenuItem>
                    <MenuItem value="Farm Stays">Farm Stays</MenuItem>
                    <MenuItem value="Houseboats">Houseboats</MenuItem>
                    <MenuItem value="Treehouses">Treehouses</MenuItem>
                    <MenuItem value="Luxury Tents">Luxury Tents</MenuItem>
                    <MenuItem value="Ryokans">Ryokans</MenuItem>
                    <MenuItem value="Capsule Hotels">Capsule Hotels</MenuItem>
                    <MenuItem value="Eco Lodges">Eco Lodges</MenuItem>
                    <MenuItem value="Safari Lodges">Safari Lodges</MenuItem>
                    <MenuItem value="Ski Resorts">Ski Resorts</MenuItem>
                    <MenuItem value="Beach Resorts">Beach Resorts</MenuItem>
                    <MenuItem value="All-Inclusive Resorts">All-Inclusive Resorts</MenuItem>
                    <MenuItem value="Boutique Hotels">Boutique Hotels</MenuItem>
                    <MenuItem value="Heritage Hotels">Heritage Hotels</MenuItem>
                    <MenuItem value="Business Hotels">Business Hotels</MenuItem>
                    <MenuItem value="Extended Stay Hotels">Extended Stay Hotels</MenuItem>
                    <MenuItem value="Pet-Friendly Hotels">Pet-Friendly Hotels</MenuItem>
                    <MenuItem value="Casino Hotels">Casino Hotels</MenuItem>
                    <MenuItem value="Wellness Retreats">Wellness Retreats</MenuItem>
                    <MenuItem value="Yurts">Yurts</MenuItem>
                    <MenuItem value="Castles">Castles</MenuItem>
                    <MenuItem value="Palaces">Palaces</MenuItem>
                    <MenuItem value="Holiday Parks">Holiday Parks</MenuItem>
                    <MenuItem value="Glamping Sites">Glamping Sites</MenuItem>
                    <MenuItem value="Floating Hotels">Floating Hotels</MenuItem>
                    <MenuItem value="Caves">Caves</MenuItem>
                    <MenuItem value="Ice Hotels">Ice Hotels</MenuItem>
                    <MenuItem value="Underwater Hotels">Underwater Hotels</MenuItem>
                    {/* Add other categories here */}
                  </Select>
                  {errors.category && <Typography color="error">{errors.category}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hotel Description"
                  name="description"
                  value={hotelData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.climate}>
                  <InputLabel>Climate Zone</InputLabel>
                  <Select
                    name="climate"
                    value={hotelData.climate}
                    onChange={handleChange}
                    label="Climate Zone"
                    required
                  >
                    <MenuItem value="">Select a climate zone</MenuItem>
                    <MenuItem value="Dry zone">Dry zone 🌵</MenuItem>
                    <MenuItem value="Intermediate zone">Intermediate zone 🍃</MenuItem>
                    <MenuItem value="Montane zone">Montane zone 🥶</MenuItem>
                    <MenuItem value="Semi-Arid zone">Semi-Arid zone 🌾</MenuItem>
                    <MenuItem value="Oceanic zone">Oceanic zone 🌊</MenuItem>
                    <MenuItem value="Tropical Wet zone">Tropical Wet zone 🌴</MenuItem>
                    <MenuItem value="Tropical Submontane">Tropical Submontane 🌿</MenuItem>
                    <MenuItem value="Tropical Dry Zone">Tropical Dry Zone 🍂</MenuItem>
                    <MenuItem value="Tropical Monsoon Climate">Tropical Monsoon Climate 🌧️</MenuItem>
                    <MenuItem value="Tropical Savanna Climate">Tropical Savanna Climate 🌞</MenuItem>
                    {/* Add other climate zones here */}
                  </Select>
                  {errors.climate && <Typography color="error">{errors.climate}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="location.address"
                  value={hotelData.location.address}
                  onChange={handleChange}
                  error={!!errors['location.address']}
                  helperText={errors['location.address']}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors['location.province']}>
                  <InputLabel>Province</InputLabel>
                  <Select
                    name="location.province"
                    value={hotelData.location.province}
                    onChange={handleProvinceChange}
                    label="Province"
                    required
                  >
                    <MenuItem value="">Select Province</MenuItem>
                    {Object.keys(provincesAndDistricts).map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors['location.province'] && <Typography color="error">{errors['location.province']}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors['location.city']}>
                  <InputLabel>District</InputLabel>
                  <Select
                    name="location.city"
                    value={hotelData.location.city}
                    onChange={handleChange}
                    label="District"
                    required
                    disabled={!hotelData.location.province}
                  >
                    <MenuItem value="">Select District</MenuItem>
                    {districts.map((district) => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors['location.city'] && <Typography color="error">{errors['location.city']}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
              To provide your hotel's location, please open <strong>Google Maps,</strong> search for your hotel's address, click the "Share" button, and <strong>copy</strong> the link. <strong>Paste the link</strong> in the field below.
            </Typography>
                <TextField
                  fullWidth
                  label="Map URL"
                  name="location.mapUrl"
                  value={hotelData.location.mapUrl}
                  onChange={handleChange}
                  error={!!errors['location.mapUrl']}
                  helperText={errors['location.mapUrl']}
                  required
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleNext}
                sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
              Step 02 - Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
              Please provide your <strong>official business email</strong> address. This will be used for <strong>important communications</strong> and updates.
            </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  name="contactInfo.email"
                  value={hotelData.contactInfo.email}
                  onChange={handleChange}
                  error={!!errors['contactInfo.email']}
                  helperText={errors['contactInfo.email']}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactInfo.contactNumber"
                  value={hotelData.contactInfo.contactNumber}
                  onChange={handleChange}
                  error={!!errors['contactInfo.contactNumber']}
                  helperText={errors['contactInfo.contactNumber']}
                  required
                />
              </Grid>
              <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
              Please provide your <strong>active WhatsApp number</strong> associated with your business. This will be used for <strong>quick communication</strong> and updates.
              </Typography>
                <TextField
                  fullWidth
                  label="WhatsApp Number (optional)"
                  name="contactInfo.whatsappNumber"
                  value={hotelData.contactInfo.whatsappNumber}
                  onChange={handleChange}
                  error={!!errors['contactInfo.whatsappNumber']}
                  helperText={errors['contactInfo.whatsappNumber']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Facebook URL (optional)"
                  name="contactInfo.facebookUrl"
                  value={hotelData.contactInfo.facebookUrl}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website URL (optional)"
                  name="contactInfo.websiteUrl"
                  value={hotelData.contactInfo.websiteUrl}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleBack}
                sx={{ color: '#1976d2', borderColor: '#1976d2' }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleNext2}
                sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}

        {step === 3 && (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
            Step 03 - Rooms & Pricing
            </Typography>

            {hotelData.rooms.map((room, index) => (
            <Box
                key={index}
                sx={{
                mb: 4,
                p: 3,
                border: '1px solid #ddd',
                borderRadius: 2,
                backgroundColor: '#fff',
                }}
            >
                <Grid container spacing={3}>
                
                {/* Display Room Number - Left Side */}
                <Grid item xs={6}>
                  <Typography variant="h7">
                  🛏️ Unit No: {index + 1}
                  </Typography>
                </Grid>

                {/* Remove Room Button - Right Side */}
                <Grid item xs={6} textAlign="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeRoom(index)}
                    startIcon={<Close />}
                  >
                    Remove Room
                  </Button>
                </Grid>

              {/* Room Fields */}
              <Grid item xs={12}>
                  <FormControl fullWidth required error={!!errors[`room${index}_roomName`]}>
                      <InputLabel>Room Luxury Level</InputLabel>
                      <Select
                          name="roomName"
                          value={room.roomName}
                          onChange={(e) => handleRoomChange(index, e)}
                      >
                          <MenuItem value="Premium Suite">Premium Suite ✨</MenuItem>
                          <MenuItem value="Luxury Suite">Luxury Suite 🏵️</MenuItem>
                          <MenuItem value="Presidential Suite">Presidential Suite 🏛️</MenuItem>
                          <MenuItem value="Junior Suite">Junior Suite 🌟</MenuItem>
                          <MenuItem value="Grand Suite">Grand Suite 🏆</MenuItem>
                          <MenuItem value="Normal">Normal ( this For Norma Type Rooms ) 😊</MenuItem>
                      </Select>
                  </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors[`room${index}_type`]}>
                    <InputLabel>Room Type</InputLabel>
                    <Select
                        name="type"
                        value={room.type}
                        onChange={(e) => handleRoomChange(index, e)}
                    >
                        <MenuItem value="Deluxe Room">Deluxe Room 🌟</MenuItem>
                        <MenuItem value="Standard Room">Standard Room 🏨</MenuItem>
                        <MenuItem value="Executive Suite">Executive Suite 💼</MenuItem>
                        <MenuItem value="Family Room">Family Room 👨‍👩‍👧‍👦</MenuItem>
                        <MenuItem value="Twin Room">Twin Room 🛏️🛏️✨</MenuItem>
                        <MenuItem value="Single Room">Single Room 🛏️</MenuItem>
                        <MenuItem value="Double Room">Double Room 🛏️🛏️</MenuItem>
                        <MenuItem value="King Room">King Room 👑</MenuItem>
                        <MenuItem value="Queen Room">Queen Room 👸</MenuItem>
                        <MenuItem value="Studio Room">Studio Room 🎨</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="How many Beds Are There ?"
                    name="beds"
                    value={room.beds}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_beds`]}
                    helperText={errors[`room${index}_beds`]}
                    required
                    inputProps={{
                      type: 'number', // Restricts input to numbers
                      inputMode: 'numeric', // Ensures numeric keyboard on mobile devices
                      pattern: '[0-9]*', // Ensures only numbers are allowed
                  }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Room Capacity"
                    name="capacity"
                    value={room.capacity}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_capacity`]}
                    helperText={errors[`room${index}_capacity`]}
                    required
                    inputProps={{
                      type: 'number', // Restricts input to numbers
                      inputMode: 'numeric', // Ensures numeric keyboard on mobile devices
                      pattern: '[0-9]*', // Ensures only numbers are allowed
                  }}
                    />
                </Grid>

                <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
                  Provide a <strong>brief and polished description</strong> of your room. For <strong>example: 
                  <em>"This room features 3 beds: 2 large king-size beds and 1 single bed. It comfortably accommodates up to 5 people (4 adults and 1 child)."</em></strong> Ensure the description is clear, concise, and highlights key features. <strong>Maximum 250 characters allowed.</strong>
                </Typography>
                <TextField
                  fullWidth
                  label="Room Description"
                  name="roomDescription"
                  value={room.roomDescription}
                  onChange={(e) => handleRoomChange(index, e)}
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 250 }} // Enforce maximum 250 characters
                  error={!!errors[`room${index}_roomDescription`]}
                  helperText={errors[`room${index}_roomDescription`]}
                  required
                />
                {/* Character counter */}
                <Typography variant="body2" sx={{ textAlign: 'right', mt: 1, color: '#666' }}>
                  {room.roomDescription ? room.roomDescription.length : 0}/250 characters
                </Typography>
              </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="How many Rooms do you have in this Particular type ?"
                    name="noOfRooms"
                    value={room.noOfRooms}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_noOfRooms`]}
                    helperText={errors[`room${index}_noOfRooms`]}
                    required
                    inputProps={{
                      type: 'number', // Restricts input to numbers
                      inputMode: 'numeric', // Ensures numeric keyboard on mobile devices
                      pattern: '[0-9]*', // Ensures only numbers are allowed
                  }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Price Per one Night ( LKR )"
                    name="pricePerNight"
                    value={room.pricePerNight}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_pricePerNight`]}
                    helperText={errors[`room${index}_pricePerNight`]}
                    required
                    inputProps={{
                      type: 'number', // Restricts input to numbers
                      inputMode: 'numeric', // Ensures numeric keyboard on mobile devices
                      pattern: '[0-9]*', // Ensures only numbers are allowed
                  }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Price Per Full Day ( LKR )"
                    name="pricePerFullDay"
                    value={room.pricePerFullDay}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_pricePerFullDay`]}
                    helperText={errors[`room${index}_pricePerFullDay`]}
                    required
                    inputProps={{
                      type: 'number', // Restricts input to numbers
                      inputMode: 'numeric', // Ensures numeric keyboard on mobile devices
                      pattern: '[0-9]*', // Ensures only numbers are allowed
                  }}
                    />
                </Grid>

                {/* Fullboard Section */}
                <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
                The Fullboard section is optional. If this <strong>room includes a Fullboard</strong> package, you can specify the <strong>Fullboard amount in LKR</strong>. Additionally, use the <strong>'Fullboard Includes' field</strong> to list the items or services covered in the package (e.g., breakfast, lunch, dinner, beverages). <strong>You can add multiple inclusions using the 'Add' button</strong>.
                </Typography>
                    <Box mb={2}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Fullboard Amount - LKR ( Optional )"
                        name="fullboardPrice"
                        value={room.pricing.fullboardPrice}
                        onChange={(e) => handleRoomChange(index, e)}
                        required
                        variant="outlined"
                        margin="normal"
                    />
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <TextField
                        fullWidth
                        type="text"
                        label="Fullboard Includes ( Optional )"
                        value={room.pricing.fullboardincludeInput || ''}
                        onChange={(e) => handleFullboardIncludeInputChange(index, e)}
                        variant="outlined"
                        margin="normal"
                        />
                        {room.pricing.fullboardincludeInput && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addFullboardInclude(index)}
                            sx={{ height: '56px', mt: 2 }}
                        >
                            Add
                        </Button>
                        )}
                    </Box>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                        {room.pricing.fullboardinclude.map((item, itemIndex) => (
                        <Chip
                            key={itemIndex}
                            label={item}
                            onDelete={() => removeFullboardInclude(index, itemIndex)}
                            sx={{ backgroundColor: '#f0f0f0', color: '#333' }}
                        />
                        ))}
                    </Box>
                    </Box>
                </Grid>

                {/* Halfboard Section */}
                <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
                The Halfboard section is optional. If this <strong>room includes a Halfboard</strong> package, you can specify the <strong>Halfboard amount in LKR</strong>. Additionally, use the <strong>'Halfboard Includes' field</strong> to list the items or services covered in the package . <strong>You can add multiple inclusions using the 'Add' button</strong>.
                </Typography>
                    <Box mb={2}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Halfboard Amount - LKR ( Optional )"
                        name="halfboardPrice"
                        value={room.pricing.halfboardPrice}
                        onChange={(e) => handleRoomChange(index, e)}
                        required
                        variant="outlined"
                        margin="normal"
                    />
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <TextField
                        fullWidth
                        type="text"
                        label="Halfboard Includes ( Optional )"
                        value={room.pricing.halfboardincludeInput || ''}
                        onChange={(e) => handleHalfboardIncludeInputChange(index, e)}
                        variant="outlined"
                        margin="normal"
                        />
                        {room.pricing.halfboardincludeInput && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addHalfboardInclude(index)}
                            sx={{ height: '56px', mt: 2 }}
                        >
                            Add
                        </Button>
                        )}
                    </Box>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                        {room.pricing.halfboardinclude.map((item, itemIndex) => (
                        <Chip
                            key={itemIndex}
                            label={item}
                            onDelete={() => removeHalfboardInclude(index, itemIndex)}
                            sx={{ backgroundColor: '#f0f0f0', color: '#333' }}
                        />
                        ))}
                    </Box>
                    </Box>
                </Grid>

                {/* Room Open for Agents */}
                <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
                When enabled, this <strong>room will be available for promotion</strong> by Our Holidaysri agents. Agents will <strong>immediately be informed</strong> about its availability and can actively promote it to <strong>potential customers, helping increase your bookings</strong>. Additionally, you will need to specify a <strong>discount for agent code users</strong> and define the <strong>earn rate for agents</strong> ( Specify the commission amount paid to the agent for each booking made using an agent code ). This allows to <strong>grow your business</strong> while driving more visibility and revenue for your property. <strong>No additional charges apply.</strong>
                </Typography>
                    <FormControlLabel
                    control={
                        <Checkbox
                        name="roomOpenForAgents"
                        checked={room.roomOpenForAgents}
                        onChange={(e) => handleRoomChange(index, e)}
                        />
                    }
                    label="Enable Agent Promotions for This Room / Rooms."
                    />
                </Grid>

                {room.roomOpenForAgents && (
                <>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Discount for Agent Code Users : LKR ( Ex: 1200 )"
                        name="discountForPromo"
                        value={room.discountForPromo}
                        onChange={(e) => handleRoomChange(index, e)}
                        error={!!errors[`room${index}_discountForPromo`]} // Show error if the field has an error
                        helperText={errors[`room${index}_discountForPromo`]} // Display the error message
                        required
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Earn Rate of Agents : LKR ( Ex: 350 )"
                        name="EarnRateForPromo"
                        value={room.EarnRateForPromo}
                        onChange={(e) => handleRoomChange(index, e)}
                        error={!!errors[`room${index}_EarnRateForPromo`]} // Show error if the field has an error
                        helperText={errors[`room${index}_EarnRateForPromo`]} // Display the error message
                        required
                    />
                    </Grid>
                </>
                )}

                {/* Amenities */}
                <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
                Specify the <strong>amenities available in this room</strong> type to enhance guest experience. Add features <strong>like TV, AC, Wi-Fi, minibar,</strong> and more. Use the field to type each amenity and click 'Add' to include multiple options, ensuring guests know what’s provided.
                </Typography>
                    <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Type to add amenities ( Optional )"
                        value={room.amenitiesInput || ''}
                        onChange={(e) => handleAmenityInputChange(index, e)}
                        variant="outlined"
                    />
                    {room.showSuggestions && (
                        <Paper sx={{ mt: 1, maxHeight: '230px', overflowY: 'auto' }}>
                        <List>
                            {filteredAmenities(room.amenitiesInput).map((amenity, i) => (
                            <ListItem button key={i} onClick={() => addAmenity(index, amenity)}>
                                <ListItemText primary={amenity} />
                            </ListItem>
                            ))}
                        </List>
                        </Paper>
                    )}
                    <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                        {room.amenities.map((amenity, amenityIndex) => (
                        <Chip
                            key={amenityIndex}
                            label={amenity}
                            onDelete={() => removeAmenity(index, amenityIndex)}
                            variant="outlined"
                            color="primary"
                        />
                        ))}
                    </Box>
                    </Box>
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic' }}>
                You can upload up to 10 images for this room / Rooms.
                </Typography>
                        <input
                        type="file"
                        multiple
                        onChange={(e) => handleRoomImageUpload(index, e)}
                        style={{ display: 'none' }}
                        id={`room-image-upload-${index}`}
                        />
                        <label htmlFor={`room-image-upload-${index}`}>
                        <Button variant="contained" component="span" startIcon={<IoIosImages />}>
                            Upload Room Images
                        </Button>
                        </label>
                    </Grid>

                    {uploading && (
                        <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                        </Grid>
                    )}

                    {error && (
                        <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, color: 'red' }}>
                            {error}
                        </Box>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                        {room.images.map((imageUrl, imgIndex) => (
                            <Box key={imgIndex} sx={{ position: 'relative' }}>
                            <img
                                src={imageUrl}
                                alt={`Room ${index + 1} Image ${imgIndex + 1}`}
                                style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
                            />
                            <IconButton
                                size="small"
                                sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                backgroundColor: 'red',
                                color: 'white',
                                '&:hover': { backgroundColor: 'darkred' },
                                }}
                                onClick={() => removeImage(index, imgIndex)}
                            >
                                <Close fontSize="small" />
                            </IconButton>
                            </Box>
                        ))}
                        </Box>
                    </Grid>

                </Grid>
            </Box>
            ))}

            <div>
                {errors.rooms && (
                    <div 
                        style={{ 
                            color: 'red', 
                            marginBottom: '10px', 
                            opacity: isVisible ? 1 : 0, // Control opacity
                            transition: 'opacity 0.5s ease-out' // Smooth transition
                        }}
                    >
                        {errors.rooms}
                    </div>
                )}
            </div>

            {/* Add Room Button */}
            <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={addRoom} startIcon={<Add />}>
                Add Room
            </Button>
            </Box>

            {/* Display Price Main */}
            <Box sx={{ mt: 4 }}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Set an <strong>attractive price</strong> for showcasing your hotel <strong>advertisement prominently</strong>. This amount should reflect the value of your offering and be <strong>competitive to attract potential customers</strong>. Consider using an <strong>average room rate or a strategic amount</strong> that highlights the appeal of your property. ( Set the Value in LKR )
            </Typography>
            <TextField
                fullWidth
                label="Advertisement Front Price ( LKR )"
                name="displayPriceMain"
                value={hotelData.displayPriceMain}
                onChange={(e) => setHotelData({ ...hotelData, displayPriceMain: e.target.value })}
                error={!!errors.displayPriceMain}
                helperText={errors.displayPriceMain}
                required
                inputProps={{
                  type: 'number', // Restricts input to numbers
                  inputMode: 'numeric', // Ensures numeric keyboard on mobile devices
                  pattern: '[0-9]*', // Ensures only numbers are allowed
              }}
            />
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleBack}
                sx={{ color: '#1976d2', borderColor: '#1976d2' }}
            >
                Back
            </Button>
            <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleNext3}
                sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
            >
                Next
            </Button>
            </Box>
        </Box>
        )}


        {step === 4 && (
        <Container>
            <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
            Step 04 - Accommodation Amenities & Facilities
            </Typography>
              <Grid container spacing={2}>
                {Object.keys(hotelData.facilities).map((facility) => (
                  <Grid item xs={12} sm={6} md={4} key={facility}>
              <Box
                sx={{
                  border: "1px solid #ccc", // Optional border for better visibility
                  borderRadius: "10px",
                  padding: "8px", // Adds some spacing inside the box
                  display: "flex",
                  alignItems: "center",
                }}
              >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={hotelData.facilities[facility]}
                          onChange={handleChange}
                          name={`facilities.${facility}`}
                          color="primary"
                        />
                      }
                      label={facility}
                    />
                    </Box>
                  </Grid>
                ))}
              </Grid>    
        {/* Navigation Buttons */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => setStep(3)}
                sx={{ color: '#1976d2', borderColor: '#1976d2' }}
            >
                Back
            </Button>
            <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => setStep(5)}
                sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
            >
                Next
            </Button>
            </Box>

        </Container>
        )}

        {step === 5 && (
        <Container>
        <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
            Step 05 - Dining Options
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Provide details about your <strong>breakfast offerings</strong>, including available varieties, pricing for additional guests, serving hours, and any special dietary options.
            </Typography>
            <FormControlLabel
                control={
                <Checkbox
                    checked={hotelData.diningOptions.breakfastIncluded}
                    onChange={handleChange}
                    name="diningOptions.breakfastIncluded"
                    color="primary"
                />
                }
                label="Does Your Property Have an Breakfast Option ?"
            />
            </Grid>
            {hotelData.diningOptions.breakfastIncluded && (
            <>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Breakfast Details & Pricing ( info )"
                    name="diningOptions.breakfastInfo"
                    value={hotelData.diningOptions.breakfastInfo}
                    onChange={handleChange}
                    error={!!errors.breakfastInfo}
                    helperText={
                    errors.breakfastInfo ||
                    `${hotelData.diningOptions.breakfastInfo.length}/200 characters`
                    }
                    multiline
                    rows={4}
                    inputProps={{
                    maxLength: 200,
                    }}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Standard Breakfast Charge (LKR)"
                    name="diningOptions.breakfastCharge"
                    type="number"
                    value={hotelData.diningOptions.breakfastCharge}
                    onChange={handleChange}
                    error={!!errors.breakfastCharge}
                    helperText={errors.breakfastCharge}
                />
                </Grid>
            </>
            )}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Provide a brief description of <strong>our on-site restaurant</strong>y, including cuisine type, operating hours, special menu offerings, and any notable features such as outdoor dining or live music.
            </Typography>
            <FormControlLabel
                control={
                <Checkbox
                    checked={hotelData.diningOptions.restaurantOnSite}
                    onChange={handleChange}
                    name="diningOptions.restaurantOnSite"
                    color="primary"
                />
                }
                label="Does Your Property Have an On-Site Restaurant?"
            />
            </Grid>
            {hotelData.diningOptions.restaurantOnSite && (
            <Grid item xs={12}>
                <TextField
                fullWidth
                label=" Description for Restaurant Info"
                name="diningOptions.restaurantInfo"
                value={hotelData.diningOptions.restaurantInfo}
                onChange={handleChange}
                error={!!errors.restaurantInfo}
                helperText={
                    errors.restaurantInfo ||
                    `${hotelData.diningOptions.restaurantInfo.length}/200 characters`
                }
                multiline
                rows={4}
                inputProps={{
                    maxLength: 200,
                }}
                />
            </Grid>
            )}
        </Grid>
            <Grid container justifyContent="space-between" mt={4}>
            {/* Back Button */}
            <Button
                variant="outlined"
                startIcon={<ArrowBack />} // Add the back arrow icon
                onClick={() => setStep(4)} // Your existing onClick handler
                sx={{ 
                color: '#1976d2', // Text color
                borderColor: '#1976d2', // Border color
                '&:hover': { 
                    borderColor: '#1565c0', // Hover border color
                    backgroundColor: 'rgba(25, 118, 210, 0.04)', // Light hover background
                },
                }}
            >
                Back
            </Button>

            {/* Next Button */}
            <Button
                variant="contained"
                endIcon={<ArrowForward />} // Add the forward arrow icon
                onClick={handleNext5} // Your existing onClick handler
                disabled={
                hotelData.diningOptions.breakfastIncluded &&
                (!hotelData.diningOptions.breakfastInfo || !hotelData.diningOptions.breakfastCharge)
                }
                sx={{ 
                backgroundColor: '#1976d2', // Background color
                '&:hover': { 
                    backgroundColor: '#1565c0', // Hover background color
                },
                '&:disabled': {
                    backgroundColor: '#b0b0b0', // Disabled background color
                    color: '#ffffff', // Disabled text color
                },
                }}
            >
                Next
            </Button>
            </Grid>
        </Container>
        )}

        {step === 6 && (
            <Container>

            <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
                Step 06 - Privacy Policies & Other Policies
            </Typography>
            
            <Grid container spacing={3}>
            {/* Allows Liquor */}
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    checked={hotelData.policies.allowsLiquor}
                    onChange={handleChange}
                    name="policies.allowsLiquor"
                    color="primary"
                    />
                }
                label="Allows Liquor 🍺"
                />
            </Grid>

            {/* Allows Smoking */}
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    checked={hotelData.policies.allowsSmoking}
                    onChange={handleChange}
                    name="policies.allowsSmoking"
                    color="primary"
                    />
                }
                label="Allows Smoking 💨"
                />
            </Grid>

            {/* Cancellation Policy */}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Specify the cancellation policy for your accommodation, including any conditions, deadlines, or applicable charges. <strong>This field is optional</strong>. If left blank, the default policy will be set as: <strong>' Free cancellation within 24 hours of booking. Charges may apply beyond this period.'</strong>
            </Typography>
                <TextField
                fullWidth
                label="Cancellation Policy ( Optional )"
                name="policies.cancellationPolicy"
                value={hotelData.policies.cancellationPolicy}
                onChange={handleChange}
                multiline
                rows={4}
                required
                />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  type="time"
                  label="Check-In Time"
                  name="policies.checkInTime"
                  value={hotelData.policies.checkInTime || ""}
                  onChange={handleChange}
                  error={!!errors.checkInTime}
                  helperText={errors.checkInTime || "Select the official check-in time for your hotel."}
                  required
                  InputLabelProps={{ shrink: true }}
              />
          </Grid>

          <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  type="time"
                  label="Check-Out Time"
                  name="policies.checkOutTime"
                  value={hotelData.policies.checkOutTime || ""}
                  onChange={handleChange}
                  error={!!errors.checkOutTime}
                  helperText={errors.checkOutTime || "Select the official check-out time for your hotel."}
                  required
                  InputLabelProps={{ shrink: true }}
              />
          </Grid>


            {/* Pets Allowed */}
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    checked={hotelData.policies.pets}
                    onChange={handleChange}
                    name="policies.pets"
                    color="primary"
                    />
                }
                label="Pets Allowed 🐶"
                />
            </Grid>

            {/* Pet Policy Details */}
            {hotelData.policies.pets && (
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Pet Policy Details ( Optional )"
                    name="policies.petPolicyDetails"
                    value={hotelData.policies.petPolicyDetails}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                </Grid>
            )}

            {/* Parties Allowed */}
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    checked={hotelData.policies.parties}
                    onChange={handleChange}
                    name="policies.parties"
                    color="primary"
                    />
                }
                label="Parties Allowed 🍾🥂"
                />
            </Grid>

            {/* Party Policy Details */}
            {hotelData.policies.parties && (
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Party Policy Details ( Optional )"
                    name="policies.partyPolicyDetails"
                    value={hotelData.policies.partyPolicyDetails}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                </Grid>
            )}

            {/* Child Policy */}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Specify the Child Policy for your accommodation. <strong>This field is optional</strong>. If left blank, the default policy will be set as: <strong>' Children of all ages are welcome. Additional charges may apply for extra bedding.'</strong>
            </Typography>
                <TextField
                fullWidth
                label="Child Policy ( Optional )"
                name="policies.childPolicy"
                value={hotelData.policies.childPolicy}
                onChange={handleChange}
                multiline
                rows={4}
                required
                />
            </Grid>

            {/* Age Restriction */}
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    checked={hotelData.policies.ageRestriction}
                    onChange={handleChange}
                    name="policies.ageRestriction"
                    color="primary"
                    />
                }
                label="have any Age Restriction ?"
                />
            </Grid>

            {/* Minimum Check-In Age */}
            {hotelData.policies.ageRestriction && (
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Minimum Check-In Age"
                    name="policies.minimumCheckInAge"
                    type="number"
                    value={hotelData.policies.minimumCheckInAge}
                    onChange={handleChange}
                    error={!!errors.minimumCheckInAge}
                    helperText={errors.minimumCheckInAge}
                    required                  
                />
                </Grid>
            )}

            {/* Damage Deposit */}
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    checked={hotelData.policies.damageDeposit}
                    onChange={handleChange}
                    name="policies.damageDeposit"
                    color="primary"
                    />
                }
                label="have any Damage Deposit requir ?"
                />
            </Grid>

            {/* Damage Deposit Amount */}
            {hotelData.policies.damageDeposit && (
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Damage Deposit Amount ( LKR )"
                    name="policies.damageDepositAmount"
                    type="number"
                    value={hotelData.policies.damageDepositAmount}
                    onChange={handleChange}
                    error={!!errors.damageDepositAmount}
                    helperText={errors.damageDepositAmount}
                    required
                />
                </Grid>
            )}

            {/* Refund Policy */}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Specify the Refund Policy for your accommodation, including any refund conditions, deadlines, or applicable charges. <strong>This field is optional</strong>. If left blank, the default policy will be set as: <strong>' Refunds are processed within 7 business days of cancellation.'</strong>
            </Typography>
                <TextField
                fullWidth
                label="Refund Policy ( Optional )"
                name="policies.refundPolicy"
                value={hotelData.policies.refundPolicy}
                onChange={handleChange}
                multiline
                rows={4}
                required
                />
            </Grid>

            {/* No Show Policy */}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Specify the No Show Policy for your accommodation, including any conditions or applicable charges. <strong>This field is optional</strong>. If left blank, the default policy will be set as: <strong>' No-shows are charged 100% of the booking amount.'</strong>
            </Typography>
                <TextField
                fullWidth
                label="No Show Policy ( Optional )"
                name="policies.noShowPolicy"
                value={hotelData.policies.noShowPolicy}
                onChange={handleChange}
                multiline
                rows={4}
                required
                />
            </Grid>

            {/* Late Check-Out Policy */}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Specify the Late Check-Out Policy for your accommodation, including any conditions or applicable charges. <strong>This field is optional</strong>. If left blank, the default policy will be set as: <strong>' Late check-out is subject to availability and may incur additional charges.'</strong>
            </Typography>
                <TextField
                fullWidth
                label="Late Check-Out Policy ( Optional )"
                name="policies.lateCheckOutPolicy"
                value={hotelData.policies.lateCheckOutPolicy}
                onChange={handleChange}
                multiline
                rows={4}
                required
                />
            </Grid>

            {/* Early Check-In Policy */}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Specify the Early Check-In Policy for your accommodation, including any conditions or applicable charges. <strong>This field is optional</strong>. If left blank, the default policy will be set as: <strong>' Early check-in is subject to availability and may incur additional charges.'</strong>
            </Typography>
                <TextField
                fullWidth
                label="Early Check-In Policy ( Optional )"
                name="policies.earlyCheckInPolicy"
                value={hotelData.policies.earlyCheckInPolicy}
                onChange={handleChange}
                multiline
                rows={4}
                required
                />
            </Grid>

            {/* Quiet Hours */}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Specify the designated quiet hours for your accommodation ( Ex : 10:00 PM to 7:00 AM (may vary by property) ) to ensure a peaceful environment for all guests. During this period, guests are expected to minimize noise levels in rooms, hallways, and common areas. If left blank, no specific quiet hours will be enforced, but general courtesy is encouraged.<strong>This field is optional</strong>. If left blank, the default <strong> we dose not set anything</strong>
            </Typography>
                <TextField
                fullWidth
                label="Quiet Hours ( Optional )"
                name="policies.quietHours"
                value={hotelData.policies.quietHours}
                onChange={handleChange}
                required
                />
            </Grid>

            {/* Accepted Payment Methods */}
            <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
                Accepted Payment Methods
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2, fontStyle: 'italic', textAlign: 'justify' }}>
            Select the payment methods <strong>that your accommodation accepts</strong>. This information will be displayed on your website and in your booking.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {paymentMethods.map((method) => (
                <Chip
                    key={method}
                    label={method}
                    onClick={() => handlePaymentMethodClick(method)}
                    color={
                    hotelData.policies.acceptedpaymentmethods.includes(method)
                        ? 'primary'
                        : 'default'
                    }
                />
                ))}
            </Box>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {hotelData.policies.acceptedpaymentmethods.map((method) => (
                <Chip
                    key={method}
                    label={method}
                    onDelete={() => handlePaymentMethodClick(method)}
                    sx={{
                        backgroundColor: '#4caf50', // Background color (green in this case)
                        color: '#ffffff', // Text color (white)
                        '& .MuiChip-deleteIcon': {
                          color: '#ffffff', // Delete icon color (white)
                          '&:hover': {
                            color: '#e0e0e0', // Delete icon hover color (light gray)
                          },
                        },
                        '&:hover': {
                          backgroundColor: '#388e3c', // Hover background color (darker green)
                        },
                      }}
                />
                ))}
            </Box>
            </Grid>
      

            {/* Tax and Charges */}
            <Grid item xs={12}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={hotelData.policies.taxAndCharges}
                    onChange={handleChange}
                    name="policies.taxAndCharges"
                    color="primary"
                />
                }
                label="have any Tax fees and Charges ?"
            />
            </Grid>

            {/* Tax and Charges Amount */}
            {hotelData.policies.taxAndCharges && (
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Tax and Charges Amount ( LKR )"
                name="policies.taxAndChargesAmount"
                type="number"
                value={hotelData.policies.taxAndChargesAmount}
                onChange={handleChange}
                error={!!errors.taxAndChargesAmount}
                helperText={errors.taxAndChargesAmount}
                required
                />
            </Grid>
            )}

            {/* Additional Charges */}
            <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Specify the Details About Additional policies and Charges/tax for your accommodation, including any Other conditions, deadlines, or applicable charges. <strong>This field is optional</strong>. If left blank, the default policy will be set as: <strong>' Additional charges may apply for extra guests, special requests, or facilities usage.'</strong>
            </Typography>
                <TextField
                fullWidth
                label="Details About Additional policies and Charges/tax (Optional)"
                name="policies.additionalCharges"
                value={hotelData.policies.additionalCharges}
                onChange={handleChange}
                multiline
                rows={4}
                required
                />
            </Grid>
            </Grid>

            {/* Navigation Buttons */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => setStep(5)}
                sx={{ color: '#1976d2', borderColor: '#1976d2' }}
            >
                Back
            </Button>
            <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleNext6}
                sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
            >
                Next
            </Button>
            </Box>
        </Container>
        )}

        {step === 7 && (
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            
            <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
                Step 07 - Activities
            </Typography>
      
        {/* Onsite Activities */}
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h7" gutterBottom>🏌️‍♀️Onsite Activities ( Optional )</Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, mt: 1, fontStyle: 'italic', textAlign: 'justify' }}>
            Select the onsite activities <strong>available at your accommodation</strong> to enhance guest experiences. These may include recreational, wellness, or entertainment options provided within the property.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {commonOnsiteActivities.map((activity, index) => {
                    const isSelected = hotelData.activities.onsiteActivities.includes(activity);
                    return (
                        <Chip
                            key={index}
                            label={activity}
                            onClick={() => addOnsiteActivity(activity)}
                            onDelete={isSelected ? () => removeOnsiteActivity(activity) : null}
                            deleteIcon={isSelected ? <Close /> : null}
                            color={isSelected ? 'primary' : 'default'}
                            variant={isSelected ? 'filled' : 'outlined'}
                        />
                    );
                })}
            </Box>
        </Box>
      
            {/* Nearby Locations */}
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="h7" gutterBottom>🏯 Nearby Locations ( Optional )</Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, mt: 1, fontStyle: 'italic', textAlign: 'justify' }}>
              Specify and select nearby <strong>locations that guests may find</strong> interesting or useful during their stay. Choose from the recommended list or add custom locations relevant to your accommodation.
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  value={hotelData.activities.nearbyAttractionsInput || ''}
                  onChange={handleNearbyAttractionsInputChange}
                  placeholder="Type to add nearby locations"
                  variant="outlined"
                />
                {hotelData.activities.showNearbySuggestions && (
                  <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1, maxHeight: 150, overflowY: 'auto', mt: 1 }}>
                    <List>
                      {filteredNearbyAttractions(hotelData.activities.nearbyAttractionsInput).map((attraction, i) => (
                        <ListItem button key={i} onClick={() => addNearbyAttraction(attraction)}>
                          <ListItemText primary={attraction.locationName} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {hotelData.activities.nearbyAttractions.map((attraction, index) => (
                  <Chip
                    key={index}
                    label={attraction}
                    onDelete={() => removeNearbyAttraction(index)}
                    deleteIcon={<Close />}
                  />
                ))}
              </Box>
            </Box>
      
            {/* Nearby Activities */}
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="h7" gutterBottom>🏕️ Other Nearby Attractions & Activities ( Optional )</Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, mt: 1, fontStyle: 'italic', textAlign: 'justify' }}>
              List <strong>additional nearby attractions and activities</strong> that guests can explore during their stay. <strong>Use the 'Add' option</strong> to include multiple attractions, such as landmarks, adventure spots, cultural sites, or entertainment venues.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  value={hotelData.activities.nearbyActivitiesInput || ''}
                  onChange={handleNearbyActivitiesInputChange}
                  placeholder="Type to add nearby activities"
                  variant="outlined"
                />
                {hotelData.activities.nearbyActivitiesInput && (
                  <Button variant="contained" onClick={addNearbyActivity}>
                    Add
                  </Button>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {hotelData.activities.nearbyActivities.map((activity, index) => (
                  <Chip
                    key={index}
                    label={activity}
                    onDelete={() => removeNearbyActivity(index)}
                    deleteIcon={<Close />}
                    sx={{
                        backgroundColor: 'rgba(78, 197, 167, 0.555)', // Background color (green in this case)
                        color: '#333', // Text color (white)
                        '& .MuiChip-deleteIcon': {
                          color: '#555', // Delete icon color (white)
                          '&:hover': {
                            color: '#e0e0e0', // Delete icon hover color (light gray)
                          },
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(19, 146, 114, 0.91)', // Hover background color (darker green)
                          color: '#e0e0e0',
                        },
                      }}
                  />
                ))}
              </Box>
            </Box>
      
            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => setStep(6)}>
                Back
              </Button>
              <Button variant="contained" endIcon={<ArrowForward />} onClick={() => setStep(8)}>
                Next
              </Button>
            </Box>
          </Paper>
        )}

        {step === 8 && (
            <Grid container spacing={3}>
            <Grid item xs={12}>
                
            <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
            Step 08 - accommodation Images
            </Typography>
            
            <Typography variant="body1" color="textSecondary" gutterBottom sx={{textAlign: 'justify'}}>
            Please upload <strong>exactly 6 images</strong> showcasing your accommodation. A maximum of 6 images is allowed. These images will be <strong>featured in your advertisement</strong>, so ensure they are high-quality and visually appealing to attract potential guests.
            </Typography>
            </Grid>
    
            {/* Image Upload Input */}
            <Grid item xs={12}>
            <input
                type="file"
                multiple
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
            />
            <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                Upload Images
                </Button>
            </label>
            {uploading && (
                <div style={{ marginTop: '10px' }}>
                <CircularProgress size={24} />
                <Typography variant="body2" color="textSecondary">
                    Uploading...
                </Typography>
                </div>
            )}
            </Grid>
    
            {/* Display Uploaded Images */}
            <Grid item xs={12}>
            <Grid container spacing={2}>
                {hotelData.images.map((imageUrl, index) => (
                <Grid item key={index}>
                    <Box
                    sx={{
                        position: 'relative',
                        width: '150px',
                        height: '100px',
                    }}
                    >
                    <Avatar
                        src={imageUrl}
                        variant="rounded"
                        sx={{
                        width: '100%',
                        height: '100%',
                        }}
                    />
                    <IconButton
                        sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: 'red',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add background for better visibility
                        '&:hover': {
                            backgroundColor: 'rgba(255, 0, 0, 0.1)', // Optional: Hover effect
                        },
                        }}
                        onClick={() => removeImageMain(index)}
                    >
                        <Close />
                    </IconButton>
                    </Box>
                </Grid>
                ))}
            </Grid>
            </Grid>
    
            {/* Navigation Buttons */}
            <Grid item xs={12}>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => setStep(7)}>
                Back
              </Button>
              <Button variant="contained" endIcon={<ArrowForward />} onClick={handleNext8}>
                Next
              </Button>
            </Box>
            </Grid>
    
            {/* Snackbar for Error Messages */}
            <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={warnings}
            action={
                <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
                <Close fontSize="small" />
                </IconButton>
            }
            />
        </Grid>
        )}

        {step === 9 && (
        <Container >
        <Box sx={{ mt: 4 }}>

        <Typography variant="h6" gutterBottom sx={{ color: '#555', fontWeight: 600, mb: 2 }}>
            Step 09 - Other Info & Publish 
        </Typography>
          
          {/* Other Info Input Field */}
          <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="textSecondary" gutterBottom sx={{textAlign: 'justify'}}>
            If there are <strong>any additional details or important information</strong> about your accommodation that haven’t been covered, you can enter them here. <strong>Use the 'Add' option</strong> to include multiple pieces of information as needed. <strong>Examples are below.</strong>
          </Typography>

          <Box component="ul" sx={{ pl: 2, mt: 1, mb: 2 }}>
            <Typography component="li" variant="body2" color="textSecondary">✔️ Booking Confirmation is immediate.</Typography>
            <Typography component="li" variant="body2" color="textSecondary">✔️ No hidden charges apply.</Typography>
            <Typography component="li" variant="body2" color="textSecondary">✔️ Flexible check-in and check-out options available. Ect,</Typography>
          </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={hotelData.otherInfoInput}
                onChange={handleOtherInfoInputChange}
                placeholder="Type to add other info ( Optional )"
              />
              {hotelData.otherInfoInput && (
                <Button variant="contained" onClick={addOtherInfo}>
                  Add
                </Button>
              )}
            </Box>
  
            {/* Display Added Other Info */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {hotelData.otherInfo.map((info, index) => (
                <Chip
                  key={index}
                  label={info}
                  onDelete={() => removeOtherInfo(index)}
                  sx={{ backgroundColor: '#e0e0e0' }}
                />
              ))}
            </Box>
          </Box>
  
          {/* New Fields */}
          <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 1, color: 'rgb(124, 66, 107)', textAlign: 'justify' }}>
          <strong>Please carefully fill</strong> in the <strong>details below,</strong> as we will verify them against your <strong>previously provided information</strong>. If any <strong>false or misleading details are detected</strong>, your advertisement will be <strong>immediately removed without a refund of the advertisement fee</strong>. Ensure that <strong>all information is accurate</strong> and genuine to avoid any issues.
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 1, color: 'rgb(124, 66, 107)', textAlign: 'justify' }}>
          <strong>If your accommodation</strong> does not have a <strong>stars, verification, certificate, or license,</strong> that’s <strong>completely fine—your ad will not be removed</strong>. However, <strong>if you falsely claim to have verification when you don’t, we will take strict action against such misleading information.</strong> Always provide accurate details only.
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 3, color: 'rgb(124, 66, 107)', textAlign: 'justify'}}>
          <strong>If you do not have a certificate or license Ect</strong>, this information will <strong>simply not be displayed</strong> directly in the advertisement for guests. <strong>So, Don't worry about it</strong>.  We collect this information to ensure the <strong>comfort, security, and responsibility</strong> of guests and tourists while also protecting the <strong>reputation</strong> of <strong>Sri Lanka</strong> as a trusted travel destination.
          </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Does the hotel have stars?</FormLabel>
              <RadioGroup
                row
                name="isHaveStars"
                value={hotelData.isHaveStars}
                onChange={(e) =>
                  setHotelData({ ...hotelData, isHaveStars: e.target.value === 'true' })
                }
              >
                <FormControlLabel value={true} control={<Radio />} label="Has Stars" />
                <FormControlLabel value={false} control={<Radio />} label="No Stars" />
              </RadioGroup>
            </FormControl>
  
            {hotelData.isHaveStars && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  type="number"
                  label="How Many Stars (1-10)"
                  name="howManyStars"
                  value={hotelData.howManyStars}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value === '') {
                      setHotelData({ ...hotelData, howManyStars: value });
                      return;
                    }
                    value = Math.min(Math.max(Number(value), 1), 10);
                    setHotelData({ ...hotelData, howManyStars: value });
                  }}
                  inputProps={{ min: 1, max: 10 }}
                  fullWidth
                />
              </Box>
            )}
          </Box>
  
          {/* Other Radio Button Fields */}
          {[
            { label: 'Is Your Accommodation Verified / Approved by the Sri Lanka Tourism Board ?', name: 'isVerified' },
            { label: 'Does Your Accommodation / Business Have a Government-Issued Certificate in Sri Lanka ?', name: 'isHaveCertificate' },
            { label: 'Does Your Accommodation / Business Have a Government-Issued or Tourism Board-Issued License in Sri Lanka ?', name: 'isHaveLicense' },
            {
              label: (
                <>
                  Accepts Our Terms & Conditions ?{" "}
                  <span
                    style={{ color: "rgb(124, 66, 107)", textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => setOpenTerms(true)}
                  >
                    View Terms & Conditions.
                  </span>
                  
                </>
              ),
              name: "acceptTeams",
            },
          ].map((field) => (
            <Box key={field.name} sx={{ mb: 3 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{field.label}</FormLabel>
                <RadioGroup
                  row
                  name={field.name}
                  value={hotelData[field.name]}
                  onChange={(e) =>
                    setHotelData({ ...hotelData, [field.name]: e.target.value === 'true' })
                  }
                >
                  <FormControlLabel value={true} control={<Radio />} label="Yes" />
                  <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
  
          {/* Error Alert */}
          {errorAlert && (
            <Box sx={{ mb: 3 }}>
              <Alert severity="error">{errorAlert}</Alert>
            </Box>
          )}
  
          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => setStep(8)}>
                Back
              </Button>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Publish Add
            </Button>
          </Box>
        </Box>
      </Container>
        )}
      </form>

      {/* Terms & Conditions Modal */}
      <Modal open={openTerms} onClose={() => setOpenTerms(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : 500,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Terms & Conditions
          </Typography>

          <Typography variant="body2" paragraph>
            Please read and agree to our terms and conditions before proceeding. By accepting, you confirm that all provided information is accurate, and we will verify them against your previously provided details. If any false or misleading details are detected, your advertisement will be <strong>immediately removed</strong> or subject to <strong>relevant actions</strong> without a refund of the advertisement fee. Ensure that all information is accurate and genuine to avoid any issues.
          </Typography>

          <Typography variant="body2" paragraph>
            If your accommodation does not have a star rating, verification, certificate, or license, that’s completely fine—your ad will not be removed. However, if you falsely claim to have verification when you don’t, <strong>we will take strict action</strong> against such misleading information. Always provide accurate details only.
          </Typography>

          <Typography variant="body2" paragraph>
            If you do not have a certificate or license, this information will simply not be displayed directly in the advertisement for guests.
          </Typography>

          <Typography variant="body2" paragraph>
            <strong>📢 Why We Collect This Information?</strong>  
            We collect this information to <strong>ensure the comfort, security, and responsibility of guests and tourists</strong> while also protecting the reputation of Sri Lanka as a trusted travel destination.
          </Typography>

          <Typography variant="body2" paragraph>
            <strong>Promotion & Agent Program:</strong>  
            I acknowledge and accept that the rooms listed in this advertisement are open to promotions for agents. I agree to pay the relevant earning rate for each agent who successfully books through my advertisement using an agent code.
          </Typography>

          <Box textAlign="right" mt={2}>
            <Button variant="contained" onClick={() => setOpenTerms(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

    </Container>
  );
};

export default AddHotel;