export interface Member {
  id: string;
  nameEn: string;
  nameZh: string;
  nameKo: string;
  emoji: string;
  birthDate: string;
  position: string[];
  color: {
    name: string;
    hex: string;
    textHex: string;
  };
  mbti: string;
  birthPlace: string;
  nicknames: string[];
  signaturePhrase: string;
  signaturePhraseDesc: string; // Detail about the phrase
  funFacts: string[];
  emojiClues: string[]; // List of emojis specifically describing them
  specialty: string;
}

export const TWICE_MEMBERS: Member[] = [
  {
    id: "nayeon",
    nameEn: "Nayeon",
    nameZh: "娜璉",
    nameKo: "나연",
    emoji: "🐰",
    birthDate: "1995/09/22",
    position: ["領唱", "領舞", "形象", "中心"],
    color: {
      name: "天藍色 (Sky Blue)",
      hex: "#81D4FA",
      textHex: "#0288D1"
    },
    mbti: "ISTP",
    birthPlace: "南韓首爾特別市",
    nicknames: ["兔牙", "三歲", "林兔子", "果汁相"],
    signaturePhrase: "I'm gonna be a star!",
    signaturePhraseDesc: "在生存節目《SIXTEEN》中洗腦度爆表、成為個人招牌的經典開場歌詞！",
    funFacts: [
      "是 TWICE 的大姐（年齡最大），但因為個性活潑可愛常被開玩笑說是「林三歲」。",
      "擁有非常具辨識度的開朗「兔牙」微笑，是演藝圈著名的「果汁相」美女代表。",
      "是第一位推出個人 Solos 專輯（《IM NAYEON》，主打歌《POP!》）的 TWICE 成員。",
      "極度害怕煙火和巨大的爆裂聲，每次舞台謝幕時總會被嚇一跳。",
      "喜歡甜食，特別是果 jelly 和馬卡龍，甚至可以代替正餐。"
    ],
    emojiClues: ["🐰", "🦷", "🍭", "🥤", "🥤"],
    specialty: "精準的音高與元氣滿滿的舞台魅力"
  },
  {
    id: "jeongyeon",
    nameEn: "Jeongyeon",
    nameZh: "定延",
    nameKo: "정연",
    emoji: "🐶",
    birthDate: "1996/11/01",
    position: ["領唱"],
    color: {
      name: "黃綠色 (Lime Green)",
      hex: "#A3D9C9",
      textHex: "#0D533F"
    },
    mbti: "ISFJ",
    birthPlace: "南韓京畿道水原市",
    nicknames: ["無趣哥", "鴕鳥", "守護天使", "大長腿"],
    signaturePhrase: "雖然很簡短，但聽我說完嘛！",
    signaturePhraseDesc: "在官方綜藝中搞笑、講話時的真摯模樣，常被成員模仿。",
    funFacts: [
      "非常有正義感且熱心助人，在宿舍裡被封為「守護天使」，因為她最常主動打掃衛生與照顧落單成員。",
      "親姐姐是知名的實力派女演員孔升妍，兩姊妹曾共同主持過音樂節目《人氣歌謠》。",
      "非常喜歡樂高（Lego）和玩拼圖，房間裡有各種組裝好的模型展示。",
      "是隊內的雙手靈巧擔當，對於各種清潔、修繕、收納都非常在行。",
      "雖然一開始以「帥氣短髮」中性風格出道，但留起長髮後散發出極致溫柔優雅的公主氣質。"
    ],
    emojiClues: ["🐶", "🍈", "🧹", "🧩", "🧱"],
    specialty: "沉穩扎實的渾厚中低音與神級身材比例"
  },
  {
    id: "momo",
    nameEn: "Momo",
    nameZh: "Momo",
    nameKo: "모모",
    emoji: "🍑",
    birthDate: "1996/11/09",
    position: ["主領舞", "副唱", "副Rapper"],
    color: {
      name: "粉紅色 (Pink)",
      hex: "#FFC0CB",
      textHex: "#C2185B"
    },
    mbti: "INFP",
    birthPlace: "日本京都府綴喜郡宇治田原町",
    nicknames: ["桃子", "桃姬", "舞蹈機器", "豬蹄狂熱者"],
    signaturePhrase: "Nico Nico Ni~",
    signaturePhraseDesc: "在綜藝節目《認識的哥哥》中模仿動漫角色，因極度軟萌而引發全網瘋傳！",
    funFacts: [
      "被編舞老師和無數業界人士公認為當代 K-Pop 女團最強「舞蹈機器」之一，舞蹈學習速度極快。",
      "極度熱愛美食，最喜歡的食物是「豬蹄 (Jokbal)」，甚至說過沒有豬蹄她活不下去。",
      "在選秀 survival 節目《SIXTEEN》中曾被淘汰，但在最後一集被朴軫永創立性地以「不可或缺的舞蹈奇才」救回，成為 TWICE 最後奇蹟加入的成員。",
      "養了幾隻可愛的小狗（Boo & Dobby），不論去哪裡心裡都牽掛著牠們。",
      "日語發音和韓語發音都有種獨特的軟萌鼻音，聽起來非常具有撒嬌治癒感。"
    ],
    emojiClues: ["🍑", "🩰", "🍖", "🐶", "🇯🇵"],
    specialty: "力量、控制力與性感兼具的頂級現代舞技"
  },
  {
    id: "sana",
    nameEn: "Sana",
    nameZh: "Sana",
    nameKo: "사나",
    emoji: "🐹",
    birthDate: "1996/12/29",
    position: ["副唱"],
    color: {
      name: "紫色 (Purple)",
      hex: "#D8B4F8",
      textHex: "#6A1B9A"
    },
    mbti: "ENFP",
    birthPlace: "日本大阪府大阪市天王寺區",
    nicknames: ["柴犬", "紗夏", "No Sana No Life", "松鼠"],
    signaturePhrase: "Shy Shy Shy",
    signaturePhraseDesc: "在 2016 爆紅曲《CHEER UP》中的「샤샤샤」配上揮拳撒嬌動作，掀起全大韓民國及亞洲模仿狂潮！",
    funFacts: [
      "人際交往大師，屬於不折不扣的社交蝴蝶（ENFP），對所有人都充滿熱情，隨時都在散發暖意與擁抱。",
      "著名口頭禪「No Sana, No Life」（沒有 Sana 就沒有生活）深受粉絲與成員認同。",
      "擁有極具代表性的「柴犬相」和「倉鼠相」，個性有點天然呆，經常在舞台或日常生活中跌倒、絆倒。",
      "韓語流利程度被封為「金紗夏」，不僅能精準運用成語，甚至會帶有首爾女孩的軟軟語調。",
      "嗅覺極度靈敏，對香水與精油有著專家等級的收藏和研究。"
    ],
    emojiClues: ["🐹", "🐶", "🧴", "✨", "🔮"],
    specialty: "極度勾人的舞台眼神、發聲甜美與頂級撒嬌力"
  },
  {
    id: "jihyo",
    nameEn: "Jihyo",
    nameZh: "志效",
    nameKo: "지효",
    emoji: "🦄",
    birthDate: "1997/02/01",
    position: ["隊長", "主唱"],
    color: {
      name: "黃色/杏色 (Apricot)",
      hex: "#FFDAB9",
      textHex: "#E65100"
    },
    mbti: "ESTJ",
    birthPlace: "南韓京畿道九里市",
    nicknames: ["神志效", "麥克風", "湯瑪士小火車"],
    signaturePhrase: "One in a million! 大家好我們是 TWICE！",
    signaturePhraseDesc: "身為靈魂隊長，每一次在領獎、開場時帶領成員喊出團隊問候的威嚴好聲音！",
    funFacts: [
      "在 JYP Entertainment 當了整整「10年的練習生」，在長久的等待與沉澱中磨練出無可挑剔的抗壓與實力。",
      "是隊內的巨肺「主唱」，聲音高亢飽滿、穿透力極強，而且在跳高強度舞蹈時開麥 Live 聲音驚人地穩定。",
      "出了名的工作狂與體能怪物，熱愛健身與戶外運動，擁有小麥色健康美肌以及令人稱羨的健美馬甲線。",
      "非常有責任感，是團體中深受所有成員和工作人員百分之百信賴的「神志效 (God Jihyo)」。",
      "眼睛非常非常大，從小就是出名的童星模特，小時候常被戲稱長得像湯瑪士小火車（Thomas）。"
    ],
    emojiClues: ["🎤", "🦁", "🏋️‍♀️", "☀️", "👑"],
    specialty: "開麥高音輸出如CD般完美，無懈可擊的表演熱情"
  },
  {
    id: "mina",
    nameEn: "Mina",
    nameZh: "Mina",
    nameKo: "미나",
    emoji: "🐧",
    birthDate: "1997/03/24",
    position: ["主領舞", "副唱"],
    color: {
      name: "薄荷綠 (Mint Green)",
      hex: "#81EAD8",
      textHex: "#00796B"
    },
    mbti: "INFJ",
    birthPlace: "美國德克薩斯州聖安東尼奧 (在日本兵庫縣神戶市長大)",
    nicknames: ["企鵝", "黑天鵝", "名井白富美", "小南"],
    signaturePhrase: "正解！（Seong-dab!）",
    signaturePhraseDesc: "在團體綜藝錄影時，平時極為文靜的她舉手猜謎答對時展現的燦爛可愛語調。",
    funFacts: [
      "學習了整整「11年的芭蕾舞」，因此走路姿勢和站姿都無形中流露出猶如天鵝般的優雅高貴氣息。",
      "是隊內的安靜擔當與「電競宅女」，超級熱愛打電動、砌帆船模型，甚至可以不出門專心拼 3D 樂高好幾天。",
      "在美國出生，擁有日本與美國雙重國籍，氣質內斂溫柔、講話聲音細軟，笑起來臉頰上有顆迷人的小痣。",
      "極度專注，在偶像運動會（偶運會）中曾以一曲無失誤的韻律體操芭蕾舞表演奪得金牌，震撼演藝圈。",
      "被網友調侃氣質高冷動人，眼角微微下垂彷彿隨時都在演浪漫文藝片，是極致的「氛圍感美女」。"
    ],
    emojiClues: ["🐧", "🩰", "🎮", "🇺🇸", "🦢"],
    specialty: "芭蕾底子的柔軟身段與極度乾淨清甜的嗓音"
  },
  {
    id: "dahyun",
    nameEn: "Dahyun",
    nameZh: "多賢",
    nameKo: "다현",
    emoji: "🦅",
    birthDate: "1998/05/28",
    position: ["領Rapper", "副唱"],
    color: {
      name: "白色 (White)",
      hex: "#FFFDD0",
      textHex: "#7F5F00"
    },
    mbti: "INFJ",
    birthPlace: "南韓京畿道城南市",
    nicknames: ["豆腐 (Dubu)", "老鷹", "尋找相機大師"],
    signaturePhrase: "興多賢 (Heung-Dahyun)",
    signaturePhraseDesc: "平日溫順安靜，但音樂一下或在舞台上就會瞬間變身成「興致興奮多賢」！",
    funFacts: [
      "皮膚白皙到透亮，且非常有彈性，因此被官方和粉絲暱稱為「豆腐 (Dubu)」，也是美妝品牌的寵兒。",
      "擁有不可思議的「鏡頭雷達」，不論相機藏在多遠的地方、甚至是天花板上，她都能在 1 秒內精準找到並對著它招手微笑。",
      "出道前因在教會跳了一段魔性的「老鷹之舞」短片在南韓網路上瘋傳，成為她進入《SIXTEEN》時的超級萌點。",
      "是隊內的綜藝感、反應能力擔當，在多個綜藝節目（如《一週偶像》）中擔任特別主持，幽默風趣且極具親和力。",
      "非常多才多藝，彈得一手好鋼琴，經常在粉絲見面會或幕後花絮中即興自彈自唱。"
    ],
    emojiClues: ["🦅", "🥛", "🎹", "📸", "🧼"],
    specialty: "驚人的超狂軟骨功、敏銳找鏡頭能力與流暢 Rapping"
  },
  {
    id: "chaeyoung",
    nameEn: "Chaeyoung",
    nameZh: "彩瑛",
    nameKo: "채영",
    emoji: "🐯",
    birthDate: "1999/04/23",
    position: ["主Rapper", "副唱"],
    color: {
      name: "紅色/草莓色 (Strawberry Red)",
      hex: "#FF4D4D",
      textHex: "#B71C1C"
    },
    mbti: "INFP",
    birthPlace: "南韓首爾特別市江東區",
    nicknames: ["小猛獸", "草莓公主", "畢卡索", "彩彩"],
    signaturePhrase: "我的心臟快要爆炸了！",
    signaturePhraseDesc: "寫在自創 Rap 歌詞中或在表演前透露興奮心情的怪美系台詞。",
    funFacts: [
      "個人風格強烈、崇尚自由，對於繪畫與藝術天賦極高，被成員稱為 TWICE 的「小畢卡索」，設計過 TWICE 的限量鞋款與專輯插圖。",
      "非常喜歡草莓，從小就有「草莓公主」的外號，嘴唇下方有一顆精緻惹眼的小美人痣。",
      "雖然是隊內身材最嬌小的成員，但卻像隻「小猛獸」般擁有超強大的氣場和自信。",
      "是名副其實的「作詞才女」，參與了 TWICE 數十首歌曲的 Rap 創作與英文作詞，文字富有童話和哲思意境。",
      "身上有許多個性獨具的小文身（如草莓、番茄、愛心箭矢），非常熱愛搖滾樂以及波希米亞、復古時尚風格。"
    ],
    emojiClues: ["🍓", "🐯", "🎨", "🎸", "🍒"],
    specialty: "自由不拘的創作才華、磁性帥氣的快嘴 Rap 表演"
  },
  {
    id: "tzuyu",
    nameEn: "Tzuyu",
    nameZh: "子瑜",
    nameKo: "쯔위",
    emoji: "🦌",
    birthDate: "1999/06/14",
    position: ["領舞", "副唱", "門面", "忙內"],
    color: {
      name: "深藍色 (Deep Blue)",
      hex: "#2C75FF",
      textHex: "#0D47A1"
    },
    mbti: "ISFP",
    birthPlace: "中華民國臺灣臺南市",
    nicknames: ["尤達", "周子", "巧克力", "大金魚", "台灣之光"],
    signaturePhrase: "謝謝大家（台語：多謝大家）",
    signaturePhraseDesc: "在巡迴演唱會或重大頒獎典禮上，用溫暖親切的母語向一直支持她的華語圈及家鄉粉絲道謝。",
    funFacts: [
      "是 TWICE 的「忙內」（年齡最小的成員），但同時也是全隊「身高最高」的成員（172公分），站立時氣場非凡。",
      "在 TC Candler 舉辦的「全球百大最美臉孔」排行榜中，曾奪得「世界第一美 (World's Most Beautiful Face)」的桂冠。",
      "極度熱愛小動物，家裡和宿舍都養了心愛的狗狗（以前的 Gucci，以及現在領養的 Kaya、Butter），對牠們疼愛有加。",
      "個性非常老實、善良且內向。說話語速慢條斯理，常常因為講出大實話而被成員笑稱是搞笑王（實話實說擔當）。",
      "射箭技術堪稱「奧運國手等級」，在韓國偶像運動會（歐運會）射箭比賽中多次射中 10 環，其中頭髮隨箭風飄揚的動圖動了全球網路。"
    ],
    emojiClues: ["🦌", "🏹", "🐶", "🍫", "🇹🇼"],
    specialty: "世界級完美比例的精緻門面、百發百中的奧運神級射箭"
  }
];

