import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';


// criação do socket
export default function useEnterRoomUser(jogador: string) {
    // const url_ws =  'http://localhost:3000/game';
    const url_ws =  'https://forcando-backend.onrender.com/game';
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (jogador) {
            const socketIns = io(url_ws, {
                query: {
                    name: jogador,
                }
            });
            setSocket(socketIns);

            return () => {
                socketIns.disconnect(); 
            };
        }
    }, [jogador]);

    return {
        socket,
    };
};  
