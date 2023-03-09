
import React, { useState, useEffect } from 'react';
import { Form, Inputs, Button, Title } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const SetNewPd = () => {
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [isFormValid, setIsFormValid] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [isInputEmpty, setIsInputEmpty] = useState(false);

const navigate = useNavigate();
const { addToast } = useToasts();

const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const email = searchParams.get('email');
const otpString = searchParams.get('verification_code');

useEffect(() => {
validateForm();
}, [password, confirmPassword]);

const validateForm = () => {
if (password === '' || confirmPassword === '' || password.length < 7 || confirmPassword.length < 7) {
setIsFormValid(false);
setIsInputEmpty(true);
return;
}


if (password !== confirmPassword) {
  setIsFormValid(false);
  setIsInputEmpty(true);
  return;
}

setIsFormValid(true);
};

const handlePasswordChange = event => {
setPassword(event.target.value);
};

const handleConfirmPasswordChange = event => {
setConfirmPassword(event.target.value);
};

const handleResetClick = event => {
event.preventDefault();


if (isLoading || !isFormValid) {
  return;
}

setIsLoading(true);

fetch('http://127.0.0.1:5000/api/v1/auth/changepassword', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email,
    otp_string: otpString,
    new_password: password
  })
})
  .then(response => {
    setIsLoading(false);

    if (response.ok) {
      addToast('Password reset successful!', { appearance: 'success' ,autoDismiss: true,
      autoDismissTimeout: 3000,
      style: { marginTop: '65px' } });
      navigate('/');
    } else {
      addToast('Password reset failed. Please try again.', {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 3000,
        style: { marginTop: '65px' }
      });
    }
  })
  .catch(error => {
    setIsLoading(false);
    console.error('Error resetting password:', error);
    addToast('Password reset failed. Please try again.', {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimeout: 3000,
      style: { marginTop: '65px' }
    });
  });
};

  return (
    <div>
            
      <Form>
        <Title title="Set a new Password" width={231} />

        <Inputs
          type="Password"
          placeholder="Create your new password"
          className="form-control"
          value={password}
          onChange={handlePasswordChange}
        />
        {password !== '' && password.length < 7 && (
          <div style={{ color: 'red' }}>Please enter a password with at least 7 characters</div>
        )}

        <Inputs
          type="Password"
          placeholder="Verify your new password"
          className="form-control"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPassword !== '' && confirmPassword.length < 7 && (
          <div style={{ color: 'red' }}>Please enter a password with at least 7 characters</div>
        )}
        {password !== confirmPassword && confirmPassword !== '' && (
          <div style={{ color: 'red' }}>Passwords do not match</div>
        )}

        <Button className="btn btn-primary" height={50}     text= {isLoading ? "Loading..." : "Reset my password"} fontSize={13} onClick={handleResetClick}  disabled={isLoading } />
        <Link to ="/">
        <Button className="btn btn-light" height={40} marginTop={20} p="Cancel password reset? " type="reset"  />
        </Link>
      </Form>
    </div>
  );
};

export default SetNewPd;