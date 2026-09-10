import { axisIds } from '@/data/axes';
import { questions } from '@/data/questions';
import type { Answers, AxisId, OptionValue } from '@/types/quiz';
export function calculateUserVector(answers:Answers){
 const out={} as Record<AxisId,number>;
 axisIds.forEach(axisId=>{const values=questions.filter(q=>q.axisId===axisId).map(q=>q.options.find(o=>o.id===answers[q.id])?.value).filter((v):v is OptionValue=>typeof v==='number');out[axisId]=values.length?values.reduce<number>((a,b)=>a+b,0)/values.length/2:0});
 return out;
}
