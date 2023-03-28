import React, { useEffect, useRef,forwardRef } from "react";
import { useWindowSize } from "usehooks-ts";
let prev_time = null;


const  SmoothScroll = forwardRef(({ children,left,portraitWidth,portraitHeight,handleScroll,totalHeight }, ref) => {

  const scrollingContainerRef = useRef();
  const data = {
    ease: 0.06,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  const smoothScrollingHandler = (timeStamp) => {

    data.current = ref.current.scrollTop;
    if(Math.abs(data.current-data.previous)>0.1){
      data.previous += Math.min((data.current - data.previous) * data.ease,portraitHeight);
      data.rounded = Math.round(data.previous * 100) / 100;
      scrollingContainerRef.current.style.transform = `translateY(${data.current-data.previous}px)`;
      handleScroll(data.previous)
    }
    requestAnimationFrame((time) => smoothScrollingHandler(time));
  };

  return (
    <div className="portraitContainer" ref = {ref}style = {  {width: portraitWidth,
      left:left,
}}>
        <div style = {  {width: portraitWidth,
  height: totalHeight,
  position:"absolute",
  display: "block",
  overflow: "hidden",}}>
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
    </div>
  );
});

export default SmoothScroll;
