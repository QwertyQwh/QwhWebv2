import React, { useEffect, useRef,forwardRef } from "react";
import { useWindowSize } from "usehooks-ts";
let prev_time = null;


const  SmoothScroll = forwardRef(({ children,left,portraitWidth,portraitHeight,handleScroll,totalHeight }, ref) => {
  // 1.
  const windowSize = useWindowSize();

  //2.
  const scrollingContainerRef = useRef();
  // const maskRef =useRef();
  3.
  const data = {
    ease: 0.02,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  // // 4.
  // useEffect(() => {
  //   setBodyHeight();
  // }, [windowSize.height]);

  // const setBodyHeight = () => {
  //   // maskRef.current.style.height = `${
  //   //   scrollingContainerRef.current.getBoundingClientRect().height
  //   // }px`;
  //   document.body.style.height = `${
  //     scrollingContainerRef.current.getBoundingClientRect().height
  //   }px`;
  // };

  // 5.
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
