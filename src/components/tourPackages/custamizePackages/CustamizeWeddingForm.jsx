import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaConciergeBell, FaCamera, FaMusic, FaHotel } from 'react-icons/fa';

function WeddingCustomizationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    guestCount: '',
    theme: '',
    foodPreferences: '',
    musicPreference: '',
    photography: '',
    eventPlanner: '',
    decorationStyle: '',
    lightingOptions: '',
    additionalServices: [],
    hotel: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        additionalServices: checked
          ? [...prevData.additionalServices, value]
          : prevData.additionalServices.filter((service) => service !== value)
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Wedding Customization Details:", formData);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3><FaUser /> General Details</h3>
            <div>
              <label>
                Bride's Name:
                <input type="text" name="brideName" value={formData.brideName} onChange={handleChange} required />
              </label>
            </div>
            <div>
              <label>
                Groom's Name:
                <input type="text" name="groomName" value={formData.groomName} onChange={handleChange} required />
              </label>
            </div>
            <div>
              <label>
                Wedding Date:
                <input type="date" name="weddingDate" value={formData.weddingDate} onChange={handleChange} required />
              </label>
            </div>
            <div>
              <label>
                Number of Guests:
                <input type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} required />
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3><FaCalendarAlt /> Wedding Theme & Hotel</h3>
            <div>
              <label>
                Wedding Theme:
                <select name="theme" value={formData.theme} onChange={handleChange} required>
                  <option value="">Select a Theme</option>
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="bohemian">Bohemian</option>
                  <option value="vintage">Vintage</option>
                  <option value="beach">Beach</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Select Hotel:
                <select name="hotel" value={formData.hotel} onChange={handleChange} required>
                  <option value="">Choose Hotel Option</option>
                  <option value="hotel-paradise">Hotel Paradise</option>
                  <option value="luxury-inn">Luxury Inn</option>
                  <option value="beach-resort">Beach Resort</option>
                  <option value="garden-villa">Garden Villa</option>
                </select>
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3><FaMusic /> Music & Photography</h3>
            <div>
              <label>
                Music Preference:
                <select name="musicPreference" value={formData.musicPreference} onChange={handleChange} required>
                  <option value="">Select Music Preference</option>
                  <option value="dj">DJ</option>
                  <option value="live-band">Live Band</option>
                  <option value="classical">Classical</option>
                  <option value="no-preference">No Preference</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Photography Package:
                <select name="photography" value={formData.photography} onChange={handleChange} required>
                  <option value="">Select Photography Option</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="video-only">Video Only</option>
                </select>
              </label>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3><FaConciergeBell /> Additional Services</h3>
            <div>
              <label>
                Event Planner Required:
                <select name="eventPlanner" value={formData.eventPlanner} onChange={handleChange} required>
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Decoration Style:
                <select name="decorationStyle" value={formData.decorationStyle} onChange={handleChange} required>
                  <option value="">Select Decoration Style</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="floral">Floral</option>
                  <option value="rustic">Rustic</option>
                  <option value="luxurious">Luxurious</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Special Lighting Options:
                <select name="lightingOptions" value={formData.lightingOptions} onChange={handleChange} required>
                  <option value="">Select Lighting Option</option>
                  <option value="ambient">Ambient Lighting</option>
                  <option value="fairy-lights">Fairy Lights</option>
                  <option value="uplighting">Uplighting</option>
                  <option value="no-special-lighting">No Special Lighting</option>
                </select>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '40px', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#444', textAlign: 'center', marginBottom: '20px' }}>Wedding Customization Form</h2>
        {renderStep()}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {step > 1 && <button type="button" onClick={prevStep} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#6c757d', color: '#fff', border: 'none' }}>Previous</button>}
          {step < 4 ? (
            <button type="button" onClick={nextStep} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>Next</button>
          ) : (
            <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}>Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default WeddingCustomizationForm;
