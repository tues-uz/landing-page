export const ACADEMIC_FREEDOM_POLICY_PDF_HREF = "/downloads/official-documents/academic-freedom-policy.pdf";
export const ACADEMIC_FREEDOM_POLICY_PDF_THUMB_SRC =
  "/images/official-documents/academic-freedom-policy-thumb.webp";

export const ACADEMIC_FREEDOM_POLICY_DEFAULTS = {
  academicFreedomPolicyPdfDownloadCta: "Download PDF",
  academicFreedomPolicySection1Title: "1. Academic Freedom",
  academicFreedomPolicySection1Body:
    "Termez University of Economics and Service understands academic freedom as one of the essential conditions for genuine university life. Academic freedom is the right and responsibility of members of the academic community to pursue knowledge, conduct inquiry, teach, learn, discuss, publish, and communicate ideas without improper political, commercial, ideological, or personal interference.\n\nTUES recognizes that the integrity of higher education depends on an academic culture in which intellectual disagreement is not suppressed but treated as an essential part of scholarly development. Academic freedom at TUES is inseparable from intellectual responsibility: it does not remove the obligation to act professionally, respect established academic procedures, protect the rights of others, or uphold the ethical standards of the institution.\n\nThe University affirms that academic work should be assessed according to academic criteria, professional standards, and ethical principles, and not according to external pressure unrelated to the scholarly merit of the work itself.",
  academicFreedomPolicySection2Title: "2. No to Discrimination",
  academicFreedomPolicySection2Body:
    "Termez University of Economics and Service rejects all forms of discrimination, exclusion, and unequal treatment that undermine the dignity of individuals or the fairness of the academic environment. TUES does not tolerate direct or indirect discrimination on grounds such as language, ethnicity, race, nationality, religion, social origin, disability, gender, age, family status, political views, or other legally and ethically protected characteristics.\n\nThe University considers a pluralistic and respectful environment to be indispensable to the full development of scientific inquiry, teaching, and social engagement. Any conduct that humiliates, excludes, marginalizes, intimidates, or disadvantages a student, staff member, applicant, visitor, or service provider on discriminatory grounds is contrary to the values of TUES.\n\nWhere concerns of discrimination arise, the University expects them to be addressed through established institutional procedures, with due regard to confidentiality, impartiality, and procedural fairness.",
  academicFreedomPolicySection3Title: "3. Policy Against Harassment and Discrimination",
  academicFreedomPolicySection3Body:
    "TUES is committed to maintaining an academic and working environment in which all persons are treated with dignity and in which harassment, intimidation, and discriminatory abuse are not tolerated. The University prohibits all forms of harassment and discriminatory behaviour, whether committed by students, academic staff, administrative staff, managers, consultants, visitors, contractors, or external partners.\n\nHarassment may take verbal, written, visual, digital, psychological, or physical forms. It may include degrading comments, repeated humiliation, hostile or offensive conduct, threatening language, exclusionary actions, or any persistent behaviour that creates a hostile, unsafe, or degrading environment for another person.\n\nThe University likewise prohibits retaliation. No person shall be subjected to intimidation, disadvantage, pressure, or reprisal for reporting a concern in good faith, requesting advice, assisting in an investigation, or participating in institutional processes related to harassment or discrimination.",
  academicFreedomPolicySection4Title: "4. No to Sexual Harassment",
  academicFreedomPolicySection4Body:
    "Termez University of Economics and Service unequivocally prohibits sexual harassment, sexual intimidation, sexual coercion, and other forms of gender-based misconduct. The University recognizes that such behaviour is deeply harmful to individuals and destructive to the academic and social environment of the institution.\n\nSexual harassment includes unwelcome verbal, non-verbal, written, digital, or physical conduct of a sexual nature that violates a person's dignity, creates an intimidating or humiliating environment, interferes with academic or professional participation, or places a person under inappropriate pressure. Such conduct is unacceptable regardless of where it takes place.\n\nTUES is committed to ensuring that any member of the University community who experiences or witnesses such conduct has access to appropriate reporting, advisory, and support mechanisms. The University will treat such matters seriously, handle them with due care and confidentiality, and ensure that those affected are not left without institutional support.",
  academicFreedomPolicySection5Title: "5. Academic Honesty and Ethics",
  academicFreedomPolicySection5Body:
    "Termez University of Economics and Service considers academic honesty to be one of the indispensable foundations of university life. TUES expects all students, academic staff, researchers, and administrative personnel engaged in academic processes to observe the highest standards of honesty in study, teaching, assessment, research design, authorship, publication, supervision, and data handling.\n\nThe University affirms that plagiarism, fabrication, falsification, unauthorized assistance, academic sabotage, misappropriation of intellectual labour, coercive authorship practices, manipulation of research data, or any other conduct contrary to the principles of honest academic work are unacceptable.\n\nTUES promotes academic integrity not only through sanctions and regulations, but also through awareness, guidance, mentoring, ethical review, and support for good academic practice.",
  academicFreedomPolicySection6Title: "6. Institutional Commitment",
  academicFreedomPolicySection6Body:
    "Termez University of Economics and Service declares its firm commitment to protecting academic freedom, promoting equality, preventing harassment and discrimination, prohibiting sexual misconduct, and safeguarding academic honesty across all areas of university activity.\n\nTUES undertakes to develop and maintain policies, procedures, structures, and practices that protect these principles in institutional life. It will continue to strengthen awareness, internal accountability, reporting mechanisms, leadership responsibility, and support systems so that members of the University community can study and work in an environment that is free, fair, professional, and respectful.\n\nThese principles are not merely declarative. They are expected to guide daily behaviour, academic practice, administrative decision-making, and institutional development.",
  academicFreedomPolicyApprovedHeading: "Approved",
  academicFreedomPolicyApprovedInstitution: "Termiz University of Economics and Service",
  academicFreedomPolicyApprovedByLabel: "Approved by",
  academicFreedomPolicyApprovedBy: "The Rector",
  academicFreedomPolicyEffectiveDateLabel: "Effective date",
  academicFreedomPolicyEffectiveDate: "10 January 2023",
} as const;

export const ACADEMIC_FREEDOM_POLICY_SECTIONS = [
  { titleKey: "academicFreedomPolicySection1Title", bodyKey: "academicFreedomPolicySection1Body" },
  { titleKey: "academicFreedomPolicySection2Title", bodyKey: "academicFreedomPolicySection2Body" },
  { titleKey: "academicFreedomPolicySection3Title", bodyKey: "academicFreedomPolicySection3Body" },
  { titleKey: "academicFreedomPolicySection4Title", bodyKey: "academicFreedomPolicySection4Body" },
  { titleKey: "academicFreedomPolicySection5Title", bodyKey: "academicFreedomPolicySection5Body" },
  { titleKey: "academicFreedomPolicySection6Title", bodyKey: "academicFreedomPolicySection6Body" },
] as const satisfies ReadonlyArray<{
  titleKey: keyof typeof ACADEMIC_FREEDOM_POLICY_DEFAULTS;
  bodyKey: keyof typeof ACADEMIC_FREEDOM_POLICY_DEFAULTS;
}>;
