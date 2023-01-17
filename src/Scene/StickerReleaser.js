import { useEffect } from "react";
import { meshBounds } from "@react-three/drei";
export default function StickerReleaser({children}){
    useEffect(() => {
        // console.log(children)
        // console.log(children.props.onClick )
    });
    return <>
    {children}
    </>
}