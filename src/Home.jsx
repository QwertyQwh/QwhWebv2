import * as THREE from 'three'
import { Canvas ,useThree,useFrame} from "@react-three/fiber"
import { useRef,useState,useEffect,Suspense } from 'react'
import { Perf } from 'r3f-perf'
import { useControls,button } from 'leva'
import { Vector3 } from 'three'
import Camera from './Scene/Camera.jsx'
import Stage from './Scene/Stage.jsx'
import Post from './post/Post.jsx'
import Loader from './UI/Loader.jsx'
import Logger from './Debug/Logger.js'
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Selection,Select } from '@react-three/postprocessing'
import ThemeSection from './Scene/ThemeSection.jsx'


export default function Home(){

  //debug
  const {follow,targetPos} = useControls('camera',{
    follow:false,
    targetPos: [5,5,0]
  })

  const  {tone,background,blur} = useControls('post',{
    tone: {
      options:['ACES','Cineon','Reinhard','Linear','None']
    },
    background: '#fdfcf5',
    blur: false,
  })

  //We need to stop rendering a few frames later when actually trigger the effect


  return (<>
  <Suspense fallback = {<Loader />}>
  <Link to="../Blogs/testVideo" >Blogs</Link>
  <Canvas  frameloop= {blur?"never":"always"}  dpr = {[1,2]} gl = {{
    toneMapping: tone == 'ACES'? THREE.ACESFilmicToneMapping: tone == 'Cineon'? THREE.CineonToneMapping: tone == 'Reinhard'?THREE.ReinhardToneMapping: tone == 'Linear'? THREE.LinearToneMapping: THREE.NoToneMapping,
    outputEncoding: THREE.LinearEncoding,
    antialias:true}} >
      <color args = {[background]} attach = 'background'/>
      <Perf position='bottom-left'/>
      <Post blur = {blur}/>
      <Camera targetPos={new Vector3(targetPos[0],targetPos[1],targetPos[2])} follow = {follow}/>
      <Stage />
  </Canvas>

  </Suspense>
  {blur? <ThemeSection />:null}
  </>
)}