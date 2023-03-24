import { useRef,forwardRef,useImperativeHandle,useState,useEffect,useMemo } from "react";
import { useWindowDimensions } from "../../Utils/WindowUtils";
import TestObject from "../../Scene/TestObject";
import { OrbitControls, View } from "@react-three/drei";
import { useEffectOnce } from "usehooks-ts";
import { Vector3 } from "three";
import Camera from "../../Scene/Camera";
import Portrait from "./Portrait";

//This function acts as a list container for a column of portraits
export default function PortraitContainer({start, width,aspect_ratio,configs}){
    //1.Calculate the number of boxes based on window size. (PI: Window resizing would cause us to recalculate the number of boxes needed so use padding and usememo here)
    //3.When a box goes out of view range, we disable it.(Since it's outside of the screen it's not going to do anything)
    // When we are running out of boxes, we get an idle box and play the animation and set the data
    // There's only going to be one invisible box. 
    const [window_width,window_height] = useWindowDimensions();
    const portrait_width = window_width*width;
    const portrait_height = portrait_width/aspect_ratio;
    const count_containers = useMemo(()=>Math.min(Object.keys(configs).length,Math.ceil(window_height/portrait_height)), [window_height,window_width,configs])
    

    const containers = useMemo(() => {
        console.log('containers changed')
        
        return Object.entries(configs).map((obj,index)=>{
            return <div className="portrait"style = {{left:start*window_width,top:portrait_height*index, width:portrait_width,height:portrait_height}} key = {index}>
            <Portrait config = {obj[1]}/>
            </div>
    })

    }, [count_containers,window_width,window_height])

    return <>
    {containers}
    </>
}