import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notificationsData, setNotificationsData] = useState({
    applicants: [],
    viewingRequests: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('sharing');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/landlord/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotificationsData({
          applicants: response.data.applicants,
          viewingRequests: response.data.viewingRequests,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const openAcceptForm = (applicantId, propertyId) => {
    setSelectedApplicantId(applicantId);
    setSelectedPropertyId(propertyId);
    setIsFormVisible(true); // Show the form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:8000/api/v1/landlord/accept-applicant',
        { applicantId: selectedApplicantId, propertyId: selectedPropertyId, roomNumber, roomType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Applicant accepted and added as tenant');
      setIsFormVisible(false); // Hide the form after submission
      // Optionally, refresh the notifications
    } catch (err) {
      console.error(err);
      alert('Failed to accept applicant');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Notifications</h2>

      {/* Section: Accommodation Applications */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-indigo-700 pb-2">
          Accommodation Applications
        </h3>
        <ul>
          {notificationsData.applicants.map((applicant) => (
            <li key={applicant._id} className="mb-4 p-4 bg-white rounded-lg shadow-md border">
              <div className="text-lg font-medium">
                <strong>{applicant.user.name}</strong> applied for a {applicant.roomType} room at {applicant.propertyName}
              </div>
              <div className="mt-3">
                <button
                  onClick={() => openAcceptForm(applicant._id, applicant.propertyId)}
                  className="bg-green-600 text-white py-1 px-4 rounded-lg mr-2 hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Form to accept applicant and input room details */}
      {isFormVisible && (
        <div className="p-4 bg-gray-100 border rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-green-700">Accept Applicant</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="roomNumber" className="block text-gray-700">
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="roomType" className="block text-gray-700">
                Room Type
              </label>
              <select
                id="roomType"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="single">Single</option>
                <option value="sharing">Sharing</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
       <div>
        <h3 className="text-xl font-bold mb-4 text-green-700 pb-2">
          Property View Requests
        </h3>
        <ul>
          {notificationsData.viewingRequests.map((request) => (
            <li key={request._id} className="mb-4 p-4 bg-white rounded-lg shadow-md border">
              <div className="text-lg font-medium">
                <strong>{request.name}</strong> requested to view <strong>{request.propertyName}</strong> on {new Date(request.date).toLocaleDateString()}.
              </div>
              <div className="mt-3">
                <button
                  /* onClick={() => handleAccept(request._id, 'view request')} */
                  className="bg-green-600 text-white py-1 px-4 rounded-lg mr-2 hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                 /*  onClick={() => handleReject(request._id, 'view request')} */
                  className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
