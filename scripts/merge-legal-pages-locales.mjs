import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const enPath = path.join(root, "public/locales/en/topNav.json");
const ruPath = path.join(root, "public/locales/ru/topNav.json");
const uzPath = path.join(root, "public/locales/uz/topNav.json");

const enContent = JSON.parse(fs.readFileSync(enPath, "utf8"));

const PREFIXES = ["termsOfUse", "copyright", "privacyPolicy"];

/** @param {Record<string, string>} obj */
function pickLegalKeys(obj) {
  /** @type {Record<string, string>} */
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (PREFIXES.some((p) => key.startsWith(p))) out[key] = value;
  }
  return out;
}

const enLegal = pickLegalKeys(enContent);

/** @type {Record<string, string>} */
const ruTranslations = {
  termsOfUsePageTitle: "Условия использования",
  termsOfUseLastUpdated: "Последнее обновление: 30 июля 2026 г.",
  termsOfUseIntro1:
    "Настоящие Условия использования регулируют использование официального веб-сайта Termez University of Economics and Service (далее — Университет).",
  termsOfUseIntro2:
    "Используя веб-сайт, пользователь подтверждает, что ознакомился с настоящими условиями и согласен их соблюдать.",
  termsOfUseSection1Title: "1. Общие положения",
  termsOfUseSection1P1:
    "Университет предоставляет доступ к информации, электронным сервисам и иным материалам, размещённым на данном веб-сайте, в соответствии с действующим законодательством и настоящими Условиями использования.",
  termsOfUseSection1P2:
    "Информация, размещённая на веб-сайте Университета, публикуется в информационных и образовательных целях.",
  termsOfUseSection2Title: "2. Права интеллектуальной собственности",
  termsOfUseSection2P1:
    "Тексты, изображения, логотипы, графические материалы, видео, программный код, базы данных и иные материалы, размещённые на веб-сайте, защищены законодательством Республики Узбекистан об интеллектуальной собственности.",
  termsOfUseSection2P2:
    'Копирование, воспроизведение, распространение, изменение, повторная публикация в интернете или использование этих материалов в коммерческих целях без предварительного письменного согласия Университета не допускается, за исключением случаев, предусмотренных законом. Дополнительная информация по этому вопросу приведена в документе «Авторское право».',
  termsOfUseSection3Title: "3. Обязанности пользователя",
  termsOfUseSection3Intro: "При использовании веб-сайта пользователь обязан:",
  termsOfUseSection3Bullet1: "соблюдать требования действующего законодательства;",
  termsOfUseSection3Bullet2: "не нарушать права и законные интересы других лиц;",
  termsOfUseSection3Bullet3: "не размещать вредоносное программное обеспечение, вирусы или незаконный контент;",
  termsOfUseSection3Bullet4: "не незаконно вмешиваться в работу веб-сайта.",
  termsOfUseSection4Title: "4. Права Университета",
  termsOfUseSection4Intro: "Университет оставляет за собой право:",
  termsOfUseSection4Bullet1: "обновлять, изменять или удалять контент на веб-сайте;",
  termsOfUseSection4Bullet2:
    "временно ограничивать или приостанавливать работу веб-сайта в целях технического обслуживания;",
  termsOfUseSection4Bullet3:
    "ограничивать доступ к отдельным сервисам для пользователей, нарушающих настоящие Условия использования.",
  termsOfUseSection5Title: "5. Ограничение ответственности",
  termsOfUseSection5P1:
    "Университет принимает необходимые меры для обеспечения актуальности и достоверности информации, размещённой на веб-сайте.",
  termsOfUseSection5P2:
    "Вместе с тем, если иное не предусмотрено законом, Университет не несёт ответственности за любой прямой или косвенный ущерб, который может возникнуть в результате использования информации на веб-сайте.",
  termsOfUseSection5P3:
    "Университет не несёт ответственности за содержание сторонних веб-сайтов, на которые имеются ссылки с данного веб-сайта.",
  termsOfUseSection6Title: "6. Внешние ссылки",
  termsOfUseSection6P1: "На веб-сайте могут содержаться ссылки на интернет-ресурсы третьих лиц.",
  termsOfUseSection6P2:
    "Наличие таких ссылок не означает одобрения Университетом деятельности или содержания этих ресурсов.",
  termsOfUseSection7Title: "7. Конфиденциальность",
  termsOfUseSection7P1:
    'Порядок сбора и обработки персональных данных пользователей регулируется документом «Политика конфиденциальности».',
  termsOfUseSection8Title: "8. Изменения Условий использования",
  termsOfUseSection8P1:
    "Университет оставляет за собой право в любое время изменять и дополнять настоящие Условия использования.",
  termsOfUseSection8P2:
    "Обновлённая версия вступает в силу с даты её публикации на официальном веб-сайте.",
  termsOfUseSection9Title: "9. Контакты",
  termsOfUseSection9P1:
    "По вопросам или предложениям, касающимся настоящих Условий использования, вы можете обратиться на официальный адрес электронной почты Университета.",
  termsOfUseSection9EmailLabel: "E-mail:",
  termsOfUseSection9Email: "info@tisu.uz",

  copyrightPageTitle: "Авторское право",
  copyrightNotice: "© 2026 Termez University of Economics and Service. Все права защищены.",
  copyrightP1:
    'Тексты, изображения, логотипы, графические материалы, видео, программный код, базы данных и иные объекты интеллектуальной собственности, размещённые на данном веб-сайте, защищены авторским правом и смежными правами в соответствии с Законом Республики Узбекистан «Об авторском праве и смежных правах» и иными применимыми нормативно-правовыми актами.',
  copyrightP2:
    "Копирование, воспроизведение, распространение, изменение, повторная публикация в интернете или использование этих материалов в коммерческих целях полностью или частично без предварительного письменного согласия Университета не допускается, за исключением случаев, предусмотренных законом.",
  copyrightP3:
    'Использование новостных и информационных материалов Университета допускается при условии указания «Termez University of Economics and Service» в качестве источника и размещения активной ссылки на официальный веб-сайт.',
  copyrightP4:
    "Для получения разрешения на использование материалов или дополнительной информации вы можете обратиться на официальный адрес электронной почты Университета.",
  copyrightEmailLabel: "E-mail:",
  copyrightEmail: "info@tisu.uz",

  privacyPolicyPageTitle: "Политика конфиденциальности",
  privacyPolicyLastUpdated: "Последнее обновление: 30 июля 2026 г.",
  privacyPolicyIntro1:
    'Termez University of Economics and Service (далее — Университет) уважает конфиденциальность персональных данных своих пользователей и обрабатывает и защищает их в соответствии с Законом Республики Узбекистан «О персональных данных», Законом «Об информатизации» и иными применимыми нормативно-правовыми актами.',
  privacyPolicyIntro2:
    "Настоящая Политика конфиденциальности определяет порядок сбора, обработки, хранения и защиты персональных данных при использовании официального веб-сайта в домене TUES.UZ и иных электронных информационных ресурсов, администрируемых Университетом.",
  privacyPolicySection1Title: "1. Какую информацию мы собираем?",
  privacyPolicySection1Intro: "Университет может собирать следующую информацию:",
  privacyPolicySection1RegistrationTitle: "Через регистрационную форму:",
  privacyPolicySection1RegistrationBullet1: "фамилия, имя и отчество;",
  privacyPolicySection1RegistrationBullet2: "гражданство;",
  privacyPolicySection1RegistrationBullet3: "номер телефона;",
  privacyPolicySection1RegistrationBullet4: "паспортные данные (серия и номер);",
  privacyPolicySection1RegistrationBullet5: "ПИНФЛ (персональный идентификационный номер физического лица).",
  privacyPolicySection1NewsletterTitle: "При подписке на рассылку по электронной почте:",
  privacyPolicySection1NewsletterBullet1: "адрес электронной почты.",
  privacyPolicySection1InquiryTitle: "При отправке запроса или заявления:",
  privacyPolicySection1InquiryBullet1: "содержание запроса или заявления и указанные контактные данные.",
  privacyPolicySection1AutoTitle: "Автоматически собираемые данные с веб-сайта:",
  privacyPolicySection1AutoBullet1: "IP-адрес;",
  privacyPolicySection1AutoBullet2: "техническая информация о типе браузера, операционной системе и устройстве;",
  privacyPolicySection1AutoBullet3: "статистические данные, полученные с помощью файлов cookie.",
  privacyPolicySection1P2:
    "Университет также может собирать иную информацию, добровольно предоставленную пользователем при использовании электронных сервисов Университета.",
  privacyPolicySection1P3:
    "Паспортные данные и ПИНФЛ запрашиваются только там, где требуется точная идентификация пользователя (регистрация и обработка связанных документов), и не используются в иных целях.",
  privacyPolicySection2Title: "2. Цели использования данных",
  privacyPolicySection2Intro: "Собранные персональные данные используются в следующих целях:",
  privacyPolicySection2Bullet1: "ответы на запросы пользователей;",
  privacyPolicySection2Bullet2: "предоставление электронных сервисов Университета;",
  privacyPolicySection2Bullet3: "регистрация студентов, абитуриентов и иных пользователей и обслуживание их;",
  privacyPolicySection2Bullet4: "точная идентификация пользователя на основе паспортных данных и ПИНФЛ;",
  privacyPolicySection2Bullet5: "организация образовательного процесса;",
  privacyPolicySection2Bullet6:
    "информирование о новостях и объявлениях Университета по электронной почте (в рамках сервиса подписки на рассылку);",
  privacyPolicySection2Bullet7: "анализ и улучшение работы веб-сайта;",
  privacyPolicySection2Bullet8: "обеспечение информационной безопасности;",
  privacyPolicySection2Bullet9: "соблюдение требований действующего законодательства.",
  privacyPolicySection2P2:
    "Университет не использует персональные данные в целях, несовместимых с теми, для которых они были собраны.",
  privacyPolicySection3Title: "3. Файлы cookie",
  privacyPolicySection3P1:
    "Веб-сайт Университета может использовать файлы cookie для удобного обслуживания пользователей, обеспечения корректной работы функций веб-сайта и проведения статистического анализа.",
  privacyPolicySection3P2: "Пользователи могут ограничить или отключить файлы cookie в настройках браузера.",
  privacyPolicySection4Title: "4. Защита персональных данных",
  privacyPolicySection4P1:
    "Университет применяет необходимые организационные и технические меры безопасности для предотвращения утраты, незаконного использования, несанкционированного доступа, изменения или разглашения персональных данных.",
  privacyPolicySection4P2:
    "Паспортные данные и ПИНФЛ как идентификационная информация доступны только уполномоченным сотрудникам и хранятся с дополнительными мерами безопасности.",
  privacyPolicySection4P3:
    "Персональные данные могут быть переданы третьим лицам только в случаях, предусмотренных законом, или с согласия пользователя.",
  privacyPolicySection4P4:
    "Университет не продаёт персональные данные пользователей и не передаёт их третьим лицам в рекламных целях.",
  privacyPolicySection5Title: "5. Хранение данных",
  privacyPolicySection5P1:
    "Персональные данные хранятся столько, сколько необходимо для достижения цели их обработки, или в течение сроков, установленных законодательством Республики Узбекистан.",
  privacyPolicySection5P2:
    "Данные, собранные при регистрации, хранятся в течение срока статуса пользователя в отношении Университета (статус студента, подписчика и т. д.) и далее в течение архивных сроков, установленных законом. Пользователи могут в любое время отказаться от рассылки, после чего их адрес электронной почты удаляется из списка подписчиков.",
  privacyPolicySection6Title: "6. Права пользователя",
  privacyPolicySection6Intro: "В соответствии с действующим законодательством пользователь имеет право:",
  privacyPolicySection6Bullet1: "получать информацию о своих персональных данных;",
  privacyPolicySection6Bullet2: "требовать исправления неточных или неполных данных;",
  privacyPolicySection6Bullet3:
    "требовать удаления данных или ограничения их обработки в случаях, предусмотренных законом;",
  privacyPolicySection6Bullet4: "направлять запросы относительно обработки своих персональных данных.",
  privacyPolicySection7Title: "7. Изменения Политики конфиденциальности",
  privacyPolicySection7P1:
    "Университет оставляет за собой право изменять и дополнять настоящую Политику конфиденциальности. Обновлённая версия вступает в силу с даты её публикации на официальном веб-сайте.",
  privacyPolicySection8Title: "8. Контакты",
  privacyPolicySection8P1:
    "По вопросам, касающимся настоящей Политики конфиденциальности или обработки персональных данных, вы можете обратиться на официальный адрес электронной почты Университета.",
  privacyPolicySection8EmailLabel: "E-mail:",
  privacyPolicySection8Email: "info@tisu.uz",
};

