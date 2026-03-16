import { Box, ArrowRight } from "lucide-react";

const VirtualTour = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1348px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-oxford-gold font-medium text-sm tracking-wider uppercase">
            Explore Our Campus
          </span>
          <h2 className="text-4xl lg:text-5xl text-foreground mt-3 mb-6">
            Take a Virtual Tour
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Discover our state-of-the-art facilities, beautiful campus grounds, and modern learning environments from anywhere in the world.
          </p>
        </div>

        {/* Main Video Section */}
        <div className="relative mb-12 rounded overflow-hidden shadow-2xl">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-black/50 hover:bg-black/60 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-10">
                <Box className="h-8 w-8" />
              </button>
            </div>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`,
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            className="inline-flex h-11 shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-xl border border-oxford-blue bg-oxford-blue px-8 text-sm font-medium text-white transition-colors hover:bg-oxford-blue/90 hover:border-oxford-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxford-blue focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
          >
            <span className="whitespace-nowrap">Start Virtual Tour</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;

