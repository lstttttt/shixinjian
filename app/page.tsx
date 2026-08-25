'use client';

import { useEffect, useMemo, useState } from 'react';

type Poet = { id:string; name:string; dynasty:string; title:string; tags:string[]; vector:number[]; copy:string; poems:[string,string,string]; night:string };
type Question = { text:string; options:string[]; scores:number[][]; themes:string[] };

const axes = ['入世','豪放','浪漫','外放','自由','山水','旷达','亲世'];
const axisNotes = ['出世','含蓄','现实','内省','秩序','人间','沉郁','孤绝'];
const poet = (id:string,name:string,dynasty:string,title:string,tags:string[],vector:number[],copy:string,poems:[string,string,string],night:string):Poet => ({id,name,dynasty,title,tags,vector,copy,poems,night});
const poets:Poet[] = [
 poet('qu-yuan','屈原','战国·楚','三闾大夫',['理想','忠贞','抗争'],[98,88,94,78,72,38,12,34],'你很难对一个明知不公的世界保持沉默。理想不是装饰，而是你愿意承担重量的理由。',['《离骚》','《天问》','《九章》'],'你们会谈理想为何值得被坚持，也会谈一个人如何在无人理解时保全自己的心。'),
 poet('tao-yuanming','陶渊明','东晋','五柳先生',['自然','自由','真率'],[18,34,66,24,94,96,90,52],'你相信生活不必时时证明自己。真正的自由，是在喧闹之外重新听见日常的声音。',['《归园田居》','《饮酒》','《桃花源诗》'],'你们大概会在篱边坐很久，谈一顿饭、一场雨，和怎样把日子过得不违本心。'),
 poet('li-bai','李白','唐','青莲居士',['浪漫','自由','豪情'],[58,97,98,88,98,78,86,68],'你很少真正甘愿接受一个已经被安排好的世界。比起世界已经是什么，你更容易被它还可能是什么吸引。',['《将进酒》','《月下独酌》','《宣州谢朓楼饯别校书叔云》'],'你们会谈远方，谈尚未发生的人生。酒到深处，也许谁都不会追问答案。'),
 poet('du-fu','杜甫','唐','少陵野老',['责任','现实','悲悯'],[99,64,28,52,34,38,18,82],'你对世界的关心并不轻盈。你记得具体的人、具体的苦难，也因此比许多人更愿意承担现实。',['《春望》','《登高》','《茅屋为秋风所破歌》'],'你们会谈一场雨如何落在普通人的屋檐，也会谈人在时代里如何不失去良知。'),
 poet('wang-wei','王维','唐','摩诘',['清寂','山水','内观'],[40,26,60,20,70,99,84,42],'你并非拒绝世界，只是知道精神需要一处安静的留白。你在寂静里恢复辨认自己的能力。',['《山居秋暝》','《鹿柴》','《终南别业》'],'你们会沿着山径慢慢走，不急着说话。松风与空山，已经替你们完成了许多表达。'),
 poet('meng-haoran','孟浩然','唐','孟襄阳',['山水','淡泊','交游'],[34,42,60,38,76,95,74,66],'你向往轻盈而有温度的生活。山水对你重要，但真正让它变得可亲的，往往是同行的人。',['《春晓》','《过故人庄》','《望洞庭湖赠张丞相》'],'你们会在故人庄里吃一顿饭，聊山川、旧友和那些不必说尽的心事。'),
 poet('bai-juyi','白居易','唐','香山居士',['人间','共情','通达'],[91,60,34,66,48,30,76,92],'你会把目光放回人间。复杂的道理到了你这里，总要落在一个人的生活、一声叹息或一件小事上。',['《琵琶行》','《卖炭翁》','《长恨歌》'],'你们会把街巷里听来的故事讲给彼此，认真听见每个普通人生活的回声。'),
 poet('li-shangyin','李商隐','唐','玉溪生',['深情','朦胧','幽微'],[54,16,90,16,56,34,14,38],'你对情感的理解从来不是直线。记忆、暗示和未说出口的话，构成了你最真实的内心风景。',['《锦瑟》','《无题》','《夜雨寄北》'],'你们会谈那些没有被说完的话。灯影摇动，沉默本身也有了细密的含义。'),
 poet('du-mu','杜牧','唐','樊川居士',['俊爽','锋利','咏史'],[76,84,64,78,78,44,62,74],'你有清醒的判断，也有不肯故作沉重的锋芒。你看得见历史的回声，也仍愿意把今日过得漂亮。',['《赤壁》','《泊秦淮》','《山行》'],'你们会从一段旧史谈到眼前的灯火，话题锋利，却不失风流。'),
 poet('liu-yong','柳永','北宋','柳屯田',['多情','市井','羁旅'],[38,30,82,64,78,24,26,94],'你对人的牵挂很具体。离别、城市、灯火和归途，常常比宏大的答案更能触动你。',['《雨霖铃》','《八声甘州》','《望海潮》'],'你们会在城中听歌，看万家灯火，谈那些远行之后仍然没有放下的人。'),
 poet('su-shi','苏轼','北宋','东坡居士',['旷达','丰富','超越'],[82,90,70,74,84,70,98,94],'你能够承认人生有风雨，却不愿让风雨成为它的唯一解释。你把受过的伤，慢慢转化为更宽阔的生活。',['《定风波》','《念奴娇·赤壁怀古》','《水调歌头》'],'你们会在江上看月，从失意谈到明日。到最后，连困境也成了可以安坐其中的风景。'),
 poet('li-qingzhao','李清照','两宋之际','易安居士',['敏感','自持','记忆'],[50,20,80,18,72,38,30,68],'你对细节有近乎本能的敏感。你珍惜记忆，也并不因此失去判断世界的力量。',['《声声慢》','《如梦令》','《醉花阴》'],'你们会谈一场雨、一件旧物和记忆如何改变一个人的重量。'),
 poet('xin-qiji','辛弃疾','南宋','稼轩',['英雄','家国','不甘'],[100,96,78,86,80,38,24,72],'你身上有一股不肯轻易认输的力量。即使理想屡被现实阻挡，你仍想为世界做些什么。',['《永遇乐·京口北固亭怀古》','《破阵子》','《青玉案·元夕》'],'你们会谈未竟之志，也会在长夜里把一盏灯留给仍然相信明日的人。'),
 poet('lu-you','陆游','南宋','放翁',['家国','执着','坚韧'],[99,80,56,68,58,48,32,76],'你的坚持不是一时的热烈，而是把一个愿望带进漫长日常，直到它成为生命的底色。',['《示儿》','《书愤》','《十一月四日风雨大作》'],'你们会谈一生没有完成的事，以及为什么仍然值得在风雨声里记住它。'),
 poet('nalan-xingde','纳兰性德','清','容若',['深情','孤独','哀婉'],[28,14,94,14,72,52,10,48],'你拥有极细腻的感受力，也因此更清楚有些失去不会被一句“放下”轻易带走。',['《长相思》','《浣溪沙》','《木兰花·拟古决绝词柬友》'],'你们会谈远行与旧梦。无需劝慰，能被真正听见已经足够。'),
 poet('gong-zizhen','龚自珍','清','定庵',['改革','锋芒','理想'],[96,90,92,84,96,32,50,66],'你不满足于把不合理当成理所当然。你愿意拆开旧秩序，也愿意为尚未出现的可能承担风险。',['《己亥杂诗》','《咏史》','《病梅馆记》'],'你们会谈一个世界如何更新，谈理想的锋芒如何不伤及真正需要被保护的人。')
];

