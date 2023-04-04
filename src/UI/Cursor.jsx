import { useRef,useEffect,forwardRef,memo,useImperativeHandle, useState } from "react"
import { useEventListener, useInterval ,useEffectOnce} from "usehooks-ts";
import Logger from "../Debug/Logger";
import anime from "animejs";

import CursorBackground from '../assets/svg/cursorBackground.svg'
import Spell from '../assets/svg/spell.svg'
import { useControls } from "leva";
import { button } from "leva";

const mousePosition = {x :800,y:400}
const trailPosition = {x :800,y:400}
let animationWave = null
let animationRimFocus = null
let animationRimDeFocus = null
let animationInnerFocus = null
let animationInnerDeFocus = null
let focusing = false
const paletteDefault = 'hsl(53, 57%, 68%)'
const paletteLight = 'hsl(53, 57%, 88%)'

export default forwardRef( function Cursor(props,ref){
    Logger.Warn("mouse rerendered")
    //0: circle cursor
    //1: tibet cursor
    const [cursorStyle, setcursorStyle] = useState(1);
    const {foo} = useControls('cursor',{
        foo: button(() => setcursorStyle(1-cursorStyle)),
    })
    // cursor 0 
    const rimRef = useRef()
    const innerRef = useRef()

    //cursor1 
    const cursorRef = useRef()
    const spellRef = useRef();
    const cursorCircleRef = useRef();


    const handleWindowMouseMove = e  => {
        mousePosition.x = e.clientX
        mousePosition.y = e.clientY
        rimRef.current.style.left = mousePosition.x + 'px';
        rimRef.current.style.top = mousePosition.y + 'px';
        cursorRef.current.style.top = mousePosition.y + 'px';
        cursorRef.current.style.left = mousePosition.x + 'px';
    };
    
    const playAnimationFocus = () =>{
        if(cursorStyle == 0){
            animationInnerFocus.play()
            animationRimFocus.play()
            animationWave.play()
            return
        }
        if(cursorStyle == 1){
            cursorRef.current.style.transform = ` translate(-50%, -50%) scale(${3})`;
            spellRef.current.style.transform = ` translate(-50%, -50%) scale(${3})`;

            cursorCircleRef.current.style.opacity = 0;
            return
        }
    }
    
    const playAnimationDeFocus = () =>{
        if(cursorStyle == 0){
            animationRimFocus.pause()
            animationRimFocus.seek(0)
            animationInnerDeFocus.play()
            animationRimDeFocus.play()
            animationWave.restart()
            animationWave.pause()
            return;
        }
        if(cursorStyle == 1){
            cursorRef.current.style.transform = ` translate(-50%, -50%) scale(${1})`;
            spellRef.current.style.transform = ` translate(-50%, -50%) scale(${1})`;
            cursorCircleRef.current.style.opacity = 1;
            return
        }
    }

    useEventListener('mousemove',handleWindowMouseMove,[])

    useInterval(()=>{
        //cursor 0
        if(cursorStyle == 0){
            if(Math.abs(mousePosition.x-trailPosition.x)+Math.abs(mousePosition.y-trailPosition.y)>0.1){
                if(rimRef.current.style.opacity <1){
                    rimRef.current.style.opacity =1 
                }
                trailPosition.x += 0.08*(mousePosition.x-trailPosition.x);
                trailPosition.y += 0.08*(mousePosition.y-trailPosition.y)
            }else{
                if(!focusing)
                rimRef.current.style.opacity = 0
            }
            innerRef.current.style.left = trailPosition.x +'px';
            innerRef.current.style.top = trailPosition.y+'px'
            return;
        }   
        //cursor 1
        if(cursorStyle == 1){
          if(Math.abs(mousePosition.x-trailPosition.x)+Math.abs(mousePosition.y-trailPosition.y)>0.1){
              trailPosition.x += 0.08*(mousePosition.x-trailPosition.x);
              trailPosition.y += 0.08*(mousePosition.y-trailPosition.y)
              spellRef.current.style.top = trailPosition.y+'px'
              spellRef.current.style.left = trailPosition.x +'px';
            }
      }
    },15)

    useEffectOnce(()=>{
        //cursor 0 
        animationWave = anime.timeline({
            targets: '#cursorWave',
            autoplay: false,
            loop:false,
        }).add({
            width: ['10pt','10pt'],
            height : ['10pt','10pt'],
            opacity: [0,0],
            duration: 500, 
        }).add({
            width: ['10pt','100pt'],
            height : ['10pt','100pt'],
            opacity: [1,0],
            duration:800, 
            easing: 'easeInOutSine',
            complete: function(anim){
                anim.seek(400)
                anim.play()
            }
        })
        animationRimDeFocus = anime({
            targets: '#cursorRim',
            border: [`4pt solid ${paletteLight}`, `2pt solid	${paletteDefault}`],
            height: ['5pt', '10pt'],
            width : ['5pt', '10pt'],
            duration:300,
            autoplay: false,
            loop:false,
            easing: 'easeInOutSine'
        })
        animationRimFocus = anime({
            targets: '#cursorRim',
            border: [`2pt solid	${paletteDefault}`, `4pt solid ${paletteLight}`],
            height: ['10pt', '0pt'],
            width :['10pt', '0pt'],
            duration:400,
            autoplay: false,
            loop:true,
            direction: 'alternate',
            easing: 'easeInSine'
        })
        animationInnerDeFocus = anime({
            targets: '#cursorInner',
            width :['3pt','5pt'],
            height:['3pt','5pt'],   
            opacity :[0,1],     
            duration:300,
            autoplay: false,
            loop:false,
            easing: 'easeInOutSine'
        })
        animationInnerFocus = anime({
            targets: '#cursorInner',
            width :['5pt','3pt'],
            height:['5pt','3pt'],         
            opacity :[1,0],     
            duration:300,
            autoplay: false,
            loop:false,
            easing: 'easeInOutSine'
        })
        animationWave.seek(0)


        //cursor 1
        anime({
            targets: '#cursorLines',
            rotate: '1turn',
            duration: 8000,
            loop: true,
            easing: "linear"
        }) 
        anime({
          targets: '#cursorLine',
          rotate :{
            value: -720,
          },
          duration: 5000,
          loop: true,
          easing: "linear"
      }) 
      var tl = anime.timeline({
        easing: 'easeInExpo',
        loop:true
      });
      tl
      .add({
          targets: '#om',
          opacity: [
            { value: 1, duration: 100},
            { value: 0, duration: 700},
          ],
      })
      .add({
        targets: '#ma',
        opacity: [
          { value: 1, duration: 100},
          { value: 0, duration: 700},
        ],
      })
      .add({
        targets: '#ni',
        opacity: [
          { value: 1, duration: 100},
          { value: 0, duration: 700},
        ],
      })
      .add({
        targets: '#pem',
        opacity: [
          { value: 1, duration: 100},
          { value: 0, duration: 700},
        ],
      })
      .add({
        targets: '#me',
        opacity: [
          { value: 1, duration: 100},
          { value: 0, duration: 700},
        ],
      })
      .add({
        targets: '#hum',
        opacity: [
          { value: 1, duration: 100},
          { value: 0, duration: 700},
        ],
      })
    })
    
    useImperativeHandle(ref, () => {
        return {
          playFocus() {
            playAnimationFocus()
            focusing = true
          },
          playDeFocus(){
            playAnimationDeFocus()
            focusing = false
          },
          setStyle(index){
            setcursorStyle(index);
          }
        };
      }, [cursorStyle]);

    return <>
    {/* Normal cursor =  0 */}
    <div style = {{display: cursorStyle == 0?"block": "none"}}>
    <span ref={rimRef} id="cursorRim" >
    <span  id="cursorWave" />
    </span>
    <span ref= {innerRef} id="cursorInner" />
    </div>

    {/* Tibet Cursor = 1 */}
    <div style = {{display: cursorStyle == 1?"block": "none"}}>
        <div id = "cursor" ref = {cursorRef} >
        <svg id = 'cursorCircle' ref = {cursorCircleRef} viewBox="0 0 846.4 846.4">
          <circle  cx="423.2" cy="423.2" r="423.2"/>
        </svg>
        <CursorBackground />
        </div>
        <div id = 'spell' ref = {spellRef} >
        <Spell></Spell>
        </div>
    </div>
     

    </>
})