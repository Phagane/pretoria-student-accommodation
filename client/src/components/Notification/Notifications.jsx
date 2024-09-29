import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notificationsData, setNotificationsData] = useState({
    applicants: [],
    viewingRequests: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleAccept = (id, type) => {
    // Logic for accepting application/view request
    console.log(`Accepted ${type} with ID: ${id}`);
  };

  const handleReject = (id, type) => {
    // Logic for rejecting application/view request
    console.log(`Rejected ${type} with ID: ${id}`);
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
                <strong>{applicant.applicantName}</strong> applied for a {applicant.roomType} room in <strong>{applicant.propertyName}</strong>.
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Email: {applicant.applicantEmail}, Phone: 0835138975, Funding Type: {applicant.fundingType}
              </div>
              <div className="mt-3">
                <button
                  onClick={() => handleAccept(applicant._id, 'application')}
                  className="bg-green-600 text-white py-1 px-4 rounded-lg mr-2 hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(applicant._id, 'application')}
                  className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Section: Property View Requests */}
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
                  onClick={() => handleAccept(request._id, 'view request')}
                  className="bg-green-600 text-white py-1 px-4 rounded-lg mr-2 hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request._id, 'view request')}
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
