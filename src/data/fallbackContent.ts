import type { NewsItem, EventItem } from "@/api/client";

export const FALLBACK_NEWS: NewsItem[] = [
    {
        id: "static-1",
        slug: "breakthrough-quantum-computing",
        category: "Research",
        title: "The Termez University of Economics and Service Scientists Make Breakthrough in Quantum Computing",
        excerpt: "Researchers have achieved a significant milestone in quantum error correction.",
        date: "Dec 14, 2025",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
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
        id: "static-2",
        slug: "sustainable-building-opens",
        category: "Campus",
        title: "New Sustainable Building Opens at Radcliffe Observatory Quarter",
        excerpt: "The state-of-the-art facility sets new standards for environmental design.",
        date: "Dec 12, 2025",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
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
        id: "static-3",
        slug: "professors-national-academy",
        category: "Awards",
        title: "Three TUES Professors Named to National Academy of Sciences",
        excerpt: "Recognition for outstanding contributions to their respective fields.",
        date: "Dec 10, 2025",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
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
        id: "static-4",
        slug: "international-exchange-program",
        category: "Partnerships",
        title: "New International Exchange Program Launched with European Universities",
        excerpt: "Students can now spend a semester abroad at partner institutions across Europe.",
        date: "Dec 8, 2025",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
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
        id: "static-5",
        slug: "innovation-hackathon-record",
        category: "Student Life",
        title: "Annual Innovation Hackathon Draws Record Participation",
        excerpt: "Over 200 students competed in this year's 48-hour innovation challenge.",
        date: "Dec 5, 2025",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
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
        id: "static-6",
        slug: "groundbreaking-study-regional-trade",
        category: "Research",
        title: "Economics Department Publishes Groundbreaking Study on Regional Trade",
        excerpt: "New research highlights opportunities for cross-border economic cooperation.",
        date: "Dec 2, 2025",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
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

export const FALLBACK_EVENTS: EventItem[] = [
    {
        id: "static-evt-1",
        title: "Annual Christmas Carol Service",
        date: "Dec 20",
        time: "7:00 PM",
        location: "Christ Church Cathedral",
    },
    {
        id: "static-evt-2",
        title: "Graduate Open Day 2025",
        date: "Jan 15",
        time: "10:00 AM",
        location: "Multiple Colleges",
    },
    {
        id: "static-evt-3",
        title: "Public Lecture: The Future of AI",
        date: "Jan 22",
        time: "5:30 PM",
        location: "Sheldonian Theatre",
    },
    {
        id: "static-evt-4",
        title: "Research Symposium 2025",
        date: "Feb 5",
        time: "9:00 AM",
        location: "Main Conference Hall",
    },
    {
        id: "static-evt-5",
        title: "International Student Welcome",
        date: "Feb 12",
        time: "2:00 PM",
        location: "University Auditorium",
    },
    {
        id: "static-evt-6",
        title: "Career Fair 2025",
        date: "Feb 28",
        time: "10:00 AM",
        location: "Exhibition Center",
    },
];
