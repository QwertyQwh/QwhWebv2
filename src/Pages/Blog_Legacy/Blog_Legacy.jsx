import { useState } from 'react'
import { useRef } from 'react';
import { useEventListener,useEffectOnce } from 'usehooks-ts';
import TitleImg from './TitleImg';
import nosignal from '../../assets/images/nosignal.jpg'
import nosignal_depth from '../../assets/images/nosignal_depth.jpg'
import { useLoaderData } from 'react-router-dom';

export default function Blog_Legacy(props){
    const data = useLoaderData();
    const [content, setcontent] = useState(<>Waiting</>);
    const [diffuse, setdiffuse] = useState(nosignal);
    const [depth, setdepth] = useState(nosignal_depth);
    const titleImgRef = useRef()
    const titleBlkRef = useRef()
    const blogRef = useRef()
    useEffectOnce(()=>{
        import(/* webpackMode: "lazy-once" */`../../BlogContents/${data.content}`).then((con)=>{setcontent(<div ><con.default /></div>)})
        setdiffuse(require(`../../assets/images/${data.titleImg}.png`));
        if(data.isFake3D){
            setdepth(require(`../../assets/images/${data.titleImg}_depth.png`));
        }
        document.title = data.title
    })
    const handleScroll = e  => {
        titleBlkRef.current.style.top = `${blogRef.current.scrollTop-blogRef.current.scrollTop/(blogRef.current.scrollHeight-blogRef.current.clientHeight)*(titleBlkRef.current.clientHeight-titleImgRef.current.clientHeight)}px`
    };
    
    useEventListener('scroll',handleScroll,blogRef)
    return <div ref = {blogRef} className='blog'>
        <div ref = {titleBlkRef} className='titleBlock'>
    <div ref={titleImgRef}   className = 'titleImg'>
        <TitleImg diffuse = {diffuse} isFake3D = {data.isFake3D} depth = {depth} isVideo = {data.isVideo} titleVideo = {data.titleVideo}/>
        </div>
        </div>
        <div className='contentBlock'>
            <div className='txtBlock'>
        {content}
            </div>
        </div>
    </div>
}