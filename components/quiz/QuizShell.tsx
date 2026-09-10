import { useEffect,useRef,useState } from 'react';
import { questions } from '@/data/questions';
import type { Answers } from '@/types/quiz';
export function QuizShell({index,answers,onChoose,onPrevious,onNext,onExit}:{index:number;answers:Answers;onChoose:(id:string)=>void;onPrevious:()=>void;onNext:()=>void;onExit:()=>void}){
 const q=questions[index]; const title=useRef<HTMLHeadingElement>(null); const [locked,setLocked]=useState(false); useEffect(()=>{title.current?.focus();setLocked(false)},[index]);
 const choose=(id:string)=>{if(locked)return;setLocked(true);onChoose(id);setTimeout(()=>setLocked(false),220)};
 return <main className="quiz-page"><header className="quiz-head"><button className="brand-button" onClick={onExit}>诗心鉴</button><span>{String(index+1).padStart(2,'0')} / 32</span></header><div className="progress" role="progressbar" aria-valuemin={1} aria-valuemax={32} aria-valuenow={index+1}><i style={{width:`${((index+1)/32)*100}%`}}/></div><section className="question-card"><p className="chapter-label">第 {q.chapter} 面</p><h1 ref={title} tabIndex={-1}>{q.text}</h1><div className="option-list" role="radiogroup" aria-label={`第 ${index+1} 题选项`}>{q.options.map((option,i)=><button key={option.id} role="radio" aria-checked={answers[q.id]===option.id} className={`option ${answers[q.id]===option.id?'is-selected':''}`} onClick={()=>choose(option.id)}><span>{String.fromCharCode(65+i)}</span>{option.text}<i/></button>)}</div></section><footer className="quiz-nav"><button onClick={onPrevious} disabled={index===0}>← 上一题</button><p>按你通常的反应作答</p><button onClick={onNext} disabled={!answers[q.id]}>{index===31?'查看结果':'下一题 →'}</button></footer></main>
}

