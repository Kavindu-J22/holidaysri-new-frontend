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
  } from '@mui/material';
  import { ArrowForward, ArrowBack, Add, Close } from '@mui/icons-material';
  import { IoIosImages } from "react-icons/io";

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
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
        try {
        const response = await axios.get('http://localhost:8000/location/');
        setLocations(response.data);
        } catch (error) {
        console.error('Error fetching locations:', error);
        }
    };
    fetchLocations();
    }, []);

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
    const updatedRooms = hotelData.rooms.filter((_, i) => i !== index);
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms
    }));
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
    const uploadedImages = [];
    for (let file of files) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        uploadedImages.push(imageUrl);
      }
    }
    setHotelData(prevState => ({
      ...prevState,
      images: [...prevState.images, ...uploadedImages]
    }));
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
  

  const filteredOnsiteActivities = (input) => {
    return commonOnsiteActivities.filter(activity =>
      activity.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleOnsiteActivitiesInputChange = (e) => {
    const value = e.target.value;
    setHotelData(prevState => ({
      ...prevState,
      activities: {
        ...prevState.activities,
        onsiteActivitiesInput: value,
        showOnsiteSuggestions: value.length > 0,
      },
    }));
  };

  const addOnsiteActivity = (activity) => {
    setHotelData(prevState => ({
      ...prevState,
      activities: {
        ...prevState.activities,
        onsiteActivities: [...prevState.activities.onsiteActivities, activity],
        onsiteActivitiesInput: '', // Clear input
        showOnsiteSuggestions: false, // Hide suggestions
      },
    }));
  };

  const removeOnsiteActivity = (index) => {
    setHotelData(prevState => ({
      ...prevState,
      activities: {
        ...prevState.activities,
        onsiteActivities: prevState.activities.onsiteActivities.filter((_, i) => i !== index),
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
   const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Cash', 'Bank Transfer'];

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
    if (!hotelData.displayPriceMain) newErrors.displayPriceMain = 'Display Price is required';
  
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

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isOpenForAgents = hotelData.rooms.some(room => room.roomOpenForAgents);
    const finalData = {
      ...hotelData,
      isOpenForAgents
    };
    navigate('/paymentsPage', { state: finalData });
  };

  return (
    <Container sx={{ mt: 8, p: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Post Hotel Advertisement
      </Typography>
      <form onSubmit={handleSubmit}>
      {step === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
              Primary Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hotel Name"
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
                  label="Description"
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
                    <MenuItem value="Dry zone">Dry zone</MenuItem>
                    <MenuItem value="Intermediate zone">Intermediate zone</MenuItem>
                    <MenuItem value="Montane zone">Montane zone</MenuItem>
                    <MenuItem value="Semi-Arid zone">Semi-Arid zone</MenuItem>
                    <MenuItem value="Oceanic zone">Oceanic zone</MenuItem>
                    <MenuItem value="Tropical Wet zone">Tropical Wet zone</MenuItem>
                    <MenuItem value="Tropical Submontane">Tropical Submontane</MenuItem>
                    <MenuItem value="Tropical Dry Zone">Tropical Dry Zone</MenuItem>
                    <MenuItem value="Tropical Monsoon Climate">Tropical Monsoon Climate</MenuItem>
                    <MenuItem value="Tropical Savanna Climate">Tropical Savanna Climate</MenuItem>
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
            <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
                <TextField
                  fullWidth
                  label="WhatsApp Number"
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
                  label="Facebook URL"
                  name="contactInfo.facebookUrl"
                  value={hotelData.contactInfo.facebookUrl}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website URL"
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
            <Typography variant="h6" gutterBottom sx={{ color: '#555', mb: 3 }}>
            Rooms & Pricing
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
                
                {/* Display Room Number */}
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Room No: {index + 1}
                    </Typography>
                </Grid>

                {/* Room Fields */}
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Room Name"
                    name="roomName"
                    value={room.roomName}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_roomName`]}
                    helperText={errors[`room${index}_roomName`]}
                    required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    value={room.type}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_type`]}
                    helperText={errors[`room${index}_type`]}
                    required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Beds"
                    name="beds"
                    value={room.beds}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_beds`]}
                    helperText={errors[`room${index}_beds`]}
                    required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Capacity"
                    name="capacity"
                    value={room.capacity}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_capacity`]}
                    helperText={errors[`room${index}_capacity`]}
                    required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Room Description"
                    name="roomDescription"
                    value={room.roomDescription}
                    onChange={(e) => handleRoomChange(index, e)}
                    multiline
                    rows={4}
                    error={!!errors[`room${index}_roomDescription`]}
                    helperText={errors[`room${index}_roomDescription`]}
                    required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Number of Rooms (This Type)"
                    name="noOfRooms"
                    value={room.noOfRooms}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_noOfRooms`]}
                    helperText={errors[`room${index}_noOfRooms`]}
                    required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Price Per Night"
                    name="pricePerNight"
                    value={room.pricePerNight}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_pricePerNight`]}
                    helperText={errors[`room${index}_pricePerNight`]}
                    required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Price Per Full Day"
                    name="pricePerFullDay"
                    value={room.pricePerFullDay}
                    onChange={(e) => handleRoomChange(index, e)}
                    error={!!errors[`room${index}_pricePerFullDay`]}
                    helperText={errors[`room${index}_pricePerFullDay`]}
                    required
                    />
                </Grid>

                {/* Fullboard Section */}
                <Grid item xs={12}>
                    <Box mb={3}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Fullboard Price"
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
                        label="Fullboard Includes"
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
                    <Box mb={3}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Halfboard Price"
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
                        label="Halfboard Includes"
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
                    <FormControlLabel
                    control={
                        <Checkbox
                        name="roomOpenForAgents"
                        checked={room.roomOpenForAgents}
                        onChange={(e) => handleRoomChange(index, e)}
                        />
                    }
                    label="Room Open For Agents"
                    />
                </Grid>

                {room.roomOpenForAgents && (
                <>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Discount for Promo"
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
                        label="Earn Rate for Promo"
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
                    <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Type to add amenities"
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

                {/* Remove Room Button */}
                <Grid item xs={12}>
                    <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeRoom(index)}
                    startIcon={<Close />}
                    sx={{ mt: 2 }}
                    >
                    Remove Room
                    </Button>
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
            <TextField
                fullWidth
                label="Display Price Main"
                name="displayPriceMain"
                value={hotelData.displayPriceMain}
                onChange={(e) => setHotelData({ ...hotelData, displayPriceMain: e.target.value })}
                error={!!errors.displayPriceMain}
                helperText={errors.displayPriceMain}
                required
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
            <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
              Facilities
            </Typography>
              <Grid container spacing={2}>
                {Object.keys(hotelData.facilities).map((facility) => (
                  <Grid item xs={12} sm={6} md={4} key={facility}>
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
            <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
            Dining Options
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControlLabel
                control={
                    <Checkbox
                    checked={hotelData.diningOptions.breakfastIncluded}
                    onChange={handleChange}
                    name="diningOptions.breakfastIncluded"
                    color="primary"
                    />
                }
                label="Breakfast Included"
                />
            </Grid>
            {hotelData.diningOptions.breakfastIncluded && (
                <>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Breakfast Info"
                    name="diningOptions.breakfastInfo"
                    value={hotelData.diningOptions.breakfastInfo}
                    onChange={handleChange}
                    error={!!errors.breakfastInfo}
                    helperText={
                    errors.breakfastInfo ||
                    `${hotelData.diningOptions.breakfastInfo.length}/200 characters`
                    }
                    multiline // Allows multiple lines for a description field
                    rows={4} // Adjust the number of rows to make it look like a description field
                    inputProps={{
                    maxLength: 200, // Sets the maximum character limit
                    }}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Breakfast Charge"
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
                <FormControlLabel
                control={
                    <Checkbox
                    checked={hotelData.diningOptions.restaurantOnSite}
                    onChange={handleChange}
                    name="diningOptions.restaurantOnSite"
                    color="primary"
                    />
                }
                label="Restaurant On Site"
                />
            </Grid>
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

            <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
                Policies
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
                label="Allows Liquor"
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
                label="Allows Smoking"
                />
            </Grid>

            {/* Cancellation Policy */}
            <Grid item xs={12}>
                <TextField
                fullWidth
                label="Cancellation Policy"
                name="policies.cancellationPolicy"
                value={hotelData.policies.cancellationPolicy}
                onChange={handleChange}
                multiline
                rows={4}
                required
                />
            </Grid>

            {/* Check-In Time */}
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Check-In Time"
                name="policies.checkInTime"
                value={hotelData.policies.checkInTime}
                onChange={handleChange}
                error={!!errors.checkInTime}
                helperText={errors.checkInTime}
                required
                />
            </Grid>

            {/* Check-Out Time */}
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Check-Out Time"
                name="policies.checkOutTime"
                value={hotelData.policies.checkOutTime}
                onChange={handleChange}
                error={!!errors.checkOutTime}
                helperText={errors.checkOutTime}
                required
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
                label="Pets Allowed"
                />
            </Grid>

            {/* Pet Policy Details */}
            {hotelData.policies.pets && (
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Pet Policy Details"
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
                label="Parties Allowed"
                />
            </Grid>

            {/* Party Policy Details */}
            {hotelData.policies.parties && (
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Party Policy Details"
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
                <TextField
                fullWidth
                label="Child Policy"
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
                label="Age Restriction"
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
                label="Damage Deposit"
                />
            </Grid>

            {/* Damage Deposit Amount */}
            {hotelData.policies.damageDeposit && (
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Damage Deposit Amount"
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
                <TextField
                fullWidth
                label="Refund Policy"
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
                <TextField
                fullWidth
                label="No Show Policy"
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
                <TextField
                fullWidth
                label="Late Check-Out Policy"
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
                <TextField
                fullWidth
                label="Early Check-In Policy"
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
                <TextField
                fullWidth
                label="Quiet Hours"
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                label="Tax and Charges"
            />
            </Grid>

            {/* Tax and Charges Amount */}
            {hotelData.policies.taxAndCharges && (
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Tax and Charges Amount"
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
                <TextField
                fullWidth
                label="Details About Additional policies or Charges/tax (Optional)"
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
        <div>
            <h2>Activities</h2>

            {/* Onsite Activities */}
            <div style={{ marginBottom: '20px' }}>
            <h3>Onsite Activities</h3>
            <div style={{ position: 'relative' }}>
                <input
                type="text"
                value={hotelData.activities.onsiteActivitiesInput || ''} // Temporary input value
                onChange={(e) => handleOnsiteActivitiesInputChange(e)}
                placeholder="Type to add onsite activities"
                />
                {/* Suggestions Dropdown */}
                {hotelData.activities.showOnsiteSuggestions && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    zIndex: 1000,
                    maxHeight: '150px',
                    overflowY: 'auto',
                }}>
                    {filteredOnsiteActivities(hotelData.activities.onsiteActivitiesInput).map((activity, i) => (
                    <div
                        key={i}
                        onClick={() => addOnsiteActivity(activity)}
                        style={{
                        padding: '8px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                        backgroundColor: '#f9f9f9',
                        }}
                    >
                        {activity}
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* Display Added Onsite Activities */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {hotelData.activities.onsiteActivities.map((activity, index) => (
                <div
                    key={index}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#e0e0e0',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    }}
                >
                    {activity}
                    <button
                    type="button"
                    onClick={() => removeOnsiteActivity(index)}
                    style={{
                        marginLeft: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                    >
                    X
                    </button>
                </div>
                ))}
            </div>
            </div>

            {/* Nearby Location */}
            <div style={{ marginBottom: '20px' }}>
            <h3>Nearby Locations</h3>
            <div style={{ position: 'relative' }}>
                <input
                type="text"
                value={hotelData.activities.nearbyAttractionsInput || ''} // Temporary input value
                onChange={(e) => handleNearbyAttractionsInputChange(e)}
                placeholder="Type to add nearby Locations"
                />
                {/* Suggestions Dropdown */}
                {hotelData.activities.showNearbySuggestions && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    zIndex: 1000,
                    maxHeight: '150px',
                    overflowY: 'auto',
                }}>
                    {filteredNearbyAttractions(hotelData.activities.nearbyAttractionsInput).map((attraction, i) => (
                    <div
                        key={i}
                        onClick={() => addNearbyAttraction(attraction)}
                        style={{
                        padding: '8px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                        backgroundColor: '#f9f9f9',
                        }}
                    >
                        {attraction.locationName}
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* Display Added Nearby Location */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {hotelData.activities.nearbyAttractions.map((attraction, index) => (
                <div
                    key={index}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#e0e0e0',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    }}
                >
                    {attraction}
                    <button
                    type="button"
                    onClick={() => removeNearbyAttraction(index)}
                    style={{
                        marginLeft: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                    >
                    X
                    </button>
                </div>
                ))}
            </div>
            </div>

        {/* Nearby Activities */}
            <div style={{ marginBottom: '20px' }}>
            <h3>Nearby Attractions & Activities</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                type="text"
                value={hotelData.activities.nearbyActivitiesInput || ''} // Temporary input value
                onChange={(e) => handleNearbyActivitiesInputChange(e)}
                placeholder="Type to add nearby activities"
                />
                {/* Add Button */}
                {hotelData.activities.nearbyActivitiesInput && (
                <button
                    type="button"
                    onClick={addNearbyActivity}
                    style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    }}
                >
                    Add
                </button>
                )}
            </div>

            {/* Display Added Nearby Activities */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {hotelData.activities.nearbyActivities.map((activity, index) => (
                <div
                    key={index}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#e0e0e0',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    }}
                >
                    {activity}
                    <button
                    type="button"
                    onClick={() => removeNearbyActivity(index)}
                    style={{
                        marginLeft: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                    >
                    X
                    </button>
                </div>
                ))}
            </div>
            </div>

            {/* Navigation Buttons */}
            <button type="button" onClick={() => setStep(6)}>Back</button>
            <button type="button" onClick={() => setStep(8)}>Next</button>
        </div>
        )}

        {step === 8 && (
        <div>
            <h2>Images</h2>

            {/* Image Upload Input */}
            <input
            type="file"
            multiple
            onChange={handleImageUpload}
            />
            {uploading && <p>Uploading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display Uploaded Images */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {hotelData.images.map((imageUrl, index) => (
                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                <img
                    src={imageUrl}
                    alt={`Uploaded Image ${index + 1}`}
                    style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
                />
                {/* Remove Button */}
                <button
                    type="button"
                    onClick={() => removeImageMain(index)}
                    style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    }}
                >
                    X
                </button>
                </div>
            ))}
            </div>

            {/* Navigation Buttons */}
            <button type="button" onClick={() => setStep(7)}>Back</button>
            <button type="button" onClick={() => setStep(9)}>Next</button>
        </div>
        )}

        {step === 9 && (
        <div>
            <h2>Other Info</h2>

            {/* Other Info Input Field */}
            <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                type="text"
                value={hotelData.otherInfoInput || ''} // Temporary input value
                onChange={(e) => handleOtherInfoInputChange(e)}
                placeholder="Type to add other info"
                />
                {/* Add Button */}
                {hotelData.otherInfoInput && (
                <button
                    type="button"
                    onClick={addOtherInfo}
                    style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    }}
                >
                    Add
                </button>
                )}
            </div>

            {/* Display Added Other Info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {hotelData.otherInfo.map((info, index) => (
                <div
                    key={index}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#e0e0e0',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    }}
                >
                    {info}
                    <button
                    type="button"
                    onClick={() => removeOtherInfo(index)}
                    style={{
                        marginLeft: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                    >
                    X
                    </button>
                </div>
                ))}
            </div>
            </div>

            {/* New Fields */}
            <div style={{ marginBottom: '20px' }}>
            {/* isHaveStars (Radio Button) */}
            <label>
                <input
                type="radio"
                name="isHaveStars"
                checked={hotelData.isHaveStars === true}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    isHaveStars: true,
                }))}
                />
                Has Stars
            </label>
            <label>
                <input
                type="radio"
                name="isHaveStars"
                checked={hotelData.isHaveStars === false}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    isHaveStars: false,
                }))}
                />
                No Stars
            </label>

            {hotelData.isHaveStars && (
                <div style={{ marginTop: '10px' }}>
                    <label>
                        How Many Stars (1-10):
                        <input
                            type="number"
                            name="howManyStars"
                            value={hotelData.howManyStars}
                            onChange={(e) => {
                                let value = e.target.value;
                                
                                // Allow empty input to let the user type freely
                                if (value === "") {
                                    setHotelData(prevState => ({
                                        ...prevState,
                                        howManyStars: value
                                    }));
                                    return;
                                }

                                // Convert to number and enforce min-max
                                value = Math.min(Math.max(Number(value), 1), 10);

                                setHotelData(prevState => ({
                                    ...prevState,
                                    howManyStars: value
                                }));
                            }}
                            min="1"
                            max="10"
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
            )}

            </div>

            {/* Radio Buttons for Other Fields */}
            <div style={{ marginBottom: '20px' }}>
            <label>
                <input
                type="radio"
                name="isVerified"
                checked={hotelData.isVerified === true}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    isVerified: true,
                }))}
                />
                Verified
            </label>
            <label>
                <input
                type="radio"
                name="isVerified"
                checked={hotelData.isVerified === false}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    isVerified: false,
                }))}
                />
                Not Verified
            </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
            <label>
                <input
                type="radio"
                name="isHaveCertificate"
                checked={hotelData.isHaveCertificate === true}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    isHaveCertificate: true,
                }))}
                />
                Has Certificate
            </label>
            <label>
                <input
                type="radio"
                name="isHaveCertificate"
                checked={hotelData.isHaveCertificate === false}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    isHaveCertificate: false,
                }))}
                />
                No Certificate
            </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
            <label>
                <input
                type="radio"
                name="isHaveLicense"
                checked={hotelData.isHaveLicense === true}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    isHaveLicense: true,
                }))}
                />
                Has License
            </label>
            <label>
                <input
                type="radio"
                name="isHaveLicense"
                checked={hotelData.isHaveLicense === false}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    isHaveLicense: false,
                }))}
                />
                No License
            </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
            <label>
                <input
                type="radio"
                name="acceptTeams"
                checked={hotelData.acceptTeams === true}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    acceptTeams: true,
                }))}
                />
                Accepts Teams
            </label>
            <label>
                <input
                type="radio"
                name="acceptTeams"
                checked={hotelData.acceptTeams === false}
                onChange={() => setHotelData(prevState => ({
                    ...prevState,
                    acceptTeams: false,
                }))}
                />
                Does Not Accept Teams
            </label>
            </div>

            {/* Navigation Buttons */}
            <button type="button" onClick={() => setStep(8)}>Back</button>
            <button type="submit">Submit</button>
        </div>
        )}
      </form>
    </Container>
  );
};

export default AddHotel;