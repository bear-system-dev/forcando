interface ButtonLineForcaProps {
    letra: string;
    letraDoUsuario: string[];
}

export default function ButtonLineForca({ letra, letraDoUsuario }: ButtonLineForcaProps) {
    const estaNaPalavra = letraDoUsuario.includes(letra);


    return (
        <button className="w-14 h-12 border-b-4 border-gray-600 bg-transparent">
            {estaNaPalavra ? letra : ""}
        </button>
    )
}
