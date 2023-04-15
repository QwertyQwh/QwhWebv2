import { useGLTF, useTexture,Environment} from "@react-three/drei"
import * as THREE from 'three'
import Logger from "../Debug/Logger"
import { useEffectOnce } from "usehooks-ts"
import { useAnimations } from "@react-three/drei"
export default function Shapekey(props){
    const model =  useGLTF('../assets/model/shapekey.glb')
    const anims = useAnimations(model.animations,model.scene);
    console.log(model)
    useEffectOnce(()=>{
        anims.actions["KeyAction"].play()
    })


    return <>
        <Environment preset="warehouse" />
        <primitive object={model.scene} ></primitive>
    </>
}