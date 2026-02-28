import { Camera, Users, Music, BookOpen, Trophy, Heart, Palette, Gamepad2 } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Photography Club",
    category: "Arts & Media",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=400&fit=crop",
    icon: Camera,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "Debate Society",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
    icon: Users,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Music Ensemble",
    category: "Performing Arts",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    icon: Music,
    color: "bg-gradient-to-br from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "Book Club",
    category: "Literature",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    icon: BookOpen,
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "Sports Teams",
    category: "Athletics",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    icon: Trophy,
    color: "bg-gradient-to-br from-yellow-500 to-orange-500",
  },
  {
    id: 6,
    title: "Volunteer Network",
    category: "Community",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    icon: Heart,
    color: "bg-gradient-to-br from-pink-500 to-rose-500",
  },
  {
    id: 7,
    title: "Art Studio",
    category: "Visual Arts",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
    icon: Palette,
    color: "bg-gradient-to-br from-indigo-500 to-purple-500",
  },
  {
    id: 8,
    title: "Gaming Club",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
    icon: Gamepad2,
    color: "bg-gradient-to-br from-teal-500 to-blue-500",
  },
];

const StudentActivities = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Magazine Header */}
        <div className="mb-16 border-b-2 border-foreground/10 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 mb-2 block">
                Campus Life
              </span>
              <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
                Student<br />Activities
              </h2>
            </div>
            <p className="text-foreground/70 text-lg max-w-md lg:text-right leading-relaxed">
              Discover vibrant student life through clubs, societies, and activities that enrich your university experience.
            </p>
          </div>
        </div>

        {/* Magazine Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-6">
          {/* Large Featured - Left Column */}
          <div className="lg:col-span-7 group relative overflow-hidden rounded shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer h-[500px] lg:h-[600px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ 
                backgroundImage: `url(${activities[0].image})`,
                willChange: 'transform'
              }}
            >
              <div className={`absolute inset-0 ${activities[0].color} opacity-60 group-hover:opacity-50 transition-opacity duration-500`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8 lg:p-12 text-white">
              <div className="mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-white/80 mb-3 block">
                  Featured
                </span>
                <span className="text-sm font-medium uppercase tracking-wider text-white/90 mb-4 block">
                  {activities[0].category}
                </span>
              </div>
              <h3 className="text-4xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
                {activities[0].title}
              </h3>
              <p className="text-white/90 text-lg max-w-xl leading-relaxed mb-6">
                Join our vibrant community of photographers and capture the beauty of campus life through your lens.
              </p>
              <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <span className="text-sm font-medium uppercase tracking-wider">Read Story</span>
                <span className="text-2xl">→</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stack */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-6">
            {/* Top Right - Medium */}
            <div className="group relative overflow-hidden rounded shadow-lg hover:shadow-xl transition-all duration-700 cursor-pointer h-[280px] lg:h-[290px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${activities[1].image})` }}
              >
                <div className={`absolute inset-0 ${activities[1].color} opacity-70 group-hover:opacity-60 transition-opacity duration-500`} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2 block">
                  {activities[1].category}
                </span>
                <h3 className="text-2xl font-serif font-bold leading-tight">
                  {activities[1].title}
                </h3>
              </div>
            </div>

            {/* Bottom Right - Medium */}
            <div className="group relative overflow-hidden rounded shadow-lg hover:shadow-xl transition-all duration-700 cursor-pointer h-[280px] lg:h-[290px]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${activities[2].image})` }}
              >
                <div className={`absolute inset-0 ${activities[2].color} opacity-70 group-hover:opacity-60 transition-opacity duration-500`} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2 block">
                  {activities[2].category}
                </span>
                <h3 className="text-2xl font-serif font-bold leading-tight">
                  {activities[2].title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - 4 Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          {activities.slice(3, 7).map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="group relative overflow-hidden rounded shadow-md hover:shadow-xl transition-all duration-700 cursor-pointer h-[300px] lg:h-[350px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${activity.image})` }}
                >
                  <div className={`absolute inset-0 ${activity.color} opacity-75 group-hover:opacity-65 transition-opacity duration-500`} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative h-full flex flex-col justify-between p-5 text-white">
                  <div className="w-10 h-10 rounded bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1 block">
                      {activity.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold leading-tight">
                      {activity.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Feature - Full Width with Text Overlay */}
        <div className="group relative overflow-hidden rounded shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer h-[400px] lg:h-[450px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${activities[7].image})` }}
          >
            <div className={`absolute inset-0 ${activities[7].color} opacity-70 group-hover:opacity-60 transition-opacity duration-500`} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="relative h-full flex items-center p-8 lg:p-16 text-white">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {(() => {
                    const Icon = activities[7].icon;
                    return <Icon className="h-8 w-8" />;
                  })()}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-1 block">
                    {activities[7].category}
                  </span>
                  <h3 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
                    {activities[7].title}
                  </h3>
                </div>
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-6 max-w-xl">
                Join competitive gaming tournaments, connect with fellow gamers, and showcase your skills in our state-of-the-art gaming facilities.
              </p>
              <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <span className="text-sm font-medium uppercase tracking-wider">Join Now</span>
                <span className="text-2xl">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Magazine Footer */}
        <div className="mt-16 pt-8 border-t-2 border-foreground/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-foreground/60 text-sm italic">
              "The best way to find yourself is to lose yourself in the service of others."
            </p>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 py-2 bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-400 hover:border-yellow-500 text-[13px] px-4 self-start lg:self-auto">
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentActivities;

