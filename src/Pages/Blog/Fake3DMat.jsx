import { useTexture,shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import { useRef } from "react"
import { useEventListener } from "usehooks-ts"
import * as THREE from 'three'


const vert = /* glsl */`
  varying vec2 vUv;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
  }`
const frag = /* glsl */`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  uniform sampler2D diffuse;
  uniform sampler2D depth;
  uniform vec2 uMouse;
  uniform float isFake;
  varying vec2 vUv;

  void main() {
    vec4 depthMap = texture2D(depth, vUv);
    gl_FragColor = texture2D(diffuse,vUv+uMouse*depthMap.x*0.01*isFake);
        
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`
const FakeMaterial = shaderMaterial({
  diffuse: null,
  depth : null,
  uMouse: {x:0.5,y:0.2},
  isFake: 0,
},
vert,
frag)

extend({FakeMaterial})

export default function Fake3DMat({diffuse,depth,isFake3D}){
    const shaderRef = useRef()
    const handleWindowMouseMove = e  => {
        shaderRef.current.uMouse = new THREE.Vector2(e.clientX/window.innerWidth-0.5,e.clientY/window.innerHeight-0.5)
    };

    useEventListener('mousemove',handleWindowMouseMove)
  

    const diffuseTxtr = useTexture(diffuse)
    const depthTxtr = useTexture(depth)
    return   <fakeMaterial ref = {shaderRef} diffuse = {diffuseTxtr} depth = {depthTxtr} isFake = {isFake3D?1:0}/>
}