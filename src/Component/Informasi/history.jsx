import React from 'react';
import Gajah from '../../asset/CCTV/Gajah_Giring.jpeg';

const cardData = [
    {
        id: 1,
        image: Gajah,
        name: 'CAM-P013',
        description: '20/08/2024'
    },
    {
        id: 2,
        image: Gajah,
        name: 'CAM-P013',
        description: '21/08/2024'
    },
    {
        id: 3,
        image: Gajah,
        name: 'CAM-P013',
        description: '21/08/2024'
    },
    {
        id: 4,
        image: Gajah,
        name: 'CAM-P013',
        description: '22/08/2024'
    },
    {
        id: 5,
        image: Gajah,
        name: 'CAM-P010',
        description: '22/08/2024'
    },
];

const History = () => {
    return (
        <div className="w-full h-[40em] bg-gray p-4">
            <div className='w-full bg-white py-3 mb-6 flex justify-between items-center rounded-lg'>
                <h1 className="text-2xl font-bold px-8">Histori</h1>
                <div className="flex space-x-2 px-8">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex justify-center items-center">
                        {/* Add icon or content here */}
                    </div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex justify-center items-center">
                        {/* Add icon or content here */}
                    </div>
                    <div className="w-8 h-8 bg-green-400 rounded-full flex justify-center items-center">
                        {/* Add icon or content here */}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {cardData.map(item => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-700">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
