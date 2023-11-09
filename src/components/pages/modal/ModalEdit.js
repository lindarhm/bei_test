import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Dashboard.css'

function EditModal(props) {
    const navigate = useNavigate();

    const [editedData, setEditedData] = useState({
      first_name: '',
      last_name: '',
      gender: 'male',
      date_of_birth: '',
      email: '',
      phone: '',
      address: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    

    useEffect(() => {
        if (props.userId) {
            const storedData = localStorage.getItem('apiResponseData');
            let token;
          
            if (storedData) {
              const apiData = JSON.parse(storedData);
              token = apiData.data['token'];
            }

          if (token) {
            axios.get(`https://api-test.bullionecosystem.com/api/v1/admin/${props.userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            })
              .then((response) => {
                setEditedData({
                  first_name: response.data.data.first_name,
                  last_name: response.data.data.last_name,
                  gender: response.data.data.gender,
                  date_of_birth: response.data.data.date_of_birth,
                  email: response.data.data.email,
                  phone: response.data.data.phone,
                  address: response.data.data.address,
                });
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }
      }, [props.userId]);
      

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      try {

        const formDataToSend = {
          first_name : editedData.first_name,
          last_name :editedData.last_name,
          gender:editedData.gender,
          date_of_birth: editedData.date_of_birth,
          email:editedData.email,
          phone: editedData.phone,
          address:editedData.address
        }

        const storedData = localStorage.getItem('apiResponseData');
        let token;
      
        if (storedData) {
          const apiData = JSON.parse(storedData);
          token = apiData.data['token'];
        }

  
        const response = await axios.put(`https://api-test.bullionecosystem.com/api/v1/./admin/${props.userId}/update`, formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          props.onClose();
          setShowSuccessAlert(true);
        } else {
          setErrorMessage('Update failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Network error occurred.');
      }
    }
  };
  

  const validateForm = () => {
    if (
      !editedData.first_name ||
      !editedData.last_name ||
      !editedData.date_of_birth ||
      !editedData.email ||
      !editedData.phone
    ) {
      setErrorMessage('Please fill in all required fields.');
      return false;
    }

    return true;
  };

  return (
    <Modal show={props.show} onHide={props.onClose} dialogClassName="custom-modal">
         <form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {showSuccessAlert && (
        <div className="alert alert-success" role="alert">
          Update successful!
        </div>
      )}
          <div className="padding">
            <div className="padding-right">
              <div className="row">
                <div className="col-md-6">
                  <label className="label-input">First Name</label>
                  <input
                    className="register-input-text custom-input-text"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={editedData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="label-input">Last Name</label>
                  <input
                    className="register-input-text custom-input-text"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={editedData.last_name}
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
                    checked={editedData.gender === 'male'}
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
                    checked={editedData.gender === 'female'}
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
                    name="date_of_birth"
                    placeholder="Date Of Birth"
                    value={editedData.date_of_birth}
                    onChange={handleInputChange}
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
                    value={editedData.email}
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
                  <input
                    className="register-input-text  custom-input-text"
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    value={editedData.phone}
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
                  value={editedData.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
            
          </div>
      
      </Modal.Body>
      <Modal.Footer>
      <button type='submit' className='btn btn-primary rounded'>Save</button>
      <button onClick={props.onClose} className='btn btn-secondary rounded'>Cancel</button>
      </Modal.Footer>
      </form>

    </Modal>
  );
}

export default EditModal;
