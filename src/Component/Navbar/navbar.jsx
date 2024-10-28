import React, { useState } from 'react';
import Icon from '/diaphragm.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white text-gray-900 shadow-sm transition duration-300 ease-in-out">
            <div className="flex items-center justify-between px-6 md:px-12 py-4">
                <div className="hidden md:flex items-center space-x-4 font-semibold">
                    <a href="/" className="hover:bg-gray-200 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">
                        LOKASI
                    </a>
                    <a href="/perangkat" className="hover:bg-gray-200 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">
                        PERANGKAT
                    </a>
                    <a href="/informasi" className="hover:bg-gray-200 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out">
                        INFORMASI
                    </a>
                </div>

                {/* Title */}
                <div className="flex items-center">
                    <span className="font-semibold text-xl">IoT Station</span>
                    <div className="flex items-center">
                        <img src={Icon} alt="camera icon" className="h-[25px] w-[25px] object-contain ml-2" />
                    </div>
                </div>

                {/* Mobile Navbar Button */}
                <button
                    className="md:hidden focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6 text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Links */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="flex flex-col space-y-2 p-4 font-semibold">
                        <a
                            href="/"
                            className="hover:bg-gray-200 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
                        >
                            LOKASI
                        </a>
                        <a
                            href="/perangkat"
                            className="hover:bg-gray-200 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
                        >
                            PERANGKAT
                        </a>
                        <a
                            href="/informasi"
                            className="hover:bg-gray-200 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
                        >
                            INFORMASI
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
