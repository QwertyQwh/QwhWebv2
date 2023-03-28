import { useRef,forwardRef,useImperativeHandle,useState,useEffect,useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import Portrait from "./Portrait";
import { useEffectOnce, useEventListener } from "usehooks-ts";
import { useControls } from "leva";
import anime from "animejs";
import * as THREE from 'three'
import { View } from "@react-three/drei";
import { Perf } from "r3f-perf";
import MathUtils from "../../Utils/MathUtils";
import Logger from "../../Debug/Logger";

import SmoothScroll from "../../UI/SmoothScroll";

let animation_cache = []
const stopRendering = false
function playAnimAppear(index){
    while(animation_cache.length<index+1){
        const anim =  anime.timeline({
            targets:`#portrait-${animation_cache.length}`,
            autoplay: false,
            loop:false,
            opacity: [0,0],
            duration: 500, 
        })
        animation_cache.append(anim)
    }
    animation_cache[index].play()
}





//This function acts as a list container for a column of portraits
export default function PortraitContainer({start, width,aspect_ratio,configs,padding}){
    padding = padding +1;// A minimum padding of 1 is required. Actual padding is added on top of that. 
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
    const portrait_width = Math.ceil(window_width*width);
    const portrait_height = Math.ceil(portrait_width/aspect_ratio);
    const cur_top_block = useRef(0);
    const count_containers = useMemo(()=>Math.ceil(window_height/portrait_height)+2*padding, [configs])
    const cur_bottom_block = useRef(Math.ceil(window_height/portrait_height)-1);
    const containerRef = useRef();
    const trackRefs = Array(count_containers).fill(0)
    const viewRefs =  Array(count_containers).fill(0)
    const display_indices = Array(count_containers).fill(0)
    for (let i = 0;i<trackRefs.length;i++) {
        trackRefs[i] = useRef()
        display_indices[i] = useRef(i-padding);
        viewRefs[i] = useRef()
    }



    const handleScroll = val  => {
        const top = Math.floor(val/portrait_height)
        const bottom = Math.floor((val+window_height)/portrait_height)
        if(Math.abs(top-cur_top_block.current)>=2 || Math.abs(bottom-cur_bottom_block.current)>=2){
            Logger.Warn("We are skipping blocks ")  
        }
        if(top>cur_top_block.current){
            //We are scrolling down and the previous block disappeared 
            //1.
            // console.log("down and disappear")x
            cur_top_block.current = top
        }else if(top<cur_top_block.current){
            // We are scrolling up and a new top block just appeared
            // console.log("up and new")
            cur_top_block.current = top
            // const bottom_block_display_index =  MathUtils.proper_modulo(bottom+2*padding,count_containers)//Note how this is calculated
            // Logger.Warn(`Moving block ${bottom_block_display_index} up and current bottom is ${bottom}`)
            // // Set block Content
            // display_indices[bottom_block_display_index].current-=count_containers
            // var tmp = parseInt(trackRefs[bottom_block_display_index].current.style.top , 10);
            // // Move block down
            // trackRefs[bottom_block_display_index].current.style.top = `${tmp-count_containers*portrait_height}px`
            // const display = display_indices[bottom_block_display_index].current
            // viewRefs[bottom_block_display_index].current.setConfig(display>=0 && display<config_vals.length? config_vals[display]:null)
        }
        if(bottom>cur_bottom_block.current){
            //We are scrolling down and a new bottom block just appeared
            //1. Move the topmost block down to the very bottom(include padding)
            //2. Set its display index
            // console.log("down and appear")
            cur_bottom_block.current = bottom;
            const top_block_display_index =  MathUtils.proper_modulo(cur_top_block.current-padding+padding,count_containers)//Note how this is calculated
            // Logger.Warn(`Moving block ${top_block_display_index} down`)
            display_indices[top_block_display_index].current+=count_containers
            var tmp = parseInt(trackRefs[top_block_display_index].current.style.top , 10);
            trackRefs[top_block_display_index].current.style.top = `${tmp+count_containers*portrait_height}px`
            const display = display_indices[top_block_display_index].current
            viewRefs[top_block_display_index].current.setConfig(display>=0 && display<config_vals.length? config_vals[display]:null)
        }else if(bottom<cur_bottom_block.current){
            // We are scrolling up and a new bottom block just disappeared
            //1.
            // console.log("up and disappear")
            cur_bottom_block.current = bottom;
            const bottom_block_display_index =  MathUtils.proper_modulo(bottom+2*padding+1,count_containers)//Note how this is calculated
            // Logger.Warn(`Moving block ${bottom_block_display_index} up and current bottom is ${bottom}`)
            // Set block Content
            display_indices[bottom_block_display_index].current-=count_containers
            var tmp = parseInt(trackRefs[bottom_block_display_index].current.style.top , 10);
            // Move block down
            trackRefs[bottom_block_display_index].current.style.top = `${tmp-count_containers*portrait_height}px`
            const display = display_indices[bottom_block_display_index].current
            viewRefs[bottom_block_display_index].current.setConfig(display>=0 && display<config_vals.length? config_vals[display]:null)
        }
    };

    const containers = useMemo(() => {
        console.log('containers changed')
        return trackRefs.map((obj,index)=>{
            return <div ref = {trackRefs[index]} className="portrait"id = {`portrait-${index}`}style = {{top:portrait_height*display_indices[index].current, width:portrait_width,height:portrait_height+3}} key = {index}>
            
            </div>
    })
}, [count_containers])

    const viewers =  trackRefs.map((obj,index)=>{
            const display = display_indices[index].current
            return <View  track = {trackRefs[index]} key = {index} >
            <Portrait ref = {viewRefs[index]} config = {display>=0 && display<config_vals.length? config_vals[display]:null}/>
            </View>
    })
    // useEventListener('scroll',handleScroll,containerRef)
    return <>
    <SmoothScroll ref = {containerRef} left = {start*window_width} portraitHeight = {portrait_height} portraitWidth = {portrait_width} handleScroll = {handleScroll} totalHeight = {config_vals.length*portrait_height}>
        {containers}
        </SmoothScroll >
        <Canvas  frameloop= {stopRendering||blur?"never":"always"}  dpr = {[1,2]} gl = {{
            toneMapping: tone == 'ACES'? THREE.ACESFilmicToneMapping: tone == 'Cineon'? THREE.CineonToneMapping: tone == 'Reinhard'?THREE.ReinhardToneMapping: tone == 'Linear'? THREE.LinearToneMapping: THREE.NoToneMapping,
            outputEncoding: THREE.sRGBEncoding,
            antialias:true}} className ='canvas' eventSource={containerRef} >
        {viewers}
        <Perf position = 'bottom-right' />
        </Canvas>

    </>
}