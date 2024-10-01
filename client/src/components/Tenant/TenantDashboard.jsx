import React from 'react';
import TenantPropertyDetails from './TenantPropertyDetails';

const TenantDashboard = ({ tenantId }) => {

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-red-700 text-2xl font-semibold text-center mb-6">Tenant Dashboard</h2>
      <TenantPropertyDetails tenantId={tenantId} />
    </div>
  );
};

export default TenantDashboard;
