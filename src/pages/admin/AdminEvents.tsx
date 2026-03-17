import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { adminApi, type EventItem } from "@/api/adminClient";
import { AdminPageShell, ADMIN_CARD_CLASS } from "./AdminPageShell";
import { Loader2, Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
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
    if (!confirm("Delete this event?")) return;
    setSaving(true);
    try {
      await adminApi.events.delete(id);
      toast({ title: "Event deleted" });
      load();
    } catch (e) {
      toast({ title: "Failed to delete", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
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
              <Label className="text-slate-700">Image URL (optional)</Label>
              <Input
                value={form.imageUrl ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value || undefined }))}
                placeholder="https://..."
                className="rounded-lg border-slate-200"
              />
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

  return (
    <AdminPageShell
      title="Events"
      description="Manage upcoming events."
      actions={
        canEditEvents && (
        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add event
        </Button>
        )
      }
    >
      <Card className={ADMIN_CARD_CLASS}>
        <CardHeader>
          <CardTitle className="text-slate-900">Events</CardTitle>
          <CardDescription className="text-slate-500">{events.length} event(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {events.map((ev) => (
              <li
                key={ev.id}
                className="flex justify-between items-center rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-900">{ev.title}</p>
                  <p className="text-sm text-slate-500">{ev.date} · {ev.location}</p>
                </div>
                <div className="flex gap-1">
                  <Link to={`/events/${ev.id}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="text-slate-600 hover:bg-slate-100">View</Button>
                  </Link>
                  <Button size="sm" variant="ghost" onClick={() => openEdit(ev)} className="hover:bg-slate-100">
                    <Pencil className="h-4 w-4 text-slate-600" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(ev.id)} className="hover:bg-red-50">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </AdminPageShell>
  );
}
