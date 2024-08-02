import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { signInStart,
  siginInSuccess,
  signInFailure, } from '../redux/user/userSlice.js';

import logo from '../assets/react.svg';


export default function SignIn() {
  return (
    <div className="container flex h-100 items-center justify-center">
      <div className="page-center">
        <div className="w-full">
          <div className="w-full">
            <form className="loginContainer">
              <div className="text-center">
                <img
                  src={logo}
                  alt="logo"
                  className='w-10 h-10'
                />
              </div>
              <h2 className="text-center">
                Support / Implementation Portal
              </h2>
              <div className="form-outline mb-4">
                <label className="form-label font-medium" htmlFor="form2Example1">
                  Email address:
                </label>
                <input
                  type="email"
                  name="email"
                  id="form2Example1"
                  className="form-control"
                  value=""
                />
                <span className="requiredFld text-red-500 text-xs"></span>
              </div>
              <div className="form-outline mb-4">
                <label className="form-label font-medium" htmlFor="form2Example2">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="form2Example2"
                  className="form-control"
                  value=""
                />
                <span className="requiredFld text-red-500 text-xs"></span>
              </div>
              <div className="w-full text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>
              </div>
              <div className="w-full text-center">
                <a role="button">Forgot password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};