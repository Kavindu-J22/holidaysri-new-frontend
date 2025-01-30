import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    },
    diningOptions: {
      breakfastIncluded: false,
      breakfastInfo: '',
      breakfastCharge: 0,
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
      minimumCheckInAge: 18,
      damageDeposit: false,
      damageDepositAmount: 0,
      refundPolicy: '',
      noShowPolicy: '',
      lateCheckOutPolicy: '',
      earlyCheckInPolicy: '',
      quietHours: '',
      additionalCharges: '',
    },
    activities: {
      onsiteActivities: [],
      nearbyAttractions: [], // this for nearby locations
      nearbyActivities: [], // this for nearby Attractions and Activities
    },
    images: [],
    otherInfo: [],
    isHaveStars: false,
    howManyStars: 0,
    isVerified: false,
    isHaveCertificate: false,
    isHaveLicense: false,
    acceptTeams: false,
    displayPriceMain: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

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
  };

  const handleRoomChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedRooms = [...hotelData.rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [name]: type === 'checkbox' ? checked : value
    };
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms
    }));
  };

  const addRoom = () => {
    setHotelData(prevState => ({
      ...prevState,
      rooms: [...prevState.rooms, {
        roomName: '',
        type: '',
        capacity: 0,
        beds: 0,
        roomDescription: '',
        pricePerNight: 0,
        pricePerFullDay: 0,
        pricing: {
            fullboardPrice: 0,
            fullboardinclude: [], 
            halfboardPrice: 0,
            halfboardinclude: [], 
          },
        isAvailable: true,
        amenities: [],
        images: [],
        noOfRooms: 0,
        roomOpenForAgents: false,
        discountForPromo: 0,
        EarnRateForPromo: 0,
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
    'Air Conditioning',
    'Free Wi-Fi',
    'Mini Bar',
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
    <div style={{ backgroundColor: 'white', marginTop: '70px', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2>Primary Details</h2>
            <input type="text" name="hotelName" value={hotelData.hotelName} onChange={handleChange} placeholder="Hotel Name" required />
            <input type="text" name="category" value={hotelData.category} onChange={handleChange} placeholder="Category" required />
            <textarea name="description" value={hotelData.description} onChange={handleChange} placeholder="Description" required />
            <input type="text" name="climate" value={hotelData.climate} onChange={handleChange} placeholder="Climate" required />
            <input type="text" name="location.address" value={hotelData.location.address} onChange={handleChange} placeholder="Address" required />
            <input type="text" name="location.city" value={hotelData.location.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="location.province" value={hotelData.location.province} onChange={handleChange} placeholder="Province" required />
            <input type="text" name="location.mapUrl" value={hotelData.location.mapUrl} onChange={handleChange} placeholder="Map URL" required />
            <button type="button" onClick={() => setStep(2)}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Contact Information </h2>
            <input type="email" name="contactInfo.email" value={hotelData.contactInfo.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="contactInfo.contactNumber" value={hotelData.contactInfo.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
            <input type="text" name="contactInfo.whatsappNumber" value={hotelData.contactInfo.whatsappNumber} onChange={handleChange} placeholder="WhatsApp Number" />
            <input type="text" name="contactInfo.facebookUrl" value={hotelData.contactInfo.facebookUrl} onChange={handleChange} placeholder="Facebook URL" />
            <input type="text" name="contactInfo.websiteUrl" value={hotelData.contactInfo.websiteUrl} onChange={handleChange} placeholder="Website URL" />
            
            <button type="button" onClick={() => setStep(1)}>Back</button>
            <button type="button" onClick={() => setStep(3)}>Next</button>
          </div>
        )}

        {step === 3 && (
        <div>
            <h2>Rooms</h2>
            {hotelData.rooms.map((room, index) => (
            <div key={index}>
                <input type="text" name="roomName" value={room.roomName} onChange={(e) => handleRoomChange(index, e)} placeholder="Room Name" required />
                <input type="text" name="type" value={room.type} onChange={(e) => handleRoomChange(index, e)} placeholder="Type" required />
                <input type="number" name="beds" value={room.beds} onChange={(e) => handleRoomChange(index, e)} placeholder="beds" required />
                <input type="number" name="capacity" value={room.capacity} onChange={(e) => handleRoomChange(index, e)} placeholder="Capacity" required />
                <input type="text" name="roomDescription" value={room.roomDescription} onChange={(e) => handleRoomChange(index, e)} placeholder="room Description" required />
                <input type="number" name="noOfRooms" value={room.noOfRooms} onChange={(e) => handleRoomChange(index, e)} placeholder="Number of Rooms ( This Type )" required />

                <input type="number" name="pricePerNight" value={room.pricePerNight} onChange={(e) => handleRoomChange(index, e)} placeholder="Price Per Night" required />
                <input type="number" name="pricePerFullDay" value={room.pricePerFullDay} onChange={(e) => handleRoomChange(index, e)} placeholder="Price Per FullDay" required />

                <input type="number" name="fullboardPrice" value={room.pricing.fullboardPrice} onChange={(e) => handleRoomChange(index, e)} placeholder="fullboard Price" required />
                <input type="text" name="fullboardinclude" value={room.pricing.fullboardinclude} onChange={(e) => handleRoomChange(index, e)} placeholder="fullboard Includes" required />
                <input type="number" name="halfboardPrice" value={room.pricing.halfboardPrice} onChange={(e) => handleRoomChange(index, e)} placeholder="halfboard Price" required />
                <input type="text" name="halfboardinclude" value={room.pricing.halfboardinclude} onChange={(e) => handleRoomChange(index, e)} placeholder="halfboard Includes Includes" required />
                
                <label>
                <input type="checkbox" name="roomOpenForAgents" checked={room.roomOpenForAgents} onChange={(e) => handleRoomChange(index, e)} />
                Room Open For Agents
                </label>
                {room.roomOpenForAgents && (
                <>
                    <input type="number" name="discountForPromo" value={room.discountForPromo} onChange={(e) => handleRoomChange(index, e)} placeholder="Discount for Promo" />
                    <input type="number" name="EarnRateForPromo" value={room.EarnRateForPromo} onChange={(e) => handleRoomChange(index, e)} placeholder="Earn Rate for Promo" />
                </>
                )}

                {/* Amenities Input with Suggestions */}
                <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={room.amenitiesInput || ''} // Temporary input value
                            onChange={(e) => handleAmenityInputChange(index, e)}
                            placeholder="Type to add amenities"
                        />
                        {/* Suggestions Dropdown */}
                        {room.showSuggestions && (
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
                            {filteredAmenities(room.amenitiesInput).map((amenity, i) => (
                                <div
                                key={i}
                                onClick={() => addAmenity(index, amenity)}
                                style={{
                                    padding: '8px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #eee',
                                    backgroundColor: '#f9f9f9',
                                }}
                                >
                                {amenity}
                                </div>
                            ))}
                            </div>
                        )}
                        </div>

                        {/* Display Added Amenities */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                        {room.amenities.map((amenity, amenityIndex) => (
                            <div
                            key={amenityIndex}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#e0e0e0',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '14px',
                            }}
                            >
                            {amenity}
                            <button
                                type="button"
                                onClick={() => removeAmenity(index, amenityIndex)}
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
                
                {/* Image Upload Section */}
                <input type="file" multiple onChange={(e) => handleRoomImageUpload(index, e)} />

                {/* Display Uploaded Images with Close Button */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {room.images.map((imageUrl, imgIndex) => (
                    <div key={imgIndex} style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        src={imageUrl}
                        alt={`Room ${index + 1} Image ${imgIndex + 1}`}
                        style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
                    />
                    <button
                        type="button"
                        onClick={() => removeImage(index, imgIndex)}
                        style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
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
                
                <button type="button" onClick={() => removeRoom(index)}>Remove Room</button>
            </div>
            ))}
            <button type="button" onClick={addRoom}>Add Room</button>
            <button type="button" onClick={() => setStep(2)}>Back</button>
            <button type="button" onClick={() => setStep(4)}>Next</button>
        </div>
        )}


        {step === 4 && (
          <div>
            <h2>Facilities</h2>
            {Object.keys(hotelData.facilities).map(facility => (
              <label key={facility}>
                <input
                  type="checkbox"
                  name={`facilities.${facility}`}
                  checked={hotelData.facilities[facility]}
                  onChange={handleChange}
                />
                {facility}
              </label>
            ))}
            <button type="button" onClick={() => setStep(3)}>Back</button>
            <button type="button" onClick={() => setStep(5)}>Next</button>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2>Dining Options</h2>
            <label>
              <input type="checkbox" name="diningOptions.breakfastIncluded" checked={hotelData.diningOptions.breakfastIncluded} onChange={handleChange} />
              Breakfast Included
            </label>
            <input type="text" name="diningOptions.breakfastInfo" value={hotelData.diningOptions.breakfastInfo} onChange={handleChange} placeholder="Breakfast Info" />
            <input type="number" name="diningOptions.breakfastCharge" value={hotelData.diningOptions.breakfastCharge} onChange={handleChange} placeholder="charge For breakfast" />
            <label>
              <input type="checkbox" name="diningOptions.restaurantOnSite" checked={hotelData.diningOptions.restaurantOnSite} onChange={handleChange} />
              Restaurant On Site
            </label>
            <button type="button" onClick={() => setStep(4)}>Back</button>
            <button type="button" onClick={() => setStep(6)}>Next</button>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2>Policies</h2>
            <label>
              <input type="checkbox" name="policies.allowsLiquor" checked={hotelData.policies.allowsLiquor} onChange={handleChange} />
              Allows Liquor
            </label>
            <label>
              <input type="checkbox" name="policies.allowsSmoking" checked={hotelData.policies.allowsSmoking} onChange={handleChange} />
              Allows Smoking
            </label>
            <textarea name="policies.cancellationPolicy" value={hotelData.policies.cancellationPolicy} onChange={handleChange} placeholder="Cancellation Policy" required />
            <input type="text" name="policies.checkInTime" value={hotelData.policies.checkInTime} onChange={handleChange} placeholder="Check-In Time" required />
            <input type="text" name="policies.checkOutTime" value={hotelData.policies.checkOutTime} onChange={handleChange} placeholder="Check-Out Time" required />
            <label>
              <input type="checkbox" name="policies.pets" checked={hotelData.policies.pets} onChange={handleChange} />
              Pets Allowed
            </label>
            <textarea name="policies.petPolicyDetails" value={hotelData.policies.petPolicyDetails} onChange={handleChange} placeholder="Pet Policy Details" />
            <label>
              <input type="checkbox" name="policies.parties" checked={hotelData.policies.parties} onChange={handleChange} />
              Parties Allowed
            </label>
            <textarea name="policies.partyPolicyDetails" value={hotelData.policies.partyPolicyDetails} onChange={handleChange} placeholder="Party Policy Details" />
            <textarea name="policies.childPolicy" value={hotelData.policies.childPolicy} onChange={handleChange} placeholder="Child Policy" required />
            <label>
              <input type="checkbox" name="policies.ageRestriction" checked={hotelData.policies.ageRestriction} onChange={handleChange} />
              Age Restriction
            </label>
            <input type="number" name="policies.minimumCheckInAge" value={hotelData.policies.minimumCheckInAge} onChange={handleChange} placeholder="Minimum Check-In Age" required />
            <label>
              <input type="checkbox" name="policies.damageDeposit" checked={hotelData.policies.damageDeposit} onChange={handleChange} />
              Damage Deposit
            </label>
            <input type="number" name="policies.damageDepositAmount" value={hotelData.policies.damageDepositAmount} onChange={handleChange} placeholder="Damage Deposit Amount" />
            <textarea name="policies.refundPolicy" value={hotelData.policies.refundPolicy} onChange={handleChange} placeholder="Refund Policy" required />
            <textarea name="policies.noShowPolicy" value={hotelData.policies.noShowPolicy} onChange={handleChange} placeholder="No Show Policy" required />
            <textarea name="policies.lateCheckOutPolicy" value={hotelData.policies.lateCheckOutPolicy} onChange={handleChange} placeholder="Late Check-Out Policy" required />
            <textarea name="policies.earlyCheckInPolicy" value={hotelData.policies.earlyCheckInPolicy} onChange={handleChange} placeholder="Early Check-In Policy" required />
            <input type="text" name="policies.quietHours" value={hotelData.policies.quietHours} onChange={handleChange} placeholder="Quiet Hours" required />
            <textarea name="policies.additionalCharges" value={hotelData.policies.additionalCharges} onChange={handleChange} placeholder="Additional Charges" required />
            <button type="button" onClick={() => setStep(5)}>Back</button>
            <button type="button" onClick={() => setStep(7)}>Next</button>
          </div>
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

            {/* howManyStars (Conditional Field) */}
            {hotelData.isHaveStars && (
                <div style={{ marginTop: '10px' }}>
                <label>
                    How Many Stars (1-10):
                    <input
                    type="number"
                    name="howManyStars"
                    value={hotelData.howManyStars}
                    onChange={(e) => {
                        const value = Math.min(Math.max(Number(e.target.value), 1), 10); // Ensure value is between 1 and 10
                        setHotelData(prevState => ({
                        ...prevState,
                        howManyStars: value,
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
    </div>
  );
};

export default AddHotel;