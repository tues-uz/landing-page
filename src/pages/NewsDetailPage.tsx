import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNewsBySlug, news } from "@/components/NewsEvents";

const formatDateLong = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getNewsBySlug(slug) : null;
  const relatedArticles = article
    ? news.filter((n) => n.slug !== slug).slice(0, 4)
    : [];
  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="below-header container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Article not found</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const author = "author" in article ? article.author : "TUES";
  const readTime = "readTime" in article ? article.readTime : null;
  const body = "body" in article && Array.isArray(article.body) ? article.body : [];
  const firstParagraph =
    body.length > 0 && body[0].paragraphs.length > 0 ? body[0].paragraphs[0] : article.excerpt;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="below-header relative z-0 flex-1 overflow-x-clip bg-muted/30">
        {/* Card container - Status-style rounded content area */}
        <div className="relative z-10 mx-auto w-full min-h-[calc(100dvh-var(--header-height))] max-w-[1504px] overflow-hidden rounded-2xl bg-background shadow-sm xl:mx-4 xl:mb-4">
          {/* Breadcrumb bar */}
          <div className="flex flex-col-reverse border-b border-border pb-3 pt-5 lg:h-12 lg:flex-row lg:items-center lg:gap-2 lg:py-0 lg:px-6">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap px-5 scrollbar-hide lg:px-0">
              <Link to="/" className="font-medium text-foreground text-sm hover:text-primary">
                News
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              {article.category && (
                <>
                  <Link to="/#news" className="font-medium text-foreground text-sm hover:text-primary">
                    {article.category}
                  </Link>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </>
              )}
              <span className="select-none font-medium text-muted-foreground text-sm line-clamp-1">
                {article.title}
              </span>
            </div>
          </div>

          {/* Article header: category pill + title + author/date */}
          <div className="mx-auto max-w-3xl gap-3 px-5 pb-6 pt-8 xl:px-8 xl:pt-14">
            {article.category && (
              <div className="flex">
                <span className="inline-flex h-8 shrink-0 items-center rounded-full border border-border px-3 text-sm font-medium text-foreground">
                  {article.category}
                </span>
              </div>
            )}
            <h1 className="text-3xl font-bold leading-tight text-foreground xl:text-5xl">
              {article.title}
            </h1>
            <div className="mt-4 flex h-5 items-center gap-2">
              <div className="flex items-center justify-center overflow-hidden rounded-full bg-primary/10 size-8 text-xs font-semibold text-primary">
                {author.charAt(0)}
              </div>
              <span className="font-semibold text-foreground text-sm">{author}</span>
              <span className="text-muted-foreground text-sm">on {formatDateLong(article.date)}</span>
              {readTime && (
                <span className="text-muted-foreground text-sm"> · {readTime}</span>
              )}
            </div>
          </div>

          {/* Hero image */}
          <div className="mx-auto w-full max-w-[1504px] px-2 py-6 xl:px-6 xl:py-10">
            <img
              src={article.image}
              alt={article.title}
              className="aspect-[374/182] w-full rounded-xl object-cover xl:aspect-[1456/470]"
            />
          </div>

          {/* Body content */}
          <div className="mx-auto max-w-3xl px-5 py-6 xl:px-8">
            <div className="prose prose-neutral max-w-none">
              <p className="drop-cap text-lg leading-relaxed text-foreground/90">
                {firstParagraph}
              </p>
              {body.map((section, index) => (
                <div key={index} className="mt-8">
                  <h2 className="mb-3 scroll-mt-24 text-lg font-semibold text-foreground">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((para, p) => {
                    if (index === 0 && p === 0) return null;
                    return (
                      <p key={p} className="mb-4 leading-relaxed text-foreground/90">
                        {para}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Author + Share */}
            <div className="mt-10 flex flex-col gap-6 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{author}</span>
                  <span className="text-muted-foreground text-sm">{formatDateLong(article.date)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Share article:</span>
                <button
                  type="button"
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Share"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div className="border-t border-border bg-muted/20 pb-12 pt-10">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Related articles</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/news/${item.slug}`}
                      className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md"
                    >
                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary">
                          {item.title}
                        </h3>
                        <div className="mt-auto flex items-center gap-2 text-sm">
                          <span className="font-medium text-foreground">
                            {"author" in item ? item.author : "TUES"}
                          </span>
                          <span className="text-muted-foreground">on {formatDateLong(item.date)}</span>
                        </div>
                      </div>
                      <div className="w-full px-2 pb-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="aspect-[334/188] w-full rounded-lg object-cover"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetailPage;
