import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** @type {Record<string, string>} */
const EN = {
  uniNumbersReportInstitution: "TERMIZ UNIVERSITY OF ECONOMICS AND SERVICE (TUES)",
  uniNumbersReportHeadline: "TUES IN NUMBERS",
  uniNumbersReportTagline: "Key Figures & Strategic Vision 2025–2030",
  uniNumbersReportIntro:
    "Termiz University of Economics and Service (TUES) is committed to transforming into a modern, innovative educational hub. This report presents a snapshot of the university's academic strength, infrastructure, scientific potential, and strategic growth as TUES advances toward its 2030 goals.",
  uniNumbersTableColFigure: "Figure",
  uniNumbersTableColValue: "Value",
  uniNumbersTableColRank: "Rank",
  uniNumbersTableColRegion: "Region",
  uniNumbersSection1Title: "1. Institutional Snapshot",
  uniNumbersS1P1:
    "TUES currently operates three faculties and sixteen departments, delivering 28 bachelor's and 13 master's degree specialities to a growing academic community.",
  uniNumbersS1StatAcademicHeading: "Academic Structure",
  uniNumbersS1StatFaculties: "Faculties",
  uniNumbersS1StatDepartments: "Departments",
  uniNumbersS1StatBachelorSpecialities: "Bachelor's Degree Specialities",
  uniNumbersS1StatMasterSpecialities: "Master's Degree Specialities",
  uniNumbersS1P2:
    "The university's total student body has reached 23,684, with women comprising more than two-thirds of overall enrollment.",
  uniNumbersS1StatStudentHeading: "Student Body",
  uniNumbersS1StatTotalStudents: "Total Students",
  uniNumbersS1StatBachelorStudents: "Bachelor's Students",
  uniNumbersS1StatMasterStudents: "Master's Students",
  uniNumbersS1StatMaleStudents: "Male Students",
  uniNumbersS1StatFemaleStudents: "Female Students",
  uniNumbersS1P3:
    "This community is supported by a teaching staff of 281. Scientific potential — the share of faculty holding a Doctor of Science or PhD degree — currently stands at 42.6%, with a strategic target of 75% by 2030.",
  uniNumbersS1StatTeachingHeading: "Teaching Staff",
  uniNumbersS1StatTotalTeachingStaff: "Total Teaching Staff",
  uniNumbersS1StatDsc: "Doctors of Science (DSc)",
  uniNumbersS1StatPhd: "Doctors of Philosophy (PhD)",
  uniNumbersS1StatAverageAge: "Average Age",
  uniNumbersS1ProgressCaption:
    "Current scientific potential, targeting three-quarters of faculty by 2030",
  uniNumbersSection2Title: "2. Campus & Infrastructure",
  uniNumbersS2P1:
    "The campus spans 1.3 hectares across four educational buildings, offering 148 auditoriums, nine laboratories, and ten computer cabins to support classroom and hands-on learning.",
  uniNumbersS2StatInfraHeading: "Current Infrastructure",
  uniNumbersS2StatCampusArea: "Total Campus Area",
  uniNumbersS2StatEducationalArea: "Educational Area (4 Buildings)",
  uniNumbersS2StatAdditionalArea: "Additional Useful Area",
  uniNumbersS2StatAuditoriums: "Auditoriums",
  uniNumbersS2StatLaboratories: "Laboratories",
  uniNumbersS2StatComputerCabins: "Computer Cabins",
  uniNumbersS2StatAreaPerStudent: "Educational Area per Student",
  uniNumbersS2SubheadingRoadmap: "Infrastructure Development Roadmap (2025–2030)",
  uniNumbersS2P2: "A series of major capital projects will reshape the campus over the coming years:",
  uniNumbersS2TableColInitiative: "Initiative",
  uniNumbersS2TableColTargetYear: "Target Year",
  uniNumbersS2TableRow1Col1: "New Educational Building (5,000 seats)",
  uniNumbersS2TableRow2Col1: "New Student Dormitory (2,000 seats)",
  uniNumbersS2TableRow3Col1: "Apartment Houses for Professors & Teachers (68 units)",
  uniNumbersS2TableRow4Col1: '"Smart Campus" & Green Campus Initiative (Solar Panels)',
  uniNumbersS2TableRow4Col2: "Through 2030",
  uniNumbersSection3Title: "3. Global Reach & Internationalization",
  uniNumbersS3P1:
    "TUES is expanding its global footprint through partnerships, accreditations, and student exchanges, maintaining active academic collaborations with institutions in Kazakhstan, Russia, Turkey, Tajikistan, Japan, China, India, and Czechia.",
  uniNumbersS3TableHeading: "2030 Internationalization Targets",
  uniNumbersS3TableColTarget: "Target",
  uniNumbersS3TableCol2030Goal: "2030 Goal",
  uniNumbersS3TableRow1Col1: "Professors & Teachers in Professional Development Abroad",
  uniNumbersS3TableRow2Col1: "International Students at TUES",
  uniNumbersS3TableRow3Col1: "Joint Educational Programs (Double Degree)",
  uniNumbersS3TableRow4Col1: "Research Articles in Scopus / Web of Science",
  uniNumbersSection4Title: "4. Science, Innovation & Laboratories",
  uniNumbersS4P1:
    "Our focus is on practical research and cutting-edge laboratory infrastructure, anchored by nine newly established scientific schools and sustained investment in specialized equipment.",
  uniNumbersS4SubheadingSchools: "Scientific Schools",
  uniNumbersS4P2:
    "Nine new scientific schools have been established in Chemistry, Biophysics, Biology, Anatomy, Physiology, Histology, History, Ethnography, and Biochemistry.",
  uniNumbersS4SubheadingLabs: "Laboratory Investment",
  uniNumbersS4P3:
    "Laboratory upgrades are focused on advanced equipment for medicinal plants, pharmacology, natural sciences, and software/AI research, strengthening the university's applied research capacity.",
  uniNumbersS4Callout: "5 Programs — Target for international academic accreditation by 2030",
  uniNumbersSection5Title: "5. Student Development, Digitalization & Sports",
  uniNumbersS5P1:
    "Equal emphasis is placed on the holistic development of students through technology, social engagement, and sport.",
  uniNumbersS5DigitalHeading: "Digital Campus Initiatives",
  uniNumbersS5DigitalItem1:
    "A secure mobile application for dormitory management and campus public order",
  uniNumbersS5DigitalItem2: 'A "Smart Campus" platform hosting all lesson materials',
  uniNumbersS5DigitalItem3: "Digital educational platforms enhanced with AI and VR technologies",
  uniNumbersS5CreativeHeading: "Creative & Social Hubs",
  uniNumbersS5CreativeItem1: "Student Media Center",
  uniNumbersS5CreativeItem2: "Creative Students' Park",
  uniNumbersS5CreativeItem3: '"Book-cafe"',
  uniNumbersS5CreativeItem4: "Student Tech Zone",
  uniNumbersS5CreativeItem5:
    'The "Zulfiyaxonim izdoshlari" club and other dedicated support programs for female students',
  uniNumbersS5CreativeItem6: "Free vocational skills training for vulnerable youth",
  uniNumbersS5SubheadingSports: "Sports Ambitions",
  uniNumbersS5P2:
    "A dedicated university program promotes national sports, with the ambitious goal of nurturing 30 national, Asian, World, and Olympic champions by 2030.",
  uniNumbersS5HighlightLabel: "30 Champions",
  uniNumbersS5HighlightCaption:
    "National, Asian, World and Olympic champions\ntargeted by 2030",
  uniNumbersS5ClubsHeading: "Student Clubs",
  uniNumbersS5ClubsItem1: "Chess club",
  uniNumbersS5ClubsItem2: '"Bookworm" reading circle',
  uniNumbersS5ClubsItem3: "Socio-psychological service",
  uniNumbersS5ClubsItem4: "Volunteer center",
  uniNumbersS5ClubsItem5: "Embroidery and design club",
  uniNumbersSection6Title: "6. Regional Footprint",
  uniNumbersS6P1:
    "While TUES students come from every region of Uzbekistan, the highest concentration of the university's academic family hails from Surkhandarya, followed by Samarkand, Tashkent, and Kashkadarya.",
  uniNumbersS6Region1: "Surkhandarya region (highest concentration)",
  uniNumbersS6Region2: "Samarkand region",
  uniNumbersS6Region3: "Tashkent region",
  uniNumbersS6Region4: "Kashkadarya region",
  uniNumbersSection7Title: "Looking Ahead",
  uniNumbersS7P1:
    "Guided by these targets, TUES continues its transformation into a globally connected, research-driven university — expanding its campuses, growing its scientific community, and preparing students to compete on regional and international stages through 2030.",
};

