import { Mirror } from '@/components/Mirror';
export function HomeHero({onStart,hasProgress,onAbout}:{onStart:()=>void;hasProgress:boolean;onAbout:()=>void}){return <>
 <header className="site-head"><a className="brand" href="#top">诗心鉴</a><button className="quiet-button" onClick={onAbout}>关于测试</button></header>
 <section className="home-hero" id="top"><div className="home-copy"><p className="kicker">一面借诗照人的镜</p><h1>你的选择，<br/>会在哪位诗人那里<br/><em>得到回声？</em></h1><p className="lead">32 个关于现实、关系与时间的选择，找到与你当下最接近的中国诗心。</p><div className="facts"><span>32 题</span><span>约 6 分钟</span><span>自动保存进度</span></div><button className="primary-button" onClick={onStart}>{hasProgress?'继续照见':'开始照见'}<span>→</span></button><p className="boundary-note">这不是心理诊断，也不还原历史人物的真实人格。它只比较你本次回答与诗人作品气质之间的距离。</p></div><Mirror className="home-mirror"/></section>
 </>}

