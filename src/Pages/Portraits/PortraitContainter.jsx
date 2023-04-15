import { useRef,forwardRef,useImperativeHandle,useEffect,useMemo,createRef } from "react";
import { Canvas } from "@react-three/fiber";
import Portrait from "./Portrait";
import { useEffectOnce, useEventListener } from "usehooks-ts";
import { useControls } from "leva";
import anime from "animejs";
import * as THREE from 'three'
import { OrbitControls, View } from "@react-three/drei";
import { Perf } from "r3f-perf";
import MathUtils from "../../Utils/MathUtils";
import Logger from "../../Debug/Logger";
import SmoothScroll from "../../UI/SmoothScroll";
let animation_cache = []
const stopRendering = false
// function playAnimAppear(index){
//     while(animation_cache.length<index+1){
//         const anim =  anime.timeline({
//             targets:`#portrait-${animation_cache.length}`,
//             autoplay: false,
//             loop:false,
//             opacity: [0,1],
//             duration: 1000, 
//         })
//         animation_cache.append(anim)
//     }
//     animation_cache[index].play()
// }

//This function acts as a list container for a column of portraits
export default function PortraitContainer({sectionCount,start, width,aspect_ratio,configs,padding,handleFocusIn}){
    Logger.Warn("PortraitContainer rerendering")
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
    const { innerWidth: window_width, innerHeight:window_height } = window;
    let totalCount = 0
    for(let j = 0; j<sectionCount; j++){
        const portrait_width = Math.ceil(window_width*width[j]);
        const portrait_height = Math.ceil(portrait_width/aspect_ratio[j]);
        // Calculate the number of boxes based on window size.
        totalCount += Math.ceil(window_height/portrait_height)+2*padding
    }
    // Since we are using pooling, we don't want our container to resize according to the window. The user always needs to refresh.
    const cur_top_blocks = Array(sectionCount).fill(0).map(()=>useRef(0));
    const cur_bottom_blocks = Array(sectionCount).fill(0).map(()=>useRef(0));
    const handleScrolls = Array(sectionCount).fill(0);
    const totalHeights = Array(sectionCount).fill(0);
    const bottom_indices = Array(sectionCount).fill(0)
    let portrait_min_height = 100000;
    const containerRef = useRef();
    const containers = Array(totalCount).fill(0);
    const viewers = Array(totalCount).fill(0);
    const trackRefs = useRef(Array(totalCount).fill(0).map(()=>useRef()));
    const viewRefs = useRef(Array(totalCount).fill(0).map(()=>useRef()));
    const display_indices = Array(totalCount).fill(0)
    let section_length = []
    let AccumCount = 0

    for(let j = 0; j<sectionCount; j++){
        const config_vals = Object.values(configs[j])
        const portrait_width = Math.ceil(window_width*width[j]);
        const portrait_height = Math.ceil(portrait_width/aspect_ratio[j]);
        totalHeights[j] = portrait_height*(config_vals.length)
        if(portrait_min_height>portrait_height){
            portrait_min_height = portrait_height
        }
        // Calculate the number of boxes based on window size.
        const count_containers = Math.ceil(window_height/portrait_height)+2*padding
        const curCount = count_containers
        section_length.push([AccumCount,AccumCount+curCount])
        cur_bottom_blocks[j].current = Math.ceil(window_height/portrait_height)-1;
        for (let i = 0;i<curCount;i++) {
            display_indices[i+AccumCount] = useRef(i-padding);
        }
        bottom_indices[j] = (config_vals.length+padding)%count_containers-1
        //TODO
        handleScrolls[j] = val  => {
            
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
                //We are scrolling down and a new bottom block just appeared, move the top block down 
                // console.log("down and appear")
                cur_bottom_blocks[j].current = bottom;
                const top_block_display_index =  section_length[j][0]+ MathUtils.proper_modulo(cur_top_blocks[j].current-padding+padding,count_containers)//Note how this is calculated
                // Logger.Warn(`Moving block ${top_block_display_index} down`)
                display_indices[top_block_display_index].current+=count_containers
                var tmp = parseInt(trackRefs.current[top_block_display_index].current.style.top , 10);
                trackRefs.current[top_block_display_index].current.style.top = `${tmp+count_containers*portrait_height}px`
                // Hide the bottom blocks when exceeding the portrait section, otherwise would block footer.
                if(tmp+count_containers*portrait_height>=totalHeights[j]){
                    trackRefs.current[top_block_display_index].current.style.display = 'none'
                }
                const display = display_indices[top_block_display_index].current
                // console.log(top_block_display_index,viewRefs.current[top_block_display_index].current)
                const real_config = display>=0 && display<config_vals.length? config_vals[display]:null;
                viewRefs.current[top_block_display_index].current.setConfig(real_config)
   
                // playAnimAppear(top_block_display_index)
            }else if(bottom<cur_bottom_blocks[j].current){
                // We are scrolling up and a new bottom block just disappeared, move the bottom block up
                // console.log("up and disappear")
                cur_bottom_blocks[j].current = bottom;
                const bottom_block_display_index =  section_length[j][0]+MathUtils.proper_modulo(bottom+2*padding+1,count_containers)//Note how this is calculated
                // Logger.Warn(`Moving block ${bottom_block_display_index} up and current bottom is ${bottom}`)
                // Set block Content
                display_indices[bottom_block_display_index].current-=count_containers
                var tmp = parseInt(trackRefs.current[bottom_block_display_index].current.style.top , 10);
                // Move block down
                trackRefs.current[bottom_block_display_index].current.style.top = `${tmp-count_containers*portrait_height}px`
                // set the display back in case it has been set to none in the previous block 
                trackRefs.current[bottom_block_display_index].current.style.display = 'flex'
                const display = display_indices[bottom_block_display_index].current
                viewRefs.current[bottom_block_display_index].current.setConfig(display>=0 && display<config_vals.length? config_vals[display]:null)
                // playAnimAppear(bottom_block_display_index)
            }
    }
    AccumCount += curCount
};

