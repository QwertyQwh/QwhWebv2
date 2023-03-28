import { Outlet } from "react-router-dom";
import Logger from "./Debug/Logger";
import { useRef,useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { CursorContext,StickerContext,DeviceContext } from "./Contexts/Contexts";
import Cursor from "./UI/Cursor";
import Sticker from './UI/Sticker'
import { Link } from "react-router-dom";
export default function Wrapper(){
    Logger.Warn("Wrapper rerendered")
//#region sticker
  const [stickerFunc, setstickerFunc] = useState();
  const stickerRef = useRef()
  const { innerWidth: width, innerHeight:height } = window;
  console.log(width,height)

  useEffectOnce(()=>{
    setstickerFunc(()=>(index)=>{stickerRef.current.playAnimation(index)})
  })
//#endregion
//#region  cursor
  const cursorRef = useRef()
  const [cursorFocus, setcursorFocus] = useState();
  const [cursorDeFocus, setcursorDeFocus] = useState();
  useEffectOnce(()=>{
    setcursorFocus(()=>()=>{cursorRef.current.playFocus()})
    setcursorDeFocus(()=>()=>{cursorRef.current.playDeFocus()})
  })
//#endregion
    return <>
    <StickerContext.Provider value = {stickerFunc}>
    <CursorContext.Provider value = {{Focus:cursorFocus,DeFocus: cursorDeFocus}}>
    <DeviceContext.Provider value = {width<height? "mobile":"console"}>
        <Outlet />
    <Sticker  ref = {stickerRef}/>
    <Cursor ref = {cursorRef}/>
    </DeviceContext.Provider>
    </CursorContext.Provider>
    </StickerContext.Provider>

</>
}