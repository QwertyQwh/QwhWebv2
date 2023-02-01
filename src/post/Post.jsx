import { useFrame } from "@react-three/fiber";
import { EffectComposer,DepthOfField } from "@react-three/postprocessing";
import {useControls } from 'leva'
import { useRef,useEffect,memo } from "react";
import Pencil from "./Pencil";
import Blur from './Blur'
import { useTexture } from "@react-three/drei";
import {BlurPass} from 'postprocessing'
import Logger from "../Debug/Logger";

export default memo(function Post(props){
    Logger.Warn("post rerendering")
    const blurRef = useRef();
    const pencilRef = useRef();

    // useFrame(()=>{
    //     pencilRef.current.setDispFactor(dispFactor);
    // })


    return <EffectComposer>
         {/* <Pencil ref = {pencilRef} dispFactor = {dispFactor}/> */}
         { props.blur? <Blur ref = {blurRef} strength = {11} gamma = {20.}/>:null }
         {/* <BlurPass /> */}
    </EffectComposer>
})