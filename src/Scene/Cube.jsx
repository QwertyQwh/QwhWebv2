import { useGLTF, useTexture } from "@react-three/drei"
import Logger from "../Debug/Logger"
export default function Cube(props){
    Logger.Warn('Cube is rerendered!')
    const model =  useGLTF('./assets/model/cube.gltf')
    return <>
    <mesh geometry={model.nodes.Cube.geometry} >
                <meshBasicMaterial color={'red'} />
            </mesh> 
    </>
}