const makeQuestion = (text:string, options:string[], axisA:number, axisB:number, themes:string[]):Question => ({ text, options, themes, scores: options.map((_,i) => { const a=[-3,-1,1,3][i]; const b=[3,1,-1,-3][i]; const row=Array(8).fill(0); row[axisA]=a; row[axisB]=b; return row; }) });
const legacyQuestions:Question[] = [
 makeQuestion('如果有一年完全不必承担任何责任，你会？',['去一个没人认识我的地方生活。','完成一直想做却没有时间做的事。','找一群人一起做一件有用的事。','投入一个能改变现实的长期计划。'],4,2,['wandering','freedom']),
 makeQuestion('一条沿用了很久、但明显不合理的规则挡在面前，你会？',['先离开这套规则，保住自己的节奏。','寻找缝隙，在不冲突的地方绕过去。','提出修改建议，让它变得更合理。','公开指出问题，并推动它彻底改变。'],0,4,['people','history']),
 makeQuestion('你最想把一个秋日下午交给什么？',['一个人走很远，不解释任何事。','在熟悉的街巷里慢慢消磨。','和知己吃饭聊天，直到天黑。','去看看远方正在发生的事。'],7,5,['friendship','landscape']),
 makeQuestion('当一件重要的事失败了，你更接近哪种反应？',['让它留在心里，慢慢理解它的重量。','先照顾好自己，过一阵再说。','找人谈谈，把情绪说清楚。','重新开始，换一种方式继续。'],6,3,['homeland','transcendence']),
 makeQuestion('团队在关键时刻出了问题，你第一反应是？',['先退开，确认自己真正愿意承担什么。','观察局面，等最需要的地方。','主动补位，和大家一起解决。','站出来分配任务，把局面扭回来。'],0,7,['people','country']),
 makeQuestion('你更愿意留下哪一种表达？',['一封没有寄出的信。','一幅只给懂的人看的画。','一句当面说清楚的话。','一场让所有人都听见的宣言。'],1,3,['love','transcendence']),
 makeQuestion('理想与现实发生冲突时，你会？',['承认条件有限，先把眼前事做好。','保留理想，同时做一些妥协。','寻找能让理想落地的办法。','宁愿承担代价，也不缩小理想。'],2,4,['history','country']),
 makeQuestion('一场旅行中，最容易让你停下来的是什么？',['一座没有名字的山。','路边安静的村落和田地。','城市里陌生人的生活气息。','一场临时发生的盛大聚会。'],5,7,['landscape','pastoral']),
 makeQuestion('你如何面对别人对你的期待？',['它不应进入我的内心。','听见它，但仍保留自己的尺度。','把它当作关系中的一份责任。','用行动证明我可以改变期待。'],0,7,['people','freedom']),
 makeQuestion('你更相信哪一句话？',['人生首先要对自己诚实。','不必急着给一切下结论。','人总要在关系中彼此成全。','世界值得被重新想象。'],2,6,['transcendence','friendship']),
 makeQuestion('如果可以改变居住地，你最向往？',['离城市很远、可以看见四季的地方。','有水有田、邻里简单的地方。','一座每天都有新故事的城市。','可以随时出发、没有固定坐标的地方。'],5,4,['pastoral','wandering']),
 makeQuestion('你更常怎样消化一段情绪？',['独处，把它写下来。','借一个意象或物件保存它。','找值得信任的人说出来。','做一件具体的事，让它流动起来。'],3,1,['love','homeland']),
 makeQuestion('面对公共议题，你通常？',['先保护自己的精神边界。','关注身边具体的人和事。','愿意参与讨论并提供帮助。','希望进入其中推动改变。'],0,7,['people','country']),
 makeQuestion('你对“稳定的人生”最真实的感受是？',['它可能让人忘记自己真正想要什么。','它很好，但不该成为唯一答案。','它让人有余力照顾重要的人。','如果稳定阻碍成长，就应该打破它。'],4,2,['freedom','homeland']),
 makeQuestion('真正让你感到被理解的时刻是？',['对方没有追问，只是安静陪着。','对方记得我说过的一个细节。','对方愿意和我把话说完。','对方愿意与我一起行动。'],7,3,['friendship','love']),
 makeQuestion('你更愿意用什么纪念一个重要的人？',['保留一件只有自己懂的旧物。','写下一段含蓄的文字。','在某个日子与朋友谈起他。','让他的愿望在现实中继续发生。'],6,1,['homeland','history']),
 makeQuestion('当你必须在“正确”与“自由”之间选择，你会？',['遵守共同规则，即使个人不舒服。','先判断它是否真正保护了人。','寻找不伤害他人的自主空间。','拒绝让外部标准替我决定。'],4,0,['freedom','people']),
 makeQuestion('哪一种风景最像你此刻的精神状态？',['雨后的空山。','黄昏时的长街。','有灯火、有人的渡口。','风起时尚未靠岸的船。'],5,3,['landscape','city']),
 makeQuestion('你做决定时最怕什么？',['被情绪带走，失去判断。','错过一种本可以抵达的可能。','让重要的人因此受伤。','明明看见问题，却什么也没做。'],2,7,['love','country']),
 makeQuestion('你与故乡的关系更像？',['它是心里不能被替代的底色。','它是偶尔回望的一段记忆。','它是有人等你回去的地方。','它是你想重新理解并改变的地方。'],6,5,['homeland','pastoral']),
 makeQuestion('你如何看待“成功”？',['不被外界定义，就是一种成功。','做成一件真正喜欢的事。','让身边的人因此过得更好。','把不可能的事推进一步。'],4,0,['people','transcendence']),
 makeQuestion('如果只能带一样东西远行，你会带？',['一本写满私人笔记的书。','一件故乡的旧物。','一封朋友写来的信。','一张没有终点的地图。'],3,4,['wandering','homeland']),
 makeQuestion('一场聚会中，你更可能？',['在角落观察每个人的表情。','和一个人聊很久，不参与喧闹。','让气氛变得轻松，让大家都自在。','提议去做一件临时起意的事。'],3,7,['friendship','wine']),
 makeQuestion('你对遗憾的态度更接近？',['它应该被完整地记住。','它可以成为一种温柔的提醒。','说出来以后，就能与人共同承担。','把它变成下一次出发的理由。'],6,2,['homeland','wandering']),
 makeQuestion('若你拥有改变一件事的力量，你会优先？',['让人拥有不被打扰的生活。','让人能看见更多可能。','让具体的困境得到帮助。','改变造成困境的旧结构。'],0,2,['people','country']),
 makeQuestion('你最容易被哪种文字打动？',['留白很多、读完还会回响的句子。','把日常写得清楚而温柔的文字。','让人忍不住想远行的诗句。','替沉默的人说出心声的文章。'],1,7,['love','city']),
 makeQuestion('当身边的人陷入低谷，你会？',['尊重他的独处，不强行安慰。','带他去一个安静的地方。','陪他把生活中的小事重新做起来。','直接帮他解决眼前最难的事。'],7,3,['friendship','people']),
 makeQuestion('你更愿意在哪种夜晚醒着？',['月光落在无人庭院的夜晚。','灯火未熄、有人等你的夜晚。','远行途中，列车穿过陌生城市。','风雨很大，但心里有未完成的事。'],5,0,['landscape','wandering']),
 makeQuestion('你认为真正的成熟是？',['允许自己不被所有人理解。','知道何时坚持，何时放手。','能在关系里保持诚实和体谅。','接受代价，仍然为重要的事行动。'],3,6,['transcendence','friendship']),
 makeQuestion('若有一扇门通向未知，你会？',['先站在门口，确认自己是否真的想去。','把想象中的景象写下来。','叫上一个重要的人一起进去。','立刻推门，边走边决定。'],2,4,['wandering','transcendence']),
 makeQuestion('你愿意留下怎样的一生？',['不喧哗，但始终忠于内心。','有过许多看见世界的时刻。','真实地爱过，也帮助过具体的人。','即使不完美，也曾推动什么向前。'],1,0,['history','people']),
 makeQuestion('如果把自己写成一首诗，你希望结尾是？',['一处没有说尽的空白。','一盏在故乡亮着的灯。','人与人举杯相望的时刻。','风继续吹，而我仍在路上。'],6,7,['wine','homeland'])
];

