import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user)

  return (
    <div style={{ 
      color: '#fff', 
      padding: '40px', 
      textAlign: 'center',
      background: '#232323',
      minHeight: '100vh'
    }}>
      <h2 style={{ color: '#ffc107', marginBottom: '30px' }}>Welcome</h2>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 style={{ color: '#ffc107', marginBottom: '20px' }}>Your Registered Events</h3>
        
        <div style={{ 
          background: '#181818', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ color: '#ccc' }}>No events registered yet.</p>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            Browse events and register to see them here.
          </p>
        </div>

        {user && (
          <div style={{ 
            background: '#181818', 
            padding: '20px', 
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <h4 style={{ color: '#ffc107', marginBottom: '10px' }}>User Information</h4>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || 'Participant'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;