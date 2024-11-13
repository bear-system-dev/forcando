import { useEffect, useState } from 'react';
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
  const [derrota, setDerrota] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [letraDoUsuario, setLetraDoUsuario] = useState<string[]>([])
  const [palavra, setPalavra] = useState<SorteioProps>(palavrasMock[0])
  let indiceDaPalavra = 0
  const handleIniciarJogo = () => {
    indiceDaPalavra = Math.floor(Math.random() * palavrasMock.length)
    setLetraDoUsuario([]);
    setPalavra(palavrasMock[indiceDaPalavra])
  }

  const handleConfirm = (inputValue: string): void => {
    setLetraDoUsuario([...letraDoUsuario, inputValue]);
  };

  return (
  <>
    <BonecoDaForca derrota={derrota} />
    <div className="flex flex-col items-center justify-between w-[100vw] h-[100vh] bg-slate-100">
      <div className='flex flex-row items-center justify-end w-full py-10'>
        <p className='w-full pl-28 text-center text-xl'>
          {
            palavra?.tema
          }
        </p>
        <button
          onClick={handleIniciarJogo}
          className='bg-slate-700 text-white px-10 py-1 rounded-md '
        >
          Iniciar
        </button>
      </div>
      <ModalInput
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
      <div className='py-14 border-b-2 border-gray-400 w-[80%] mx-10'>
        <div className="flex flex-col items-center">
            <div className="mt-8 flex space-x-2 ">
              {
                palavra?.palavra.split("").map((letra) => <ButtonLineForca letraDoUsuario={letraDoUsuario} letra={letra}/>)
              }
              
            </div>
        </div>
      </div>
      <div className='w-full flex flex-row items-center justify-end  h-[40%] pr-60 pb-10'>
        <div className='flex flex-col items-center justify-center w-[50%]'>
          <p className='text-xl text-slate-600 '>
            Agora é a sua vez! digite uma letra:
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='bg-indigo-700 text-white px-10 py-3 rounded-md'
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