const questions:Question[] = [
 makeQuestion('十七岁那年，你在旧课本里夹到一张没有署名的车票，只写着一个陌生地名。你会：',['把它收好，等有一天真的走到那里。','查清那座城的四季，再决定是否出发。','把车票交给一个也想看远方的人。','先买一张去附近的票，路上再想下一站。'],4,2,['wandering','freedom']),
 makeQuestion('你花了很久准备一件事，临出发前却发现原来的目的地已经不再等你。天快亮了。你会：',['把行李留下，去看看另一条路。','重新整理手里的东西，先抵达能抵达的地方。','找到同行的人，把变化告诉他。','再等一晚，确认自己没有误会这个消息。'],0,4,['people','history']),
 makeQuestion('多年以后，你回到曾经读书的街区。书店变成了便利店，只有一棵树还在原处。你会：',['站一会儿，想起那时常常想些什么。','走进去买一件小东西，当作和旧日打招呼。','拍下这棵树，发给一个也记得这里的人。','沿着街继续走，看它如今通向哪里。'],7,5,['friendship','landscape']),
 makeQuestion('你曾为一件事付出很久，某天忽然明白它不会成为最初期待的样子。雨停了，桌上的灯还亮着。你会：',['把经过写下来，允许它暂时没有结论。','收起手边的材料，给自己一段空白。','去一个没有人认识你的地方，换换眼前的风景。','回头查找变化发生的那一步，再决定是否继续。'],6,3,['homeland','transcendence']),
 makeQuestion('一条用了很多年的规矩，让身边的人越来越难以生活。你不是最有话语权的人，却恰好看见了问题。你会：',['先把受到影响的人带到更安全的地方。','把每个具体的例子整理出来。','和其他人一起提出一个能执行的改法。','暂时退到一旁，等找到真正能改变它的时机。'],0,7,['people','country']),
 makeQuestion('你想对一个重要的人说一件迟到了很久的话。手机屏幕亮了又暗。你会：',['写一封信，不急着寄出。','借一件旧物或一首歌，让他慢慢明白。','约他见面，把事情从头到尾说清楚。','在合适的时候承认，这段关系曾改变你。'],1,3,['love','transcendence']),
 makeQuestion('你得到一个机会，可以把作品带到更大的地方，但必须删去其中最难被理解的部分。编辑在等答复。你会：',['保留它原来的样子，即使会错过机会。','删去一部分，让它先被更多人看见。','寻找第三种呈现方式，让那部分仍然留下。','接受取舍，但把完整版本留在另一个地方。'],2,4,['history','country']),
 makeQuestion('你第一次到一座陌生城镇，天色将晚。前方有山路、河岸、集市和一间亮灯的小旅店。你会：',['沿山路走一段，看看天黑前能看见什么。','去河岸坐坐，等水面带走一天的声音。','到集市里听听当地人怎样生活。','住进旅店，向老板打听明天最值得去的地方。'],5,7,['landscape','pastoral']),
 makeQuestion('家里人希望你接下一个稳妥的位置，朋友却邀请你去做一件没有保证结果的事。两边都在等你。你会：',['先听听自己真正想保留的生活。','答应一段时间，再观察这条路是否适合。','把顾虑告诉朋友，也把家里的需要安排好。','选择那个还没有答案的机会，并承担后果。'],0,7,['people','freedom']),
 makeQuestion('你在旧信箱里发现一句多年前写下的话：“如果明天不必解释，你想去哪里？”纸张已经发黄。你会：',['把它当作给当下自己的提醒。','先不回答，等某个答案自然出现。','把这句话讲给一个正在犹豫的人听。','重新写下一个目的地，即使还没有出发。'],2,6,['transcendence','friendship']),
 makeQuestion('你终于有一整个月没有安排。第一天醒来时，窗外有城市、河水、田野和陌生口音。你会：',['去河边或田野，按天气过日子。','住进一处有邻人的小地方，慢慢认识他们。','留在城市，看每天不同的人怎样经过。','带一只轻便的箱子，走到哪里算哪里。'],5,4,['pastoral','wandering']),
 makeQuestion('一件旧事在夜里忽然回来。你没有告诉任何人，但它已经影响了第二天的决定。你会：',['写下它，看看自己究竟在害怕什么。','把它交给一件旧物，让记忆有一个安放处。','找一个可信的人，从最难开口的地方说起。','去完成一件眼前的小事，让心绪重新有落脚处。'],3,1,['love','homeland']),
 makeQuestion('你发现一项决定正在悄悄影响很多人的日常。你手里的力量很小，但并非什么都做不了。你会：',['先把自己的边界和生活安顿好。','先帮助眼前最具体的一个人。','把发生的事情记录清楚，让更多人看见。','加入正在处理它的人，承担一段实际工作。'],0,7,['people','country']),
 makeQuestion('你在一座城里住得很安稳，却收到一封信，邀请你去远处开始一段没有保证的生活。你会：',['留下，把手边的人和事照顾好。','先去看看，再决定是否改变住处。','和重要的人商量，寻找彼此都能接受的办法。','把能带走的东西收拾好，给自己一次出发。'],4,2,['freedom','homeland']),
 makeQuestion('一个人陪你走过很长一段路后，忽然说：“接下来我想自己走。”你们站在分岔口。你会：',['告诉他你会在原地，等他想回来时找到你。','把共同走过的细节记下来，留给彼此。','问清楚他需要怎样的告别，再好好道别。','替他指一条路，然后转身走自己的方向。'],7,3,['friendship','love']),
 makeQuestion('你要为一个重要的人留下一件东西，但不能直接写名字。你会：',['留下一件只有你们懂来处的旧物。','写一段看似平常、读久才明白的文字。','在一个熟悉的地方讲起他的故事。','把他未完成的愿望变成一件现实中的事。'],6,1,['homeland','history']),
 makeQuestion('你所在的地方正在执行一项大家都说“向来如此”的规定。它没有伤害到你，却让另一些人很难留下。你会：',['先遵守它，同时给自己保留不被改变的部分。','去了解它为什么形成，再判断是否需要改变。','寻找一条不伤及他人的变通办法。','拒绝让它替所有人决定应该怎样生活。'],4,0,['freedom','people']),
 makeQuestion('你在一座陌生城里醒来，窗外有四种声音：雨落山石、街灯脚步、渡口船声和远处的风。你会走向：',['山里，去看雨后的路。','街上，看看这座城如何醒来。','渡口，问问下一班船要去哪里。','风来的方向，哪怕还没有目的地。'],5,3,['landscape','city']),
 makeQuestion('你要在两个都重要的决定之间选择：一个让身边的人安心，一个可能让多年后的自己少一份遗憾。你会：',['先把所有条件一一核对，再下决定。','承认有些可能只能错过，选择眼前能承担的。','和受影响的人坦白谈一次，不替彼此猜测。','选择那个更难解释、却让你愿意行动的方向。'],2,7,['love','country']),
 makeQuestion('你离开故乡多年，某天在异地闻到一种熟悉的气味。你会：',['把它带来的感觉留在心里，不急着寻找来源。','去买一件和记忆有关的东西。','给家里人打电话，问起那些旧日常。','循着气味走下去，看它是否真的通向从前。'],6,5,['homeland','pastoral']),
 makeQuestion('有人问你：“如果没有人知道，你还会做这件事吗？”它不轻松，也没有立刻的回报。你会：',['只做那些不需要被证明的部分。','先完成一件自己真正愿意完成的事。','想想它会怎样改变身边人的日子。','继续把它往前推，因为无人看见也不等于没有意义。'],4,0,['people','transcendence']),
 makeQuestion('你只能带一件东西离开住了很久的房间。窗外列车已经进站。你会拿：',['一本写满只给自己看的笔记。','一件来自故乡、已经有些磨损的物品。','朋友写来的信，哪怕内容并不长。','一张还没有标出终点的地图。'],3,4,['wandering','homeland']),
 makeQuestion('一场久别重逢的饭局上，大家都在谈这些年得到的东西。你忽然想起一个没有来的人。你会：',['安静听完，记住每个人说话时的表情。','和身边一个人谈起那位缺席者。','把话题带回桌上的人，让每个人都自在些。','提议饭后一起去一个临时想起的地方。'],3,7,['friendship','wine']),
 makeQuestion('你偶然找到一份旧计划，里面写着一个没有实现的约定。纸角已经卷起。你会：',['把它完整保存，承认它曾经很重要。','把它放在看得见的地方，提醒自己还有选择。','找当年的人问问，他是否还记得。','重新拟一份计划，从今天能做的第一步开始。'],6,2,['homeland','wandering']),
 makeQuestion('你可以让一件事立刻变好，却无法让所有人同时满意。你会先做什么？',['让每个人都有一小块不被打扰的空间。','把另一种可能展示出来，让人可以重新选择。','先处理眼前最具体、最急迫的困难。','去改动造成反复困难的那条旧路径。'],0,2,['people','country']),
 makeQuestion('多年后你重读一本年轻时喜欢的书，最先停留的不是故事，而是某一句话。它曾替你说出：',['那些没有说完、却一直回响的心事。','普通日子里很少被注意的温柔。','一个人离开熟悉地方时的心情。','许多人不愿说出口、但确实存在的困境。'],1,7,['love','city']),
 makeQuestion('朋友在低谷里拒绝所有安慰，只说“让我一个人待会儿”。夜很长。你会：',['告诉他你不会追问，但一直在。','把他带去一个安静的地方，什么也不安排。','第二天带一份日常的饭，陪他把小事做完。','先替他处理一件最棘手的事，等他愿意开口。'],7,3,['friendship','people']),
 makeQuestion('你在旅途中醒来，月光照着空院、远处的灯、经过的列车和一盏被风吹动的灯。你会：',['走进空院，在月光下坐到天亮。','沿着有灯的方向走，看看谁还没有睡。','去赶那班列车，不必先知道它会停在哪里。','守着那盏灯，把还没做完的事想清楚。'],5,0,['landscape','wandering']),
 makeQuestion('你回头看一段关系，发现双方都曾尽力，却还是走到了不同的地方。你会：',['接受有些人只能陪你走到这里。','留下能留下的部分，放开必须放开的部分。','约对方再谈一次，不为挽回，只为诚实。','把这段经历带进下一段生活，让它成为行动的分寸。'],3,6,['transcendence','friendship']),
 makeQuestion('一扇从未打开过的门出现在熟悉的房间里。门后没有声音，也没有人催促。你会：',['先在门前坐一会儿，确认自己为何想开。','把可能看见的景象写下来，再决定。','叫一个重要的人来，和他一起推开。','直接打开，接受之后发生的一切。'],2,4,['wandering','transcendence']),
 makeQuestion('如果有人只从你留下的痕迹认识你，你希望他看见的是：',['一个没有喧哗、却没有违背过自己的人。','一个曾经走过许多地方、认真看过世界的人。','一个爱过具体的人，也让身边人少受一点苦的人。','一个知道事情不完美，却仍把它往前推过的人。'],1,0,['history','people']),
 makeQuestion('你要为这段旅程写下最后一句话，纸上只容得下一行。你会写：',['有些答案，留在没有说尽的地方。','如果灯还亮着，总有一天会回到那条路。','愿我们举杯时，还记得彼此曾经同行。','风还在吹，下一站不必现在决定。'],6,7,['wine','homeland'])
];

