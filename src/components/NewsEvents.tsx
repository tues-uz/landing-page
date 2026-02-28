import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const news = [
  {
    id: 1,
    category: "Research",
    title: "The Termez University of Economics and Service Scientists Make Breakthrough in Quantum Computing",
    excerpt:
      "Researchers have achieved a significant milestone in quantum error correction.",
    date: "Dec 14, 2025",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    category: "Campus",
    title: "New Sustainable Building Opens at Radcliffe Observatory Quarter",
    excerpt:
      "The state-of-the-art facility sets new standards for environmental design.",
    date: "Dec 12, 2025",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    category: "Awards",
    title: "Three The Termez University of Economics and Service Professors Named to National Academy of Sciences",
    excerpt:
      "Recognition for outstanding contributions to their respective fields.",
    date: "Dec 10, 2025",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
  },
];

const events = [
  {
    id: 1,
    title: "Annual Christmas Carol Service",
    date: "Dec 20",
    time: "7:00 PM",
    location: "Christ Church Cathedral",
  },
  {
    id: 2,
    title: "Graduate Open Day 2025",
    date: "Jan 15",
    time: "10:00 AM",
    location: "Multiple Colleges",
  },
  {
    id: 3,
    title: "Public Lecture: The Future of AI",
    date: "Jan 22",
    time: "5:30 PM",
    location: "Sheldonian Theatre",
  },
  {
    id: 4,
    title: "Research Symposium 2025",
    date: "Feb 5",
    time: "9:00 AM",
    location: "Main Conference Hall",
  },
  {
    id: 5,
    title: "International Student Welcome",
    date: "Feb 12",
    time: "2:00 PM",
    location: "University Auditorium",
  },
  {
    id: 6,
    title: "Career Fair 2025",
    date: "Feb 28",
    time: "10:00 AM",
    location: "Exhibition Center",
  },
];

const NewsEvents = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`,
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-oxford-gold font-medium text-sm tracking-wider uppercase">
              Stay Informed
            </span>
            <h2 className="text-4xl font-serif font-semibold text-foreground mt-2">
              News & Events
            </h2>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80 group self-start lg:self-auto">
            View all news
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {news.slice(0, 2).map((item) => (
              <article
                key={item.id}
                className="group bg-card rounded overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-oxford-gold text-xs font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-serif font-semibold text-foreground mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  <span className="text-muted-foreground text-xs">{item.date}</span>
                </div>
              </article>
            ))}
            
            {/* Featured news - larger card */}
            <article className="sm:col-span-2 group bg-primary rounded overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="grid md:grid-cols-2">
                <div className="relative w-full h-64 md:h-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                    }}
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-oxford-gold text-xs font-medium uppercase tracking-wider">
                    {news[2].category}
                  </span>
                  <h3 className="text-xl font-serif font-semibold text-primary-foreground mt-2 mb-3">
                    {news[2].title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">
                    {news[2].excerpt}
                  </p>
                  <Button variant="outline" className="self-start border-primary-foreground/30 text-black hover:bg-primary-foreground hover:text-primary">
                    Read More
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* Events Sidebar */}
          <div className="bg-gray-100 rounded p-6">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-oxford-gold" />
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-card p-4 rounded border border-border hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex gap-4">
                    <div className="text-center min-w-[50px]">
                      <div className="text-2xl font-serif font-bold text-primary">
                        {event.date.split(" ")[0]}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {event.date.split(" ")[1]}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        {event.title}
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        {event.time} • {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary/80">
              View all events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
