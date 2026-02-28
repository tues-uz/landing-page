import { GraduationCap, Award, Users, Globe, ArrowRight, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const alumniStats = [
  {
    icon: GraduationCap,
    number: "50,000+",
    label: "Alumni Worldwide",
  },
  {
    icon: Award,
    number: "120+",
    label: "Nobel Laureates",
  },
  {
    icon: Users,
    number: "150+",
    label: "Countries Represented",
  },
  {
    icon: Globe,
    number: "85%",
    label: "Career Success Rate",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "CEO, Global Finance Corp",
    year: "Class of 2010",
    quote: "The Termez University of Economics and Service provided me with the knowledge and network that shaped my career.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Ahmed Al-Mansoori",
    role: "Senior Economist, World Bank",
    year: "Class of 2015",
    quote: "The international perspective and diverse learning environment at TUES prepared me for a global career.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Investment Director, Tech Ventures",
    year: "Class of 2018",
    quote: "The entrepreneurial spirit and innovation focus at TUES inspired me to start my own venture.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Dr. James Chen",
    role: "Chief Financial Officer, Tech Innovations",
    year: "Class of 2012",
    quote: "The rigorous curriculum and real-world applications at TUES gave me the foundation to excel in the finance industry.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    role: "Economic Policy Advisor, Government",
    year: "Class of 2016",
    quote: "TUES taught me to think critically and approach economic challenges with innovative solutions.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Robert Thompson",
    role: "Managing Director, Investment Bank",
    year: "Class of 2013",
    quote: "The alumni network and career support from TUES have been instrumental in my professional growth.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

const Alumni = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at first real testimonial
  const sliderRef = useRef<HTMLDivElement>(null);

  // Create infinite loop array: [last, ...original, first]
  const infiniteTestimonials = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];

  useEffect(() => {
    // Pause auto-play when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        return;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const timer = setInterval(() => {
      // Only advance if tab is visible
      if (!document.hidden) {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= infiniteTestimonials.length - 1) {
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = 'none';
                setCurrentIndex(1); // Reset to first real testimonial
                setTimeout(() => {
                  if (sliderRef.current) {
                    sliderRef.current.style.transition = '';
                  }
                }, 50);
              }
            }, 500);
            return next;
          }
          return next;
        });
      }
    }, 4000);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= infiniteTestimonials.length - 1) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setCurrentIndex(1);
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = '';
              }
            }, 50);
          }
        }, 500);
        return next;
      }
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            setCurrentIndex(infiniteTestimonials.length - 2);
            setTimeout(() => {
              if (sliderRef.current) {
                sliderRef.current.style.transition = '';
              }
            }, 50);
          }
        }, 500);
        return next;
      }
      return next;
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-oxford-cream/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div>
            <span className="text-oxford-gold font-medium text-sm tracking-wider uppercase">
              Our Community
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mt-3 mb-6">
              Alumni Network
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Join a global network of accomplished professionals, leaders, and innovators who are making a difference around the world. Connect with fellow alumni and stay engaged with your alma mater.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {alumniStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-4 rounded shadow-sm border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-oxford-gold/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-oxford-gold" />
                      </div>
                      <div>
                        <div className="text-2xl font-serif font-bold text-primary">
                          {stat.number}
                        </div>
                        <div className="text-xs text-foreground/70">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Join Alumni Network
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right Content - Featured Testimonial */}
          <div className="relative">
            <div className="bg-white p-8 rounded shadow-lg border border-border">
              <Quote className="h-8 w-8 text-oxford-gold/30 mb-4" />
              <p className="text-foreground text-lg leading-relaxed mb-6">
                "The Termez University of Economics and Service provided me with the knowledge and network that shaped my career. The rigorous academic program and practical experience were invaluable."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                  alt="Dr. Sarah Johnson"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">Dr. Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">CEO, Global Finance Corp</p>
                  <p className="text-xs text-oxford-gold mt-1">Class of 2010</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <h3 className="text-2xl font-serif font-semibold text-foreground text-center mb-8">
            More Alumni Stories
          </h3>
          
          <div className="relative overflow-hidden w-full">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentIndex} * 50%))`,
              }}
            >
              {infiniteTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 px-3 w-1/2"
                >
                  <div className="bg-white p-6 rounded shadow-sm border border-border hover:shadow-md transition-all duration-300 h-full">
                    <div className="flex items-start gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{testimonial.role}</p>
                        <p className="text-xs text-oxford-gold mb-3">{testimonial.year}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {testimonial.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Alumni;

