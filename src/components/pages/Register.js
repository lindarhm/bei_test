
import './css/Register.css';
import './css/Login.css';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import React, { useState } from 'react';
import ModalRegister from './modal/ModalRegister';



function Register() {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: 'male',
    date_of_birth: '2001-08-31',
    email: '',
    phone: '',
    address: '',
    photo: null,
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordIsActive = (event) => {
    setPassword(!isPassword);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPassword, setPassword] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [modalVisible, setModalVisible] = useState(false);



  const handleDateChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage('');
      // Ambil hanya nama file dari path lengkap
      const fileName = file.name;
      // Simpan nama file dalam state
      setFormData({
        ...formData,
        photo: fileName,
      });
    }
  };

  const validateForm = () => {
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.date_of_birth ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setErrorMessage('Please fill in all required fields.');
      console.log(errorMessage)
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Password and Confirm Password must match.');
      console.log(errorMessage)

      return false;
    } else if (!selectedFile) {
      setErrorMessage('Please select a file.');
      console.log(errorMessage)

      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const encryptedPassword = sha256(formData.password);

    console.log(selectedFile)
  
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('first_name', formData.first_name);
        formDataToSend.append('last_name', formData.last_name);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('date_of_birth', formData.date_of_birth);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('password', encryptedPassword);
        formDataToSend.append('photo', selectedFile);
  
        const response = await axios.post('https://api-test.bullionecosystem.com/api/v1/auth/register', formDataToSend);
  
        if (response.status === 200) {
          setSuccessMessage('Registration successful!');
          setModalVisible(true);
        } else {
          setErrorMessage('Registration failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Network error occurred.');
      }
    }
  };
  

  return (
    <div className="register-container">
      <div className="login-content">


        <div className="register-left-panel">
          <div className="register-text-container">
            <h2 className="register-text-container-title">Create User</h2>
            <h3 className="register-text-container-subTitle">BULLION ECOSYSTEM INTERNATIONAL.</h3>
          </div>
        </div>


        <div className="register-right-panel">
          <form onSubmit={handleSubmit}>
            <div className="padding">
              <div className="padding-right">
                <div className="row">

                  <div className="col-md-6">
                    <label className="label-input">Firstname</label>
                    <input
                      className="register-input-text custom-input-text"
                      type="text"
                      name="first_name"
                      placeholder="Firstname"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="label-input">Lastname</label>
                    <input
                      className="register-input-text custom-input-text"
                      type="text"
                      name="last_name"
                      placeholder="Lastname"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                </div>
              </div>



              <div className="register-input-group">
                <div className="checkbox-container">

                  <div className="checkbox-container-2">
                    <input
                      type="radio"
                      name="gender"
                      className="custom-checkbox"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleInputChange}
                    />
                    <label className="label-checkbox">Male</label>
                  </div>

                  <div className="checkbox-container-2">
                    <input
                      type="radio"
                      name="gender"
                      className="custom-checkbox"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleInputChange}
                    />
                    <label className="label-checkbox">Female</label>
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <label className="label-input">Date Of Birth</label>
                  <div className="register-input-group">
                    <input
                      className="register-input-text custom-input-text"
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="Date Of Birth"
                      value={formData.date_of_birth}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <label className="label-input">Email Address</label>
                  <div className="register-input-group">
                    <input
                      className="register-input-text  custom-input-text"
                      type="text"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <label className="label-input">Phone Number</label>
                  <div className="register-input-group">
                    <input className="register-input-text  custom-input-text"
                      type="number"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>



              <div>
                <label className="label-input">Address</label>
                <div className="register-input-group">
                  <textarea
                    className="register-input-text-area"
                    name="address"
                    placeholder="Address"
                    rows="5"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="row">

                <label for="formFileLg" class="form-label">Large file input</label>

                <div className="register-input-group">
                  <input 
                  class="form-control form-control-lg " 
                  className="form-control form-control-lg "
                  type="file"
                  name="photo"
                  onChange={handleFileChange} />
                </div>
              </div>


              <div className="row">
                <div className="col-md-13">
                  <label className="label-input">Password</label>
                  <div className="register-input-group">
                    <input
                      className="register-input-text  custom-input-text"
                      type={isPassword ? "password" : "text"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="register-password-toggle">
                      <img src="/images/icon/lucide_view.png" alt="Show Password" onClick={handlePasswordIsActive} />
                    </span>

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-13">
                  <label className="label-input">Confirm Password</label>
                  <div className="register-input-group">
                    <input
                      className="register-input-text  custom-input-text"
                      type={isPassword ? "password" : "text"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleInputChange}
                      required
                    />
                    <span className="register-password-toggle">
                      <img src="/images/icon/lucide_view.png" alt="Show Password" onClick={handlePasswordIsActive} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="login-button-container">
              <button className="login-rounded-button login-button-label" type="submit" >Add User</button>
            </div>
          </form>
        </div>
      </div>
      <ModalRegister show={modalVisible} onClose={() => setModalVisible(false)} message={"Registrasi Berhasil !!"} />
    </div>
  );
}



export default Register;
