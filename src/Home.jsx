import { useRef,useState,useEffect,Suspense,useContext } from 'react'
import Svg_ShapeLaptop from './assets/svg/shape_laptop.svg'
import Svg_ShapeLaptopOverlay from './assets/svg/shape_laptop_overlay.svg'
import Svg_ShapeLaptopCenter from './assets/svg/shape_laptop_Center.svg'
import Svg_ShapeLaptopReflection from './assets/svg/shape_laptop_Reflection.svg'
import Svg_ShapeWritingBook from './assets/svg/shape_writing_book.svg'
import Svg_ShapeWritingOverlay from './assets/svg/shape_writing_overlay.svg'

import Svg_Avator from './assets/svg/avator.svg'
import Svg_ScrollDown from './assets/svg/scrollDown.svg'
import { useEffectOnce, useWindowSize,useEventListener, useInterval } from 'usehooks-ts'
import { useSwipeable } from 'react-swipeable'
import Svg_ShapeIconPhone from './assets/svg/shape_Icon_Phone.svg'
import Svg_ShapeIconEmail from './assets/svg/shape_Icon_Email.svg'
import Svg_ShapeIconWechat from './assets/svg/shape_Icon_Wechat.svg'
import { CursorContext } from './Contexts/Contexts'
import anime from 'animejs'
import {RandomAscii} from './Utils/MathUtils'
import { memo } from 'react'
import Logger from './Debug/Logger'
import { randInt } from 'three/src/math/MathUtils'

const IntroPage = 0;
const codingPage = 1;
const artPage = 2;
const writingPage = 3;
const MaxPage = 3
const txtCoding = 'coding_'
const txtArt = "~Art~"
const txtWriting = "Writing "
const txtWritingSuffix = ", with a pen."
const txtIntro = "Weihang Qin"
const txtWritingBook = "Once-Upon-A-Time..." // The - symbol is a hack to prevent the space from disappearing when setting display to inline-block
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
  const cntntWritingBook = []
  txtCoding.split("").forEach((val,ind)=> {cntntCoding.push( <span key = {`coding_${ind}`}>
    <a  style ={{fontFamily: "OCRA"}} className='codingLetters'>{val}</a>
    </span>)})
  txtArt.split("").forEach((val,ind)=> {cntntArt.push( <span key = {`art_${ind}`}>
    <a  style ={{fontFamily: "Amatic"}} className='artLetters'>{val}</a>
    </span>)})
  txtWriting.split("").forEach((val,ind)=> {cntntWriting.push( <span key = {`writing_${ind}`}>
  <a  style ={{fontFamily: "OLDENG"}} className='writingLetters'>{val}</a>
  </span>)})
  txtIntro.split("").forEach((val,ind)=> {cntntIntro.push( <span key = {`intro_${ind}`}>
  <a  style ={{fontFamily: "Allison"}} className='introLetters'>{val}</a>
  </span>)})
  txtWritingBook.split("").forEach((val,ind)=> {cntntWritingBook.push( <span key = {`writingBook_${ind}`} className='writingBookLetters' id = {`writingBook_${ind}`} style = {{display:"inline-block"}}>
  <a  style ={{fontFamily: "Joker"}} className='writingBookLettersText'>{val}</a>
  </span>)})

  //#endregion

