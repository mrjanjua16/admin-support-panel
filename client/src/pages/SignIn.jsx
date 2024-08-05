import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { signInStart,
  signInSuccess,
  signInFailure, } from '../redux/user/userSlice.js';

import logo from '../assets/react.svg';


export default function SignIn() {
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }
    try {
      dispatch(signInStart());
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate('/Dashboard');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <div className='items-center justify-center inline-block'>
            <img src={logo} alt='logo' className='w-10 h-10' />
            <p className='text-sm mt-5'>
              Admin Support Portal.
          </p>
          </div>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email Address' />
              <TextInput type='text' placeholder='email@email.com' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Password' />
              <TextInput type='password' placeholder='***********' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>loading...</span>
                </>
              ) : ('Sign In')}
            </Button>
            
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'> Sign Up</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};