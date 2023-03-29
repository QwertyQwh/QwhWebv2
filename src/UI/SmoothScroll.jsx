import React, { useEffect, useRef,forwardRef } from "react";
import { useWindowSize } from "usehooks-ts";


const  SmoothScroll = forwardRef(({ sectionCount,sections,left,portraitHeight,handleScroll,totalHeights }, ref) => {

  const scrollingContainerRef = Array(sectionCount).fill(0).map(()=>useRef());
  const data = {
    ease: 0.06,
    current: 0,
    previous: Array(sectionCount).fill(0),
  };
  let totalHeight = 0
  const speedMultiplier = Array(sectionCount).fill(1);
  for(let i = 0;i<totalHeights.length;i++){
    if(totalHeight<totalHeights[i]){
      totalHeight = totalHeights[i]
    }
  }
  for(let i = 0;i<totalHeights.length;i++){
    speedMultiplier[i] = totalHeights[i]/totalHeight;
  }
  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  const scrollSections =  Array(sectionCount).fill(0).map((obj,index)=>(
    <div key = {index} ref={scrollingContainerRef[index]}>{sections[index]}</div>
  ));

  const smoothScrollingHandler = (timeStamp) => {
    data.current = ref.current.scrollTop;
    console.log("animation")
    for(let i = 0;i<sectionCount;i++){
      const realCurrent = data.current*speedMultiplier[i];
      console.log(realCurrent, data.previous[i])
      if(Math.abs(realCurrent-data.previous[i])>0.1){
        data.previous[i] += Math.min((realCurrent - data.previous[i]) * data.ease,portraitHeight);
        scrollingContainerRef[i].current.style.transform = `translateY(${realCurrent-data.previous[i]}px)`;
        (handleScroll[i])(data.previous[i])
      }
    }
    requestAnimationFrame((time) => smoothScrollingHandler(time));
  };

  return (
    <div className="portraitContainer" ref = {ref}style = {  {width: "100%",
      left:left,
}}>
        <div style = {  {width: "100%",
  height: totalHeight,
  position:"absolute",
  display: "block",
  overflow: "hidden",}}>
      {/* <div ref={scrollingContainerRef}>{children}</div> */}
      {scrollSections[0]}
    </div>
    </div>
  );
});

export default SmoothScroll;
