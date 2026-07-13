import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const enPath = path.join(root, "src/locales/generated/missingPageKeys.en.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

const PATH_SUFFIX = /(Src|Alt|Href)$/;

function buildTranslations(map) {
  const result = {};
  for (const key of Object.keys(en)) {
    if (PATH_SUFFIX.test(key)) {
      result[key] = en[key];
    } else if (key in map) {
      result[key] = map[key];
    } else {
      throw new Error(`Missing translation for key: ${key}`);
    }
  }
  return result;
}

const uz = buildTranslations({
  studentHandbookPageTitle: "Talabalar qo'llanmasi",
  studentHandbookPageIntro:
    "O'qish tilingiz uchun rasmiy talabalar qo'llanmasini yuklab oling. Har bir PDF fayl akademik siyosatlar, talabalarning huquq va majburiyatlari hamda Termiz iqtisodiyot va servis universitetidagi (TUES) hayot bo'yicha amaliy yo'riqnomalarni o'z ichiga oladi.",
  title: "Yosh yetakchilar",
  womensAffairsPageTitle:
    "Termiz iqtisodiyot va servis universitetidagi ayollar masalalari bo'yicha maslahat kengashi",
  womensAffairsPageBody:
    "Termiz iqtisodiyot va servis universitetida ayollar masalalari bo'yicha maslahat kengashi tashkil etilgan bo'lib, u ayollarni ijtimoiy va siyosiy darajada qo'llab-quvvatlaydi.\n\nKengash ayollarning huquq va qonuniy manfaatlarini himoya qilish hamda O'zbekiston Respublikasi Konstitutsiyasi va qonunlarida nazarda tutilgan ijtimoiy-siyosiy kafolatlarni amalga oshirishda yordam berish uchun mo'ljallangan doimiy jamoatchilik organidir.\n\nKengash faoliyati O'zbekiston Respublikasi Konstitutsiyasi va qonunlari, Oliy Majlis palatalarining qarorlari, Prezident farmon, qaror va farmoyishlari, Vazirlar Mahkamasi qaror va farmoyishlari, Fan va innovatsiyalar vazirligi hamda Oliy ta'lim, fan va innovatsiyalar vazirligining normativ hujjatlari, shuningdek ushbu Nizom va boshqa qonun hujjatlariga muvofiq amalga oshiriladi.\n\nBir vaqtning o'zida uning faoliyati qonuniylik, jamoaviy qaror qabul qilish, oshkoralik, o'zaro hamkorlik va hurmat, tenglik, ixtiyoriyilik hamda jamoatchilik fikrini hisobga olish tamoyillari asosida olib boriladi.",
  womensAffairsPageTasksHeading: "Kengashning asosiy vazifa va funksiyalari quyidagilardan iborat:",
  womensAffairsPageTasksBullets:
    "- Ayollarni qo'llab-quvvatlash bo'yicha davlat siyosatini samarali amalga oshirish, ularning huquq va qonuniy manfaatlarini himoya qilish hamda mamlakat ijtimoiy-siyosiy hayotidagi roli va faol ishtirokini oshirishga qaratilgan tashkiliy ishlar bilan muvofiqlashtirish;\n- Ayollarning mehnat bozoridagi, davlat sektori va davlat xizmatidagi rolini mustahkamlashga, ularga ijtimoiy va huquqiy yordam ko'rsatishga hamda ularning fikr-mulohazalarini tizimli ravishda monitoring qilishga qaratilgan maqsadli tadbirlarni tashkil etishda yordam berish;\n- Ayollar mehnat bozorida duch keladigan muammolarni o'z vaqtida aniqlash; ayollarning davlat sektori va davlat boshqaruvidagi rolini mustahkamlashga qaratilgan maqsadli tashabbuslarni tashkil etishda yordam berish; tizimli ijtimoiy va huquqiy yordam ko'rsatish; yordamga muhtoj ayollar reyestrini shakllantirish va ularga, jumladan nogironligi bo'lgan ayollarga ijtimoiy, huquqiy, psixologik va moddiy yordam berish;\n- Nogironligi bo'lgan ayollar uchun maqsadli ro'yxat shakllantirishda yordam berish, ularga ijtimoiy, huquqiy, psixologik va moddiy yordam ko'rsatish hamda reabilitatsiya jihozlari bilan ta'minlash;\n- Erkaklar va ayollarning teng huquq va imkoniyatlarini ta'minlovchi qonunlarning bajarilishini jamoatchilik nazorati ostida olib borish va tegishli tavsiyalar berish;\n- Ayollarni zo'ravonlik va ta'qibdan himoya qiluvchi qonunlarning bajarilishini monitoring qilish va zo'ravonlik qurbonlarini aniqlash, ularning reabilitatsiyasini ta'minlash hamda huquqlarini himoya qilish bo'yicha vazirliklarga o'ylangan tavsiyalar taqdim etish;\n- Ayollarni bezorilik va zo'ravonlikdan himoya qilish bo'yicha hududiy rejalarni ishlab chiqish va amalga oshirishda ishtirok etish;\n- Qiz talabalarni oilaviy hayotga tayyorlashda yordam berish, yosh oilalarni ijtimoiy faoliyatga jalb etish hamda ijtimoiy va gumanitar sohada faoliyat yuritayotgan namunali ayollarning hayoti va turmush tarzini keng targ'ib qilish;\n- Ayollar o'rtasida turli musobaqalar va sport tadbirlarini tashkil etish, shuningdek «Zulfiya milliy mukofoti» va «Faxriy ayol» medallari uchun nomzodlarni tanlash jarayonini qonuniylik, ijtimoiy adolat va oshkoralik tamoyillari asosida o'tkazish;\n- Ayollar huquqlarini himoya qilish bo'yicha milliy va xalqaro qonunchilikda belgilangan hujjatlar, standartlar va talablarning amalga oshirilishi hamda to'g'ridan-to'g'ri rioya etilishini ta'minlash;\n- Tizimda faoliyat yuritayotgan iste'dodli ayol xodimlarni milliy mukofotlar uchun nomzod sifatida ko'rib chiqish uchun tavsiya etish.",
  studentUnionRegulationPageTitle: "Talabalar uyushmasi nizomi",
  studentUnionRegulationPageIntro:
    "Termiz iqtisodiyot va servis universitetidagi (TUES) talabalar uyushmasi boshqaruv hujjatlarini yuklab oling. Fayllar oflayn o'qish va chop etish uchun PDF formatida taqdim etiladi.",
  mushoiraClubHonoredPageTitle: "«Mushoira» klubi a'zosi faxrlantirildi",
  mushoiraClubHonoredPageBody:
    "Termiz iqtisodiyot va servis universitetining (TUES) filologiya va tillarni o'qitish (o'zbek tili) yo'nalishi bo'yicha uchinchi kurs talabasi Tursunoy Abdullayeva «Ilmiy akademiya» ilmiy-tadqiqot markazi tomonidan «Yosh tadqiqotchi» nishoni bilan taqdirlandi.\n\nTursunoy universitetning «Mushoira» she'riy klubining faol a'zosidir. U yettita she'riy to'plam chop etgan. Ushbu e'tirof yosh shoirning ijodi va tashabbuskorligining munosib bahosidir.\n\nUshbu munosabat bilan o'tkazilgan marosimda O'zbekiston Yozuvchilar uyushmasi a'zosi shoir Karamatulloh Karimov ishtirok etdi, Tursunoy ijodiga iliq so'zlar aytdi hamda bayramona muhitda unga nishon va minnatdorchilik xati topshirdi.",
  regulationSecondaryEducationBody:
    "${REGULATION_SECONDARY_EDUCATION_BODY_RESOLUTION}\n\n${REGULATION_SECONDARY_EDUCATION_BODY_APPENDIX}",
  facultyEconomicsIntroBody:
    "Termiz iqtisodiyot va servis universitetidagi (TUES) Iqtisodiyot va axborot texnologiyalari fakulteti bugun iqtisodiyot va zamonaviy axborot texnologiyalari sohasida malakali va raqobatbardosh mutaxassislarni tayyorlashning yetakchi markazlaridan biridir. Fakultetning asosiy maqsadi nafaqat nazariy bilim berish, balki talabalarni amaliy ko'nikmalar bilan qurollantirish hamda ularni zamonaviy iqtisodiy jarayonlar va texnologiyalar bilan tanishtirishdir.\n\nFakultetda 70 nafar o'qituvchi faoliyat yuritadi, ularning 26 nafari fan doktori (PhD) darajasiga, 1 nafari fan doktori (DSc) darajasiga ega. O'qituvchilar tarkibi o'z sohasidagi yetakchi mutaxassislardan iborat bo'lib, talabalarga nazariy bilimlar bilan birga amaliy ko'nikmalarni ham beradi.\n\nFakultetning kuchli tomonlaridan biri — o'qituvchilar muntazam ravishda malakasini oshiradi. O'n nafar o'qituvchi, xususan Turkiya, Chexiya va Indoneziyada kasbiy malaka oshirish kurslarini tamomlagan. Bundan tashqari, fakultetda 3 nafar xorijiy mutaxassis talabalarga dars beradi va taxminan 10 nafar mahalliy boshqa universitet professorlari ham kurslar o'tkazadi. Bu talabalarga xalqaro standartlarga mos ta'lim berish imkonini yaratadi.\n\nFakultetdagi talabalar soni sezilarli: 2 356 nafar talaba kunduzgi ta'limda, 6 182 nafari esa sirtqi ta'limda o'qiydi. Talabalarning faoliyati nafaqat akademik, balki sport va ilmiy sohalarda ham namoyon bo'ladi. Talabalar orasida 3 nafari O'zbekiston chempioni, 1 nafari Osiyo chempionidir. Ushbu yutuqlar fakultet talabalarining akademik, jismoniy va ijtimoiy jihatdan ko'p qirrali ekanligini ko'rsatadi.\n\nTalabalar iqtisodiyot va axborot texnologiyalari bo'yicha chuqur bilimlarga ega bo'ladilar. Laboratoriyalar, kompyuter sinflari, amaliy mashg'ulotlar va loyiha ishlari orqali ular nazariy bilimlarini amaliyot bilan mustahkamlashlari mumkin. Fakultet shuningdek, xorijiy mutaxassislar va professorlar tomonidan o'tkaziladigan maxsus kurslar orqali talabalarni xalqaro standartlarga tayyorlaydi.\n\nTalabalar va o'qituvchilar ilmiy va innovatsion loyihalarda faol ishtirok etadi, bu esa bitiruvchilarning mehnat bozori talab qiladigan kompetensiyalarga ega bo'lishini ta'minlaydi.\n\nFakultetning xorijiy universitetlar va mutaxassislar bilan hamkorligi talabalar uchun keng imkoniyatlar yaratadi. Xorijiy mutaxassislar tomonidan dars berish, o'qituvchilarning malaka oshirishi va xalqaro ilmiy-tadqiqot loyihalarida ishtirok etish talabalarning bilimlarini yanada kengaytiradi va ularni global miqyosda raqobatbardosh qiladi.\n\nShu tariqa, fakultet talabalari nafaqat akademik bilimlarni, balki amaliyot, sport va ilmiy-tadqiqot faoliyati orqali keng amaliy tajribaga ham ega bo'ladilar. Bitiruvchilar zamonaviy iqtisodiyot va axborot texnologiyalari sohasida malakali mutaxassis sifatida kasbiy faoliyatini davom ettiradilar.",
  facultyEconomicsDepartmentsHeading:
    "Iqtisodiyot va axborot texnologiyalari fakultetida quyidagi kafedralar mavjud:",
  careerCentrePageTitle: "Karyera markazi – TUES",
  careerCentrePageTagline:
    "Muvaffaqiyatli kelajak sari birinchi qadamni qo'ying. Karyera markaziga tashrif buyuring va salohiyatingizni oching!",
  careerCentreIntroHeading: "Kelajakdagi karyerangizni kuchaytirish",
  careerCentreIntroBody:
    "Termiz iqtisodiyot va servis universitetidagi (TUES) Karyera markazi talabalar va bitiruvchilarga ta'limdan ishga muvaffaqiyatli o'tishda yordam berishga bag'ishlangan. Biz sizning karyera yo'lingizni qo'llab-quvvatlash uchun professional maslahat, karyera rivojlantirish xizmatlari va ish beruvchilar bilan mustahkam aloqalarni taqdim etamiz.",
  careerCentreMissionHeading: "Bizning missiyamiz",
  careerCentreMissionBody:
    "Missiyamiz — talabalarni raqobatbardosh global mehnat bozorida muvaffaqiyat qozonish uchun zarur bo'lgan ko'nikmalar, bilim va imkoniyatlar bilan qurollantirish. Biz akademik ta'lim va haqiqiy ish hayoti o'rtasidagi bo'shliqni to'ldirishni maqsad qilganmiz.",
  careerCentreWhatWeOfferHeading: "Biz nimalarni taklif qilamiz",
  careerCentreOfferCounselingTitle: "Karyera maslahati",
  careerCentreOfferCounselingBody:
    "To'g'ri karyera yo'lini tanlash, kuchli tomonlaringizni aniqlash va kasbiy maqsadlar qo'yishda yordam berish uchun tajribali maslahatchilardan shaxsiy yo'riqnoma oling.",
  careerCentreOfferInternshipTitle: "Amaliyot imkoniyatlari",
  careerCentreOfferInternshipBody:
    "Talabalarga amaliy ko'nikmalarni shakllantiradigan qimmatli amaliyot tajribasini ta'minlash uchun yetakchi kompaniyalar va tashkilotlar bilan hamkorlik qilamiz.",
  careerCentreOfferPlacementTitle: "Ishga joylashtirish yordami",
  careerCentreOfferPlacementBody:
    "Bitirgandan so'ng mos ishni topish uchun bo'sh ish o'rinlari, ishga qabul qilish dasturlari va ish beruvchilar tarmog'idan foydalaning.",
  careerCentreOfferCvTitle: "Rezyume va suhbatga tayyorgarlik",
  careerCentreOfferCvBody:
    "Professional rezyume yozish, suhbatga tayyorlanish va ish beruvchilarga o'zingizni ishonch bilan taqdim etishni o'rganing.",
  careerCentreOfferWorkshopsTitle: "Seminarlar va treninglar",
  careerCentreOfferWorkshopsBody:
    "Ishga qabul qilinish imkoniyatini oshirish uchun seminarlar, karyera yarmarkalari va ko'nikmalarni rivojlantirish treninglarida qatnashing.",
  careerCentreContactHeading: "Biz bilan bog'laning",
  careerCentreContactBlock:
    "Karyera markazi – TUES\nTermiz, O'zbekiston\nEmail: career@tues.uz\nTelefon: +998 XX XXX XX XX",
  bachelorHubPageIntro:
    "Termiz iqtisodiyot va servis universitetida (TUES) qanday ta'lim olishni rejalashtirayotganingizni tanlang: kunduzgi ta'lim yoki sirtqi (masofaviy) bakalavriat.",
  bachelorTrackFullTimeTitle: "Bakalavriat (kunduzgi ta'lim)",
  bachelorTrackFullTimeBody:
    "Kunduzgi bakalavriat ta'limi kampus jadvaliga muvofiq o'tkaziladi va ma'ruzalar, seminarlar hamda baholangan ishlarni kutubxonalar, laboratoriyalar va talabalar xizmatlaridan foydalanish bilan birlashtiradi. Qabul va o'quv dasturi tafsilotlari har bir qabul uchun e'lon qilinadi; eng so'nggi talablar va muddatlar uchun asosiy qabul va dasturlar bo'limlaridan foydalaning.",
  bachelorFullTimeCardsHint:
    "To'liq spetsifikatsiya jadvali bilan alohida sahifasini ochish uchun quyidagi dasturni tanlang.",
  bachelorTrackCorrespondenceTitle: "Bakalavriat (sirtqi ta'lim)",
  bachelorTrackCorrespondenceBody:
    "Sirtqi (masofaviy) bakalavriat ish yoki boshqa majburiyatlar bilan o'qishni birlashtirayotgan talabalar uchun mo'ljallangan bo'lib, tuzilgan masofaviy materiallar, rejalashtirilgan maslahatlar va imtihon sessiyalaridan foydalanadi. Ushbu shaklda taklif etilayotgan dasturlar ro'yxati va ariza berish tartibi uchun rasmiy katalog va qabul e'lonlariga murojaat qiling.",
  bachelorCorrespondenceCardsHint:
    "To'liq spetsifikatsiya bilan alohida sahifasini ochish uchun quyidagi dasturni tanlang.",
  minoritySupportCenterPageTitle: "Kamchilikka ega guruhlar uchun qo'llab-quvvatlash markazi",
  minoritySupportCenterPageBody:
    "Termiz iqtisodiyot va servis universiteti (TUES) inklyuzivlik, teng imkoniyatlar va ijtimoiy mas'uliyat bo'yicha institutsional majburiyatlarining bir qismi sifatida kamchilikka ega va kam ifoda etilgan guruhlarga mansub talabalar uchun tuzilgan qo'llab-quvvatlash mexanizmlarini saqlab keladi. Ushbu qo'llab-quvvatlash tuzilmalari tenglik va kamsitishni oldini olish bo'yicha milliy qonunchilik hamda talabalar farovonligi va axloqiy xulq-atvor bo'yicha ichki nizomlar bilan uyg'unlashgan aniq belgilangan boshqaruv va siyosat doirasida faoliyat yuritadi. Ularning vazifasi universitet jamoasining barcha a'zolari uchun xavfsiz, hurmatli va kuchli akademik muhitni shakllantirishga qaratilgan universitetning keng strategiyasi doirasiga kiritilgan.\n\nUshbu qo'llab-quvvatlash mexanizmlarini boshqaradigan institutsional qarash — har bir talaba ijtimoiy-iqtisodiy holati, mintaqaviy kelib chiqishi, jinsi, nogironligi, diniy mansubligi yoki boshqa qonun bilan tan olingan xususiyatlaridan qat'i nazar akademik resurslar, ishtirok etish imkoniyatlari va kampus hayotiga teng kirish huquqiga ega bo'lishini ta'minlashdir. Universitet hurmat, o'zaro tushunish va akademik halollikka asoslangan kampus madaniyatini rivojlantiradi hamda xilma-xillikni ta'lim sifati va ijtimoiy uyg'unlikni mustahkamlaydigan strategik boylik sifatida tan oladi.\n\nUshbu tuzilmalarning asosiy maqsadi — muayyan qiyinchiliklarga duch kelayotgan talabalar yo'riqnoma va yordam so'rashi mumkin bo'lgan xavfsiz va maxfiy muhit yaratishdir. Maslahat, talabalar ishlarini va ijtimoiy qo'llab-quvvatlash bo'yicha malakali xodimlar akademik moslashuv, psixologik farovonlik, ijtimoiy integratsiya va shaxsiy rivojlanish masalalarini qamrab olgan individual maslahatlar beradi. Ushbu xizmatlar talabalar saqlanishi, qoniqish darajasi va umumiy akademik natijalarini yaxshilashga hissa qo'shadi.\n\nTo'g'ridan-to'g'ri maslahat xizmatlaridan tashqari universitet kampus bo'ylab inklyuziv amaliyotlarni targ'ib qilishga qaratilgan targ'ibot va xabardorlik tashabbuslarini amalga oshiradi. Madaniy kompetentlikni oshirish, kamsitishni oldini olish va turli kelib chiqishli talabalar o'rtasida konstruktiv muloqotni rag'batlantirish uchun ta'lim seminarlari, davra suhbatlari va muloqot sessiyalari tashkil etiladi. Ushbu tashabbuslar ong ostidagi tarafkashlik, hurmatli muloqot va inklyuziv yetakchilik bo'yicha institutsional xabardorlikni kuchaytirishga qaratilgan.\n\nTalabalar uchun xilma-xillik, tenglik, ijtimoiy inklyuziya va huquqiy imkoniyatlar bo'yicha axborot materiallariga kirish imkonini ta'minlovchi maxsus resurs funksiyasi saqlanadi. Bunga akademik adabiyotlar, raqamli resurslar va universitet platformalari orqali mavjud bo'lgan siyosat hujjatlari kiradi. Ilmiy asoslangan ma'lumotlarning mavjudligini ta'minlash orqali universitet talabalarni universitet hayotida ongli ishtirok etish uchun zarur bilimlar bilan qurollantiradi.\n\nJamiyat qurish faoliyati qo'llab-quvvatlash tizimining muhim tarkibiy qismidir. Tuzilgan tadbirlar, mavzuli muhokamalar va talabalar tashabbuslari tarmoq aloqalari, tengdoshlar qo'llab-quvvatlashi va madaniyatlararo muloqot uchun imkoniyatlar yaratadi. Ushbu faoliyatlar o'ziga xos tegishlilik hissini shakllantiradi hamda universitet jamoasida ijtimoiy integratsiya va o'zaro hurmatni mustahkamlaydi.\n\nUniversitet qo'llab-quvvatlash tuzilmalari, akademik bo'linmalar, talabalar tashkilotlari va ma'muriy birliklar o'rtasida tizimli muammolarni hal qilish va institutsional amaliyotlarni yaxshilash uchun hamkorlikni ta'minlaydi. Zarurat tug'ilganda tashqi tashkilotlar va tegishli davlat organlari bilan hamkorlik o'rnatiladi. Ushbu yondashuv siyosatga javob berish va resurslardan samarali foydalanishni kuchaytiradi.\n\nDoimiy monitoring va baholash qo'llab-quvvatlash mexanizmlarining samaradorligi uchun ajralmas qismdir. Talabalar va manfaatdor tomonlardan olingan fikr-mulohazalar tizimli ravishda to'planadi va xizmat sifati, yangi ehtiyojlarni aniqlash hamda strategik yaxshilanishlarni belgilash uchun tahlil qilinadi. Davriy ko'rib chiqishlar xilma-xillikni boshqarish va talabalarni qo'llab-quvvatlash bo'yicha eng yaxshi amaliyotlarga moslashni ta'minlaydi.\n\nTuzilgan siyosatlar, malakali kadrlar, muvofiqlashtirilgan hamkorlik va ilmiy asoslangan baholash orqali Termiz iqtisodiyot va servis universiteti inklyuzivlik va teng kirish bo'yicha barqaror institutsional majburiyatini namoyish etadi. Ushbu tuzilmalar kamchilikka ega va kam ifoda etilgan guruhlarga mansub talabalar hurmat va teng imkoniyatlar doirasida akademik muvaffaqiyat, shaxsiy rivojlanish va kasbiy tayyorgarlikka erishishlari uchun kampus muhitini yaratishga hissa qo'shadi.",
  socialLifePageTitle: "Ijtimoiy hayot",
  socialLifeIntro:
    "Termiz iqtisodiyot va servis universitetida (TUES) Yoshlar ittifoqi tomonidan talabalarning mazmunli hayotini tashkil etish hamda ularning intellektual, madaniy va ijodiy salohiyatini ochish bo'yicha keng qamrovli ishlar olib borilmoqda. Yoshlar ittifoqi qoshidagi klublar va turli fakultetlar bilan hamkorlikda muntazam ravishda tadbirlar, musobaqalar, ko'ngilochar dasturlar va loyihalar tashkil etiladi.\n\nTalabalarning bilim va fikrlash qobiliyatini yanada mustahkamlash, tanqidiy fikrlash va jamoaviy ishlash ko'nikmalarini rivojlantirish maqsadida «Zakovat» intellektual ligasi tashkil etilgan. Shuningdek, adabiyotga qiziqishni uyg'otish va o'qish madaniyatini rivojlantirishga qaratilgan «Mushoira» klubi hamda hazil va ijodiy chiqishlari bilan mashhur «KVN» klubi talabalar orasida katta mashhurlikka erishmoqda.\n\nBundan tashqari, san'at, rassomchilik va hunarmandchilikka oid turli musobaqalar, innovatsion akademik loyihalar asosidagi ilmiy tanlovlar, turli sohalardagi master-klasslar hamda qiziqarli ekskursiyalar doimiy ravishda o'tkaziladi. Talabalarning tashabbuskorligi va ijodkorligini tarbiyalaydigan ushbu faoliyatlar ularni ko'p qirrali va yetuk shaxslarga aylantirishda muhim rol o'ynaydi.",
  socialLifeTypesHeading: "Tashkil etiladigan tadbirlar turlari",
  socialLifeTypesLead: "Tashkil etiladigan tadbirlar turlariga quyidagilar kiradi:",
  socialLifeTypesList:
    "Ijtimoiy tadbirlar — O'qituvchilar kuni, Komediya shousi, Xalqaro ayollar kuni, Navro'z bayrami\nIntellektual tadbirlar — «Zakovat» klubi, «Mushoira» klubi, Mutolaa klublari\nSport tadbirlari — Futbol, voleybol, shaxmat kubogi\nKo'nikmalarni rivojlantirish — Juma suhbatlari, «Zakovat» klubi, Munozara klubi, IT klubi\nChet tillari klublari — Ingliz, koreys, turk\nTalabalar kengashi faoliyati — Talantlar ko'rgazmasi, Yangi yil bali, Drama klubi, Talabalar teatr studiyasi, San'at klubi",
  facilitiesForDisabledPageTitle: "Nogironligi bo'lgan shaxslar uchun sharoitlar",
  facilitiesForDisabledDeck:
    "Ruhiy salomatlikni qo'llab-quvvatlash va nogironligi bo'lgan talabalar uchun xizmatlar",
  facilitiesForDisabledIntro:
    "Termiz iqtisodiyot va servis universiteti (TUES) barcha talabalar, jumladan nogironligi bo'lgan talabalar uchun inklyuziv va qulay o'quv muhitini yaratishga alohida e'tibor qaratadi. Universitet maxsus ehtiyojlari bo'lgan talabalar ta'lim jarayoni va talabalar hayotida faol ishtirok etishlari uchun zarur sharoitlar, texnik vositalar va qo'llab-quvvatlash xizmatlarini tashkil etgan.",
  facilitiesForDisabledS1Title: "Psixologik qo'llab-quvvatlash xizmatlari",
  facilitiesForDisabledS1Body:
    "TUES ruhiy salomatlik masalalarini jiddiy qabul qiladi. Universitetda talabalar, professor-o'qituvchilar va xodimlarga bepul psixologik maslahat va yordam ko'rsatadigan Psixologik qo'llab-quvvatlash markazi tashkil etilgan. Malakali va tajribali psixologlar tomonidan taqdim etiladigan ushbu xizmatlar talabalarning akademik yo'ldagi stress, ruhiy zo'riqish va shaxsiy qiyinchiliklarini boshqarishga yordam beradi hamda ularning umumiy ruhiy farovonligiga hissa qo'shadi.",
  facilitiesForDisabledS2Title: "Ko'rish qobiliyati zaif talabalar uchun texnik resurslar",
  facilitiesForDisabledS2Body:
    "TUESda ko'rish qobiliyati zaif talabalar uchun maxsus kompyuter tizimlari o'rnatilgan. Ushbu texnologiyalar ko'r yoki zaif ko'ruvchi talabalarga elektron darsliklar, o'quv materiallari va raqamli resurslarga samarali kirish imkonini beradi hamda teng akademik imkoniyatlarni ta'minlaydi.",
  facilitiesForDisabledS3Title: "Eshitish qobiliyati zaif talabalar uchun imo-ishora tarjimoni xizmatlari",
  facilitiesForDisabledS3Body:
    "Eshitish qobiliyati zaif talabalarni qo'llab-quvvatlash uchun TUES imo-ishora tarjimonlari xizmatlarini taqdim etadi. Ushbu mutaxassislar talabalarga ma'ruzalar, seminarlar va boshqa akademik faoliyatlar davomida yordam beradi hamda ularning ta'lim jarayonida to'liq ishtirok etishlarini ta'minlaydi.",
  facilitiesForDisabledS4Title: "Harakatlanish qulayligi",
  facilitiesForDisabledS4Body:
    "TUES nogironlar aravachasida harakatlanadigan talabalar uchun to'siqlarsiz muhit yaratgan. Bunga maxsus moslashtirilgan hojatxonalar, panduslar, ajratilgan to'xtash joylari va binolar kirishlarida o'rnatilgan platformalar kiradi. Kampus xaritasida ushbu qulay sharoitlar aniq belgilangan bo'lib, jismoniy cheklovlari bo'lgan talabalar universitet bo'ylab erkin va mustaqil harakatlanishlari mumkin.",
  facilitiesForDisabledS5Title: "Maxsus akademik qo'llab-quvvatlash",
  facilitiesForDisabledS5Body:
    "TUES nogironligi bo'lgan talabalar uchun shaxsiylashtirilgan akademik qo'llab-quvvatlash taklif etadi. Bunga maxsus repetitorlik xizmatlari, o'rganish ko'nikmalarini rivojlantirish dasturlari va zamonaviy yordamchi texnologiyalardan foydalanish kiradi. Ushbu choralarning maqsadi talabalarning akademik faoliyatida muvaffaqiyat qozonishlariga yordam berishdir.",
  facilitiesForDisabledS6Title: "Ruhiy salomatlik va shaxsiy rivojlanishni targ'ib qilish faoliyati",
  facilitiesForDisabledS6BodyTop:
    "Psixologik qo'llab-quvvatlash markazi ruhiy salomatlik va farovonlikni mustahkamlashga qaratilgan seminarlar, davra suhbatlari va ta'lim tadbirlarini muntazam tashkil etadi.",
  facilitiesForDisabledS6ListLabel: "Ushbu tadbirlar quyidagi mavzularni qamrab oladi:",
  facilitiesForDisabledS6List:
    "Oila hayotida ota-onaning roli\nStress bilan kurashish strategiyalari\nSog'lom fikrlashni shakllantirish\nOila qadriyatlarini mustahkamlash\nQizlarni oilaviy hayotga tayyorlash va erta nikohning salbiy oqibatlari\nReproduktiv salomatlik va tibbiy madaniyat",
  facilitiesForDisabledS6BodyBottom:
    "Ushbu tadbirlar talabalar, professor-o'qituvchilar va xodimlarning faol ishtirokini rag'batlantiradi hamda g'oya va tajriba almashinuviga imkon yaratadi.",
  facilitiesForDisabledOutro:
    "Termiz iqtisodiyot va servis universiteti barcha talabalar, ayniqsa nogironligi bo'lgan talabalar uchun teng ta'lim va shaxsiy rivojlanish imkoniyatlarini ta'minlashga intiladi. Ruhiy salomatlik xizmatlari, akademik yordam va jismoniy qulaylikni ta'minlash orqali TUES inklyuziv, insonparvar va taraqqiyotga intilgan oliy ta'lim muassasasi sifatida faoliyat yuritadi.",
  qizlarjonCharityPageTitle: "«Qizlarjon» klubi xayriya tadbirini o'tkazdi",
  qizlarjonCharityPageBody:
    "Termiz iqtisodiyot va servis universiteti (TUES) qoshidagi «Qizlarjon» klubi a'zolari «Yulduz» mahallasida yashovchi kam ta'minlangan oilalarga oziq-ovqat mahsulotlarini tarqatish maqsadida xayriya tadbirini tashkil etdilar.\n\nXayriya tadbirining maqsadi muhtoj va kam ta'minlangan fuqarolarni qo'llab-quvvatlash hamda jamiyatda rahm-shafqat va insonparvarlik qadriyatlarini mustahkamlash edi.\n\n— Har bir uy boshlig'i talabalarga minnatdorchilik bildirganida ularning yuzlarida tabassum paydo bo'ldi va qalblarida qoniqish hissini uyg'otdi. Haqiqatan ham, bunday tadbirlar talabalarda ijtimoiy mas'uliyat hissini shakllantirishga va gumanizm ruhida tarbiyalashga yordam beradi, — dedi klub rahbari va universitet Ayollar kengashi raisi Maqsuda Norbosheva.",
  regulationsAndRequirementsIntro:
    "Termiz iqtisodiyot va servis universitetiga (TUES) abituriyentlar uchun asosiy talablar, hujjatlar va ta'lim shakllari.",
  help247PageTitle: "24/7 Yordam markazi",
  help247PageIntro:
    "Termiz iqtisodiyot va servis universitetidagi (TUES) 24/7 Yordam markazi talabalar, xodimlar va potentsial abituriyentlarga istalgan vaqtda va istalgan joydan yordam mavjud bo'lishini ta'minlab, uzluksiz qo'llab-quvvatlash ko'rsatadi. Yordam markazi akademik, texnik, ma'muriy va karyeraga oid so'rovlarni samarali hal qilish uchun mo'ljallangan markaziy raqamli qo'llab-quvvatlash markazidir.",
  help247PurposeHeading: "Maqsad",
  help247PurposeBody:
    "24/7 Yordam markazining maqsadi — talabalar tajribasini yaxshilash, xizmat ko'rsatish sifatini oshirish hamda universitet resurslari va ma'lumotlariga uzluksiz kirishni ta'minlovchi o'z vaqtida, qulay va foydalanuvchi uchun qulay qo'llab-quvvatlashni taqdim etishdir.",
  help247ServicesHeading: "Ko'rsatiladigan xizmatlar",
  help247AcademicTitle: "Akademik qo'llab-quvvatlash",
  help247AcademicItems:
    "Kurslar, jadvallar va baholashlar haqida ma'lumot\nOnlayn ta'lim platformalari bo'yicha yo'riqnoma\nImtihon va ro'yxatdan o'tish bo'yicha yordam",
  help247TechnicalTitle: "Texnik qo'llab-quvvatlash",
  help247TechnicalItems:
    "Universitet tizimlari va portallari bo'yicha yordam\nKirish va hisobni tiklash\nTa'lim platformasidagi nosozliklarni bartaraf etish\nIT xizmat so'rovlari",
  help247AdministrativeTitle: "Ma'muriy yordam",
  help247AdministrativeItems:
    "Qabul va ro'yxatga olish bo'yicha so'rovlar\nHujjatlar so'rash\nO'qish to'lovi va to'lovlar bo'yicha yo'riqnoma\nSiyosat va tartiblar haqida ma'lumot",
  help247CareerTitle: "Karyera va talabalar xizmatlari",
  help247CareerItems:
    "Karyera markazi bo'yicha so'rovlar\nAmaliyot va ish portali qo'llab-quvvatlashi\nTadbirlar haqida ma'lumot\nTalabalar faoliyati bo'yicha yo'riqnoma",
  dormitoryPageTitle: "Yotoqxona",
  dormitoryPageBody:
    "Termiz iqtisodiyot va servis universitetida (TUES) zamonaviy standartlarga javob beradigan va talabalar uchun barcha zarur infratuzilmaga ega bo'lgan bir talabalar yotoqxonasi (TY) faoliyat yuritadi. Ushbu yotoqxona 450 nafargacha talabani joylashtirishi mumkin, 3 qavatdan iborat bo'lib, talabalarga qulay yashash va o'qish sharoitlarini ta'minlaydi.\n\nYotoqxonada 225 xona, 1 kutubxona, 1 madaniy-ma'rifiy tadbirlar zali, 1 sport inshooti va 3 ta oshxona mavjud. Har bir xonada 2 nafar talaba yashaydi va hozirda yotoqxonada muntazam ravishda 450 nafar talaba istiqomat qiladi. Yashash sharoitlari talabalarning kundalik ehtiyojlarini qondirish, sog'lom turmush tarzini rag'batlantirish hamda akademik va ijodiy faoliyatni qo'llab-quvvatlash uchun mo'ljallangan.\n\nYotoqxona kutubxonasi talabalar uchun muhim bilim manbaidir. Unda badiiy va ilmiy kitoblar, ensiklopediyalar, ilmiy maqolalar, davriy nashrlar va o'quv adabiyotlari mavjud. Bundan tashqari, talabalar muhim e'lonlar, dars jadvallari va boshqa tegishli ma'lumotlar bilan doimiy ravishda tanishib turishlari mumkin.\n\nYotoqxonada madaniy va ma'rifiy hayot ham faol rivojlanmoqda. Madaniy-ma'rifiy tadbirlar zali talabalarga bo'sh vaqtini mazmunli o'tkazish va o'z iste'dod hamda qobiliyatlarini namoyish etish imkonini beradi. Davra suhbatlari, badiiy kechalar, teatr tomoshalari, musiqiy dasturlar va boshqa madaniy tadbirlar muntazam o'tkaziladi.\n\nTalabalar yotoqxonalariga joy ajratishda yetimlar, boquvchisini yo'qotgan talabalar, nogironligi bo'lgan talabalar (I va II guruh), surunkali kasalliklar davolanayotganlar, chet elda o'qiyotgan talabalar, shartnoma asosida ikki va undan ortiq farzandini boqayotgan talabalar hamda birinchi kurs talabalari ustuvor qo'yilgan.\n\nTalabalar yotoqxonalarida yashash uchun oylik to'lov Universitet Kengashi tomonidan belgilanadi va 150 000 so'm (yuz ellik ming o'zbek so'mi) miqdorida qo'yilgan.\n\nTo'lovdan ozod qilish bo'yicha ma'lum ijtimoiy toifalarga mansub talabalar — ko'rish qobiliyati zaifligi bo'lganlar (I va II guruh nogironligi), yetimlar va bolalar uylari tarbiyalanuvchilari, kam ta'minlangan talabalar va boshqalar — rektor buyrug'iga muvofiq to'lovdan ozod etiladi.\n\nSog'lom turmush tarzini targ'ib qilish maqsadida yotoqxonada sport inshooti ham mavjud bo'lib, talabalar jismoniy mashqlar bilan shug'ullanishlari, sport bilan mashg'ul bo'lishlari va jamoaviy musobaqalarda qatnashishlari mumkin.\n\nYotoqxonada intizom, tozalik va xavfsizlikning yuqori standartlari saqlanadi. Universitet ma'muriyati yotoqxona yashovchilari bilan muntazam aloqani tashkil etgan. Har hafta universitet professor-o'qituvchilari yotoqxonada navbatchi nazoratchi sifatida qoladi va talabalar bilan bevosita muloqot qiladi. Ushbu tashriflar davomida ular ma'rifiy suhbatlar tashkil etadi, karyera yo'naltirish beradi hamda xabardorlik va mentorlik faoliyatini olib boradi.",
  studentOpinionPageTitle: "Talaba fikri",
  studentOpinionIntro:
    "Fikr-mulohazalaringizni yuboring yoki quyidagi aloqa ma'lumotlari orqali universitet bilan bog'laning.",
  studentOpinionContactHeading: "Biz bilan bog'laning",
  studentOpinionLabelAddress: "Manzil",
  studentOpinionLabelPhone: "Telefon raqami",
  studentOpinionLabelEmail: "Elektron pochta",
  studentOpinionValueAddress: "Termez, Farovon ko'chasi 4-b",
  studentOpinionValuePhoneDisplay: "55 452 77 77",
  studentOpinionValuePhoneTel: "+998554527777",
  studentOpinionValueEmail: "university@tues.uz",
  aboutUniversityPageIntro:
    "Termiz iqtisodiyot va servis universitetiga (TUES) kirish uchun asosiy videoni tomosha qiling.",
  aboutUniversityVideoPlayLabel: "Videoni ushbu sahifada ijro etish",
  bookstorePageTitle: "Kitob do'koni",
  bookstorePageBody:
    "Termiz iqtisodiyot va servis universitetida (TUES) institutsional kitob do'koni nafaqat akademik materiallar sotish punkti, balki universitetning o'quv muhiti va kampus hayotining ajralmas qismi sifatida faoliyat yuritadi. Talabalar akademik tajribasining sifatini oshirish bo'yicha universitet majburiyatlariga muvofiq kitob do'koni majburiy va tavsiya etilgan kurs adabiyotlari, qo'shimcha o'qish materiallari hamda iqtisodiyot, biznes, moliya, menejment va tegishli fanlar bo'yicha professional nashrlarga tuzilgan kirish imkonini ta'minlaydi.\n\nAsosiy savdo funksiyasidan tashqari kitob do'koni akademik va adabiy tadbirlar orqali universitet jamoasida intellektual faollikni rivojlantiradi. Bunga kitob taqdimotlari, mavzuli muhokamalar, mualliflar bilan uchrashuvlar hamda joriy iqtisodiy islohotlar, tadbirkorlikni rivojlantirish, raqamli transformatsiya va barqaror rivojlanish ustuvor yo'nalishlariga bog'liq mutaxassislar seminarlari kiradi. Ushbu tadbirlar talabalar, professor-o'qituvchilar, tadqiqotchilar va tashqi mutaxassislar o'rtasida muloqotni rag'batlantiradi hamda amaliy bilim va tanqidiy fikrlash kompetensiyalarini mustahkamlaydi.\n\nRaqamli o'quv resurslarining oshib borayotgan ahamiyatini inobatga olgan holda kitob do'koni elektron nashrlar va raqamli akademik kontentga kirishni qo'llab-quvvatlaydi. Zarurat tug'ilganda elektron kitoblar va litsenziyalangan raqamli obunalar universitet kutubxonasi va akademik bo'linmalar bilan muvofiqlashtirilgan holda taqdim etiladi. Talabalar raqamli platformalarga kirish va ushbu resurslarni mustaqil o'rganish jarayoniga integratsiya qilish bo'yicha amaliy yo'riqnoma oladi.\n\nArzonlik va resurslarning barqarorligi talabalar moliyaviy yukini kamaytirishga qaratilgan mexanizmlar orqali ta'minlanadi. Har o'quv yili yakunida darsliklarni qayta sotib olish yoki qabul qilish tashabbusi amalga oshirilishi mumkin. Bu talabalarga individual xarajatlarni qoplash imkonini beradi hamda keyingi kurslar uchun zarur adabiyotni arzonroq narxda olish imkonini yaratadi.\n\nKitob do'koni har semestr boshlanishidan oldin tasdiqlangan kurs materiallarining o'z vaqtida mavjud bo'lishini ta'minlash uchun akademik bo'linmalar bilan yaqin hamkorlikda ishlaydi. Ushbu muvofiqlashtirish darsliklarni tanlash jarayonini soddalashtiradi, zarur adabiyotga kechikishlarni kamaytiradi hamda darslar boshlanishidan birinchi haftadan boshlab akademik uzluksizlikni ta'minlaydi.\n\nUniversitet jamoasiga xizmat qilishdan tashqari kitob do'koni institutsional siyosat va hujjatlashtirilgan jamoatchilik dasturlariga muvofiq mahalliy ta'lim muassasalarini kitob va kanselyariya materiallari bilan ta'minlash orqali kengroq ijtimoiy faoliyatga hissa qo'shishi mumkin. Ushbu tashabbuslar hududiy ta'limni rivojlantirish va ijtimoiy mas'uliyat bo'yicha universitet majburiyatini mustahkamlaydi.\n\nIntegratsiyalangan akademik, raqamli, arzonlik va jamiyatga yo'naltirilgan funksiyalari orqali Termiz iqtisodiyot va servis universitetidagi kitob do'koni kampus infratuzilmasidagi muhim akademik qo'llab-quvvatlash birligi hisoblanadi. U qulay o'quv muhitini yaratishga, ta'lim resurslariga teng kirishni qo'llab-quvvatlashga va xalqaro standartlarga mos talabalar tajribasining umumiy sifatini oshirishga hissa qo'shadi.",
  studyProgramsDurationLabel: "Davomiyligi",
  studyProgramsQualificationLabel: "Malaka",
  studyProgramsTuitionLabel: "O'qish to'lovi",
  studyProgramsDegreeLevelLabel: "Daraja",
  studyProgramsApplicationDeadlineLabel: "Ariza topshirish muddati",
  studyProgramsEarliestStartDateLabel: "Eng erta boshlanish sanasi",
  studyProgramsRequestInfo: "Ma'lumot so'rash",
  studyProgramsCardsHint:
    "To'liq kurs ro'yxatini ko'rish uchun dasturni tanlang.",
  studyProgramsViewCoursesCta: "Kurslarni ko'rish",
  studyProgramsCoursesTitle: "Kurslar",
  studyProgramsBackLabel: "Ta'lim dasturlariga qaytish",
  studyProgramsSidebarSectionsLabel: "O'quv dasturi bo'limlari",
  studyProgramsContentsLabel: "Mundarija",
  studyProgramsCourseNameLabel: "Kurs",
  studyProgramsCreditsLabel: "Kreditlar",
  studyProgramsApplyCta: "Ariza berish",
  studentAcademicSupportPageIntro:
    "Termiz iqtisodiyot va servis universitetida (TUES) quyidagi resurslar akademik yo'riqnoma, rasmiy talabalar siyosatlari va talabalar uyushmasi boshqaruvini birlashtiradi. Har bir mavzuni o'rganish uchun kartochkalardan foydalaning.",
  communityClubsPageIntro:
    "Termiz iqtisodiyot va servis universitetidagi (TUES) talabalar klublari, studiyalar va jamoatchilik yangiliklarini o'rganing. Quyida kampusdagi so'nggi faoliyatlar va faol guruhlar keltirilgan.",
});

console.log("Part 1 uz keys:", Object.keys(uz).length);
