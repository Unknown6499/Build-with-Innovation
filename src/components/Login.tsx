import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router'
import './Login.css'
interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
 
  const [authToken, setAuthToken] = useState<string | null>(null);
  const navigate = useNavigate();
 


//check if user is already logged in
useEffect(() => {
  const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      
       return navigate('/')
      
    }
}, [])

  const handleLogin = async () => {
   
    try {
      if(authToken){
       return navigate('/');
      }
      const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      username: username,
      password: password,
      // expiresInMins: 1,
  })
})      
const data = await response.json();

      // Check if the response indicates successful login (you would replace this with your actual authentication logic)
      if (response.ok) {
        
        localStorage.setItem('authToken', data.token);
        setAuthToken(data.token)
        navigate('/')
      } else {
        setError('Invalid credentials. Please try again.'); // Update error state
      }
    } catch (error: any) {
      setError(`An error occurred. Please try again later. ${error.message}`); // Update error state
    }
 
  };

  return (<>
    <div className='loginCenter'>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
    </>
  );
};

export default Login;