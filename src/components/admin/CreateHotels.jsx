import { useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";

export function CreateHotels() {
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');
  const [data, setData] = useState({ name: '', phone: '', email: '' });

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object and append fields
    let formData = new FormData();
    formData.append('image', image.data); // Correct usage of FormData
    formData.append('name', data.name);    // Append the name
    formData.append('phone', data.phone);  // Append the phone
    formData.append('email', data.email);  // Append the email
const response=await axiosinstance({
  url:'/hotel/createhotel',
  method:'POST',
  data:formData,
})
console.log(formData)
    // POST the form data to the backend
    //const response = await fetch('ttp://localhost:3002/image', {
    //  method: 'POST',
   //   body: formData,
  //  });
    if (response) setStatus(response.statusText);
  };

  // Handles image file change
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
console.log(data)
  // Hand
 
  const handleInput = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div>
  <h1>Upload to Server</h1>
  {image.preview && <img src={image.preview} width='100' height='100' />}
  <hr />
  <form onSubmit={handleSubmit}>
    {/* Basic Hotel Details */}
    <input type='file' name='file' onChange={handleFileChange} />
    <input type='text' name='name' placeholder='Hotel Name' onChange={handleInput} required />
    <input type='text' name='phone' placeholder='Phone' onChange={handleInput} required />
    <input type='text' name='email' placeholder='Email' onChange={handleInput} required />
    <input type='text' name='website' placeholder='Website' onChange={handleInput} />

    {/* Address Fields */}
    <h3>Address Details</h3>
    <input type='text' name='street' placeholder='Street' onChange={handleInput} required />
    <input type='text' name='city' placeholder='City' onChange={handleInput} required />
    <input type='text' name='state' placeholder='State' onChange={handleInput} />
    <input type='text' name='postalcode' placeholder='Postal Code' onChange={handleInput} required />
    <input type='text' name='country' placeholder='Country' onChange={handleInput} required />

    {/* Hotel Information */}
    <h3>Additional Information</h3>
    <input type='number' name='rating' placeholder='Rating (0-5)' min='0' max='5' onChange={handleInput} />
    <input type='text' name='cuisineType' placeholder='Cuisine Type (comma separated)' onChange={handleInput} />
    
    {/* Opening Hours */}
    <h3>Opening Hours</h3>
    <input type='text' name='open' placeholder='Opening Time (e.g., 9:00 AM)' onChange={handleInput} />
    <input type='text' name='close' placeholder='Closing Time (e.g., 10:00 PM)' onChange={handleInput} />

    <button type='submit'>Submit</button>
  </form>
  {status && <h4>{status}</h4>}
</div>

  );
}
