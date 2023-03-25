import { useEffectOnce } from 'usehooks-ts'
import { useState } from 'react';
import TestObject from '../../Scene/TestObject';
import { PerspectiveCamera } from '@react-three/drei';


export default function Portrait({config}){
  const [content, setcontent] = useState(<>
           {/* <TestObject />
            <PerspectiveCamera /> */}
  </>);

  useEffectOnce(()=>{
    import(`./PortraitContents/${config.content}`).then((con)=>{setcontent(<con.default />)})
  })
return <>
  {content}
</>
}