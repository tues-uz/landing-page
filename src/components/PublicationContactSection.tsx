import { useCallback } from "react";
import { Copy, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

function telHref(displayPhone: string) {
  return `tel:${displayPhone.replace(/\s/g, "")}`;
}

export function PublicationContactSection() {
  const { t } = useTranslation("topNav");
  const { toast } = useToast();
  const p = (key: string) => t(`publicationsContact.${key}`);

  const accountDisplay = p("accountNumber");
  const copyAccountNumber = useCallback(async () => {
    const raw = t("publicationsContact.accountNumber").replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(raw);
      toast({ title: t("publicationsContact.accountNumberCopied") });
    } catch {
      toast({ title: t("publicationsContact.copyFailed"), variant: "destructive" });
    }
  }, [t, toast]);

  const copyMfo = useCallback(async () => {
    const raw = t("publicationsContact.mfo").replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(raw);
      toast({ title: t("publicationsContact.mfoCopied") });
    } catch {
      toast({ title: t("publicationsContact.copyFailed"), variant: "destructive" });
    }
  }, [t, toast]);

  const copyTin = useCallback(async () => {
    const raw = t("publicationsContact.tin").replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(raw);
      toast({ title: t("publicationsContact.tinCopied") });
    } catch {
      toast({ title: t("publicationsContact.copyFailed"), variant: "destructive" });
    }
  }, [t, toast]);

  const copyPhone = useCallback(
    async (displayPhone: string) => {
      const raw = displayPhone.replace(/\s/g, "");
      try {
        await navigator.clipboard.writeText(raw);
        toast({ title: t("publicationsContact.phoneCopied") });
      } catch {
        toast({ title: t("publicationsContact.copyFailed"), variant: "destructive" });
      }
    },
    [t, toast],
  );

  const introParagraphs = p("pageLead")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const contacts = [
    { name: p("contact1Name"), phone: p("phone1") },
    { name: p("contact2Name"), phone: p("phone2") },
  ] as const;

  return (
    <div className="mt-6 text-foreground">
      <div className="max-w-2xl space-y-4">
        {introParagraphs.map((para, i) => (
          <p key={i} className="text-base leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <Tabs defaultValue="contact" className="mt-10 w-full max-w-3xl">
        <TabsList className="grid h-auto w-full min-h-11 grid-cols-1 gap-1 p-1 sm:grid-cols-3">
          <TabsTrigger
            value="contact"
            className="whitespace-normal px-2 py-2.5 text-center text-xs font-medium leading-snug sm:px-3 sm:text-sm"
          >
            {p("contactsHeading")}
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="whitespace-normal px-2 py-2.5 text-center text-xs font-medium leading-snug sm:px-3 sm:text-sm"
          >
            {p("bankTitle")}
          </TabsTrigger>
          <TabsTrigger
            value="submission"
            className="whitespace-normal px-2 py-2.5 text-center text-xs font-medium leading-snug sm:px-3 sm:text-sm"
          >
            {p("submissionTitle")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="mt-6 focus-visible:outline-none">
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">{p("intro")}</p>

          <ul className="mt-8 list-none space-y-6 p-0 sm:space-y-7">
            {contacts.map(({ name, phone }) => (
              <li key={name}>
                <div className="flex flex-col gap-3 sm:hidden">
                  <div className="text-base font-semibold leading-snug">{name}</div>
                  <div className="flex items-stretch gap-2">
                    <a
                      href={telHref(phone)}
                      className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 text-center text-base font-semibold tabular-nums text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-100"
                    >
                      <Phone className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
                      {phone}
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-auto min-h-[3.25rem] w-11 shrink-0 self-stretch text-muted-foreground hover:bg-sky-100 hover:text-foreground dark:hover:bg-sky-950/45 dark:hover:text-foreground"
                      onClick={() => void copyPhone(phone)}
                      aria-label={p("copyPhone")}
                    >
                      <Copy className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </div>

                <div className="hidden min-w-0 items-center gap-3 sm:flex">
                  <span className="max-w-[42%] shrink-0 text-base font-semibold leading-snug">{name}</span>
                  <span
                    className="h-px min-w-[1.5rem] flex-1 border-b border-dotted border-muted-foreground/45"
                    aria-hidden
                  />
                  <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1">
                    <a
                      href={telHref(phone)}
                      className="inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-1 font-mono text-base font-semibold tabular-nums text-primary ring-1 ring-transparent ring-offset-2 transition-colors hover:bg-primary/5 hover:ring-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <Phone className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                      {phone}
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-sky-100 hover:text-foreground dark:hover:bg-sky-950/45 dark:hover:text-foreground"
                      onClick={() => void copyPhone(phone)}
                      aria-label={p("copyPhone")}
                    >
                      <Copy className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 max-w-3xl focus-visible:outline-none">
          <div className="space-y-8 text-sm leading-relaxed">
            <div>
              <p className="font-medium text-foreground">{p("feeTitle")}</p>
              <p className="mt-2 text-muted-foreground">{p("feeText")}</p>
            </div>

            <div>
              <p className="font-medium text-foreground">{p("bankTitle")}</p>
              <p className="mt-2 text-muted-foreground">{p("bankPayee")}</p>

              <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-5 lg:gap-8">
                <div className="min-w-0">
                  <dt className="text-muted-foreground">{p("accountLabel")}</dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="break-all font-mono text-foreground">{accountDisplay}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-sky-100 hover:text-foreground dark:hover:bg-sky-950/45 dark:hover:text-foreground"
                      onClick={() => void copyAccountNumber()}
                      aria-label={p("copyAccountNumber")}
                    >
                      <Copy className="h-4 w-4" aria-hidden />
                    </Button>
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-muted-foreground">{p("mfoLabel")}</dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-mono tabular-nums text-foreground">{p("mfo")}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-sky-100 hover:text-foreground dark:hover:bg-sky-950/45 dark:hover:text-foreground"
                      onClick={() => void copyMfo()}
                      aria-label={p("copyMfo")}
                    >
                      <Copy className="h-4 w-4" aria-hidden />
                    </Button>
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-muted-foreground">{p("tinLabel")}</dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-mono tabular-nums text-foreground">{p("tin")}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-sky-100 hover:text-foreground dark:hover:bg-sky-950/45 dark:hover:text-foreground"
                      onClick={() => void copyTin()}
                      aria-label={p("copyTin")}
                    >
                      <Copy className="h-4 w-4" aria-hidden />
                    </Button>
                  </dd>
                </div>
              </dl>
            </div>

            <p className="text-muted-foreground">{p("paymentNote")}</p>
          </div>
        </TabsContent>

        <TabsContent value="submission" className="mt-6 focus-visible:outline-none">
          <div className="space-y-8 sm:columns-2 sm:gap-10 sm:space-y-0">
            <div className="break-inside-avoid">
              <h2 className="text-sm font-semibold text-foreground">{p("emailLabel")}</h2>
              <a
                href={`mailto:${p("submissionEmail")}`}
                className="mt-2 inline-block break-all text-sm text-primary underline-offset-4 hover:underline"
              >
                {p("submissionEmail")}
              </a>
            </div>
            <div className="break-inside-avoid">
              <h2 className="text-sm font-semibold text-foreground">{p("addressLabel")}</h2>
              <p className="mt-2 text-sm leading-relaxed">{p("addressLine")}</p>
              <h3 className="mt-6 text-sm font-semibold text-foreground">{p("postalLabel")}</h3>
              <p className="mt-2 font-mono text-sm tabular-nums">{p("postalCode")}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
