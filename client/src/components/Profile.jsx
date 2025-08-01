import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Profile updated:", formData);
  };

  return (
    <div style={{ 
      color: '#fff', 
      padding: '40px', 
      textAlign: 'center',
      background: '#232323',
      minHeight: '100vh'
    }}>
      <h2 style={{ color: '#ffc107', marginBottom: '30px' }}>Your Profile</h2>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ffc107' }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              background: '#181818',
              border: '2px solid #ffc107',
              borderRadius: '6px',
              color: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ffc107' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              background: '#181818',
              border: '2px solid #ffc107',
              borderRadius: '6px',
              color: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ffc107' }}>Change Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              background: '#181818',
              border: '2px solid #ffc107',
              borderRadius: '6px',
              color: '#fff'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <span style={{ color: '#ffc107', fontWeight: 'bold' }}>Participant</span>
        </div>

        <button
          type="submit"
          style={{
            background: '#ffc107',
            color: '#232323',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '15px',
            width: '100%'
          }}
        >
          Save Changes
        </button>

        <button
          type="button"
          style={{
            background: '#4caf50',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Request Organizer Role
        </button>
      </form>
    </div>
  );
};

export default Profile;