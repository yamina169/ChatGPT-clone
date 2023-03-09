/*
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Title, Button,Sidebar ,Form } from '../components';
import './Poll.css';

const Poll = () => {
  const [topic, setTopic] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [pubId, setPubId] = useState(null);

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('access');
    const userOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        topic: topic,
        caption: caption,
      })
    };
  
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/create_pub', userOptions);
    const data = await response.json();
    const pubId = data.pub_id;
    setPubId(pubId);

    const formData = new FormData();
    formData.append('pub_id', pubId);
    formData.append('image', image);

    const imageOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const imageResponse = await fetch('http://127.0.0.1:5000/api/v1/auth/pubimg', imageOptions);
    const imageData = await imageResponse.json();

    console.log(data, imageData);
    alert('Poll created');

   
  };

  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <div>
        

        <Sidebar />
        
      </div>

     
      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            
            <Form width={600} height={500} marginTop={30}>
            <div className='header'>
              <Link to="/Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
</svg></Link>
              <Title title="Create poll" />
              <select className=" topic"onChange={(e) => setTopic(e.target.value)}>
              <option>  Add topic</option>
              <option value="Sport">⚽️ Sport</option>
              <option value="Music">🎵 Music</option>
              <option value="Food">🍔 Food</option>

              </select>
              <Button
            className="btn btn-primary "
            width={120}
            height={40}
            text="Palace poll"
            fontSize={15}
            onClick={handleSubmit}
          />
          </div>
          
        <textarea className="imginpt" rows="3" cols="70" placeholder="Ask your friends what's on your mind?"          onChange={(e) => setCaption(e.target.value)}
/>
         <div className='pubimage' style={{backgroundImage: `url(${image && URL.createObjectURL(image)})`}}>
  
    <div className="upload-container">
      <label className="upload-label">Add photo</label>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
        <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
      </svg>
      <input
        className='image-input'
        type="file"
        style={{
          opacity: 0,
          position: 'absolute',
          cursor: 'pointer',
          
        }}
        onChange={handleChange}
      />
    </div>

</div>


              
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poll;
*/

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Title, Button, Sidebar, Form } from '../components';
import './Poll.css';

const Poll = () => {
  const [topic, setTopic] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [pubId, setPubId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { addToast } = useToasts();

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('access');
    const userOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        topic: topic,
        caption: caption,
      }),
    };

    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/create_pub', userOptions);
    const data = await response.json();
    const pubId = data.pub_id;
    setPubId(pubId);

    const formData = new FormData();
    formData.append('pub_id', pubId);
    formData.append('image', image);

    const imageOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const imageResponse = await fetch('http://127.0.0.1:5000/api/v1/auth/pubimg', imageOptions);
    const imageData = await imageResponse.json();

    console.log(data, imageData);

    if (response.ok && imageResponse.ok) {
      addToast('Publication created successfully!', { appearance: 'success', autoDismiss: true,
      autoDismissTimeout: 1000, });
      navigate('/Home');
    } else {
      addToast('An error occurred while creating the publication! ', { appearance: 'error' ,  autoDismiss: true,
      autoDismissTimeout: 1000,
       }); // <-- add the success message});
    }
  };
  const [showModal, setShowModal] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <div>
        

        <Sidebar />
        
      </div>

     
      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            
            <Form width={600} height={500} marginTop={30}>
            <div className='header'>
              <Link to="/Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
</svg></Link>
              <Title title="Create poll" />
              <select className=" topic"onChange={(e) => setTopic(e.target.value)}>
              <option>  Add topic</option>
              <option value="Sport">⚽️ Sport</option>
              <option value="Music">🎵 Music</option>
              <option value="Food">🍔 Food</option>

              </select>
              <Button
            className="btn btn-primary "
            width={120}
            height={40}
            text="Palace poll"
            fontSize={15}
            onClick={handleSubmit}
          />
          </div>
          
        <textarea className="imginpt" rows="3" cols="70" placeholder="Ask your friends what's on your mind?"          onChange={(e) => setCaption(e.target.value)}
/>
         <div className='pubimage' style={{backgroundImage:`url(${imageUrl})`,}}>
  
    <div className="upload-container">
  
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
        <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
      </svg>
      <input
        className='image-input'
        type="file"
        style={{
          opacity: 0,
          position: 'absolute',
          cursor: 'pointer',
          
        }}
        onChange={handleChange}
      />
    </div>

</div>


              
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poll;


