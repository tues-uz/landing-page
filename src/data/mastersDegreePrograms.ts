/**
 * Magistratura (master’s / graduate) program listings — source: university program tables.
 * Specialty 70910217: Urology (HTML copy listed an incorrect code for one row; corrected to standard cipher.)
 */

export type MastersDegreeProgram = {
  index: number;
  specialtyCode: string;
  specialtyName: string;
  duration: string;
  typeOfEducation: string;
  qualification: string;
  totalCredits: string;
  languages: string;
  formOfEducation: string;
  description: string;
};

export const MASTERS_DEGREE_PROGRAMS: MastersDegreeProgram[] = [
  {
    index: 1,
    specialtyCode: "70220301",
    specialtyName: "History",
    duration: "2 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Historian, educator-researcher",
    totalCredits: "120",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      '70220301 — History — "humanities" is the field of education related to education, higher education, professional development and retraining. This includes the teaching of specialized subjects in general high schools, secondary special schools and vocational training institutions. The academy of sciences of the republic of Uzbekistan and its network cover a wide range of issues related to this area in research centers, design institutes, scientific production associations, production and service enterprises, public administration bodies, industrial and entrepreneurial organizations.',
  },
  {
    index: 2,
    specialtyCode: "70610101",
    specialtyName: "Computer systems and learning software",
    duration: "2 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Computer engineer, educator-researcher",
    totalCredits: "120",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "Teaching specialty subjects in all educational institutions, conducting scientific research activities at the Academy of Sciences of the Republic of Uzbekistan and the network scientific research institutes, centers, scientific production associations, solving various issues using mathematical models and mathematical methods and computer technologies, and covering a complex set of issues related to their software, research, engineering and mathematical methods capable in industry.",
  },
  {
    index: 3,
    specialtyCode: "70540101",
    specialtyName: "Mathematics",
    duration: "2 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Mathematician, educator-researcher",
    totalCredits: "120",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      '70540101 — Mathematics — "Mathematics and statistics" is a specialty in the field of education, covers the teaching of specialty science in all educational institutions, the Academy of Sciences of the Republic of Uzbekistan and network scientific research institutes, state and economic management bodies, joint-stock companies, a set of production enterprises.',
  },
  {
    index: 4,
    specialtyCode: "70910218",
    specialtyName: "Morphology",
    duration: "2 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Morphologist, educator-researcher",
    totalCredits: "120",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "Teaching specialty science in higher and professional education system, training and retraining institutions; conducting research activities in the Academy of Sciences of the Republic of Uzbekistan and research institutes and research centers of the Ministry of health of the Republic of Uzbekistan; Academy of Sciences of the Republic of Uzbekistan and network research institutes, Ministry of health of the Republic of Uzbekistan, regional health departments, conducting scientific research activities in research centers, at enterprises of various forms of ownership, non-governmental and non-profit organizations, central and local public administration bodies. Solving the complex issue of the organization and management of treatment-preventive activities in small business and private business entities, as well as conducting an activity in treatment and preventive institutions in the health system, covers a complex of tools, methods, and techniques of human activity aimed at professional skills, mutassaddism skills. Treatment and preventive institutions of the health care system (Republic, Region, City, district and network) carry out activity in laboratories at district health service centers, conduct an examination, evaluate activities and develop preventive recommendations; includes the solution of complex issues in the field of morphology and pathological physiology in all branches of the health system.",
  },
  {
    index: 5,
    specialtyCode: "70910101",
    specialtyName: "Dentistry",
    duration: "2 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Dentist, educator-researcher",
    totalCredits: "120",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "It covers a complex of professional fields with the teaching of specialty subjects in all educational institutions, conducting scientific research activities in scientific research institutes, centers, scientific production associations of the Academy of Sciences of the Republic of Uzbekistan, organization and improvement of economic activities in enterprises of various forms of ownership, non-governmental and non-profit organizations, central and local government authorities, small business and private business entities. In the treatment and prophylactic organizations of the health preservation system (precinct, district, central district, city, central city, region, republican hospitals, reception units and specialty units, rural doctor's offices, urban doctor's offices, family polyclinics, dental clinics, multidisciplinary central city polyclinics, rapid and emergency medical care stations, maternity and childhood protection organizations, sanatorium-resort organizations) cover a complex of professional areas related to improvement in the medical problems of patient care, using a wide range of modern methods of diagnosis and treatment.",
  },
  {
    index: 6,
    specialtyCode: "70910217",
    specialtyName: "Urology",
    duration: "3 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Urologist, educator-researcher",
    totalCredits: "180",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "Master’s degree in urology — a system of higher and professional education, training of specialties in training and retraining institutions; the Academy of Sciences of the Republic of Uzbekistan and network research institutes, the Ministry of health of the Republic of Uzbekistan, health departments of the regions, conducting scientific research activities in research centers, solving the complex issue of the organization and management of treatment-preventive activity in enterprises of various forms of ownership, non-governmental and non-profit organizations, central and local public administration bodies, small business. It also covers a complex of tools, methods, and techniques of human activity, aimed at professional skills and the ability to operate in treatment and preventive institutions in the health system. Modern achievements of specialist science, technology and technology; the Master’s degree may be additional and may change in the areas of professional activity arising from the requirements of personnel customers.",
  },
  {
    index: 7,
    specialtyCode: "70910203",
    specialtyName: "Therapy (by orientation)",
    duration: "3 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Therapist, educator-researcher",
    totalCredits: "180",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "Training of specialty modules in higher and secondary specialized, vocational education system, professional development, retraining institutions; the Academy of Sciences of the Republic of Uzbekistan and network research institutes, the Ministry of health of the Republic of Uzbekistan, the departments of health of the regions, conducting scientific research activities in research centers, solving complex issues related to the organization and management of treatment-preventive activities in enterprises, non-governmental and non-profit organizations, small business and private business entities of the central, also, the functioning of treatment and preventive institutions in the health system covers a complex of tools, methods, and techniques of human activity aimed at the ability to develop professional skills.",
  },
  {
    index: 8,
    specialtyCode: "70910212",
    specialtyName: "Surgery",
    duration: "3 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Surgeon, educator-researcher",
    totalCredits: "180",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "Higher medical education, advanced training and retraining, teaching a special discipline on medicine in professional educational institutions; to solve the complex issue of organization and management of treatment-preventive activity in enterprises, non-governmental and non-profit organizations, central and local public administration bodies, small business and private business entities of the Republic of Uzbekistan, Ministry of health of the Republic of Uzbekistan, health departments of the regions, research centers, enterprises of various forms of ownership, it also covers a complex of tools, methods, and techniques of human activity, aimed at professional skills and the ability to operate in treatment and preventive institutions in the health system.",
  },
  {
    index: 9,
    specialtyCode: "70910201",
    specialtyName: "Obstetrics and gynecology",
    duration: "3 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Obstetrician-gynecologist, educator-researcher",
    totalCredits: "180",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "Master’s specialty in obstetrics and gynecology — teaching specialty science in higher and secondary specialized, vocational education system, professional development, retraining institutions; the Academy of Sciences of the Republic of Uzbekistan and network research institutes, Ministry of health of the Republic of Uzbekistan, regional health departments, research centers, public administration bodies, medical and preventive institutions in the health system.",
  },
  {
    index: 10,
    specialtyCode: "70410506",
    specialtyName: "State financial control and audit",
    duration: "2 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Auditor, reviser, educator-researcher",
    totalCredits: "120",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "“Business, management and law” is a specialty in the field of education, teaching specialty subjects in all educational institutions, conducting scientific research activity in the Academy of Sciences of the Republic of Uzbekistan and network scientific research institutes, centers, scientific production associations, solving complex issues related to the organization and conduct of state financial control and internal audit in enterprises of various forms of ownership, formation of internal audit recommendations to eliminate discrepancies in the implementation of budgets of the budgetary system and increase efficiency in the expenditure of state funds, conducting scientific research on state financial control and internal audit, establishing prospects, professional quality; it covers a complex of tools, methods, and techniques of human activity aimed at building capacity.",
  },
  {
    index: 11,
    specialtyCode: "70110401",
    specialtyName: "Theory and methodology of education and training (elementary education)",
    duration: "2 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Educator-researcher",
    totalCredits: "120",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "70110401 — the theory and methodology of education and training (primary) is used in higher educational institutions to study the subject of specialization, engage in research work, design the process in the relevant educational areas, its network departments and institutions, as well as monitoring the quality of education in such complex issues as the departments of state inspection, educational quality monitoring, it covers a complex of means, methods, and techniques of human activity, focused on professional capacity development.",
  },
  {
    index: 12,
    specialtyCode: "70110901",
    specialtyName: "Foreign language and literature",
    duration: "2 years",
    typeOfEducation: "Postgraduate (full-time education)",
    qualification: "Educator-researcher, teacher of English language and literature",
    totalCredits: "120",
    languages: "Uzbek / Russian / English",
    formOfEducation: "Full-time education",
    description:
      "70110901 — Master’s degree in foreign language and literature: ministries carrying out scientific research activities in higher education institutions, designing the process in its network departments and institutions, as well as ensuring security in the development of the industry, providing prospects, means, and methods of human activity aimed at professional skills and training in relevant educational areas, ensuring development of the field. It covers a complex set of issues such as the design and management of the process in all organizations, ministries, their network departments, and institutions whose foreign language and literature correspond to educational directions.",
  },
];

export function getMastersDegreeProgramByNo(no: number): MastersDegreeProgram | undefined {
  if (!Number.isFinite(no) || no < 1) return undefined;
  return MASTERS_DEGREE_PROGRAMS.find((p) => p.index === no);
}
