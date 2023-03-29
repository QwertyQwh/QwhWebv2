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
export default function PortraitContainer({sectionCount,start, width,aspect_ratio,configs,padding,handleFocusIn}){
    padding = padding +1;// A minimum padding of 1 is required. Actual padding is added on top of that. 
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
    console.log(sectionCount)
    // Since we are using pooling, we don't want our container to resize according to the window. The user always needs to refresh.
    const { innerWidth: window_width, innerHeight:window_height } = window;
    const cur_top_blocks = Array(sectionCount).fill(0);
    const cur_bottom_blocks = Array(sectionCount).fill(0);
    const handleScrolls = Array(sectionCount).fill(0);
    const totalHeights = Array(sectionCount).fill(0);
    let portrait_min_height = 100000;
    const containerRef = useRef();
    const containers = Array(sectionCount).fill(0);
    const viewers = Array(sectionCount).fill(0);
    const trackRefs = Array(sectionCount).fill(0);
    const viewRefs = Array(sectionCount).fill(0);

    for(let j = 0; j<sectionCount; j++){
        const config_vals = Object.values(configs[j])
        const portrait_width = Math.ceil(window_width*width[j]);
        const portrait_height = Math.ceil(portrait_width/aspect_ratio[j]);
            totalHeights[j] = portrait_height*config_vals.length
        if(portrait_min_height>portrait_height){
            portrait_min_height = portrait_height
        }
        cur_top_blocks[j] = useRef(0);
        // Calculate the number of boxes based on window size.
        const count_containers = Math.ceil(window_height/portrait_height)+2*padding
        cur_bottom_blocks[j] = useRef(Math.ceil(window_height/portrait_height)-1);
        trackRefs[j] = useRef(Array(count_containers).fill(0))
        const trackRef = trackRefs[j].current
        viewRefs[j] =  useRef(Array(count_containers).fill(0))
        const viewRef = viewRefs[j].current
        const display_indices = Array(count_containers).fill(0)
        for (let i = 0;i<trackRef.length;i++) {
            trackRef[i] = useRef()
            display_indices[i] = useRef(i-padding);
            viewRef[i] = useRef()
        }
        handleScrolls[j] = val  => {
            console.log(viewRefs[j])
            const top = Math.floor(val/portrait_height)
            const bottom = Math.floor((val+window_height)/portrait_height)
            if(Math.abs(top-cur_top_blocks[j].current)>=2 || Math.abs(bottom-cur_bottom_blocks[j].current)>=2){
                Logger.Warn("We are skipping blocks ")  
            }
            if(top>cur_top_blocks[j].current){
                //We are scrolling down and the previous block disappeared 
                // console.log("down and disappear")x
                cur_top_blocks[j].current = top
            }else if(top<cur_top_blocks[j].current){
                // We are scrolling up and a new top block just appeared
                // console.log("up and new")
                cur_top_blocks[j].current = top
            }
            if(bottom>cur_bottom_blocks[j].current){
                //We are scrolling down and a new bottom block just appeared
                // console.log("down and appear")
                cur_bottom_blocks[j].current = bottom;
                const top_block_display_index =  MathUtils.proper_modulo(cur_top_blocks[j].current-padding+padding,count_containers)//Note how this is calculated
                // Logger.Warn(`Moving block ${top_block_display_index} down`)
                display_indices[top_block_display_index].current+=count_containers
                var tmp = parseInt(trackRef[top_block_display_index].current.style.top , 10);
                trackRefs[j][top_block_display_index].current.style.top = `${tmp+count_containers*portrait_height}px`
                const display = display_indices[top_block_display_index].current
                viewRefs[j][top_block_display_index].current.setConfig(display>=0 && display<config_vals.length? config_vals[display]:null)
            }else if(bottom<cur_bottom_blocks[j].current){
                // We are scrolling up and a new bottom block just disappeared
                // console.log("up and disappear")
                cur_bottom_blocks[j].current = bottom;
                const bottom_block_display_index =  MathUtils.proper_modulo(bottom+2*padding+1,count_containers)//Note how this is calculated
                // Logger.Warn(`Moving block ${bottom_block_display_index} up and current bottom is ${bottom}`)
                // Set block Content
                display_indices[bottom_block_display_index].current-=count_containers
                var tmp = parseInt(trackRef[bottom_block_display_index].current.style.top , 10);
                // Move block down
                trackRefs[j][bottom_block_display_index].current.style.top = `${tmp-count_containers*portrait_height}px`
                const display = display_indices[bottom_block_display_index].current
                viewRefs[j][bottom_block_display_index].current.setConfig(display>=0 && display<config_vals.length? config_vals[display]:null)
            }

    }
    containers[j] = 
        trackRef.map((obj,index)=>{
            return <div ref = {trackRef[index]} className="portrait"id = {`portrait-${index}`}
            style = {{top:portrait_height*display_indices[index].current, width:portrait_width,height:portrait_height+3,left:0}} 
            key = {index}
            onClick = {()=>{ handleFocusIn( {...trackRef[index].current.style, left: `${parseInt(trackRef[index].current.style.left,10)+start*window_width}px`}) }} />
    })

    viewers[j] =  trackRef.map((obj,index)=>{
            const display = display_indices[index].current
            return <View  track = {trackRef[index]} key = {index} >
            <Portrait ref = {viewRef[index]} config = {display>=0 && display<config_vals.length? config_vals[display]:null}/>
            </View>
    })

    console.log(viewRef[0])
    };
    useEffectOnce(()=>{

        console.log(trackRefs )
    })
    // useEventListener('scroll',handleScroll,containerRef)
    return <>
    <SmoothScroll sectionCount = {sectionCount} ref = {containerRef} left = {start.map((obj,index)=>obj*window_width)} portraitHeight = {portrait_min_height} handleScroll = {handleScrolls} totalHeights = {totalHeights} sections = {containers} >
        {/* {containers} */}
        </SmoothScroll >
        <Canvas  frameloop= {stopRendering||blur?"never":"always"}  dpr = {[1,2]} gl = {{
            toneMapping: tone == 'ACES'? THREE.ACESFilmicToneMapping: tone == 'Cineon'? THREE.CineonToneMapping: tone == 'Reinhard'?THREE.ReinhardToneMapping: tone == 'Linear'? THREE.LinearToneMapping: THREE.NoToneMapping,
            outputEncoding: THREE.sRGBEncoding,
            antialias:true}} className ='canvas' eventSource={containerRef} >
        {/* {viewers[0]} */}
        <Perf position = 'bottom-right' />
        </Canvas>

    </>
}