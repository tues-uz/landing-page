import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Share2, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contentApi } from "@/api/client";
import { contentKeys } from "@/api/queryKeys";
import {
  getFirstNewsParagraph,
  getNewsGalleryUrls,
  getNewsHeroImages,
  isNewsGalleryParagraph,
  isNewsImageParagraph,
} from "@/lib/newsContent";
import { ArticleBodyCarousel } from "@/components/ArticleBodyCarousel";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const formatDateLong = (dateStr: string) => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] max-h-[500px] w-full bg-muted" />
      <div className="mx-auto max-w-3xl space-y-6 px-5 py-8 xl:px-8 xl:py-14">
      <div className="h-6 w-24 rounded-full bg-muted" />
      <div className="space-y-3">
        <div className="h-8 w-full rounded bg-muted" />
        <div className="h-8 w-3/4 rounded bg-muted" />
      </div>
      <div className="h-4 w-48 rounded bg-muted" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`h-4 rounded bg-muted ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
      </div>
    </div>
  );
}

function ArticleHeroGallery({ images, title }: { images: string[]; title: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="w-full">
        <div className="relative aspect-[4/3] max-h-[500px] w-full overflow-hidden bg-muted">
          <img
            src={images[0]}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel opts={{ loop: true, align: "start" }} setApi={setApi} className="w-full">
        <CarouselContent className="-ml-0">
          {images.map((src, index) => (
            <CarouselItem key={`${src}-${index}`} className="pl-0 basis-full">
              <div className="relative aspect-[4/3] max-h-[500px] w-full overflow-hidden bg-muted">
                <img
                  src={src}
                  alt={`${title} — image ${index + 1} of ${images.length}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border-0 bg-black/40 text-white hover:bg-black/60 hover:text-white" />
        <CarouselNext className="right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border-0 bg-black/40 text-white hover:bg-black/60 hover:text-white" />
      </Carousel>
      <div className="mt-3 flex justify-center gap-1.5 px-5" role="tablist" aria-label="Article images">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to image ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();

  const { data: remoteArticle, isLoading, error } = useQuery({
    queryKey: [...contentKeys.news.detail(slug ?? ""), i18n.language],
    queryFn: () => contentApi.news.getBySlug(slug!, i18n.language),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // Fetch all news for related articles
  const { data: remoteAllNews } = useQuery({
    queryKey: [...contentKeys.news.list(), i18n.language],
    queryFn: () => contentApi.news.list(i18n.language),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const article = remoteArticle;

  const allNews = remoteAllNews ?? [];

  const relatedArticles = article
    ? allNews.filter((n) => n.slug !== slug).slice(0, 4)
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="below-header relative z-0 flex-1 overflow-x-clip bg-muted/30">
          <div className="relative z-10 mx-auto w-full min-h-[calc(100dvh-var(--header-height))] max-w-[1504px] overflow-hidden rounded-2xl bg-background shadow-sm xl:mx-4 xl:mb-4">
            <ArticleSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  const body = Array.isArray(article.body) ? article.body : [];
  const heroImages = getNewsHeroImages(article);

  const firstParagraph = getFirstNewsParagraph(body) ?? article.excerpt;
  let firstTextIndex = { sectionIndex: -1, paragraphIndex: -1 };
  if (firstParagraph) {
    for (let s = 0; s < body.length; s++) {
      const section = body[s];
      for (let p = 0; p < section.paragraphs.length; p++) {
        if (section.paragraphs[p] === firstParagraph) {
          firstTextIndex = { sectionIndex: s, paragraphIndex: p };
          break;
        }
      }
      if (firstTextIndex.sectionIndex !== -1) break;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="below-header relative z-0 flex-1 overflow-x-clip bg-muted/30 flex justify-center">
        <div className="relative z-10 w-full min-h-[calc(100dvh-var(--header-height))] overflow-hidden rounded-none bg-background shadow-sm">
          {/* Breadcrumb */}
          <div
            className={cn(
              "flex flex-col-reverse pb-3 pt-5 lg:h-12 lg:flex-row lg:items-center lg:gap-2 lg:py-0 lg:px-6",
              heroImages.length === 0 && "border-b border-border",
            )}
          >
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap px-5 scrollbar-hide lg:px-0">
              <Link to="/" className="font-medium text-foreground text-sm hover:text-primary">
                News
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              {article.category && (
                <>
                  <Link to="/news" className="font-medium text-foreground text-sm hover:text-primary">
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

          {/* Hero image gallery */}
          <ArticleHeroGallery images={heroImages} title={article.title} />

          {/* Article header */}
          <div
            className={cn(
              "mx-auto max-w-3xl gap-3 px-5 pb-6 xl:px-8",
              heroImages.length > 0 ? "pt-6 xl:pt-8" : "pt-8 xl:pt-14",
            )}
          >
            {article.category && (
              <div className="flex mb-4">
                <span className="inline-flex h-8 shrink-0 items-center rounded-full border border-border px-3 text-sm font-medium text-foreground">
                  {article.category}
                </span>
              </div>
            )}
            <h1 className="text-3xl font-bold leading-tight text-foreground xl:text-5xl">
              {article.title}
            </h1>
            <div className="mt-4 flex h-5 items-center gap-2">
              <span className="text-muted-foreground text-sm">{formatDateLong(article.date)}</span>
              {article.readTime && (
                <span className="text-muted-foreground text-sm">· {article.readTime}</span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-5 py-6 xl:px-8">
            <div className="prose prose-neutral max-w-none">
              {firstParagraph && (
                <p className="drop-cap text-lg leading-relaxed text-foreground/90">{firstParagraph}</p>
              )}
              {body.map((section, index) => (
                <div key={index} className="mt-8">
                  {section.heading && (
                    <h2 className="mb-3 scroll-mt-24 text-lg font-semibold text-foreground">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((para, p) => {
                    if (index === firstTextIndex.sectionIndex && p === firstTextIndex.paragraphIndex) {
                      return null;
                    }
                    
                    if (isNewsImageParagraph(para)) {
                      return null;
                    }

                    if (isNewsGalleryParagraph(para)) {
                      return (
                        <ArticleBodyCarousel
                          key={p}
                          images={getNewsGalleryUrls(para)}
                          title={article.title}
                        />
                      );
                    }
                    
                    // Render link placeholders
                    if (para.startsWith("[Link: ") && para.endsWith("]")) {
                      const href = para.slice(7, -1).trim();
                      if (href) {
                        return (
                          <p key={p} className="mb-4 leading-relaxed">
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline break-all"
                            >
                              {href}
                            </a>
                          </p>
                        );
                      }
                      return null;
                    }

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
                  {article.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{article.author}</span>
                  <span className="text-muted-foreground text-sm">{formatDateLong(article.date)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Share article:</span>
                <button
                  type="button"
                  onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Share article"
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
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/news/${item.slug}`}
                      className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md"
                    >
                      {item.imageUrl && (
                        <div className="w-full px-2 pt-2">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="aspect-[334/188] w-full rounded-lg object-cover object-center bg-muted"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary">
                          {item.title}
                        </h3>
                        <div className="mt-auto flex items-center gap-2 text-sm">
                          <span className="font-medium text-foreground">{item.author}</span>
                          <span className="text-muted-foreground">on {formatDateLong(item.date)}</span>
                        </div>
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
