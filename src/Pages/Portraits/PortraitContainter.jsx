import { useRef,forwardRef,useImperativeHandle,useState,useEffect,useMemo } from "react";
import { useWindowDimensions } from "../../Utils/WindowUtils";
import { Canvas } from "@react-three/fiber";
import Portrait from "./Portrait";
import { useEventListener } from "usehooks-ts";
import { useControls } from "leva";
import { Vector3 } from 'three'
import anime from "animejs";
import * as THREE from 'three'
import { PerspectiveCamera, View } from "@react-three/drei";
import TestObject from "../../Scene/TestObject";
import { useFrame } from "@react-three/fiber";

let animation_cache = []
const stopRendering = false
function playAnimAppear(index){
    while(animation_cache.length<index+1){
        const anim =  anime.timeline({
            targets:`#portrait-${index}`,
            autoplay: false,
            loop:false,
            width: ['10pt','10pt'],
            height : ['10pt','10pt'],
            opacity: [0,0],
            duration: 500, 
        })
        animation_cache.append(anim)
    }
    animation_cache[index].play()
}
const padding = 4;


//This function acts as a list container for a column of portraits
export default function PortraitContainer({start, width,aspect_ratio,configs}){
    const config_vals = Object.values(configs)
    const {follow,targetPos} = useControls('camera',{
        follow:false,
        targetPos: [-5,5,0]
      })
      const  {tone,background,blur} = useControls('post',{
        tone: {
          options:['ACES','Cineon','Reinhard','Linear','None']
        },
        background: '#fdfcf5',
        blur: false,
      })
    //1.Calculate the number of boxes based on window size. (PI: Window resizing would cause us to recalculate the number of boxes needed so use padding and usememo here)
    //3.When a box goes out of view range, we disable it.(Since it's outside of the screen it's not going to do anything)
    // When we are running out of boxes, we get an idle box and play the animation and set the data
    // There's only going to be one invisible box. 
    //Since we are using pooling, we don't want our container to resize according to the window. The user always needs to refresh.
    const { innerWidth: window_width, innerHeight:window_height } = window;
    const portrait_width = window_width*width;
    const portrait_height = portrait_width/aspect_ratio;
    const cur_top_portrait = useRef(0);
    const count_containers = useMemo(()=>Math.min(Object.keys(configs).length,Math.ceil(window_height/portrait_height)), [window_height,window_width,configs])
    const cur_bottom_portrait = useRef(count_containers);
    const containerRef = useRef();
    const handleScroll = e  => {
        const top = Math.floor(containerRef.current.scrollTop/portrait_height)
        // console.log(window_height+containerRef.current.scrollTop-portrait_height)
        // console.log(trackRefs[0].current.getBoundingClientRect().top)
        if(top>cur_top_portrait.current){
            //We are scrolling down and the previous block disappeared 
            console.log("down and disappear")
            cur_top_portrait.current = top
        }else if(top<cur_top_portrait.current){
            // We are scrolling up and a new top block just appeared
            console.log("up and new")
            cur_top_portrait.current = top
        }
        const bottom = Math.floor(containerRef.current.scrollTop+window_height/portrait_height)
        if(bottom>cur_bottom_portrait.current){
            //We are scrolling down and a new bottom block just appeared
            
        }else if(top<cur_bottom_portrait.current){
            // We are scrolling down and a new top block just appeared
            
        }
    };
    const trackRefs = Array(count_containers).fill(0)
    for (let i = 0;i<trackRefs.length;i++) {
        trackRefs[i] = useRef()
    }
    const containers = useMemo(() => {
        console.log('containers changed')
        return trackRefs.map((obj,index)=>{
            return <div ref = {trackRefs[index]} className="portrait"id = {`portrait-${index}`}style = {{left:start*window_width,top:portrait_height*index, width:portrait_width,height:portrait_height+padding}} key = {index}>
            </div>
    })
}, [count_containers])

    const viewers =  trackRefs.map((obj,index)=>{
            return <View  track = {trackRefs[index]} key = {index} >
            <Portrait config = {config_vals[index]}/>
            </View>
    })
    useEventListener('scroll',handleScroll,containerRef)
    return <>
    <div ref = {containerRef} className = "portraitContainer">
        <div className="portraitBg" />
        {containers}

        </div>
                
        <Canvas  frameloop= {stopRendering||blur?"never":"always"}  dpr = {[1,2]} gl = {{
            toneMapping: tone == 'ACES'? THREE.ACESFilmicToneMapping: tone == 'Cineon'? THREE.CineonToneMapping: tone == 'Reinhard'?THREE.ReinhardToneMapping: tone == 'Linear'? THREE.LinearToneMapping: THREE.NoToneMapping,
            outputEncoding: THREE.sRGBEncoding,
            antialias:true}} className ='canvas' eventSource={containerRef} >
        {viewers}
        </Canvas>
    </>
}