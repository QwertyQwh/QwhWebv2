import React, { useEffect, useRef,forwardRef } from "react";
import { useWindowSize } from "usehooks-ts";


const  SmoothScroll = forwardRef(({ sectionCount,sections,left,portraitHeight,handleScroll,totalHeights,section_length }, ref) => {

  const footerRef = useRef()
  const scrollingContainerRef = Array(sectionCount).fill(0).map(()=>useRef());
  const { innerWidth: window_width, innerHeight:window_height } = window;
  const data = {
    ease: 0.06,
    current: 0,
    previous: Array(sectionCount).fill(0),
  };
  let totalHeight = 0
  const diff = Array(sectionCount).fill(0);
  // console.log(totalHeights)
  for(let i = 0;i<totalHeights.length;i++){
    if(totalHeight<totalHeights[i]){
      totalHeight = totalHeights[i]
    }
  }
  for(let i = 0;i<totalHeights.length;i++){
    diff[i] = totalHeight-totalHeights[i]
  }
  const totalScrollable = totalHeight-window_height
  useEffect(() => {
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
    data.current = ref.current.scrollTop;
    for(let i = 0;i<sectionCount;i++){
      if(Math.abs(data.current-data.previous[i])>0.1){
        data.previous[i] += Math.min((data.current - data.previous[i]) * data.ease,portraitHeight);
        const offset = diff[i]* Math.min((data.previous[i]/totalScrollable),1)
        console.log(i,data.previous[i])

        scrollingContainerRef[i].current.style.transform = `translateY(${Math.floor(offset+data.current-data.previous[i])}px)`;
        (handleScroll[i])(data.previous[i]- offset)
      }
    }
    requestAnimationFrame((time) => smoothScrollingHandler(time));
  };

  
  return (
    <>
    <div className="portraitContainer" ref = {ref}style = {  {width: "100%",
}}>
        <div style = {  {width: "100%",
  height: totalHeight,
  position:"absolute",
  display: "block",
  overflow: "hidden",
  
  }}>
      {/* <div ref={scrollingContainerRef}>{children}</div> */}
      {scrollSections}

    </div>

    <div ref={footerRef}  className='footer' style = {{top:totalHeight}}/>
    </div>
    </>
  );
});

export default SmoothScroll;