export default memo(function Home(){
  //#region states and refs
  const [index, setIndex] = useState(-1);
  const titleCoding = useRef()
  const titleArt = useRef()
  const titleWriting = useRef()
  const titleIntro = useRef()
  const iconEmail = useRef()
  const iconPhone = useRef()
  const iconWechat = useRef()
  const Bg = useRef()
  const laptop = useRef()
  const writingBook = useRef()
  const writingOverlay = useRef()
  const writingBookText = useRef()
  const writingBookOverlayText = useRef()
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
  //#region Animations
  const PlayGlobalFadeIn = ()=>{
    anime({
      targets: [laptop.current,laptopOverlay.current,titleCoding.current,titleArt.current,titleWriting.current],
      opacity: [-1,1],
      easing: 'steps(2)',
      duration: 8000,
      loop: false,
    });
  }
  const PlayAvatorJump = ()=>{
    if(animCtrl_Avator.current){
      return
    }
    animCtrl_Avator.current = true
    anime.timeline({loop:false}).add({
      targets: "#Avator",
      translateY:[0,0.05*width],
      scaleY: [1,0.7],
      scaleX: [1,1.4],
      duration: 300,
      easing:"easeOutExpo"
    }).add({
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
  const PlayAvatorBlinkLoop = ()=>{
    anime({
      targets: "#Avator_Eyes",
      opacity:[
        {value:1,duration:2000},
        {value:0,duration:150},
        {value:1,duration:250},
        {value:0,duration:150},
        {value:1,duration:2000},
      ],
      easing: "steps(1)",
      loop:true,
    })
  }
  const PlayIntroFadeIn = ()=>{
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
  const PlayCodingTransition = ()=>{
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
      targets: ".codingLetters",
      translateY: (-index+codingPage+0.5)*height-0.2*0.4*width,
      delay: (el, i) => 150*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
  }
  const PlayWritingTransition = ()=>{
    anime({
      targets: writingOverlay.current,
      translateY: (3*(-index+writingPage)+0.5)*height+0.2*0.5*width-0.0*width,
      duration:4000,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: writingBook.current,
      translateY: (3*(-index+writingPage)+0.5)*height+0.2*0.5*width,
      duration:2000,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: [writingBookText.current,writingBookOverlayText.current],
      translateY: (3*(-index+writingPage)+0.5)*height-0.3*0.5*width,
      duration:2000,
      easing: easingFunc,
      loop: false,
    })
    anime({
      targets: ".writingLetters",
      translateY: (-index+ writingPage+0.5)*height-0.2*0.4*width,
      delay: (el, i) => 150* i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })
  }
  const PlayIntroTransition = ()=>{
    anime({
      targets: homeIntro.current,
      translateY: (3*(-index+IntroPage)+0.0)*height,
      duration:2000,
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
  }
  const PlayCodingCoffeSteamLoop = ()=>{
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
  }
  const writingBookLettersConvergeDuration = 1000
  const PlayWritingBookLettersConverge = ()=>{
    anime({
      targets: ".homeShapes .writingBookLetters",
      translateX: 0,
      translateY: 0,
      scale: 1,
      duration :writingBookLettersConvergeDuration,
      easing: "easeOutCubic",
    })
    anime({
      targets: ['.homeShapes #writingBook_16','.homeShapes #writingBook_17','.homeShapes #writingBook_18'],
      opacity:1,
      duration:writingBookLettersConvergeDuration,
      easing: "easeOutCubic",
    })
  }
  const writingBookLettersScatterAnim = useRef(anime({
    targets: ".homeShapes #writingBook_16",
    opacity:[0,0],
    duration:1,
  }))
  const PlayWritingBookLettersScatter = ()=>{
    writingBookLettersScatterAnim.current = anime({
      targets: ".homeShapes #writingBook_0",
      translateX: 3,
      translateY: -1.5,
      scale: 2.2,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
      complete: ()=>writingBookLettersLoopAnims.current.forEach((elmt,id)=>{elmt.restart()})
    })
    anime({
      targets: ".homeShapes #writingBook_1",
      translateX: 8,
      translateY: 2,
      scale: 0.7,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_2",
      translateX: 3,
      translateY: 2.5,
      scale: 1.6,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_3",
      translateX: 3.6,
      translateY: -1.5,
      scale: 0.8,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_5",
      translateX: 2.5,
      translateY: 0.9,
      scale: 2.4,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_6",
      translateX: 2.5,
      translateY: 2.5,
      scale: 1,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_7",
      translateX: 4,
      translateY: 0.5,
      scale: 1,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_8",
      translateX: -4,
      translateY: -1.2,
      scale: 1.5,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_10",
      translateX: -4.8,
      translateY: 1,
      scale: 1.5,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_12",
      translateX: 1.2,
      translateY: -1,
      scale: 1.7,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_13",
      translateX: -5.1,
      translateY: 1,
      scale: 0.8,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_14",
      translateX: -1.5,
      translateY: -1.1,
      scale: 1.2,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ".homeShapes #writingBook_15",
      translateX: -4.8,
      translateY: 0,
      scale: 1.2,
      duration :writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
    anime({
      targets: ['.homeShapes #writingBook_16','.homeShapes #writingBook_17','.homeShapes #writingBook_18'],
      opacity:0,
      duration:writingBookLettersConvergeDuration,
      easing: "easeInOutSine",
    })
  }
  const writingBookLettersLoopAnims = useRef([])
  const PlayWritingBookLettersLoop = ()=>{
    for (let i = 0; i < txtWritingBook.length; i++) {
      writingBookLettersLoopAnims.current.push(anime({
        targets:  `.homeShapes #writingBook_${i}` ,
        translateY: '-=0.5',
        duration : 2000+randInt(-1000,1000),
        easing: "easeInOutSine",
        direction: 'alternate',
        loop:true
      }))
    }
  }
  const dotdotdotLoop = useRef()
  const PlayDotDotDotLoop = ()=>{
    dotdotdotLoop.current = anime.timeline({loop:true,duration:600}).add({
      targets: '.homeShapes #writingBook_16',
      opacity: [1,0,1],
      easing: 'steps(1)',
    }).add({
      targets: '.homeShapes #writingBook_17',
      opacity: [1,0,1],
      easing: 'steps(1)',
    },"-=300").add({
      targets: '.homeShapes #writingBook_18',
      opacity: [1,0,1],
      easing: 'steps(1)',
      endDelay: -200
    },"-=300")
    dotdotdotLoop.current.pause()
  }
  let scrollDownTimer = null
  const PlayScrollDownLoop = ()=>{
    anime.timeline({targets:".scrollDown",loop:true}).add({
      opacity:[0,1,0],
      bottom: ['6vh',0],
      duration:2000,
      easing: 'easeInOutQuad'
    })
  }
  const PlayWritingBookOverlayTextFadeIn = ()=>{
    anime({
      targets: writingBookOverlayText.current,
      opacity:1,
      duration:1000,
      easing: 'easeInSine'
    })
  }
  const PlayWritingBookOverlayTextFadeOut = ()=>{
    anime({
      targets: writingBookOverlayText.current,
      opacity:0,
      duration:1000,
      easing: 'easeOutSine'
    })
  }
  //#endregion
  useEffect(()=>{
    Logger.Warn('Home rerendered')
    if(index == IntroPage){
      PlayIntroFadeIn()
      scrollDownTimer = setTimeout(() => {
         anime({
          targets: "#Scroll_Down",
          duration: 500,
          easing: 'linear',
          opacity:1,
         })
      }, 3500);
    }else{
      clearTimeout(scrollDownTimer)
    }
    PlayCodingTransition()
    PlayWritingTransition()
    PlayIntroTransition()
    //#region letters transition

    anime({
      targets: ".artLetters",
      translateY: (-index+ artPage+0.5)*height-0.2*0.4*width,
      delay: (el, i) => 150*i,
      duration:3500,
      easing: easingFunc,
      loop: false,
    })


    //#endregion

    animCtrl_Transition.current = true
    
  })
  useEffect(()=>{
    document.querySelector("#Scroll_Down").style.opacity = 0
  },[index])
  useEffect(()=>{
    Bg.current.style.fontSize = `${Math.ceil(width*40/1920)}px`
    homeIntro.current.style.top = `${0.5*height-0.10*width}px`
    writingBookText.current.style.fontSize = `${0.035*width}px`
    writingBookOverlayText.current.style.fontSize = `${0.035*width}px`
    writingBookText.current.style.color = "#cd522f"
    writingBookOverlayText.current.style.color = "#EADCC2"
    //The initial position of writing book letters
    document.querySelector(".homeShapes #writingBook_0").style.transform = 'translateX(3em) translateY(-1.5em) scale(2.2)'
    document.querySelector(".homeShapes #writingBook_1").style.transform = 'translateX(8em) translateY(2em) scale(0.7)'
    document.querySelector(".homeShapes #writingBook_2").style.transform = 'translateX(3em) translateY(2.5em) scale(1.6)'
    document.querySelector(".homeShapes #writingBook_3").style.transform = 'translateX(3.6em) translateY(-1.5em) scale(0.8)'
    document.querySelector(".homeShapes #writingBook_5").style.transform = 'translateX(2.5em) translateY(0.9em) scale(2.4)'
    document.querySelector(".homeShapes #writingBook_6").style.transform = 'translateX(2.5em) translateY(2.5em) scale(1)'
    document.querySelector(".homeShapes #writingBook_7").style.transform = 'translateX(4em) translateY(0.5em) scale(1)'
    document.querySelector(".homeShapes #writingBook_8").style.transform = 'translateX(-4em) translateY(-1.2em) scale(1.5)'
    document.querySelector(".homeShapes #writingBook_10").style.transform = 'translateX(-4.8em) translateY(1em) scale(1.5)'
    document.querySelector(".homeShapes #writingBook_12").style.transform = 'translateX(1.2em) translateY(-1em) scale(1.7)'
    document.querySelector(".homeShapes #writingBook_13").style.transform = 'translateX(-5.1em) translateY(1em) scale(0.8)'
    document.querySelector(".homeShapes #writingBook_14").style.transform = 'translateX(-1.5em) translateY(-1.1em) scale(1.2)'
    document.querySelector(".homeShapes #writingBook_15").style.transform = 'translateX(-4.8em) translateY(0em) scale(1.2)'
    document.querySelector(".homeShapes #writingBook_16").style.opacity = 0
    document.querySelector(".homeShapes #writingBook_17").style.opacity = 0
    document.querySelector(".homeShapes #writingBook_18").style.opacity = 0
    document.querySelectorAll("#writingBook_4").forEach((elmt)=>{elmt.style.opacity = 0})
    document.querySelectorAll("#writingBook_9").forEach((elmt)=>{elmt.style.opacity = 0})
    document.querySelectorAll("#writingBook_11").forEach((elmt)=>{elmt.style.opacity = 0})
  },[width,height])

  useEffectOnce(()=>{
    //hack to override the scale before anime
    document.querySelector("#Laptop_Overlay_Center").style.transform = "scale(0.488)"
    document.querySelector(".scrollDown").style.opacity = 0
    writingBookOverlayText.current.style.opacity = 0
    PlayCodingCoffeSteamLoop()
    PlayGlobalFadeIn()
    PlayAvatorBlinkLoop()
    PlayScrollDownLoop()
    PlayWritingBookLettersLoop()
    PlayDotDotDotLoop()
    setIndex(3)
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
const OnAvatorOver = ()=>{
  PlayAvatorJump()
}

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
    case writingPage:
      PlayWritingBookOverlayTextFadeIn()
      PlayWritingBookLettersConverge()
      writingBookLettersScatterAnim.current.complete = null
      writingBookLettersLoopAnims.current.forEach((elmt,id)=>{elmt.pause()})
      dotdotdotLoop.current.play()
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
    case writingPage:
      PlayWritingBookOverlayTextFadeOut()
      writingBookLettersScatterAnim.current.complete = null
      PlayWritingBookLettersScatter()
      dotdotdotLoop.current.pause()
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
let writingTimer = null
let writingSuffixCounter = 0
let writingSuffixDir = 1
const onTitleWriting = ()=>{
  console.log(writingTimer)
  writingTimer ??= setInterval(() => {
    writingSuffixCounter+=writingSuffixDir
    if(writingSuffixCounter == -1){
      writingSuffixDir *= -1
      writingSuffixCounter++
      clearInterval(writingTimer)
      writingTimer = null
      return;
    }
    if(writingSuffixCounter>txtWritingSuffix.length){
      writingSuffixDir*= -1
    }
    document.querySelector("#writingTitleSuffix").textContent = txtWritingSuffix.substring(0, writingSuffixCounter)
  }, 100);
}

const OnTitlesEnter = (page)=>{
  switch(page){
    case codingPage:
      OnTitleCodingEnter()
      break;
    case writingPage:
      onTitleWriting();
      break;
  }
}
//#endregion


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
  <span className='scrollDown' > <Svg_ScrollDown /></span>
  
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
  <div className='homeShapes' onMouseEnter={()=>OnShapesEnter(codingPage)} onMouseLeave = {()=>OnShapesLeave(codingPage)} onClick={()=>OnShapesClick(codingPage)} ref = {laptop} >
  <Svg_ShapeLaptop />
  </div>
  <div className='homeTitles'ref={titleCoding} onMouseEnter={()=>OnTitlesEnter(codingPage)}>
  {cntntCoding}
  </div>
  </span>
  <span className='_WritingSection'>
  <div className='homeOverlays' ref = {writingOverlay}>
  <span >
  <Svg_ShapeWritingOverlay />
  </span>
  </div>
  <div className='homeOverlays' ref = {writingBookOverlayText}>
  {cntntWritingBook}
  </div>
  <div className='homeShapes'  ref = {writingBookText} >
  {cntntWritingBook}
  </div>
  <div className='homeShapes' ref={writingBook} onMouseEnter={()=>OnShapesEnter(writingPage)} onMouseLeave = {()=>OnShapesLeave(writingPage)}>
  <Svg_ShapeWritingBook />
  </div>
  <div className='homeTitles' ref={titleWriting} onMouseEnter={()=>OnTitlesEnter(writingPage)}>
  {cntntWriting}
  <span >
  <a id = "writingTitleSuffix" style ={{fontFamily: "OLDENG"}} className='writingLetters'></a>
  </span>
  </div>
  </span>
  

  <div className='homeTitles'ref={titleArt}>
  {cntntArt}
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