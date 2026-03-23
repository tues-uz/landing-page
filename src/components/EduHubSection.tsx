import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Calendar, HeadphonesIcon, FileText, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    id: "course-materials",
    icon: BookOpen,
    title: "Course materials",
    description:
      "Access all your course materials, lecture notes, and resources in one place. EduHub keeps everything organised and easy to find, so you can focus on learning.",
  },
  {
    id: "community",
    icon: Users,
    title: "Community & connect",
    description:
      "Connect with peers, instructors, and staff through forums and messaging. Get answers, join study groups, and be part of the TUES community.",
  },
  {
    id: "events",
    icon: Calendar,
    title: "Events & opportunities",
    description:
      "Stay updated on campus events, workshops, and opportunities. Never miss a deadline or an event that matters for your studies and career.",
  },
  {
    id: "support",
    icon: HeadphonesIcon,
    title: "Support",
    description:
      "Get help when you need it. EduHub connects you with academic and technical support so you can resolve issues quickly and keep moving forward.",
  },
  {
    id: "assignments",
    icon: FileText,
    title: "Assignments & submissions",
    description:
      "Submit assignments, track deadlines, and receive feedback through EduHub. All your coursework is in one place with clear status and instructor comments.",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications & announcements",
    description:
      "Get timely alerts and announcements from your faculty and the university. EduHub keeps you informed about schedule changes, new content, and important updates.",
  },
];

const DARK_TEAL = "rgb(15, 61, 58)";
const BODY_COLOR = "rgb(37, 37, 37)";

const EduHubSection = () => {
  const { t } = useTranslation("home");
  const [openItem, setOpenItem] = useState<string | null>("course-materials");

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="eduhub">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        {/* Title Section — left-aligned (Framer style) */}
        <div className="mb-12 md:mb-16">
          <div
            className="inline-block rounded-[5px] px-3 py-1.5 mb-4"
            style={{ backgroundColor: "rgb(235, 235, 235)" }}
          >
            <span className="text-sm font-medium" style={{ color: BODY_COLOR }}>
              {t("eduhub.badge")}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8 mb-4">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground tracking-tight">
              EduHub
              <span className="block font-normal leading-relaxed mt-1 text-xl" style={{ color: BODY_COLOR }}>
                {t("eduhub.titleSubtitle")}
              </span>
            </h2>
            <p className="leading-relaxed max-w-2xl lg:text-right" style={{ color: BODY_COLOR, fontSize: '16px' }}>
              {t("eduhub.description")}
            </p>
          </div>
        </div>

        {/* Content — two columns: left = quote + user + CTA (Framer From Founder style), right = accordion */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: Image with absolutely positioned card (quote + user + CTA) — height matches right column */}
          <div className="lg:col-span-5 relative min-h-0">
            {/* Large image — fills column so same height as accordion */}
            <div className="relative h-full min-h-[440px] rounded-[5px] overflow-hidden bg-neutral-100">
              <img
                src="/termez-university-event.png"
                alt="Campus or learning at TUES"
                className="absolute inset-0 w-full h-full object-cover object-top block"
              />
            </div>
            {/* Card: quote + user + button — absolute */}
            <div
              className="absolute left-0 right-0 bottom-0 rounded-[10px] border border-black/10 bg-white/95 backdrop-blur-sm shadow-lg p-5 md:p-6 flex flex-col gap-4"
              style={{ margin: "12px" }}
            >
              <p
                className="leading-relaxed font-medium"
                style={{ color: DARK_TEAL, fontSize: '16px' }}
              >
                {t("eduhub.quote")}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-neutral-200">
                  <img
                    src="/termez-university-event.png"
                    alt=""
                    className="w-full h-full object-cover object-center block"
                  />
                </div>
                <div>
                  <p className="font-medium" style={{ color: DARK_TEAL }}>
                    EduHub
                  </p>
                  <p className="text-sm" style={{ color: DARK_TEAL, opacity: 0.9 }}>
                    {t("eduhub.learningPlatform")}
                  </p>
                </div>
              </div>
              <Link
                to="/eduhub"
                className="flex items-center justify-between gap-3 w-full rounded-[5px] px-6 py-4 text-white font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: DARK_TEAL }}
              >
                <span>{t("eduhub.goTo")}</span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right: Accordion in Framer-style card */}
          <div className="lg:col-span-7">
            <div
              className="rounded-[10px] border overflow-hidden"
              style={{
                backgroundColor: "white",
                borderColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <Accordion
                type="single"
                collapsible
                value={openItem ?? undefined}
                onValueChange={(v) => setOpenItem(v || null)}
                className="w-full"
              >
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <AccordionItem
                      key={feature.id}
                      value={feature.id}
                      className="border-0 border-b last:border-b-0"
                      style={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                    >
                      <AccordionTrigger className="flex items-center justify-between py-6 px-6 md:px-8 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${DARK_TEAL}20` }}
                          >
                            <Icon className="h-5 w-5" style={{ color: DARK_TEAL }} />
                          </div>
                          <h5 className="text-left font-semibold text-foreground">
                            {t(`eduhub.features.${feature.id}.title`)}
                          </h5>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 md:px-8 pb-6 pt-0">
                        <p
                          className="text-base leading-relaxed"
                          style={{ color: BODY_COLOR }}
                        >
                          {t(`eduhub.features.${feature.id}.description`)}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EduHubSection;
