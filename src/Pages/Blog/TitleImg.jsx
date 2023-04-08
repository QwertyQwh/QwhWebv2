import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera,Image, OrbitControl } from '@react-three/drei';
import { ScreenQuad } from '@react-three/drei';
import { useEffectOnce,useEventListener } from 'usehooks-ts';
import { useRef,useEffect,useState} from 'react';
import Logger from '../../Debug/Logger';
import Fake3DMat from './Fake3DMat';
import TitleVideoMat from './TitleVideoMat';
import { MeshBasicMaterial } from 'three';

export default function TitleImg(props){
    Logger.Warn('titleImg rerendered')
    const canvasRef = useRef()
    const [zoom, setzoom] = useState(1);

    const fitCamera = ()=>{
        setTimeout(() => {
            if(canvasRef.current.width/canvasRef.current.height>2){
                setzoom(canvasRef.current.width/canvasRef.current.height/2)
            }else{
                setzoom(1)
            }
        }, 40);
    }
    useEffect(()=>{
        fitCamera()
    })
    useEventListener('resize',fitCamera)
    return <Canvas ref={canvasRef}>
    <color args = {['#6B705C']} attach = 'background'/>

  <PerspectiveCamera zoom = {zoom} makeDefault />

<mesh position={[0,0,-4.8]}>
  <planeGeometry args={[0.6*16,0.6*9]}/>
  {props.isVideo?<TitleVideoMat {...props} />: <Fake3DMat {...props} />}
</mesh>

  {/* <Image url={img} position = {[0,0,-10]} scale = {[9,4.5]}>  
  <shaderMaterial vertexShader={vert} fragmentShader = {frag} />
   </Image> */}


</Canvas>
    
}