import React, { useState } from 'react';
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
    pricing: {
      fullboardPrice: 0,
      halfboardPrice: 0,
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
      nearbyAttractions: [],
    },
    images: [],
    otherInfo: [],
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        pricePerNight: 0,
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
            <h2>Contact Information</h2>
            <input type="email" name="contactInfo.email" value={hotelData.contactInfo.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="contactInfo.contactNumber" value={hotelData.contactInfo.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
            <input type="text" name="contactInfo.whatsappNumber" value={hotelData.contactInfo.whatsappNumber} onChange={handleChange} placeholder="WhatsApp Number" />
            <input type="text" name="contactInfo.facebookUrl" value={hotelData.contactInfo.facebookUrl} onChange={handleChange} placeholder="Facebook URL" />
            <input type="text" name="contactInfo.websiteUrl" value={hotelData.contactInfo.websiteUrl} onChange={handleChange} placeholder="Website URL" />
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
                <input type="number" name="capacity" value={room.capacity} onChange={(e) => handleRoomChange(index, e)} placeholder="Capacity" required />
                <input type="number" name="pricePerNight" value={room.pricePerNight} onChange={(e) => handleRoomChange(index, e)} placeholder="Price Per Night" required />
                <input type="number" name="noOfRooms" value={room.noOfRooms} onChange={(e) => handleRoomChange(index, e)} placeholder="Number of Rooms" required />
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
                <button type="button" onClick={() => removeRoom(index)}>Remove Room</button>
              </div>
            ))}
            <button type="button" onClick={addRoom}>Add Room</button>
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
            <label>
              <input type="checkbox" name="diningOptions.restaurantOnSite" checked={hotelData.diningOptions.restaurantOnSite} onChange={handleChange} />
              Restaurant On Site
            </label>
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
            <button type="button" onClick={() => setStep(7)}>Next</button>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2>Activities</h2>
            <input type="text" name="activities.onsiteActivities" value={hotelData.activities.onsiteActivities.join(',')} onChange={(e) => setHotelData(prevState => ({
              ...prevState,
              activities: {
                ...prevState.activities,
                onsiteActivities: e.target.value.split(',')
              }
            }))} placeholder="Onsite Activities (comma separated)" />
            <input type="text" name="activities.nearbyAttractions" value={hotelData.activities.nearbyAttractions.join(',')} onChange={(e) => setHotelData(prevState => ({
              ...prevState,
              activities: {
                ...prevState.activities,
                nearbyAttractions: e.target.value.split(',')
              }
            }))} placeholder="Nearby Attractions (comma separated)" />
            <button type="button" onClick={() => setStep(8)}>Next</button>
          </div>
        )}

        {step === 8 && (
          <div>
            <h2>Images</h2>
            <input type="file" multiple onChange={handleImageUpload} />
            {uploading && <p>Uploading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="button" onClick={() => setStep(9)}>Next</button>
          </div>
        )}

        {step === 9 && (
          <div>
            <h2>Other Info</h2>
            <textarea name="otherInfo" value={hotelData.otherInfo.join('\n')} onChange={(e) => setHotelData(prevState => ({
              ...prevState,
              otherInfo: e.target.value.split('\n')
            }))} placeholder="Other Info (one per line)" />
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddHotel;