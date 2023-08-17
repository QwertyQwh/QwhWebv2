
import { useState,useEffect, forwardRef,useImperativeHandle,memo, useRef } from "react";
import anime from "animejs";

export default memo(forwardRef(function Sticker(props,ref){
    const dot = useRef()
    useImperativeHandle(ref, () => {
        return {
          playSwell({x,y},color,callback) {
              dot.current.style.top = y
              dot.current.style.left = x
              dot.current.style.backgroundColor = color
              anime.timeline().add({
                targets: dot.current,
                scale: [0,150],
                duration:800,
                easing: 'easeInQuad',
                complete: ()=>{callback()},
              }).add({
                targets: dot.current,
                scale: 0,
                duration:30,
                easing: 'easeInQuad',
              })
          }
        };
      }, []);
    return <span className='homeDot' ref = {dot} />
}))