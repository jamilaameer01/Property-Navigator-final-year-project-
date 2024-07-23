import React from "react";

export default function Services() {
  return (
    <div className="container  mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 p-3  text-slate-700 text-center">
        Our Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-10 md:gap-12 ">
        <ServiceCard
          image="service1.jpg"
          title="Sell"
          description=" Our housing services are designed to not just sell houses but to unlock the true potential of your living spaces."
        />

        <ServiceCard1
          image="service2.jpg"
          title=" Rent"
          description="Explore our listings and discover the convenience of renting with us. We're here to help you find the ideal rental property that aligns with your lifestyle and preferences.."
        />
      </div>
    </div>
  );
}

const ServiceCard = ({ image, title, description }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md  ">
      <img src="../service1.jpg" alt={title} className="mb-4 rounded-md p-2 " />

      <h2 className="text-xl font-semibold mb-2 italic  text-slate-700 text-center">
        {title}
      </h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
const ServiceCard1 = ({ image, title, description }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
      <img src="../service2.jpg" alt={title} className="mb-4 rounded-md p-2 " />

      <h2 className="text-xl font-semibold mb-2 italic  text-slate-700 text-center">
        {title}
      </h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
