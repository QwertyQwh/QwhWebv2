import { useRef,useState,useEffect,Suspense,useContext } from 'react'
import { useControls,button } from 'leva'
import Loader from './UI/Loader.jsx'
import ThemeSection from './Pages/Blog/ThemeSection.jsx'
import Catalog from './Catalogs/BlogCatalog.js'
import PortraitContainer from './Pages/Portraits/PortraitContainter.jsx'
import { useEffectOnce } from 'usehooks-ts'
import PortraitCatalog from './Catalogs/PortraitCatalog.js'
import { DeviceContext } from './Contexts/Contexts.js'

export default function Home(){

  //debug  
  const {follow,targetPos} = useControls('camera',{
    follow:false,
    targetPos: [-5,5,0]
  })
  const  {tone,background,blur} = useControls('post',{
    tone: { 
      options:['ACES','Cineon','Reinhard','Linear','None']
    },
    background: '#fdfcf5',
    blur: false,
  })
  const isMobile = useContext(DeviceContext) == "mobile";

  //TODO:We need to stop rendering a few frames later when actually trigger the effect, This will be done in the function that toggles the blur value. i.e. Toggle the stopRendering variable a few frames after we toggle the blur variable. 
  const stopRendering = false;
  useEffectOnce(()=>{
    // console.log(pref.current.refs)
})

  return (<>
  <Suspense fallback = {<Loader />}>
    {!isMobile?
    <>
    <PortraitContainer start = {0} width = {1/2} aspect_ratio = {16/9} configs = {PortraitCatalog.Large} padding = {1}></PortraitContainer>
    <PortraitContainer start = {1/2} width = {1/3} aspect_ratio = {9/16} configs = {PortraitCatalog.Large} padding = {1}></PortraitContainer>
    <PortraitContainer start = {5/6} width = {1/6} aspect_ratio = {1} configs = {PortraitCatalog.Large} padding = {1}></PortraitContainer>
    </>
      :
    <PortraitContainer start = {0} width = {1} aspect_ratio = {16/9} configs = {PortraitCatalog.Large} padding = {1}></PortraitContainer>
  }

  {/* <Link to="../Blogs/testVideo" >Blogs</Link> */}
  </Suspense>
  {blur && <ThemeSection configs = {Catalog}/>}
  </>
)}