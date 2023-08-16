import * as THREE from "three"
import { useMemo, useRef, useState,forwardRef } from "react"
import { extend, useFrame } from "@react-three/fiber"
import { useTexture, shaderMaterial } from "@react-three/drei"
import Logger from "../../Debug/Logger"

const vert = /*glsl */  
` varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`

const frag = /*glsl */
` varying vec2 vUv;
uniform sampler2D tex;
uniform sampler2D tex2;
uniform sampler2D disp;
  uniform vec2 imageBounds;
  uniform vec2 scale;
uniform float dispFactor;
uniform float effectFactor;

vec2 aspect(vec2 size) {
  return size / min(size.x, size.y);
}

void main() {
  vec2 s = aspect(scale);
  vec2 i = aspect(imageBounds);
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 uv = vUv * s / new + offset;
  vec2 zUv = (uv - vec2(0.5, 0.5)) + vec2(0.5, 0.5);

  uv = zUv;
  vec4 disp = texture2D(disp, uv);
  vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
  vec2 distortedPosition2 = vec2(uv.x + (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
  vec4 _texture = texture2D(tex, distortedPosition);
  vec4 _texture2 = texture2D(tex2, distortedPosition2);
  vec4 finalTexture = mix(_texture, _texture2, dispFactor);
  gl_FragColor = finalTexture;
  #include <tonemapping_fragment>
  #include <encodings_fragment>
}`

const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
    imageBounds : [1,1],
    scale: [1,1],
  },
  vert,
  frag
)

extend({ ImageFadeMaterial })

export default forwardRef( function FadingImage({origin_p,disp_p,text,scale,position},meshRef) {
  Logger.Warn("fadingImage rerendered")
  const [texture1, dispTexture] = useTexture([origin_p, disp_p])
  const imageBounds = [texture1.image.width, texture1.image.height];

  const Matref = useRef()
  const texture = useMemo(()=>{
    const txtlen = text.length
    const hPxTxt = Math.ceil(imageBounds[1]/text.length/2);
    const bgcolor = '#ffffff'
    const fgcolor = '#000000'
    var txtcanvas = document.createElement("canvas"); // create the canvas for the texture
    var ctx = txtcanvas.getContext("2d");
  
    // next, resize the texture canvas and fill the text
    txtcanvas.width =  imageBounds[0];
    txtcanvas.height = imageBounds[1];
    if (bgcolor != undefined) { // fill background if desired (transparent if none)
      ctx.fillStyle = bgcolor
      ctx.fillRect( 0,0, txtcanvas.width,txtcanvas.height);
    } 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; 
    ctx.fillStyle = fgcolor; // fgcolor
    ctx.font = hPxTxt + "px zhfont";   // needed after resize
    for(let i = 0; i < txtlen;i++){
      ctx.fillText(text[i], txtcanvas.width/2, (i+1)*txtcanvas.height/(txtlen+1)); // the deed is done
    }
    // next, make the texture
    var texture = new THREE.Texture(txtcanvas); // now make texture
    texture.minFilter = THREE.LinearFilter;     // eliminate console message
    texture.needsUpdate = true;                 
    return texture
  },[text])


  const [hovered, setHover] = useState({value: false})//hack without triggering rerender
  useFrame(() => {
        Matref.current.dispFactor = THREE.MathUtils.lerp(Matref.current.dispFactor, hovered.value ? 1 : 0, 0.075)
  })
  return (<>

    <mesh ref = {meshRef} onPointerOver={(e) => {hovered.value = true}} onPointerOut={(e) => {hovered.value = false}}  scale = {scale} position = {position}>
      <planeGeometry />
      <imageFadeMaterial ref={Matref} tex={texture1} tex2={texture} disp={dispTexture} toneMapped={false} imageBounds = {imageBounds} scale = {[scale[0],scale[1]]}/>
    </mesh>
    {/* <mesh scale = {scale} position-x = {position[0]+1} position-y = {position[1]+1} position-z = {position[2]}>
      <planeGeometry />
      <meshBasicMaterial color = "gray" />
    </mesh> */}
  </>
  )
})