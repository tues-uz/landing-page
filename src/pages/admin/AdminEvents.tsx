import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { adminApi, type EventItem, getEventImageUrl } from "@/api/adminClient";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Upload, Calendar, MapPin, ExternalLink } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

export default function AdminEvents() {
  const { t, i18n } = useTranslation("admin");
  const { canAccessEvents } = usePermissions();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState<Partial<EventItem>>({
    title: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<{ id: string; title: string } | null>(null);
  const [editLocale, setEditLocale] = useState<"uz" | "en" | "ru">("uz");
  const [loadingLocale, setLoadingLocale] = useState(false);
  const eventImageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const list = await adminApi.events.list(i18n.language);
      setEvents(list);
    } catch (e) {
      toast({ title: t("toastFailedLoadEvents"), description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [i18n.language]);

  const openCreate = () => {
    setEditing(null);
    setEditLocale("uz");
    setForm({
      title: "",
      date: new Date().toISOString().slice(0, 10),
      time: "",
      location: "",
      imageUrl: "",
    });
    setFormOpen(true);
  };

  const openEdit = (e: EventItem) => {
    setEditing(e);
    setEditLocale("uz");
    setForm(e);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setEditLocale("uz");
  };

  const handleLocaleChange = async (newLocale: "uz" | "en" | "ru") => {
    if (newLocale === editLocale || !editing || !editing.id) return;
    setLoadingLocale(true);
    try {
      const allEvents = await adminApi.events.list(newLocale);
      const localeData = allEvents.find(ev => ev.id === editing.id);
      if (localeData && localeData.id) {
        setForm(prev => ({
          ...prev, 
          title: localeData.title || "",
        }));
      } else {
        setForm(prev => ({ ...prev, title: "" }));
      }
      setEditLocale(newLocale);
    } catch (e) {
      toast({ title: t("toastFailedSwitchLanguage"), description: String(e), variant: "destructive" });
    } finally {
      setLoadingLocale(false);
    }
  };

  const handleSave = async () => {
    if (!form.title?.trim() || !form.date?.trim()) {
      toast({ title: t("toastTitleDateRequired"), variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (editing && editing.id) {
        if (editLocale === "uz") {
          await adminApi.events.update(editing.id, form);
          toast({ title: t("toastEventUpdated") });
        } else {
          await adminApi.events.upsertTranslation(editing.id, editLocale, {
            title: form.title!,
          });
          toast({ title: t("toastTranslationUpdated", { locale: editLocale.toUpperCase() }) });
        }
      } else {
        await adminApi.events.create(form as Omit<EventItem, "id">);
        toast({ title: t("toastEventCreated") });
      }
      closeForm();
      load();
    } catch (e) {
      toast({ title: t("toastFailedSave"), description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      await adminApi.events.delete(id);
      toast({ title: t("toastEventDeleted") });
      setEventToDelete(null);
      load();
    } catch (e) {
      toast({ title: t("toastFailedDelete"), description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast({ title: t("toastSelectImageFile"), variant: "destructive" });
      return;
    }
    setUploadingImage(true);
    try {
      const { url } = await adminApi.media.upload(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      toast({ title: t("toastImageUploaded") });
    } catch (err) {
      toast({ title: t("toastUploadFailed"), description: String(err), variant: "destructive" });
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  if (loading && events.length === 0) {
    return (
      <AdminPageShell title={t("events")} description={t("eventsDescription")}>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </AdminPageShell>
    );
  }

  if (formOpen) {
    return (
      <AdminPageShell
        title={editing ? t("editEvent") : t("newEvent")}
        description={t("eventsFormDesc")}
      >
        <Button variant="ghost" onClick={closeForm} className="gap-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> {t("backToList")}
        </Button>
        <Card className={ADMIN_CARD_CLASS}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-900">{editing ? t("editEvent") : t("newEvent")}</CardTitle>
                <CardDescription className="text-slate-500">{t("eventsFormDesc")}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">{t("languageColon")}</span>
                <Tabs value={editLocale} onValueChange={(v) => handleLocaleChange(v as any)} className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="uz" disabled={!editing || loadingLocale}>UZ</TabsTrigger>
                    <TabsTrigger value="en" disabled={!editing || loadingLocale}>EN</TabsTrigger>
                    <TabsTrigger value="ru" disabled={!editing || loadingLocale}>RU</TabsTrigger>
                  </TabsList>
                </Tabs>
                {!editing && <span className="text-xs text-muted-foreground/70 ml-2">{t("saveFirstToTranslate")}</span>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingLocale && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">{t("loadingTranslation")}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-slate-700">{t("eventTitle")}</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder={t("eventTitlePlaceholder")}
                className="rounded-lg border-slate-200"
              />
            </div>
            <div className={`grid gap-4 sm:grid-cols-2 ${editLocale !== "uz" ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="space-y-2">
                <Label className="text-slate-700">{t("eventDate")}</Label>
                <Input
                  type="date"
                  value={form.date ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="rounded-lg border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700">{t("eventTime")}</Label>
                <Input
                  value={form.time ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  placeholder={t("timePlaceholder")}
                  className="rounded-lg border-slate-200"
                />
              </div>
            </div>
            <div className={`space-y-2 ${editLocale !== "uz" ? "opacity-50 pointer-events-none" : ""}`}>
              <Label className="text-slate-700">{t("eventLocation")}</Label>
              <Input
                value={form.location ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder={t("locationPlaceholder")}
                className="rounded-lg border-slate-200"
              />
            </div>
            <div className={`space-y-2 ${editLocale !== "uz" ? "opacity-50 pointer-events-none" : ""}`}>
              <Label className="text-slate-700">{t("eventImageOptional")}</Label>
              <div
                role="button"
                tabIndex={0}
                onClick={() => !uploadingImage && eventImageInputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && eventImageInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-200 p-6 cursor-pointer transition-colors hover:border-primary/60 hover:bg-slate-50/50"
              >
                {uploadingImage ? (
                  <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                ) : (
                  <Upload className="h-8 w-8 text-slate-400" />
                )}
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-900">
                    {form.imageUrl ? t("eventImageUploadedReplace") : t("uploadEventImage")}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{t("eventImageDropHint")}</p>
                </div>
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="" className="mt-2 h-20 w-auto max-w-full rounded object-cover" />
                )}
                <input
                  ref={eventImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleEventImageUpload}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
              </Button>
              <Button variant="outline" onClick={closeForm} className="border-slate-200">
                {t("cancel")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </AdminPageShell>
    );
  }

  const placeholderImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=240&fit=crop";

  return (
    <AdminPageShell
      title={t("upcomingEvents", "Upcoming Events")}
      description={t("eventsDescription", "Manage the schedule and details for university events.")}
      actions={
        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> {t("addEvent", "Add event")}
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{events.length} {t("eventsCount", "event(s)")}</p>
        </div>

        <AlertDialog open={!!eventToDelete} onOpenChange={(open) => !open && setEventToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("deleteEvent", "Delete event?")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("deleteEventConfirm", { title: eventToDelete?.title || "this event", defaultValue: "This will permanently delete this event. This action cannot be undone." })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel", "Cancel")}</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={async () => {
                  if (eventToDelete) {
                    await handleDelete(eventToDelete.id);
                    setEventToDelete(null);
                  }
                }}
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("delete", "Delete")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const eventImg = getEventImageUrl(event, "");
            return (
              <Card key={event.id} className={`${ADMIN_CARD_CLASS} group overflow-hidden`}>
                <div className="aspect-video w-full bg-muted relative overflow-hidden">
                  {eventImg ? (
                    <img src={eventImg} alt={event.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground whitespace-nowrap">
                      <Calendar className="h-8 w-8 opacity-20 mr-2" />
                      <span className="text-sm font-medium">{t("noImage", "No image")}</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
                    <Calendar className="h-3 w-3 opacity-70" />
                    {event.date}
                  </span>
                </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base line-clamp-1">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 text-xs">
                  <MapPin className="h-3 w-3" />
                  {event.location || "No location"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {event.time || "No time set"}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => openEdit(event)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setEventToDelete({ id: event.id, title: event.title })}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        </div>

        {events.length === 0 && !loading && (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
            <Calendar className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">{t("noEvents", "No events found")}</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              {t("noEventsDesc", "Start by adding your first university event.")}
            </p>
            <Button onClick={openCreate} className="rounded-lg gap-2">
              <Plus className="h-4 w-4" />
              {t("addEvent", "Add event")}
            </Button>
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
