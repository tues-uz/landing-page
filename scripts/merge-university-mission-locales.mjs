import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const enPath = path.join(root, "public/locales/en/topNav.json");
const ruPath = path.join(root, "public/locales/ru/topNav.json");
const uzPath = path.join(root, "public/locales/uz/topNav.json");

const enContent = JSON.parse(fs.readFileSync(enPath, "utf8"));

/** @type {Record<string, string>} */
const ruTranslations = {
  universityMissionSection1Title: "I. Миссия и видение",
  universityMissionSection1P1:
    "Термезский университет экономики и сервиса (TUES) стремится предоставлять высококачественное высшее образование как студентам Узбекистана, так и иностранным студентам. Мы предлагаем широкий спектр образовательных программ в области экономики, медицины, информатики и других направлений на уровне бакалавриата и магистратуры, обеспечивая выпускникам отличные возможности на глобальном рынке труда.",
  universityMissionSection1P2:
    "Наши ключевые ценности в TUES включают готовность принимать новые идеи и подходы, развитие коллегиального партнёрства в академическом сообществе и соблюдение принципов свободного выражения мнений и идей.",
  universityMissionSection1P3:
    "Термезский университет экономики и сервиса (TUES) руководствуется следующими ценностями:",
  universityMissionSection1Value1: "Стремление к совершенству",
  universityMissionSection1Value2: "Интернационализация",
  universityMissionSection1Value3: "Традиционные ценности",
  universityMissionSection1Value4: "Общественная ответственность",
  universityMissionSection1P4:
    "Опираясь на эти ценности, TUES стремится расширять возможности людей и формировать будущее Узбекистана и мирового сообщества.",

  universityMissionSection2Title: "II. Стратегический план развития",
  universityMissionSection2ObjectivesTitle: "Стратегические цели",
  universityMissionSection2ObjectivesIntro: "Университет сосредоточен на следующих стратегических целях:",
  universityMissionSection2Objective1: "Повышение качества образования в соответствии с международными стандартами",
  universityMissionSection2Objective2: "Укрепление исследовательского и инновационного потенциала",
  universityMissionSection2Objective3: "Расширение международного сотрудничества и академической мобильности",
  universityMissionSection2Objective4: "Ускорение цифровой трансформации в образовании и управлении",
  universityMissionSection2Objective5: "Продвижение принципов устойчивого развития",
  universityMissionSection2GoalsTitle: "Стратегические задачи",
  universityMissionSection2GoalsIntro: "Ключевые стратегические задачи включают:",
  universityMissionSection2Goal1: "Увеличение числа международных партнёрств и совместных программ",
  universityMissionSection2Goal2: "Улучшение позиций университета в международных рейтингах",
  universityMissionSection2Goal3: "Рост числа научных публикаций и исследовательских проектов",
  universityMissionSection2Goal4: "Повышение трудоустройства выпускников",
  universityMissionSection2Goal5: "Расширение цифровых образовательных платформ и инфраструктуры",
  universityMissionSection2ImplementationTitle: "План реализации",
  universityMissionSection2ImplementationP1:
    "Реализация стратегического плана осуществляется через ежегодные планы действий, чётко определённые зоны ответственности и измеримые показатели эффективности (KPI). Ход выполнения регулярно контролируется, а корректировки вносятся на основе оценки результатов и потребностей учреждения.",
  universityMissionSection2DocsTitle: "Сопроводительные документы (rivojlanish strategiyasi)",
  universityMissionSection2PdfLabel: "Скачать стратегию развития (PDF)",
  universityMissionSection2PdfPlaceholder: "Стратегия развития (PDF) — ссылка на файл будет добавлена",

  universityMissionSection3Title: "III. Система управления рисками",
  universityMissionSection3P1:
    "Университет создал комплексную систему управления рисками для выявления, оценки и снижения потенциальных рисков, которые могут повлиять на его стратегические цели и операционную деятельность. Эта система обеспечивает институциональную стабильность, подотчётность и долгосрочную устойчивость.",
  universityMissionSection3RiskIdTitle: "Идентификация рисков и категории",
  universityMissionSection3RiskIdIntro: "Университет выявляет и отслеживает ключевые категории рисков, включая:",
  universityMissionSection3Risk1: "Академические риски (качество образования, актуальность учебных программ)",
  universityMissionSection3Risk2: "Финансовые риски (бюджетные ограничения, устойчивость финансирования)",
  universityMissionSection3Risk3: "Операционные риски (административные процессы)",
  universityMissionSection3RiskIdP2:
    "Каждый выявленный риск оценивается с учётом вероятности и потенциального воздействия. Риски ранжируются, чтобы критически важные области получали немедленное внимание и соответствующее распределение ресурсов.",
  universityMissionSection3MitigationTitle: "Меры по снижению рисков",
  universityMissionSection3MitigationIntro: "Для минимизации рисков университет реализует следующие меры:",
  universityMissionSection3Mitigation1: "Непрерывный мониторинг качества образования и показателей эффективности",
  universityMissionSection3Mitigation2: "Диверсификация финансовых ресурсов и источников финансирования",
  universityMissionSection3Mitigation3: "Укрепление систем внутреннего контроля и аудита",
  universityMissionSection3Mitigation4: "Регулярное обучение персонала и развитие компетенций",
  universityMissionSection3Mitigation5: "Модернизация IT-инфраструктуры и систем защиты данных",
  universityMissionSection3GovernanceTitle: "Структура управления и отчётности",
  universityMissionSection3GovernanceP1:
    "Управление рисками осуществляется под руководством руководства университета и соответствующих административных подразделений. Специальный комитет или ответственное подразделение отслеживает вопросы, связанные с рисками, и регулярно докладывает руководству университета.",
  universityMissionSection3GovernanceP2:
    "Регулярно готовятся отчёты для обеспечения прозрачности, подотчётности и своевременного принятия решений в ответ на возникающие риски.",

  universityMissionSection4Title: "IV. «Зелёное» развитие и устойчивость",
  universityMissionSection4P1:
    "Университет стремится продвигать экологическую устойчивость и интегрировать принципы «зелёного» развития в свои стратегические приоритеты. Устойчивость встроена в образование, работу кампуса и взаимодействие с обществом.",
  universityMissionSection4GreenCampusTitle: "Инициативы «зелёного» кампуса",
  universityMissionSection4GreenCampusIntro:
    "Университет реализует инициативы «зелёного» кампуса, направленные на снижение воздействия на окружающую среду и рациональное использование ресурсов, включая:",
  universityMissionSection4Initiative1: "Энергосберегающие технологии и эффективные системы освещения",
  universityMissionSection4Initiative2: "Рациональное использование водных ресурсов",
  universityMissionSection4Initiative3: "Сокращение отходов и практики переработки",
  universityMissionSection4Initiative4: "Создание зелёных зон и благоустройство территории",
  universityMissionSection4SustainableEducationTitle: "Устойчивое образование и исследования",
  universityMissionSection4SustainableEducationP1:
    "Принципы устойчивости интегрированы в академические программы и исследовательскую деятельность. Студентов поощряют разрабатывать экологически ответственные решения через учебные задания, проекты и научные исследования.",
  universityMissionSection4EnvironmentalAwarenessTitle: "Экологическая осведомлённость и вовлечение общества",
  universityMissionSection4EnvironmentalAwarenessP1:
    "Университет активно продвигает экологическую осведомлённость через кампании, семинары и студенческие инициативы. Сотрудничество с местными и международными партнёрами способствует развитию устойчивых практик и экологической ответственности.",
  universityMissionSection4FutureGoalsTitle: "Будущие цели устойчивого развития",
  universityMissionSection4FutureGoalsIntro: "Университет стремится дальше укреплять свои усилия в области устойчивости путём:",
  universityMissionSection4FutureGoal1: "Расширения «зелёной» инфраструктуры и мер энергоэффективности",
  universityMissionSection4FutureGoal2: "Расширения программ экологического образования",
  universityMissionSection4FutureGoal3: "Поддержки устойчивых исследовательских и инновационных проектов",
  universityMissionSection4FutureGoal4: "Укрепления партнёрств, ориентированных на устойчивость и климатические действия",
  universityMissionSection4DocsTitle: "Сопроводительные документы (yashil strategiya)",
  universityMissionSection4PdfLabel: "Скачать «зелёную» стратегию (PDF)",
  universityMissionSection4PdfPlaceholder: "Стратегия «зелёного» развития (PDF) — ссылка на файл будет добавлена",

  universityMissionSection5Title: "V. Институциональные политики",

  universityMissionPolicy51Title: "5.1 Политика академической свободы",
  universityMissionPolicy51P1:
    "Университет стремится соблюдать принципы академической свободы, которые необходимы для развития знаний, критического мышления и инноваций.",
  universityMissionPolicy51P2:
    "Профессорско-преподавательскому составу и студентам предоставляется свобода преподавать, учиться, проводить исследования и выражать идеи без необоснованного вмешательства или ограничений в рамках этических стандартов и действующего законодательства.",
  universityMissionPolicy51P3:
    "Университет обеспечивает ответственное осуществление академической свободы, уважая разнообразие мнений, академическую добросовестность и взаимное уважение среди всех членов академического сообщества.",
  universityMissionPolicy51P4:
    "Институциональные политики и структуры управления поддерживают и защищают академическую независимость, обеспечивая, чтобы преподавательская и исследовательская деятельность была свободна от внешнего давления или влияния.",

  universityMissionPolicy52Title: "5.2 Политика против взяточничества и коррупции",
  universityMissionPolicy52P1:
    "Университет стремится поддерживать высочайшие стандарты добросовестности, прозрачности и подотчётности во всей академической, административной и финансовой деятельности.",
  universityMissionPolicy52P2:
    "Учреждение придерживается нулевой терпимости к взяточничеству и коррупции. Все формы неэтичного поведения, включая предложение, дачу, получение или склонение к взяткам, строго запрещены.",
  universityMissionPolicy52P3:
    "Установлены чёткие процедуры для предотвращения, выявления и устранения коррупционных рисков. Они включают внутренний контроль, финансовый надзор и механизмы соответствия, согласованные с национальными нормами и международными лучшими практиками.",
  universityMissionPolicy52P4:
    "От всех сотрудников, студентов и заинтересованных сторон ожидается честность и добросовестность. О любых подозрениях во взяточничестве или коррупции можно сообщить через установленные каналы, и будут приняты соответствующие дисциплинарные меры в соответствии с институциональными политиками.",
  universityMissionPolicy52P5:
    "Реализация антикоррупционных мер осуществляется под контролем Департамента комплаенс-контроля, который обеспечивает прозрачность, подотчётность и соблюдение этических стандартов во всём университете.",

  universityMissionPolicy53Title: "5.3 Политика устойчивых инвестиций",
  universityMissionPolicy53P1:
    "Университет стремится к ответственным и устойчивым инвестиционным практикам, поддерживающим долгосрочную экологическую, социальную и экономическую ценность.",
  universityMissionPolicy53P2:
    "Инвестиционные решения руководствуются принципами устойчивости, этической ответственности и осведомлённости о рисках. Университет отдаёт приоритет инвестициям, способствующим защите окружающей среды, социальному благополучию и надлежащему управлению (стандарты ESG).",
  universityMissionPolicy53P3:
    "Учреждение избегает инвестиций в деятельность, которая может нанести вред окружающей среде, нарушить права человека или противоречить этическим стандартам. Предпочтение отдаётся проектам и партнёрам, продвигающим инновации, устойчивость и позитивное социальное воздействие.",
  universityMissionPolicy53P4:
    "Инвестиционная деятельность контролируется для обеспечения прозрачности, подотчётности и соответствия стратегическим целям университета и обязательствам в области устойчивости.",
  universityMissionPolicy53P5:
    "Университет постоянно пересматривает свой инвестиционный портфель для улучшения показателей устойчивости и интеграции лучших международных практик.",

  universityMissionPolicy54Title: "5.4 Политика устойчивых закупок",
  universityMissionPolicy54P1:
    "Университет стремится к практикам устойчивых закупок, которые минимизируют воздействие на окружающую среду и способствуют социальной ответственности.",
  universityMissionPolicy54P2:
    "Процессы закупок отдают приоритет экологически безопасным, энергоэффективным и ресурсосберегающим товарам и услугам. Университет поощряет использование переработанных материалов, экологически маркированной продукции и устойчивых технологий.",
  universityMissionPolicy54P3:
    "От поставщиков и партнёров ожидается соблюдение этических, экологических и социальных стандартов. Предпочтение отдаётся поставщикам, демонстрирующим ответственные деловые практики и обязательства в области устойчивости.",
  universityMissionPolicy54P4:
    "Университет интегрирует критерии устойчивости в решения о закупках для поддержки долгосрочной защиты окружающей среды, экономической эффективности и институциональной ответственности.",

  universityMissionPolicy55Title: "5.5 Политика против современного рабства",
  universityMissionPolicy55P1:
    "Университет стремится предотвращать все формы современного рабства, включая принудительный труд, торговлю людьми и эксплуатацию, в своей деятельности и цепочках поставок.",
  universityMissionPolicy55P2:
    "Учреждение защищает права человека и обеспечивает, чтобы все сотрудники, партнёры и поставщики действовали в соответствии с этическими и правовыми стандартами. Любая форма принуждения, принудительного труда или эксплуатации строго запрещена.",
  universityMissionPolicy55P3:
    "Университет продвигает прозрачность и должную осмотрительность в процессах закупок и партнёрства для минимизации риска практик современного рабства.",
  universityMissionPolicy55P4:
    "Все сотрудники и заинтересованные стороны поощряются сообщать о любых опасениях, связанных с современным рабством, через соответствующие каналы. Университет серьёзно относится ко всем сообщениям и обеспечивает принятие соответствующих мер в соответствии с институциональными политиками и правовыми требованиями.",
  universityMissionPolicy55P5:
    "При возникновении опасений или подозрений в нарушениях лицам рекомендуется сообщать об этом через официальные каналы.",
  universityMissionPolicy55P6:
    "Сообщения можно направлять конфиденциально в Департамент комплаенс-контроля, который отвечает за обеспечение прозрачности, подотчётности и соблюдения этических стандартов в университете.",

  universityMissionPolicy56Title: "5.6 Политика безопасности студентов",
  universityMissionPolicy56P1:
    "Университет стремится обеспечить безопасную, защищённую и поддерживающую среду для всех студентов в академической, жилой и кампусной деятельности.",
  universityMissionPolicy56P2:
    "Реализуются меры для защиты студентов от физических, психологических и социальных рисков. Они включают системы безопасности кампуса, правила охраны труда и техники безопасности, процедуры реагирования на чрезвычайные ситуации и службы поддержки студентов.",
  universityMissionPolicy56P3:
    "Университет продвигает культуру уважения, ответственности и благополучия, обеспечивая справедливое отношение ко всем студентам и защиту от домогательств, дискриминации и небезопасных условий.",
  universityMissionPolicy56P4:
    "Регулярно проводятся мониторинг и превентивные меры для поддержания безопасной образовательной среды и эффективного реагирования на любые инциденты.",
  universityMissionPolicy56P5:
    "Студентов поощряют сообщать о любых опасениях, связанных с безопасностью, через установленные каналы. Сообщения можно направлять в соответствующие подразделения университета, ответственные за студенческие дела и безопасность, включая Департамент комплаенс-контроля и службы поддержки студентов.",
  universityMissionPolicy56P6:
    "Все сообщения обрабатываются конфиденциально и оперативно рассматриваются в соответствии с институциональными процедурами.",

  universityMissionPolicy57Title: "5.7 Политика разнообразия и инклюзивности",
  universityMissionPolicy57P1:
    "Университет стремится создавать разнообразную, справедливую и инклюзивную среду для всех студентов, преподавателей, сотрудников и заинтересованных сторон независимо от расы, этнической принадлежности, национальности, пола, возраста, религии, инвалидности, сексуальной ориентации или социально-экономического происхождения.",
  universityMissionPolicy57P2:
    "Учреждение признаёт, что разнообразие обогащает академический опыт, усиливает инновации и укрепляет вовлечение общества. Инклюзивность встроена в политики университета, процессы набора и приёма, разработку учебных программ, кампусную жизнь и структуры принятия решений.",
  universityMissionPolicy57P3:
    "Университет продвигает равные возможности и принимает проактивные меры для устранения дискриминации, домогательств и предвзятости. Предоставляются разумные условия для поддержки лиц с инвалидностью и других особых потребностей.",
  universityMissionPolicy57P4:
    "Для сотрудников и студентов регулярно организуются программы обучения и повышения осведомлённости о разнообразии, равенстве и инклюзивности. Университет также поощряет создание инклюзивных студенческих групп и форумов для продвижения межкультурного понимания и взаимного уважения.",
  universityMissionPolicy57P5:
    "Существуют механизмы мониторинга для оценки прогресса в достижении целей разнообразия и решения любых вопросов, связанных с неравенством или исключением. Отчёты об усилиях в области разнообразия и инклюзивности периодически рассматриваются руководством университета.",
  universityMissionPolicy57P6:
    "Все члены университетского сообщества поощряются сообщать о любых формах дискриминации или исключения через официальные каналы.",

  universityMissionLearnMorePrefix: "Подробнее — ",
  universityMissionReportConcernsPrefix: "Сообщить о проблеме — ",
  universityMissionLinkEducationalMethodologicalDept: "Учебно-методический отдел",
  universityMissionLinkComplianceControlDept: "Департамент комплаенс-контроля",
  universityMissionLinkAccountingAuditDept: "Отдел бухгалтерии и аудита",
};

