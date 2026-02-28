import { Box, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VirtualTour = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-oxford-cream/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-oxford-gold font-medium text-sm tracking-wider uppercase">
            Explore Our Campus
          </span>
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mt-3 mb-6">
            Take a Virtual Tour
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
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

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded shadow-sm border border-border hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 rounded bg-oxford-gold/20 flex items-center justify-center mb-4">
              <MapPin className="h-5 w-5 text-oxford-gold" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Interactive Maps</h3>
            <p className="text-muted-foreground text-sm">
              Navigate through our campus with detailed interactive maps
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-sm border border-border hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 rounded bg-oxford-gold/20 flex items-center justify-center mb-4">
              <Clock className="h-5 w-5 text-oxford-gold" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">360° Views</h3>
            <p className="text-muted-foreground text-sm">
              Experience panoramic views of classrooms, labs, and facilities
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-sm border border-border hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 rounded bg-oxford-gold/20 flex items-center justify-center mb-4">
              <Users className="h-5 w-5 text-oxford-gold" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Guided Tours</h3>
            <p className="text-muted-foreground text-sm">
              Follow expert-guided tours with detailed explanations
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-sm border border-border hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 rounded bg-oxford-gold/20 flex items-center justify-center mb-4">
              <Box className="h-5 w-5 text-oxford-gold" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Video Tours</h3>
            <p className="text-muted-foreground text-sm">
              Watch immersive video tours of key campus locations
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            Start Virtual Tour
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;

