import * as THREE from "three"
import { useMemo, useRef, useState } from "react"
import { extend, useFrame } from "@react-three/fiber"
import { useTexture, shaderMaterial } from "@react-three/drei"

//We assume the input resolution is always 16:9
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
uniform float _rot;
uniform float dispFactor;
uniform float effectFactor;
void main() {
  vec2 uv = vUv;
  vec4 disp = texture2D(disp, uv);
  vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
  vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
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
    disp: undefined
  },
  vert,
  frag
)

extend({ ImageFadeMaterial })

export default function FadingImage({origin_p,disp_p,text,scale}) {
  console.log(scale)
  const ref = useRef()
  const texture = useMemo(()=>{
    const txtlen = text.length
    const hWorldTxt = 0.1
    const hWorldAll = txtlen*0.2
    const hPxTxt = 100;
    const bgcolor = '#ffffff'
    const fgcolor = '#000000'
    var kPxToWorld = hWorldTxt/hPxTxt;                // Px to World multplication factor
    // hWorldTxt, hWorldAll, and hPxTxt are given; get hPxAll
    var hPxAll = Math.ceil(hWorldAll/kPxToWorld);     // hPxAll: height of the whole texture canvas
    // create the canvas for the texture
    var txtcanvas = document.createElement("canvas"); // create the canvas for the texture
    var ctx = txtcanvas.getContext("2d");
    ctx.font = hPxTxt + "px zhfont";        
    // now get the widths
    var wPxTxt = ctx.measureText(text).width;         // wPxTxt: width of the text in the texture canvas
    var wWorldTxt = wPxTxt*kPxToWorld;               // wWorldTxt: world width of text in the plane
    var wWorldAll = wWorldTxt+(hWorldAll-hWorldTxt); // wWorldAll: world width of the whole plane
    var wPxAll = Math.ceil(wWorldAll/kPxToWorld);    // wPxAll: width of the whole texture canvas
  
    // next, resize the texture canvas and fill the text
    txtcanvas.width =  wPxAll;
    txtcanvas.height = hPxAll;
    if (bgcolor != undefined) { // fill background if desired (transparent if none)
      ctx.fillStyle = bgcolor
      ctx.fillRect( 0,0, wPxAll,hPxAll);
    } 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; 
    ctx.fillStyle = fgcolor; // fgcolor
    ctx.font = hPxTxt + "px zhfont";   // needed after resize
    for(let i = 0; i < txtlen;i++){
      ctx.fillText(text[i], wPxAll/2, (i+1)*hPxAll/(txtlen+1)); // the deed is done
    }
    // next, make the texture
    var texture = new THREE.Texture(txtcanvas); // now make texture
    texture.minFilter = THREE.LinearFilter;     // eliminate console message
    texture.needsUpdate = true;                 // duh
    return texture
  },[text])


  const [texture1, dispTexture] = useTexture([origin_p, disp_p])
  const [hovered, setHover] = useState(false)
  useFrame(() => {
    ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.075)
  })
  return (
    <mesh onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}  >
      <planeGeometry />
      <imageFadeMaterial ref={ref} tex={texture1} tex2={texture} disp={dispTexture} toneMapped={false} />
    </mesh>
  )
}