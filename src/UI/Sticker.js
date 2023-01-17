import test from '../assets/images/glow.png'
import star from '../assets/images/star.png'
import { useState,useEffect, forwardRef,useImperativeHandle,memo, useRef } from "react";
import anime from 'animejs/lib/anime.es.js'
import Logger from '../Debug/Logger';
const stickers = [test,star]
const mousePosition = {x :0,y:0}


export default memo(forwardRef(function Sticker(props,ref){
    Logger.LogSticker('sticker component rerendered')


    //Mouse Position
    useEffect(() => {
      // 👇️ get global mouse coordinates
      const handleWindowMouseMove = event => {
          mousePosition.x = event.clientX
          mousePosition.y = event.clientY
      };
      window.addEventListener('mousemove', handleWindowMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleWindowMouseMove);
      };
    }, []);
  


    const animations = [...Array(stickers.length)]
    const stickerRefs = [...Array(stickers.length)]
    const [animation0, setanimation0] = useState();
    const [animation1, setanimation1] = useState();
    for(let i = 0; i<stickerRefs.length;i++){
        stickerRefs[i] = useRef()
    }
    animations[0] = animation0
    animations[1] = animation1
    useImperativeHandle(ref, () => {
        return {
          playAnimation(index) {
            Logger.LogSticker(`playing sticker animation ${index}`)
            if(animations[index].currentTime <1){
              stickerRefs[index].current.style.top = `${mousePosition.y}px`
              stickerRefs[index].current.style.left = `${mousePosition.x}px`
            }
            animations[index].play()
            animations[index].finished.then(()=>{animations[index].seek(0)})
          }
        };
      }, []);
    useEffect(()=>{
        setanimation0( anime({
            targets: '#sticker0',
            translateX: ['-50%','-50%'],
            translateY: ['-50%','-50%'],
            scale: [0,1],
            duration:700, 
            autoplay: false,
            easing: 'easeInOutSine'
          }));
          setanimation1( anime({
            targets: '#sticker1',
            translateX: ['-50%','-50%'],
            translateY: ['-50%','-50%'],
            scale: [0,1],
            duration:1500, 
            autoplay: false,
            easing: 'easeInOutSine'
          }));
    },[])

    return<div >
        {stickers.map((value,index)=>{
            return <img id = {`sticker${index}`} className = 'sticker' key = {index}  ref = {stickerRefs[index]} src={value} />
        })}
    </div > 
}))