import { useFrame } from "@react-three/fiber";
import { EffectComposer,DepthOfField } from "@react-three/postprocessing";
import {useControls } from 'leva'
import { useRef,useEffect,memo } from "react";
import Pencil from "./Pencil";
import Blur from './Blur'
import Logger from "../Debug/Logger";

export default memo(function Post(props){
    Logger.Warn("post rerendering")
    const blurRef = useRef();
    const pencilRef = useRef();



    return <EffectComposer>
         {/* <Pencil ref = {pencilRef} dispFactor = {dispFactor}/> */}
         { props.blur && <Blur ref = {blurRef} strength = {11} gamma = {20.}/> }
         {/* <BlurPass /> */}
    </EffectComposer>
})