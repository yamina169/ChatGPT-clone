/*
import { useState } from 'react';
import React from 'react';
import { Form, Inputs, Button, Title } from '../components/index';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';


const CreateAccount = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { addToast } = useToasts();
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevState) => ({ ...prevState, email: "" })); // effacer les erreurs d'email
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevState) => ({ ...prevState, password: "" })); // effacer les erreurs de mot de passe
  };
  const handleVPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prevState) => ({ ...prevState, confirmPassword: "" })); // effacer les erreurs de mot de passe
};

const createUser = async (data) => {
  const response = await fetch('http://127.0.0.1:5000/api/v1/auth/register1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    if (response.status === 409) {
      throw new Error('Email is already taken');
    } else {
      throw new Error(await response.text());
    }
  }
  const dataResponse = await response.json();
  localStorage.setItem('token', dataResponse.token);
  return dataResponse;
}

const { mutate, isLoading } = useMutation(createUser, {
  onSuccess: () => {
    navigate('/RegisterAccount', { state: { token: token } })
    addToast('Please fill out the following form to complete the account creation steps', { appearance: 'info' ,autoDismiss: true,
    autoDismissTimeout: 4000,
    style: { marginTop: '65px' } })
  },
  onError: (error) => {
    const newErrors = {};
    if (error.message === 'Email is already taken') {
      newErrors.email = 'Email is already taken';
    } else {
      newErrors.server = error.message;
    }
    setErrors(newErrors);
  }
});

const handleSubmit = e => {
  e.preventDefault()
  const newErrors = {}

  // validation des champs
  if (!email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is invalid';
  }
  // Add error for email taken
  if (errors.email === 'Email is already taken') {
    newErrors.email = 'Email is already taken';
  }

    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // afficher les erreurs
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // envoyer les données du formulaire
    mutate({ email, password });
  }

  return (
    <div>
      <Form>
        <Title title="Create a new account" width={256} />
        <Inputs
          type="email"
          placeholder="Your email adress"
          value={email}
          onChange={handleEmailChange}
          className="form-control"
        />
        {errors.email && (
          <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
            {errors.email}
          </div>
        )}
        <Inputs
          type="password"
          placeholder="Create you new password"
          value={password}
          onChange={handlePasswordChange}
          className="form-control"
        />
        {errors.password && (
          <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
            {errors.password}
          </div>
        )}
        <Inputs
          type="password"
          placeholder="Verify your
            new password"
          value={confirmPassword} 
          onChange={handleVPasswordChange}
          className="form-control"

        
        
        />
         {errors.confirmPassword && (
          <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
            {errors.confirmPassword}
          </div>
        )}
       
        <Button
       className="btn btn-primary"
       height={50}
       text="Continue"
       onClick={handleSubmit}
       fontSize={15}
     />
<Link to="/">
<Button
         className="btn btn-light"
         height={40}
         marginTop={10}
         p="Alreday have an account ?"
         text=" Login"
         Link="Login"
       />
</Link>
</Form>
</div>
)
}

export default CreateAccount
*/

import { useState } from 'react';
import React from 'react';
import { Form, Inputs, Button, Title } from '../components/index';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';


const CreateAccount = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { addToast } = useToasts();
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [Loading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevState) => ({ ...prevState, email: "" })); // effacer les erreurs d'email
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevState) => ({ ...prevState, password: "" })); // effacer les erreurs de mot de passe
  };
  const handleVPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prevState) => ({ ...prevState, confirmPassword: "" })); // effacer les erreurs de mot de passe
};

const createUser = async (data) => {
  const response = await fetch('http://127.0.0.1:5000/api/v1/auth/register1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    if (response.status === 409) {
      throw new Error('Email is already taken');
    } else {
      throw new Error(await response.text());
    }
  }
  const dataResponse = await response.json();
  localStorage.setItem('token', dataResponse.token);
  return dataResponse;
}

const { mutate, isLoading } = useMutation(createUser, {
  onSuccess: () => {
    setIsLoading(false);
    navigate('/RegisterAccount', { state: { token: token } })
    addToast('Please fill out the following form to complete the account creation steps', { appearance: 'info' ,autoDismiss: true,
    autoDismissTimeout: 4000,
    style: { marginTop: '10px' } })
  },
  onError: (error) => {
    setIsLoading(false);
    const newErrors = {};
    if (error.message === 'Email is already taken') {
      newErrors.email = 'Email is already taken';
    } else {
      newErrors.server = error.message;
    }
    setErrors(newErrors);
  }
});


const handleSubmit = e => {
  e.preventDefault()
  const newErrors = {}

  // validation des champs
  if (!email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is invalid';
  }
  // Add error for email taken
  if (errors.email === 'Email is already taken') {
    newErrors.email = 'Email is already taken';
  }

    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 7) {
      newErrors.password = 'Password must be at least 7 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // afficher les erreurs
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // envoyer les données du formulaire
    setIsLoading(true);
    mutate({ email, password });
   

  }

  return (
    <div>
      <Form>
        <Title title="Create a new account" width={256} />
        <Inputs
          type="email"
          placeholder="Your email adress"
          value={email}
          onChange={handleEmailChange}
          className="form-control"
        />
        {errors.email && (
          <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
            {errors.email}
          </div>
        )}
        <Inputs
          type="password"
          placeholder="Create you new password"
          value={password}
          onChange={handlePasswordChange}
          className="form-control"
        />
        {errors.password && (
          <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
            {errors.password}
          </div>
        )}
        <Inputs
          type="password"
          placeholder="Verify your
            new password"
          value={confirmPassword} 
          onChange={handleVPasswordChange}
          className="form-control"

        
        
        />
         {errors.confirmPassword && (
          <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
            {errors.confirmPassword}
          </div>
        )}
       
        <Button
       className="btn btn-primary"
       height={50}
       text={isLoading ? "Loading..." : "Continue"}
       onClick={handleSubmit}
       fontSize={15}
     />
<Link to="/">
<Button
         className="btn btn-light"
         height={40}
         marginTop={10}
         p="Alreday have an account ?"
         text=" Login"
         Link="Login"
       />
</Link>
</Form>
</div>
)
}

export default CreateAccount
