import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NEW_MESSAGE } from "../events";


const useErrors = (errors = []) => { 
    
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) fallback();
                else toast.error(error?.data?.message || "something went wrong!");
            }
        });
    }, [errors]);
};



const useAsyncMutation = (mutationHook) => { 


    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [mutate] = mutationHook();

    const executeMutation = async (toastMessage, ...args) => { 

        setIsLoading(true);
        const toastId = toast.loading(toastMessage || "updating data...");

        try {
            const res = await mutate(...args);
            if (res.data) {
                toast.success(
                  String(res.data.message || "Updated data successfully!!"),
                  {
                    id: toastId,
                  },
                );
            }
            else {
                toast.error(
                  typeof res?.error?.data?.message === "string"
                    ? res.error.data.message
                    : "Something went wrong!",
                  {
                    id: toastId,
                  },
                );
            }
        } catch (error) {

            console.log(error);
            toast.error("something went wrong!!", { id: toastId });
            
        } finally {
            setIsLoading(false);
        }

    };

    return [ executeMutation, isLoading, data ];

};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    if (!socket) return;

    const entries = Object.entries(handlers);

    entries.forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      entries.forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket]);
};

export { useErrors, useAsyncMutation, useSocketEvents };