// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import { useEffect, useRef } from "react";


export function useInterval(callback, delay){
    const savedCallback = useRef();
    

    useEffect(() =>{
        savedCallback.current = callback
    }, [callback]);


    //Set up the interval
    useEffect(() => {

        function tick(){
            savedCallback.current();
        }

        if(delay !== null){
            const id = setInterval(tick,delay);
            return () =>{
                clearInterval(id);
            }
        }

    }, [callback, delay]);

}