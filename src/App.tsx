import { useCallback, useEffect, useState } from 'react';
import BonecoDaForca from './components/BonecoDaForca';
import ModalInput from './components/ModalInput';
import ButtonLineForca from './components/ButtonLineForca';
import Participante from './components/Participante';
import useEnterRoomUser from './hooks/enter_room_user';
import palavrasMock from './mock/mock-palavra-hards';

interface SorteioProps {
  palavra: string
  tema: string
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [participantes, setParticipantes] = useState<string[]>([])
  const [jogador, setJogador] = useState("")

  const [derrota, setDerrota] = useState(0)
  const [letraDoUsuario, setLetraDoUsuario] = useState<string[]>([])
  const [palavra, setPalavra] = useState(palavrasMock[0])
  const [venceu, setVenceu] = useState(false)

  const { socket } = useEnterRoomUser(jogador)

  useEffect(() => {
   
    socket?.emit("letras")
    socket?.emit("letraErrada")

  }, [letraDoUsuario])

  const handleConfirm = (inputValue: string): void => {
    if (socket && jogador) {
      socket.emit("letraDoUsuario", inputValue.toUpperCase())
      socket.emit("letras")
      socket.emit("letraErrada")
      socket.emit("ganhou")
    }
    setLetraDoUsuario([...letraDoUsuario, inputValue.toUpperCase()])
  }

  const handleIniciarJogo = useCallback(() => {
    if (socket && jogador) {
      socket.emit("join", jogador)
    }

    if (socket && jogador) {
      socket.emit("palavra")
      socket.emit("letras")
      socket.emit("letraErrada")
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

      socket.on('letraDoUsuario', (inputValue: string) => { setLetraDoUsuario([...letraDoUsuario, inputValue]) })
      
      socket.on('letras', (letras: string[]) => { 
        setLetraDoUsuario([...letraDoUsuario, ... letras]) 
      })
      socket.on('letraErrada', (letra: string) => { letra && setDerrota(prev => prev + 1)})
      socket.on('ganhou', (isGanhou: boolean) => { isGanhou && setVenceu(isGanhou)})
    }

    return () => {
      socket?.off("ganhou")
      socket?.off("letraErrada")
      socket?.off("letras")
      socket?.off("letraDoUsuario")
      socket?.off("error")
      socket?.off("palavra")
      socket?.off("leave")
      socket?.off("player names");
      socket?.off("join");
    };
  }, [socket]);

  return (
    <>
      {palavra.palavra !== 'inicio' && <BonecoDaForca derrota={derrota} />}
      <div className="flex flex-col items-center justify-between w-[100vw] h-[100vh] overflow-hidden bg-slate-100">
        <div className='flex flex-col items-center justify-center w-full  py-4 md:py-10'>
          <p className='text-center font-bold text-indigo-950 text-3xl md:py-2 border-b-2 border-red-500'>
            Forcando
          </p>
          <p className='w-full text-center text-slate-600 md:text-3xl py-4'>
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
          jogador={jogador}
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
                <img src="src/assets/bobesponjapensando.gif" alt="Descrição do GIF" width="300" />
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
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-5xl font-bold text-red-500">
                  Você perdeu
                </p>
              )}
              {venceu && (
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-5xl font-bold text-green-500">
                  Ganhou
                </p>
              )}
            </div>
          </div>
        </div>
        {palavra.palavra !== 'inicio' && (
          <div className='w-full flex flex-col md:flex-row items-center  justify-end  h-[80%] md:pr-60 pb-10'>
            <div className='flex flex-col items-center justify-start w-full md:w-[50%] gap-8'>
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