/** @type {Record<string, string>} */
const RU = {
  uniNumbersReportInstitution: "ТЕРМЕЗСКИЙ УНИВЕРСИТЕТ ЭКОНОМИКИ И СЕРВИСА (TUES)",
  uniNumbersReportHeadline: "TUES В ЦИФРАХ",
  uniNumbersReportTagline: "Ключевые показатели и стратегическое видение 2025–2030",
  uniNumbersReportIntro:
    "Термезский университет экономики и сервиса (TUES) стремится стать современным инновационным образовательным центром. Этот отчёт представляет снимок академической мощи университета, инфраструктуры, научного потенциала и стратегического роста по мере продвижения TUES к целям 2030 года.",
  uniNumbersTableColFigure: "Показатель",
  uniNumbersTableColValue: "Значение",
  uniNumbersTableColRank: "Место",
  uniNumbersTableColRegion: "Регион",
  uniNumbersSection1Title: "1. Институциональный обзор",
  uniNumbersS1P1:
    "TUES в настоящее время включает три факультета и шестнадцать кафедр, реализуя 28 специальностей бакалавриата и 13 специальностей магистратуры для растущего академического сообщества.",
  uniNumbersS1StatAcademicHeading: "Академическая структура",
  uniNumbersS1StatFaculties: "Факультеты",
  uniNumbersS1StatDepartments: "Кафедры",
  uniNumbersS1StatBachelorSpecialities: "Специальности бакалавриата",
  uniNumbersS1StatMasterSpecialities: "Специальности магистратуры",
  uniNumbersS1P2:
    "Общая численность студентов достигла 23 684 человек, при этом женщины составляют более двух третей общего контингента.",
  uniNumbersS1StatStudentHeading: "Студенческое сообщество",
  uniNumbersS1StatTotalStudents: "Всего студентов",
  uniNumbersS1StatBachelorStudents: "Студенты бакалавриата",
  uniNumbersS1StatMasterStudents: "Студенты магистратуры",
  uniNumbersS1StatMaleStudents: "Студенты (мужчины)",
  uniNumbersS1StatFemaleStudents: "Студенты (женщины)",
  uniNumbersS1P3:
    "Это сообщество поддерживает профессорско-преподавательский состав в количестве 281 человека. Научный потенциал — доля преподавателей со степенью доктора наук или PhD — сейчас составляет 42,6%, стратегическая цель к 2030 году — 75%.",
  uniNumbersS1StatTeachingHeading: "Профессорско-преподавательский состав",
  uniNumbersS1StatTotalTeachingStaff: "Всего преподавателей",
  uniNumbersS1StatDsc: "Доктора наук (DSc)",
  uniNumbersS1StatPhd: "Доктора философии (PhD)",
  uniNumbersS1StatAverageAge: "Средний возраст",
  uniNumbersS1ProgressCaption:
    "Текущий научный потенциал с целью охватить три четверти преподавателей к 2030 году",
  uniNumbersSection2Title: "2. Кампус и инфраструктура",
  uniNumbersS2P1:
    "Кампус занимает 1,3 гектара в четырёх учебных корпусах и располагает 148 аудиториями, девятью лабораториями и десятью компьютерными классами для поддержки аудиторного и практического обучения.",
  uniNumbersS2StatInfraHeading: "Текущая инфраструктура",
  uniNumbersS2StatCampusArea: "Общая площадь кампуса",
  uniNumbersS2StatEducationalArea: "Учебная площадь (4 здания)",
  uniNumbersS2StatAdditionalArea: "Дополнительная полезная площадь",
  uniNumbersS2StatAuditoriums: "Аудитории",
  uniNumbersS2StatLaboratories: "Лаборатории",
  uniNumbersS2StatComputerCabins: "Компьютерные классы",
  uniNumbersS2StatAreaPerStudent: "Учебная площадь на одного студента",
  uniNumbersS2SubheadingRoadmap: "Дорожная карта развития инфраструктуры (2025–2030)",
  uniNumbersS2P2: "Ряд крупных капитальных проектов изменит облик кампуса в ближайшие годы:",
  uniNumbersS2TableColInitiative: "Инициатива",
  uniNumbersS2TableColTargetYear: "Целевой год",
  uniNumbersS2TableRow1Col1: "Новый учебный корпус (5 000 мест)",
  uniNumbersS2TableRow2Col1: "Новое студенческое общежитие (2 000 мест)",
  uniNumbersS2TableRow3Col1: "Жилые дома для профессоров и преподавателей (68 квартир)",
  uniNumbersS2TableRow4Col1: 'Инициатива «Smart Campus» и «Green Campus» (солнечные панели)',
  uniNumbersS2TableRow4Col2: "До 2030 года",
  uniNumbersSection3Title: "3. Глобальное присутствие и интернационализация",
  uniNumbersS3P1:
    "TUES расширяет глобальное присутствие через партнёрства, аккредитации и студенческий обмен, поддерживая активное академическое сотрудничество с вузами Казахстана, России, Турции, Таджикистана, Японии, Китая, Индии и Чехии.",
  uniNumbersS3TableHeading: "Цели интернационализации к 2030 году",
  uniNumbersS3TableColTarget: "Показатель",
  uniNumbersS3TableCol2030Goal: "Цель на 2030 год",
  uniNumbersS3TableRow1Col1: "Профессора и преподаватели на повышении квалификации за рубежом",
  uniNumbersS3TableRow2Col1: "Иностранные студенты в TUES",
  uniNumbersS3TableRow3Col1: "Совместные образовательные программы (double degree)",
  uniNumbersS3TableRow4Col1: "Научные статьи в Scopus / Web of Science",
  uniNumbersSection4Title: "4. Наука, инновации и лаборатории",
  uniNumbersS4P1:
    "Наш фокус — прикладные исследования и передовая лабораторная инфраструктура, опирающаяся на девять недавно созданных научных школ и постоянные инвестиции в специализированное оборудование.",
  uniNumbersS4SubheadingSchools: "Научные школы",
  uniNumbersS4P2:
    "Созданы девять новых научных школ по химии, биофизике, биологии, анатомии, физиологии, гистологии, истории, этнографии и биохимии.",
  uniNumbersS4SubheadingLabs: "Инвестиции в лаборатории",
  uniNumbersS4P3:
    "Модернизация лабораторий сосредоточена на современном оборудовании для лекарственных растений, фармакологии, естественных наук и исследований в области ПО/ИИ, укрепляя прикладной научный потенциал университета.",
  uniNumbersS4Callout: "5 программ — цель международной академической аккредитации к 2030 году",
  uniNumbersSection5Title: "5. Развитие студентов, цифровизация и спорт",
  uniNumbersS5P1:
    "Равное внимание уделяется всестороннему развитию студентов через технологии, социальную активность и спорт.",
  uniNumbersS5DigitalHeading: "Инициативы цифрового кампуса",
  uniNumbersS5DigitalItem1:
    "Защищённое мобильное приложение для управления общежитиями и общественным порядком на кампусе",
  uniNumbersS5DigitalItem2: 'Платформа «Smart Campus» со всеми учебными материалами',
  uniNumbersS5DigitalItem3: "Цифровые образовательные платформы с технологиями ИИ и VR",
  uniNumbersS5CreativeHeading: "Творческие и социальные пространства",
  uniNumbersS5CreativeItem1: "Студенческий медиацентр",
  uniNumbersS5CreativeItem2: "Парк творческих студентов",
  uniNumbersS5CreativeItem3: "«Book-cafe»",
  uniNumbersS5CreativeItem4: "Студенческая технологическая зона",
  uniNumbersS5CreativeItem5:
    'Клуб «Zulfiyaxonim izdoshlari» и другие программы поддержки студенток',
  uniNumbersS5CreativeItem6: "Бесплатное профессиональное обучение для уязвимой молодёжи",
  uniNumbersS5SubheadingSports: "Спортивные амбиции",
  uniNumbersS5P2:
    "Специальная университетская программа развивает национальный спорт с амбициозной целью воспитать 30 чемпионов национального, азиатского, мирового и олимпийского уровня к 2030 году.",
  uniNumbersS5HighlightLabel: "30 чемпионов",
  uniNumbersS5HighlightCaption:
    "Чемпионы национального, азиатского, мирового\nи олимпийского уровня к 2030 году",
  uniNumbersS5ClubsHeading: "Студенческие клубы",
  uniNumbersS5ClubsItem1: "Шахматный клуб",
  uniNumbersS5ClubsItem2: 'Кружок «Bookworm»',
  uniNumbersS5ClubsItem3: "Социально-психологическая служба",
  uniNumbersS5ClubsItem4: "Волонтёрский центр",
  uniNumbersS5ClubsItem5: "Клуб вышивки и дизайна",
  uniNumbersSection6Title: "6. Региональное представительство",
  uniNumbersS6P1:
    "Студенты TUES приезжают из всех регионов Узбекистана, но наибольшая концентрация академического сообщества приходится на Сурхандарью, далее следуют Самарканд, Ташкент и Кашкадарья.",
  uniNumbersS6Region1: "Сурхандарьинская область (наибольшая концентрация)",
  uniNumbersS6Region2: "Самаркандская область",
  uniNumbersS6Region3: "Ташкентская область",
  uniNumbersS6Region4: "Кашкадарьинская область",
  uniNumbersSection7Title: "Взгляд в будущее",
  uniNumbersS7P1:
    "Руководствуясь этими целями, TUES продолжает трансформацию в глобально связанный исследовательский университет — расширяя кампусы, укрепляя научное сообщество и готовя студентов к конкуренции на региональной и международной арене до 2030 года.",
};

