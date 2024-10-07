import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    return (
      <div className="relative w-full bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-12 mb-32">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Contact Us</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          We're here to help! If you have any questions or need more information about student accommodations, feel free to reach out to us using the details below. We'll get back to you as soon as possible.
        </p>
  
        {/* Contact Information */}
        <div className="space-y-8">
          {/* Email */}
          <div>
            <h3 className="text-lg font-medium text-gray-800">Email</h3>
            <p className="text-gray-600 mt-2">romeo@pretoriastudentaccommodation.co.za</p>
          </div>
  
          {/* Phone */}
          <div>
            <h3 className="text-lg font-medium text-gray-800">Phone</h3>
            <p className="text-gray-600 mt-2">+27 79 171 0881</p>
          </div>
  
          {/* Office Hours */}
          <div>
            <h3 className="text-lg font-medium text-gray-800">Office Hours</h3>
            <p className="text-gray-600 mt-2">Monday - Friday: 9:00 AM - 5:00 PM</p>
          </div>
        </div>
  
        {/* Additional Info */}
        <div className="mt-10 bg-indigo-50 p-4 rounded-md">
          <h4 className="text-indigo-600 font-semibold">Need more information?</h4>
          <p className="text-gray-600 mt-2">
          Have more questions? Check out our <Link to="/faq#faq-section "><span className='text-indigo-600 font-semibold'>FAQ</span></Link>.
          </p>
        </div>
      </div>
    );
  };
  
  export default ContactUs;  