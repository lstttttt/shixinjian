import type { AxisId } from './quiz';
import type { PoetProfile } from './poet';
export type AxisComparison = { axisId:AxisId; userValue:number; poetValue:number; gap:number };
export type Match = { poet:PoetProfile; distance:number; similarityIndex:number };
export type QuizResult = { matches:Match[]; primary:PoetProfile; secondary?:PoetProfile; isDual:boolean; clarity:'鲜明'|'交叠'|'双原型'; vector:Record<AxisId,number>; comparisons:AxisComparison[]; generatedAt:string };

