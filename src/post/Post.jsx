import { useFrame } from "@react-three/fiber";
import { EffectComposer,DepthOfField } from "@react-three/postprocessing";
import {useControls } from 'leva'
import { useRef,useEffect,memo } from "react";
import Pencil from "./Pencil";
import { useTexture } from "@react-three/drei";

export default memo(function Post(){

    const {dispFactor} = useControls('post',{
        dispFactor :{
            value:0,
            min:0,
            max:1
        }
    })
    const pencilRef = useRef();

    // useFrame(()=>{
    //     pencilRef.current.setDispFactor(dispFactor);
    // })


    return <EffectComposer>
         {/* <Pencil ref = {pencilRef} dispFactor = {dispFactor}/> */}
    </EffectComposer>
})