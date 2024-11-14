interface ButtonLineForcaProps {
    letra: string;
    letraDoUsuario: string[];
    setAcertou: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ButtonLineForca({ letra, letraDoUsuario,setAcertou }: ButtonLineForcaProps) {
    const estaNaPalavra = letraDoUsuario.includes(letra);


    return (
        <button className="w-14 h-12 border-b-4 border-gray-600 bg-transparent">
            {estaNaPalavra ? letra : ""}
        </button>
    );
}
