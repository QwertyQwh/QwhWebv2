import { useRef,useState,useEffect,Suspense,useContext } from 'react'
import Svg_ShapeLaptop from './assets/svg/shape_laptop.svg'
import Svg_ShapeLaptopOverlay from './assets/svg/shape_laptop_overlay.svg'

import { useEffectOnce, useWindowSize,useEventListener } from 'usehooks-ts'
import { useControls,button } from 'leva'


export default function Home(){
  const [index, setIndex] = useState(0);
  const titleCoding = useRef()
  const Bg = useRef()
  const laptop = useRef()
  const laptopOverlay = useRef()
  const {width,height} = useWindowSize()
  //Set everyone's position



  useEffect(()=>{
    laptop.current.style.top = `${(-index+0.5)*height-0.35*0.5*width-index*height*2}px` // Initial Height+Align Adjustment+Scroll DIfference
    laptopOverlay.current.style.top = `${(-index+0.5)*height-0.35*0.5*width}px`
    titleCoding.current.style.top = `${(-index+0.5)*height-0.2*0.4*width}px`
    Bg.current.style.fontSize = `${Math.ceil(width*40/1920)}px`
  })
  const handleScroll = e  => {
    laptop.current.style.top = `${-Bg.current.scrollTop}px`
  };
  const testTransition = ()=>{
    laptop.current.style.transform = "translateY(100px)";
  }
  const {foo} = useControls('home',{
        foo: button(() =>  testTransition()),
    })
    
    useEventListener('scroll',handleScroll,Bg)

return (<>

  <div className='homeBg' ref = {Bg}>

  <span className='homeStripe'>
  </span>
  <span className='homeOverlays' ref = {laptopOverlay}>
  <Svg_ShapeLaptopOverlay />
  </span>
  <span className='homeShapes' ref = {laptop}>
  <Svg_ShapeLaptop />
  </span>

  <div className='homeTitle'ref={titleCoding}>
    <h1>coding_</h1>
  </div>
  </div>
</>)}