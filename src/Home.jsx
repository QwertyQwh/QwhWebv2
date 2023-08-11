import { useRef,useState,useEffect,Suspense,useContext } from 'react'
import Svg_ShapeBg from './assets/svg/shape_bg.svg'
import Svg_ShapeLaptop from './assets/svg/shape_laptop.svg'
export default function Home(){



return (<>
  <div className='homeBg'>
   <span className='homeShapes'>
  <Svg_ShapeLaptop />
  </span>
  <span className='homeHoles'>
  <Svg_ShapeBg />
  </span>
  </div>
</>)}