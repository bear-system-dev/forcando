export interface ParticipanteProps {
    ativo: boolean
    nome:string
}

export default function Participante({ativo, nome}: ParticipanteProps) {
    return (
        <>
            {
                ativo ? (
                    <p className='text-indigo-700 font-semibold'>{nome}</p>
                ) : (
                    <p className='text-gray-600'>{nome}</p>
                )
            }
        </>
    )
};
