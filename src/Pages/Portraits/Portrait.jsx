import { useEffectOnce } from 'usehooks-ts'
import { useState,useImperativeHandle,forwardRef } from 'react';
import TestObject from '../../Scene/TestObject';
import { PerspectiveCamera } from '@react-three/drei';



export default forwardRef( function Portrait({config},ref){
  const [content, setcontent] = useState(<>
           {/* <TestObject />
            <PerspectiveCamera /> */}
  </>);
    const setConfig = (config)=>{
      if(config == null){
        setcontent(  null)
        // setcontent(  <color attach="background" args={["#FF00FF"]} />)
      }else{
        import(`./PortraitContents/${config.content}`).then((con)=>{setcontent(<con.default />)})
      }
    }
  useImperativeHandle(ref, () => {
    return {
      setConfig,
    };
  }, []);
  
  useEffectOnce(()=>{setConfig(config)})
return <>
  {content}
</>
})