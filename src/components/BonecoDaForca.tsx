interface BonecoDaForcaProps {
    derrota: number
}

export default function BonecoDaForca({derrota}: BonecoDaForcaProps) {
    return (
        <>
            <div className="w-32 absolute top-0 left-12 h-1 bg-gray-800"></div>
            <div className="absolute top-0 left-12 w-32 h-1 bg-gray-800"></div>
            <div className="absolute top-0 left-44 w-1 h-12 bg-gray-800"></div>
            {derrota > 0 && (
                <div className="absolute top-12 left-[154px] w-12 h-12 rounded-full border-4 border-gray-800"></div>
            )}
            {derrota > 1 && (
                <div className="absolute top-24 left-44 w-1 h-24 bg-gray-800"></div>
            )}
            {derrota > 2 && (
                <div className="absolute top-28 left-[138px] w-12 h-1 bg-gray-800 transform rotate-45"></div>
            )}
            {derrota > 3 && (
                <div className="absolute top-[112px] left-[170px] w-12 h-1 bg-gray-800 transform -rotate-45"></div>
            )}
            {derrota > 4 && (
                <div className="absolute top-[204px] left-[170px] w-12 h-1 bg-gray-800 transform rotate-45"></div>
            )}
            {derrota >= 5 && (
                <div className="absolute top-[204px] left-[138px] w-12 h-1 bg-gray-800 transform -rotate-45"></div>
            )}
        </>
    );
}
