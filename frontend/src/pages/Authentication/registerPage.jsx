import React, { useEffect, useState } from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom';
import './authenticationPage.css'
import InputField from '../../components/Authentication/inputField'
import AuthService from '../../utils/Service/AuthService';
import { useUser } from '../../utils/Context/UserContext';


const registerPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser();

  useEffect(() => {
    // Add a unique class to body when component mounts
    document.body.classList.add('auth-page');

    // Clean up when unmounting the page
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  // Set form data and UI states
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update state when user types
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Handling submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page reload
    setError('');

    // Password confirmation
    if(formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        email: formData.email,
        username: formData.username,
        password: formData.password
      };

      await AuthService.register(requestBody);

      loginUser();

      navigate('/dashboard');

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Server not responding. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
        <h2 className='form-title'>SignUp</h2>

        {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <InputField type="email" placeholder='Email address' icon='mail' name="email" value={formData.email} onChange={handleChange} required/>
          <InputField type="text" placeholder='Login' icon='login' name="username" value={formData.username} onChange={handleChange} required/>
          <InputField type="password" placeholder='Password' icon='lock' name="password" value={formData.password} onChange={handleChange} required/>
          <InputField type="password" placeholder='Confirm password' icon='lock' name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>

          <button className="login-button" disabled={loading}>{loading ? 'Signing up...' : 'Sign up'}</button>
        </form>

        <p className="signup-text">Already have an account? <Link to='/signin'><a>SignIn now</a></Link></p>
    </div>
  )
}

export default registerPage