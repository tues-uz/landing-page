import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProgramBySlug } from "@/components/Programs";

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = slug ? getProgramBySlug(slug) : null;

  if (!program) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="below-header container mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Program not found</h1>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Programs
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = program.icon;
  const longDescription = "longDescription" in program ? (program as { longDescription: string }).longDescription : "";
  const highlights = "highlights" in program ? program.highlights : [];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Programs
            </Link>

            <div className="max-w-3xl">
              <div className="w-14 h-14 rounded-xl bg-oxford-gold/20 flex items-center justify-center mb-6">
                <Icon className="h-7 w-7 text-oxford-gold" />
              </div>
              <span className="text-oxford-gold font-medium text-sm tracking-wider uppercase">
                {program.count}
              </span>
              <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mt-2 mb-4">
                {program.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {longDescription}
              </p>

              {highlights.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
                    Key areas
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-oxford-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  to="/programs"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-11 px-6 border border-border bg-card hover:bg-muted transition-colors text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Programs
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-11 px-6 bg-oxford-gold hover:bg-oxford-gold/90 text-foreground transition-colors"
                >
                  Apply or inquire
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetailPage;
