import React from 'react';

const Notifications = () => {
  const notificationsData = {
    applications: [
      {
        id: 1,
        applicantName: 'John Doe',
        propertyName: 'Greenfield Apartments',
        date: '2024-09-15',
        status: 'Pending',
      },
      {
        id: 2,
        applicantName: 'Jane Smith',
        propertyName: 'Downtown Residence',
        date: '2024-09-14',
        status: 'Accepted',
      },
    ],
    viewRequests: [
      {
        id: 1,
        requesterName: 'Michael Johnson',
        propertyName: 'Sunny Heights',
        date: '2024-09-13',
        requestType: 'View Request',
      },
      {
        id: 2,
        requesterName: 'Emily Clark',
        propertyName: 'Parkview Towers',
        date: '2024-09-12',
        requestType: 'View Request',
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Accommodation Applications</h3>
        <ul>
          {notificationsData.applications.map((application) => (
            <li key={application.id} className="mb-3 border-b pb-2">
              <div>
                <strong>{application.applicantName}</strong> applied for{' '}
                <strong>{application.propertyName}</strong> on {application.date}.
              </div>
              <div>
                Status: <span className="font-semibold">{application.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Property View Requests</h3>
        <ul>
          {notificationsData.viewRequests.map((request) => (
            <li key={request.id} className="mb-3 border-b pb-2">
              <div>
                <strong>{request.requesterName}</strong> requested to view{' '}
                <strong>{request.propertyName}</strong> on {request.date}.
              </div>
              <div>
                Request Type: <span className="font-semibold">{request.requestType}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
