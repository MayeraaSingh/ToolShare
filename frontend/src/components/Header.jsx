import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBell, FaUserCircle, FaMoon } from 'react-icons/fa';
import { Button, TextInput } from 'flowbite-react';
import { HiOutlineMenu } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice.js';
import DSidebar from './Sidebar.jsx';

export default function Header() {
    const dispatch = useDispatch();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleNotifs = () => {
        setIsNotificationsOpen((prev) => !prev);
    };

    const handleProfile = () => {
        setIsUserMenuOpen((prev) => !prev);
    };

    return (
        <>
            {/* Sidebar */}
            <DSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Header */}
            <nav className="border-b-2 px-4 py-2 flex items-center justify-between bg-white dark:bg-gray-800">
                {/* Sidebar Icon */}
                <Button
                    className="flex items-center space-x-2"
                    color="gray"
                    onClick={toggleSidebar}
                >
                    <HiOutlineMenu size={20} />
                </Button>

                {/* Logo */}
                <Link to="/" className="text-lg sm:text-xl font-bold whitespace-nowrap">
                    <span className="text-teal-500 dark:text-blue-300">TOOL</span>
                    <span className="text-lightblue-400 dark:text-blue-400">SHARE</span>
                </Link>

                {/* Search Bar */}
                <form>
                    <TextInput
                        type="text"
                        placeholder="Search..."
                        rightIcon={AiOutlineSearch}
                        className="hidden lg:inline"
                    />
                </form>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <Button
                        className="w-12 h-10 hidden sm:inline"
                        color="gray"
                        pill
                        onClick={() => dispatch(toggleTheme())}
                    >
                        <FaMoon />
                    </Button>

                    {/* Notification Bell */}
                    <div className="relative">
                        <Button
                            className="w-12 h-10"
                            color="gray"
                            pill
                            onClick={handleNotifs}
                        >
                            <FaBell />
                        </Button>
                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 w-64 z-50">
                                <p className="text-sm p-5">Notification 1</p>
                                <p className="text-sm p-5">Notification 2</p>
                                <p className="text-sm p-5">Notification 3</p>
                            </div>
                        )}
                    </div>

                    {/* User Icon */}
                    <div className="relative">
                        <Button
                            className="w-12 h-10 items-center"
                            color="gray"
                            pill
                            onClick={handleProfile}
                        >
                            <FaUserCircle size={22} />
                        </Button>
                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 w-80 z-50">
                                <p className="text-sm font-semibold">Hello, Guest</p>
                                <p className="text-sm mt-2">No Email Found</p>
                                <Link
                                    to="/manage-profile"
                                    className="text-blue-500 block mt-2"
                                >
                                    Manage Your Profile
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
