export type NewsletterSubscriberStatus = "active" | "unsubscribed";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: NewsletterSubscriberStatus;
  source: string;
}

export function exportNewsletterSubscribersCsv(subscribers: NewsletterSubscriber[]): string {
  const rows = [
    ["Email", "Status", "Subscribed at", "Source"],
    ...subscribers.map((s) => [
      s.email,
      s.status,
      new Date(s.subscribedAt).toISOString(),
      s.source ?? "footer",
    ]),
  ];
  return rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
}
