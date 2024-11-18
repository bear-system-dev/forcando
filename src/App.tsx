import { useCallback, useEffect, useState } from 'react';
import BonecoDaForca from './components/BonecoDaForca';
import ModalInput from './components/ModalInput';
import ButtonLineForca from './components/ButtonLineForca';
import palavrasMock from './mock/mock-palavra-hards';
import Participante from './components/Participante';
import useEnterRoomUser from './hooks/enter_room_user';

interface SorteioProps {
  palavra: string
  tema: string
}

function App() {
  // modal de input
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


  // participantes da sala
  const [participantes, setParticipantes] = useState<string[]>([])
  //nome do jogador
  const [jogador, setJogador] = useState("")


  const [derrota, setDerrota] = useState(0)
  //letras digitadas do usuário
  const [letraDoUsuario, setLetraDoUsuario] = useState<string[]>([])
  //palavra sorteada
  const [palavra, setPalavra] = useState<SorteioProps>(palavrasMock[0])
  //variavel que diz se o usuario venceu
  const [venceu, setVenceu] = useState(false)


  //tira a repetição de letras ex: onepiece ficaria = onepic
  let letrasUnificadas = new Set(palavra.palavra.toLocaleUpperCase())
  //faz uma filtragem no array de letras digitadas e verifica as letras corretas
  let letrasCorretas = letraDoUsuario.filter((letra: string) => letrasUnificadas.has(letra.toUpperCase()))


  //a cada letra enviada do usuário ele verifica se o tamanho palavra real é do tamanho da palavra formada
  useEffect(() => {
    if (letrasCorretas.length === letrasUnificadas.size) {
      setVenceu(true)
    }
  }, [letraDoUsuario])


  //passado como parametro no modal input para que quando no modal seja confirmado ele adiciona mais uma letra no array de letra do usuario
  const handleConfirm = (inputValue: string): void => {
    setLetraDoUsuario([...letraDoUsuario, inputValue.toUpperCase()])
  }


  //inicia o socket com o nome do jogador
  const { socket } = useEnterRoomUser(jogador)

  const handleIniciarJogo = useCallback(() => {
    if (socket && jogador) {
      socket.emit("join", jogador)
    }

    const indiceDaPalavra = Math.floor(Math.random() * palavrasMock.length)
    setLetraDoUsuario([])
    setPalavra(palavrasMock[indiceDaPalavra])
    
    if (socket && jogador) {
      socket.emit("palavra")
    }
  }, [socket, jogador])

  useEffect(() => {
    if (socket) {
      socket.on("player names", (data: string[]) => {
        setParticipantes(data)
      });

      socket.on("join", (novoJogador: string) => {
        setParticipantes((prev) => [...prev, novoJogador]);
      });

      socket.on('leave', (nomeJogador: string) => {
        setParticipantes((prev) => prev.filter((nome) => nome !== nomeJogador))
      })

      socket.on('error', (error: string) => {
        console.log(error)
      })

      socket.on('palavra', (palavra: SorteioProps) => { setPalavra(palavra) })
    }

    return () => {
      socket?.off("player names");
      socket?.off("join");
    };
  }, [socket]);

  return (
    <>
      {palavra.palavra !== 'inicio' && <BonecoDaForca derrota={derrota} />}
      <div className="flex flex-col items-center justify-between w-[100vw] h-[100vh] overflow-hidden bg-slate-100">
        <div className='flex flex-col items-center justify-center w-full py-10'>
          <p className='text-center font-bold text-indigo-950 text-3xl py-2 border-b-2 border-red-500'>
            Forcando
          </p>
          <p className='w-full text-center text-slate-600 text-3xl py-4'>
            {palavra?.tema}
          </p>
          {
            palavra.palavra === 'inicio' && (
              <>
                <input
                  type='text'
                  placeholder='Nome de usuário'
                  className='px-6 py-2 rounded-md my-4'
                  onChange={(e) => setJogador(e.target.value)}
                />
                <button
                  onClick={handleIniciarJogo}
                  className='bg-indigo-700 text-2xl text-white px-14 py-2 rounded-md'
                >
                  Iniciar
                </button>
              </>
            )}
        </div>
        <div>
          <p>{letraDoUsuario}</p>
        </div>
        <ModalInput
          letraDoUsuario={letraDoUsuario}
          palavra={palavra.palavra}
          setDerrota={setDerrota}
          derrota={derrota}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
        <div className='border-b-2 flex flex-col justify-end border-gray-400 w-[80%] h-[100%] py-20'>
          <div className="flex flex-col items-center">
            <div className=" flex space-x-2 ">
              {palavra.palavra === 'inicio' ? (
                <img src="src/assets/bob_esponja_pensando.gif" alt="Descrição do GIF" width="300" />
              ) : (
                palavra?.palavra.split("").map((letra) =>
                  <ButtonLineForca
                    key={letra.toUpperCase()}
                    letraDoUsuario={letraDoUsuario}
                    letra={letra.toUpperCase()}
                  />
                )
              )}
              {derrota === 6 && (
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-red-500">
                  Você perdeu
                </p>
              )}
              {venceu && (
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-green-500">
                  Ganhou
                </p>
              )}
            </div>
          </div>
        </div>
        {palavra.palavra !== 'inicio' && (
          <div className='w-full flex flex-row items-center justify-end  h-[80%] pr-60 pb-10'>
            <div className='flex flex-col items-center justify-start w-[50%] gap-8'>
              <p className='text-xl text-slate-600 '>
                Agora é a sua vez! digite uma letra:
              </p>
              <button
                disabled={derrota === 6}
                onClick={() => setIsModalOpen(true)}
                className={`bg-indigo-700 text-white px-10 py-3 rounded-md ${derrota === 6 && 'bg-gray-600'}`}
              >
                Iniciar Tentativa
              </button>
            </div>
            <div className=' border-2 border-gray-400 bg-white  w-80 h-[100%] p-5 rounded-md'>
              <p className='text-gray-600'>Participantes:</p>
              <div className='my-4'>
                {
                  participantes.map((participante, index) => (
                    <Participante key={index} nome={participante} ativo={true} />
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
