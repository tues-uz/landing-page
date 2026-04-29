import type { BachelorFullTimeProgram } from "@/types/bachelorFullTime";
import { cn } from "@/lib/utils";

const cellBorder = "border border-[#000066]/45 px-2 py-2 align-middle";
const headerCell = cn(cellBorder, "bg-muted/60 text-center text-xs font-semibold uppercase tracking-wide text-foreground sm:text-sm");

const LABELS = {
  duration: "Duration of the educational program:",
  type: "Type of education:",
  qualification: "Qualification:",
  credits: "Total loan amount:",
  languages: "Language of instruction:",
  form: "Form of education:",
} as const;

export function BachelorFullTimeProgramTable({
  program,
  variant = "default",
}: {
  program: BachelorFullTimeProgram;
  /** `embedded`: used inside expandable cards (no extra bottom margin). */
  variant?: "default" | "embedded";
}) {
  const qualDisplay = program.qualification.trim() ? program.qualification : "—";

  return (
    <div className={cn("w-full overflow-x-auto", variant === "default" && "mb-10")}>
      <table className="w-full min-w-[720px] border-collapse text-sm text-foreground">
        <thead>
          <tr>
            <th className={cn(headerCell, "w-10")}>№</th>
            <th className={cn(headerCell, "min-w-[7rem]")}>Specialist cipher</th>
            <th className={cn(headerCell, "min-w-[11rem]")}>Specialty name</th>
            <th className={cn(headerCell)} colSpan={3}>
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cn(cellBorder, "text-center font-medium")} rowSpan={6}>
              {program.no}
            </td>
            <td className={cn(cellBorder, "text-center font-mono text-xs sm:text-sm")} rowSpan={6}>
              {program.cipher}
            </td>
            <td className={cn(cellBorder, "text-left text-sm leading-snug")} rowSpan={6}>
              {program.specialtyName}
            </td>
            <td className={cn(cellBorder, "bg-muted/25 text-center text-xs sm:text-sm")}>{LABELS.duration}</td>
            <td className={cn(cellBorder, "text-center text-xs sm:text-sm")}>{program.duration}</td>
            <td className={cn(cellBorder, "align-top text-left text-xs leading-relaxed text-justify sm:text-sm")} rowSpan={6}>
              {program.descriptionParagraphs.some((p) => p.trim()) ? (
                <div className="space-y-3">
                  {program.descriptionParagraphs.map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">—</p>
              )}
            </td>
          </tr>
          <tr>
            <td className={cn(cellBorder, "bg-muted/25 text-center text-xs sm:text-sm")}>{LABELS.type}</td>
            <td className={cn(cellBorder, "text-center text-xs sm:text-sm")}>{program.typeOfEducation}</td>
          </tr>
          <tr>
            <td className={cn(cellBorder, "bg-muted/25 text-center text-xs sm:text-sm")}>{LABELS.qualification}</td>
            <td className={cn(cellBorder, "text-center text-xs sm:text-sm")}>{qualDisplay}</td>
          </tr>
          <tr>
            <td className={cn(cellBorder, "bg-muted/25 text-center text-xs sm:text-sm")}>{LABELS.credits}</td>
            <td className={cn(cellBorder, "text-center font-medium tabular-nums")}>{program.totalCredits}</td>
          </tr>
          <tr>
            <td className={cn(cellBorder, "bg-muted/25 text-center text-xs sm:text-sm")}>{LABELS.languages}</td>
            <td className={cn(cellBorder, "text-center text-xs sm:text-sm")}>{program.instructionLanguages}</td>
          </tr>
          <tr>
            <td className={cn(cellBorder, "bg-muted/25 text-center text-xs sm:text-sm")}>{LABELS.form}</td>
            <td className={cn(cellBorder, "text-center text-xs sm:text-sm")}>{program.formOfEducation}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
