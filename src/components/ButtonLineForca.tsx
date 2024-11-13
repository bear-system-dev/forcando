import { useState } from "react"
import ModalInput from "./ModalInput"


export default function ButtonLineForca() {
    const [letra, setLetra] = useState('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleConfirm = (inputValue: string): void => {
        setLetra(inputValue)
    };

    return (
        <>
            <ModalInput
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-14 h-12 border-b-4 border-gray-600 bg-transparent"
            >
                {
                    letra
                }
            </button>
        </>
    )
};