/** @type {Record<string, string>} */
const uzTranslations = {
  universityMissionSection1Title: "I. Missiya va maqsad",
  universityMissionSection1P1:
    "Termiz iqtisodiyot va servis universiteti (TUES) O‘zbekiston va xorijiy talabalarga yuqori sifatli oliy ta’lim berishga intiladi. Biz iqtisodiyot, tibbiyot, informatika va boshqa yo‘nalishlarda bakalavriat hamda magistratura darajasidagi turli ta’lim dasturlarini taklif etib, bitiruvchilarni global mehnat bozoridagi keng imkoniyatlar bilan ta’minlaymiz.",
  universityMissionSection1P2:
    "TUESdagi asosiy qadriyatlarimiz yangi g‘oya va yondashuvlarni qabul qilish, akademik hamjamiyatda hamkorlikni mustahkamlash hamda fikr va g‘oyalarni erkin ifoda etish tamoyillariga rioya qilishni o‘z ichiga oladi.",
  universityMissionSection1P3:
    "Termiz iqtisodiyot va servis universiteti (TUES) quyidagi qadriyatlarga amal qiladi:",
  universityMissionSection1Value1: "Mukammallikka sodiqlik",
  universityMissionSection1Value2: "Xalqarolashtirish",
  universityMissionSection1Value3: "An’anaviy qadriyatlar",
  universityMissionSection1Value4: "Jamiyat oldidagi mas’uliyat",
  universityMissionSection1P4:
    "Ushbu qadriyatlar asosida TUES insonlarni kuchaytirish hamda O‘zbekiston va global hamjamiyat kelajagini shakllantirishga intiladi.",

  universityMissionSection2Title: "II. Strategik rivojlanish rejasi",
  universityMissionSection2ObjectivesTitle: "Strategik maqsadlar",
  universityMissionSection2ObjectivesIntro: "Universitet quyidagi strategik maqsadlarga e’tibor qaratadi:",
  universityMissionSection2Objective1: "Xalqaro standartlarga muvofiq ta’lim sifatini oshirish",
  universityMissionSection2Objective2: "Tadqiqot va innovatsiya salohiyatini mustahkamlash",
  universityMissionSection2Objective3: "Xalqaro hamkorlik va akademik mobillikni kengaytirish",
  universityMissionSection2Objective4: "Ta’lim va boshqaruvda raqamli transformatsiyani tezlashtirish",
  universityMissionSection2Objective5: "Barqaror rivojlanish tamoyillarini ilgari surish",
  universityMissionSection2GoalsTitle: "Strategik vazifalar",
  universityMissionSection2GoalsIntro: "Asosiy strategik vazifalar quyidagilarni o‘z ichiga oladi:",
  universityMissionSection2Goal1: "Xalqaro hamkorlik va qo‘shma dasturlar sonini oshirish",
  universityMissionSection2Goal2: "Universitetning xalqaro reytinglardagi o‘rnini yaxshilash",
  universityMissionSection2Goal3: "Ilmiy nashrlar va tadqiqot loyihalari sonini oshirish",
  universityMissionSection2Goal4: "Bitiruvchilarning bandligini oshirish",
  universityMissionSection2Goal5: "Raqamli o‘quv platformalari va infratuzilmani kengaytirish",
  universityMissionSection2ImplementationTitle: "Amalga oshirish rejasi",
  universityMissionSection2ImplementationP1:
    "Strategik rejaning amalga oshirilishi yillik harakat rejalari, aniq belgilangan mas’uliyatlar va o‘lchanadigan samaradorlik ko‘rsatkichlari (KPI) orqali amalga oshiriladi. Jarayon muntazam kuzatiladi va natijalar baholash hamda muassasa ehtiyojlariga ko‘ra tuzatishlar kiritiladi.",
  universityMissionSection2DocsTitle: "Qoʻllab-quvvatlovchi hujjatlar (rivojlanish strategiyasi)",
  universityMissionSection2PdfLabel: "Rivojlanish strategiyasini yuklab olish (PDF)",
  universityMissionSection2PdfPlaceholder: "Rivojlanish strategiyasi (PDF) — fayl havolasi keyinroq qo‘shiladi",

  universityMissionSection3Title: "III. Xavflarni boshqarish tizimi",
  universityMissionSection3P1:
    "Universitet strategik maqsadlari va operatsion faoliyatiga ta’sir qilishi mumkin bo‘lgan xavflarni aniqlash, baholash va kamaytirish uchun keng qamrovli xavflarni boshqarish tizimini joriy qilgan. Ushbu tizim institutsional barqarorlik, hisobdorlik va uzoq muddatli barqarorlikni ta’minlaydi.",
  universityMissionSection3RiskIdTitle: "Xavflarni aniqlash va toifalar",
  universityMissionSection3RiskIdIntro: "Universitet quyidagi asosiy xavf toifalarini aniqlaydi va kuzatadi:",
  universityMissionSection3Risk1: "Akademik xavflar (ta’lim sifati, o‘quv dasturlarining dolzarbligi)",
  universityMissionSection3Risk2: "Moliyaviy xavflar (byudjet cheklovlari, moliyalashtirish barqarorligi)",
  universityMissionSection3Risk3: "Operatsion xavflar (ma’muriy jarayonlar)",
  universityMissionSection3RiskIdP2:
    "Har bir aniqlangan xavf ehtimolligi va potensial ta’siri bo‘yicha baholanadi. Xavflar ustuvorlashtiriladi, shunda muhim sohalar darhol e’tibor va tegishli resurs ajratilishini oladi.",
  universityMissionSection3MitigationTitle: "Xavflarni kamaytirish choraları",
  universityMissionSection3MitigationIntro: "Xavflarni minimallashtirish uchun universitet quyidagi choraları amalga oshiradi:",
  universityMissionSection3Mitigation1: "Ta’lim sifati va samaradorlik ko‘rsatkichlarini doimiy monitoring qilish",
  universityMissionSection3Mitigation2: "Moliyaviy resurslar va moliyalashtirish manbalarini diversifikatsiya qilish",
  universityMissionSection3Mitigation3: "Ichki nazorat va audit tizimlarini mustahkamlash",
  universityMissionSection3Mitigation4: "Xodimlarni muntazam o‘qitish va salohiyatini oshirish",
  universityMissionSection3Mitigation5: "IT infratuzilma va ma’lumotlarni himoya qilish tizimlarini modernizatsiya qilish",
  universityMissionSection3GovernanceTitle: "Boshqaruv va hisobot tuzilmasi",
  universityMissionSection3GovernanceP1:
    "Xavflarni boshqarish universitet rahbariyati va tegishli ma’muriy bo‘linmalar nazorati ostida amalga oshiriladi. Maxsus qo‘mita yoki mas’ul bo‘linma xavflar bilan bog‘liq masalalarni kuzatadi va universitet boshqaruviga muntazam hisobot beradi.",
  universityMissionSection3GovernanceP2:
    "Shaffoflik, hisobdorlik va paydo bo‘layotgan xavflarga o‘z vaqtida javob berish uchun muntazam hisobotlar tayyorlanadi.",

  universityMissionSection4Title: "IV. Yashil rivojlanish va barqarorlik",
  universityMissionSection4P1:
    "Universitet ekologik barqarorlikni ilgari surish va yashil rivojlanish tamoyillarini strategik ustuvor yo‘nalishlariga integratsiya qilishga intiladi. Barqarorlik ta’lim, kampus faoliyati va jamiyat bilan hamkorlikka singdirilgan.",
  universityMissionSection4GreenCampusTitle: "Yashil kampus tashabbuslari",
  universityMissionSection4GreenCampusIntro:
    "Universitet atrof-muhitga ta’sirni kamaytirish va resurslardan samarali foydalanishni rag‘batlantirishga qaratilgan yashil kampus tashabbuslarini amalga oshiradi, jumladan:",
  universityMissionSection4Initiative1: "Energiya tejovchi texnologiyalar va samarali yoritish tizimlari",
  universityMissionSection4Initiative2: "Suv resurslaridan oqilona foydalanish",
  universityMissionSection4Initiative3: "Chiqindilarni kamaytirish va qayta ishlash amaliyotlari",
  universityMissionSection4Initiative4: "Yashil maydonlar va landshaft dizaynini rivojlantirish",
  universityMissionSection4SustainableEducationTitle: "Barqaror ta’lim va tadqiqot",
  universityMissionSection4SustainableEducationP1:
    "Barqarorlik tamoyillari akademik dasturlar va tadqiqot faoliyatiga integratsiya qilingan. Talabalar kurs ishlari, loyihalar va ilmiy tadqiqotlar orqali ekologik mas’ul yechimlar ishlab chiqishga rag‘batlantiriladi.",
  universityMissionSection4EnvironmentalAwarenessTitle: "Ekologik ong va jamiyat bilan hamkorlik",
  universityMissionSection4EnvironmentalAwarenessP1:
    "Universitet kampaniyalar, seminarlar va talaba tashabbuslari orqali ekologik ongni faol ravishda oshiradi. Mahalliy va xalqaro hamkorlar bilan hamkorlik barqaror amaliyotlar va ekologik mas’uliyatni rivojlantirishga xizmat qiladi.",
  universityMissionSection4FutureGoalsTitle: "Kelajakdagi barqarorlik maqsadlari",
  universityMissionSection4FutureGoalsIntro: "Universitet barqarorlik bo‘yicha sa’y-harakatlarini quyidagilar orqali yanada mustahkamlashni maqsad qiladi:",
  universityMissionSection4FutureGoal1: "Yashil infratuzilma va energiya samaradorligi choralarini kengaytirish",
  universityMissionSection4FutureGoal2: "Ekologik ta’lim dasturlarini ko‘paytirish",
  universityMissionSection4FutureGoal3: "Barqaror tadqiqot va innovatsion loyihalarni qo‘llab-quvvatlash",
  universityMissionSection4FutureGoal4: "Barqarorlik va iqlim harakatlariga qaratilgan hamkorlikni kuchaytirish",
  universityMissionSection4DocsTitle: "Qoʻllab-quvvatlovchi hujjatlar (yashil strategiya)",
  universityMissionSection4PdfLabel: "Yashil strategiyani yuklab olish (PDF)",
  universityMissionSection4PdfPlaceholder: "Yashil rivojlanish strategiyasi (PDF) — fayl havolasi keyinroq qo‘shiladi",

  universityMissionSection5Title: "V. Institutsional siyosatlar",

  universityMissionPolicy51Title: "5.1 Akademik erkinlik siyosati",
  universityMissionPolicy51P1:
    "Universitet bilim rivojlanishi, tanqidiy fikrlash va innovatsiyalar uchun zarur bo‘lgan akademik erkinlik tamoyillariga rioya qilishga intiladi.",
  universityMissionPolicy51P2:
    "Professor-o‘qituvchilar va talabalarga axloqiy standartlar va amaldagi qonunlar doirasida o‘qitish, o‘rganish, tadqiqot olib borish va g‘oyalarni ifoda etish erkinligi beriladi.",
  universityMissionPolicy51P3:
    "Universitet akademik erkinlik mas’uliyat bilan amalga oshirilishini ta’minlaydi, fikr xilma-xilligini, akademik halollikni va akademik hamjamiyat a’zolari o‘rtasidagi o‘zaro hurmatni qo‘llab-quvvatlaydi.",
  universityMissionPolicy51P4:
    "Institutsional siyosatlar va boshqaruv tuzilmalari akademik mustaqillikni qo‘llab-quvvatlaydi va himoya qiladi, o‘qitish va tadqiqot faoliyati tashqi bosim yoki ta’sirdan xoli bo‘lishini ta’minlaydi.",

  universityMissionPolicy52Title: "5.2 Pora va korrupsiyaga qarshi siyosat",
  universityMissionPolicy52P1:
    "Universitet barcha akademik, ma’muriy va moliyaviy faoliyatda eng yuqori halollik, shaffoflik va hisobdorlik standartlarini saqlashga intiladi.",
  universityMissionPolicy52P2:
    "Muassasa pora va korrupsiyaga nolga teng yondashuvni qabul qiladi. Pora taklif qilish, berish, olish yoki undirishni o‘z ichiga olgan barcha noaxloqiy xatti-harakatlar qat’iyan taqiqlanadi.",
  universityMissionPolicy52P3:
    "Korrupsiya xavflarini oldini olish, aniqlash va bartaraf etish uchun aniq tartiblar belgilangan. Ular ichki nazorat, moliyaviy nazorat va milliy qoidalar hamda xalqaro eng yaxshi amaliyotlar bilan mos keladigan muvofiqlik mexanizmlarini o‘z ichiga oladi.",
  universityMissionPolicy52P4:
    "Barcha xodimlar, talabalar va manfaatdor tomonlardan halollik va axloqiylik kutiladi. Pora yoki korrupsiya haqidagi har qanday shubhalar belgilangan kanallar orqali xabar qilinishi mumkin va institutsional siyosatlarga muvofiq tegishli intizomiy choralar ko‘riladi.",
  universityMissionPolicy52P5:
    "Korrupsiyaga qarshi choralar amalga oshirilishi Muvofiqlik nazorati departamenti nazorati ostida amalga oshiriladi, u universitet bo‘ylab shaffoflik, hisobdorlik va axloqiy standartlarga rioya qilishni ta’minlaydi.",

  universityMissionPolicy53Title: "5.3 Barqaror investitsiya siyosati",
  universityMissionPolicy53P1:
    "Universitet uzoq muddatli ekologik, ijtimoiy va iqtisodiy qiymatni qo‘llab-quvvatlaydigan mas’ul va barqaror investitsiya amaliyotlariga intiladi.",
  universityMissionPolicy53P2:
    "Investitsiya qarorlari barqarorlik, axloqiy mas’uliyat va xavf-xatarlarni anglash tamoyillari asosida qabul qilinadi. Universitet atrof-muhitni himoya qilish, ijtimoiy farovonlik va yaxshi boshqaruv (ESG standartlari) ga hissa qo‘shadigan investitsiyalarga ustuvorlik beradi.",
  universityMissionPolicy53P3:
    "Muassasa atrof-muhitga zarar yetkazishi, inson huquqlarini buzishi yoki axloqiy standartlarga zid bo‘lishi mumkin bo‘lgan faoliyatlarga investitsiya qilishdan qochadi. Innovatsiya, barqarorlik va ijtimoiy ijobiy ta’sirni ilgari suradigan loyihalar va hamkorlarga afzallik beriladi.",
  universityMissionPolicy53P4:
    "Investitsiya faoliyati shaffoflik, hisobdorlik hamda universitetning strategik maqsadlari va barqarorlik majburiyatlariga muvofiqligini ta’minlash uchun kuzatiladi.",
  universityMissionPolicy53P5:
    "Universitet barqarorlik ko‘rsatkichlarini yaxshilash va eng yaxshi xalqaro amaliyotlarni integratsiya qilish uchun investitsiya portfelini doimiy ravishda ko‘rib chiqadi.",

  universityMissionPolicy54Title: "5.4 Barqaror xarid siyosati",
  universityMissionPolicy54P1:
    "Universitet atrof-muhitga ta’sirni minimallashtiradigan va ijtimoiy mas’uliyatni rag‘batlantiradigan barqaror xarid amaliyotlariga intiladi.",
  universityMissionPolicy54P2:
    "Xarid jarayonlarida ekologik toza, energiya tejamkor va resurs tejaydigan mahsulot va xizmatlarga ustuvorlik beriladi. Universitet qayta ishlangan materiallar, ekologik belgilangan mahsulotlar va barqaror texnologiyalardan foydalanishni rag‘batlantiradi.",
  universityMissionPolicy54P3:
    "Yetkazib beruvchilar va hamkorlardan axloqiy, ekologik va ijtimoiy standartlarga rioya qilish kutiladi. Mas’uliy biznes amaliyotlari va barqarorlik majburiyatlarini namoyish etadigan yetkazib beruvchilarga afzallik beriladi.",
  universityMissionPolicy54P4:
    "Universitet uzoq muddatli ekologik himoya, xarajatlarni tejash va institutsional mas’uliyatni qo‘llab-quvvatlash uchun xarid qarorlariga barqarorlik mezonlarini integratsiya qiladi.",

  universityMissionPolicy55Title: "5.5 Zamonaviy qullik siyosati",
  universityMissionPolicy55P1:
    "Universitet o‘z faoliyati va ta’minot zanjirlarida majburiy mehnat, odam savdosi va ekspluatatsiyani o‘z ichiga olgan zamonaviy qullikning barcha shakllarini oldini olishga intiladi.",
  universityMissionPolicy55P2:
    "Muassasa inson huquqlarini himoya qiladi va barcha xodimlar, hamkorlar va yetkazib beruvchilar axloqiy va huquqiy standartlarga muvofiq faoliyat yuritishini ta’minlaydi. Har qanday majburlash, majburiy mehnat yoki ekspluatatsiya qat’iyan taqiqlanadi.",
  universityMissionPolicy55P3:
    "Universitet zamonaviy qullik amaliyotlari xavfini minimallashtirish uchun xarid va hamkorlik jarayonlarida shaffoflik va ehtiyotkorlikni rag‘batlantiradi.",
  universityMissionPolicy55P4:
    "Barcha xodimlar va manfaatdor tomonlar zamonaviy qullikka oid har qanday tashvishlar haqida tegishli kanallar orqali xabar berishga rag‘batlantiriladi. Universitet barcha xabarlarga jiddiy yondashadi va institutsional siyosatlar hamda qonuniy talablarga muvofiq tegishli choralar ko‘rilishini ta’minlaydi.",
  universityMissionPolicy55P5:
    "Har qanday tashvish yoki qoidabuzarlik shubhalari paydo bo‘lsa, shaxslar rasmiy kanallar orqali xabar berishga rag‘batlantiriladi.",
  universityMissionPolicy55P6:
    "Xabarlar maxfiylik bilan Muvofiqlik nazorati departamentiga topshirilishi mumkin, u universitetda shaffoflik, hisobdorlik va axloqiy standartlarga rioya qilishni ta’minlaydi.",

  universityMissionPolicy56Title: "5.6 Talabalar xavfsizligi siyosati",
  universityMissionPolicy56P1:
    "Universitet barcha talabalar uchun akademik, turar joy va kampus faoliyatida xavfsiz, himoyalangan va qo‘llab-quvvatlovchi muhitni ta’minlashga intiladi.",
  universityMissionPolicy56P2:
    "Talabalarni jismoniy, psixologik va ijtimoiy xavflardan himoya qilish choraları amalga oshiriladi. Ular kampus xavfsizligi tizimlari, sog‘liqni saqlash va xavfsizlik qoidalarini, favqulodda vaziyatlarga javob berish tartiblarini va talabalarni qo‘llab-quvvatlash xizmatlarini o‘z ichiga oladi.",
  universityMissionPolicy56P3:
    "Universitet hurmat, mas’uliyat va farovonlik madaniyatini rivojlantiradi, barcha talabalar adolatli muomala qilinishini hamda ta’qib, kamsitish va xavfli sharoitlardan himoya qilinishini ta’minlaydi.",
  universityMissionPolicy56P4:
    "Xavfsiz o‘quv muhitini saqlash va har qanday hodisalarga samarali javob berish uchun muntazam monitoring va profilaktik choralar amalga oshiriladi.",
  universityMissionPolicy56P5:
    "Talabalar xavfsizlikka oid har qanday tashvishlar haqida belgilangan kanallar orqali xabar berishga rag‘batlantiriladi. Xabarlar talaba ishlariga va xavfsizlikka mas’ul universitet bo‘linmalariga, jumladan Muvofiqlik nazorati departamenti va Talabalarni qo‘llab-quvvatlash xizmatlariga topshirilishi mumkin.",
  universityMissionPolicy56P6:
    "Barcha xabarlar maxfiylik bilan ko‘rib chiqiladi va institutsional tartiblarga muvofiq tezkor hal etiladi.",

  universityMissionPolicy57Title: "5.7 Xilma-xillik va inklyuzivlik siyosati",
  universityMissionPolicy57P1:
    "Universitet irq, etnik kelib chiqishi, millati, jinsi, yoshi, dini, nogironligi, jinsiy orientatsiyasi yoki ijtimoiy-iqtisodiy kelib chiqishidan qat’i nazar barcha talabalar, professor-o‘qituvchilar, xodimlar va manfaatdor tomonlar uchun xilma-xil, adolatli va inklyuziv muhit yaratishga intiladi.",
  universityMissionPolicy57P2:
    "Muassasa xilma-xillik akademik tajribani boyitishini, innovatsiyani kuchaytirishini va jamiyat bilan hamkorlikni mustahkamlashini tan oladi. Inklyuzivlik universitet siyosatlari, qabul jarayonlari, o‘quv dasturlarini ishlab chiqish, kampus hayoti va qaror qabul qilish tuzilmalariga singdirilgan.",
  universityMissionPolicy57P3:
    "Universitet teng imkoniyatlarni ilgari suradi va kamsitish, ta’qib va noto‘g‘ri munosabatni bartaraf etish uchun proaktiv choralar ko‘radi. Nogironligi va boshqa maxsus ehtiyojlari bo‘lgan shaxslarni qo‘llab-quvvatlash uchun oqilona sharoitlar ta’minlanadi.",
  universityMissionPolicy57P4:
    "Xodimlar va talabalar uchun xilma-xillik, tenglik va inklyuzivlik bo‘yicha muntazam o‘quv va ong oshirish dasturlari tashkil etiladi. Universitet madaniyatlararo tushunish va o‘zaro hurmatni rivojlantirish uchun inklyuziv talaba guruhlari va forumlar tashkil etilishini ham rag‘batlantiradi.",
  universityMissionPolicy57P5:
    "Xilma-xillik maqsadlariga erishish bo‘yicha progressni baholash va tengsizlik yoki chetlashtirish bilan bog‘liq har qanday tashvishlarni hal qilish uchun monitoring mexanizmlari mavjud. Xilma-xillik va inklyuzivlik bo‘yicha sa’y-harakatlar haqidagi hisobotlar universitet rahbariyati tomonidan vaqti-vaqti bilan ko‘rib chiqiladi.",
  universityMissionPolicy57P6:
    "Universitet hamjamiyatining barcha a’zolari har qanday kamsitish yoki chetlashtirish shakli haqida rasmiy kanallar orqali xabar berishga rag‘batlantiriladi.",

  universityMissionLearnMorePrefix: "Batafsil — ",
  universityMissionReportConcernsPrefix: "Tashvish bildirish — ",
  universityMissionLinkEducationalMethodologicalDept: "O‘quv-uslubiy bo‘lim",
  universityMissionLinkComplianceControlDept: "Muvofiqlik nazorati departamenti",
  universityMissionLinkAccountingAuditDept: "Buxgalteriya va audit bo‘limi",
};

