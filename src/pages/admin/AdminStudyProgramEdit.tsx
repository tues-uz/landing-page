import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const SUPPORTED_LOCALES = ["uz", "en", "ru", "zh"] as const;
type ProgramLocale = (typeof SUPPORTED_LOCALES)[number];

/** The detail fetch is always made with the current admin UI language, so the loaded
 * program's content is in that locale — the edit tab must start there too, otherwise it
 * mislabels the loaded content and can overwrite the wrong locale on save. */
function currentContentLocale(language: string): ProgramLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(language) ? (language as ProgramLocale) : "uz";
}
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AdminPageShell } from "./AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  useAdminStudyProgramDetailQuery,
  useAdminStudyProgramsQuery,
  useStudyProgramMutations,
  useFacultyMutations,
} from "@/features/cms/hooks/useStudyProgramsQueries";
import { adminApi } from "@/api/adminClient";
import {
  getStudyProgramCourseCount,
  studyProgramDetailPath,
} from "@/data/studyProgramsCurriculum";
import { slugifyFromTitle } from "@/lib/slugifyTitle";
import { toStudyProgramDateInputValue } from "@/lib/studyProgramDates";
import type { StudyProgramCourseGroup } from "@/types/studyPrograms";

function emptyGroup(title: string): StudyProgramCourseGroup {
  return { title, courses: [{ name: "", credits: "" }] };
}

