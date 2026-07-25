export type NewsletterSubscriberStatus = "active" | "unsubscribed";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: NewsletterSubscriberStatus;
  source: "footer";
}

const STORAGE_KEY = "tues_newsletter_subscribers";

const SEED_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: "seed-1",
    email: "student@example.com",
    subscribedAt: "2026-07-01T09:15:00.000Z",
    status: "active",
    source: "footer",
  },
  {
    id: "seed-2",
    email: "alumni@tues.uz",
    subscribedAt: "2026-07-05T14:30:00.000Z",
    status: "active",
    source: "footer",
  },
  {
    id: "seed-3",
    email: "prospect@mail.ru",
    subscribedAt: "2026-06-18T11:00:00.000Z",
    status: "unsubscribed",
    source: "footer",
  },
];

function readStore(): NewsletterSubscriber[] {
  if (typeof window === "undefined") return [...SEED_SUBSCRIBERS];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SUBSCRIBERS));
      return [...SEED_SUBSCRIBERS];
    }
    const parsed = JSON.parse(raw) as NewsletterSubscriber[];
    return Array.isArray(parsed) ? parsed : [...SEED_SUBSCRIBERS];
  } catch {
    return [...SEED_SUBSCRIBERS];
  }
}

function writeStore(subscribers: NewsletterSubscriber[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
}

function generateId() {
  return `sub-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const newsletterSubscribersStore = {
  list(): NewsletterSubscriber[] {
    return readStore().sort(
      (a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime(),
    );
  },

  subscribe(email: string): { ok: true; subscriber: NewsletterSubscriber } | { ok: false; reason: "duplicate" | "invalid" } {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return { ok: false, reason: "invalid" };
    }

    const subscribers = readStore();
    const existing = subscribers.find((s) => s.email === normalized);

    if (existing) {
      if (existing.status === "unsubscribed") {
        existing.status = "active";
        existing.subscribedAt = new Date().toISOString();
        writeStore(subscribers);
        return { ok: true, subscriber: existing };
      }
      return { ok: false, reason: "duplicate" };
    }

    const subscriber: NewsletterSubscriber = {
      id: generateId(),
      email: normalized,
      subscribedAt: new Date().toISOString(),
      status: "active",
      source: "footer",
    };
    writeStore([subscriber, ...subscribers]);
    return { ok: true, subscriber };
  },

  updateStatus(id: string, status: NewsletterSubscriberStatus): NewsletterSubscriber | null {
    const subscribers = readStore();
    const index = subscribers.findIndex((s) => s.id === id);
    if (index === -1) return null;
    subscribers[index] = { ...subscribers[index], status };
    writeStore(subscribers);
    return subscribers[index];
  },

  remove(id: string): boolean {
    const subscribers = readStore();
    const next = subscribers.filter((s) => s.id !== id);
    if (next.length === subscribers.length) return false;
    writeStore(next);
    return true;
  },

  exportCsv(): string {
    const rows = [
      ["Email", "Status", "Subscribed at", "Source"],
      ...this.list().map((s) => [
        s.email,
        s.status,
        new Date(s.subscribedAt).toISOString(),
        s.source,
      ]),
    ];
    return rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
  },
};