/** @type {Record<string, string>} */
const UZ = {
  uniNumbersReportInstitution: "TERMIZ IQTISODIYOT VA SERVIS UNIVERSITETI (TUES)",
  uniNumbersReportHeadline: "TUES RAQAMLARDA",
  uniNumbersReportTagline: "Asosiy ko‘rsatkichlar va strategik ko‘rinish 2025–2030",
  uniNumbersReportIntro:
    "Termiz iqtisodiyot va servis universiteti (TUES) zamonaviy innovatsion ta’lim markaziga aylanishga intiladi. Ushbu hisobot universitetning akademik salohiyati, infratuzilmasi, ilmiy salohiyati va 2030-yil maqsadlariga erishish yo‘lidagi strategik o‘sishini qisqacha yoritadi.",
  uniNumbersTableColFigure: "Ko‘rsatkich",
  uniNumbersTableColValue: "Qiymat",
  uniNumbersTableColRank: "O‘rin",
  uniNumbersTableColRegion: "Hudud",
  uniNumbersSection1Title: "1. Muassasa haqida qisqacha ma’lumot",
  uniNumbersS1P1:
    "TUES hozirda uch fakultet va o‘n oltita kafedra faoliyat yuritadi, o‘sib borayotgan akademik jamoaga bakalavriatning 28 ta va magistraturaning 13 ta mutaxassisligini taqdim etadi.",
  uniNumbersS1StatAcademicHeading: "Akademik tuzilma",
  uniNumbersS1StatFaculties: "Fakultetlar",
  uniNumbersS1StatDepartments: "Kafedralar",
  uniNumbersS1StatBachelorSpecialities: "Bakalavriat mutaxassisliklari",
  uniNumbersS1StatMasterSpecialities: "Magistratura mutaxassisliklari",
  uniNumbersS1P2:
    "Universitetning umumiy talabalar soni 23 684 nafarga yetdi, ularning ikki uchtidan ortig‘ini ayollar tashkil etadi.",
  uniNumbersS1StatStudentHeading: "Talabalar jamoasi",
  uniNumbersS1StatTotalStudents: "Jami talabalar",
  uniNumbersS1StatBachelorStudents: "Bakalavriat talabalari",
  uniNumbersS1StatMasterStudents: "Magistratura talabalari",
  uniNumbersS1StatMaleStudents: "Erkak talabalar",
  uniNumbersS1StatFemaleStudents: "Ayol talabalar",
  uniNumbersS1P3:
    "Bu jamoani 281 nafar professor-o‘qituvchi qo‘llab-quvvatlaydi. Ilmiy salohiyat — fan doktori yoki PhD darajasiga ega professor-o‘qituvchilar ulushi — hozirda 42,6% ni tashkil etadi, 2030-yilga strategik maqsad esa 75%.",
  uniNumbersS1StatTeachingHeading: "Professor-o‘qituvchilar tarkibi",
  uniNumbersS1StatTotalTeachingStaff: "Jami professor-o‘qituvchilar",
  uniNumbersS1StatDsc: "Fan doktorlari (DSc)",
  uniNumbersS1StatPhd: "Falsafa doktorlari (PhD)",
  uniNumbersS1StatAverageAge: "O‘rtacha yosh",
  uniNumbersS1ProgressCaption:
    "Joriy ilmiy salohiyat, 2030-yilga qadar professor-o‘qituvchilarning uch quartini qamrab olish maqsadi",
  uniNumbersSection2Title: "2. Kampus va infratuzilma",
  uniNumbersS2P1:
    "Kampus to‘rt ta o‘quv binosi bo‘ylab 1,3 gektar maydonni egallaydi, auditoriy va amaliy mashg‘ulotlar uchun 148 ta auditoriya, to‘qqizta laboratoriya va o‘nta kompyuter xonasiga ega.",
  uniNumbersS2StatInfraHeading: "Joriy infratuzilma",
  uniNumbersS2StatCampusArea: "Kampusning umumiy maydoni",
  uniNumbersS2StatEducationalArea: "O‘quv maydoni (4 bino)",
  uniNumbersS2StatAdditionalArea: "Qo‘shimcha foydali maydon",
  uniNumbersS2StatAuditoriums: "Auditoriyalar",
  uniNumbersS2StatLaboratories: "Laboratoriyalar",
  uniNumbersS2StatComputerCabins: "Kompyuter xonalari",
  uniNumbersS2StatAreaPerStudent: "Bir talabaga to‘g‘ri keladigan o‘quv maydoni",
  uniNumbersS2SubheadingRoadmap: "Infratuzilmani rivojlantirish yo‘l xaritasi (2025–2030)",
  uniNumbersS2P2: "Yaqin yillarda bir qator yirik kapital loyihalar kampus qiyofasini o‘zgartiradi:",
  uniNumbersS2TableColInitiative: "Tashabbus",
  uniNumbersS2TableColTargetYear: "Maqsadli yil",
  uniNumbersS2TableRow1Col1: "Yangi o‘quv binosi (5 000 o‘rin)",
  uniNumbersS2TableRow2Col1: "Yangi talabalar yotoqxonasi (2 000 o‘rin)",
  uniNumbersS2TableRow3Col1: "Professor-o‘qituvchilar uchun xonadonlar (68 ta)",
  uniNumbersS2TableRow4Col1: '«Smart Campus» va «Green Campus» tashabbusi (quyosh panellari)',
  uniNumbersS2TableRow4Col2: "2030-yilgacha",
  uniNumbersSection3Title: "3. Global qamrov va internatsionalizatsiya",
  uniNumbersS3P1:
    "TUES hamkorliklar, akkreditatsiyalar va talaba almashinuvi orqali global mavqeini kengaytirmoqda, Qozog‘iston, Rossiya, Turkiya, Tojikiston, Yaponiya, Xitoy, Hindiston va Chexiyadagi muassasalar bilan faol akademik hamkorlikni saqlab kelmoqda.",
  uniNumbersS3TableHeading: "2030-yil internatsionalizatsiya maqsadlari",
  uniNumbersS3TableColTarget: "Ko‘rsatkich",
  uniNumbersS3TableCol2030Goal: "2030-yil maqsadi",
  uniNumbersS3TableRow1Col1: "Chet elda malaka oshirishda bo‘lgan professor-o‘qituvchilar",
  uniNumbersS3TableRow2Col1: "TUESdagi xalqaro talabalar",
  uniNumbersS3TableRow3Col1: "Qo'shma ta'lim dasturlari (double degree)",
  uniNumbersS3TableRow4Col1: "Scopus / Web of Science dagi ilmiy maqolalar",
  uniNumbersSection4Title: "4. Fan, innovatsiya va laboratoriyalar",
  uniNumbersS4P1:
    "Bizning e’tiborimiz amaliy tadqiqotlar va zamonaviy laboratoriya infratuzilmasiga qaratilgan; bu to‘qqizta yangi tashkil etilgan ilmiy maktablar va maxsus uskunalarga doimiy sarmoya bilan ta’minlanadi.",
  uniNumbersS4SubheadingSchools: "Ilmiy maktablar",
  uniNumbersS4P2:
    "Kimyo, biofizika, biologiya, anatomiya, fiziologiya, gistologiya, tarix, etnografiya va biokimyo yo‘nalishlarida to‘qqizta yangi ilmiy maktab tashkil etildi.",
  uniNumbersS4SubheadingLabs: "Laboratoriyalarga sarmoya",
  uniNumbersS4P3:
    "Laboratoriyalarni modernizatsiya qilish dorivor o‘simliklar, farmakologiya, tabiiy fanlar hamda dasturiy ta’minot/AI tadqiqotlari uchun zamonaviy uskunalarga qaratilgan va universitetning amaliy ilmiy salohiyatini mustahkamlaydi.",
  uniNumbersS4Callout: "5 ta dastur — 2030-yilga xalqaro akademik akkreditatsiya maqsadi",
  uniNumbersSection5Title: "5. Talabalarni rivojlantirish, raqamlashtirish va sport",
  uniNumbersS5P1:
    "Talabalarning kompleks rivojlanishiga texnologiya, ijtimoiy faollik va sport orqali teng e’tibor qaratiladi.",
  uniNumbersS5DigitalHeading: "Raqamli kampus tashabbuslari",
  uniNumbersS5DigitalItem1:
    "Yotoqxonalarni boshqarish va kampus tartibini ta’minlash uchun xavfsiz mobil ilova",
  uniNumbersS5DigitalItem2: 'Barcha dars materiallarini joylashtiruvchi «Smart Campus» platformasi',
  uniNumbersS5DigitalItem3: "AI va VR texnologiyalari bilan boyitilgan raqamli ta’lim platformalari",
  uniNumbersS5CreativeHeading: "Ijodiy va ijtimoiy markazlar",
  uniNumbersS5CreativeItem1: "Talabalar media markazi",
  uniNumbersS5CreativeItem2: "Ijodkor talabalar bog‘i",
  uniNumbersS5CreativeItem3: "«Book-cafe»",
  uniNumbersS5CreativeItem4: "Talabalar texno zonasi",
  uniNumbersS5CreativeItem5:
    '«Zulfiyaxonim izdoshlari» klubi va talaba qizlar uchun boshqa maxsus qo‘llab-quvvatlash dasturlari',
  uniNumbersS5CreativeItem6: "Ijtimoiy zaif guruhlardagi yoshlar uchun bepul kasb-hunar treninglari",
  uniNumbersS5SubheadingSports: "Sportdagi intilishlar",
  uniNumbersS5P2:
    "Maxsus universitet dasturi milliy sportni qo‘llab-quvvatlaydi va 2030-yilga qadar 30 ta milliy, Osiyo, jahon va olimpiada chempionini tarbiyalashga intiladi.",
  uniNumbersS5HighlightLabel: "30 chempion",
  uniNumbersS5HighlightCaption:
    "2030-yilga qadar milliy, Osiyo, jahon\nva olimpiada chempionlari maqsadi",
  uniNumbersS5ClubsHeading: "Talabalar klublari",
  uniNumbersS5ClubsItem1: "Shaxmat klubi",
  uniNumbersS5ClubsItem2: "«Bookworm» o‘qish doirasi",
  uniNumbersS5ClubsItem3: "Ijtimoiy-psixologik xizmat",
  uniNumbersS5ClubsItem4: "Ko‘ngilli markaz",
  uniNumbersS5ClubsItem5: "Kashtachilik va dizayn klubi",
  uniNumbersSection6Title: "6. Hududiy qamrov",
  uniNumbersS6P1:
    "TUES talabalari O‘zbekistonning barcha hududlaridan keladi, biroq akademik oilaning eng yuqori konsentratsiyasi Surxondaryo, keyin Samarqand, Toshkent va Qashqadaryo viloyatlaridan kuzatiladi.",
  uniNumbersS6Region1: "Surxondaryo viloyati (eng yuqori konsentratsiya)",
  uniNumbersS6Region2: "Samarqand viloyati",
  uniNumbersS6Region3: "Toshkent viloyati",
  uniNumbersS6Region4: "Qashqadaryo viloyati",
  uniNumbersSection7Title: "Kelajakka nazar",
  uniNumbersS7P1:
    "Ushbu maqsadlar yo‘l-yo‘riq qilib, TUES global aloqali tadqiqot universitetiga aylanishni davom ettirmoqda — kampuslarni kengaytirish, ilmiy jamiyatni o‘sishini ta’minlash va talabalarni 2030-yilgacha mintaqaviy hamda xalqaro maydonda raqobatlashishga tayyorlash.",
};

const locales = [
  { lang: "en", patch: EN },
  { lang: "ru", patch: RU },
  { lang: "uz", patch: UZ },
];

for (const { lang, patch } of locales) {
  const path = join(root, "public/locales", lang, "topNav.json");
  const json = JSON.parse(readFileSync(path, "utf8"));
  Object.assign(json, patch);
  const sorted = Object.fromEntries(Object.entries(json).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(path, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`${lang}: merged ${Object.keys(patch).length} keys`);
}

console.log(`New keys added per locale: ${Object.keys(EN).length}`);
