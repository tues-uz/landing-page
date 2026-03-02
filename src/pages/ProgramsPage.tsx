import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { programs } from "@/components/Programs";

const ProgramsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="below-header">
        <section className="pb-24 pt-6 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-oxford-gold font-medium text-sm tracking-wider uppercase">
                Academic Excellence
              </span>
              <h1 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mt-3 mb-4">
                All Programs
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore our full range of programs across economics, business, finance, and more.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {programs.map((program) => {
                const Icon = program.icon;
                return (
                  <Link
                    key={program.id}
                    to={`/programs/${program.slug}`}
                    className="group bg-white backdrop-blur-sm border border-primary-foreground/10 rounded-lg p-6 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 block"
                  >
                    <div className="w-10 h-10 rounded bg-oxford-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-5 w-5 text-oxford-gold" />
                    </div>
                    <h2 className="text-xl font-serif font-semibold text-foreground mb-1">
                      {program.title}
                    </h2>
                    <span className="text-oxford-gold text-sm font-medium">
                      {program.count}
                    </span>
                    <p className="text-foreground/70 text-sm mt-3">
                      {program.description}
                    </p>
                    <div className="mt-4 flex items-center text-foreground/80 text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-11 px-8 bg-oxford-gold hover:bg-oxford-gold/90 text-foreground transition-colors"
              >
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramsPage;
