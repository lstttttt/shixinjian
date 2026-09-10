import type { AxisId } from '@/types/quiz';
export type Axis = { id:AxisId; left:string; right:string; question:string; descriptions:[string,string,string,string,string] };
export const axes:Axis[] = [
 {id:'world_stance',left:'守住自身',right:'介入现实',question:'看见公共问题时，你把力量放在哪里',descriptions:['先守好自己的边界','通常从自身能够承受之处开始','会视具体影响决定是否介入','愿意进入现场承担一部分','倾向直接推动现实改变']},
 {id:'expression',left:'含蓄寄托',right:'直接言说',question:'重要感受出现时，你如何让它被看见',descriptions:['更愿借事物保存感受','常等到合适时机再表达','表达方式随关系而变化','倾向把意思说明白','通常选择当面直接言说']},
 {id:'judgement',left:'核实现实',right:'想象可能',question:'做决定时，你更相信什么',descriptions:['优先核对已有条件','先确认成本和可行性','现实与可能同样重要','愿为可能调整原计划','常为尚未发生之事留位置']},
 {id:'emotion',left:'独自消化',right:'向人联结',question:'情绪需要安放时，你往哪里去',descriptions:['需要完整的独处空间','通常先独自理清','会依情境选择独处或交谈','愿意找可信的人共同整理','通过关系理解自己的感受']},
 {id:'boundary',left:'权衡秩序',right:'自主破格',question:'规则与内心相撞时，你如何取舍',descriptions:['倾向维护既有安排','先在规则内寻找余地','会逐项权衡影响','必要时愿意偏离路径','自主选择通常优先于惯例']},
 {id:'attention',left:'自然清寂',right:'人间烟火',question:'你的注意力容易在哪里停留',descriptions:['容易被自然与留白吸引','偏爱安静、低密度的环境','清寂与烟火都能安顿你','更留意具体的人与日常','人群和生活细节使你着迷']},
 {id:'time_attitude',left:'记忆持守',right:'转化释然',question:'你怎样带着过去继续生活',descriptions:['愿意完整保存过去','不急于替遗憾找到结论','会保存，也会慢慢松动','倾向把过去带入新生活','更愿让旧事完成转化']},
 {id:'action_rhythm',left:'谨慎等待',right:'即刻推进',question:'条件不完整时，你以怎样的速度行动',descriptions:['宁可等待条件清楚','通常会多验证一步','速度随风险而变化','倾向先迈出可逆的一步','常在行动中继续判断']},
];
export const axisMap = Object.fromEntries(axes.map(a=>[a.id,a])) as Record<AxisId,Axis>;
export const axisIds=axes.map(a=>a.id);

