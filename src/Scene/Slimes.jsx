import { useGLTF, useTexture,Environment,SpotLight} from "@react-three/drei"
import slimeDiffuse from '../assets/textures/slimes_diffuse.png'
import slimeNormal from '../assets/textures/slimes_normal.png'
import slimeRoughness from '../assets/textures/slimes_roughness.png'
import { useRef } from "react"
import * as THREE from 'three'
import Logger from "../Debug/Logger"
import { useEffectOnce } from "usehooks-ts"
import { useAnimations } from "@react-three/drei"
import HDR from "../assets/textures/sidewalk.hdr"
export default function slimes(props){
    const model =  useGLTF('../assets/model/slimes.gltf')
    const slimeref = useRef(0)
    const slimeAnims = useAnimations(model.animations,model.scene);
    console.log(model)
    const diffuse = useTexture(slimeDiffuse)    
    const normal = useTexture(slimeNormal)    
    const roughness = useTexture(slimeRoughness)    
    diffuse.flipY = false
    normal.flipY = false
    roughness.flipY = false
    const floor = model.nodes.floor;
    // floor.material.map = diffuse
    floor.material.color = new THREE.Color(0xe07e31)
    floor.material.normalMap = normal;
    // floor.material.roughnessMap = roughness
    floor.material.roughness = 0.7
    floor.receiveShadow = true;
    const slime = model.nodes.pianist;
    slime.morphTargetInfluences[0] = 1
    slime.castShadow = true;
    // console.log( slime.children)
    // floor.material.map = diffuse
    slime.material.color = new THREE.Color(0x5C87DA)
    // slime.children[0].material.map = diffuse
    // slime.children[1].material.map = diffuse
    slime.material.normalMap = normal;
    // floor.material.roughnessMap = roughness
    slime.material.roughness = roughness
    slime.material.morphTargets = true, 

    // console.log(floor.material)
    // floor.
    useEffectOnce(()=>{
        console.log(slimeAnims)
        // console.log(model.scene)
        // console.log(slimeref.current)
        slimeAnims.actions["pianist_trans"].play();
        // slimeAnims.actions["driver_action"].play();
    
    })


    return <>
        <Environment preset="warehouse" />
        <fog attach="fog" args={['#202020', 5, 20]} />

        {/* <primitive object={floor} ></primitive>
        <primitive object={slime} ></primitive> */}
        <primitive object={model.scene} ></primitive>
        <SpotLight
        castShadow
        penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} color="#0c8cbf" position={[3, 3, 2]}/>
            {/* <mesh geometry={model.nodes.floor.geometry}  scale={model.nodes.floor.scale} position = {model.nodes.floor.position}  >
        <meshBasicMaterial  map = {diffuse}/>
        </mesh> */}
        {/* <group ref = {slimeref}>
            <mesh  geometry={model.nodes.pianist.geometry} name="pianist" morphTargetDictionary={model.nodes.pianist.morphTargetDictionary} morphTargetInfluences={model.nodes.pianist.morphTargetInfluences} scale={model.nodes.pianist.scale} position = {model.nodes.pianist.position}  >
            <meshBasicMaterial  map = {diffuse}/>
            <group position={model.nodes.eye.position} >
            <mesh geometry={model.nodes.Circle004.geometry}   >
                <meshBasicMaterial  map = {diffuse}/>
            </mesh>
            <mesh geometry={model.nodes.Circle004_1.geometry}   >
                <meshBasicMaterial  map = {diffuse}/>
            </mesh>
            </group>
            </mesh>
        </group> */}



    </>
}