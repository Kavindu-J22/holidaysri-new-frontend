import React, { useState } from 'react';
import "./Addhotels.css" // Import CSS file for styling

const AddHotelForm = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    category: '',
    location: '',
    description: '',
    price: '',
    images: [],
    distance: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission or validation here
    console.log(formData);
  };

  return (
    <div className="add-hotel-form">
      <h2>Add Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hotelName">Hotel Name:</label>
          <input type="text" id="hotelName" name="hotelName" value={formData.hotelName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="hotels">hotels</option>
            <option value="Appartments">Appartments</option>
            <option value="Resorts">Resorts</option>
            <option value="Villas">Villas</option>
            <option value="Banglalows">Banglalows</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input type="file" id="images" name="images" onChange={handleChange} multiple accept="image/*" />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance:</label>
          <input type="text" id="distance" name="distance" value={formData.distance} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddHotelForm;
