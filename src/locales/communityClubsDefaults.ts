/** English fallbacks for Student life → Community clubs (`topNav` namespace). */

export const COMMUNITY_CLUBS_PAGE_DEFAULTS = {
  communityClubsPageIntro:
    "Explore student clubs, studios, and community highlights at Termez University of Economics and Service. Below are recent activities and active groups on campus.",
} as const;

export type CommunityClubCard = {
  title: string;
  imageSrc: string;
  /** When set, the whole card links to this route (detail page). */
  to?: string;
};

/** Card titles and imagery (same layout as leadership council cards). */
export const COMMUNITY_CLUB_CARDS: readonly CommunityClubCard[] = [
  {
    title: "Charity event held by the “Qizlarjon” club",
    imageSrc: "/images/community-clubs/qizlarjon-charity.png",
    to: "/student-life/community-clubs/qizlarjon-charity",
  },
  {
    title: "Participants of the student theater studio contest were solemnly awarded!",
    imageSrc: "/images/community-clubs/student-theater-studio-contest.png",
    to: "/student-life/community-clubs/student-theater-studio-contest",
  },
  {
    title: "Member of the “Mushoira” club honored",
    imageSrc: "/images/community-clubs/mushoira-club-honored.png",
    to: "/student-life/community-clubs/mushoira-club-honored",
  },
  {
    title: "Community clubs",
    imageSrc: "/images/community-clubs/community-clubs-overview.png",
    to: "/student-life/community-clubs/clubs-and-circles",
  },
  {
    title: "“Student theatre studio” contest held at TUES",
    imageSrc: "/images/community-clubs/interfaculty-student-theatre-studio-contest.png",
    to: "/student-life/community-clubs/interfaculty-student-theatre-studio-contest",
  },
  {
    title: "“The shields” of our university",
    imageSrc: "/images/community-clubs/qalqon-shields.png",
    to: "/student-life/community-clubs/qalqon-shields",
  },
  {
    title: "The “Qizlarjon” Club",
    imageSrc: "/images/community-clubs/qizlarjon-club.png",
    to: "/student-life/community-clubs/qizlarjon-club",
  },
  {
    title: "Leader girls club",
    imageSrc: "/images/community-clubs/leader-girls-club.png",
    to: "/student-life/community-clubs/leader-girls-club",
  },
  {
    title: "Fine and applied arts club",
    imageSrc: "/images/community-clubs/fine-and-applied-arts-club.png",
    to: "/student-life/community-clubs/fine-and-applied-arts-club",
  },
  {
    title: "Youth Leaders",
    imageSrc: "/images/community-clubs/youth-leaders.png",
    to: "/student-life/community-clubs/youth-leaders",
  },
];
