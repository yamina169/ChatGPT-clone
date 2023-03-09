
import React, { useState,useEffect } from 'react';
import { Inputs, Button, Title, Form } from '../components/index';
import { Link, useNavigate} from 'react-router-dom';
import './Edit.css';

const Edit = () => {
  const [img, setImg] = useState(null);

const [name, setName] = useState('');
const [surname, setSurname] = useState('');
const [username, setUsername] = useState('');
const [birthday, setBirthday] = useState('');
const [gender, setGender] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const navigate = useNavigate();
  
const [imageUrl, setImageUrl] = useState(null);


  useEffect(() => {
    if (img) {
      setImageUrl(URL.createObjectURL(img));
    }
  }, [img]);

  const handleChange = (event) => {
    setImg(event.target.files[0]);
  };
  

  
const handleSubmit = async (event) => {
  event.preventDefault();

  if (!name || !surname || !username || !birthday || !gender) {
    setErrorMessage('Please fill in all the input fields.');
    return;
  }

  
  //const nameRegex = /^[a-zA-Z]+$/;
  const surnameRegex = /^[a-zA-Z]+$/;
  const usernameRegex = /^[a-zA-Z]+$/;
  const birthdayRegex = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

  const token = localStorage.getItem('access');
  if (!token) {
    setErrorMessage('Please log in first');
    return;
  }

  
  
  if (!surname || !surnameRegex.test(surname)) {
    setErrorMessage('Please enter a valid surname.');
    return;
  }
  if (!username || !usernameRegex.test(username)) {
    setErrorMessage('Please enter a valid username. Username must be 3-16 characters long and can contain letters, numbers, underscores and hyphens.');
    return;
  }
  if (!birthday || !birthdayRegex.test(birthday)) {
    setErrorMessage('Please enter a valid date of birth. Format: YYYY-MM-DD.');
    return;
  }
  if (!gender) {
    setErrorMessage('Please select a gender.');
    return;
  }

  const userOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      name: name,
      surname: surname,
      username: username,
      birthday: birthday,
      gender: gender,
      password
    })
  };

  const formData = new FormData();
  formData.append('img', img);

  const imageOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  };
  
  const response = await Promise.all([
    fetch('http://127.0.0.1:5000/api/v1/auth/updateuser', userOptions),
    fetch('http://127.0.0.1:5000/api/v1/auth/updateimg', imageOptions)
  ]);

  const data = await Promise.all(response.map(res => res.json()));

  console.log(data[0], data[1]);
  alert("user updated")
  
  navigate('/Home'); 
};

     
  
    return (
      <div  style={{ marginBottom: 30  }}>
     
      <Form onSubmit={handleSubmit}  marginTop={30}>
        <center>
          <label style={{ textAlign: 'center' }}>
            <Title title="Edite my profile " />
          </label>
          <div
            className='cercle'
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          >
            <i class="bi bi-file-plus color"></i>
            <input
              className='upload-input'
              type="file"
              style={{
                opacity: 0,
                position: 'absolute',
                cursor: 'pointer',
              }}
              onChange={handleChange}
            />
          </div>
          <p style={{ color: '#1D2C59', textAlign: 'center', fontSize: '13px' }}>
            upload your profile pictures
          </p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <label className='edit-label'> Username</label>
          <Inputs
  
  type="text"
  placeholder="Your username"
  className="form-control inpt"
  width={400}
  value={username}
  onChange={(event) => setUsername(event.target.value)}
/>
<label className='edit-label'> Password</label>

      <Inputs
        type="password"
        placeholder="Your password"
        className="form-control inpt"
        width={400}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
            <label className='edit-label'> Surname</label>

          <Inputs
            type="text"
            placeholder="Your surname"
            className="form-control inpt"
            width={400}
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
                <label className='edit-label'>Name</label>

           <Inputs
            type="text"
            placeholder="Your name"
            className="form-control inpt"
            width={400}
            height={35}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
                <label className='edit-label'> Date of birth</label>

        <Inputs
          type="text"
          placeholder="Your date of birth : YYYY-MM-DD"
          className="form-control inpt width={450}"
          width={400}
         

          value={birthday}
          onChange={(event) => setBirthday(event.target.value)}
          />
        <label className='edit-label'> Gender</label>

          <select
            className="form-control list"
            id="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)} 
          >
            <option value="">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
          <Link to ="/Home">
          <Button
            className="btn btn-primary"
            width={400}
            height={40}
            text="Save Changes"
            fontSize={15}
            onClick={handleSubmit}
          />
          </Link>
         
        </center>
      </Form>
      </div>
    );
  };
  
  export default Edit;
  