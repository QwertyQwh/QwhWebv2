import { useRef,useState,useEffect,Suspense,useContext } from 'react'
import Svg_ShapeLaptop from './assets/svg/shape_laptop.svg'
import Svg_ShapeLaptopOverlay from './assets/svg/shape_laptop_overlay.svg'
import { useEffectOnce, useWindowSize,useEventListener } from 'usehooks-ts'
import { useControls,button } from 'leva'
import { useSwipeable } from 'react-swipeable'
import {HiOutlineMail} from 'react-icons/hi'
import Svg_ShapeIconPhone from './assets/svg/shape_Icon_Phone.svg'
import { CursorContext } from './Contexts/Contexts'
import anime, { easings } from 'animejs'
const IntroPage = 0;
const codingPage = 1;
const ArtPage = 2;
const WritingPage = 3;
const MaxPage = 3
const txtCoding = 'coding_'
const txtArt = "~Art~"
const txtWriting = "Writing."
const easingFunc = "cubicBezier(.7,0,.29,.99)"


export default function Home(){
  const [index, setIndex] = useState(0);
  const titleCoding = useRef()
  const titleArt = useRef()
  const titleWriting = useRef()
  const titleIntro = useRef()
  const iconEmail = useRef()
  const Bg = useRef()
  const laptop = useRef()
  const hintCopy = useRef()
  const laptopOverlay = useRef()
  const {width,height} = useWindowSize()
  const isInTransition = useRef(false)
  const cursor = useContext(CursorContext)
  //#region split the titles for animation
  const cntntCoding = []
  const cntntArt = []
  const cntntWriting = []
  txtCoding.split("").forEach((val,ind)=> {cntntCoding.push( <span key = {`coding${ind}`}>
    <a  style ={{fontFamily: "OCRA"}} className='codingLetters'>{val}</a>
    </span>)})
  txtArt.split("").forEach((val,ind)=> {cntntArt.push( <span key = {`art${ind}`}>
    <a  style ={{fontFamily: "Amatic"}} className='artLetters'>{val}</a>
    </span>)})
  txtWriting.split("").forEach((val,ind)=> {cntntWriting.push( <span key = {`writing${ind}`}>
  <a  style ={{fontFamily: "OLDENG"}} className='writingLetters'>{val}</a>
  </span>)})
  //#endregion
  useEffect(()=>{
    anime({
      targets: laptop.current,
      translateY: (3*(-index+codingPage)+0.5)*height-0.35*0.5*width,
      duration:2000,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: laptopOverlay.current,
      translateY: (3*(-index+codingPage)+0.5)*height-0.35*0.5*width-0.75*width,
      duration:4000,
      easing: easingFunc,
      loop: false,
      complete: function(anim) {
        isInTransition.current = false;
      }
    })
    //#region letters transition
    anime({
      targets: ".codingLetters",
      translateY: (-index+codingPage+0.5)*height-0.2*0.4*width-height,
      delay: (el, i) => 15* i*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: ".artLetters",
      translateY: (-index+ ArtPage+0.5)*height-0.2*0.4*width-height,
      delay: (el, i) => 15* i*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: ".writingLetters",
      translateY: (-index+ WritingPage+0.5)*height-0.2*0.4*width-height,
      delay: (el, i) => 15* i*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
    //#endregion
    anime({
      targets: titleIntro.current,
      translateY: (-index+ IntroPage+0.5)*height-0.2*0.4*width,
      duration:4000,
      easing: easingFunc,
      loop: false,
    })
    isInTransition.current = true
    
    Bg.current.style.fontSize = `${Math.ceil(width*40/1920)}px`
    
  })
  
  useEffectOnce(()=>{

    iconEmail.current.style.top = '10vh'
    anime({
      targets: '.homeIntroTitle',
      opacity: [0,1],
      easing: 'easeInExpo',
      duration: 4000,
      loop: false,
    });
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

//#region IconEvents
  const OnPhoneClicked = ()=>{
    anime({
      targets: '.homeHintCopy',
      opacity: [0,1],
      easing: 'easeInOutQuad',
      duration: 1000,
      direction: 'alternate',
      loop: 2,
    })
    anime({
      targets: '#Phone path',
      strokeDashoffset:  -71,
      easing: 'easeInOutQuad',
      duration: 1500,
      direction: 'alternate',
      loop: 2,
    })
    navigator.clipboard.writeText("(+1) 5513446880");
    hintCopy.current.style.top = '10vh';
  }

  const onPhoneEnter = ()=>{
    cursor.Focus()
  }
  const onPhoneLeave = ()=>{
    cursor.DeFocus();
  }
//#endregion

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
    
  const handlers = useSwipeable({
    onSwipedUp: (eventData) => handleWheel({deltaY:1}),
    onSwipedDown: (eventData) => handleWheel({deltaY:-1}),
  });
  

  useEventListener('transitionend',()=>{isInTransition.current = false},laptopOverlay)
  useEventListener('wheel', handleWheel,window);
return (<div {...handlers}>

  <div  className='homeBg' ref = {Bg} >

  <span className='homeStripe'>
  </span>
  <span className='homeOverlays' ref = {laptopOverlay}>
  <Svg_ShapeLaptopOverlay />
  </span>
  <span className='homeShapes' ref = {laptop}>
  <Svg_ShapeLaptop />
  </span>

  <div className='homeIntroTitle' ref = {titleIntro}>
  <h1 style ={{fontFamily: "Poiret"}}>Weihang Qin<br></br></h1>
  </div>
  <div className='homeTitles'ref={titleCoding}>
  {cntntCoding}
  </div>
  <div className='homeTitles'ref={titleArt}>
  {cntntArt}
</div>
<div className='homeTitles'ref={titleWriting}>
{cntntWriting}
</div>

  <div className='homeIcons' onClick={OnPhoneClicked} onMouseEnter={onPhoneEnter} onMouseLeave={onPhoneLeave} ref = {iconEmail}>
  <Svg_ShapeIconPhone />
  </div>

  <div className='homeHintCopy' ref = {hintCopy}>
  Copied!
  </div>

  
  </div>
</div>)}