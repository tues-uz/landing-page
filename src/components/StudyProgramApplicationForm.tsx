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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { flattenStudyPrograms } from "@/data/studyProgramsCurriculum";
import { useStudyProgramDetailQuery, useLocalizedStudyProgramsQuery } from "@/features/cms/hooks/useStudyProgramsQueries";
import { contentApi } from "@/api/client";
import {
  STUDY_PROGRAM_APPLY_CITIZENSHIP_OPTIONS,
  STUDY_PROGRAM_APPLY_PAGE_DEFAULTS,
  STUDY_PROGRAM_APPLY_STUDY_TYPES,
} from "@/locales/studyProgramApplyDefaults";

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
  const { data: faculties = [], isLoading: isProgramsLoading } = useLocalizedStudyProgramsQuery();
  const { data: initialProgramDetail, isLoading: isInitialProgramLoading } =
    useStudyProgramDetailQuery(initialProgramId ?? "");
  const isProgramLocked = Boolean(initialProgramId);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programs = useMemo(() => flattenStudyPrograms(faculties), [faculties]);
  const selectedProgram = useMemo(() => {
    if (!initialProgramId) return undefined;
    const fromList = programs.find(({ program }) => program.id === initialProgramId)?.program;
    if (fromList) return fromList;
    return initialProgramDetail?.program;
  }, [initialProgramId, programs, initialProgramDetail?.program]);
  const programsByFaculty = useMemo(
    () =>
      faculties
        .map((faculty) => ({
          faculty,
          programs: faculty.programs,
        }))
        .filter(({ programs: facultyPrograms }) => facultyPrograms.length > 0),
    [faculties],
  );

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
    if (!initialProgramId) return;
    setValue("courseId", initialProgramId, { shouldValidate: true });
  }, [initialProgramId, setValue]);

  const refreshCaptcha = useCallback(() => {
    contentApi.applications
      .getCaptcha()
      .then(({ code, token }) => {
        setCaptchaCode(code);
        setCaptchaToken(token);
      })
      .catch(() => {
        setCaptchaCode("");
        setCaptchaToken("");
      });
  }, []);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

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
      await contentApi.applications.submit({
        fullName: data.fullName,
        citizenship: data.citizenship,
        phone: data.phone,
        passport: data.passport,
        jshshir: data.jshshir,
        studyType: data.studyType,
        courseId: data.courseId,
        verifyToken: captchaToken,
        verifyAnswer: data.verifyCode,
      });
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
        courseId: initialProgramId ?? "",
        verifyCode: "",
      });
      refreshCaptcha();
    } catch {
      toast({
        title: trApply(t, "studyProgramApplyCaptchaError"),
        variant: "destructive",
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
            <Select value={citizenship || undefined} onValueChange={(value) => setValue("citizenship", value)}>
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
          <Select value={studyType || undefined} onValueChange={(value) => setValue("studyType", value)}>
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
          {isProgramLocked ? (
            <div
              id="courseId"
              className="flex h-10 w-full items-center rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground"
              aria-readonly="true"
            >
              {selectedProgram ? (
                <>
                  {selectedProgram.title}
                  <span className="text-muted-foreground"> · {selectedProgram.code}</span>
                </>
              ) : isProgramsLoading || isInitialProgramLoading ? (
                <span className="text-muted-foreground">{trApply(t, "studyProgramApplyCourseLoading")}</span>
              ) : (
                <span className="text-muted-foreground">{initialProgramId}</span>
              )}
            </div>
          ) : (
            <Select
              value={courseId || undefined}
              onValueChange={(value) => setValue("courseId", value)}
              disabled={isProgramsLoading || programs.length === 0}
            >
              <SelectTrigger id="courseId" disabled={isProgramsLoading || programs.length === 0}>
                <SelectValue
                  placeholder={
                    isProgramsLoading
                      ? trApply(t, "studyProgramApplyCourseLoading")
                      : programs.length === 0
                        ? trApply(t, "studyProgramApplyCourseEmpty")
                        : trApply(t, "studyProgramApplyCoursePlaceholder")
                  }
                />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {programsByFaculty.map(({ faculty, programs: facultyPrograms }) => (
                  <SelectGroup key={faculty.id}>
                    <SelectLabel>{faculty.title}</SelectLabel>
                    {facultyPrograms.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.title}
                        <span className="text-muted-foreground"> · {program.code}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          )}
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