function match(answers:number[]) { const scores=poets.map(p=>{ let dist=0; for(let d=0;d<8;d++){ const user=answers.reduce((sum,answer,questionIndex)=>sum+(questions[questionIndex]?.scores[answer]?.[d]||0),0); const user100=Math.round(50+(user/24)*50); dist += Math.abs(user100-p.vector[d])/100; } return {...p, raw:1-dist/8}; }).sort((a,b)=>b.raw-a.raw); const max=scores[0].raw; return scores.map(p=>({...p, score:Math.max(68,Math.round(78+(p.raw/max)*18))})); }

function Compass({vector}:{vector:number[]}) { const pts=vector.map((v,i)=>{const a=(Math.PI*2*i/8)-Math.PI/2; const r=12+(v/100)*30; return `${50+Math.cos(a)*r},${50+Math.sin(a)*r}`}).join(' '); return <div className="compass"><svg viewBox="0 0 100 100" role="img" aria-label="八方诗盘"><circle cx="50" cy="50" r="42" fill="none" stroke="var(--line)"/><circle cx="50" cy="50" r="27" fill="none" stroke="var(--line)" strokeDasharray="1 2"/>{axes.map((a,i)=>{const an=(Math.PI*2*i/8)-Math.PI/2; return <g key={a}><line x1="50" y1="50" x2={50+Math.cos(an)*42} y2={50+Math.sin(an)*42} stroke="var(--line)"/><text x={50+Math.cos(an)*50} y={50+Math.sin(an)*50} textAnchor="middle" dominantBaseline="middle">{a}</text></g>})}<polygon points={pts} fill="rgba(182,71,53,.18)" stroke="var(--vermilion)" strokeWidth=".8"/></svg></div> }

