import { OrbitControls } from "@react-three/drei"
import Cozy from "./Cozy"
import Pen from "./Pen"
import Light from "./Light"
import TestObject from "./TestObject"
import { Select } from "@react-three/postprocessing"
import { useRef } from "react"

export default function Stage(){
    return <>
        {/* <Light /> */}
        {/* <TestObject/> */}
        <Pen />
        {/* <Cozy /> */}
    </>
}