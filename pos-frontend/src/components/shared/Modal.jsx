import React from 'react';
// import { motion } from 'framer-motion';


const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

            <div className="bg-[#1a1a1a] rounded-lg shadow-lg w-full max-w-lg mx-4">
                <div className="flex justify-between items-center px-6 py-4 border-b border-b-[#333]">
                    <h2 className="text-xl text-[#f5f5f5] font-semibold">{title}</h2>
                    <button
                        className="text-gray-500 text-2xl hover:text-gray-800"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;