export default function AdminStudyProgramEdit() {
  const { programId = "" } = useParams<{ programId: string }>();
  const isCreate = programId === "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation("admin");
  const { data: faculties = [] } = useAdminStudyProgramsQuery();
  const { data: program, isLoading } = useAdminStudyProgramDetailQuery(programId);
  const { create, update, upsertTranslation } = useStudyProgramMutations();
  const { create: createFaculty } = useFacultyMutations();
  const [newFacultyName, setNewFacultyName] = useState("");
  const [addingFaculty, setAddingFaculty] = useState(false);

  const [editLocale, setEditLocale] = useState<ProgramLocale>(() => currentContentLocale(i18n.language));
  const [loadingLocale, setLoadingLocale] = useState(false);

  const [programSlug, setProgramSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [duration, setDuration] = useState("");
  const [qualification, setQualification] = useState("");
  const [tuitionFee, setTuitionFee] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [earliestStartDate, setEarliestStartDate] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [courseGroups, setCourseGroups] = useState<StudyProgramCourseGroup[]>([]);

  useEffect(() => {
    if (!isCreate || !faculties.length) return;
    setFacultyId((current) => current || faculties[0].id);
    setCourseGroups((current) => (current.length ? current : [emptyGroup(t("newGroupTitle"))]));
  }, [isCreate, faculties, t]);

  const handleAddFaculty = async () => {
    const title = newFacultyName.trim();
    if (!title) return;
    try {
      const created = await createFaculty.mutateAsync({ title });
      setFacultyId(created.id);
      setNewFacultyName("");
      setAddingFaculty(false);
      toast({ title: t("facultyCreated", "Faculty added") });
    } catch (err) {
      toast({
        title: t("facultyCreateFailed", "Could not add faculty"),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!program || isCreate) return;
    setEditLocale(currentContentLocale(i18n.language));
    setTitle(program.title);
    setCode(program.code);
    setDuration(program.duration);
    setQualification(program.qualification);
    setTuitionFee(program.tuitionFee);
    setDegreeLevel(program.degreeLevel);
    setApplicationDeadline(toStudyProgramDateInputValue(program.applicationDeadline));
    setEarliestStartDate(toStudyProgramDateInputValue(program.earliestStartDate));
    setFacultyId(program.facultyId);
    setCourseGroups(JSON.parse(JSON.stringify(program.courseGroups)) as StudyProgramCourseGroup[]);
    setFacultyId(program.facultyId);
    setProgramSlug(program.id);
    setCourseGroups(JSON.parse(JSON.stringify(program.courseGroups)) as StudyProgramCourseGroup[]);
  }, [program, isCreate]);

  useEffect(() => {
    if (!isCreate || slugTouched || !title.trim()) return;
    setProgramSlug(slugifyFromTitle(title));
  }, [isCreate, slugTouched, title]);

  const handleLocaleChange = async (newLocale: ProgramLocale) => {
    if (isCreate) {
      toast({
        title: t("toastSaveProgramFirst"),
        description: t("toastSaveProgramFirstDesc"),
      });
      return;
    }
    if (newLocale === editLocale || !programId) return;
    setLoadingLocale(true);
    try {
      const localeData = await adminApi.studyPrograms.getById(programId, newLocale);
      if (localeData) {
        setTitle(localeData.title || "");
        setQualification(localeData.qualification || "");
        setCourseGroups(
          JSON.parse(JSON.stringify(localeData.courseGroups || [])) as StudyProgramCourseGroup[],
        );
      }
      setEditLocale(newLocale);
    } catch (e) {
      toast({ title: t("toastFailedSwitchLanguage"), description: String(e), variant: "destructive" });
    } finally {
      setLoadingLocale(false);
    }
  };

  const handleSave = async () => {
    const payload = {
      title,
      code,
      duration,
      qualification,
      tuitionFee,
      degreeLevel,
      applicationDeadline,
      earliestStartDate,
      facultyId,
      courseGroups,
    };

    if (isCreate) {
      const id = programSlug.trim();
      if (!id) {
        toast({ title: t("toastProgramIdRequired"), description: t("toastProgramIdRequiredDesc"), variant: "destructive" });
        return;
      }
      if (!title.trim()) {
        toast({ title: t("toastTitleRequired"), variant: "destructive" });
        return;
      }
      if (!facultyId) {
        toast({ title: t("toastFacultyRequired"), variant: "destructive" });
        return;
      }
      try {
        await create.mutateAsync({ id, ...payload, facultyId });
        toast({ title: t("toastProgramCreated"), description: t("toastProgramCreatedDesc", { title }) });
        navigate(`/admin/study-programs/${id}/edit`, { replace: true });
      } catch (err) {
        toast({ title: t("toastCreateFailed"), description: String(err), variant: "destructive" });
      }
      return;
    }

    if (!program) return;

    try {
      if (editLocale === "uz") {
        await update.mutateAsync({ programId, payload });
      } else {
        await upsertTranslation.mutateAsync({
          programId,
          locale: editLocale,
          payload: { title, qualification, courseGroups },
        });
      }
      toast({
        title: t("toastSaved"),
        description:
          editLocale === "uz"
            ? t("toastStudyProgramUpdated")
            : t("toastTranslationUpdated", { locale: editLocale.toUpperCase() }),
      });
    } catch (err) {
      toast({ title: t("toastSaveFailed"), description: String(err), variant: "destructive" });
    }
  };

  const updateGroup = (index: number, patch: Partial<StudyProgramCourseGroup>) => {
    setCourseGroups((groups) =>
      groups.map((group, i) => (i === index ? { ...group, ...patch } : group)),
    );
  };

  const moveGroup = (index: number, direction: -1 | 1) => {
    setCourseGroups((groups) => {
      const next = [...groups];
      const target = index + direction;
      if (target < 0 || target >= next.length) return groups;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const moveCourse = (groupIndex: number, courseIndex: number, direction: -1 | 1) => {
    setCourseGroups((groups) =>
      groups.map((group, gi) => {
        if (gi !== groupIndex) return group;
        const courses = [...group.courses];
        const target = courseIndex + direction;
        if (target < 0 || target >= courses.length) return group;
        [courses[courseIndex], courses[target]] = [courses[target], courses[courseIndex]];
        return { ...group, courses };
      }),
    );
  };

  const saving = create.isPending || update.isPending || upsertTranslation.isPending;
  const courseCount = getStudyProgramCourseCount({
    id: isCreate ? programSlug : programId,
    title,
    code,
    duration,
    qualification,
    tuitionFee,
    degreeLevel,
    applicationDeadline,
    earliestStartDate,
    courseGroups,
  });
  const facultyTitle = faculties.find((f) => f.id === facultyId)?.title ?? facultyId;
  const pageTitle = isCreate
    ? t("addStudyProgram", "Add study program")
    : program?.title || t("editStudyProgram", "Edit study program");

  if (!isCreate && isLoading) {
    return (
      <AdminPageShell title={t("editStudyProgram", "Edit study program")} bare>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminPageShell>
    );
  }

  if (!isCreate && !program) {
    return (
      <AdminPageShell title={t("editStudyProgram", "Edit study program")} bare>
        <p className="text-muted-foreground">Program not found.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/admin/study-programs">
            <ArrowLeft className="h-4 w-4" />
            {t("backToList")}
          </Link>
        </Button>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell title={pageTitle} bare>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin/study-programs">
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          {!isCreate ? (
            <Button variant="outline" size="sm" asChild>
              <Link to={studyProgramDetailPath(programId)} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {t("viewPublicPage")}
              </Link>
            </Button>
          ) : null}
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isCreate ? t("createProgram") : t("save")}
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {SUPPORTED_LOCALES.map((locale) => (
          <Button
            key={locale}
            type="button"
            size="sm"
            variant={editLocale === locale ? "default" : "outline"}
            disabled={loadingLocale || isCreate}
            onClick={() => handleLocaleChange(locale)}
          >
            {locale.toUpperCase()}
          </Button>
        ))}
      </div>
      {isCreate ? (
        <p className="mt-2 text-sm text-muted-foreground">
          {t("createProgramUzFirst")}
        </p>
      ) : null}

      <Tabs defaultValue="info" className="mt-6">
        <TabsList>
          <TabsTrigger value="info">{t("tabProgramInfo")}</TabsTrigger>
          <TabsTrigger value="curriculum">
            {t("tabCurriculum", { count: courseCount })}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("metadataTitle")}</CardTitle>
              <CardDescription>
                {t("metadataDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="faculty">{t("facultyLabel")}</Label>
                <div className="flex items-center gap-2">
                  <select
                    id="faculty"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                    disabled={editLocale !== "uz"}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {faculties.length === 0 && <option value="">{t("noFacultiesYet", "No faculties yet.")}</option>}
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.title}
                      </option>
                    ))}
                  </select>
                  {editLocale === "uz" && !addingFaculty ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 shrink-0 gap-1.5"
                      onClick={() => setAddingFaculty(true)}
                    >
                      <Plus className="h-4 w-4" />
                      {t("newFaculty", "New faculty")}
                    </Button>
                  ) : null}
                </div>
                {addingFaculty ? (
                  <div className="flex items-center gap-2">
                    <Input
                      autoFocus
                      value={newFacultyName}
                      onChange={(e) => setNewFacultyName(e.target.value)}
                      placeholder={t("newFacultyTitlePlaceholder", "New faculty name…")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddFaculty();
                        if (e.key === "Escape") setAddingFaculty(false);
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="h-9 shrink-0"
                      onClick={handleAddFaculty}
                      disabled={createFaculty.isPending || !newFacultyName.trim()}
                    >
                      {createFaculty.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : t("add", "Add")}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 shrink-0"
                      onClick={() => setAddingFaculty(false)}
                    >
                      {t("cancel", "Cancel")}
                    </Button>
                  </div>
                ) : null}
                {facultyTitle ? (
                  <p className="text-xs text-muted-foreground">{t("facultyCurrent", { title: facultyTitle })}</p>
                ) : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="programSlug">{t("programSlugLabel")}</Label>
                <Input
                  id="programSlug"
                  value={isCreate ? programSlug : programId}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setProgramSlug(e.target.value);
                  }}
                  disabled={!isCreate}
                  placeholder={t("programSlugPlaceholder")}
                />
                {!isCreate ? (
                  <p className="text-xs text-muted-foreground">
                    {t("programSlugUsedIn", { id: programId })}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {t("programSlugAuto")}
                  </p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">{t("titleLabel")}</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">{t("codeLabel")}</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={editLocale !== "uz"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degreeLevel">{t("degreeLevelLabel")}</Label>
                <Input
                  id="degreeLevel"
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value)}
                  disabled={editLocale !== "uz"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">{t("durationLabel")}</Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  disabled={editLocale !== "uz"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">{t("qualificationLabel")}</Label>
                <Input id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tuitionFee">{t("tuitionFeeLabel")}</Label>
                <Input
                  id="tuitionFee"
                  value={tuitionFee}
                  onChange={(e) => setTuitionFee(e.target.value)}
                  disabled={editLocale !== "uz"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicationDeadline">{t("applicationDeadlineLabel")}</Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                  disabled={editLocale !== "uz"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="earliestStartDate">{t("earliestStartDateLabel")}</Label>
                <Input
                  id="earliestStartDate"
                  type="date"
                  value={earliestStartDate}
                  onChange={(e) => setEarliestStartDate(e.target.value)}
                  disabled={editLocale !== "uz"}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {t("curriculumSummary", { groups: courseGroups.length, count: courseCount })}
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setCourseGroups((groups) => [...groups, emptyGroup(t("newGroupTitle"))])}
            >
              <Plus className="h-4 w-4" />
              {t("addGroup")}
            </Button>
          </div>

          {courseGroups.map((group, groupIndex) => (
            <Card key={`group-${groupIndex}`}>
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Label>{t("groupTitleLabel")}</Label>
                    <Input
                      value={group.title}
                      onChange={(e) => updateGroup(groupIndex, { title: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-1 pt-7">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => moveGroup(groupIndex, -1)}
                      disabled={groupIndex === 0}
                      aria-label={t("moveGroupUp")}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => moveGroup(groupIndex, 1)}
                      disabled={groupIndex === courseGroups.length - 1}
                      aria-label={t("moveGroupDown")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() =>
                        setCourseGroups((groups) => groups.filter((_, i) => i !== groupIndex))
                      }
                      aria-label={t("removeGroup")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.courses.map((course, courseIndex) => (
                  <div key={`course-${groupIndex}-${courseIndex}`} className="flex flex-wrap gap-2">
                    <Input
                      className="min-w-[200px] flex-1"
                      placeholder={t("courseNamePlaceholder")}
                      value={course.name}
                      onChange={(e) =>
                        updateGroup(groupIndex, {
                          courses: group.courses.map((c, ci) =>
                            ci === courseIndex ? { ...c, name: e.target.value } : c,
                          ),
                        })
                      }
                    />
                    <Input
                      className="w-36"
                      placeholder={t("creditsPlaceholder")}
                      value={course.credits ?? ""}
                      onChange={(e) =>
                        updateGroup(groupIndex, {
                          courses: group.courses.map((c, ci) =>
                            ci === courseIndex ? { ...c, credits: e.target.value } : c,
                          ),
                        })
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => moveCourse(groupIndex, courseIndex, -1)}
                      disabled={courseIndex === 0}
                      aria-label={t("moveCourseUp")}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => moveCourse(groupIndex, courseIndex, 1)}
                      disabled={courseIndex === group.courses.length - 1}
                      aria-label={t("moveCourseDown")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-destructive"
                      onClick={() =>
                        updateGroup(groupIndex, {
                          courses: group.courses.filter((_, ci) => ci !== courseIndex),
                        })
                      }
                      aria-label={t("removeCourse")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateGroup(groupIndex, {
                      courses: [...group.courses, { name: "", credits: "" }],
                    })
                  }
                >
                  <Plus className="h-4 w-4" />
                  {t("addCourse")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </AdminPageShell>
  );
}
