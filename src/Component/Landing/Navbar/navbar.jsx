import React from 'react';
import Icon from '/diaphragm.png';

const Navbar = () => {
    return (
        <nav className="bg-white text-gray-600 w-full z-50 shadow-sm">
            <div className="px-4 w-full">
                <div className="flex justify-between items-center py-4">
                    <div className="hidden md:flex font-semibold space-x-3 ml-[70px]">
                        <a href="/" className="hover:bg-gray-200 px-4 py-2 rounded transition-colors duration-300 ease-in-out"
                        >LOKASI</a>
                        <a href="/perangkat" className="hover:bg-gray-200 px-4 py-2 rounded transition-colors duration-300 ease-in-out"
                        >PERANGKAT</a>
                        <a href="/informasi" className="hover:bg-gray-200 px-4 py-2 rounded transition-colors duration-300 ease-in-out"
                        >INFORMASI</a>
                    </div>
                        
                    <div className='h-[30px] w-[30px] mr-8'>
                        <img src={Icon} alt="camera" />
                    </div>
                    <div className="md:hidden">
                        <button 
                            type="button" 
                            className="text-gray-400 hover:text-white focus:outline-none focus:text-white transition-colors duration-300 ease-in-out"
                        >
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path d="M4 5h16M4 12h16m-7 7h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
