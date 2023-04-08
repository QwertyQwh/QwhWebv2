import { useEffectOnce } from 'usehooks-ts'
import { useState,useImperativeHandle,forwardRef,lazy } from 'react';
import TestObject from '../../Scene/TestObject';
import { PerspectiveCamera } from '@react-three/drei';
import TestPen from './PortraitContents/TestPen';
import Logger from '../../Debug/Logger';
import { useThree } from '@react-three/fiber';


export default forwardRef( function Portrait({config},ref){
  const [content, setcontent] = useState(<></>);
  const {gl} = useThree()
    const setConfig = (config)=>{
      if(config == null){
        gl.setClearColor( 0xffffff, 0);
        setcontent(null)
        // setcontent(  <color attach="background" args={[null]} />)
        gl.setClearColor( 0xffffff, 0);
      }else{
        // const Content = lazy(()=>import(`./PortraitContents/${config.content}`))
        import(`./PortraitContents/${config.content}`).then((con)=>{setcontent(<con.default />)})
        // .then((con)=>{setcontent(<con.default />)})
      }
    }

  useImperativeHandle(ref, () => {
    return {
      setConfig,
    };
  }, []);
  
  useEffectOnce(()=>{
    setConfig(config)
  })

return <>
  {content}
  {/* <TestPen/> */}
</>
})