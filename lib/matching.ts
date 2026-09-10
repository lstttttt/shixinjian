import { axes, axisIds } from '@/data/axes';
import { poets } from '@/data/poets';
import type { Answers } from '@/types/quiz';
import type { QuizResult } from '@/types/result';
import { calculateUserVector } from './scoring';
export function createResult(answers:Answers):QuizResult{
 const vector=calculateUserVector(answers);
 const matches=poets.map(poet=>{const distance=Math.sqrt(axisIds.reduce((sum,id)=>sum+Math.pow(vector[id]-poet.vector[id]/2,2),0)/axisIds.length);return{poet,distance,similarityIndex:Math.round((1-distance/2)*100)}}).sort((a,b)=>a.distance-b.distance);
 const primary=matches[0].poet; const margin=matches[1].distance-matches[0].distance; const isDual=margin<.07;
 const comparisons=axes.map(axis=>({axisId:axis.id,userValue:vector[axis.id],poetValue:primary.vector[axis.id]/2,gap:Math.abs(vector[axis.id]-primary.vector[axis.id]/2)}));
 return{matches,primary,secondary:isDual?matches[1].poet:undefined,isDual,clarity:isDual?'双原型':margin<.14?'交叠':'鲜明',vector,comparisons,generatedAt:new Date().toISOString()};
}

