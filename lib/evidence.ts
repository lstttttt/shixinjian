import { axisMap } from '@/data/axes';
import { questions } from '@/data/questions';
import type { Answers } from '@/types/quiz';
import type { Question, QuestionOption } from '@/types/quiz';
import type { QuizResult } from '@/types/result';
export function resultEvidence(answers:Answers,result:QuizResult){
 const close=new Set([...result.comparisons].sort((a,b)=>a.gap-b.gap).slice(0,3).map(c=>c.axisId));
 const candidates:{question:Question;option:QuestionOption;score:number}[]=[];
 questions.forEach(question=>{const option=question.options.find(o=>o.id===answers[question.id]);if(option)candidates.push({question,option,score:(Math.abs(option.value)===2?2:0)+(close.has(question.axisId)?2:0)+option.evidenceTags.length})});
 return candidates.sort((a,b)=>b.score-a.score).slice(0,3);
}
export function axisSentence(id:keyof typeof axisMap,value:number){const a=axisMap[id];const idx=Math.max(0,Math.min(4,Math.round((value+1)*2)));return a.descriptions[idx]}
