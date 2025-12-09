import React, { useEffect, useState } from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom';
import './authenticationPage.css'
import SocialLogin from '../../components/Authentication/socialLogin'
import InputField from '../../components/Authentication/inputField'
import AuthService from '../../utils/Service/AuthService';
import { useUser } from '../../utils/Context/UserContext';


const authenticationPage = () => {
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
  const [formData, setFormData] = useState ({
    identifier: '',
    password: '',
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

    setLoading(true);

    try {
      const requestBody = {
        identifier: formData.identifier,
        password: formData.password
      };

      await AuthService.login(requestBody);

      loginUser();

      navigate('/dashboard');

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Authorization failed");
      } else {
        setError("Server not responding. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='login-container'>
        <h2 className='form-title'>Log in with</h2>

        <SocialLogin />

        <p className="separator"><span>or</span></p>

        {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <InputField type="text" placeholder='Email address or login' icon='login' name="identifier" value={formData.identifier} onChange={handleChange} required/>
          <InputField type="password" placeholder='Password' icon='lock' name='password' value={formData.password} onChange={handleChange} required/>

          <a href="#" className="forgot-pass-link" disabled={loading}>Forgot Password?</a>

          <button className="login-button" disabled={loading}>{loading ? 'Logging In' : 'Log In'}</button>
        </form>

        <p className="signup-text">Don't have an account? <Link to='/signup'><a>SignUp now</a></Link></p>
    </div>
  )
}

export default authenticationPage