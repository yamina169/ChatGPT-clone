
    import React from "react";
    import { useState } from "react";
    import { useMutation } from "react-query";
    import { Form, Inputs, Button, Title } from "../components/index";
    import { Link, useNavigate } from "react-router-dom";
    import { useToasts } from "react-toast-notifications";
    
    const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [isFormValid, setIsFormValid] = useState(false);
      const [emailError, setEmailError] = useState("");
      const [passwordError, setPasswordError] = useState("");
      const [isLoading, setIsLoading] = useState(false);
    
      const navigate = useNavigate();
      const { addToast } = useToasts();
    
      const validateForm = () => {
        let valid = true;
        if (email === "") {
          setEmailError("Email is required");
          valid = false;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            valid = false;
          } else {
            setEmailError("");
          }
        }
    
        if (password === "") {
          setPasswordError("Password is required");
          valid = false;
        } else if (password.length < 7) {
          setPasswordError("Password must be at least 7 characters long");
          valid = false;
        } else {
          setPasswordError("");
        }
    
        setIsFormValid(valid);
      };
    
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError("");
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError("");
      };
    
      const handleLoginClick = () => {
        validateForm();
        setIsLoading(true);
        loginUser.mutate({ email, password });
      };
    
      const loginUser = useMutation(
        (user) => {
          return fetch("http://127.0.0.1:5000/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }).then((res) => {
            if (res.status === 401) {
              throw new Error("Invalid email or password");
            } else if (!res.ok) {
              throw new Error("An error occurred while logging in");
            } else {
              return res.json();
            }
          });
        },
        {
          onSuccess: (data) => {
            localStorage.setItem("access", data.user.access);
            navigate("/Home");
          },
          onError: (error) => {
            setIsLoading(false);
            if (isFormValid) {
              // Show error toast only if the form is valid
              addToast(error.message, {
                appearance: "warning",
                autoDismiss: true,
                autoDismissTimeout: 1000,
                style: { marginTop: "65px" },
              });
            }
          },
        }
      );
    
  return (
  <div>
  <Form>
  <Title title="Welcome back" />
  <Inputs
         type="email"
         placeholder="Your email address"
         className="form-control"
         value={email}
         onChange={handleEmailChange}
       />
  {emailError && (
  <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
  {emailError}
  </div>
  )}
  <Inputs
         type="password"
         placeholder="Your password"
         className="form-control"
         value={password}
         onChange={handlePasswordChange}
       />
  {passwordError && (
            <div className="text-danger" style={{ textAlign: "left", marginLeft: 15 }}>
              {passwordError}
            </div>
          )}
          
          <Button
           className="btn btn-primary"
           height={50}
           text={isLoading ? "Loading..." : "Login"}
           fontSize={15}
           onClick={handleLoginClick}
           //disabled={email === "" || password === ""}
         />
         
         
    <Button className="btn btn-light" height={40} marginTop={10} text=" Create one" p="Don't you have an account yet ?" Link="CreateAccount"/>
          
    <Link to="/ResetPassword">
          <Button  className="btn btn-light"  height={40}  marginTop={3}  p="Forget your password?"  text=" Reset now"  Link="ResetPassword"
          />
        </Link>
        </Form>
      </div>
    );
    };
    
    export default Login