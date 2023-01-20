import test from '../assets/images/glow.png'
import star from '../assets/images/star.png'
import { useState,useEffect, forwardRef,useImperativeHandle,memo, useRef } from "react";
import { useEventListener, useInterval } from 'usehooks-ts';
import anime from 'animejs/lib/anime.es.js'
import Logger from '../Debug/Logger';

const stickers = [test,star]
const mousePosition = {x :0,y:0}
const animations = [...Array(stickers.length)]


export default memo(forwardRef(function Sticker(props,ref){
    Logger.WarnSticker('sticker component rerendered')

  
    const handleWindowMouseMove = event => {
      mousePosition.x = event.clientX
      mousePosition.y = event.clientY
    };
    useEventListener('mousemove', handleWindowMouseMove)
    
    const stickerRefs = [...Array(stickers.length)]
    for(let i = 0; i<stickerRefs.length;i++){
        stickerRefs[i] = useRef()
    }
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
        animations[0] = anime({
            targets: '#sticker0',
            translateX: ['-50%','-50%'],
            translateY: ['-50%','-50%'],
            scale: [0,1],
            duration:700, 
            autoplay: false,
            easing: 'easeInOutSine'
          });
          animations[1] =  anime({
            targets: '#sticker1',
            translateX: ['-50%','-50%'],
            translateY: ['-50%','-50%'],
            scale: [0,1],
            duration:1500, 
            autoplay: false,
            easing: 'easeInOutSine'
          });
    },[])

    return<div >
        {stickers.map((value,index)=>{
            return <img id = {`sticker${index}`} className = 'sticker' key = {index}  ref = {stickerRefs[index]} src={value} />
        })}
    </div > 
}))