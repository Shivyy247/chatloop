import { createContext, useContext, useEffect, useMemo } from "react";
import io from "socket.io-client";
import { server } from "../constants/config";
import { useSelector } from "react-redux";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
        autoConnect: false,
      }),
    [],
  );

  useEffect(() => {
    if (user && !socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [user, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };

// import { Children, createContext, useContext, useMemo } from 'react'
// import io from 'socket.io-client'
// import { server } from '../constants/config';

// const SocketContext = createContext();

// const getSocket = () => useContext(SocketContext);

// const SocketProvider = ({ children }) => {

//     const socket = useMemo(
//       () =>
//         io(server, {
//           withCredentials: true,
//           autoConnect: false,
//         }),
//       [],
//     );

//     return (
//         <SocketContext.Provider value={socket} >
//             {children}
//         </SocketContext.Provider>
//     )
// }

// export { SocketProvider, getSocket };
