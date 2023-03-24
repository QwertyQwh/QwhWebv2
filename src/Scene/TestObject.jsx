import { useContext } from "react";
import {StickerContext,CursorContext} from "../Contexts/Contexts";
import Logger from "../Debug/Logger";
export default function TestObject(){
    Logger.Warn("TestObject rerendering")
    const stick = useContext(StickerContext)
    const focus = useContext(CursorContext)
    return <>
        <mesh scale={1.5} position-x = {4} onClick = {()=>{stick(0)}} onPointerOver = {focus.Focus} onPointerOut = {focus.DeFocus}>
            <boxGeometry />
            <meshBasicMaterial color = 'blue'></meshBasicMaterial>
        </mesh>
    </>
}