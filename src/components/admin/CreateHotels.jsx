import { useState, useEffect } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import toast from "react-hot-toast";

export function CreateHotelsAndFoodItems() {
  // Hotel state
  const [hotelImage, setHotelImage] = useState({ preview: '', data: '' });
  const [hotelStatus, setHotelStatus] = useState('');
  const [hotelData, setHotelData] = useState({ name: '', phone: '', email: '' });
  const [hotels, setHotels] = useState([]); // Store list of hotels
  const [selectedHotelId, setSelectedHotelId] = useState(''); // Store selected hotel ID

  // Food Item state
  const [foodImageUrl, setFoodImageUrl] = useState(''); // Food image URL state
  const [foodStatus, setFoodStatus] = useState('');
  const [foodData, setFoodData] = useState({ name: '', description: '', price: '', availability: true });

  // Fetch list of hotels on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axiosinstance.get("/hotel/gethotels");
        if (Array.isArray(response.data)) {
          setHotels(response.data); // Set the hotels array if it's valid
        } else {
          console.error("Received data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        toast.error("Failed to fetch hotels.");
      }
    };
    

    fetchHotels();
  }, []);

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
    if (!selectedHotelId) {
      toast.error("Please select a hotel for the food item.");
      return;
    }

    const data = {
      image: foodImageUrl, // Image URL is sent as part of the request body
      name: foodData.name,
      description: foodData.description,
      price: foodData.price,
      availability: foodData.availability,
      hotelId: selectedHotelId,
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
        setFoodImageUrl(''); // Clear image URL
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

  // Handles food image URL input change
  const handleFoodImageUrlChange = (e) => {
    setFoodImageUrl(e.target.value);
  };

  // Handles hotel input changes
  const handleHotelInput = (event) => {
    const { name, value } = event.target;
    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <div className="create-hotel-container">
      <h1>Create Hotel</h1>
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
            value={hotelData.name}
            required
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleHotelInput}
            value={hotelData.phone}
            required
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleHotelInput}
            value={hotelData.email}
            required
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
        {foodImageUrl && (
          <img
            src={foodImageUrl}
            width="100"
            height="100"
            alt="Food preview"
            className="food-preview"
          />
        )}
        <form onSubmit={handleFoodSubmit} className="food-form">
          {/* Hotel selection dropdown */}
          <select
            name="hotel"
            value={selectedHotelId}
            onChange={(e) => setSelectedHotelId(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select Hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="imageUrl"
            placeholder="Food Image URL"
            onChange={handleFoodImageUrlChange}
            value={foodImageUrl}
            className="input-field"
          />
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            onChange={handleFoodInput}
            value={foodData.name}
            required
            className="input-field"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleFoodInput}
            value={foodData.description}
            required
            className="input-field"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleFoodInput}
            value={foodData.price}
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
