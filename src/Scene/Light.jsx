import { useControls } from "leva"

export default function Light(){
    
  const {ambientIntensity,ambientColor} = useControls('light',{
    ambientIntensity: 10,
    ambientColor : "hsl(40,10%,50%)"
  })
    return <>
        <ambientLight castShadow = {false} intensity={ambientIntensity} color = {ambientColor}/>
        <pointLight castShadow = {false} position={[0,5,-2]} intensity={5} color = {"hsl(48,30%,80%)"}/>
    </>
}