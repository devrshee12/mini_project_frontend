import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import  validator  from 'validator';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

import { useUserContext } from '../context/user_context';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SignIn() {
  const {type, name, email, number, password, setName, setEmail, setNumber, setPassword} = useUserContext();
  const [emailError,setEmailError]=useState();
  const [numberError,setNumberError]=useState();
  const [passwordError,setPasswordError]=useState();
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const data = {name, number, email, password};
        console.log("after");
        axios.post('http://localhost:5000/api/v1/auth/register', data)
          .then((response) => {
            console.log(response);

            navigate("/main");
            

          }, (error) => {
            console.log(error);
          });
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-25">



      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          {/* <.div className="text-center mb-3">
            <p>Sign in with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          <div> */}
        <div className="d-flex justify-content-around mb-3 ">

                <div class="form-check ">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label class="form-check-label" for="flexRadioDefault1">
                    Member
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                <label class="form-check-label" for="flexRadioDefault2">
                    Creator
                </label>
                </div>
        </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          <p className="text-center">Not a member? <a href="#!">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          {/* <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div> */}

          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' value={name} onChange={(e) => {setName(e.target.value)}}/>
          <span className={numberError=="Phone Number Valid"?"text-success":"text-danger"}>{numberError}</span>
          <MDBInput wrapperClass='mb-4' label='Number' id='form1' type='number' value={number} onChange={(e) => {
            setNumber(e.target.value)
            if(e.target.value.length==10)
            {
              setNumberError("Phone Number Valid")
            }
            else{
              setNumberError("Number should have 10 digit")
            }
            }}/>
          <span className={emailError=="Valid Email"?"text-success":"text-danger"}>{emailError}</span>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(e) => {
            setEmail(e.target.value)
            if(validator.isEmail(e.target.value)){
              setEmailError("Valid Email");
            }else{
              // console.log("hell")
              setEmailError("Invalid Email");
            }
          }}/>
          <span className={passwordError=="Strong Password"?"text-success":"text-danger"}>{passwordError}</span>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={password} onChange={(e) => {
            setPassword(e.target.value)
            if(validator.isStrongPassword(e.target.value)){
              setPasswordError("Strong Password")

            }else{
              setPasswordError("Weak Password")
            }
            }}/>
          

          {/* <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div> */}

          <MDBBtn className="mb-4 w-100 btn" disabled={(emailError=="Valid Email" && passwordError=="Strong Password")?false:true} onClick={handleClick}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default SignIn;