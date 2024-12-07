import { useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import toast from "react-hot-toast";

export function CreateHotelsAndFoodItems() {
  // Hotel state
  const [hotelImage, setHotelImage] = useState({ preview: '', data: '' });
  const [hotelStatus, setHotelStatus] = useState('');
  const [hotelData, setHotelData] = useState({ name: '', phone: '', email: '' });

  // Food Item state
  const [foodData, setFoodData] = useState({ name: '', description: '', price: '', availability: true });
  const [foodStatus, setFoodStatus] = useState('');

  // Handles hotel form submission
  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('image', hotelImage.data);
    formData.append('name', hotelData.name);
    formData.append('phone', hotelData.phone);
    formData.append('email', hotelData.email);
    try {
      const response = await axiosinstance({
        url: '/hotel/createhotel',
        method: 'POST',
        data: formData,
      });
      if (response) {
        toast.success('Hotel created successfully! Check the hotels list.');
        setHotelStatus(''); // Clear status
        setHotelImage({ preview: '', data: '' }); // Clear image preview
        setHotelData({ name: '', phone: '', email: '' }); // Reset hotel data
      }
    } catch (error) {
      toast.error('Failed to create hotel');
      setHotelStatus('Failed to create hotel.'); // Set failure status
      console.error(error);
    }
  };

  // Handles food item form submission
  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: foodData.name,
      description: foodData.description,
      price: foodData.price,
      availability: foodData.availability,
    };

    try {
      const response = await axiosinstance({
        url: '/fooditems/createfood',
        method: 'POST',
        data,
      });
      if (response) {
        toast.success('Food item created successfully! Check the menu.');
        setFoodStatus(''); // Clear status
        setFoodData({ name: '', description: '', price: '', availability: true }); // Reset food data
      }
    } catch (error) {
      toast.error('Failed to create food item');
      setFoodStatus('Failed to create food item.'); // Set failure status
      console.error(error);
    }
  };

  // Handles hotel image file change
  const handleHotelFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setHotelImage(img);
  };

  // Handles food item input changes
  const handleFoodInput = (event) => {
    const { name, value, type, checked } = event.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handles hotel input changes
  const handleHotelInput = (event) => {
    const { name, value } = event.target;
    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="create-hotel-container">
      <h1>Create Hotel</h1>
      {/* Hotel Form */}
      <section className="form-section">
        <h2>Upload Hotel</h2>
        {hotelImage.preview && (
          <img
            src={hotelImage.preview}
            width="100"
            height="100"
            alt="Hotel preview"
            className="hotel-preview"
          />
        )}
        <form onSubmit={handleHotelSubmit} className="hotel-form">
          <input
            type="file"
            name="file"
            onChange={handleHotelFileChange}
            className="input-file"
          />
          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            onChange={handleHotelInput}
            value={hotelData.name} // Ensure the form reflects the state
            required
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleHotelInput}
            value={hotelData.phone} // Ensure the form reflects the state
            required
            className="input-field"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleHotelInput}
            value={hotelData.email} // Ensure the form reflects the state
            required
            className="input-field"
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            onChange={handleHotelInput}
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Submit Hotel
          </button>
        </form>
        {hotelStatus && <h4 className="status-message">{hotelStatus}</h4>}
      </section>

      <hr className="divider" />
      <section className="form-section">
        <h2>Upload Food Item</h2>
        <form onSubmit={handleFoodSubmit} className="food-form">
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            onChange={handleFoodInput}
            value={foodData.name} // Ensure the form reflects the state
            required
            className="input-field"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleFoodInput}
            value={foodData.description} // Ensure the form reflects the state
            required
            className="input-field"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleFoodInput}
            value={foodData.price} // Ensure the form reflects the state
            required
            className="input-field"
          />
          <label>
            <input
              type="checkbox"
              name="availability"
              checked={foodData.availability}
              onChange={handleFoodInput}
              className="input-checkbox"
            />
            Available
          </label>
          <button type="submit" className="submit-button">
            Submit Food Item
          </button>
        </form>
        {foodStatus && <h4 className="status-message">{foodStatus}</h4>}
      </section>
    </div>
  );
}
