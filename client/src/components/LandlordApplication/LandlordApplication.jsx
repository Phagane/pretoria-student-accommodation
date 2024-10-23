import React from 'react';//q


const LandlordApplication = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Apply To Become A Landlord</h1>
      <button
        className="bg-violet-700 my-2 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2"
        
      >
        Apply Now 
      </button>
        
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Benefits of Using Our Platform</h2>

        <div>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-2">
              <strong>Efficient Tenant Management:</strong> Easily add tenants to properties and keep track of their status.
            </li>
            <li className="mb-2">
              <strong>Manage Properties:</strong> Keep your property listings up to date and manage your real estate portfolio.
            </li>
            <li>
              <strong>Streamlined Workflow:</strong> Manage everything from one platform, including tenant requests and applications.
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Application Terms And Conditions</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li className="mb-2">
              <strong>Apply for Accommodations:</strong> Easily search and apply for accommodations listed on the platform.
            </li>
            <li className="mb-2">
              <strong>Request Property Viewings:</strong> Students can request a viewing for any property they are interested in.
            </li>
            <li>
              <strong>Stay Informed About Their Accommodation Details:</strong> Get Detailed infomation about their accommodation details and room number.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default LandlordApplication;
