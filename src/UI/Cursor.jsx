import { useRef,useEffect,forwardRef,memo,useImperativeHandle } from "react"
import { useEventListener, useInterval ,useEffectOnce} from "usehooks-ts";
import Logger from "../Debug/Logger";
import anime from "animejs";
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

export default memo( forwardRef( function Cursor(props,ref){
    Logger.Warn("mouse rerendered")
    const rimRef = useRef()
    const innerRef = useRef()
    const handleWindowMouseMove = e  => {
        mousePosition.x = e.clientX
        mousePosition.y = e.clientY
    };

    useEventListener('mousemove',handleWindowMouseMove)


    useInterval(()=>{
        rimRef.current.style.left = mousePosition.x + 'px';
        rimRef.current.style.top = mousePosition.y + 'px';
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
    },15)

    useEffectOnce(()=>{
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
    })

    useImperativeHandle(ref, () => {
        return {
          playFocus() {
            animationInnerFocus.play()
            animationRimFocus.play()
            animationWave.play()
            focusing = true
          },
          playDeFocus(){
            animationRimFocus.pause()
            animationRimFocus.seek(0)
            animationInnerDeFocus.play()
            animationRimDeFocus.play()
            animationWave.restart()
            animationWave.pause()
            focusing = false
          }
        };
      }, []);

    return <>
    <span ref={rimRef} id="cursorRim" >
    <span  id="cursorWave" />
        </span>
    <span ref= {innerRef} id="cursorInner" />

    </>
}))