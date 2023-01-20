import { useState } from 'react'
export default function Blog(props){
    const [content, setcontent] = useState(<>Waiting</>);
    
    import(/* webpackMode: "lazy-once" */`../Contents/${props.name}.js`).then((Test1)=>{setcontent(<><Test1.default /></>)})
    return content
}