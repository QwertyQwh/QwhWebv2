import { Outlet } from "react-router-dom";
import Logger from "./Debug/Logger";
import { useRef,useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { CursorContext,StickerContext,DeviceContext,TransitionCircleContext } from "./Contexts/Contexts";
import Cursor from "./UI/Cursor";
import Sticker from './UI/Sticker'
import { Link } from "react-router-dom";
import { MobileCheck } from "./Utils/Utils";
import TransitionCircle from "./UI/TransitionCircle";
export default function Wrapper(){
    Logger.Warn("Wrapper rerendered")
//#region sticker
  // const stickerFunc = useRef()
  // const stickerRef = useRef()
  // const { innerWidth: width, innerHeight:height } = window;
  // useEffectOnce(()=>{
  //   stickerFunc.current = stickerRef.current.playAnimation
  // })
//#endregion
//#region  cursor
  const cursorRef = useRef()
  const cursorFocus = useRef();
  const cursorDeFocus = useRef();
  const cursorReset = useRef();

  useEffectOnce(()=>{
    cursorFocus.current = cursorRef.current.playFocus
    cursorDeFocus.current = cursorRef.current.playDeFocus
    cursorReset.current = cursorRef.current.reset
  })
//#endregion

//#region TransitionCircle
const transitionCirclePlay = useRef();
const transitionCircleRef = useRef();
useEffectOnce(()=>{
  transitionCirclePlay.current = transitionCircleRef.current.playSwell
})
//#endregion
    return <>
    <TransitionCircleContext.Provider value = {{PlayTransition:transitionCirclePlay} }>
    <CursorContext.Provider value = {{Focus:cursorFocus,DeFocus: cursorDeFocus,Reset:cursorReset}}>
    <DeviceContext.Provider value = {MobileCheck()? "mobile":"console"}>
        <Outlet />
    <Cursor ref = {cursorRef}/>
    <TransitionCircle ref = {transitionCircleRef}/>
    </DeviceContext.Provider>
    </CursorContext.Provider>
    </TransitionCircleContext.Provider>
</>
}