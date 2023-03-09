
  import React, { useState,useEffect } from 'react';
  import { Inputs, Button, Title, Form } from '../components/index';
  import { Link, useNavigate} from 'react-router-dom';
  import './ContinueC.css';
  
  const RegisterAccount = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    // other state variables and handlers
  
    useEffect(() => {
      if (image) {
        setImageUrl(URL.createObjectURL(image));
      }
    }, [image]);
  
    // La fonction handleImageChange n'est pas utilisée, on la supprime
    // Le même travail est effectué par handleChange
    const handleChange = (event) => {
      setImage(event.target.files[0]);
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // On ne vérifie plus ici la validité des champs non remplis
      // Les vérifications seront effectuées par la suite pour chaque champ
  
      const nameRegex = /^[a-zA-Z]+$/;
      const surnameRegex = /^[a-zA-Z]+$/;
      const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/; // Correction de la regex pour les noms d'utilisateur
      const birthdayRegex = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Please log in first');
        return;
      }
  
      if (!name || !nameRegex.test(name)) {
        setErrorMessage('Please enter a valid name.');
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: name,
          surname: surname,
          username: username,
          birthday: birthday,
          gender: gender
        })
      };
  
      const formData = new FormData();
      formData.append('image', image);
  
      const imageOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      };
    
      const response = await Promise.all([
        fetch('http://127.0.0.1:5000/api/v1/auth/register', userOptions),
        fetch('http://127.0.0.1:5000/api/v1/auth/upload', imageOptions)
      ]);
  
      const data = await Promise.all(response.map(res => res.json()));
  
      console.log(data[0], data[1]);
      alert("user created")
    
      navigate('/'); 
    };
  
       
    
  
     
  
    return (
      <div>
     
      <Form onSubmit={handleSubmit} width={450} height={500} marginTop={30}>
        <center>
          <label style={{ textAlign: 'center' }}>
            <Title title="Let's get to know each other " />
          </label>
          <div
            className='cercle'
            style={{
              backgroundImage:`url(${imageUrl})`,
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
          <Inputs
            type="text"
            placeholder="Your name"
            className="form-control inpt"
            width={400}
            height={35}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Inputs
            type="text"
            placeholder="Your surname"
            className="form-control inpt"
            width={400}
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <Inputs
  
          type="text"
          placeholder="Your username"
          className="form-control inpt"
          width={400}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <Inputs
          type="text"
          placeholder="Your date of birth : YYYY-MM-DD"
          className="form-control inpt width={450}"
          width={400}
         

          value={birthday}
          onChange={(event) => setBirthday(event.target.value)}
          />
  
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
          <Link to ="/">
          <Button
            className="btn btn-primary"
            width={400}
            height={35}
            text="Continuer"
            fontSize={15}
            onClick={handleSubmit}
          />
          </Link>
         
        </center>
      </Form>
      </div>
    );
  };
  
  export default RegisterAccount;
  /*
  
  import React, { useState, useEffect } from 'react';
  import { Inputs, Button, Title, Form } from '../components/index';
  import { Link, useNavigate } from 'react-router-dom';
  import './ContinueC.css';
  
  const RegisterAccount = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [surname, setSurname] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  
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
  
  const nameValid = /^[a-zA-Z\s]*$/.test(name);
  const surnameValid = /^[a-zA-Z\s]*$/.test(surname);
  const usernameValid = /^[a-zA-Z0-9]*$/.test(username);
  const birthdayValid = /^\d{4}-\d{2}-\d{2}$/.test(birthday);
  
  if (!nameValid) {
    setNameError('Invalid name');
    return;
  }
  
  if (!surnameValid) {
    setSurnameError('Invalid surname');
    return;
  }
  
  if (!usernameValid) {
    setUsernameError('Invalid username');
    return;
  }
  
  if (!birthdayValid) {
    setBirthdayError('Invalid birthday');
    return;
  }
  
  if (!gender) {
    setGenderError('Please select a gender');
    return;
  }
  
  const token = localStorage.getItem('token');
  if (!token) {
    setErrorMessage('Please log in first');
    return;
  }
  
  const userOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      name: name,
      surname: surname,
      username: username,
      birthday: birthday,
      gender: gender,
    }),
  };
  
  const formData = new FormData();
  formData.append('image', image);
  
  const imageOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };
  
  const response = await Promise.all([
    fetch('http://127.0.0.1:5000/api/v1/auth/register', userOptions),
    fetch('http://127.0.0.1:5000/api/v1/auth/upload', imageOptions),
  ]);
  
  const data = await Promise.all(response.map((res) => res.json()));
  
  console.log(data[0], data[1]);
  alert('user created');
  
  navigate('/');
  };
  
     
  
    return (
      <div>
     
      <Form onSubmit={handleSubmit} width={450} height={500} marginTop={30}>
        <center>
          <label style={{ textAlign: 'center' }}>
            <Title title="Let's get to know each other " />
          </label>
          <div
            className='cercle'
            style={{
              backgroundImage:`url(${imageUrl})`,
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
          <Inputs
            type="text"
            placeholder="Your name"
            className="form-control inpt"
            width={400}
            height={35}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Inputs
            type="text"
            placeholder="Your surname"
            className="form-control inpt"
            width={400}
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <Inputs
  
          type="text"
          placeholder="Your username"
          className="form-control inpt"
          width={400}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <Inputs
          type="text"
          placeholder="Your date of birth : YYYY-MM-DD"
          className="form-control inpt width={450}"
          width={400}
         

          value={birthday}
          onChange={(event) => setBirthday(event.target.value)}
          />
  
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
          <Link to ="/">
          <Button
            className="btn btn-primary"
            width={400}
            height={35}
            text="Continuer"
            fontSize={15}
            onClick={handleSubmit}
          />
          </Link>
         
        </center>
      </Form>
      </div>
    );
  };
  
  export default RegisterAccount;*/