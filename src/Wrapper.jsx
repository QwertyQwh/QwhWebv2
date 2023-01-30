import { Outlet } from "react-router-dom";
import Logger from "./Debug/Logger";
import { useRef,useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { CursorContext,StickerContext } from "./Contexts/Contexts";
import Cursor from "./UI/Cursor";
import Sticker from './UI/Sticker'
import { Link } from "react-router-dom";
export default function Wrapper(){
    Logger.Warn("Wrapper rerendered")
//#region sticker
  const [stickerFunc, setstickerFunc] = useState();
  const stickerRef = useRef()
  
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
        <Outlet />
    <Sticker  ref = {stickerRef}/>
    <Cursor ref = {cursorRef}/>
    </CursorContext.Provider>
    </StickerContext.Provider>
</>
}