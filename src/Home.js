import * as THREE from 'three'
import { Canvas ,useThree,useFrame} from "@react-three/fiber"
import { useRef,useState,useEffect,Suspense } from 'react'
import { Perf } from 'r3f-perf'
import { useControls,button } from 'leva'
import { Vector3 } from 'three'
import Camera from './Scene/Camera.js'
import Stage from './Scene/Stage.js'
import Post from './post/Post.js'
import Loader from './UI/Loader.js'
import Logger from './Debug/Logger.js'
import { useEffectOnce } from 'usehooks-ts'
import Blog from './Pages/Blog.js'
import { Routes, Route, Outlet, Link } from 'react-router-dom';


export default function Home(){

  //debug
  const {follow,targetPos} = useControls('camera',{
    follow:false,
    targetPos: [5,5,0]
  })

  const  {tone,background} = useControls('post',{
    tone: {
      options:['ACES','Cineon','Reinhard','Linear','None']
    },
    background: '#fdfcf5',
  })






  return (<>
  <Suspense fallback = {<Loader />}>
  <Link to="Blogs/1" >Blogs</Link>

  <Canvas
  dpr = {[1,2]}
  gl = {{
    toneMapping: tone == 'ACES'? THREE.ACESFilmicToneMapping: tone == 'Cineon'? THREE.CineonToneMapping: tone == 'Reinhard'?THREE.ReinhardToneMapping: tone == 'Linear'? THREE.LinearToneMapping: THREE.NoToneMapping,
    outputEncoding: THREE.LinearEncoding,
    antialias:true}} >
      <color args = {[background]} attach = 'background'/>
      <Perf position='bottom-left'/>
      <Post />
      <Camera targetPos={new Vector3(targetPos[0],targetPos[1],targetPos[2])} follow = {follow}/>
      <Stage />
  </Canvas>

  </Suspense>

  </>
)}