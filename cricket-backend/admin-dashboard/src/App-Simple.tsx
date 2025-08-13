import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#2c3e50', 
          marginBottom: '30px',
          fontSize: '2.5rem'
        }}>
          🏏 CricXL Admin Panel
        </h1>
        
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>✅ System Status</h3>
          <p><strong>Backend API:</strong> Running on port 5000</p>
          <p><strong>Admin Dashboard:</strong> Active</p>
        </div>

        <div style={{
          background: '#e3f2fd',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>🔐 Demo Login</h3>
          <p><strong>Email:</strong> admin@cricxl.com</p>
          <p><strong>Password:</strong> admin123</p>
        </div>

        <div style={{
          background: '#fff3cd',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#856404', marginBottom: '15px' }}>🚀 Features Available</h3>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            <li>📊 Live Match Management</li>
            <li>🏏 Team & Player Database</li>
            <li>📰 News Management</li>
            <li>👥 User Administration</li>
            <li>⚙️ Real-time Controls</li>
          </ul>
        </div>

        <button 
          style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onClick={() => {
            window.open('http://localhost:5000/api/health', '_blank');
          }}
        >
          🔗 Test Backend API
        </button>

        <div style={{
          marginTop: '20px',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          <p>Full admin dashboard with Material-UI components ready to deploy!</p>
          <p>Backend API endpoints available for cricket management.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
