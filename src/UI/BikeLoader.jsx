import LoadingSvg from '../assets/svg/loading.svg'
import { useEffectOnce } from 'usehooks-ts'
import anime from 'animejs';
import Logger from '../Debug/Logger';
import { useProgress } from '@react-three/drei';
export default function BikeLoader({}){
  const { active, progress, errors, item, loaded, total } = useProgress()

  Logger.Warn("Loader rerendering")
    useEffectOnce(()=>{
        anime({
            targets: ".svg-loading3,.svg-loading2,.svg-loading1",
            opacity:[0,1],
            duration: 1000,
            loop: false,
            easing:'easeInQuad'
          });
        anime({
          targets: ".dot",
          translateY: [0,-40,0],
          rotate: [0,180,360],
          duration:1000,
          loop:true,
          easing: 'easeOutQuad'
        })
        anime({
            targets: ".wheel",
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 1000,
            loop: true,
            easing: "linear"
        }
        )
    })
    return <>
    <div style = {{
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
  }}>
        <LoadingSvg  />
        <div>{`${progress}%`}</div>
    </div>
    </>
}