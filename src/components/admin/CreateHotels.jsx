import { useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import toast from "react-hot-toast";

export function CreateHotelsAndFoodItems() {
  // Hotel state
  const [hotelImage, setHotelImage] = useState({ preview: '', data: '' });
  const [hotelStatus, setHotelStatus] = useState('');
  const [hotelData, setHotelData] = useState({ name: '', phone: '', email: '', website: '' });

  // Food Item state
  const [foodImage, setFoodImage] = useState({ preview: '', data: '' });
  const [foodStatus, setFoodStatus] = useState('');
  const [foodData, setFoodData] = useState({ name: '', description: '', price: '', availability: true });

  // Handles hotel form submission
  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('image', hotelImage.data);
    formData.append('name', hotelData.name);
    formData.append('phone', hotelData.phone);
    formData.append('email', hotelData.email);
    formData.append('website', hotelData.website);

    try {
      const response = await axiosinstance.post('/hotel/createhotel', formData);
      if (response) {
        setHotelStatus('Hotel created successfully!');
        toast.success('Hotel created successfully!');
      }
    } catch (error) {
      toast.error('Failed to create hotel');
      console.error(error);
    }
  };

  // Handles food item form submission
  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('image', foodImage.data);
    formData.append('name', foodData.name);
    formData.append('description', foodData.description);
    formData.append('price', foodData.price);
    formData.append('availability', foodData.availability);

    try {
      const response = await axiosinstance.post('/fooditems/createfood', formData);
      if (response) {
        setFoodStatus('Food item created successfully!');
        toast.success('Food item created successfully!');
      }
    } catch (error) {
      toast.error('Failed to create food item');
      console.error(error);
    }
  };

  const handleHotelFileChange = (e) => {
    const img = { preview: URL.createObjectURL(e.target.files[0]), data: e.target.files[0] };
    setHotelImage(img);
  };

  const handleFoodFileChange = (e) => {
    const img = { preview: URL.createObjectURL(e.target.files[0]), data: e.target.files[0] };
    setFoodImage(img);
  };

  const handleHotelInput = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoodInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="create-hotel-container">
      <h1>Create Hotel</h1>

      {/* Hotel Form */}
      <section className="form-section">
        <h2>Upload Hotel</h2>
        {hotelImage.preview && <img src={hotelImage.preview} width="100" height="100" alt="Hotel preview" className="hotel-preview" />}
        <form onSubmit={handleHotelSubmit} className="hotel-form">
          <input type="file" onChange={handleHotelFileChange} className="input-file" />
          <input type="text" name="name" placeholder="Hotel Name" onChange={handleHotelInput} required className="input-field" />
          <input type="text" name="phone" placeholder="Phone" onChange={handleHotelInput} required className="input-field" />
          <input type="text" name="email" placeholder="Email" onChange={handleHotelInput} required className="input-field" />
          <input type="text" name="website" placeholder="Website" onChange={handleHotelInput} className="input-field" />
          <button type="submit" className="submit-button">Submit Hotel</button>
        </form>
        {hotelStatus && <h4 className="status-message">{hotelStatus}</h4>}
      </section>

      <hr className="divider" />

      {/* Food Item Form */}
      <section className="form-section">
        <h2>Upload Food Item</h2>
        {foodImage.preview && <img src={foodImage.preview} width="100" height="100" alt="Food preview" className="food-preview" />}
        <form onSubmit={handleFoodSubmit} className="food-form">
          <input type="file" onChange={handleFoodFileChange} className="input-file" />
          <input type="text" name="name" placeholder="Food Name" onChange={handleFoodInput} required className="input-field" />
          <textarea name="description" placeholder="Description" onChange={handleFoodInput} required className="input-field" />
          <input type="number" name="price" placeholder="Price" onChange={handleFoodInput} required className="input-field" />
          <label>
            <input type="checkbox" name="availability" checked={foodData.availability} onChange={handleFoodInput} className="input-checkbox" />
            Available
          </label>
          <button type="submit" className="submit-button">Submit Food Item</button>
        </form>
        {foodStatus && <h4 className="status-message">{foodStatus}</h4>}
      </section>
    </div>
  );
}
