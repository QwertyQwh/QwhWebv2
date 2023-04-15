import { useGLTF, useTexture,O, OrbitControls } from "@react-three/drei"
import * as THREE from 'three'
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Logger from "../Debug/Logger"
import Slimes from "./Slimes"
import { Perf } from "r3f-perf"
import Shapekey from "./ShapeKey"

export default function TestScene(props){

    return <>
        <Canvas   dpr = {[1,2]} gl = {{
            toneMapping: THREE.ACESFilmicToneMapping,
            antialias:true, alpha:true}} className ='canvas'  >
        <PerspectiveCamera makeDefault position={[0, 5, 0]}/>
        <OrbitControls makeDefault/>
            <Slimes />
            {/* <Shapekey /> */}
        <Perf position = 'bottom-right' />
        </Canvas>
    </>
}