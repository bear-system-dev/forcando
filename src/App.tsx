import { useState } from 'react';
import BonecoDaForca from './components/BonecoDaForca';
import ModalInput from './components/ModalInput';
import ButtonLineForca from './components/ButtonLineForca';
import palavrasMock from './mock/mock-palavra-hards';
import { participantesMock } from './mock/mock-participante';
import Participante from './components/Participante';

interface SorteioProps {
  palavra: string
  tema: string
}

function App() {
  const [derrota, setDerrota] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [letraDoUsuario, setLetraDoUsuario] = useState<string[]>([])
  const [palavra, setPalavra] = useState<SorteioProps>(palavrasMock[0])
  const [ acertou, setAcertou ] = useState(true)

  console.log(acertou)
  console.log(letraDoUsuario.join(""))
  let indiceDaPalavra = 0

  const handleIniciarJogo = () => {
    indiceDaPalavra = Math.floor(Math.random() * palavrasMock.length)
    setLetraDoUsuario([]);
    setPalavra(palavrasMock[indiceDaPalavra])
  }


  const handleConfirm = (inputValue: string): void => {
    setLetraDoUsuario([...letraDoUsuario, inputValue.toUpperCase()]);
  };


  return (
  <>

        {
            palavra.palavra !== 'inicio' && (  
              <BonecoDaForca derrota={derrota} />
            )
        }
        <div className="flex flex-col items-center justify-between w-[100vw] h-[100vh] bg-slate-100">
          <div className='flex flex-col items-center justify-center w-full py-10'>
            <p className='text-center font-bold text-indigo-950 text-3xl py-2 border-b-2 border-red-500'>
              Forcando
            </p>
            <p className='w-full text-center text-slate-600 text-3xl py-4'>
              {
                palavra?.tema
              }
            </p>
            {
              palavra.palavra === 'inicio' && (  
              <button
                onClick={handleIniciarJogo}
                className='bg-indigo-700 text-2xl text-white px-14 py-2 rounded-md'
              >
                Iniciar
              </button>
            )
            }
          </div>
          <div>
                <p>{letraDoUsuario}</p>
          </div>  
          <ModalInput
            palavra={letraDoUsuario}
            setDerrota={setDerrota}
            derrota={derrota}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirm}
          />
    
          <div className='border-b-2 flex flex-col justify-end border-gray-400 w-[80%] h-[100%] py-20'>
            <div className="flex flex-col items-center">
                <div className="mt-8 flex space-x-2 ">
                  {
                    palavra.palavra === 'inicio' ?
                    (
                    <img src="src/assets/bob_esponja_pensando.gif" alt="Descrição do GIF" width="300"/>
                    ):
                      palavra?.palavra.split("").map((letra) => <ButtonLineForca setAcertou={setAcertou} letraDoUsuario={letraDoUsuario} letra={letra.toUpperCase()}/>) 
                  }
                  {
                    derrota === 6 && (
                      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-red-500">
                        Você perdeu
                      </p>
                    )
                  }
                    {
                    letraDoUsuario.includes(palavra.palavra) && (
                      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-gree-500">
                        Ganhou
                      </p>
                    )
                  }
                </div>
            </div>
          </div>
          <div className='w-full flex flex-row items-center justify-end  h-[80%] pr-60 pb-10'>
              <div className='flex flex-col items-center justify-start w-[50%] gap-8'>
            
              <p className='text-xl text-slate-600 '>
                Agora é a sua vez! digite uma letra: 
              </p>
              <button 
                disabled={derrota===6}
                onClick={() => setIsModalOpen(true)}
                className={`bg-indigo-700 text-white px-10 py-3 rounded-md ${derrota===6 && 'bg-gray-600'} `}
                > 
                Inciar Tentativa
              </button>
            </div>
            <div className=' border-2 border-gray-400 bg-white  w-80 h-[100%] p-5 rounded-md'>
              <p className='text-gray-600'>Participantes:</p>
              <div className='my-4'>
                {
                  participantesMock.map((participante)=> <Participante ativo={participante.ativo} nome={participante.nome}/>)
                }
              </div>
            </div>
          </div>
        </div>
  </>
  );
}

export default App;
