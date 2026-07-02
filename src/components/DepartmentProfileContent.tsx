import { Clock3, Mail, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import type { DepartmentProfile, DepartmentSection, DepartmentStaffMember } from "@/data/departmentProfiles";
import { NEUTRAL_BORDER } from "@/lib/uiBorders";
import { cn } from "@/lib/utils";

type DepartmentProfileContentProps = {
  profile: DepartmentProfile;
};

export function DepartmentProfileContent({ profile }: DepartmentProfileContentProps) {
  return (
    <>
      <section className="overflow-hidden rounded-2xl bg-card">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,34%)_1fr]">
          <figure className="relative min-h-[220px] w-full overflow-hidden rounded-t-2xl bg-muted md:min-h-[280px] md:rounded-l-2xl md:rounded-tr-none">
            <img
              src={profile.imageSrc}
              alt={profile.name}
              className="absolute inset-0 h-full w-full rounded-[inherit] object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </figure>

          <div className="p-4 sm:p-5 md:p-6">
            <div className="max-w-[42ch] space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {profile.roleShort}
              </p>
              <h1 className="text-balance text-[1.75rem] font-semibold tracking-tight text-foreground">
                {profile.name}
              </h1>
              {profile.credentials ? (
                <p className="text-sm leading-relaxed text-foreground/90">{profile.credentials}</p>
              ) : null}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <ContactCard
                icon={<Phone className="h-3.5 w-3.5" />}
                label="Phone number"
                value={profile.phone}
                href={`tel:${profile.phone}`}
              />
              <ContactCard
                icon={<Mail className="h-3.5 w-3.5" />}
                label="E-mail"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <ContactCard
                icon={<MessageCircle className="h-3.5 w-3.5" />}
                label="Telegram"
                value={profile.telegram}
                href={`tel:${profile.telegram}`}
              />
              <ContactCard
                icon={<Clock3 className="h-3.5 w-3.5" />}
                label="Reception time"
                value={profile.reception}
              />
            </div>
          </div>
        </div>
      </section>

      {profile.sections.map((section) => (
        <DepartmentSectionBlock key={section.title} section={section} />
      ))}

      {profile.staffMembers.length > 0 ? (
        <section className="mt-6 rounded-2xl bg-card p-4 sm:p-5 md:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            Department professors and teachers
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profile.staffMembers.map((member) => (
              <StaffMemberCard key={member.name} member={member} />
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

function StaffMemberCard({ member }: { member: DepartmentStaffMember }) {
  const phoneHref = member.phone?.replace(/\s/g, "");

  return (
    <li>
      <article
        className={cn(
          "flex h-full gap-4 rounded-xl border bg-background p-4",
          NEUTRAL_BORDER,
          "transition-shadow hover:shadow-sm",
        )}
      >
        <div className="relative h-[128px] w-[96px] shrink-0 overflow-hidden rounded-lg bg-muted sm:h-[132px] sm:w-[100px]">
          <img
            src={member.imageSrc}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="font-semibold leading-snug tracking-tight text-foreground">{member.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">{member.role}</p>
          {phoneHref ? (
            <a
              href={`tel:${phoneHref}`}
              className="mt-2.5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {member.phone}
            </a>
          ) : null}
        </div>
      </article>
    </li>
  );
}

function DepartmentSectionBlock({ section }: { section: DepartmentSection }) {
  return (
    <section className="mt-6 rounded-2xl bg-card p-4 sm:p-5 md:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">{section.title}</h2>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-relaxed text-foreground/90">
          {paragraph}
        </p>
      ))}

      {section.listItems ? (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90 marker:text-primary">
          {section.listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {section.orderedListItems ? (
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90 marker:text-primary">
          {section.orderedListItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : null}

      {section.subsections?.map((subsection) => (
        <div key={subsection.title} className="mt-4">
          <h3 className="text-base font-semibold tracking-tight text-foreground">{subsection.title}</h3>
          {subsection.groups?.map((group) => (
            <div key={group.title} className="mt-3">
              <p className="text-sm font-medium text-foreground">{group.title}</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90 marker:text-primary">
                {group.listItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {subsection.listItems ? (
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90 marker:text-primary">
              {subsection.listItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {subsection.orderedListItems ? (
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90 marker:text-primary">
              {subsection.orderedListItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          ) : null}
        </div>
      ))}

      {section.trailingParagraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-relaxed text-foreground/90">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="rounded-lg bg-background/60 px-3 py-2.5">
      <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {icon}
        {label}
      </p>
      {href ? (
        <a href={href} className="mt-1 block text-sm font-medium text-foreground hover:text-primary">
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      )}
    </div>
  );
}
