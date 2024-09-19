import React, { useState } from 'react';

const CancelContractRequest = ({ tenant }) => {
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCancelRequest = (e) => {
    e.preventDefault();
    setSubmitted(true); // Set to true after submission
  };

  if (submitted) {
    return <p className="text-green-500">Your cancellation request has been submitted successfully.</p>;
  }

  return (
    <div className="mt-2 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Request to Cancel Contract</h2>
      <form onSubmit={handleCancelRequest}>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Reason for Cancellation
          </label>
          <textarea
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            className="mt-1 p-2 w-full border rounded focus:ring-violet-600 focus:border-violet-600"
            placeholder="Enter the reason for your request"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CancelContractRequest;
