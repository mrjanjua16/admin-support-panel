import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOutSuccess, signOutFailure } from '../redux/user/userSlice';

import { useEffect, useState } from 'react';

import logo from '../assets/react.svg';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);

    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.message || 'Failed to sign out');
            } else {
                dispatch(signOutSuccess());
                navigate('/login');
            }
        } catch (error) {
            dispatch(signOutFailure(error.message));
        }
    };

    return (
        <Navbar className="w-full p-4 text-white fixed top-0 left-0 z-10">
            <Navbar.Brand as={Link} to="/Dashboard" className="flex items-center">
                <img src={logo} alt="logo" className="h-8 w-8 mr-2" />
                <span className="text-black self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">Admin Support Panel</span>
            </Navbar.Brand>
            <div className="flex items-center ml-auto justify-between">
                <form className="flex items-center mr-4">
                    <TextInput
                        type='text'
                        placeholder='Search'
                        icon={AiOutlineSearch}
                        className='hidden lg:inline'
                    />
                    <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                        <AiOutlineSearch />
                    </Button>
                </form>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={<Avatar alt="User settings" img={currentUser.user.profilePicture} rounded />}
                    rounded
                    size='sm'
                    color='gray'
                    className='w-52 ml-6'
                >
                    <Dropdown.Header>
                        <span className='block text-sm font-medium text-gray-900'>
                            {currentUser.user.name}
                        </span>
                        <span className='block text-sm font-medium text-gray-500'>
                            {currentUser.user.email}
                        </span>
                    </Dropdown.Header>
                    <div className='border-b border-gray-800 my-2' />
                    <Link to="/Profile">
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Link to="/Settings">
                        <Dropdown.Item>Settings</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
        </Navbar>
    );
}
