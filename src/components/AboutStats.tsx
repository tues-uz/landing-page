import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: "25,000+",
    label: "Students",
    description: "From over 150 countries worldwide",
  },
  {
    value: "412",
    label: "Professors Teachers",
    description: "Leading innovation across disciplines",
  },
  {
    value: "27,447",
    label: "IRC Fund",
    description: "A legacy of academic achievement",
  },
  {
    value: "3+",
    label: "Faculties Count",
    description: "Independent, self-governing communities",
  },
];

// Hook for counter animation
const useCounter = (target: number, duration: number = 2000, isVisible: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, isVisible]);

  return count;
};

// Component for animated text
const AnimatedText = ({ text, isVisible, delay = 0 }: { text: string; isVisible: boolean; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${delay + index * 50}ms` }}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </>
  );
};

// Component for animated stat value
const AnimatedStatValue = ({ value, isVisible, delay }: { value: string; isVisible: boolean; delay: number }) => {
  // Parse the value to extract number and suffix
  const hasPlus = value.includes("+");
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const count = useCounter(numericValue, 2000, isVisible);

  // Format the number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
  };

  return (
    <>
      {formatNumber(count)}
      {hasPlus && "+"}
    </>
  );
};

const AboutStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first trigger to prevent re-triggering
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="pt-[120px] pb-24 bg-white relative overflow-visible"
    >
      <div className="container mx-auto px-6">
        <div className="w-full">
          {/* Intro text then stats at bottom */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Heading above image */}
            <h1 className="text-4xl lg:text-5xl font-bold text-[rgb(22,22,22)] mb-10 leading-[140%]" style={{ fontFamily: "'Geist Sans', sans-serif" }}>
              About The Termez University of<br />Economics and Service
            </h1>
            {/* Image section */}
            <div className="w-full mb-12 overflow-hidden rounded-lg">
              <img
                src="/termez-university-event.png"
                alt="Grand opening or event at Termez University, featuring a diverse group of attendees in traditional and formal attire"
                className="w-full h-[360px] lg:h-[480px] object-cover"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
              {/* Chip - About us (sticky on scroll) */}
              <div className="sticky top-32 self-start">
                <span
                  className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium"
                  style={{ fontFamily: "'Geist Sans', sans-serif" }}
                >
                  About us
                </span>
              </div>

              <div className="space-y-8">
              {/* Stats - on top of heading */}
              <div className="flex flex-col flex-wrap" style={{ fontFamily: "'Geist Sans', sans-serif" }}>
                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`bg-card p-0 rounded transition-all duration-500 flex flex-col justify-between ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <div>
                        <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                          <AnimatedStatValue 
                            value={stat.value} 
                            isVisible={isVisible} 
                            delay={300 + index * 100}
                          />
                        </div>
<div className="text-sm font-normal text-foreground mb-1">
                        {stat.label}
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-semibold text-foreground leading-tight" style={{ fontFamily: "'Geist Sans', sans-serif" }}>
                <AnimatedText 
                  text="Our numbers reflect a tradition of excellence and forward-thinking impact in education, research, and innovation"
                  isVisible={isVisible}
                  delay={0}
                />
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed" style={{ fontFamily: "'Geist Sans', sans-serif" }}>
                The Termez University of Economics and Service (TUES) is a renowned Uzbekistan institution committed to advancing exceptional Medical and other Higher Education. TUES strives to produce outstanding Medical graduates from both Uzbekistan and international medical aspirants.
                <br /><br />
                TUES strongly emphasizes conducting cutting-edge research and implementing the latest teaching methods to provide outstanding clinical and other training to its students. The university offers a wide range of programs in various fields of study at both the undergraduate and graduate levels. Through its extensive network of global partnerships, TUES effectively incorporates industry-driven teaching and training techniques to support its graduates. The degrees offered by TUES, including MBBS, are recognized worldwide.
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
