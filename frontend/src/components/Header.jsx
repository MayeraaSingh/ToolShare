import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaUserCircle, FaMoon, FaHome } from 'react-icons/fa';
import { Button, TextInput } from 'flowbite-react';
import { HiOutlineMenu } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice.js';
import { logout } from '../redux/userSlice.js';
import DSidebar from './Sidebar.jsx';
import toast from 'react-hot-toast';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Get current user from Redux
    const user = useSelector((state) => state.user.currentUser);
    console.log('[Header] Rendering, currentUser:', user);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    
    const handleProfile = () => {
        setIsUserMenuOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/users/logout', { method: 'POST', credentials: 'include' });
        } catch {/* ignore */} finally {
            dispatch(logout());
            setIsUserMenuOpen(false);
            navigate('/register');
            toast.success('Logged out successfully');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
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
                <form onSubmit={handleSearch}>
                    <TextInput
                        type="text"
                        placeholder="Search..."
                        rightIcon={AiOutlineSearch}
                        className="hidden lg:inline"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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

                    {/* Notifications - Coming Soon */}
                    {/* TODO: Implement real-time notifications */}

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
                                className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 w-80 z-50"
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
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                                        <Link
                                            to="/manage-profile"
                                            className="text-blue-500 hover:text-blue-600 block mt-2"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            Manage Your Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-500 hover:text-red-600 block mt-2 text-sm text-left"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-sm font-semibold">Hello Guest</p>
                                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Please log in to continue</p>
                                        <Link
                                            to="/login"
                                            className="text-blue-500 hover:text-blue-600 block mt-2"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="text-blue-500 hover:text-blue-600 block mt-1"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            Register
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
