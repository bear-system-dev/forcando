interface ButtonLineForcaProps {
    letra:string
    letraDoUsuario:string[]
}

export default function ButtonLineForca({letra, letraDoUsuario}: ButtonLineForcaProps) {
    
    return (
        <>
            <button
                className="w-14 h-12 border-b-4 border-gray-600 bg-transparent"
            >
                {
                    letraDoUsuario.map((l) => l === letra && l)
                }
            </button>
        </>
    )
};
