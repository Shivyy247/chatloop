import { Children, createContext } from 'react'
import io from 'socket.io-client'


const socket = io("http://localhost:3000", {
    withCredentials: true
})


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket} >
            {children}
        </SocketContext.Provider>
    )
}