/** @type {Record<string, string>} */
const uzTranslations = {
  termsOfUsePageTitle: "Foydalanish shartlari",
  termsOfUseLastUpdated: "Oxirgi yangilanish: 2026-yil 30-iyul",
  termsOfUseIntro1:
    "Ushbu Foydalanish shartlari Termiz iqtisodiyot va servis universitetining (keyingi o‘rinlarda — Universitet) rasmiy veb-saytidan foydalanishni tartibga soladi.",
  termsOfUseIntro2:
    "Veb-saytdan foydalanish orqali foydalanuvchi ushbu shartlar bilan tanishganini va ularga rioya qilishga roziligini tasdiqlaydi.",
  termsOfUseSection1Title: "1. Umumiy qoidalar",
  termsOfUseSection1P1:
    "Universitet ushbu veb-saytda joylashtirilgan ma’lumotlar, elektron xizmatlar va boshqa materiallarga amaldagi qonunchilik hamda ushbu Foydalanish shartlariga muvofiq kirish imkonini taqdim etadi.",
  termsOfUseSection1P2:
    "Universitet veb-saytida joylashtirilgan ma’lumotlar axborot va ta’lim maqsadlarida e’lon qilinadi.",
  termsOfUseSection2Title: "2. Intellektual mulk huquqlari",
  termsOfUseSection2P1:
    "Veb-saytda joylashtirilgan matnlar, rasmlar, logotiplar, grafik materiallar, videolar, dasturiy kod, ma’lumotlar bazalari va boshqa materiallar O‘zbekiston Respublikasining intellektual mulk to‘g‘risidagi qonunchiligi bilan himoya qilinadi.",
  termsOfUseSection2P2:
    'Ushbu materiallarni Universitetning oldindan yozma roziligisiz nusxalash, ko‘paytirish, tarqatish, o‘zgartirish, internetda qayta e’lon qilish yoki tijorat maqsadlarida foydalanish qonunda nazarda tutilgan hollardan tashqari taqiqlanadi. Bu masala bo‘yicha batafsil ma’lumot «Mualliflik huquqi» hujjatida keltirilgan.',
  termsOfUseSection3Title: "3. Foydalanuvchi majburiyatlari",
  termsOfUseSection3Intro: "Veb-saytdan foydalanishda foydalanuvchi quyidagilarga rioya qilishi shart:",
  termsOfUseSection3Bullet1: "amaldagi qonunchilik talablariga;",
  termsOfUseSection3Bullet2: "boshqa shaxslarning huquq va qonuniy manfaatlarini buzmaslikka;",
  termsOfUseSection3Bullet3: "zararli dasturiy ta’minot, viruslar yoki noqonuniy kontent joylashtirmaslikka;",
  termsOfUseSection3Bullet4: "veb-sayt faoliyatiga noqonuniy aralashmaslikka.",
  termsOfUseSection4Title: "4. Universitet huquqlari",
  termsOfUseSection4Intro: "Universitet quyidagi huquqlarga ega:",
  termsOfUseSection4Bullet1: "veb-saytdagi kontentni yangilash, o‘zgartirish yoki olib tashlash;",
  termsOfUseSection4Bullet2:
    "texnik xizmat ko‘rsatish maqsadida veb-sayt faoliyatini vaqtincha cheklash yoki to‘xtatib turish;",
  termsOfUseSection4Bullet3:
    "ushbu Foydalanish shartlarini buzgan foydalanuvchilar uchun ayrim xizmatlarga kirishni cheklash.",
  termsOfUseSection5Title: "5. Javobgarlikni cheklash",
  termsOfUseSection5P1:
    "Universitet veb-saytda joylashtirilgan ma’lumotlarning dolzarbligi va ishonchliligini ta’minlash uchun zarur choralar ko‘radi.",
  termsOfUseSection5P2:
    "Shu bilan birga, qonunda boshqacha tartib nazarda tutilmagan bo‘lsa, Universitet veb-saytdagi ma’lumotlardan foydalanish natijasida yuzaga kelishi mumkin bo‘lgan to‘g‘ridan-to‘g‘ri yoki bilvosita zararlar uchun javobgar emas.",
  termsOfUseSection5P3:
    "Universitet ushbu veb-saytdan havola qilingan uchinchi tomon veb-saytlarining kontenti uchun javobgar emas.",
  termsOfUseSection6Title: "6. Tashqi havolalar",
  termsOfUseSection6P1: "Veb-saytda uchinchi tomon internet resurslariga havolalar bo‘lishi mumkin.",
  termsOfUseSection6P2:
    "Bunday havolalar mavjudligi Universitetning ushbu resurslar faoliyati yoki kontentini ma’qullashi degani emas.",
  termsOfUseSection7Title: "7. Maxfiylik",
  termsOfUseSection7P1:
    'Foydalanuvchilarning shaxsiy ma’lumotlarini yig‘ish va qayta ishlash tartibi «Maxfiylik siyosati» hujjati bilan tartibga solinadi.',
  termsOfUseSection8Title: "8. Foydalanish shartlariga o‘zgartirishlar kiritish",
  termsOfUseSection8P1:
    "Universitet ushbu Foydalanish shartlarini istalgan vaqtda o‘zgartirish va to‘ldirish huquqini o‘zida saqlab qoladi.",
  termsOfUseSection8P2:
    "Yangilangan versiya rasmiy veb-saytda e’lon qilingan kundan kuchga kiradi.",
  termsOfUseSection9Title: "9. Aloqa",
  termsOfUseSection9P1:
    "Ushbu Foydalanish shartlariga oid savollar yoki takliflar bo‘yicha Universitetning rasmiy elektron pochta manziliga murojaat qilishingiz mumkin.",
  termsOfUseSection9EmailLabel: "E-mail:",
  termsOfUseSection9Email: "info@tisu.uz",

  copyrightPageTitle: "Mualliflik huquqi",
  copyrightNotice: "© 2026 Termiz iqtisodiyot va servis universiteti. Barcha huquqlar himoyalangan.",
  copyrightP1:
    'Ushbu veb-saytda joylashtirilgan matnlar, rasmlar, logotiplar, grafik materiallar, videolar, dasturiy kod, ma’lumotlar bazalari va boshqa intellektual mulk obyektlari O‘zbekiston Respublikasining «Mualliflik huquqi va turdosh huquqlar to‘g‘risida»gi Qonuni hamda boshqa amaldagi normativ-huquqiy hujjatlariga muvofiq mualliflik huquqi va turdosh huquqlar bilan himoya qilinadi.',
  copyrightP2:
    "Ushbu materiallarni butunlay yoki qisman Universitetning oldindan yozma roziligisiz nusxalash, ko‘paytirish, tarqatish, o‘zgartirish, internetda qayta e’lon qilish yoki tijorat maqsadlarida foydalanish qonunda nazarda tutilgan hollardan tashqari taqiqlanadi.",
  copyrightP3:
    'Universitetning yangilik va axborot materiallaridan foydalanish «Termiz iqtisodiyot va servis universiteti» manba sifatida ko‘rsatilgan va rasmiy veb-saytga faol havola kiritilgan taqdirda ruxsat etiladi.',
  copyrightP4:
    "Materiallardan foydalanish uchun ruxsat olish yoki qo‘shimcha ma’lumot olish maqsadida Universitetning rasmiy elektron pochta manziliga murojaat qilishingiz mumkin.",
  copyrightEmailLabel: "E-mail:",
  copyrightEmail: "info@tisu.uz",

  privacyPolicyPageTitle: "Maxfiylik siyosati",
  privacyPolicyLastUpdated: "Oxirgi yangilanish: 2026-yil 30-iyul",
  privacyPolicyIntro1:
    'Termiz iqtisodiyot va servis universiteti (keyingi o‘rinlarda — Universitet) foydalanuvchilarning shaxsiy ma’lumotlari maxfiyligini hurmat qiladi hamda ularni O‘zbekiston Respublikasining «Shaxsiy ma’lumotlar to‘g‘risida»gi Qonuni, «Axborotlashtirish to‘g‘risida»gi Qonuni va boshqa amaldagi normativ-huquqiy hujjatlarga muvofiq qayta ishlaydi va himoya qiladi.',
  privacyPolicyIntro2:
    "Ushbu Maxfiylik siyosati TUES.UZ domenidagi rasmiy veb-saytdan va Universitet tomonidan boshqariladigan boshqa elektron axborot resurslaridan foydalanishda shaxsiy ma’lumotlarni yig‘ish, qayta ishlash, saqlash va himoya qilish tartibini belgilaydi.",
  privacyPolicySection1Title: "1. Qanday ma’lumotlarni yig‘amiz?",
  privacyPolicySection1Intro: "Universitet quyidagi ma’lumotlarni yig‘ishi mumkin:",
  privacyPolicySection1RegistrationTitle: "Ro‘yxatdan o‘tish formasi orqali:",
  privacyPolicySection1RegistrationBullet1: "familiya, ism va otasining ismi;",
  privacyPolicySection1RegistrationBullet2: "fuqarolik;",
  privacyPolicySection1RegistrationBullet3: "telefon raqami;",
  privacyPolicySection1RegistrationBullet4: "pasport ma’lumotlari (seriya va raqam);",
  privacyPolicySection1RegistrationBullet5: "JSHSHIR (jismoniy shaxsning shaxsiy identifikatsiya raqami).",
  privacyPolicySection1NewsletterTitle: "Elektron pochta xabarnomalariga obuna bo‘lish orqali:",
  privacyPolicySection1NewsletterBullet1: "elektron pochta manzili.",
  privacyPolicySection1InquiryTitle: "So‘rov yoki ariza yuborish orqali:",
  privacyPolicySection1InquiryBullet1: "so‘rov yoki ariza matni hamda ko‘rsatilgan aloqa ma’lumotlari.",
  privacyPolicySection1AutoTitle: "Veb-saytdan avtomatik tarzda yig‘iladigan ma’lumotlar:",
  privacyPolicySection1AutoBullet1: "IP-manzil;",
  privacyPolicySection1AutoBullet2: "brauzer turi, operatsion tizim va qurilma haqidagi texnik ma’lumotlar;",
  privacyPolicySection1AutoBullet3: "cookie-fayllar orqali olingan statistik ma’lumotlar.",
  privacyPolicySection1P2:
    "Universitet shuningdek, foydalanuvchi Universitetning elektron xizmatlaridan foydalanish jarayonida ixtiyoriy ravishda taqdim etgan boshqa ma’lumotlarni ham yig‘ishi mumkin.",
  privacyPolicySection1P3:
    "Pasport ma’lumotlari va JSHSHIR faqat foydalanuvchini aniq identifikatsiya qilish talab qilinadigan hollarda (ro‘yxatdan o‘tish va tegishli hujjatlarni rasmiylashtirish) so‘raladi va boshqa maqsadlarda foydalanilmaydi.",
  privacyPolicySection2Title: "2. Ma’lumotlardan foydalanish maqsadlari",
  privacyPolicySection2Intro: "Yig‘ilgan shaxsiy ma’lumotlar quyidagi maqsadlarda foydalaniladi:",
  privacyPolicySection2Bullet1: "foydalanuvchi so‘rovlariga javob berish;",
  privacyPolicySection2Bullet2: "Universitetning elektron xizmatlarini taqdim etish;",
  privacyPolicySection2Bullet3: "talabalar, abituriyentlar va boshqa foydalanuvchilarni ro‘yxatga olish va xizmat ko‘rsatish;",
  privacyPolicySection2Bullet4: "pasport ma’lumotlari va JSHSHIR asosida foydalanuvchini aniq identifikatsiya qilish;",
  privacyPolicySection2Bullet5: "ta’lim jarayonini tashkil etish;",
  privacyPolicySection2Bullet6:
    "elektron pochta orqali Universitet yangiliklari va e’lonlari haqida xabardor qilish (xabarnomaga obuna xizmati doirasida);",
  privacyPolicySection2Bullet7: "veb-sayt ish faoliyatini tahlil qilish va yaxshilash;",
  privacyPolicySection2Bullet8: "axborot xavfsizligini ta’minlash;",
  privacyPolicySection2Bullet9: "amaldagi qonunchilik talablariga rioya etish.",
  privacyPolicySection2P2:
    "Universitet shaxsiy ma’lumotlarni ular yig‘ilgan maqsadlarga zid bo‘lgan maqsadlarda foydalanmaydi.",
  privacyPolicySection3Title: "3. Cookie-fayllar",
  privacyPolicySection3P1:
    "Universitet veb-sayti foydalanuvchilarga qulay xizmat ko‘rsatish, veb-sayt funksiyalarining to‘g‘ri ishlashini ta’minlash va statistik tahlil o‘tkazish uchun cookie-fayllardan foydalanishi mumkin.",
  privacyPolicySection3P2: "Foydalanuvchilar brauzer sozlamalari orqali cookie-fayllarni cheklash yoki o‘chirib qo‘yishi mumkin.",
  privacyPolicySection4Title: "4. Shaxsiy ma’lumotlarni himoya qilish",
  privacyPolicySection4P1:
    "Universitet shaxsiy ma’lumotlarning yo‘qolishi, noqonuniy foydalanilishi, ruxsatsiz kirish, o‘zgartirilishi yoki oshkor etilishining oldini olish uchun zarur tashkiliy va texnik xavfsizlik choralarini qo‘llaydi.",
  privacyPolicySection4P2:
    "Pasport ma’lumotlari va JSHSHIR identifikatsiya ma’lumotlari sifatida faqat vakolatli xodimlar uchun ochiq va qo‘shimcha xavfsizlik nazorati ostida saqlanadi.",
  privacyPolicySection4P3:
    "Shaxsiy ma’lumotlar uchinchi shaxslarga faqat qonunda nazarda tutilgan hollarda yoki foydalanuvchi roziligi bilan berilishi mumkin.",
  privacyPolicySection4P4:
    "Universitet foydalanuvchilarning shaxsiy ma’lumotlarini sotmaydi va reklama maqsadlarida uchinchi shaxslarga taqdim etmaydi.",
  privacyPolicySection5Title: "5. Ma’lumotlarni saqlash",
  privacyPolicySection5P1:
    "Shaxsiy ma’lumotlar qayta ishlash maqsadiga erishish uchun zarur bo‘lgan muddat davomida yoki O‘zbekiston Respublikasi qonunchiligida belgilangan muddatlar davomida saqlanadi.",
  privacyPolicySection5P2:
    "Ro‘yxatdan o‘tish paytida yig‘ilgan ma’lumotlar foydalanuvchining Universitet nisbatiidagi maqomi (talaba, obunachi va hokazo) davomida hamda undan keyin qonunda belgilangan arxiv muddatlari davomida saqlanadi. Foydalanuvchilar istalgan vaqtda xabarnomalardan voz kechishi mumkin, shundan so‘ng ularning elektron pochta manzili obunachilar ro‘yxatidan olib tashlanadi.",
  privacyPolicySection6Title: "6. Foydalanuvchi huquqlari",
  privacyPolicySection6Intro: "Amaldagi qonunchilikka muvofiq foydalanuvchi quyidagi huquqlarga ega:",
  privacyPolicySection6Bullet1: "o‘z shaxsiy ma’lumotlari haqida ma’lumot olish;",
  privacyPolicySection6Bullet2: "noto‘g‘ri yoki to‘liq bo‘lmagan ma’lumotlarni tuzatishni talab qilish;",
  privacyPolicySection6Bullet3:
    "qonunda nazarda tutilgan hollarda ma’lumotlarni o‘chirish yoki qayta ishlashni cheklashni talab qilish;",
  privacyPolicySection6Bullet4: "shaxsiy ma’lumotlarini qayta ishlash bo‘yicha so‘rovlar yuborish.",
  privacyPolicySection7Title: "7. Maxfiylik siyosatiga o‘zgartirishlar kiritish",
  privacyPolicySection7P1:
    "Universitet ushbu Maxfiylik siyosatini o‘zgartirish va to‘ldirish huquqini o‘zida saqlab qoladi. Yangilangan versiya rasmiy veb-saytda e’lon qilingan kundan kuchga kiradi.",
  privacyPolicySection8Title: "8. Aloqa",
  privacyPolicySection8P1:
    "Ushbu Maxfiylik siyosati yoki shaxsiy ma’lumotlarni qayta ishlash bo‘yicha savollar uchun Universitetning rasmiy elektron pochta manziliga murojaat qilishingiz mumkin.",
  privacyPolicySection8EmailLabel: "E-mail:",
  privacyPolicySection8Email: "info@tisu.uz",
};

function mergeLocale(filePath, translations) {
  const locale = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const merged = { ...locale, ...enLegal, ...translations };
  const sortedKeys = Object.keys(merged).sort((a, b) => a.localeCompare(b));
  const sorted = {};
  for (const k of sortedKeys) sorted[k] = merged[k];
  fs.writeFileSync(filePath, `${JSON.stringify(sorted, null, 2)}\n`);
}

mergeLocale(ruPath, ruTranslations);
mergeLocale(uzPath, uzTranslations);

console.log(`Merged ${Object.keys(enLegal).length} legal page keys into ru and uz topNav.json`);