export interface TriviaQuestion {
  id: number;
  type: "emoji" | "fact" | "lyric" | "color";
  questionText: string;
  options: string[]; // Chinese names
  correctAnswer: string; // Chinese name
  hint: string;
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // Emoji questions
  {
    id: 1,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：🐰 🦷 🍭 (關鍵字：招牌兔牙、元氣滿滿、大姐)",
    options: ["娜璉", "Sana", "多賢", "Mina"],
    correctAnswer: "娜璉",
    hint: "她是隊裡年齡最大、充滿果汁相微笑，且最先發布個人專輯《POP!》的主唱之一。"
  },
  {
    id: 2,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：🦌 🏹 🐶 (關鍵字：射箭之神、最高忙內、世界最美臉孔)",
    options: ["子瑜", "彩瑛", "Momo", "志效"],
    correctAnswer: "子瑜",
    hint: "她是來自臺灣、身高最高、且在偶像運動會上因射箭飄髮動圖紅遍全球的成員。"
  },
  {
    id: 3,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：🍑 🩰 🍖 (關鍵字：豬蹄狂熱者、超強主領舞、京都府出生)",
    options: ["Mina", "Momo", "Sana", "定延"],
    correctAnswer: "Momo",
    hint: "她的名字在日文是「桃子」的意思，被譽為當代 K-Pop 界最強舞蹈機器之一。"
  },
  {
    id: 4,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：🐹 🔮 ✨ (關鍵字：熱情社交、柴犬與倉鼠面相、Shy Shy Shy)",
    options: ["Sana", "Momo", "多賢", "娜璉"],
    correctAnswer: "Sana",
    hint: "因為《Cheer Up》中一句軟萌撒嬌的「샤샤샤」而引發模仿熱潮，口頭禪是「No ____ No Life」。"
  },
  {
    id: 5,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：🦅 🥛 🎹 (關鍵字：尋找相機大師、豆腐、著名鋼琴高手)",
    options: ["多賢", "彩瑛", "定延", "Mina"],
    correctAnswer: "多賢",
    hint: "她的皮膚像豆腐一樣白皙，且出道前在教會跳的「老鷹之舞」極為魔性。"
  },
  {
    id: 6,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：🐧 🩰 🎮 (關鍵字：德州出生、芭蕾公主、重度電競玩家)",
    options: ["Mina", "Sana", "子瑜", "定延"],
    correctAnswer: "Mina",
    hint: "學了 11 年芭蕾，擁有一身貴族般的優雅身段，但私底下是個極度喜歡打電動的安靜御宅女。"
  },
  {
    id: 7,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：🍓 🐯 🎨 (關鍵字：小猛獸、草莓公主、隊內畫家與作詞家)",
    options: ["彩瑛", "多賢", "娜璉", "定延"],
    correctAnswer: "彩瑛",
    hint: "她是隊裡身材最嬌小，但 Rap 實力超群的藝術才女，嘴角有一顆迷人的小美人痣。"
  },
  {
    id: 8,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：👑 🎤 🏋️‍♀️ (關鍵字：超強主唱、麥克風、十年練習生)",
    options: ["志效", "娜璉", "定延", "Momo"],
    correctAnswer: "志效",
    hint: "她是 TWICE 的隊長，在 JYP 度過了整整十年的漫長練習生生涯，有「神志效」的稱號。"
  },
  {
    id: 9,
    type: "emoji",
    questionText: "請根據表情符號猜出是哪位成員：🧹 🍈 🧩 (關鍵字：宿舍守護天使、孔升妍的親妹妹、中性帥氣帥哥風)",
    options: ["定延", "志效", "子瑜", "Momo"],
    correctAnswer: "定延",
    hint: "她非常喜歡拼圖和樂高，且正義感滿滿，是隊內的主要大姐，默默守護和打掃著宿舍。"
  },
  // Fact questions
  {
    id: 10,
    type: "fact",
    questionText: "哪位成員在選秀節目《SIXTEEN》中雖然中途被淘汰，但在決賽中被朴軫永重新點名，成為奇蹟加入 TWICE 的最後一位成員？",
    options: ["Momo", "子瑜", "Mina", "Sana"],
    correctAnswer: "Momo",
    hint: "因為 JYP 認為團隊需要一位頂尖的舞蹈擔當來撐起舞台，而決定將她救回。"
  },
  {
    id: 11,
    type: "fact",
    questionText: "在偶像運動會射箭項目中，多次射中 10 環，甚至因為「隨箭飄揚的秀髮」美翻全網、連好萊塢大導演也轉發的成員是？",
    options: ["子瑜", "娜璉", "Mina", "多賢"],
    correctAnswer: "子瑜",
    hint: "她是來自臺灣的忙內，身材高挑，也是隊內的黃金門面。"
  },
  {
    id: 12,
    type: "fact",
    questionText: "在 JYP Entertainment 熬了長達 10 年練習生經歷、練就了不科學的完美巨肺唱功與超強抗壓力的「隊長」是誰？",
    options: ["志效", "定延", "娜璉", "Mina"],
    correctAnswer: "志效",
    hint: "外號是「神志效」，隨便一開唱就如同吃 CD 般穩定，而且是著名的健身與工作狂。"
  },
  {
    id: 13,
    type: "fact",
    questionText: "擁有能精準找到任何隱蔽機位的強大「鏡頭雷達」，總能在神祕角落給予攝影機燦爛微笑的是哪位成員？",
    options: ["多賢", "Sana", "彩瑛", "定延"],
    correctAnswer: "多賢",
    hint: "外號「豆腐」，白嫩得可以捏出水，在日常及舞台被譽為天生的鏡頭大師。"
  },
  {
    id: 14,
    type: "fact",
    questionText: "哪位成員從小學了 11 年芭蕾舞，並且擁有美、日雙重國籍，氣質高雅迷人，是標準的「電競宅女」？",
    options: ["Mina", "Sana", "子瑜", "Momo"],
    correctAnswer: "Mina",
    hint: "她的代表動物是企鵝，笑起來臉上有細緻內斂的美人痣，被讚譽為氛圍感滿滿的冷豔黑天鵝。"
  },
  {
    id: 15,
    type: "fact",
    questionText: "哪位成員雖然在隊中身材最為嬌小，但卻具有極高藝術天賦，親自設計過帆布鞋，而且是主 Rap 擔當？",
    options: ["彩瑛", "多賢", "Momo", "Sana"],
    correctAnswer: "彩瑛",
    hint: "外號是「小猛獸」，擁有亮麗自信風采與多個可愛刺青，超級喜歡草莓。"
  },
  // Lyric signature parts
  {
    id: 16,
    type: "lyric",
    questionText: "在歌曲《CHEER UP》中唱出傳奇洗腦句「Shy Shy Shy (샤샤샤)」而一舉爆紅的人是誰？",
    options: ["Sana", "娜璉", "子瑜", "Mina"],
    correctAnswer: "Sana",
    hint: "她是大阪出生的柴犬/松鼠系少女，熱情活潑，口頭禪是「No ____ No Life」。"
  },
  {
    id: 17,
    type: "lyric",
    questionText: "唱出經典名言與洗腦歌詞「I'm gonna be a star!」(我就要成為明星！) 的傳奇主唱與大姐是誰？",
    options: ["娜璉", "定延", "志效", "彩瑛"],
    correctAnswer: "娜璉",
    hint: "她是 TWICE 的中心位與元氣擔當，牙齒尖尖的像小兔子一樣溫暖治癒。"
  },
  {
    id: 18,
    type: "lyric",
    questionText: "在《What is Love?》中經典扮演《電影羅密歐與茱麗葉》男主角，帥到窒息中性風迷倒萬千粉絲的是誰？",
    options: ["定延", "Momo", "娜璉", "多賢"],
    correctAnswer: "定延",
    hint: "她是宿舍的「守護天使」，親姐姐是演員孔升妍，擁有一雙逆天大長腿與帥氣高尚之美。"
  }
];
