import React,{useState} from "react";
import "./Registration.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "font-awesome/css/font-awesome.min.css";
import  validator  from 'validator';
import { useUserContext } from '../../context/user_context';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import { Link } from "react-router-dom";

const Registration = () => {
  const { name, email, number, password, setName, setEmail, setNumber, setPassword} = useUserContext();
  const [emailError,setEmailError]=useState();
  const [passwordError,setPasswordError]=useState();
  const [numberError,setNumberError]=useState();
  const navigate = useNavigate();
  
  const validateEmail=(e)=>{
    setEmail(e.target.value)
    if(validator.isEmail(e.target.value)){
      setEmailError("Valid Email");
    }else{
      setEmailError("Invalid Email*");
    }
  }

  const validateNumber=(e)=>{

    setNumber(e.target.value)
    if(e.target.value.length===10)
    {
      setNumberError("Phone Number Valid")
    }
    else{
      setNumberError("Number should have 10 digit*")
    }

  }
  const validatePassword=(e)=>{
    setPassword(e.target.value)
    if(validator.isStrongPassword(e.target.value)){
      setPasswordError("Strong Password")

    }else{
      setPasswordError("Passwords must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols*")
    }
  }

  const handleRegisterClick = async(e) => {
    e.preventDefault();
    const data = {name, number, email, password};
    try{
      const res = await axios.post("/api/v1/auth/register/creater", data);

      if(res){
        alert("register successfull");
        setEmail("")
        setName("")
        setNumber("")
        setPassword("")
        navigate("/");
      }
      else{
        console.log("somthing went wrong");
      }
    }
    catch(err){
      console.log(err);
    }
  }



  return (
    <>
      
        <div className="container-fluid h-100 align-items-center">
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
                  <p className="lead fw-normal mb-0 me-3">Sign up with</p>
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
                  >
                    <i className="fa fa-google"></i>
                  </button>
                </div>

                <div className="divider d-flex align-items-center mt-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    id="form3Example4"
                    className="form-control"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
{

             email &&   <span className={emailError==="Valid Email"?"text-success":"text-danger"}>{emailError}</span>
}

                <div className="form-group mb-2">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control "
                    placeholder="Enter valid email address"
                    value={email}
                    onChange={validateEmail}
                  />
                </div>
              {
                email && 
                <span className={passwordError==="Strong Password"?"text-success":"text-danger"}>{passwordError}</span>
              }
                <div className="form-group mb-2">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={validatePassword}
                  />
                </div>
{

    number &&   <span className={numberError==="Phone Number Valid"?"text-success":"text-danger"}>{numberError}</span>
}

                <div className="form-group mb-2">
                  <input
                    type="number"
                    id="form3Example4"
                    className="form-control"
                    placeholder="Enter Phone"
                    value={number}
                    onChange={validateNumber}
                  />
                </div>


                <div className="text-center text-lg-start mt-3 pt-2 d-flex justify-content-center flex-column ">
                  <button type="button" className="  btn btn-primary" disabled={(emailError==="Valid Email" && passwordError==="Strong Password")?false:true} onClick={handleRegisterClick}> 
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
    </>
  );
};

export default Registration;
