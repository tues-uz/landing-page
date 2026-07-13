import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { flattenStudyPrograms } from "@/data/studyProgramsCurriculum";
import { useStudyProgramsQuery } from "@/features/cms/hooks/useStudyProgramsQueries";
import {
  STUDY_PROGRAM_APPLY_CITIZENSHIP_OPTIONS,
  STUDY_PROGRAM_APPLY_PAGE_DEFAULTS,
  STUDY_PROGRAM_APPLY_STUDY_TYPES,
} from "@/locales/studyProgramApplyDefaults";

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCaptchaCode(length = 4): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    if (i > 0) code += " ";
    code += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }
  return code;
}

function normalizeCaptchaInput(value: string): string {
  return value.replace(/\s+/g, " ").trim().toUpperCase();
}

const schema = z.object({
  fullName: z.string().min(1),
  citizenship: z.string().min(1),
  phone: z.string().min(1),
  passport: z.string().min(1),
  jshshir: z.string().min(1),
  studyType: z.string().min(1),
  courseId: z.string().min(1),
  verifyCode: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

function trApply(
  t: ReturnType<typeof useTranslation>["t"],
  key: keyof typeof STUDY_PROGRAM_APPLY_PAGE_DEFAULTS,
) {
  return t(key, { defaultValue: STUDY_PROGRAM_APPLY_PAGE_DEFAULTS[key] });
}

export function StudyProgramApplicationForm({ initialProgramId }: { initialProgramId?: string }) {
  const { t } = useTranslation("topNav");
  const { toast } = useToast();
  const { data: faculties = [] } = useStudyProgramsQuery();
  const [captchaCode, setCaptchaCode] = useState(() => generateCaptchaCode());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programs = useMemo(() => flattenStudyPrograms(faculties), [faculties]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      citizenship: "",
      phone: "",
      passport: "",
      jshshir: "",
      studyType: "",
      courseId: initialProgramId ?? "",
      verifyCode: "",
    },
  });

  const citizenship = watch("citizenship");
  const studyType = watch("studyType");
  const courseId = watch("courseId");

  useEffect(() => {
    if (initialProgramId && programs.some(({ program }) => program.id === initialProgramId)) {
      setValue("courseId", initialProgramId);
    }
  }, [initialProgramId, programs, setValue]);

  const refreshCaptcha = useCallback(() => {
    setCaptchaCode(generateCaptchaCode());
  }, []);

  const requiredMessage = trApply(t, "studyProgramApplyRequired");

  const onSubmit = async (data: FormData) => {
    if (normalizeCaptchaInput(data.verifyCode) !== captchaCode) {
      toast({
        title: trApply(t, "studyProgramApplyCaptchaError"),
        variant: "destructive",
      });
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast({
        title: trApply(t, "studyProgramApplySuccessTitle"),
        description: trApply(t, "studyProgramApplySuccessDescription"),
      });
      reset({
        fullName: "",
        citizenship: "",
        phone: "",
        passport: "",
        jshshir: "",
        studyType: "",
        courseId: "",
        verifyCode: "",
      });
      refreshCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="font-semibold">
            {trApply(t, "studyProgramApplyFullName")}
          </Label>
          <Input id="fullName" autoComplete="name" {...register("fullName")} />
          {errors.fullName ? <p className="text-xs text-destructive">{requiredMessage}</p> : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="citizenship" className="font-semibold">
              {trApply(t, "studyProgramApplyCitizenship")}
            </Label>
            <Select value={citizenship} onValueChange={(value) => setValue("citizenship", value)}>
              <SelectTrigger id="citizenship">
                <SelectValue placeholder={trApply(t, "studyProgramApplyCitizenshipPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {STUDY_PROGRAM_APPLY_CITIZENSHIP_OPTIONS.map(({ value, labelKey }) => (
                  <SelectItem key={value} value={value}>
                    {trApply(t, labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.citizenship ? <p className="text-xs text-destructive">{requiredMessage}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-semibold">
              {trApply(t, "studyProgramApplyPhone")}
            </Label>
            <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
            {errors.phone ? <p className="text-xs text-destructive">{requiredMessage}</p> : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="passport" className="font-semibold">
              {trApply(t, "studyProgramApplyPassport")}
            </Label>
            <Input id="passport" autoComplete="off" {...register("passport")} />
            {errors.passport ? <p className="text-xs text-destructive">{requiredMessage}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jshshir" className="font-semibold">
              {trApply(t, "studyProgramApplyJshshir")}
            </Label>
            <Input id="jshshir" inputMode="numeric" autoComplete="off" {...register("jshshir")} />
            {errors.jshshir ? <p className="text-xs text-destructive">{requiredMessage}</p> : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="studyType" className="font-semibold">
            {trApply(t, "studyProgramApplyStudyType")}
          </Label>
          <Select value={studyType} onValueChange={(value) => setValue("studyType", value)}>
            <SelectTrigger id="studyType">
              <SelectValue placeholder={trApply(t, "studyProgramApplyStudyTypePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {STUDY_PROGRAM_APPLY_STUDY_TYPES.map(({ value, labelKey }) => (
                <SelectItem key={value} value={value}>
                  {trApply(t, labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.studyType ? <p className="text-xs text-destructive">{requiredMessage}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="courseId" className="font-semibold">
            {trApply(t, "studyProgramApplyCourse")}
          </Label>
          <Select
            value={courseId}
            onValueChange={(value) => setValue("courseId", value)}
            disabled={!studyType}
          >
            <SelectTrigger id="courseId" disabled={!studyType}>
              <SelectValue placeholder={trApply(t, "studyProgramApplyCoursePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {programs.map(({ faculty, program }) => (
                <SelectItem key={program.id} value={program.id}>
                  {program.title}
                  <span className="sr-only"> — {faculty.title}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.courseId ? <p className="text-xs text-destructive">{requiredMessage}</p> : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="verifyCode" className="font-semibold">
              {trApply(t, "studyProgramApplyVerifyCode")}
            </Label>
            <button
              type="button"
              onClick={refreshCaptcha}
              className="group inline-flex items-center gap-2 rounded-md px-1 py-0.5 text-primary transition-colors hover:text-primary/80"
              aria-label={trApply(t, "studyProgramApplyRefreshCaptcha")}
            >
              <span
                className="select-none font-mono text-lg font-bold tracking-[0.35em] text-primary"
                aria-hidden
              >
                {captchaCode}
              </span>
              <RefreshCw className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
          <Input id="verifyCode" autoComplete="off" {...register("verifyCode")} />
          {errors.verifyCode ? <p className="text-xs text-destructive">{requiredMessage}</p> : null}
        </div>

        <Button type="submit" className="h-11 w-full text-base" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "…" : trApply(t, "studyProgramApplySend")}
        </Button>
      </div>
    </form>
  );
}
