import React from 'react';
import { Sidebar } from 'flowbite-react';
import { FaRegHandPeace, FaRegClipboard, FaRegClock, FaInfoCircle } from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default function DSidebar({ isOpen, toggleSidebar }) {
    return (
        <div
            className={`fixed top-[64px] left-0 h-full bg-white dark:bg-gray-800 shadow-lg transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out z-50 w-64`} // Adjusting to appear below the header
        >
            <Sidebar className="h-full">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Link to='/borrowed'>
                        <Sidebar.Item className="flex items-center space-x-3 p-2"
                            icon={FaRegHandPeace}>
                            <span>Borrowed Items</span>
                        </Sidebar.Item>
                        </Link>
                        <Link to='/registered'>
                        <Sidebar.Item className="flex items-center space-x-3 p-2"
                            icon={FaRegClipboard}>
                            <span>Registered Items</span>
                        </Sidebar.Item>
                        </Link>
                        <Link to='/reviewed'>
                        <Sidebar.Item className="flex items-center space-x-3 p-2"
                            icon={FaRegClock}>
                            <span>Review for Later</span>
                        </Sidebar.Item>
                        </Link>
                        <Link to='/about'>
                        <Sidebar.Item className="flex items-center space-x-3 p-2"
                            icon={FaInfoCircle}>
                            <span>About Us</span>
                        </Sidebar.Item>
                        </Link>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}