// Read English defaults from the TS file via regex (avoid TS import)
const defaultsPath = path.join(root, "src/locales/universityMissionDefaults.ts");
const defaultsSrc = fs.readFileSync(defaultsPath, "utf8");
const blockMatch = defaultsSrc.match(
  /export const UNIVERSITY_MISSION_CONTENT_DEFAULTS = \{([\s\S]*?)\} as const;/,
);
if (!blockMatch) throw new Error("Could not parse UNIVERSITY_MISSION_CONTENT_DEFAULTS");

/** @type {Record<string, string>} */
const enContentKeys = {};
const entryRe = /^\s{2}(\w+):\s*(?:\n\s+)?"((?:[^"\\]|\\.)*)"\s*,/gm;
let m;
while ((m = entryRe.exec(blockMatch[1])) !== null) {
  enContentKeys[m[1]] = m[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
}

const keyCount = Object.keys(enContentKeys).length;

function mergeLocale(filePath, translations) {
  const locale = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const merged = { ...locale, ...enContentKeys, ...translations };
  const sortedKeys = Object.keys(merged).sort((a, b) => a.localeCompare(b));
  const sorted = {};
  for (const k of sortedKeys) sorted[k] = merged[k];
  fs.writeFileSync(filePath, `${JSON.stringify(sorted, null, 2)}\n`);
}

mergeLocale(enPath, enContentKeys);
mergeLocale(ruPath, ruTranslations);
mergeLocale(uzPath, uzTranslations);

console.log(`Merged ${keyCount} university mission content keys into en/ru/uz topNav.json`);
