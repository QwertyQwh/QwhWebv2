import { useEffect, useRef } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { useEventListener, useEffectOnce } from "usehooks-ts"
import Svg_Arrow from '../../assets/svg/blog_arrow.svg'
import Svg_Pin from '../../assets/svg/blog_pin.svg'
import imgBanner from '../../assets/images/banner.jpg'
import imgAcadia from '../../assets/images/acadia.jpg'

export default function Blog(){
    const data =useLoaderData()
    console.log(data)
    const navigate = useNavigate()
    //smooth scrolling
    const ref_post = useRef()
    const ref_Bg = useRef()
    const OnBtnHomeClicked = ()=>{
        navigate(`../../home`)
    }
    const OnBtnSectionClicked = ()=>{
        navigate('../../section/coding')
    }


    return (
        <div className="blogBg" ref = {ref_Bg}>
        <div className="header">
        <div className='homeBtns'>
        <button className = 'home' onClick={OnBtnHomeClicked}>
        <span className="button_top"> Home
        </span>
        </button>
        <div style={{display:"inline-block",width:40,margin:"0 0.5em",top: '.6em',position:'relative'}}>
        <Svg_Arrow /> 
        </div>
        <button className = 'home' onClick={OnBtnSectionClicked}>
        <span className="button_top"> Coding
        </span>
        </button>
        </div>
        </div>
        <div className="post" ref = {ref_post}>
        <div className = "titleBlockContainer">
        <div className = "titleBlockBuffer">
        <div className = 'titleBlockShadow'>
        <div className = 'titleBlock'>
        <span style={{display:"inline-block",width:30,transform: 'translateY(-2em) translateX(-1.5em)'}}>
        <Svg_Pin />
        </span>
        <time dateTime="2015-03-09" className="postDate">August  25, 2023</time>
        <h1 className="title">
        This is the title中文也要考虑
        </h1>
        </div>
        </div>
        </div>
        </div>
        <div className = "titleBlockContainer">
        <div className = "titleBlockBuffer">
        <div className = 'titleBlockShadow'>
        <div className = 'titleBlock'>
        <p>
        好久不更新了。想用react改写一下网站，一直拖拖拉拉没有进展。结果连post也懒得写。兜兜转转今年已经见底。明年？希望结语至少不是“拖拉”。
        </p>
        <p>
        今天的晨雾一直没有散，居然就在窗外徘徊了一整天。看来它是打算在这个城市过新年了。
        </p>
        
        <p>
        跟它不同，我没有什么打算，也没有什么总结，这些东西还是留给那些充实的人去弄。对于又蹉跎了一年的我等芸芸众生，树皮多一层，年轮多一圈，可喜可贺。
        </p>
        <p>
        虽然这样说，一年临了还是想充实一把，混个模样。也许就是这个原因，这次去roadtrip之前特地去超市买了本子，希望自己能在motel床上涂鸦几笔。
        </p>
        <p>
        现在下学期多了一本空笔记本。可喜可贺。
        </p>
        <p>
        这么想来去西藏的一个月也随身带了一本小本子。只要是一个人出游，似乎都要强迫症一样拉着纸笔。
        </p>
        <p>
        所以到底是出游没有感想了呢？还是感想没有动力记录了呢？
        </p>
        <p>
        刚才说了，要充实一把，混个模样。但是要把一年的功课补上是不可能了，补个三四天，聊表歉意。
        </p>							
        <p>窗外还是一片灰。不知道晨雾对2023有什么愿望，如果有的话，祝它能在散去之前实现。
        </p>
        <p>——分割线——</p>
        <p>
        这次27号早晨出发，30号夜里回来，总计四天。为了节省租车和住宿经费，时间上非常紧凑，四天之内总计行
        程超过1000英里，最后一天就超过500英里，是名副其实的 '在路上'。
        </p>

        <pre>
        <code className="default"> 
        var a = 1. <br /> 
        var b = "beauty".
        </code>
        </pre>
        <p className="image">
        <img src={imgBanner}  />
        </p>
        <p>
        接下来是一张竖版图片。
        </p>
        <p className="image">
        <img src={imgAcadia}  />
        </p>
        </div>
        </div>
        </div>
        </div>

        </div>
        

        </div>
    )
}