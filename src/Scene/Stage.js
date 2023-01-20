import { OrbitControls } from "@react-three/drei"
import Cozy from "./Cozy"
import Light from "./Light"
import TestObject from "./TestObject"

export default function Stage(){

    return <>
        <OrbitControls />
        <Light />
      <TestObject/>
        {/* <Cozy /> */}
    </>
}