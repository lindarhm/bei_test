import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';


function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  let currentPath = location.pathname;

  const storedData = localStorage.getItem('apiResponseData');
  let apiData = { data: { token: '' } };

  if (storedData) {
    apiData = JSON.parse(storedData);
    console.log('Data dari local storage:', apiData.data['token']);
  } else {
    console.log('Data tidak ditemukan di local storage');
  }

  const logOut = () =>{
     localStorage.removeItem('apiResponseData');
     navigate('/Login');

  }
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <img src="/images/logo/logo-bei-horizontal.png"  alt="Logo" />
        </div>
        {
           (storedData) ? (
            <div className="header-links">
              <span className="header-text-active" onClick={() => navigate('/dashboard')}>List User</span>
              <span className="header-text-active-red" onClick={logOut}>Log Out</span>
            </div>
          ): (
            <div className="header-links">
              <span className={currentPath === "/Register" ? "header-text-active" : "header-text"} onClick={() => navigate('/Register')}>Register</span>
              <span className={currentPath === "/Login" ? "header-text-active" : "header-text"} onClick={() => navigate('/Login')}>Login</span>
            </div>
          )
        }
       
      </div>
    </header>
  );
}

export default Header;
