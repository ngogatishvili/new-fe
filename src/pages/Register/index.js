import React, {useRef,useState} from 'react';
import {Button, TextField} from '@mui/material';
import {Link, Navigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import CustomAlert from '../../components/Alert';
import {
  registerUser,
  showRegisterAlertSelector,
  registerAlertSelector,
  userSelector,
} from '../../redux';


function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [imageFile,setImageFile]=useState("");

  // useSelector hook
  const registerData = useSelector((state) => {
    return {
      showAlert: showRegisterAlertSelector(state),
      alertText: registerAlertSelector(state),
      user: userSelector(state),
    };
  });

  const {showAlert, alertText, user} = registerData;
  // useDispatch  hook

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  return (
    <>
      {user && <Navigate replace to='/' />}
      <div className='registerFormContainer'>
        <div className='register-form'>
          {showAlert && <CustomAlert message={alertText} />}
          <h2>Register Form</h2>
          <div className='form-item'>
            <TextField
              label='name'
              color='secondary'
              type='text'
              placeholder='type your name...'
              inputRef={nameRef}
              variant='outlined'
            />
          </div>
          <div className='form-item'>
            <TextField
              label='E-mail'
              color='secondary'
              type='email'
              placeholder='type your email...'
              inputRef={emailRef}
              variant='outlined'
            />
          </div>
          <div className='form-item'>
            <TextField
              label='password'
              color='secondary'
              type='password'
              placeholder='type your password...'
              inputRef={passwordRef}
              variant='outlined'
            />
          </div>

          <div className='form-item'>
            <Button
              onClick={handleRegister}
              type='submit'
              color='secondary'
              variant='contained'>
              Sign Up
            </Button>
          </div>

          <div>
            Already a member?
            <Link to='/login'>
              <Button color='secondary' variant='outlined'>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
