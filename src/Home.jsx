import { useRef,useState,useEffect,Suspense,useContext } from 'react'
import Svg_ShapeLaptop from './assets/svg/shape_laptop.svg'
import Svg_ShapeLaptopOverlay from './assets/svg/shape_laptop_overlay.svg'
import Svg_ShapeLaptopCenter from './assets/svg/shape_laptop_Center.svg'
import Svg_ShapeLaptopReflection from './assets/svg/shape_laptop_Reflection.svg'
import Svg_Avator from './assets/svg/avator.svg'
import { useEffectOnce, useWindowSize,useEventListener } from 'usehooks-ts'
import { useSwipeable } from 'react-swipeable'
import Svg_ShapeIconPhone from './assets/svg/shape_Icon_Phone.svg'
import Svg_ShapeIconEmail from './assets/svg/shape_Icon_Email.svg'
import Svg_ShapeIconWechat from './assets/svg/shape_Icon_Wechat.svg'
import { CursorContext } from './Contexts/Contexts'
import anime from 'animejs'
import {RandomAscii} from './Utils/MathUtils'
import { memo } from 'react'
import Logger from './Debug/Logger'

const IntroPage = 0;
const codingPage = 1;
const ArtPage = 2;
const WritingPage = 3;
const MaxPage = 3
const txtCoding = 'coding_'
const txtArt = "~Art~"
const txtWriting = "Writing."
const txtIntro = "Weihang Qin"
const easingFunc = "cubicBezier(.7,0,.29,.99)"
const cntntGreet = (<>  
  Hello there! You've hit my site. <br></br>
A game programmer with artsy inclinations, I post my work here, as well as random thoughts. <br></br> 
<br />
Well, mostly random thoughts.
</>)
////
  //#region split the titles for animation
  const cntntCoding = []
  const cntntArt = []
  const cntntWriting = []
  const cntntIntro = []
  txtCoding.split("").forEach((val,ind)=> {cntntCoding.push( <span key = {`coding${ind}`}>
    <a  style ={{fontFamily: "OCRA"}} className='codingLetters'>{val}</a>
    </span>)})
  txtArt.split("").forEach((val,ind)=> {cntntArt.push( <span key = {`art${ind}`}>
    <a  style ={{fontFamily: "Amatic"}} className='artLetters'>{val}</a>
    </span>)})
  txtWriting.split("").forEach((val,ind)=> {cntntWriting.push( <span key = {`writing${ind}`}>
  <a  style ={{fontFamily: "OLDENG"}} className='writingLetters'>{val}</a>
  </span>)})
  txtIntro.split("").forEach((val,ind)=> {cntntIntro.push( <span key = {`intro${ind}`}>
  <a  style ={{fontFamily: "Allison"}} className='introLetters'>{val}</a>
  </span>)})
  //#endregion

