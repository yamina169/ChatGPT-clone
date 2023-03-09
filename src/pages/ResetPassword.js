
import { Form, Inputs, Button, Title } from '../components';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToasts(); // <-- get the addToast function from the useToasts hook
  const mutation = useMutation((email) => {
    return fetch('http://127.0.0.1:5000/api/v1/auth/reset_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }).then(res => res.json());
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (emailRegex.test(value) && value !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setIsNotFound(false);
  };
  

  const handleResetPassword = async () => {
    if (email !== "" && isValid) {
      setIsLoading(true);
      try {
        const data = await mutation.mutateAsync(email);
        if (data.error) {
          setIsNotFound(true);
        } else {
          navigate(`/VerifyCode?email=${email}`);
          addToast('Password reset email sent successfully', { appearance: 'success',  autoDismiss: true,
          autoDismissTimeout: 4000,
          style: { marginTop: "65px" }, }); // <-- add the success message
        }
      } catch (error) {
        console.log(error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div>
      <Form>
        <Title title="Reset password" width={256} />
        <p style={{ color: '#1D2C59', textAlign: 'left', fontSize: '14px', width: '370px', marginLeft: '20px' }}>
          Please enter your email address to reset your account password.
        </p>
        <Inputs
          type="email"
          placeholder="Your email address"
          className="form-control" 
          value={email}
          onChange={handleChange}
          id="email"
        />
        {!isValid && (
          <div className="text-danger" style={{ textAlign: "left", marginLeft:15 }}>Please enter a valid email address</div>
        )}
        {isNotFound && (
          <div className="text-danger" style={{ textAlign: "left", marginLeft:15 }}>User not found. Please enter a registered email address</div>
        )}
        <Button
          className="btn btn-primary"
          height={50}
          text={isLoading ? "Loading..." : "Reset my password"}
          fontSize={13}
          disabled={!isValid || isLoading}
          onClick={handleResetPassword}
          type="submit"
        />
        <Link to="/">
          <Button
            className="btn btn-light"
            height={40}
            marginTop={5}
            p="Cancel password reset?"
          />
        </Link>
      </Form>
    </div>
  );
};
export default ResetPassword;