trackRefs.current.map((obj,index)=>{
    const real_index = index
    // console.log("div generated", real_index, trackRefs.current[real_index])
    let segment = 0
    for(;segment<sectionCount; segment++){
        if(section_length[segment][0]<=index && section_length[segment][1]>index){
            break;
        }
    }
    const portrait_width = Math.ceil(window_width*width[segment]);
    const portrait_height = Math.ceil(portrait_width/aspect_ratio[segment]);
    containers[real_index] =  <div ref = {trackRefs.current[real_index]} className="portrait"id = {`portrait-${real_index}`}
    style = {{top:portrait_height*display_indices[real_index].current, width:portrait_width+1,height:portrait_height+1,left:start[segment]*window_width}} 
    key = {real_index}
    onClick = {()=>{ handleFocusIn( {...trackRefs.current[real_index].current.style, left: `${parseInt(trackRefs.current[real_index].current.style.left,10)}px`}) }} 
    />
})

trackRefs.current.map((obj,index)=>{
    const real_index = index
    let segment = 0
    let accum = 0
    for(;segment<sectionCount; segment++){
        if(section_length[segment][0]<=index && section_length[segment][1]>index){
            break;
        }
        accum = section_length[segment][1]
    }
    const config_vals = Object.values(configs[segment])
    // console.log("view generated", real_index,trackRefs.current[real_index])
    const display = display_indices[real_index].current
    // bottom_indices[segment] == index-accum?100:real_index
    viewers[real_index] = <View index = {real_index} track = {trackRefs.current[real_index]} key = {real_index} >
    <Portrait ref = {viewRefs.current[real_index]} config = {display>=0 && display<config_vals.length? config_vals[display]:null}/>
    </View>
})

useEffect(()=>{
    Logger.Warn("end of portraitContainer")
})
    return <>
    <SmoothScroll sectionCount = {sectionCount} ref = {containerRef} left = {start.map((obj,index)=>obj*window_width)} portraitHeight = {portrait_min_height} handleScroll = {handleScrolls} totalHeights = {totalHeights} sections = {containers} section_length = {section_length}  >
        {/* {containers} */}
        </SmoothScroll >
        <Canvas  frameloop= {stopRendering||blur?"never":"always"}  dpr = {[1,2]} gl = {{
            toneMapping: tone == 'ACES'? THREE.ACESFilmicToneMapping: tone == 'Cineon'? THREE.CineonToneMapping: tone == 'Reinhard'?THREE.ReinhardToneMapping: tone == 'Linear'? THREE.LinearToneMapping: THREE.NoToneMapping,
            outputEncoding: THREE.sRGBEncoding,
            antialias:true, alpha:true}} className ='canvas' eventSource={containerRef} >
        {viewers}
        <Perf position = 'bottom-right' />
        </Canvas>
    </>
}