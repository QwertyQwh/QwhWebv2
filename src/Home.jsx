import * as THREE from 'three'
import { Canvas ,useThree,useFrame} from "@react-three/fiber"
import { useRef,useState,useEffect,Suspense } from 'react'
import { Perf } from 'r3f-perf'
import { useControls,button } from 'leva'
import { Vector3 } from 'three'
import Post from './post/Post.jsx'
import Loader from './UI/Loader.jsx'
import ThemeSection from './Pages/Blog/ThemeSection.jsx'
import Catalog from './Catalogs/BlogCatalog.js'
import PortraitContainer from './Pages/Portraits/PortraitContainter.jsx'
import { useEffectOnce } from 'usehooks-ts'
import Stage from './Scene/Stage.jsx'
import { OrbitControls } from '@react-three/drei'
import Camera from './Scene/Camera.jsx'
import PortraitCatalog from './Catalogs/PortraitCatalog.js'


export default function Home(){

  //debug  
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

  //TODO:We need to stop rendering a few frames later when actually trigger the effect, This will be done in the function that toggles the blur value. i.e. Toggle the stopRendering variable a few frames after we toggle the blur variable. 
  const stopRendering = false;
  useEffectOnce(()=>{
    // console.log(pref.current.refs)
})

  return (<>
  <Suspense fallback = {<Loader />}>
  <PortraitContainer start = {0} width = {1/3} aspect_ratio = {16/9} configs = {PortraitCatalog.Large}></PortraitContainer>

  {/* <Link to="../Blogs/testVideo" >Blogs</Link> */}
  {/* <div className="container" ref = {containerRef}>
  <Canvas  frameloop= {stopRendering||blur?"never":"always"}  dpr = {[1,2]} gl = {{
    toneMapping: tone == 'ACES'? THREE.ACESFilmicToneMapping: tone == 'Cineon'? THREE.CineonToneMapping: tone == 'Reinhard'?THREE.ReinhardToneMapping: tone == 'Linear'? THREE.LinearToneMapping: THREE.NoToneMapping,
    outputEncoding: THREE.sRGBEncoding,
    antialias:true}} className ='canvas' eventSource={containerRef} >
            <color attach="background" args={['#fed200']} />
          <OrbitControls makeDefault/>
          <Camera targetPos={new Vector3(-5,5,0)} />
          <Stage />
      <color args = {[background]} attach = 'background'/>
      <Perf position='bottom-left'/>
        <Post blur = {blur}/>

  </Canvas>
        </div> */}
  </Suspense>
  {blur && <ThemeSection configs = {Catalog}/>}
  </>
)}