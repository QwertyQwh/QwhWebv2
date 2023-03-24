import { useGLTF, useTexture,O } from "@react-three/drei"
import {EffectComposer, SSAO, SMAA, Selection, Outline, Select } from "@react-three/postprocessing"
import hammerColor from '../assets/textures/hammer_color.png'
import Logger from "../Debug/Logger"
import { forwardRef,useState,memo, useMemo } from "react"
import TestObject from "./TestObject"
export default function Pen(props){
    Logger.Warn('Hammer is rerendered!')
    const model = useGLTF('./assets/model/hammer.gltf')
    const color = useTexture(hammerColor)    
    color.flipY = false
    return <>
        <mesh geometry={model.nodes.ground.geometry} position = {model.nodes.ground.position}  >
        <meshBasicMaterial map={color} />
    </mesh>
    <mesh geometry={model.nodes.rock.geometry} position = {model.nodes.rock.position}>
        <meshBasicMaterial map={color} />
    </mesh> 
    <mesh geometry={model.nodes.Cube_1.geometry} >
        <meshBasicMaterial map={color} />
    </mesh>
    <mesh geometry={model.nodes.Cube_2.geometry} >
        <meshBasicMaterial map={color} />
    </mesh> 
    <mesh geometry={model.nodes.Cube.geometry} >
                <meshBasicMaterial map={color} />
            </mesh> 
            <TestObject/>
    </>
}