export default memo(function Home(){
  //#region states and refs
  const [index, setIndex] = useState(0);
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
  const homeIntro = useRef()
  const greetIntro = useRef()
  const codingCounter = useRef(0)
  const {width,height} = useWindowSize()
  const animCtrl_Transition = useRef(false)
  const animCtrl_Icon = useRef(false)
  const animCtrl_Avator = useRef(false)
  const cursor = useContext(CursorContext)
  //#endregion
  const PlayAvatorJump = ()=>{
    if(animCtrl_Avator.current){
      return
    }
    animCtrl_Avator.current = true
    anime.timeline({loop:false}).add({
      targets: "#Avator",
      translateY:[0,-0.8*width],
      scaleY: [1,1.3],
      scaleX: [1,0.7],
      easing:"easeOutExpo",
      duration: 400,
    }).add({
      targets: "#Avator",
      translateY:[-0.8*width,0],
      scaleX: [0.7,1],
      scaleY: [1.3,1],
      duration: 400,
      easing: 'easeOutBounce'
    }).add({
      targets: "#Avator_Eyes",
      opacity:[
        {value:1,duration:100},
        {value:0,duration:150},
        {value:1,duration:250},
        {value:0,duration:150},
        {value:1,duration:100},
      ],
      easing: "steps(1)",
      complete:()=>{
        animCtrl_Avator.current = false
      }
    })
  }
  const OnAvatorOver = ()=>{
    PlayAvatorJump()
  }
  useEffect(()=>{
    Logger.Warn('Home rerendered')
    if(index == IntroPage){
      anime.timeline({loop: false})
      .add({
        targets: '.homeIntro .line',
        opacity: [0.5,1],
        scaleX: [0, 1],
        translateY: [0,0],
        easing: "easeInOutExpo",
        duration: 700,
        delay:1500
      }).add({
        targets: '.homeIntro .line',
        duration: 600,
        easing: "easeOutExpo",
        translateY: (el, i) => (-0.12*width + 0.12*2*width*i) + "px"
      }).add({
        targets: greetIntro.current,
        opacity: [0,1],
        scaleY: [0, 1],
        easing: "easeOutQuad",
        duration: 600,
      },'-=600').add({
        targets: titleIntro.current,
        duration:2000,
        easing:"easeInOutQuad",
        opacity: [0,1],
      },"-=1200").add({
        targets: "#Avator",
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 500,
      },'-=1100')
      anime.timeline().add({
        targets: "#Avator",
        translateY:[0.4*width,-0.8*width],
        scaleY: [1,1.3],
        scaleX: [1,0.7],
        easing:"easeOutExpo",
        duration: 400,
        delay:2500,
      }).add({
        targets: "#Avator",
        translateY:[-0.8*width,0],
        scaleX: [0.7,1],
        scaleY: [1.3,1],
        duration: 400,
        easing: 'easeOutBounce'
      }).add({
        targets: "#Avator_Eyes",
        opacity:[
          {value:1,duration:100},
          {value:0,duration:150},
          {value:1,duration:250},
          {value:0,duration:150},
          {value:1,duration:100},
        ],
        easing: "steps(1)",
      })
    }

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
        animCtrl_Transition.current = false;
      }
    })
    anime({
      targets: homeIntro.current,
      translateY: (3*(-index+IntroPage)+0.0)*height,
      duration:2000,
      easing: easingFunc,
      loop: false,
    })
    //#region letters transition
    anime({
      targets: ".codingLetters",
      translateY: (-index+codingPage+0.5)*height-0.2*0.4*width,
      delay: (el, i) => 15* i*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: ".artLetters",
      translateY: (-index+ ArtPage+0.5)*height-0.2*0.4*width,
      delay: (el, i) => 15* i*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: ".writingLetters",
      translateY: (-index+ WritingPage+0.5)*height-0.2*0.4*width,
      delay: (el, i) => 15* i*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: '.introLetters',
      translateY: (-index+ IntroPage+0.5)*height-0.2*0.4*width,
      delay: (el, i) => 15* i*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
    //#endregion

    animCtrl_Transition.current = true
    
    Bg.current.style.fontSize = `${Math.ceil(width*40/1920)}px`
    homeIntro.current.style.top = `${0.5*height-0.10*width}px`
  })
  
  useEffectOnce(()=>{
    //hack to override the scale before anime
    anime({
      targets: "#Laptop_Overlay_Center",
      scale: 0.488,
      duration:10,
    })

    anime({
      targets: [laptop.current,laptopOverlay.current,titleCoding.current,titleArt.current,titleWriting.current],
      opacity: [-1,1],
      easing: 'steps(2)',
      duration: 8000,
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
    if(animCtrl_Icon.current){
      return
    }
    animCtrl_Icon.current = true
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
      complete: ()=>{animCtrl_Icon.current = false}
    })
    navigator.clipboard.writeText("(+1) 5513446880");
    const rect = iconPhone.current.getBoundingClientRect();
    hintCopy.current.style.top = `${rect.top}px`;
  }

  const OnPhoneEnter = ()=>{
    cursor.Focus.current()
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
    cursor.DeFocus.current();
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
    if(animCtrl_Icon.current){
      return
    }
    animCtrl_Icon.current = true
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
      complete: ()=>{animCtrl_Icon.current = false}
    })
    navigator.clipboard.writeText("qinweihang19988@outlook.com");
    const rect = iconEmail.current.getBoundingClientRect();
    hintCopy.current.style.top = `${rect.top}px`;
  }

  const OnEmailEnter = ()=>{
    cursor.Focus.current()
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
    cursor.DeFocus.current();
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
    if(animCtrl_Icon.current){
      return
    }
    animCtrl_Icon.current = true
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
      complete: ()=>{animCtrl_Icon.current = false}
    })
    navigator.clipboard.writeText("ID: QwertyQwh");
    const rect = iconWechat.current.getBoundingClientRect();
    hintCopy.current.style.top = `${rect.top}px`;
  }

  const OnWechatEnter = ()=>{
    cursor.Focus.current()
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
    cursor.DeFocus.current();
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
  // if(isInTransition.current){
  //   return
  // }
  cursor.Focus.current()
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
  // if(isInTransition.current){
  //   return
  // }
  cursor.DeFocus.current()
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
        duration:800,
        easing: 'easeInQuad'
      })
      break;
  }

}
//#endregion

//#region scrollEvents

  const handleWheel= (event)=>{
    if (event.deltaY < 0)
    {
      if(!animCtrl_Transition.current){
        if(index-1>=0){
          OnShapesLeave(index)
          setIndex(index-1,0)
        }
      }
    }
    else if (event.deltaY > 0)
    {
      if(!animCtrl_Transition.current){
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

  <span className='homeStripe' />
  <span className='_IntroSection'>
  <div className='homeShapes homeIntro' ref = {homeIntro}>
  <span className='avator' onMouseOver={OnAvatorOver}> <Svg_Avator /></span>
  <span ref = {greetIntro}>
  <a>
  {cntntGreet}
  </a>
  </span>
  <span className="line "></span>
  <span className="line "></span>
  </div>
  
  <div className='homeTitles' ref = {titleIntro} >
  {cntntIntro}
  </div>
  </span>
  <span className='_CodingSection'>
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
  <div className='homeTitles'ref={titleCoding} onMouseEnter={()=>OnTitlesEnter(1)}>
  {cntntCoding}
  </div>
  </span>

  
  <div className='homeTitles'ref={titleArt}>
  {cntntArt}
</div>
<div className='homeTitles'ref={titleWriting}>
{cntntWriting}
</div>
<span className='_IconSection'>
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
</span>

  <span className='homeDot' ref = {dot} />
  
  </div>
</div>)})