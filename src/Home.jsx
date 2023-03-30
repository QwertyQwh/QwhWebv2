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


  const focusRef = useRef()
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
  const focusTargetStyle = {  
    width: "60vw",
    left: "20vw",
    top: "20%",
    bottom: "20%",
    height: "36vw"
  }
  //TODO:We need to stop rendering a few frames later when actually trigger the effect, This will be done in the function that toggles the blur value. i.e. Toggle the stopRendering variable a few frames after we toggle the blur variable. 
  const stopRendering = false;
  useEffectOnce(()=>{
    // console.log(pref.current.refs)
})

  const handleFocusIn = ({left,top,width,height})=>{
    console.log("focusing")
    focusRef.current.style.left = left;
    focusRef.current.style.top = top;
    focusRef.current.style.width = width;
    focusRef.current.style.height = height;
    `translateY(${data.current-data.previous}px)`
    console.log( focusRef.current.style.transition )

    focusRef.current.style.transition = "2s";
    console.log( focusRef.current.style.transition )
    focusRef.current.style.left = focusTargetStyle.left;
    focusRef.current.style.top = focusTargetStyle.top;
    focusRef.current.style.width = focusTargetStyle.width;
    focusRef.current.style.height = focusTargetStyle.height;
    focusRef.current.style.bottom = focusTargetStyle.bottom;



    
  }
  return (<>
  <Suspense fallback = {<Loader />}>
    {!isMobile?
    <>
    <PortraitContainer sectionCount = {3} start = {[0,1/2,5/6]} width = {[1/2,1/3,1/6]} aspect_ratio = {[16/9,9/16,1]} configs = {[PortraitCatalog.Large,PortraitCatalog.Large,PortraitCatalog.Large]} padding = {1} handleFocusIn = {handleFocusIn}></PortraitContainer>
    {/* <PortraitContainer start = {1/2} width = {1/3} aspect_ratio = {9/16} configs = {PortraitCatalog.Large} padding = {1} handleFocusIn = {handleFocusIn}></PortraitContainer> */}
    {/* <PortraitContainer start = {5/6} width = {1/6} aspect_ratio = {1} configs = {PortraitCatalog.Large} padding = {1} handleFocusIn = {handleFocusIn}></PortraitContainer> */}
    </>
      :
    <PortraitContainer start = {0} width = {1} aspect_ratio = {16/9} configs = {PortraitCatalog.Large} padding = {1} handleFocusIn = {handleFocusIn}></PortraitContainer>
  }
  {/* <div ref = {focusRef} className='portraitFocus'/> */}

  {/* <Link to="../Blogs/testVideo" >Blogs</Link> */}
  </Suspense>
  {blur && <ThemeSection configs = {Catalog}/>}
  </>
)}