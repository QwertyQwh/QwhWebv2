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


export default function Portrait({config}){
    useEffectOnce(()=>{
        // import(/* webpackMode: "lazy-once" */`../PortraitContents/${config.content}`).then((con)=>{setcontent(<div ><con.default /></div>)})
    })

return <>
<Suspense fallback = {<></>} > 
            <color attach="background" args={['#fed200']} />
          <OrbitControls makeDefault/>
          <Camera targetPos={new Vector3(-5,5,0)} />
          <Stage />
        {/* <Post blur = {blur}/> */}
</Suspense>
</>
}