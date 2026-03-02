import { ArrowRight, Calendar, MessageCircle, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export type NewsSection = { heading: string; paragraphs: string[] };

export const news = [
  {
    id: 1,
    slug: "breakthrough-quantum-computing",
    category: "Research",
    title: "The Termez University of Economics and Service Scientists Make Breakthrough in Quantum Computing",
    excerpt:
      "Researchers have achieved a significant milestone in quantum error correction.",
    date: "Dec 14, 2025",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    author: "Dr. Sarah Johnson",
    readTime: "5 min read",
    body: [
      {
        heading: "Real-Time Insights",
        paragraphs: [
          "Researchers at TUES have achieved a significant milestone in quantum error correction, bringing practical quantum computing closer to reality. The team's approach allows quantum systems to maintain coherence longer, which is essential for running complex algorithms.",
          "The breakthrough centers on a new method of detecting and correcting errors without destroying the quantum state. This could reduce the overhead required for fault-tolerant quantum computation and accelerate the path to scalable quantum computers.",
        ],
      },
      {
        heading: "Scalability and Flexibility",
        paragraphs: [
          "The new technique is designed to scale with the number of qubits, making it suitable for future large-scale quantum processors. Unlike some previous approaches, it does not require prohibitively expensive hardware upgrades.",
          "Industry partners have expressed interest in collaborating on next-phase experiments. The university is seeking funding to build a dedicated lab for quantum research.",
        ],
      },
      {
        heading: "Impact on Research and Education",
        paragraphs: [
          "The findings will be integrated into graduate courses in physics and computer science. TUES plans to offer a new elective on quantum information from next academic year.",
          "This achievement underscores TUES's commitment to cutting-edge research and positions the university as a key player in the regional quantum research landscape.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "sustainable-building-opens",
    category: "Campus",
    title: "New Sustainable Building Opens at Radcliffe Observatory Quarter",
    excerpt:
      "The state-of-the-art facility sets new standards for environmental design.",
    date: "Dec 12, 2025",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
    author: "James Wilson",
    readTime: "4 min read",
    body: [
      {
        heading: "Design and Sustainability",
        paragraphs: [
          "The state-of-the-art facility sets new standards for environmental design. Solar panels, rainwater harvesting, and smart climate control reduce the building's carbon footprint while providing a comfortable learning environment.",
          "The building houses the Department of Environmental Economics and will serve as a living lab for students studying sustainable development.",
        ],
      },
      {
        heading: "Spaces for Collaboration",
        paragraphs: [
          "Open-plan floors and breakout zones encourage collaboration between faculty and students. The atrium will host university events and public lectures.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "professors-national-academy",
    category: "Awards",
    title: "Three TUES Professors Named to National Academy of Sciences",
    excerpt:
      "Recognition for outstanding contributions to their respective fields.",
    date: "Dec 10, 2025",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    author: "University Communications",
    readTime: "3 min read",
    body: [
      {
        heading: "Recognition for Excellence",
        paragraphs: [
          "Three TUES professors have been elected to the National Academy of Sciences in recognition of their outstanding contributions to economics, data science, and policy research.",
          "Membership is one of the highest honors in academia and reflects decades of impactful research and teaching.",
        ],
      },
      {
        heading: "Looking Ahead",
        paragraphs: [
          "The new members will participate in academy committees and advise on national science policy. They will also mentor early-career researchers at TUES.",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "international-exchange-program",
    category: "Partnerships",
    title: "New International Exchange Program Launched with European Universities",
    excerpt:
      "Students can now spend a semester abroad at partner institutions across Europe.",
    date: "Dec 8, 2025",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
    author: "Maria Garcia",
    readTime: "4 min read",
    body: [
      {
        heading: "Expanding Opportunities",
        paragraphs: [
          "Students can now spend a semester abroad at partner institutions across Europe. The new agreements cover economics, business, and social sciences and include tuition waivers and support for visas and housing.",
          "Applications for the next academic year open in January. Places are limited and competitive.",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "innovation-hackathon-record",
    category: "Student Life",
    title: "Annual Innovation Hackathon Draws Record Participation",
    excerpt:
      "Over 200 students competed in this year's 48-hour innovation challenge.",
    date: "Dec 5, 2025",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    author: "Tech Campus",
    readTime: "4 min read",
    body: [
      {
        heading: "A Weekend of Innovation",
        paragraphs: [
          "Over 200 students competed in this year's 48-hour innovation challenge. Teams tackled real problems posed by local businesses and NGOs, with prizes for the best solutions in sustainability, education, and health.",
          "Winning projects will receive mentorship and the chance to pitch to investors at the annual TUES Startup Day.",
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "groundbreaking-study-regional-trade",
    category: "Research",
    title: "Economics Department Publishes Groundbreaking Study on Regional Trade",
    excerpt:
      "New research highlights opportunities for cross-border economic cooperation.",
    date: "Dec 2, 2025",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    author: "Dr. Ahmed Hassan",
    readTime: "5 min read",
    body: [
      {
        heading: "Key Findings",
        paragraphs: [
          "New research from the Economics Department highlights opportunities for cross-border economic cooperation. The study models trade flows and identifies sectors where regional integration could boost growth and employment.",
          "The report has been shared with policy makers and will be presented at an international conference next month.",
        ],
      },
      {
        heading: "Methodology and Data",
        paragraphs: [
          "The team used a combination of official statistics and firm-level data to build a detailed picture of current trade patterns and potential gains from reduced barriers.",
        ],
      },
    ],
  },
];

export const getNewsBySlug = (slug: string) => news.find((n) => n.slug === slug);

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
        {/* Section Title */}
        <h2 className="text-4xl font-serif font-semibold text-foreground mb-2">
          News and Events
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Stay up to date with the latest from TUES—research highlights, campus updates, and upcoming events.
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* News section - left cards + center featured */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Latest News
              </p>
              <Link
                to="/#news"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid lg:grid-cols-9 gap-6">
            {/* Left column - Stacked article cards (related-article style) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Featured card */}
            <Link
              to={`/news/${news[1].slug}`}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md"
            >
              <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground">
                  Featured
                </span>
                <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                  {news[1].title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{"author" in news[1] ? news[1].author : "TUES"}</span>
                  <span>on {news[1].date}</span>
                </div>
              </div>
              <div className="w-full px-2 pb-2">
                <img
                  src={news[1].image}
                  alt={news[1].title}
                  className="aspect-[334/188] w-full rounded-lg object-cover"
                />
              </div>
            </Link>
            {/* Second card */}
            {news.slice(2, 3).map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md"
              >
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{"author" in item ? item.author : "TUES"}</span>
                    <span>on {item.date}</span>
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

            {/* Center - Large featured (same card style) */}
            <div className="lg:col-span-6 flex flex-col min-h-0">
            <Link
              to={`/news/${news[0].slug}`}
              className="flex flex-col h-full min-h-0 overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md group"
            >
              <div className="relative min-h-0 flex-1 w-full overflow-hidden px-2 pt-2 xl:px-4 xl:pt-4">
                <img
                  src={news[0].image}
                  alt={news[0].title}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5 xl:p-6">
                <span className="inline-flex w-fit rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground">
                  {news[0].category}
                </span>
                <h2 className="text-xl font-bold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors xl:text-2xl">
                  {news[0].title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {news[0].excerpt}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{"author" in news[0] ? news[0].author : "TUES"}</span>
                  <span>on {news[0].date}</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    0 Comments
                  </span>
                </div>
              </div>
            </Link>
            </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Upcoming Events
              </p>
              <Link
                to="/#events"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md hover:border-primary/20 cursor-pointer"
                >
                  <div className="flex">
                    {/* Date strip - left accent */}
                    <div className="flex min-w-[56px] flex-col items-center justify-center rounded-l-xl bg-primary/5 py-3 px-2">
                      <span className="text-xl font-serif font-bold leading-none text-primary">
                        {event.date.split(" ")[0]}
                      </span>
                      <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {event.date.split(" ")[1]}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-center gap-1.5 p-4 pl-4">
                      <h4 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h4>
                      <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
