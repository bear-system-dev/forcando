interface BonecoDaForcaProps {
    derrota: number
}

export default function BonecoDaForca({derrota}: BonecoDaForcaProps) {
    return (
        <>
            <div className="absolute top-[136px] left-0 md:left-[180px] w-32 h-1 bg-gray-800"></div>
            <div className="absolute top-[136px] left-[125px] md:left-[308px] w-1 h-12 bg-gray-800"></div>
            {derrota > 0 && (
                <div className="absolute top-[184px] left-[103px] md:left-[286px] w-12 h-12 rounded-full border-4 border-gray-800"></div>
            )}
            {derrota > 1 && (
                <div className="absolute top-[232px] left-[125px] md:left-[308px] w-1 h-24 bg-gray-800"></div>
            )}
            {derrota > 2 && (
                <div className="absolute top-[270px] left-[121px] md:left-[304px] w-12 h-1 bg-gray-800 transform rotate-45"></div>
            )}
            {derrota > 3 && (
                <div className="absolute top-[270px] left-[87px] md:left-[270px] w-12 h-1 bg-gray-800 transform -rotate-45"></div>
            )}
            {derrota > 4 && (
                <div className="absolute top-[340px] left-[121px] md:left-[304px] w-12 h-1 bg-gray-800 transform rotate-45"></div>
            )}
            {derrota > 5 && (
                <div className="absolute top-[340px] left-[87px] md:left-[270px] w-12 h-1 bg-gray-800 transform -rotate-45"></div>
            )}
        </>
    );
}
