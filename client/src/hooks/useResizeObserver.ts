import { useRef, useState, useEffect } from "react";

export const useResizeObserver = () => {
   
   const ref = useRef(null);
   const [dimensions, setDimensions] = useState({widht:0, height: 0});
   
   useEffect(()=>{
      if(!ref.current) return;
      
      const observer = new ResizeObserver(entries => {
         const entry = entries[0];
         if(entry) {
            const {width, height} = entry.contentRect;
            setDimensions({width, height});
         }
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
   },[]);
   return [ref, dimensions];
}