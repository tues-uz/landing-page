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
import { adminApi, type EventItem } from "@/api/adminClient";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft, Upload, Calendar, MapPin, ExternalLink } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";

export default function AdminEvents() {
  const { canEditEvents } = usePermissions();
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
  const eventImageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const list = await adminApi.events.list();
      setEvents(list);
    } catch (e) {
      toast({ title: "Failed to load events", description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
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
    setForm(e);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.title?.trim() || !form.date?.trim()) {
      toast({ title: "Title and date required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await adminApi.events.update(editing.id, form);
        toast({ title: "Event updated" });
      } else {
        await adminApi.events.create(form as Omit<EventItem, "id">);
        toast({ title: "Event created" });
      }
      closeForm();
      load();
    } catch (e) {
      toast({ title: "Failed to save", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      await adminApi.events.delete(id);
      toast({ title: "Event deleted" });
      setEventToDelete(null);
      load();
    } catch (e) {
      toast({ title: "Failed to delete", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }
    setUploadingImage(true);
    try {
      const { url } = await adminApi.media.upload(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      toast({ title: "Image uploaded" });
    } catch (err) {
      toast({ title: "Upload failed", description: String(err), variant: "destructive" });
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  if (loading && events.length === 0) {
    return (
      <AdminPageShell title="Events" description="Manage upcoming events.">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </AdminPageShell>
    );
  }

  if (formOpen) {
    return (
      <AdminPageShell
        title={editing ? "Edit event" : "New event"}
        description="Events appear on the events page."
      >
        <Button variant="ghost" onClick={closeForm} className="gap-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> Back to list
        </Button>
        <Card className={ADMIN_CARD_CLASS}>
          <CardHeader>
            <CardTitle className="text-slate-900">{editing ? "Edit event" : "New event"}</CardTitle>
            <CardDescription className="text-slate-500">Events appear on the events page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Title</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Event title"
                className="rounded-lg border-slate-200"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-slate-700">Date</Label>
                <Input
                  type="date"
                  value={form.date ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="rounded-lg border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700">Time</Label>
                <Input
                  value={form.time ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  placeholder="14:00"
                  className="rounded-lg border-slate-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Location</Label>
              <Input
                value={form.location ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="Campus Hall"
                className="rounded-lg border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Event image (optional)</Label>
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
                    {form.imageUrl ? "Image uploaded · click to replace" : "Upload event image"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Drag & drop or click to browse · image files, max 50 MB</p>
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
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
              <Button variant="outline" onClick={closeForm} className="border-slate-200">
                Cancel
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
      title="Events"
      description="Manage upcoming events."
      actions={
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add event
        </Button>
      }
    >
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">{events.length} event(s)</p>
        <AlertDialog open={!!eventToDelete} onOpenChange={(open) => { if (!open) setEventToDelete(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete event?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete &quot;{eventToDelete?.title}&quot;? This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                disabled={saving}
                onClick={() => eventToDelete && handleDelete(eventToDelete.id)}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card text-left shadow-sm ring-1 ring-border/40 transition-all duration-200 hover:shadow-md hover:ring-border/60"
            >
              <div className="relative aspect-[5/3] w-full overflow-hidden bg-muted">
                <img
                  src={ev.imageUrl?.trim() || placeholderImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
                  <Calendar className="h-3 w-3 opacity-70" />
                  {ev.date}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold text-foreground text-[15px] leading-snug line-clamp-2 tracking-tight">
                  {ev.title}
                </h3>
                {ev.location?.trim() ? (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{ev.location}</span>
                  </p>
                ) : (
                  <div className="mt-1.5 h-[1.25rem]" />
                )}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Link
                    to={`/events/${ev.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    View
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                  </Link>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                      onClick={() => openEdit(ev)}
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setEventToDelete({ id: ev.id, title: ev.title })}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageShell>
  );
}
