import * as THREE from 'three'
import { Canvas ,useThree,useFrame} from "@react-three/fiber"
import { useRef,useState,useEffect,Suspense } from 'react'
import { Perf } from 'r3f-perf'
import { useControls,button } from 'leva'
import { Vector3 } from 'three'
import Post from '../../../post/Post.jsx'
import Loader from '../../../UI/Loader.jsx'
import { useEffectOnce } from 'usehooks-ts'
import Stage from '../../../Scene/Stage.jsx'
import { OrbitControls } from '@react-three/drei'
import Camera from '../../../Scene/Camera.jsx'


export default function Portrait({config,stopRendering}){
    useEffectOnce(()=>{
        // import(/* webpackMode: "lazy-once" */`../PortraitContents/${config.content}`).then((con)=>{setcontent(<div ><con.default /></div>)})
    })
    const {follow,targetPos} = useControls('camera',{
        follow:false,
        targetPos: [-5,5,0]
      })
      const  {tone,background,blur} = useControls('post',{
        tone: {
          options:['ACES','Cineon','Reinhard','Linear','None']
        },
        background: '#fdfcf5',
        blur: false,
      })
return <>
<Suspense fallback = {<Loader />} > 
  <Canvas  frameloop= {stopRendering||blur?"never":"always"}  dpr = {[1,2]} gl = {{
      toneMapping: tone == 'ACES'? THREE.ACESFilmicToneMapping: tone == 'Cineon'? THREE.CineonToneMapping: tone == 'Reinhard'?THREE.ReinhardToneMapping: tone == 'Linear'? THREE.LinearToneMapping: THREE.NoToneMapping,
      outputEncoding: THREE.sRGBEncoding,
    antialias:true}} className ='canvas'  >
            <color attach="background" args={['#fed200']} />
          <OrbitControls makeDefault/>
          <Camera targetPos={new Vector3(-5,5,0)} />
          <Stage />
      <color args = {[background]} attach = 'background'/>
      <Perf position='bottom-left'/>
        <Post blur = {blur}/>
  </Canvas>
</Suspense>
</>
}