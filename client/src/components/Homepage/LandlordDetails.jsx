// AgentDetails.js
import React from 'react';

const LandLordDetails = ({ agent }) => {
  if (!agent) {
    return <p>No agent details available.</p>;
  }

  return (
    <div className="max-w-2xl pt-2 mt-2 mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-1">
      <h2 className="text-lg font-semibold ml-2 mb-2">Listed by</h2>
      <div className="flex items-center">
        <div className='ml-2'>
          <p className="text-md font-bold mb-1">{agent.name}</p>
          <p className="text-gray-500 mb-1">Email: <a href={`mailto:${agent.email}`} className="text-violet-700">{agent.email}</a></p>
          <p className="text-gray-500 mb-2">Phone: 0{agent.phoneNum}</p>
        </div>
      </div>
    </div>
  );
};

export default LandLordDetails;
