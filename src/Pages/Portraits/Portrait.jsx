
import { useEffectOnce } from 'usehooks-ts'
import { useState } from 'react';


export default function Portrait({config}){
  const [content, setcontent] = useState(<>Waiting</>);

  useEffectOnce(()=>{
    import(`./PortraitContents/${config.content}`).then((con)=>{setcontent(<div ><con.default /></div>)})
})
return <>
  {content}
</>
}