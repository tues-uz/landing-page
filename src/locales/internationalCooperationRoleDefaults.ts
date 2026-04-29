/** English fallbacks for international cooperation role detail pages. */

const viceRectorResponsibilities = `· Organizing the university's international cooperation activities and ensuring the training of qualified personnel in accordance with international educational standards.
· Establishing academic, scientific, and practical collaboration with foreign higher education institutions; preparing proposals for joint faculties and departments.
· Studying development trends in foreign educational systems and assisting in the implementation of advanced methods and technologies.
· Organizing the effective use of distance learning, innovative pedagogical approaches, and ICT (Information and Communications Technology).
· Facilitating faculty development and student exchange programs at foreign universities, and preparing talented youth for foreign grants and scholarships.
· Managing and supervising activities of visiting educators from foreign higher education institutions.
· Organizing conferences and seminars with partner foreign educational institutions.
· Overseeing the ongoing enrichment of the library collection with foreign educational-methodological and scientific literature.
· Conducting internal institutional licensing and preparing for external accreditation under agreements of international cooperation.
· Analyzing the annual activities of faculties, departments, and divisions in the area of international cooperation, drawing conclusions, and implementing measures for improvement.
· Possessing comprehensive knowledge of Uzbek legislation and internal regulatory documents concerning international cooperation, and ensuring their implementation.`;

/** Paragraphs separated by blank lines (rendered as distinct blocks). */
const headDepartmentResponsibilities = `Ensuring the implementation of the laws of the Republic of Uzbekistan, decrees and resolutions of the President, decisions of the Oliy Majlis, the Cabinet of Ministers, and the Ministry of Higher Education, Science and Innovation in the field of education and personnel training.

Conscientious and responsible performance of official duties; compliance with labor discipline, occupational safety regulations, technical safety standards, industrial sanitation rules, the University Charter, Internal Regulations, Code of Ethics, decisions of the Academic Council, employer orders, and other regulatory legal acts within the education system.

Planning, organizing, and coordinating the university's international cooperation activities and ensuring their effectiveness.

Establishing and developing partnerships with foreign higher education institutions, research centers, international organizations, foundations, and diplomatic missions.

Preparing proposals for joint educational programs, dual-degree programs, joint departments, research centers, and projects, and ensuring their implementation.

Organizing and coordinating the attraction of foreign investments, grants, and technical assistance funds.

Developing proposals to improve educational content in accordance with international standards and ensuring their implementation.

Studying advanced international educational and research practices and introducing them into the academic and research processes.

Participating in the organization of international scientific conferences, symposia, and seminars and ensuring the university's international scientific engagement.

Organizing the preparation, implementation, and monitoring of projects funded by international financial institutions and donor organizations.

Reviewing, coordinating, and submitting projects prepared within the framework of European Union and other international programs.

Systematically collecting and disseminating information on international grants and providing methodological support to faculties and departments in project preparation.

Organizing overseas study, internships, and professional development opportunities for faculty, staff, and students.

Coordinating the admission and education of foreign students and accounting for related financial inflows.

Preparing and submitting reports related to foreign citizens in accordance with established procedures.

Reviewing and coordinating documentation for university representatives traveling abroad.

Developing programs for visits of foreign delegations and organizing meetings and negotiations.

Conducting legal and substantive analysis of contracts, memoranda, and agreements with foreign partners.

Ensuring coordination of international cooperation documents with relevant ministries and authorities.

Analyzing and improving educational programs, curricula, course syllabi, and assessment systems in accordance with international accreditation requirements.

Establishing official cooperation with accreditation bodies (ministries, agencies, national and international accreditation organizations).

Organizing the preparation of reports, analytical materials, and supporting evidence required for accreditation.

Conducting internal monitoring of compliance with accreditation requirements across university departments and faculties.

Submitting analytical information and recommendations to university leadership regarding accreditation results.

Organizing seminars and training sessions for staff involved in accreditation processes.

Establishing and continuously updating the accreditation documentation database.

Studying and implementing international best practices in accreditation.

Ensuring the university's participation in international rankings and preparing relevant data for submission.

Implementing measures to strengthen the university's international image and reputation.

Preparing monthly, quarterly, semi-annual, and annual reports on international cooperation activities.

Maintaining and updating information on international activities on the university's website and information resources.

Planning, supervising, and improving the activities of the International Relations Department.

Defining the duties of department staff and assuming responsibility for their performance.

Formulating specific proposals to enhance institutional efficiency and address emerging challenges in university operations and development.`;

