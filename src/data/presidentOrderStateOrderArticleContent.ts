import type { UiLang } from "@/lib/localeContent";

export type PresidentOrderStateOrderArticleContent = {
  documentTitle?: string;
  documentDateLine?: string;
  intro: string;
  section1Heading: string;
  section1Items: string[];
  section2Heading: string;
  section2Items: string[];
  section3Heading: string;
  section3AHeading: string;
  section3AItems: string[];
  section3BHeading: string;
  section3BItems: string[];
  section4Heading: string;
  section4AHeading: string;
  section4AItems: string[];
  section4B: string;
  section5: string;
  section6: string;
  controlParagraph: string;
  signaturePresident: string;
  signaturePlace: string;
  signatureDate: string;
  signatureNumber: string;
  lexLinkPrefix: string;
};

export const PRESIDENT_ORDER_STATE_ORDER_ARTICLE: Record<UiLang, PresidentOrderStateOrderArticleContent> = {
  uz: {
    intro:
      "Rivojlanayotgan iqtisodiyot tarmoqlari va sohalarida ehtiyoj yuqori boʻlgan bakalavriat taʼlim yoʻnalishlari va magistratura mutaxassisliklari boʻyicha oliy maʼlumotli kadrlar tayyorlashni taʼminlash, oliy taʼlim tashkilotlarida yoshlarning sifatli taʼlim olish imkoniyatlarini kengaytirish, shuningdek, kadrlar tayyorlashni tarmoq, hududiy va maqsadli investitsiya loyihalariga manzilli yoʻnaltirish maqsadida:",
    section1Heading:
      "1. Oʻzbekiston Respublikasi Prezidentining 2024-yil 24-maydagi “Oliy taʼlim tashkilotlariga oʻqishga qabul qilish va davlat buyurtmasini joylashtirish tizimini takomillashtirish toʻgʻrisida”gi PF-81-son Farmoniga muvofiq:",
    section1Items: [
      "davlat buyurtmasi parametrlarini bakalavriat taʼlim yoʻnalishlari va magistratura mutaxassisliklari boʻyicha kunduzgi taʼlim shaklida tasdiqlash tartibi joriy etilganligi;",
      "davlat buyurtmasi boʻyicha kvotalar taqsimotida muhandislik, tibbiyot, aniq va tabiiy fanlar bilim sohalariga ustuvorlik berilganligi;",
      "davlat oliy taʼlim muassasalari uchun oʻrnatilgan tartib va shartlar boʻyicha talabalar qabulini amalga oshiruvchi nodavlat oliy taʼlim tashkilotlariga davlat buyurtmasining taqsimotida ishtirok etishga ruxsat etilganligi;",
      "2024/2025 oʻquv yilidan boshlab davlat oliy taʼlim muassasalariga qabul qilish boʻyicha imtihonlar “avval test, soʻng tanlov” tamoyiliga muvofiq oʻtkazilishi belgilanganligi maʼlumot uchun qabul qilinsin.",
    ],
    section2Heading:
      "2. 2024/2025 oʻquv yili uchun davlat oliy taʼlim muassasalariga oʻqishga qabul qilishning davlat buyurtmasi parametrlari:",
    section2Items: [
      "bakalavrlar tayyorlash boʻyicha kunduzgi taʼlim shakliga — 34 838 nafar etib, 1-ilovaga muvofiq;",
      "magistrlar tayyorlash boʻyicha — 9 365 nafar etib, 2-ilovaga muvofiq tasdiqlansin.",
    ],
    section3Heading:
      "3. Oliy taʼlim, fan va innovatsiyalar vazirligi quyidagilarni Oʻzbekiston Respublikasi taʼlim tashkilotlariga qabul qilish boʻyicha davlat komissiyasiga (keyingi oʻrinlarda — Davlat komissiyasi) taqdim etsin:",
    section3AHeading: "a) uch kun muddatda:",
    section3AItems: [
      "davlat buyurtmasining taqsimotida ishtirok etish istagini bildirgan hamda talabalar qabulini davlat oliy taʼlim muassasalari uchun oʻrnatilgan tartib va shartlarda amalga oshiruvchi nodavlat oliy taʼlim tashkilotlari roʻyxatini;",
      "davlat oliy taʼlim muassasalari va davlat buyurtmasining taqsimotida ishtirok etuvchi nodavlat oliy taʼlim tashkilotlarining takliflariga asosan 2024/2025 oʻquv yili uchun oliy taʼlim muassasalari, taʼlim shakllari va taʼlim tillari kesimidagi umumiy qabul parametrlari boʻyicha takliflarni;",
    ],
    section3BHeading: "b) bir hafta muddatda:",
    section3BItems: [
      "respublikada faoliyat yuritayotgan xorijiy oliy taʼlim tashkilotlari va ularning filiallari hamda nodavlat oliy taʼlim tashkilotlariga ajratilgan 1200 ta davlat grantining taqsimoti yuzasidan takliflarni;",
      "Oila va xotin-qizlar qoʻmitasi bilan birgalikda xotin-qizlar uchun ajratilgan 2000 ta davlat grantining taqsimoti yuzasidan takliflarni;",
      "oʻzbek tili va adabiyoti, tarix, madaniyat, sanʼat va hunarmandchilik yoʻnalishlarida oʻqish istagini bildirgan, xorijda istiqomat qilayotgan yosh vatandoshlar uchun 30 ta davlat granti boʻyicha takliflarni.",
    ],
    section4Heading: "4. Davlat komissiyasi bir hafta muddatda 2024/2025 oʻquv yili uchun:",
    section4AHeading: "a) bakalavriat taʼlim yoʻnalishiga qabul boʻyicha:",
    section4AItems: [
      "oliy taʼlim muassasalari, taʼlim shakllari va taʼlim tillari kesimidagi umumiy qabul parametrlarini;",
      "imtiyozga ega abituriyentlar uchun qoʻshimcha qabul parametrlarini;",
      "tegishli bakalavriat taʼlim yoʻnalishining oldingi oʻquv yilidagi oʻrtacha oʻtish ballarini hisobga olgan holda davlat granti va toʻlov-kontrakt asosida oʻqishga qabul qilishning minimal oʻtish balini;",
      "hududlar, sohalar va tarmoqlarning oliy maʼlumotli kadrlarga boʻlgan ehtiyojini taʼminlash uchun davlat organlari va tashkilotlari hamda ustav fondida (ustav kapitalida) davlat ulushi 50 foiz va undan ortiq boʻlgan xoʻjalik jamiyatlari buyurtmalariga muvofiq, umumiy davlat granti asosidagi qabul parametrlari doirasida maqsadli qabul kvotalarini va ushbu kvotalarning tuman (shahar)lar kesimidagi taqsimotini;",
      "har bir bakalavriat taʼlim yoʻnalishi boʻyicha oliy taʼlim tashkilotining umumiy qabul parametriga nisbatan davlat granti kvotasining ulushini taʼlim sohalari (bakalavriat taʼlim yoʻnalishlari) kesimida;",
    ],
    section4B:
      "magistratura mutaxassisliklari boʻyicha qabul parametrlarini davlat granti va toʻlov-kontraktga ajratgan holda oliy taʼlim muassasalari va tillar kesimida tasdiqlasin.",
    section5:
      "Belgilansinki, davlat oliy taʼlim muassasalariga kirishda toʻplagan baliga nisbatan maʼlum miqdordagi qoʻshimcha ball beriladigan shakldagi imtiyozga ega abituriyentlar 2024/2025 oʻquv yilida tanlagan taʼlim yoʻnalishi boʻyicha belgilangan oʻtish bali va undan yuqori ball toʻplagan taqdirda, toʻplagan baliga mos ravishda davlat granti yoki toʻlov-kontrakt asosida qoʻshimcha kvota bilan talabalikka tavsiya etiladi.",
    section6:
      "Mazkur farmoyishning ijrosini samarali tashkil qilishga masʼul va shaxsiy javobgar etib oliy taʼlim, fan va innovatsiyalar vaziri K.A. Sharipov belgilansin.",
    controlParagraph:
      "Farmoyish ijrosini nazorat qilish Oʻzbekiston Respublikasi Bosh vaziri A.N. Aripov va Oʻzbekiston Respublikasi Prezidenti Administratsiyasi Ijtimoiy rivojlanish departamenti rahbari O.K. Abduraxmanov zimmasiga yuklansin.",
    signaturePresident: "Oʻzbekiston Respublikasi Prezidenti Sh. MIRZIYOYEV",
    signaturePlace: "Toshkent sh.,",
    signatureDate: "2024-yil 19-iyul,",
    signatureNumber: "F-36-son",
    lexLinkPrefix: "Batafsil quyidagi havolada:",
  },
  en: {
    documentTitle: "Resolution of the President of the Republic of Uzbekistan No. F-36",
    documentDateLine: "Tashkent, July 19, 2024",
    intro:
      "In order to ensure the training of higher-education specialists in bachelor's degree programs and master's specializations in high demand in developing sectors of the economy, to expand quality higher education opportunities for young people at higher education institutions, and to direct personnel training toward sectoral, regional, and targeted investment projects:",
    section1Heading:
      '1. In accordance with Presidential Decree PF-81 of May 24, 2024, "On Improving the System of Admission to Higher Education Institutions and Placement of the State Order," it is noted for information that:',
    section1Items: [
      "a procedure has been introduced for approving state-order parameters for full-time bachelor's programs and master's specializations;",
      "in distributing state-order quotas, priority has been given to the fields of engineering, medicine, and exact and natural sciences;",
      "private higher education institutions that admit students under the same procedures and conditions as state institutions have been permitted to participate in the distribution of the state order;",
      'starting from the 2024/2025 academic year, admission exams to state higher education institutions will be held under the "test first, then competition" principle.',
    ],
    section2Heading:
      "2. For the 2024/2025 academic year, the following state-order admission parameters for state higher education institutions are approved:",
    section2Items: [
      "for full-time bachelor's training — 34,838 places (per Annex 1);",
      "for master's training — 9,365 places (per Annex 2).",
    ],
    section3Heading:
      "3. The Ministry of Higher Education, Science and Innovation is to submit to the State Commission on Admission to Educational Institutions of the Republic of Uzbekistan (hereinafter — the State Commission):",
    section3AHeading: "a) within three days:",
    section3AItems: [
      "a list of private higher education institutions that have expressed a wish to participate in the distribution of the state order and that admit students under the procedures and conditions established for state institutions;",
      "proposals on overall admission parameters for the 2024/2025 academic year, broken down by institution, form of education, and language of instruction, based on submissions from state institutions and participating private institutions;",
    ],
    section3BHeading: "b) within one week:",
    section3BItems: [
      "proposals on the distribution of 1,200 state grants allocated to foreign higher education institutions and their branches operating in the Republic, as well as to private institutions;",
      "jointly with the Committee on Family and Women's Affairs, proposals on the distribution of 2,000 state grants allocated for women;",
      "proposals on 30 state grants for young compatriots residing abroad who wish to study Uzbek language and literature, history, culture, art, and crafts.",
    ],
    section4Heading:
      "4. Within one week, the State Commission shall approve, for the 2024/2025 academic year:",
    section4AHeading: "a) for bachelor's degree admission:",
    section4AItems: [
      "overall admission parameters broken down by institution, form of education, and language of instruction;",
      "additional admission parameters for applicants with benefits/privileges;",
      "the minimum passing score for admission under state grants and on a fee-contract basis, taking into account the average passing scores of the relevant bachelor's program from the previous academic year;",
      "targeted admission quotas — within the overall state-grant admission parameters — to meet the demand of regions, sectors, and industries for higher-education specialists, in line with orders from state bodies and organizations and business entities with 50% or more state ownership, as well as the distribution of these quotas by district (city);",
      "the share of the state-grant quota relative to each institution's overall admission parameters for each bachelor's program, broken down by field of study;",
    ],
    section4B:
      "b) for master's specializations: admission parameters allocated between state grants and fee-contract basis, broken down by institution and language of instruction.",
    section5:
      "It is established that applicants with benefits, who receive additional points added to their admission test score, will be recommended for enrollment — under a state grant or fee-contract, with an additional quota corresponding to their score — for the 2024/2025 academic year, provided they achieve the established passing score or higher in their chosen field of study.",
    section6:
      "The Minister of Higher Education, Science and Innovation, K.A. Sharipov, is designated as responsible for the effective organization and personal accountability for implementation of this Resolution.",
    controlParagraph:
      "Control over the implementation of this Resolution is entrusted to the Prime Minister of the Republic of Uzbekistan A.N. Aripov and the Head of the Social Development Department of the Presidential Administration of the Republic of Uzbekistan, O.K. Abdurakhmanov.",
    signaturePresident: "President of the Republic of Uzbekistan — Sh. MIRZIYOYEV",
    signaturePlace: "Tashkent,",
    signatureDate: "July 19, 2024,",
    signatureNumber: "No. F-36",
    lexLinkPrefix: "Full text at:",
  },
  ru: {
    documentTitle: "Распоряжение Президента Республики Узбекистан № Ф-36",
    documentDateLine: "г. Ташкент, 19 июля 2024 г.",
    intro:
      "В целях обеспечения подготовки кадров с высшим образованием по направлениям бакалавриата и специальностям магистратуры, пользующимся высоким спросом в развивающихся отраслях экономики, расширения возможностей качественного образования для молодежи в организациях высшего образования, а также направления подготовки кадров на отраслевые, региональные и целевые инвестиционные проекты:",
    section1Heading:
      "1. В соответствии с Указом Президента Республики Узбекистан от 24 мая 2024 года № ПФ-81 «О совершенствовании системы приема в организации высшего образования и размещения государственного заказа» принять к сведению, что:",
    section1Items: [
      "введен порядок утверждения параметров государственного заказа по направлениям бакалавриата и специальностям магистратуры на очной форме обучения;",
      "при распределении квот государственного заказа приоритет отдан областям знаний — инженерии, медицине, точным и естественным наукам;",
      "негосударственным организациям высшего образования, осуществляющим прием студентов на условиях, установленных для государственных вузов, разрешено участвовать в распределении государственного заказа;",
      "начиная с 2024/2025 учебного года вступительные экзамены в государственные вузы будут проводиться по принципу «сначала тест, затем конкурс».",
    ],
    section2Heading:
      "2. Утвердить на 2024/2025 учебный год параметры государственного заказа приема в государственные вузы:",
    section2Items: [
      "по очной форме подготовки бакалавров — 34 838 человек (согласно приложению № 1);",
      "по подготовке магистров — 9 365 человек (согласно приложению № 2).",
    ],
    section3Heading:
      "3. Министерству высшего образования, науки и инноваций представить Государственной комиссии Республики Узбекистан по приему в организации образования (далее — Государственная комиссия):",
    section3AHeading: "а) в трехдневный срок:",
    section3AItems: [
      "перечень негосударственных организаций высшего образования, изъявивших желание участвовать в распределении государственного заказа и осуществляющих прием студентов на условиях, установленных для государственных вузов;",
      "предложения по общим параметрам приема на 2024/2025 учебный год в разрезе вузов, форм и языков обучения на основе предложений государственных и участвующих негосударственных вузов;",
    ],
    section3BHeading: "б) в недельный срок:",
    section3BItems: [
      "предложения по распределению 1200 государственных грантов, выделенных иностранным вузам и их филиалам, действующим в республике, а также негосударственным вузам;",
      "совместно с Комитетом по делам семьи и женщин — предложения по распределению 2000 государственных грантов, выделенных для женщин;",
      "предложения по 30 государственным грантам для молодых соотечественников, проживающих за рубежом, желающих обучаться по направлениям узбекского языка и литературы, истории, культуры, искусства и ремесел.",
    ],
    section4Heading: "4. Государственной комиссии в недельный срок утвердить на 2024/2025 учебный год:",
    section4AHeading: "а) по приему на направления бакалавриата:",
    section4AItems: [
      "общие параметры приема в разрезе вузов, форм и языков обучения;",
      "дополнительные параметры приема для абитуриентов, имеющих льготы;",
      "минимальный проходной балл для приема на основе государственного гранта и на платно-контрактной основе с учетом среднего проходного балла соответствующего направления за предыдущий учебный год;",
      "целевые квоты приема в рамках общих параметров приема на основе государственного гранта — для удовлетворения потребности регионов, отраслей и сфер в кадрах с высшим образованием, в соответствии с заказами государственных органов и организаций, а также хозяйственных обществ с долей государства 50% и более, и распределение этих квот в разрезе районов (городов);",
      "долю квоты государственного гранта по отношению к общим параметрам приема вуза по каждому направлению бакалавриата, в разрезе направлений (сфер) образования;",
    ],
    section4B:
      "б) по специальностям магистратуры — параметры приема с разделением на государственный грант и платно-контрактную основу, в разрезе вузов и языков обучения.",
    section5:
      "Установить, что абитуриенты, имеющие льготы в виде дополнительных баллов к набранному баллу при поступлении, при наборе установленного проходного балла и выше по избранному направлению обучения на 2024/2025 учебный год рекомендуются к зачислению на основе государственного гранта или платно-контрактной основе с дополнительной квотой, соответствующей набранному баллу.",
    section6:
      "Ответственным и персонально отвечающим за эффективную организацию исполнения настоящего распоряжения определить министра высшего образования, науки и инноваций К.А. Шарипова.",
    controlParagraph:
      "Контроль за исполнением настоящего распоряжения возложить на Премьер-министра Республики Узбекистан А.Н. Арипова и руководителя Департамента социального развития Администрации Президента Республики Узбекистан О.К. Абдурахманова.",
    signaturePresident: "Президент Республики Узбекистан Ш. МИРЗИЁЕВ",
    signaturePlace: "г. Ташкент,",
    signatureDate: "19 июля 2024 г.,",
    signatureNumber: "№ Ф-36",
    lexLinkPrefix: "Полный текст:",
  },
  zh: {
    documentTitle: "乌兹别克斯坦共和国总统令 第F-36号",
    documentDateLine: "塔什干市,2024年7月19日",
    intro:
      "为保证在发展中的经济部门和领域急需的学士学位专业和硕士学位专业方向培养高等教育人才,扩大高等教育机构中青年获得优质教育的机会,并使人才培养对接行业、区域及重点投资项目需求:",
    section1Heading:
      "1. 根据乌兹别克斯坦共和国总统2024年5月24日第PF-81号《关于完善高等教育机构招生及国家订单安排制度》的命令,特此通知:",
    section1Items: [
      "已建立按全日制学士专业方向和硕士专业批准国家订单参数的程序;",
      "在国家订单名额分配中,优先考虑工程、医学以及理科和自然科学领域;",
      "按照国立高等院校规定的程序和条件招生的非国立高等教育机构,已被允许参与国家订单的分配;",
      "自2024/2025学年起,国立高等院校的招生考试将按照“先考试、后择优”的原则进行。",
    ],
    section2Heading: "2. 批准2024/2025学年国立高等院校招生的国家订单参数如下:",
    section2Items: [
      "全日制学士培养——34,838人(见附件1);",
      "硕士培养——9,365人(见附件2)。",
    ],
    section3Heading:
      "3. 高等教育、科学与创新部应向乌兹别克斯坦共和国教育机构招生国家委员会(以下简称“国家委员会”)提交以下材料:",
    section3AHeading: "a) 三日内:",
    section3AItems: [
      "表示愿意参与国家订单分配、并按国立高校规定程序和条件招生的非国立高等教育机构名单;",
      "根据国立高校及参与的非国立高校的建议,按院校、教育形式和教学语言划分的2024/2025学年总体招生参数建议;",
    ],
    section3BHeading: "b) 一周内:",
    section3BItems: [
      "关于向在共和国境内运营的外国高等教育机构及其分支机构以及非国立高等教育机构分配的1,200个国家助学金名额分配方案的建议;",
      "与家庭和妇女事务委员会共同制定的关于为妇女分配的2,000个国家助学金名额分配方案的建议;",
      "关于为希望学习乌兹别克语言文学、历史、文化、艺术和手工艺方向、并居住在国外的青年侨胞提供的30个国家助学金名额的建议。",
    ],
    section4Heading: "4. 国家委员会应在一周内批准2024/2025学年:",
    section4AHeading: "a) 学士学位招生方面:",
    section4AItems: [
      "按院校、教育形式和教学语言划分的总体招生参数;",
      "为享有优惠政策的考生制定的额外招生参数;",
      "结合相关学士专业方向上一学年平均录取分数线,确定基于国家助学金和自费合同方式录取的最低录取分数线;",
      "在国家助学金总体招生参数范围内,为满足各地区、行业和部门对高等教育人才的需求,依照国家机关和组织以及国有股份占50%及以上的经济实体的订单要求所设立的定向招生名额,以及该名额按区(市)划分的分配方案;",
      "按教育领域(学士专业方向)划分,每个学士专业方向的国家助学金名额占该院校总体招生参数的比例;",
    ],
    section4B: "b) 硕士专业方面:按院校和教学语言划分,区分国家助学金和自费合同方式的招生参数。",
    section5:
      "规定:享有优惠政策、可在录取分数基础上获得一定附加分的考生,若在2024/2025学年所选教育方向的考试中达到或超过规定的录取分数线,将根据其所获分数,以国家助学金或自费合同方式及相应的附加名额被推荐录取为大学生。",
    section6:
      "指定高等教育、科学与创新部部长К.А.沙里波夫负责并对本命令的有效执行承担个人责任。",
    controlParagraph:
      "本命令执行情况的监督工作交由乌兹别克斯坦共和国总理А.Н.阿里波夫及乌兹别克斯坦共和国总统办公厅社会发展局局长О.К.阿卜杜拉赫马诺夫负责。",
    signaturePresident: "乌兹别克斯坦共和国总统 沙·米尔济约耶夫",
    signaturePlace: "塔什干市,",
    signatureDate: "2024年7月19日,",
    signatureNumber: "第F-36号",
    lexLinkPrefix: "全文链接:",
  },
};
