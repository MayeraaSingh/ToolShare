import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBell, FaUserCircle, FaMoon, FaHome } from 'react-icons/fa';
import { Button, TextInput } from 'flowbite-react';
import { HiOutlineMenu } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice.js';
import DSidebar from './Sidebar.jsx';

export default function Header() {
    const dispatch = useDispatch();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Get current user from Redux
    const user = useSelector((state) => state.user.currentUser);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleNotifs = () => {
        setIsNotificationsOpen((prev) => !prev);
        setIsUserMenuOpen(false); // Close profile dropdown when notifications dropdown is toggled
    };
    
    const handleProfile = () => {
        setIsUserMenuOpen((prev) => !prev);
        setIsNotificationsOpen(false); // Close notifications dropdown when profile dropdown is toggled
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

                {/* Home Icon */}
                <Link to="/" className="flex items-center text-gray-700 dark:text-gray-300 mr-4">
                    <FaHome size={24} />
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
                    <div
                        className="relative flex items-center justify-center"
                        onMouseLeave={() => setTimeout(() => setIsNotificationsOpen(false), 5000)}
                    >
                        <Button
                            className="w-12 h-10 flex items-center justify-center hover:shadow-md transition-shadow"
                            color="gray"
                            pill
                            onClick={handleNotifs}
                        >
                            <FaBell />
                        </Button>
                        {isNotificationsOpen && (
                        <div
                            className="absolute top-full mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 w-64 z-50 -translate-x-4"
                            onMouseEnter={() => clearTimeout()} // Cancel timeout on hover
                            onMouseLeave={() => setTimeout(() => setIsNotificationsOpen(false), 5000)} // Close after 5 seconds
                        >
                            {[
                            {
                                title: "Return Reminder: Your Rental is Due Tomorrow!",
                                body: "Hi Priya, don’t forget to return the Dyson V15 Vacuum Cleaner to Ramesh, Apartment #205, by tomorrow to avoid late fees.",
                            },
                            {
                                title: "New Request for Your Tool!",
                                body: "Arjun from Apartment #310 wants to borrow your Philips Hair Dryer from Dec 26 to Dec 27. Review their request and approve or decline it now!",
                            },
                            {
                                title: "Hot Tools in Your Community!",
                                body: "Looking for a Camping Tent? Check out these popular tools recently listed in your area: Canon EOS 90D Camera, Sewing Machine, and Inalsa Air Fryer.",
                            },
                            ].map((notification, index) => (
                            <div
                                key={index}
                                className="mb-4 last:mb-0 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800"
                            >
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                {notification.body}
                                </p>
                            </div>
                            ))}
                        </div>
                        )}


                    </div>

                    {/* User Icon */}
                    <div
                        className="relative flex items-center justify-center"
                        onMouseLeave={() => setTimeout(() => setIsUserMenuOpen(false), 5000)}
                    >
                        <Button
                            className="w-12 h-10 flex items-center justify-center hover:shadow-md transition-shadow"
                            color="gray"
                            pill
                            onClick={handleProfile}
                        >
                            <FaUserCircle size={22} />
                        </Button>
                        {isUserMenuOpen && (
                            <div
                                className="absolute top-full mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 w-80 z-50"
                                onMouseEnter={() => clearTimeout()} // Cancel timeout on hover
                                onMouseLeave={() => setTimeout(() => setIsUserMenuOpen(false), 5000)} // Close after 5 seconds
                            >
                                {user ? (
                                    <div className="flex flex-col items-start">
                                        <img
                                            src={user.profilePicture}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full mb-2"
                                        />
                                        <p className="text-sm font-semibold">{user.name}</p>
                                        <p className="text-sm">{user.email}</p>
                                        <Link
                                            to="/manage-profile"
                                            className="text-blue-500 block mt-2"
                                            onClick={() => setIsUserMenuOpen(false)} // Close dropdown
                                        >
                                            Manage Your Profile
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-sm font-semibold">Hello Guest</p>
                                        <p className="text-sm mt-2">No email found</p>
                                        <Link
                                            to="/register"
                                            className="text-blue-500 block mt-2"
                                            onClick={() => setIsUserMenuOpen(false)} // Close dropdown
                                        >
                                            Login / Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>



                </div>
            </nav>
        </>
    );
}
