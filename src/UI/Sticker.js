import test from '../assets/images/glow.png'
import star from '../assets/images/star.png'
import { useState,useEffect, forwardRef,useImperativeHandle,memo, useRef } from "react";
import anime from 'animejs/lib/anime.es.js'
const stickers = [test,star]


export default memo(forwardRef(function Sticker(props,ref){
    // const [isPlaying, setisPlaying] = useState(false);
    console.log('sticker component rerendered')
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
          playAnimation(index,position) {
            console.log(`playing sticker animation ${index}`)
            console.log(stickerRefs[index].current.style.top)
            stickerRefs[index].current.style.top = `${position.y*100}%`
            stickerRefs[index].current.style.left = `${position.x*100}%`
            animations[index].play()
            animations[index].finished.then(()=>{animations[index].seek(0)})
          }
        };
      }, []);
    useEffect(()=>{
        console.log(stickerRefs)
        setanimation0( anime({
            targets: '#sticker0',
            translateX: ['-50%','-50%'],
            translateY: ['-50%','-50%'],
            scale: [0,1],
            duration:1500, 
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