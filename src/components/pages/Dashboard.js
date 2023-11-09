import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import './css/Dashboard.css';
import EditModal from './modal/ModalEdit'
import ModalImage from './modal/ModalImage';

const CustomTable = ({ onCellClick, data, onShowDetailClick }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  
  const handleEditClick = (userId) => {
    console.log("ini di dashboard" + userId);
    setShowEditModal(true);
    setSelectedUserId(userId);
  };

  const handleShowImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowImageModal(true);
  };

  return (
    <div className="custom-tb-container">
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gander</th>
              <th>Date Of Birth</th>
              <th>Email Address</th>
              <th>Photo Profile</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Act</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'row-white' : 'row-gray'}>
                <td>{row.name}</td>
                <td>{row.gender}</td>
                <td>{row.date_of_birth}</td>
                <td>{row.email}</td>
                <td >
                  <p className='img-text  ponter-img' onClick={() => handleShowImageClick(row.photo)}>Lihat</p>
  
                </td>
                <td>{row.phone}</td>
                <td>{row.address}</td>
                <td>
                  <i className="fa fa-edit img-text pointer-img" onClick={() => handleEditClick(row._id)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditModal show={showEditModal} userId={selectedUserId} onClose={() => setShowEditModal(false)} />
      <ModalImage show={showImageModal} onClose={() => setShowImageModal(false)} imageUrl={selectedImageUrl} /> {/* Menampilkan modal gambar */}

    </div>
  );
};

const Popup = ({ data, rowIndex, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <p>Row Index: {rowIndex}</p>
        <p>Data: {data.join(', ')}</p>
      </div>
    </div>
  );
};

function App() {
  const [selectedCellData, setSelectedCellData] = useState({ data: null, rowIndex: null });
  const [apiData, setApiData] = useState([]);
  const [detailData, setDetailData] = useState(null);

  const handleCellClick = (data, rowIndex) => {
    setSelectedCellData({ data, rowIndex });
  };

  const handleClosePopup = () => {
    setSelectedCellData({ data: null, rowIndex: null });
  };

  const handleShowDetailClick = (id) => {
    getDetailData(id);
  };

  const getDetailData = (id) => {
    axios.get(`https://api-test.bullionecosystem.com/api/v1/admin/${id}`)
      .then((response) => {
        setDetailData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('apiResponseData');
    let token;
  
    if (storedData) {
      const apiData = JSON.parse(storedData);
      token = apiData.data['token'];
    }
  
    axios.get('https://api-test.bullionecosystem.com/api/v1/admin/?offset=&limit=', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('API Response:', response.data.data);
        setApiData(response.data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {apiData.length > 0 ? (
        console.log("ini pas return" + apiData),
        <CustomTable onCellClick={handleCellClick} data={apiData} onShowDetailClick={handleShowDetailClick} />
      ) : (
        <p>Loading data...</p>
      )}
      {selectedCellData.data !== null && (
        <Popup data={selectedCellData.data} rowIndex={selectedCellData.rowIndex} onClose={handleClosePopup} />
      )}
      {detailData && (
        <Popup data={detailData} rowIndex={null} onClose={() => setDetailData(null)} />
      )}
      
    </div>
  );
}

export default App;
