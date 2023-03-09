
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Title } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

import './otp.css';

const codeRegex = /^\d{6}$/;

const VerifyCode = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isValidCode, setIsValidCode] = useState(false);
  const [isIncorrectCode, setIsIncorrectCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { addToast } = useToasts();

  const currentUrl = new URL(window.location.href);

  const searchParams = new URLSearchParams(currentUrl.search);

  const email = searchParams.get('email');

  const mutation = useMutation((data) => {
    setIsLoading(true);
    return fetch('http://127.0.0.1:5000/api/v1/auth/verify_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .finally(() => setIsLoading(false));
  });

  const handleOtpChange = (event, index) => {
    const value = event.target.value;
    if (isNaN(value)) {
      return false;
    }
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);
    const otpString = otpCopy.join('');
    setIsValidCode(codeRegex.test(otpString) && otpString !== '');
    setIsIncorrectCode(false);
    if (index < 5 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString !== '' && isValidCode) {
      if (otp.includes('')) { // Si une case est vide
        setIsIncorrectCode(true);
        return false;
      }
      mutation.mutate(
        {
          email: email,
          verification_code: otpString,
        },
        {
          onSuccess: (data) => {
            if (data.error) {
              setIsIncorrectCode(true);
            } else {
              addToast('Verification code is correct!', { appearance: 'success' ,  autoDismiss: true,
              autoDismissTimeout: 2000,
              style: { marginTop: "65px" }, });
              navigate(`/SetNewPd?email=${email}&verification_code=${otpString}`);
            }
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } else { // Si une case est vide
      setIsIncorrectCode(true);
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    if (isValidCode && isIncorrectCode === false) {
      handleSubmit();
    }
  }, [isValidCode, isIncorrectCode]);

  return (

      <>
        <div>
          <Form>
            <Title title="Verification code" width={196} />
            <p
              style={{
                color: '#1D2C59',
                textAlign: 'left',
                fontSize: '16px',
                marginLeft: '20px',
              }}
            >
              A verification code has been sent to your email, please enter it in the field below.
            </p>

            <div className="man">
              {otp.map((value, index) => (
                <input
                  className='form-control input-otp'
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(event) => handleOtpChange(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  ref={(ref) => inputRefs.current.push(ref)}
                />
              ))}
            </div>
            {!isValidCode && (
            <div className="text-danger" style={{ textAlign: 'left', marginLeft: 15 }}>
             
            </div>
          )}
          {isIncorrectCode && (
            <div className="text-danger" style={{ textAlign: 'left', marginLeft: 15 }}>
              Incorrect verification code, please try again
            </div>
          )}
          <Button
            className="btn btn-primary"
            height={50}
           
            text= {isLoading ? "Loading..." : "Continue"}
            fontSize={15}
          
            onClick={handleSubmit}
            type="submit"
          />
         
       
            <Link to="/ResetPassword">
            <Button
              className="btn btn-light"
              height={40}
              marginTop={20}
              p="Nothing received? "
              text="Try again?"
              Link="ResetPassword"
            />
            </Link>
          
          </Form>
        </div>
      </>
    );
  };
  
  export default VerifyCode ;
  