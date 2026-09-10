import type { Answers } from '@/types/quiz';
export const VERSION=2; export const PROGRESS_KEY='shixinjian-progress-v2'; export const RESULT_KEY='shixinjian-result-v2';
export type SavedProgress={questionSetVersion:2;currentQuestionId:string;answers:Answers;updatedAt:string};
export function loadProgress():SavedProgress|null{try{const x=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'null');return x?.questionSetVersion===VERSION?x:null}catch{return null}}
export function saveProgress(currentQuestionId:string,answers:Answers){localStorage.setItem(PROGRESS_KEY,JSON.stringify({questionSetVersion:VERSION,currentQuestionId,answers,updatedAt:new Date().toISOString()}))}
export function clearSaved(){localStorage.removeItem(PROGRESS_KEY);localStorage.removeItem(RESULT_KEY)}

