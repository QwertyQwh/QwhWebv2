import { useContext } from "react";
import StickerContext from "../Contexts/StickerContext";

export default function TestObject(){
    const stick = useContext(StickerContext)
    return <>
        <mesh scale={1.5} position-x = {4} onClick = {()=>{stick(0)}}>
            <boxGeometry />
            <meshBasicMaterial color = 'blue'></meshBasicMaterial>
        </mesh>
    </>
}