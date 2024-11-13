import { useState } from "react";

interface ModalInputProps {
    isOpen: boolean;     
    onClose: () => void;  
    onConfirm: (inputValue: string) => void; 
  }
  

export default function ModalInput({ isOpen, onClose, onConfirm }: ModalInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleConfirm = () => {
        onConfirm(inputValue); 
        setInputValue(''); 
        onClose(); 
    };
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-semibold mb-4">Qual a letra?</h2>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded mb-4"
                        placeholder="Digite algo..."
                        maxLength={1}
                    />
                    <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Confirmar
                    </button>
                    </div>
                </div>
                </div>
            )}
        </>
    )
};
