import React from 'react'
import useAuth from '../hooks/useAuth'
import useTitle from '../hooks/useTitle';
import useSettings from '../hooks/useSettings';

const DashboardScreen = () => {
  
  const { firstname, lastname } = useAuth();
  const { settings } = useSettings();

  useTitle('Dashboard')

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{firstname} {lastname}</p>
    </div>
  )

}

export default DashboardScreen