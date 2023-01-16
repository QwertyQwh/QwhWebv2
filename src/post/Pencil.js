import PencilEffect from "./PencilEffect";
import { forwardRef } from "react";
export default forwardRef(function Pencil(props,ref){
    const effect = new PencilEffect(props)
    return <primitive object={effect} ref = {ref}/>
})