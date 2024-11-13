import { useState } from 'react';
import BonecoDaForca from './components/BonecoDaForca';
import ButtonLineForca from './components/ButtonLineForca';

function App() {
  const [derrota, setDerrota] = useState(5);
  const [palavra, setPalavra] = useState("paralelepipedo")
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-100">
      <div className="flex flex-col items-center">
        <BonecoDaForca derrota={derrota} />
        
        <div className="mt-8 flex space-x-2">
            <ButtonLineForca/>
            <ButtonLineForca/>
            <ButtonLineForca/>
            <ButtonLineForca/>
        </div>
      </div>
    </div>
  );
}

export default App;
