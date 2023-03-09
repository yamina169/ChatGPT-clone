

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profil.css'

const Profil = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    } else {
      fetch('http://127.0.0.1:5000/api/v1/auth/usershow', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        const user = JSON.parse(data.user); // convertir la chaîne de caractères en objet
        setUserData(user);
      })
      .catch(error => console.error(error));
    }
  }, [])

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div class="details">
			
			
			
		      <img src={`http://localhost:5000/${userData.url_image}`} alt="Profile" className='profile-image' />

<div >
				<h5 class="name" style={{ fontSize: `${props.fontSize}px` }}>  {userData.name} {userData.surname}</h5>
				<p class="username" > ({userData.username})</p>
        </div>



			
		</div>
    </div>
  )
}


export default Profil
