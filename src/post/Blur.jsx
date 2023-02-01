import BlurEffect from './BlurEffect'
import { forwardRef,useMemo } from "react";
export default forwardRef(function Blur(props,ref){
    const effect = useMemo(()=>new BlurEffect(props))
    return <primitive object={effect} ref = {ref}/>
})