export default function Home() { const [mode,setMode]=useState<'home'|'quiz'|'result'>('home'); const [current,setCurrent]=useState(0); const [answers,setAnswers]=useState<number[]>([]); const [results,setResults]=useState<ReturnType<typeof match>>([]); const [showMethod,setShowMethod]=useState(false);
 useEffect(()=>{ const saved=localStorage.getItem('shixinjian-progress'); if(saved){try{const s=JSON.parse(saved); if(Array.isArray(s.answers)&&s.answers.length){setAnswers(s.answers);setCurrent(s.current||0)}}catch{}}},[]);
 useEffect(()=>{if(mode==='quiz') localStorage.setItem('shixinjian-progress',JSON.stringify({answers,current}))},[answers,current,mode]);
 const top=results[0]; const axisVector=useMemo(()=>axes.map((_,d)=>{const raw=answers.reduce((sum,answer,questionIndex)=>sum+(questions[questionIndex]?.scores[answer]?.[d]||0),0);return Math.max(0,Math.min(100,50+(raw/24)*50))}),[answers]);
 const start=()=>{setMode('quiz');setCurrent(answers.length>=32?0:answers.length)}; const choose=(i:number)=>{const next=[...answers];next[current]=i;setAnswers(next);setTimeout(()=>{if(current===31){localStorage.removeItem('shixinjian-progress');setResults(match(next));setMode('result')}else setCurrent(current+1)},260)}; const reset=()=>{setAnswers([]);setCurrent(0);setResults([]);setMode('home');localStorage.removeItem('shixinjian-progress')};
 if(mode==='quiz') return <main className="page quiz-shell"><div className="container"><div className="quiz-head"><span className="brand">诗 心 鉴</span><span>第 {String(current+1).padStart(2,'0')} / 32 问</span></div><div className="progress"><i style={{width:`${((current+1)/32)*100}%`}}/><b style={{left:`${((current+1)/32)*100}%`}}/></div></div><section className="question-wrap" aria-live="polite"><div className="question-index">第 {['一','二','三','四','五','六','七','八','九','十'][current]||current+1} 问</div><h2 className="question">{questions[current].text}</h2><div className="answers">{questions[current].options.map((o,i)=><button className={`answer ${answers[current]===i?'selected':''}`} key={o} onClick={()=>choose(i)}>{o}</button>)}</div></section><div className="quiz-foot container"><button className="text-button" onClick={reset}>退出本次测试</button><span>你的选择没有好坏之分</span></div></main>;
 if(mode==='result'&&top) return <main className="page"><div className="container topbar"><span className="brand">诗 心 鉴</span><button className="text-button" onClick={reset}>再测一次</button></div><section className="result-hero"><div className="eyebrow">你的诗心原型</div><h1>{top.name}</h1><div className="result-score">{top.score}</div><div className="result-label">诗 心 相 契 度</div><div className="result-tags">{top.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div><p className="result-copy">{top.copy}<br/><br/>在这卷跨越千年的诗人谱系里，你与{top.name}走得最近。</p></section><section className="section"><div className="container result-layout"><div><div className="eyebrow">SECTION 02</div><h2 className="section-title">八方诗盘</h2><p className="method">这不是性格优劣的排名，而是一张记录你当下选择倾向的文学坐标。八个方向彼此没有高下。</p><div className="axis-list">{axes.map((a,i)=><div className="axis-row" key={a}><span>{a}</span><div className="axis-bar"><i style={{width:`${axisVector[i]}%`}}/></div><b>{Math.round(axisVector[i])}</b></div>)}</div></div><Compass vector={axisVector}/></div></section><section className="section"><div className="container"><div className="eyebrow">SECTION 03</div><h2 className="section-title">你与他为何相似</h2><div className="grid-3">{top.tags.map((t,i)=><article className="feature" key={t}><div className="eyebrow">0{i+1}</div><h3>{t}</h3><p>{i===0?'你对世界有自己的判断，不轻易把人生交给外部标准。':i===1?'比起已经存在的答案，你更容易被仍有可能发生的事吸引。':'你愿意与人连接，也保留一处不被轻易侵入的精神空间。'}</p></article>)}</div><article className="feature" style={{marginTop:48}}><h3>但你比{top.name}更谨慎</h3><p>诗心相契并不意味着完全相同。你同样向往{top.tags[0]}，却会在真正行动之前，为现实、责任和身边的人留下更多余地。</p></article></div></section><section className="section"><div className="container"><div className="eyebrow">SECTION 04</div><h2 className="section-title">如果与你共饮一夜</h2><p className="result-copy" style={{marginLeft:0}}>{top.night}</p></div></section><section className="section"><div className="container"><div className="eyebrow">SECTION 05</div><h2 className="section-title">你应该重读他的三首诗</h2><div className="poem-list">{top.poems.map((p,i)=><article className="poem" key={p}><strong>{p}</strong><p>{['因为你也在意，一个人如何把有限的生命活得开阔。','因为你熟悉理想与现实同时拉扯一个人的感觉。','因为热烈之外，你同样保留着一处孤独。'][i]}</p></article>)}</div></div></section><section className="section"><div className="container"><div className="eyebrow">SECTION 06</div><h2 className="section-title">另外两个与你相契的人</h2><div className="friends">{results.slice(1,3).map(p=><div className="friend" key={p.id}><span><small>诗友</small><br/>{p.name}</span><strong>{p.score}%</strong></div>)}</div></div></section><section className="section"><div className="container"><div className="eyebrow">SECTION 07</div><h2 className="section-title">生成你的「诗心笺」</h2><div className="share-card"><div className="eyebrow">诗 心 鉴 · 2026</div><div className="big">{top.name}</div><p>诗心相契 {top.score}%</p><p>{top.tags.join(' · ')}</p><span className="seal">鉴</span></div><div style={{textAlign:'center',marginTop:26}}><button className="primary" onClick={()=>navigator.clipboard?.writeText(`我的诗心与${top.name}最相契 · ${top.score}%`)}>复制结果文案</button></div></div></section><footer className="container footer"><span>诗心鉴 · 一个中国古典诗词文化娱乐测试</span><button className="text-button" onClick={()=>setShowMethod(!showMethod)}>关于测试</button></footer>{showMethod&&<section className="section"><div className="container method"><h2 className="section-title">关于这份测试</h2><p>「诗心鉴」匹配的是文学作品、创作倾向与文化形象所构成的“诗心原型”，不是历史人物真实心理的人格诊断。你的结果也不代表科学准确率，只是一次关于审美、价值选择与古典诗词的文化娱乐体验。</p></div></section>}</main>;
 return <main className="page"><div className="container topbar"><span className="brand">诗 心 鉴</span><span>卷一 · 诗心谱</span></div><section className="container hero"><div className="hero-copy"><span className="seal">诗</span><div className="eyebrow" style={{marginTop:30}}>中国古典诗词文化人格测试</div><h1>你与哪位<br/><span>中国诗人</span><br/>隔世相知？</h1><p className="subtitle">32 个选择，照见与你最相契的中国诗心。</p><p className="microcopy">这不是心理诊断，也没有标准答案。请沿着你真实的第一反应，翻开这卷属于你的诗心笺。</p><div style={{display:'flex',gap:22,alignItems:'center',marginTop:32}}><button className="primary" onClick={start}>启 卷　→</button>{answers.length>0&&<button className="text-button" onClick={start}>继续上次进度</button>}</div></div></section><section className="section"><div className="container"><div className="eyebrow">一卷三阅</div><h2 className="section-title">从选择，到相契，再到重读</h2><div className="grid-3"><article className="feature"><div className="eyebrow">01 / 32</div><h3>翻开情境</h3><p>用 32 个现代生活选择，记录你面对世界时的细微倾向。</p></article><article className="feature"><div className="eyebrow">08 维</div><h3>照见诗心</h3><p>八方诗盘把你的选择放回一张古典而当代的文学坐标。</p></article><article className="feature"><div className="eyebrow">16 位</div><h3>寻访相契</h3><p>与十六位中国诗人的创作气质相遇，找到最接近你的那一位。</p></article></div></div></section><section className="section"><div className="container method"><div className="eyebrow">小字注</div><p>本测试以文学史中的作品风格、题材重心与人生姿态建立“诗心原型”，不还原历史人物的真实心理，也不构成心理学诊断。所有结果仅用于文化娱乐与自我观照。</p></div></section><footer className="container footer"><span>诗心鉴 · 2026</span><span>千年诗卷，谁与你同心</span></footer></main>;
}
