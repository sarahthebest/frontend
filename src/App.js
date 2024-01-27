import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      } 

      const result = await response.json();
      localStorage.setItem('access_token', result.token);
      setAuthenticated(true);
      setShowLoginModal(false);
    } catch (error) {
      alert(error.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAuthenticated(false);
    setData(null);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:3002/data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          alert('Session expired. Please login again.');
          return;
        } else if (response.status === 403){
          alert ('Access denied.');
          return;
        }
        throw new Error('Failed to fetch data from backend');
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      alert(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoading && <div className="spinner"></div>}
        {!isLoading && isAuthenticated ?
          <>
            {data ? <div className="data-card">{data}</div> : <button onClick={fetchData} className="fetch-data-button">Fetch Data</button>}
            <button onClick={handleLogout}className="logout-button">Logout</button>
          </> :
          <button onClick={() => setShowLoginModal(true)} className="login-button">Login</button>
        }
        {showLoginModal && (
          <div className="login-modal">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input-field" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-field" />
            <button onClick={handleLogin} className="login-button2">Login</button>
            <button onClick={() => setShowLoginModal(false)} className="login-button2">Cancel</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

