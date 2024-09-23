import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center rounded-lg p-2">
            <input 
                type="text" 
                value={query} 
                onChange={handleInputChange} 
                placeholder="Masukkan..." 
                className="flex-grow p-2 rounded-l-lg w-[20em] mt-2 border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200" 
                aria-label="Search" 
            />
            <button 
                type="submit" 
                className="bg-blue-700 text-white py-2 px-4 mt-2 rounded-r-lg hover:bg-blue-600 hover:shadow-lg transition-colors"
            >
                Cari
            </button>
        </form>
    );
};

export default Search;
