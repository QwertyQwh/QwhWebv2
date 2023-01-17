import StickerReleaser from "./StickerReleaser";
import { useContext } from "react";
import StickerContext from "../Contexts/StickerContext";

export default function TestObject(){
    const stick = useContext(StickerContext)
    console.log(stick)
    return <>
    <StickerReleaser >
        <mesh scale={1.5} position-x = {4} onClick = {stick}>
            <boxGeometry />
            <meshBasicMaterial color = 'blue'></meshBasicMaterial>
        </mesh>
    </StickerReleaser>
    </>
}