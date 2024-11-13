interface BonecoDaForcaProps {
    derrota: number
}

export default function BonecoDaForca({derrota}: BonecoDaForcaProps) {
    return (
        <>
            <div className="w-32 absolute top-14 left-[92px] h-1 bg-gray-800"></div>
            <div className="absolute top-14 left-[92px] w-32 h-1 bg-gray-800"></div>
            <div className="absolute top-14 left-[220px] w-1 h-12 bg-gray-800"></div>
            {derrota > 0 && (
                <div className="absolute top-[104px] left-[198px] w-12 h-12 rounded-full border-4 border-gray-800"></div>
            )}
            {derrota > 1 && (
                <div className="absolute top-[152px] left-[220px] w-1 h-24 bg-gray-800"></div>
            )}
            {derrota > 2 && (
                <div className="absolute top-[168px] left-[182px] w-12 h-1 bg-gray-800 transform rotate-45"></div>
            )}
            {derrota > 3 && (
                <div className="absolute top-[168px] left-[214px] w-12 h-1 bg-gray-800 transform -rotate-45"></div>
            )}
            {derrota > 4 && (
                <div className="absolute top-[260px] left-[214px] w-12 h-1 bg-gray-800 transform rotate-45"></div>
            )}
            {derrota >= 5 && (
                <div className="absolute top-[260px] left-[182px] w-12 h-1 bg-gray-800 transform -rotate-45"></div>
            )}
        </>
    );
}
