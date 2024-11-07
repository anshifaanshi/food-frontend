// src/components/ImageCarousel.jsx
// src/components/ImageCarousel.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = () => {
  const images = [
    "https://tse2.mm.bing.net/th?id=OIP.HclffFvjlHenc9Y0iJsFpQHaD0&pid=Api&P=0&h=220",
    "https://tse2.mm.bing.net/th?id=OIP.x7db1Ot6seQg-_WEETdDQgHaEe&pid=Api&h=220",
    "https://tse1.mm.bing.net/th?id=OIP.vFeytGRIasd8dLMA1F0OUgHaFY&pid=Api&P=0&h=220",
    "https://tse4.mm.bing.net/th?id=OIP.rfHEhtl9HL_UIfOU_PeSxgHaD9&pid=Api&P=0&h=220"
  ];

  return (
    <div className="menucontainer">
      <Carousel 
        showThumbs={false} 
        autoPlay 
        infiniteLoop 
        interval={2000}  // 2-second interval
        showStatus={false} 
        showIndicators={true}
        stopOnHover={false}  // Keeps auto-play active when hovering
      >
        {images.map((url, index) => (
          <div key={index} className="image-box">
            <img src={url} alt={`Carousel image ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
