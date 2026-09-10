import { Mirror } from '@/components/Mirror';
export function ChapterTransition({chapter,onContinue}:{chapter:{kicker:string;title:string;copy:string};onContinue:()=>void}){return <main className="chapter-screen"><Mirror/><p className="kicker">{chapter.kicker}</p><h1>{chapter.title}</h1><p>{chapter.copy}</p><button className="primary-button" onClick={onContinue}>进入这一面 <span>→</span></button></main>}

