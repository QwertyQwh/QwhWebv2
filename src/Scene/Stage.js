import { OrbitControls } from "@react-three/drei"
import Cozy from "./Cozy"
import Light from "./Light"


export default function Stage(){

    return <>
        <OrbitControls />
        <Light />
        <Cozy />
    </>
}