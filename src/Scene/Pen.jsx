import { useGLTF } from "@react-three/drei"
export default function Pen(){
    const model = useGLTF('./assets/model/pen.gltf')
    return <>
        <primitive object={ model.scene } />
    </>
}