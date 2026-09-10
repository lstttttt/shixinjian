export type AxisId = 'world_stance'|'expression'|'judgement'|'emotion'|'boundary'|'attention'|'time_attitude'|'action_rhythm';
export type EvidenceTag = 'rule_conflict'|'public_issue'|'relationship_repair'|'private_expression'|'uncertain_opportunity'|'memory_object'|'daily_care'|'departure'|'creative_integrity';
export type OptionValue = -2|-1|1|2;
export type QuestionOption = { id:string; text:string; value:OptionValue; evidenceTags:EvidenceTag[]; evidenceSummary:string };
export type Question = { id:string; version:2; chapter:1|2|3|4; type:'daily'|'conflict'|'poetic'; axisId:AxisId; text:string; options:QuestionOption[] };
export type Answers = Record<string,string>;

