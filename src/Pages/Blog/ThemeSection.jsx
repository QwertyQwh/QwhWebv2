import { useThree } from "@react-three/fiber"
import { Canvas,useFrame } from "@react-three/fiber"
import { ScrollControls,Scroll,useScroll } from "@react-three/drei"
import { useRef,memo } from "react"
import { MathUtils } from "three"
import FadingImage from "./FadingImage"
import Disp from '../../assets/images/disp7.png'
import Logger from "../../Debug/Logger"

// function ThumbNail({ index, position, scale, c = new THREE.Color(), ...props }) {
//         const ref = useRef()
//         const scroll = useScroll()
//         const { clicked, urls } = useSnapshot(state)
//         const [hovered, hover] = useState(false)
//         const click = () => (state.clicked = index === clicked ? null : index)
//         const over = () => hover(true)
//         const out = () => hover(false)
//         useFrame((state, delta) => {
//           const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
//           ref.current.material.scale[1] = ref.current.scale.y = damp(ref.current.scale.y, clicked === index ? 5 : 4 + y, 8, delta)
//           ref.current.material.scale[0] = ref.current.scale.x = damp(ref.current.scale.x, clicked === index ? 4.7 : scale[0], 6, delta)
//           if (clicked !== null && index < clicked) ref.current.position.x = damp(ref.current.position.x, position[0] - 2, 6, delta)
//           if (clicked !== null && index > clicked) ref.current.position.x = damp(ref.current.position.x, position[0] + 2, 6, delta)
//           if (clicked === null || clicked === index) ref.current.position.x = damp(ref.current.position.x, position[0], 6, delta)
//           ref.current.material.grayscale = damp(ref.current.material.grayscale, hovered || clicked === index ? 0 : Math.max(0, 1 - y), 6, delta)
//           ref.current.material.color.lerp(c.set(hovered || clicked === index ? 'white' : '#aaa'), hovered ? 0.3 : 0.1)
//         })
//         return <Image ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />
//       }

const clicked = null;

//TODO: THIS LOOKS FLAT! ADD SHADOWS! 
const ThumbNail = memo(function ThumbNail({config,index,length,position}){
        const Imgref = useRef()
        const scroll = useScroll()
        const origin_p = require(`../../assets/images/${config.titleImg}.png`)

        useFrame((state,delta)=>{
                const y = scroll.curve(index*1.15 / length - 4/length ,  8/ length)
                Imgref.current.scale.y = MathUtils.damp(Imgref.current.scale.y,4+y,6,delta)
                // Imgref.current.position.y = MathUtils.damp(Imgref.current.position.y,y/2-1,6,delta)
        })
        return  <FadingImage  ref = {Imgref} origin_p = {origin_p} disp_p = {Disp} text = {config.thumbNail} scale = {[1,5,1]} position ={position}/>
})


function ThumbNails({w = 1,gap = 0.15,configs}){
        Logger.Warn("ThumbNails rerendered")
        const { width } = useThree((state) => state.viewport)
        const xW = w + gap
        const arr = Object.entries(configs);
        return  <ScrollControls horizontal damping={0.5} pages={(width - xW + arr.length* xW) / width}>
        <Scroll >
                {arr.map((obj,index)=>{return <ThumbNail key = {index} index = {index} config = {obj[1]} length={arr.length} position = {[(index)*xW,0,0]}/> })}
        </Scroll>
        </ScrollControls>
}



export default function ThemeSection(props){
        Logger.Warn("ThemeSection rerendered")
        return <>
        <div className="fullscreen">
                
        <Canvas>
        <ThumbNails {...props}/>
        {/* <FadingImage origin_p={origin_p}  disp_p = {Disp} text = "这里有六个字" scale = {[1,5,1]}> */}

        {/* </FadingImage> */}
        </Canvas> 
        </div>

        </>
}