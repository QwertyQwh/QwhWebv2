import { useRef,useState,useEffect,Suspense,useContext } from 'react'
import Svg_ShapeLaptop from './assets/svg/shape_laptop.svg'
import Svg_ShapeLaptopOverlay from './assets/svg/shape_laptop_overlay.svg'
import Svg_ShapeLaptopCenter from './assets/svg/shape_laptop_Center.svg'
import Svg_ShapeLaptopReflection from './assets/svg/shape_laptop_Reflection.svg'
import { useEffectOnce, useWindowSize,useEventListener } from 'usehooks-ts'
import { useControls,button } from 'leva'
import { useSwipeable } from 'react-swipeable'
import Svg_ShapeIconPhone from './assets/svg/shape_Icon_Phone.svg'
import Svg_ShapeIconEmail from './assets/svg/shape_Icon_Email.svg'
import Svg_ShapeIconWechat from './assets/svg/shape_Icon_Wechat.svg'
import { CursorContext } from './Contexts/Contexts'
import anime, { easings } from 'animejs'
import {RandomAscii} from './Utils/MathUtils'
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
  //#region states and refs
  const [index, setIndex] = useState(1);
  const titleCoding = useRef()
  const titleArt = useRef()
  const titleWriting = useRef()
  const titleIntro = useRef()
  const iconEmail = useRef()
  const iconPhone = useRef()
  const iconWechat = useRef()
  const Bg = useRef()
  const laptop = useRef()
  const hintCopy = useRef()
  const laptopOverlay = useRef()
  const containerIcons = useRef()
  const dot = useRef()
  const codingCounter = useRef(0)
  const {width,height} = useWindowSize()
  const isInTransition = useRef(false)
  const isIconAnim = useRef(false)
  const cursor = useContext(CursorContext)
  //#endregion
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
    //hack to override the scale before anime
    anime({
      targets: "#Laptop_Overlay_Center",
      scale: 0.488,
      duration:10,
    })
    // anime.timeline({loop: true})
    // .add({
    //   targets: '.homeIntro .line',
    //   opacity: [0.5,1],
    //   scaleX: [0, 1],
    //   easing: "easeInOutExpo",
    //   duration: 700
    // }).add({
    //   targets: '.homeIntro .line',
    //   duration: 600,
    //   easing: "easeOutExpo",
    //   translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
    // })
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
    if(isIconAnim.current){
      return
    }
    isIconAnim.current = true
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
      complete: ()=>{isIconAnim.current = false}
    })
    navigator.clipboard.writeText("(+1) 5513446880");
    const rect = iconPhone.current.getBoundingClientRect();
    hintCopy.current.style.top = `${rect.top}px`;
  }

  const OnPhoneEnter = ()=>{
    cursor.Focus()
    anime({
      targets: iconPhone.current,
      width: '8vw',
      left: '-1vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
    anime({
      targets: containerIcons.current,
      top: '-1vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })

  }
  const OnPhoneLeave = ()=>{
    cursor.DeFocus();
    anime({
      targets: iconPhone.current,
      width: '6vw',
      left: '0vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
    anime({
      targets: containerIcons.current,
      top: '0vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
  }
  const OnEmailClicked = ()=>{
    if(isIconAnim.current){
      return
    }
    isIconAnim.current = true
    anime({
      targets: '.homeHintCopy',
      opacity: [0,1],
      easing: 'easeInOutQuad',
      duration: 1000,
      direction: 'alternate',
      loop: 2,
    })
    anime({
      targets: '#Email path',
      strokeDashoffset:  -113,
      easing: 'easeInOutQuad',
      duration: 1500,
      direction: 'alternate',
      loop: 2,
      complete: ()=>{isIconAnim.current = false}
    })
    navigator.clipboard.writeText("qinweihang19988@outlook.com");
    const rect = iconEmail.current.getBoundingClientRect();
    hintCopy.current.style.top = `${rect.top}px`;
  }

  const OnEmailEnter = ()=>{
    cursor.Focus()
    anime({
      targets: iconEmail.current,
      width: '8vw',
      left: '-1vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
    anime({
      targets: containerIcons.current,
      top: '-1vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
  }
  
  const OnEmailLeave = ()=>{
    cursor.DeFocus();
    anime({
      targets: iconEmail.current,
      width: '6vw',
      left: '0vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
    anime({
      targets: containerIcons.current,
      top: '0vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
  }
  const OnWechatClicked = ()=>{
    if(isIconAnim.current){
      return
    }
    isIconAnim.current = true
    anime({
      targets: '.homeHintCopy',
      opacity: [0,1],
      easing: 'easeInOutQuad',
      duration: 1000,
      direction: 'alternate',
      loop: 2,
    })
    anime({
      targets: '#Wechat path',
      strokeDashoffset:  -104,
      easing: 'easeInOutQuad',
      duration: 1500,
      direction: 'alternate',
      loop: 2,
      complete: ()=>{isIconAnim.current = false}
    })
    navigator.clipboard.writeText("ID: QwertyQwh");
    const rect = iconWechat.current.getBoundingClientRect();
    hintCopy.current.style.top = `${rect.top}px`;
  }

  const OnWechatEnter = ()=>{
    cursor.Focus()
    anime({
      targets: iconWechat.current,
      width: '8vw',
      left: '-1vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
    anime({
      targets: containerIcons.current,
      top: '-1vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
  }
  const OnWechatLeave = ()=>{
    cursor.DeFocus();
    anime({
      targets: iconWechat.current,
      width: '6vw',
      left: '0vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
    anime({
      targets: containerIcons.current,
      top: '0vh',
      duration: 1000,
      easing:'easeOutElastic(1, .6)'
    })
  }
  
//#endregion

//#region shapes events
const OnShapesEnter = (page)=>{
  if(isInTransition.current){
    return
  }
  cursor.Focus()
  switch (page) {
    case codingPage:
      anime({
        targets: "#Laptop_Overlay_Center",
        scale: 2,
        translateY:'3vh',
        duration:800,
      })
      break;
  }

}
const OnShapesLeave = (page)=>{
  if(isInTransition.current){
    return
  }
  cursor.DeFocus()
  switch (page) {
    case codingPage:
      anime({
        targets: "#Laptop_Overlay_Center",
        scale: 0.488,
        translateY:'0vh',
        duration:800,
      })
      break;
  }

}
const OnShapesClick = (page)=>{
  dot.current.style.top = '45%'
  dot.current.style.left = '55%'
  switch(page){
    case codingPage:
      anime({
        targets: ".homeDot",
        scale: [0,80],
        duration:1000,
        easing: 'easeInSine'
      })
      break;
  }

}
//#endregion

//#region scrollEvents

  const handleWheel= (event)=>{
    if (event.deltaY < 0)
    {
      if(!isInTransition.current){
        if(index-1>=0){
          OnShapesLeave(index)
          setIndex(index-1,0)
        }
      }
    }
    else if (event.deltaY > 0)
    {
      if(!isInTransition.current){
        if(index+1<=MaxPage){
          OnShapesLeave(index)
          setIndex(index+1)
        }
      }
    }
  }
    
  const handlers = useSwipeable({
    onSwipedUp: (eventData) => handleWheel({deltaY:1}),
    onSwipedDown: (eventData) => handleWheel({deltaY:-1}),
  });
  useEventListener('wheel', handleWheel,window);
  //#endregion

//#region title Events
const CodingInterval = ()=>{
  if(++codingCounter.current>txtCoding.length){
    clearInterval(CodingTimer)
    clearInterval(GlitchingTimer)
    GlitchingTimer = null
    CodingTimer = null
    codingCounter.current = 0
    return
  } 
}
const GlitchingInterval = ()=>{
  document.querySelectorAll(".codingLetters").forEach((elmt,id)=>{
    if(id>=codingCounter.current){
      elmt.textContent = RandomAscii()
    }else{
      elmt.textContent = txtCoding[id]
    }
  })
}
let CodingTimer = null
let GlitchingTimer = null
const OnTitleCodingEnter = ()=>{
    CodingTimer ??= setInterval(CodingInterval,150)
    GlitchingTimer ??= setInterval(GlitchingInterval,20);
}

const OnTitlesEnter = (page)=>{
  switch(page){
    case codingPage:
      OnTitleCodingEnter()
      break;
  }
}
//#endregion
  //TODO: SEPERATE LAYOVER INTO TWO SECTIONS
return (<div {...handlers}>

  <div  className='homeBg' ref = {Bg} >

  <span className='homeStripe' >
  </span>
  <div className='homeOverlays' ref = {laptopOverlay}>
  <span >
  <Svg_ShapeLaptopOverlay />
  </span>
  <span className='screen' >
  <Svg_ShapeLaptopCenter />
  </span>
  <span className='reflection' >
  <Svg_ShapeLaptopReflection />
  </span>
  </div>
  <div className='homeShapes' onMouseEnter={()=>OnShapesEnter(1)} onMouseLeave = {()=>OnShapesLeave(1)} onClick={()=>OnShapesClick(1)} ref = {laptop} >
  <Svg_ShapeLaptop />
  </div>
  <span className='homeShapes homeIntro'>
  <span className="line "></span>
  <span className="line "></span>
  </span>

  <div className='homeIntroTitle' ref = {titleIntro} >
  <h1 style ={{fontFamily: "Poiret"}}>Weihang Qin<br></br></h1>
  </div>
  <div className='homeTitles'ref={titleCoding} onMouseEnter={()=>OnTitlesEnter(1)}>
  {cntntCoding}
  </div>
  <div className='homeTitles'ref={titleArt}>
  {cntntArt}
</div>
<div className='homeTitles'ref={titleWriting}>
{cntntWriting}
</div>

  <div className='homeIconContainer' ref = {containerIcons}>
  <div className='homeIcons' onClick={OnEmailClicked} onMouseEnter={OnEmailEnter} onMouseLeave={OnEmailLeave} ref = {iconEmail}>
  <Svg_ShapeIconEmail />
  </div>
  <div className='homeIcons' onClick={OnPhoneClicked} onMouseEnter={OnPhoneEnter} onMouseLeave={OnPhoneLeave} ref = {iconPhone}>
  <Svg_ShapeIconPhone />
  </div>
  <div className='homeIcons' onClick={OnWechatClicked} onMouseEnter={OnWechatEnter} onMouseLeave={OnWechatLeave} ref = {iconWechat}>
  <Svg_ShapeIconWechat />
  </div>
  </div>
  <div className='homeHintCopy' ref = {hintCopy}>
  Copied!
  </div>

  <span className='homeDot' ref = {dot}></span>
  
  </div>
</div>)}