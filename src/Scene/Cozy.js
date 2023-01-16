import { useGLTF } from "@react-three/drei"
export default function Cozy(){
    const model = useGLTF('./assets/model/cozy.glb')
    return <>
        <primitive object={ model.scene } />
    </>
}