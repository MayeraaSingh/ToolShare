import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBell, FaUserCircle, FaMoon } from 'react-icons/fa';
import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import { HiOutlineMenu } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import {toggleTheme} from '../redux/themeSlice.js';


export default function Header() {
    const dispatch = useDispatch();

    return (
        <nav className="border-b-2 px-4 py-2 flex items-center justify-between bg-white dark:bg-gray-800">
          {/* Sidebar Icon */}
          <Button className="flex items-center space-x-2" color='gray'>
            <HiOutlineMenu size={20}/>
          </Button>
    
          {/* Logo */}
          <Link to="/" className="text-lg sm:text-xl font-bold whitespace-nowrap">
            <span className="text-teal-500 dark:text-blue-300">TOOL</span>
            <span className="text-lightblue-400 dark:text-blue-400">SHARE</span>
          </Link>
    
          {/* Search Bar */}
          <form >
           <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
    
          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
            
            <div className='flex gap-2 md:order-2'>
                <Button 
                    className='w-12 h-10 hidden sm:inline' 
                    color='gray' 
                    pill
                    onClick={() => dispatch(toggleTheme())}>
                    <FaMoon />
                </Button>
            </div>
    
            {/* Notification Bell */}
            <div className='flex gap-2 md:order-2'>
                <Button 
                    className='w-12 h-10 hidden sm:inline' 
                    color='gray' 
                    pill>
                    <FaBell />
                </Button>
            </div>
    
            {/* User Icon */}
            <div className='flex gap-2 md:order-2 rounded'>
                <Button 
                    className='w-12 h-10 items-center' 
                    color='gray'  >
                    <FaUserCircle size={22}/>
                </Button>
            </div>
          </div>
        </nav>
    );
};
