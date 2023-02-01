import PencilEffect from "./PencilEffect";
import { forwardRef,useMemo } from "react";
export default forwardRef(function Pencil(props,ref){
    const effect = useMemo(()=>new PencilEffect(props))
    return <primitive object={effect} ref = {ref}/>
})