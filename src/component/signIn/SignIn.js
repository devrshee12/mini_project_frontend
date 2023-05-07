import React,{useState} from "react";
import "./signIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import validator from "validator";
import { useUserContext } from '../../context/user_context';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {auth, provider} from "../../config"
import { signInWithPopup } from "firebase/auth";
import { useDashboradContext } from "../../context/dashboard_context";
const SignIn = () => {
  const navigate = useNavigate();

  const{type,setType,email,setEmail,password,setPassword}=useUserContext()
  const {handleMemberProjectTask} = useDashboradContext();
  const [emailError,setEmailError]=useState();
  const [passwordError,setPasswordError]=useState();

  const validatePassword=(e)=>{
    setPassword(e.target.value)
    if(validator.isStrongPassword(e.target.value)){
      setPasswordError("Strong Password")

    }else{
      setPasswordError("Passwords must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols*")
    }
  }

  const validateEmail=(e)=>{
    setEmail(e.target.value)
    if(validator.isEmail(e.target.value)){
      setEmailError("Valid Email");

    }else{
      setEmailError("Invalid Email*");
    }
  }

  const handleLoginClick = (e) => {
    e.preventDefault();
    console.log("here");

    const data = {type, email, password};
    console.log(data);
    axios.post('/api/v1/auth/login', data, {
      withCredentials: true
    })
          .then((response) => {
            console.log("data", data);
            console.log(response);
            
              if(type === "member"){
                handleMemberProjectTask(true);
              }
              else{
                handleMemberProjectTask(false);
              }
              navigate("/dashboard");
            
            

          }, (error) => {

            console.log(error.response.data.status);
          });
    
  }


  const handleGoogleLogin = async(e) => {
    signInWithPopup(auth, provider).then((data) => {
        // email and call api for token for cookie 
        console.log("here in sign in with : ", data);
        const generatedEmail = data.user.email;
        setEmail(generatedEmail);
        setPassword(generatedEmail);

        axios.post('/api/v1/auth/google', {
          email: generatedEmail,
          type: "creater",
          
        }, {
          withCredentials: true
        })
              .then((res) => {
                if(res.data.valid)
                console.log("here for response devapanchhi :", res);
                navigate("/dashboard");
                
    
              }, (error) => {
                alert("something went wrong");
                navigate("/");
                console.log(error.response.data.status);
              });
        

        

    })
  }

  return (
    <>
      
        <div className="container-fluid mt-5 h-100 align-items-center">
          <div className="row d-flex justify-content-center align-items-center h-75">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <i className="fa fa-facebook"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <i className="fa fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <i className="fa fa-linkedin"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                    onClick={handleGoogleLogin}
                  >
                    <i className="fa fa-google"></i>
                  </button>
                </div>

                <div className="divider d-flex align-items-center mt-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

        <div className="d-flex justify-content-around mb-2 ">

                <div className="form-check ">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={type === "member"} onChange={(e) => {
                  if(e.target.checked){
                    setType("member")
                  }
                  }} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Member
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={type === "creater"} onChange={(e) => {
                  if(e.target.checked){
                    setType("creater")
                  }
                  }} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Creator
                </label>
                </div>
        </div>
        <span className={emailError==="Valid Email"?"text-success":"text-danger"}>{emailError}</span>
                <div className="form-group mb-2">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control "
                    placeholder="Enter a valid email address"
                    onChange={validateEmail}
                  />
                </div>
        <span className={passwordError==="Strong Password"?"text-success":"text-danger"}>{passwordError}</span>
                <div className="form-group mb-2">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={validatePassword}
                  />
                </div>


                <div className="text-center text-lg-start mt-3 pt-2 d-flex justify-content-center flex-column ">
                  <button type="button" onClick={handleLoginClick}className="btn btn-primary" disabled={(emailError==="Valid Email" && passwordError==="Strong Password")?false:true} >
                    Login
                  </button>
                  <div className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    &nbsp;
                    <Link to="/register" className="text-decoration-none">Register</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      
    </>
  );
};

export default SignIn;
