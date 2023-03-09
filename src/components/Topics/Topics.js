
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Title, Button, Sidebar, Form } from '../index';
import { useToasts } from "react-toast-notifications";
import './Topics.css';

const Topics = () => {
  const [selectedButtons, setSelectedButtons] = useState(new Set());
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const handleButtonClick = (event) => {
    const button = event.target;
    const buttonText = button.textContent;
    const newSelectedButtons = new Set(selectedButtons);

    if (newSelectedButtons.has(buttonText)) {
      newSelectedButtons.delete(buttonText);
    } else {
      newSelectedButtons.add(buttonText);
    }

    setSelectedButtons(newSelectedButtons);
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('access');
    addToast('Topics selected!', { appearance: 'success' ,  autoDismiss: true,
    autoDismissTimeout: 2000,
    style: { marginLeft: "60s5px" }, });
    navigate('/Home');
   
  };

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
            <Form width={700} height={560} marginTop={30}>
              <div className='header'>
          
         
<label style={{ textAlign: 'center' }}>
<Title title="Choose your favorite topics" />
          </label> 
        
          </div>
  

             
              <div>
           
            <Button   className={`btn btn-light ${selectedButtons.has('Food and drinks 🍔 ') ? 'active' : ''   }`}   width={150}   height={40}   p="Food and drinks 🍔 "   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Family 👪') ? 'active' : ''   }`}   width={150}   height={40}   p="Family 👪"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Book and journals 📖') ? 'active' : ''   }`}   width={150}   height={40}   p="Book and journals 📖"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Decoration 🏠') ? 'active' : ''   }`}   width={150}   height={40}   p="Decoration 🏠"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Memes 😜') ? 'active' : ''   }`}   width={150}   height={40}   p="Memes 😜"   fontSize={15}   onClick={handleButtonClick}/>
            <Button   className={`btn btn-light ${selectedButtons.has('Technology💻') ? 'active' : ''   }`}   width={150}   height={40}   p="Technology💻"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Travel🛫') ? 'active' : ''   }`}   width={150}   height={40}   p="Travel🛫"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Startups 🚀') ? 'active' : ''   }`}   width={150}   height={40}   p="Startups 🚀"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Lifestyle : 🧘‍♀️') ? 'active' : ''   }`}   width={150}   height={40}   p="Lifestyle : 🧘‍♀️"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Kpop🎤') ? 'active' : ''   }`}   width={150}   height={40}   p="Kpop🎤"   fontSize={15}   onClick={handleButtonClick}/>
            <Button   className={`btn btn-light ${selectedButtons.has('Finance  💰') ? 'active' : ''   }`}   width={150}   height={40}   p="Finance  💰"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Animals🐶') ? 'active' : ''   }`}   width={150}   height={40}   p="Animals🐶"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Art and design🎨') ? 'active' : ''   }`}   width={150}   height={40}   p="Art and design🎨"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Beauty💄') ? 'active' : ''   }`}   width={150}   height={40}   p="Beauty💄"   fontSize={15}   onClick={handleButtonClick}/>
            <Button   className={`btn btn-light ${selectedButtons.has('Culture🎭') ? 'active' : ''   }`}   width={150}   height={40}   p="Culture🎭"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Education🎓') ? 'active' : ''   }`}   width={150}   height={40}   p="Education🎓"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Events🎉') ? 'active' : ''   }`}   width={150}   height={40}   p="Events🎉"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Fashion👗') ? 'active' : ''   }`}   width={150}   height={40}   p="Fashion👗"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Politics🗳️') ? 'active' : ''   }`}   width={150}   height={40}   p="Politics🗳️"   fontSize={15}   onClick={handleButtonClick}/>
            <Button   className={`btn btn-light ${selectedButtons.has('Environment🌍') ? 'active' : ''   }`}   width={150}   height={40}   p="Environment🌍"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Health and fitness💪') ? 'active' : ''   }`}   width={150}   height={40}   p="Health and fitness💪"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Kids👶') ? 'active' : ''   }`}   width={150}   height={40}   p="Kids👶"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Movies and theater🎥') ? 'active' : ''   }`}   width={150}   height={45}   p="Movies and theater🎥"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Relationships💑') ? 'active' : ''   }`}   width={150}   height={40}   p="Relationships💑"   fontSize={15}   onClick={handleButtonClick}/>
            <Button   className={`btn btn-light ${selectedButtons.has('Music🎵') ? 'active' : ''   }`}   width={150}   height={40}   p="Music🎵"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Science🔬') ? 'active' : ''   }`}   width={150}   height={40}   p="Science🔬"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Sports⚽') ? 'active' : ''   }`}   width={150}   height={40}   p="Sports⚽"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Gaming🎮') ? 'active' : ''   }`}   width={150}   height={40}   p="Gaming🎮"   fontSize={15}   onClick={handleButtonClick} /> 
            <Button   className={`btn btn-light ${selectedButtons.has('Business💼') ? 'active' : ''   }`}   width={150}   height={40}   p="Business💼"   fontSize={15}   onClick={handleButtonClick} /> 

              </div>
              <div>
                <Button
                  className="btn btn-primary"
                  width={150}
                  height={40}
                  text="Save"
                  fontSize={15}
                  onClick={handleSaveClick}
                />
                
              </div>
            </Form>
          </div>
        </div>
      )}
      </div>
  );
};

export default Topics;