const leadSpecialistResponsibilities = `· Establishing and developing sustainable and effective cooperation with foreign higher education institutions, research centers, and organizations.
· Developing and implementing strategies to enhance the university's reputation on the international stage.
· Organizing and implementing joint scientific research, grants, academic projects, and educational programs involving faculty and students.
· Inviting professors from foreign universities to deliver lectures, conduct seminars, and training sessions at the university.
· Organizing international-level courses and masterclasses with the participation of foreign experts.
· Developing and implementing student exchange programs, short-term courses, and joint degree programs.
· Attracting international students to the university and assisting them with visa, accommodation, and adaptation issues.
· Coordinating activities to ensure compliance of faculties, academic programs, and laboratories with international accreditation standards.
· Collecting and analyzing the necessary data and implementing best practices to improve the university's position in international rankings.
· Organizing international conferences, seminars, webinars, and symposiums in collaboration with foreign partners.
· Regularly providing information about international grants, scholarships, and study opportunities.
· Organizing and overseeing professional development courses abroad for faculty members and department staff.`;

export const INTERNATIONAL_COOPERATION_ROLE_DEFAULTS = {
  intlRelRoleViceRectorPersonName: "Shavkat Nusratillayevich Otamurodov",
  intlRelRoleViceRectorRoleLabel: "Vice-rector for international cooperation",
  intlRelRoleViceRectorHeroAlt:
    "Portrait of Shavkat Nusratillayevich Otamurodov, Vice-rector for international cooperation",
  intlRelRoleViceRectorResponsibilitiesHeading: "Areas of responsibility",
  intlRelRoleViceRectorResponsibilities: viceRectorResponsibilities,

  intlRelRoleHeadPersonName: "Mokhirukh Muzaffarovna Khoshimkhojaeva",
  intlRelRoleHeadRoleLabel: "Head of the Department of international cooperation of the University",
  intlRelRoleHeadHeroAlt:
    "Portrait of Mokhirukh Muzaffarovna Khoshimkhojaeva, Head of the Department of International Cooperation",
  intlRelRoleHeadResponsibilitiesHeading: "Job responsibilities:",
  intlRelRoleHeadResponsibilities: headDepartmentResponsibilities,

  intlRelRoleLeadPersonName: "Asqarov Abror Sobirovich",
  intlRelRoleLeadRoleLabel: "Lead specialist of the university's international cooperation department",
  intlRelRoleLeadHeroAlt:
    "Portrait of Asqarov Abror Sobirovich, Lead specialist of the university's international cooperation department",
  intlRelRoleLeadResponsibilitiesHeading: "Areas of responsibility",
  intlRelRoleLeadResponsibilities: leadSpecialistResponsibilities,
} as const;

export const INTERNATIONAL_COOPERATION_ROLE_SLUGS = [
  "vice-rector-international-cooperation",
  "head-department-international-cooperation",
  "lead-specialist-international-cooperation",
] as const;

export type InternationalCooperationRoleSlug = (typeof INTERNATIONAL_COOPERATION_ROLE_SLUGS)[number];

export function isInternationalCooperationRoleSlug(s: string): s is InternationalCooperationRoleSlug {
  return (INTERNATIONAL_COOPERATION_ROLE_SLUGS as readonly string[]).includes(s);
}

export function internationalCooperationRolePath(slug: InternationalCooperationRoleSlug): string {
  return `/internationalization/department-international-relations-employees/${slug}`;
}
