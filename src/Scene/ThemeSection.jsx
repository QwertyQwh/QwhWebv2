import { Image } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { Canvas,useFrame } from "@react-three/fiber"
import Ball from '../assets/images/ball.jpg'
import { ScrollControls,Scroll,useScroll } from "@react-three/drei"
import { useRef } from "react"
import { MathUtils } from "three"


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

function ThumbNail({config,index,length}){
        const Imgref = useRef()
        const scroll = useScroll()
        console.log(config)
        useFrame((state,delta)=>{
                const y = scroll.curve(index / length - 1.5 / length, 10 / length)
                Imgref.current.scale.y = MathUtils.damp(Imgref.current.scale.y,4+y,6,delta)
                Imgref.current.scale.x = MathUtils.damp(Imgref.current.scale.x,1+y/3,6,delta)
                // Imgref.current.position.y = MathUtils.damp(Imgref.current.position.y,y/2-1,6,delta)
        })
        return  <Image ref = {Imgref} url = {Ball} position-x ={index*1.25} scale = {[1,4]}/>
}


function ThumbNails({w = 1,gap = 0.15,configs}){

        const { width } = useThree((state) => state.viewport)
        const xW = w + gap
        const arr = Object.entries(configs);
        return  <ScrollControls horizontal damping={0.5} pages={(width - xW + 9* xW) / width}>
        <Scroll >
                {arr.map((obj,index)=>{return <ThumbNail key = {index} index = {index} config = {obj[1]} length={arr.length}/> })}
        </Scroll>
        </ScrollControls>
}



export default function ThemeSection(props){

        return <>
        <div className="fullscreen">
        <Canvas>
        <ThumbNails {...props}/>
        </Canvas>
        </div>

        </>
}