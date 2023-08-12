import { useRef,useState,useEffect,Suspense,useContext } from 'react'
import Svg_ShapeLaptop from './assets/svg/shape_laptop.svg'
import Svg_ShapeLaptopOverlay from './assets/svg/shape_laptop_overlay.svg'
import { useEffectOnce, useWindowSize,useEventListener } from 'usehooks-ts'
import { useControls,button } from 'leva'
import anime from 'animejs'

const codingPage = 1;
const ArtPage = 2;
const WritingPage = 3;
const MaxPage = 3

export default function Home(){
  const [index, setIndex] = useState(1);
  const titleCoding = useRef()
  const titleArt = useRef()
  const titleWriting = useRef()
  const Bg = useRef()
  const laptop = useRef()
  const laptopOverlay = useRef()
  const {width,height} = useWindowSize()
  const isInTransition = useRef(false)
  //Set everyone's position



  useEffect(()=>{
    laptop.current.style.transform = `translateY(${(3*(-index+codingPage)+0.5)*height-0.35*0.5*width}px)` // Initial Height+Align Adjustment+Scroll DIfference
    laptopOverlay.current.style.transform = `translateY(${(3*(-index+codingPage)+0.5)*height-0.35*0.5*width-0.75*width}px)`
    titleCoding.current.style.transform = `translateY(${(-index+codingPage+0.5)*height-0.2*0.4*width}px)`

    titleArt.current.style.transform = `translateY(${(-index+ ArtPage+0.5)*height-0.2*0.4*width}px)`

    titleWriting.current.style.transform = `translateY(${(-index+ WritingPage+0.5)*height-0.2*0.4*width}px)`

    isInTransition.current = true
    console.log('setting true')
    Bg.current.style.fontSize = `${Math.ceil(width*40/1920)}px`
  })
  
  useEffectOnce(()=>{
    anime({
      targets: '#steam  path',
      strokeDashoffset: [anime.setDashoffset, -28.8],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
      direction: 'reverse',
      loop: true,
      endDelay: 500,
    });
  })
  const testTransition = ()=>{
    // laptop.current.style.transform = "translateY(100px)";
    setIndex(1+index)
  }

  const handleWheel= (event)=>{
    if (event.deltaY < 0)
    {
      if(!isInTransition.current){
        setIndex(Math.max(index-1,0))
      }
    }
    else if (event.deltaY > 0)
    {
      if(!isInTransition.current){
        setIndex( Math.min(index+1,MaxPage))
      }
    }
  }
  const {foo} = useControls('home',{
        foo: button(() =>  testTransition()),
    })
    
  useEventListener('scroll',testTransition,Bg)
    useEventListener('transitionend',()=>{isInTransition.current = false},laptopOverlay)
  useEventListener('wheel', handleWheel,window);
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

  <div className='homeTitles'ref={titleCoding}>
    <h1 style ={{fontFamily: "OCRA"}}>coding_</h1>
  </div>
  <div className='homeTitles'ref={titleArt}>
  <h1 style ={{fontFamily: "Amatic"}}>~Art~</h1>
</div>
<div className='homeTitles'ref={titleWriting}>
<h1 style ={{fontFamily: "OLDENG"}}>Writing.</h1>
</div>
  </div>
</>)}