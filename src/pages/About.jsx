import React from 'react';


function About() {
  return (
    <div>
      
      
      {/* Hero Section with Background Image and Title */}
      <div className="hero-section bg-cover bg-center h-80 flex items-center justify-center" style={{ backgroundImage: "url('https://drive.google.com/uc?export=view&id=1QN-GOZGARk15WKJxjYz2bZSN4XaTmJg3')" }}>
        <h1 className="text-4xl font-bold text-white bg-black bg-opacity-50 px-6 py-3 rounded-md">About Meal Mate</h1>
      </div>

      {/* Mission & Values Section */}
      <section className="my-10 px-8 md:px-20 lg:px-32 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-8">
          At Meal Mate, we believe that food is more than just sustenance; it's an experience that brings people together. Our mission is to provide delicious, high-quality meals from top local restaurants straight to your door, ensuring a delightful dining experience every time.
        </p>

        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Values</h2>
        <ul className="text-lg text-gray-600 mb-8 list-disc list-inside">
          <li>Commitment to Quality: Partnering with restaurants that use only the finest ingredients.</li>
          <li>Customer Satisfaction: Prioritizing seamless ordering, delivery, and customer support.</li>
          <li>Community Support: Supporting local businesses and fostering connections within the community.</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="my-10 bg-gray-100 py-10 px-8 md:px-20 lg:px-32">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Meet Our Team</h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Our passionate team is dedicated to bringing the best food delivery experience to your doorstep. Meet the people who make Meal Mate exceptional!
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Example team member card */}
          <div className="bg-white shadow-md rounded-lg p-4 w-60">
            
            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          {/* Additional team members can be added similarly */}
        </div>
      </section>

      {/* Vision Section */}
      <section className="my-10 px-8 md:px-20 lg:px-32 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Vision</h2>
        <p className="text-lg text-gray-600">
          We envision a world where ordering food is as enjoyable and fulfilling as dining out. Through technology and community focus, Meal Mate aims to be your go-to platform for seamless, reliable food ordering experiences.
        </p>
      </section>

      
    </div>
  );
}

export default About;
