import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Calendar, HeadphonesIcon, FileText, Bell } from "lucide-react";
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

const EduHubSection = () => {
  const [openItem, setOpenItem] = useState<string | null>("course-materials");

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="eduhub">
      <div className="container mx-auto px-6">
        {/* Header - centered like Services */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-2xl bg-[rgb(40,40,44)] px-4 py-2 mb-6">
            <span className="text-sm font-medium text-white">Platform</span>
          </div>
          <h3 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-4">
            EduHub
          </h3>
          <p className="text-[rgb(61,61,71)] text-base lg:text-lg leading-relaxed">
            Find out how EduHub supports your learning and connects you with the TUES community.
          </p>
        </div>

        {/* Image and accordion side by side */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8">
          <div className="relative rounded-[10px] overflow-hidden aspect-[4/5] max-h-[600px] bg-neutral-100 lg:flex-[1_1_50%] lg:max-w-[50%] shrink-0">
            <img
              src="/termez-university-event.png"
              alt="Campus or learning at TUES"
              className="absolute inset-0 w-full h-full object-cover block"
            />
          </div>
          <div className="w-full min-w-0 lg:flex-[1_1_50%]">
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
                    className="border-b border-[rgb(219,218,217)] last:border-b-0"
                  >
                    <AccordionTrigger className="flex items-center justify-between py-5 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-oxford-gold/20 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-oxford-gold" />
                        </div>
                        <h4 className="text-left font-semibold text-foreground">
                          {feature.title}
                        </h4>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[rgb(61,61,71)] text-base leading-relaxed pb-5 pt-0">
                      {feature.description}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <div className="mt-10">
              <Link
                to="/eduhub"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-oxford-blue bg-oxford-blue px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-oxford-blue/90 hover:border-oxford-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxford-blue focus-visible:ring-offset-2"
              >
                <span>Go to EduHub</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EduHubSection;
