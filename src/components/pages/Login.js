import React, { useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import ErrorModal from './ErrorModal'; 
import axios from 'axios';


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPassword, setPassword] = useState(false);
  

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') {
      if (value === '') {
        setErrors({ ...errors, email: 'Email is required' });
      } else if (!validateEmail(value)) {
        setErrors({ ...errors, email: 'Invalid email format' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    if (name === 'password') {
      if (value === '') {
        setErrors({ ...errors, password: 'Password is required' });
      } else if (value.length < 8) {
        setErrors({ ...errors, password: 'Password must be at least 8 characters' });
      } else {
        setErrors({ ...errors, password: '' });
      }
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const encryptedPassword = sha256(formData.password);



    if (!errors.email && !errors.password) {
      try {
     
        const requestData = {
          email: formData.email,
          password: encryptedPassword,
        };

        const response = await axios.post(
          'https://api-test.bullionecosystem.com/api/v1/auth/login',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem('apiResponseData', JSON.stringify(data));
          navigate('/dashboard');
        } else {
          setErrorMessage("Username atau Password Anda Salah !!");
          setErrorModalVisible(true);
        }
      } catch (error) {
        console.error('Network Error:', error);
      }
    } else {
      console.error('Form Validation Error');
    }
  };

  const handlePasswordIsActive = (event) => {
    setPassword(!isPassword);
  };

  return (
    <div className="login-container">
      <div className="login-content">


        <div className="login-left-panel">
          <div className="login-text-container">
            <h2 className="login-text-container-title">Masuk ke User Bullion</h2>
            <h3 className="login-text-container-subTitle">BULLION ECOSYSTEM INTERNATIONAL.</h3>
          </div>
        </div>


        <div className="login-right-panel">
          <form onSubmit={handleSubmit}>

            <h2 className="login-title">Login Page</h2>

            {errors.email && <span className="error">{errors.email}</span>}
            <div className="login-input-group">
              <input
                className="login-input-text"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>

            {errors.password && <span className="error">{errors.password}</span>}

            <div className="login-input-group">
              <input
                className={"login-input-text"}
                type={isPassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />

              <span className="login-password-toggle">
                <img src="/images/icon/lucide_view.png" alt="Show Password" onClick={handlePasswordIsActive}/>
              </span>

            </div>



            <div className="login-button-container">
              <button className="login-rounded-button login-button-label" type="submit" >Masuk</button>
            </div>
          </form>

        </div>
      </div>
      <ErrorModal show={errorModalVisible} onClose={() => setErrorModalVisible(false)} errorMessage={errorMessage} />
    </div>
  );
}

export default Login;
