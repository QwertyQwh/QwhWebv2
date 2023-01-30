import { useTexture,shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"
import { memo,useState } from "react"
import { useEventListener } from "usehooks-ts"
import Logger from "../Debug/Logger"
import * as THREE from 'three'
import { useMemo } from "react"


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
  varying vec2 vUv;

  void main() {
    vec4 depthMap = texture2D(depth, vUv);
    gl_FragColor = vec4(1.0,1.0,0.0,1.0);
    gl_FragColor = texture2D(diffuse,vUv+uMouse*depthMap.x*0.01);
        
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`
const FakeMaterial = shaderMaterial({
  diffuse: null,
  depth : null,
  uMouse: {x:0.5,y:0.2}
},
vert,
frag)

extend({FakeMaterial})

export default function Fake3DMat({diffuse,depth}){
    Logger.Warn('titleImg rerendered')
    const shaderRef = useRef()
    const handleWindowMouseMove = e  => {
        shaderRef.current.uMouse = new THREE.Vector2(e.clientX/window.innerWidth-0.5,e.clientY/window.innerHeight-0.5)
    };

    useEventListener('mousemove',handleWindowMouseMove)
  

    const diffuseTxtr = useTexture(diffuse)
    const depthTxtr = useTexture(depth)
    return   <fakeMaterial ref = {shaderRef} diffuse = {diffuseTxtr} depth = {depthTxtr} />
}