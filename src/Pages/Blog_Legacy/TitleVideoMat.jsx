import { useVideoTexture } from "@react-three/drei"

export default function TitleVideoMat(props){
    const url = require(`../../assets/videos/${props.titleVideo}.mp4`)
    const txtr = useVideoTexture(url)
    return <meshBasicMaterial map = {txtr} toneMapped = {false} />
}