import { useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";

export function CreateHotelsAndFoodItems() {
  // Hotel state
  const [hotelImage, setHotelImage] = useState({ preview: '', data: '' });
  const [hotelStatus, setHotelStatus] = useState('');
  const [hotelData, setHotelData] = useState({ name: '', phone: '', email: '' });

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

    try {
      const response = await axiosinstance({
        url: '/hotel/createhotel',
        method: 'POST',
        data: formData,
      });
      if (response) setHotelStatus('Hotel created successfully!');
    } catch (error) {
      setHotelStatus('Failed to create hotel');
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
      const response = await axiosinstance({
        url: '/fooditems/createfood',
        method: 'POST',
        data: formData,
      });
      if (response) setFoodStatus('Food item created successfully!');
    } catch (error) {
      setFoodStatus('Failed to create food item');
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

  // Handles food item image file change
  const handleFoodFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFoodImage(img);
  };

  // Handles hotel input changes
  const handleHotelInput = (event) => {
    setHotelData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Handles food item input changes
  const handleFoodInput = (event) => {
    const { name, value, type, checked } = event.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <h1>Create Hotel and Food Item</h1>

      {/* Hotel Form */}
      <section>
        <h2>Upload Hotel</h2>
        {hotelImage.preview && <img src={hotelImage.preview} width="100" height="100" alt="Hotel preview" />}
        <form onSubmit={handleHotelSubmit}>
          <input type="file" name="file" onChange={handleHotelFileChange} />
          <input type="text" name="name" placeholder="Hotel Name" onChange={handleHotelInput} required />
          <input type="text" name="phone" placeholder="Phone" onChange={handleHotelInput} required />
          <input type="text" name="email" placeholder="Email" onChange={handleHotelInput} required />
          <input type="text" name="website" placeholder="Website" onChange={handleHotelInput} />
          <button type="submit">Submit Hotel</button>
        </form>
        {hotelStatus && <h4>{hotelStatus}</h4>}
      </section>

      <hr />

      {/* Food Item Form */}
      <section>
        <h2>Upload Food Item</h2>
        {foodImage.preview && <img src={foodImage.preview} width="100" height="100" alt="Food preview" />}
        <form onSubmit={handleFoodSubmit}>
          <input type="file" name="file" onChange={handleFoodFileChange} />
          <input type="text" name="name" placeholder="Food Item Name" onChange={handleFoodInput} required />
          <textarea name="description" placeholder="Description" onChange={handleFoodInput} />
          <input type="number" name="price" placeholder="Price" onChange={handleFoodInput} required />
          <label>
            <input type="checkbox" name="availability" checked={foodData.availability} onChange={handleFoodInput} />
            Available
          </label>
          <button type="submit">Submit Food Item</button>
        </form>
        {foodStatus && <h4>{foodStatus}</h4>}
      </section>
    </div>
  );
}
                                                                                                                                                                                                                                                                                         