import type { AxisId } from './quiz';
export type Climate = 'open'|'deep'|'human'|'quiet';
export type PoemRecommendation = { title:string; axisId:AxisId; reason:string; prompt:string };
export type PoetProfile = { id:string; name:string; dynasty:string; courtesyName:string; archetypeTitle:string; climate:Climate; vector:Record<AxisId,-2|-1|0|1|2>; coreCopy:string; poems:PoemRecommendation[] };

