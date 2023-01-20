import { useContext } from "react";
import {StickerContext,CursorContext} from "../Contexts/Contexts";

export default function TestObject(){
    const stick = useContext(StickerContext)
    const focus = useContext(CursorContext)
    return <>
        <mesh scale={1.5} position-x = {4} onClick = {()=>{stick(0)}} onPointerOver = {focus.Focus} onPointerOut = {focus.DeFocus}>
            <boxGeometry />
            <meshBasicMaterial color = 'blue'></meshBasicMaterial>
        </mesh>
    </>
}