import React from 'react';
import { Sidebar } from 'flowbite-react';
import { FaRegHandPeace, FaRegClipboard, FaRegClock, FaInfoCircle } from 'react-icons/fa';

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
                        <Sidebar.Item className="flex items-center space-x-3 p-2"
                            icon={FaRegHandPeace}>
                            <span>Borrowed Items</span>
                        </Sidebar.Item>
                        <Sidebar.Item className="flex items-center space-x-3 p-2"
                            icon={FaRegClipboard}>
                            <span>Registered Items</span>
                        </Sidebar.Item>
                        <Sidebar.Item className="flex items-center space-x-3 p-2"
                            icon={FaRegClock}>
                            <span>Review for Later</span>
                        </Sidebar.Item>
                        <Sidebar.Item className="flex items-center space-x-3 p-2"
                            icon={FaInfoCircle}>
                            <span>About Us</span>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}
