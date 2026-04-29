import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import {
  UNIVERSITY_MISSION_GREEN_STRATEGY_PDF_HREF,
  UNIVERSITY_MISSION_STRATEGY_PDF_HREF,
} from "@/locales/universityMissionDefaults";
import { cn } from "@/lib/utils";

function OutLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
    </a>
  );
}

function PdfLine({
  label,
  href,
  placeholder,
}: {
  label: string;
  href: string | null;
  placeholder: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        className="font-medium text-primary underline-offset-4 hover:underline"
        download
      >
        {label}
      </a>
    );
  }
  return <span className="text-muted-foreground">{placeholder}</span>;
}

type UniversityMissionContentProps = {
  pdfNote: string;
};

export function UniversityMissionContent({ pdfNote }: UniversityMissionContentProps) {
  return (
    <div
      className={cn(
        "mt-6 max-w-none space-y-10 text-[15px] leading-relaxed text-muted-foreground md:text-base",
      )}
    >
      <section className="space-y-4" aria-labelledby="um-mission">
        <h2 id="um-mission" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          I. Mission and vision
        </h2>
        <p>
          Termez University of Economics and Services (TUES) is committed to providing exceptional higher education
          to both Uzbekistan and international students. We offer a diverse range of degree programs in economics,
          medicine, informatics, and other fields at the Bachelor&apos;s and Master&apos;s levels, equipping our
          graduates with outstanding opportunities in the global job market.
        </p>
        <p>
          Our core values at TUES include a dedication to embracing new ideas and approaches, fostering collegial
          partnerships within the academic community, and upholding the principles of free expression of opinions
          and ideas.
        </p>
        <p>Termez University of Economics and Services (TUES) is guided by the following values:</p>
        <ol className="list-decimal space-y-2 pl-6 marker:font-medium marker:text-foreground">
          <li>Commitment to excellence</li>
          <li>Internationalization</li>
          <li>Traditional values</li>
          <li>Societal responsibility</li>
        </ol>
        <p>
          Through these values, TUES is dedicated to empowering individuals and shaping the future of Uzbekistan and
          the global community.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="um-strategic">
        <h2 id="um-strategic" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          II. Strategic development plan
        </h2>
        <h3 className="text-lg font-semibold text-foreground">Strategic objectives</h3>
        <p>The university focuses on the following strategic objectives:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>Enhancing the quality of education in line with international standards</li>
          <li>Strengthening research and innovation capacity</li>
          <li>Expanding international cooperation and academic mobility</li>
          <li>Accelerating digital transformation in education and management</li>
          <li>Promoting sustainable development principles</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground">Strategic goals</h3>
        <p>Key strategic goals include:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>Increasing the number of international partnerships and joint programs</li>
          <li>Improving the university&apos;s position in international rankings</li>
          <li>Increasing the number of scientific publications and research projects</li>
          <li>Enhancing graduate employability</li>
          <li>Expanding digital learning platforms and infrastructure</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground">Implementation plan</h3>
        <p>
          The implementation of the strategic plan is carried out through annual action plans, clearly defined
          responsibilities, and measurable performance indicators (KPIs). Progress is monitored regularly, and
          adjustments are made based on performance evaluations and institutional needs.
        </p>
        <div className="rounded-lg border border-border bg-muted/40 p-4 md:p-5">
          <p className="font-semibold text-foreground">Supporting documents (rivojlanish strategiyasi)</p>
          <p className="mt-2 text-sm">{pdfNote}</p>
          <ul className="mt-3 list-none space-y-2 p-0">
            <li>
              <PdfLine
                label="Download development strategy (PDF)"
                href={UNIVERSITY_MISSION_STRATEGY_PDF_HREF}
                placeholder="Strategic development strategy (PDF) — file link to be added"
              />
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="um-risk">
        <h2 id="um-risk" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          III. Risk management system
        </h2>
        <p>
          The university has established a comprehensive risk management system to identify, assess, and mitigate
          potential risks that may affect its strategic objectives and operational performance. This system ensures
          institutional stability, accountability, and long-term sustainability.
        </p>
        <h3 className="text-lg font-semibold text-foreground">Risk identification and categories</h3>
        <p>The university identifies and monitors key categories of risks, including:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>Academic risks (quality of education, curriculum relevance)</li>
          <li>Financial risks (budget constraints, funding sustainability)</li>
          <li>Operational risks (administrative processes)</li>
        </ul>
        <p>
          Each identified risk is evaluated based on its likelihood and potential impact. Risks are prioritized to
          ensure that critical areas receive immediate attention and appropriate resource allocation.
        </p>
        <h3 className="text-lg font-semibold text-foreground">Risk mitigation measures</h3>
        <p>To minimize risks, the university implements the following measures:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>Continuous monitoring of academic quality and performance indicators</li>
          <li>Diversification of financial resources and funding sources</li>
          <li>Strengthening internal control and audit systems</li>
          <li>Regular staff training and capacity building</li>
          <li>Modernization of IT infrastructure and data protection systems</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground">Governance and reporting structure</h3>
        <p>
          Risk management is overseen by the university&apos;s leadership and relevant administrative units. A
          designated committee or responsible department monitors risk-related issues and reports regularly to the
          university management.
        </p>
        <p>
          Regular reports are prepared to ensure transparency, accountability, and timely decision-making in response
          to emerging risks.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="um-green">
        <h2 id="um-green" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          IV. Green development and sustainability
        </h2>
        <p>
          The university is committed to promoting environmental sustainability and integrating green development
          principles into its strategic priorities. Sustainability is embedded in education, campus operations, and
          community engagement.
        </p>
        <h3 className="text-lg font-semibold text-foreground">Green campus initiatives</h3>
        <p>
          The university implements green campus initiatives aimed at reducing environmental impact and promoting
          efficient resource use, including:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>Energy-saving technologies and efficient lighting systems</li>
          <li>Rational use of water resources</li>
          <li>Waste reduction and recycling practices</li>
          <li>Development of green spaces and landscaping</li>
        </ul>
        <h3 className="text-lg font-semibold text-foreground">Sustainable education and research</h3>
        <p>
          Sustainability principles are integrated into academic programs and research activities. Students are
          encouraged to develop environmentally responsible solutions through coursework, projects, and scientific
          research.
        </p>
        <h3 className="text-lg font-semibold text-foreground">Environmental awareness and community engagement</h3>
        <p>
          The university actively promotes environmental awareness through campaigns, seminars, and student initiatives.
          Collaboration with local and international partners supports the development of sustainable practices and
          environmental responsibility.
        </p>
        <h3 className="text-lg font-semibold text-foreground">Future sustainability goals</h3>
        <p>The university aims to further strengthen its sustainability efforts by:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-primary/80">
          <li>Expanding green infrastructure and energy efficiency measures</li>
          <li>Increasing environmental education programs</li>
          <li>Supporting sustainable research and innovation projects</li>
          <li>Enhancing partnerships focused on sustainability and climate action</li>
        </ul>
        <div className="rounded-lg border border-border bg-muted/40 p-4 md:p-5">
          <p className="font-semibold text-foreground">Supporting documents (yashil strategiya)</p>
          <p className="mt-2 text-sm">{pdfNote}</p>
          <ul className="mt-3 list-none space-y-2 p-0">
            <li>
              <PdfLine
                label="Download green strategy (PDF)"
                href={UNIVERSITY_MISSION_GREEN_STRATEGY_PDF_HREF}
                placeholder="Green development strategy (PDF) — file link to be added"
              />
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-8" aria-labelledby="um-policies">
        <h2 id="um-policies" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          V. Institutional policies
        </h2>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">5.1 Academic freedom policy</h3>
          <p>
            The university is committed to upholding the principles of academic freedom, which are essential for the
            advancement of knowledge, critical thinking, and innovation.
          </p>
          <p>
            Academic staff and students are granted the freedom to teach, learn, conduct research, and express ideas
            without undue interference or restriction, within the framework of ethical standards and applicable laws.
          </p>
          <p>
            The university ensures that academic freedom is exercised responsibly, respecting diversity of opinions,
            academic integrity, and mutual respect among all members of the academic community.
          </p>
          <p>
            Institutional policies and governance structures support and protect academic independence, ensuring that
            teaching and research activities are free from external pressure or influence.
          </p>
          <p>
            <span className="font-medium text-foreground">Learn more — </span>
            <OutLink href="https://tues.uz/leader/view/35">Educational methodological department</OutLink>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">5.2 Anti-bribery and corruption policy</h3>
          <p>
            The university is committed to maintaining the highest standards of integrity, transparency, and
            accountability in all academic, administrative, and financial activities.
          </p>
          <p>
            The institution adopts a zero-tolerance approach to bribery and corruption. All forms of unethical
            conduct, including offering, giving, receiving, or soliciting bribes, are strictly prohibited.
          </p>
          <p>
            Clear procedures are established to prevent, detect, and address corruption risks. These include internal
            controls, financial oversight, and compliance mechanisms aligned with national regulations and
            international best practices.
          </p>
          <p>
            All staff, students, and stakeholders are expected to act with honesty and integrity. Any suspected cases of
            bribery or corruption can be reported through designated channels, and appropriate disciplinary actions will
            be taken in accordance with institutional policies.
          </p>
          <p>
            The implementation of anti-corruption measures is supervised by the Compliance Control Department, which
            ensures transparency, accountability, and adherence to ethical standards across the university.
          </p>
          <p>
            <span className="font-medium text-foreground">Learn more — </span>
            <OutLink href="https://tues.uz/leader/view/66">Compliance control department</OutLink>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">5.3 Sustainable investing policy</h3>
          <p>
            The university is committed to responsible and sustainable investment practices that support long-term
            environmental, social, and economic value.
          </p>
          <p>
            Investment decisions are guided by principles of sustainability, ethical responsibility, and risk
            awareness. The university prioritizes investments that contribute to environmental protection, social
            well-being, and good governance (ESG standards).
          </p>
          <p>
            The institution avoids investments in activities that may harm the environment, violate human rights, or
            contradict ethical standards. Preference is given to projects and partners that promote innovation,
            sustainability, and positive societal impact.
          </p>
          <p>
            Investment activities are monitored to ensure transparency, accountability, and alignment with the
            university&apos;s strategic goals and sustainability commitments.
          </p>
          <p>
            The university continuously reviews its investment portfolio to improve sustainability performance and
            integrate best international practices.
          </p>
          <p>
            <span className="font-medium text-foreground">Learn more — </span>
            <OutLink href="https://tues.uz/leader/view/67">Department of accounting and audit</OutLink>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">5.4 Sustainable procurement policy</h3>
          <p>
            The university is committed to sustainable procurement practices that minimize environmental impact and
            promote social responsibility.
          </p>
          <p>
            Procurement processes prioritize environmentally friendly, energy-efficient, and resource-saving products
            and services. The university encourages the use of recycled materials, eco-labeled products, and sustainable
            technologies.
          </p>
          <p>
            Suppliers and partners are expected to comply with ethical, environmental, and social standards. Preference
            is given to vendors who demonstrate responsible business practices and sustainability commitments.
          </p>
          <p>
            The university integrates sustainability criteria into procurement decisions to support long-term
            environmental protection, cost efficiency, and institutional responsibility.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">5.5 Modern slavery policy</h3>
          <p>
            The university is committed to preventing all forms of modern slavery, including forced labor, human
            trafficking, and exploitation, within its operations and supply chains.
          </p>
          <p>
            The institution upholds human rights and ensures that all employees, partners, and suppliers operate in
            accordance with ethical and legal standards. Any form of coercion, forced work, or exploitation is strictly
            prohibited.
          </p>
          <p>
            The university promotes transparency and due diligence in its procurement and partnership processes to
            minimize the risk of modern slavery practices.
          </p>
          <p>
            All staff and stakeholders are encouraged to report any concerns related to modern slavery through
            appropriate channels. The university takes all reports seriously and ensures appropriate actions are taken in
            line with institutional policies and legal requirements.
          </p>
          <p>
            If any concerns or suspected violations arise, individuals are encouraged to report them through official
            channels.
          </p>
          <p>
            Reports can be submitted confidentially to the Compliance Control Department, which is responsible for
            ensuring transparency, accountability, and adherence to ethical standards within the university.
          </p>
          <p>
            <span className="font-medium text-foreground">Report concerns — </span>
            <OutLink href="https://tues.uz/leader/view/66">Compliance control department</OutLink>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">5.6 Student safety policy</h3>
          <p>
            The university is committed to ensuring a safe, secure, and supportive environment for all students across
            academic, residential, and campus activities.
          </p>
          <p>
            Measures are implemented to protect students from physical, psychological, and social risks. These include
            campus security systems, health and safety regulations, emergency response procedures, and student support
            services.
          </p>
          <p>
            The university promotes a culture of respect, responsibility, and well-being, ensuring that all students
            are treated fairly and protected from harassment, discrimination, and unsafe conditions.
          </p>
          <p>
            Regular monitoring and preventive measures are carried out to maintain a secure learning environment and to
            respond effectively to any incidents.
          </p>
          <p>
            Students are encouraged to report any safety concerns through designated channels. Reports can be submitted
            to the relevant university units responsible for student affairs and safety, including the Compliance
            Control Department and Student Support Services.
          </p>
          <p>All reports are handled confidentially and addressed promptly in accordance with institutional procedures.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">5.7 Diversity and inclusion policy</h3>
          <p>
            The university is committed to fostering a diverse, equitable, and inclusive environment for all students,
            faculty, staff, and stakeholders, regardless of race, ethnicity, nationality, gender, age, religion,
            disability, sexual orientation, or socioeconomic background.
          </p>
          <p>
            The institution recognizes that diversity enriches the academic experience, enhances innovation, and
            strengthens community engagement. Inclusion is embedded in university policies, recruitment and admission
            processes, curriculum development, campus life, and decision-making structures.
          </p>
          <p>
            The university promotes equal opportunities and takes proactive measures to eliminate discrimination,
            harassment, and bias. Reasonable accommodations are provided to support individuals with disabilities and
            other specific needs.
          </p>
          <p>
            Training and awareness programs on diversity, equity, and inclusion are regularly organized for staff and
            students. The university also encourages the establishment of inclusive student groups and forums to promote
            cross-cultural understanding and mutual respect.
          </p>
          <p>
            Monitoring mechanisms are in place to assess progress on diversity goals and to address any concerns related
            to inequality or exclusion. Reports on diversity and inclusion efforts are reviewed periodically by the
            university leadership.
          </p>
          <p>
            All members of the university community are encouraged to report any form of discrimination or exclusion
            through official channels.
          </p>
        </div>
      </section>
    </div>
  );
}
