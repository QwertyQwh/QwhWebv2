import React, { useEffect, useRef,forwardRef } from "react";
import { useEffectOnce, useWindowSize } from "usehooks-ts";
import Footer from "./Footer";
import Logger from "../Debug/Logger";
const  SmoothScroll = forwardRef(({ sectionCount,sections,left,portraitHeight,handleScroll,totalHeights,section_length }, ref) => {
  
  const footerRef = useRef()
  const scrollingContainerRef = Array(sectionCount).fill(0).map(()=>useRef());
  const { innerWidth: window_width, innerHeight:window_height } = window;
  const footerHeight = 0.4*window_height
  const data = {
    ease: 0.04,
    current: 0,
    previous: Array(sectionCount).fill(0),
    footerPrevious: totalHeight/2
  };
  let totalHeight = 0
  const diff = Array(sectionCount).fill(0);
  for(let i = 0;i<totalHeights.length;i++){
    if(totalHeight<totalHeights[i]){
      totalHeight = totalHeights[i]
    }
  }
  for(let i = 0;i<totalHeights.length;i++){
    diff[i] = totalHeight-totalHeights[i]
  }
  const totalScrollable = totalHeight-window_height
  const footerScrollable = totalScrollable+footerHeight

  useEffect(() => {
    Logger.Warn("end of smoothscroll")
    console.log(ref)
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);



  const scrollSections =  section_length.map((obj,index)=>{
    return (<div key = {index} ref={scrollingContainerRef[index]} style = {{}}>{sections.slice(obj[0],obj[1])}</div>
  )});
  // console.log(scrollSections)
  // const scrollSections =  section_length.map((obj,index)=>(
  //   <div key = {index} ref={scrollingContainerRef[index]}>{sections}</div>
  // ));
  const smoothScrollingHandler = (timeStamp) => {
    if(ref.current){
      data.current = ref.current.scrollTop;
      for(let i = 0;i<sectionCount;i++){
        if(Math.abs(data.current-data.previous[i])>0.1){
          data.previous[i] += Math.min((data.current - data.previous[i]) * data.ease,portraitHeight);
          const offset = diff[i]* Math.min((data.previous[i]/totalScrollable),1)
          scrollingContainerRef[i].current.style.transform = `translateY(${Math.floor(offset+data.current-data.previous[i])}px)`;
          (handleScroll[i])(data.previous[i]- offset)
        }
      }
      const footerUp = (1-data.current/footerScrollable)*totalHeight/3;
      footerRef.current.style.transform = `translateY(${-footerUp}px)`
    }

    requestAnimationFrame((time) => smoothScrollingHandler(time));
  };



  return (
    <>
    <div className="portraitContainer" ref = {ref}style = {  {width: "100%"}}>
    <div style = {{width: "100%",
                  height: totalHeight,
                  position:"absolute",
                  display: "block",
                  overflow: "hidden",
                  }}>
      {scrollSections}
    </div>
    <Footer ref = {footerRef} style = {{top:totalHeight,height:footerHeight}}/>
    </div>
    </>
  );
});

export default SmoothScroll;