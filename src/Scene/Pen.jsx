import { useGLTF, useTexture } from "@react-three/drei"
import hammerColor from '../assets/textures/hammer_color.png'
export default function Pen(){
    const model = useGLTF('./assets/model/hammer.gltf')
    const color = useTexture(hammerColor)
    color.flipY = false
    console.log(model.nodes)
    return <>
        <mesh geometry={model.nodes.ground.geometry} position = {model.nodes.ground.position}>
            <meshBasicMaterial map={color} />
        </mesh>
        <mesh geometry={model.nodes.rock.geometry} position = {model.nodes.rock.position}>
            <meshBasicMaterial map={color} />
        </mesh> 
        <mesh geometry={model.nodes.Cube_1.geometry} >
            <meshBasicMaterial map={color} />
        </mesh> 
        <mesh geometry={model.nodes.Cube.geometry} >
            <meshBasicMaterial map={color} />
        </mesh> 
        <mesh geometry={model.nodes.Cube_2.geometry} >
            <meshBasicMaterial map={color} />
        </mesh> 
    </>
}