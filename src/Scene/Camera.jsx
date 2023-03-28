import { PerspectiveCamera,OrthographicCamera } from "@react-three/drei"
import { useRef ,useState,useEffect} from "react";
import { useFrame } from "@react-three/fiber";


export default function Camera({targetPos,follow}){
    const camera = useRef()
    const speed = 0.05
    const threshold = 0.01

    useEffect(()=>{
        camera.current.position.copy(targetPos)
        // camera.current.rotation.set([0,,0])
        camera.current.lookAt(0, 0, 0)
    },[])
    useFrame((state, delta)=>{
        const dist = camera.current.position.distanceTo(targetPos)
        if(dist>threshold && follow){
            // const targetCpy = targetPos.clone()
            // camera.current.position.add(targetCpy.sub(camera.current.position).multiplyScalar(speed*0.05))
            camera.current.position.lerp(targetPos,speed)
        }
    })
    return  <PerspectiveCamera ref={camera} makeDefault />
}