import Lenis from 'lenis'
import { useEffect } from 'react'

const LenisScroll = () => {
  useEffect(()=>{
    const lenis = new Lenis({
        duration:1.2,
        smoothWheel:1.2,
        syncTouch:false,
        anchors:{
            offset: -120
        },
    });

    const ref =(time)=>{
        lenis.raf(time);
        requestAnimationFrame(ref);
    }

    requestAnimationFrame(ref)
    return () =>{
        lenis.destroy()
    }
  },[])

  return null
}

export default LenisScroll