export interface TimelineItem {
  id: string;
  month: string;
  monthShort: string;
  degree: number;
  variant: "large" | "medium";
  title: string;
  description: string;
  stats?: {
    label: string;
    value: string;
  }[];
  emoji?: string;
}

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "jan",
    month: "January",
    monthShort: "Jan",
    degree: 0,
    variant: "large",
    title: "Fresh Start",
    description: "You kicked off the year with Super searches.",
    stats: [
      { label: "Questions", value: "52" },
      { label: "Saved", value: "6h" },
    ],
    emoji: "🚀",
  },
  {
    id: "feb",
    month: "February",
    monthShort: "Feb",
    degree: 15,
    variant: "medium",
    title: "Building Momentum",
    description: "Finding answers faster across your tools.",
    stats: [
      { label: "Questions", value: "61" },
      { label: "Sources", value: "5" },
    ],
    emoji: "📈",
  },
  {
    id: "mar",
    month: "March",
    monthShort: "Mar",
    degree: 30,
    variant: "large",
    title: "Super User",
    description: "You connected 2 new sources to Super this month.",
    stats: [
      { label: "Questions", value: "78" },
      { label: "New sources", value: "2" },
    ],
    emoji: "⚡",
  },
  {
    id: "apr",
    month: "April",
    monthShort: "Apr",
    degree: 45,
    variant: "medium",
    title: "Slack Champion",
    description: "Most of your questions came from Slack this month.",
    stats: [
      { label: "Questions", value: "65" },
      { label: "Via Slack", value: "78%" },
    ],
    emoji: "💬",
  },
  {
    id: "may",
    month: "May",
    monthShort: "May",
    degree: 60,
    variant: "medium",
    title: "Workflow Wizard",
    description: "You discovered custom assistants and workflows.",
    stats: [
      { label: "Questions", value: "72" },
      { label: "Workflows", value: "12" },
    ],
    emoji: "🤖",
  },
  {
    id: "jun",
    month: "June",
    monthShort: "Jun",
    degree: 75,
    variant: "large",
    title: "Team Player",
    description: "Your searches helped 5 teammates find answers.",
    stats: [
      { label: "Questions", value: "84" },
      { label: "Helped", value: "5" },
    ],
    emoji: "🤝",
  },
  {
    id: "jul",
    month: "July",
    monthShort: "Jul",
    degree: 90,
    variant: "medium",
    title: "Summer Surge",
    description: "Steady searching through the summer months.",
    stats: [
      { label: "Questions", value: "71" },
      { label: "Saved", value: "8h" },
    ],
    emoji: "☀️",
  },
  {
    id: "aug",
    month: "August",
    monthShort: "Aug",
    degree: 105,
    variant: "medium",
    title: "Extension Explorer",
    description: "You started using the Chrome extension more.",
    stats: [
      { label: "Questions", value: "89" },
      { label: "Extension", value: "45%" },
    ],
    emoji: "🌐",
  },
  {
    id: "sep",
    month: "September",
    monthShort: "Sep",
    degree: 120,
    variant: "large",
    title: "Peak Performance",
    description: "Your busiest month with Super all year!",
    stats: [
      { label: "Questions", value: "102" },
      { label: "Accuracy", value: "98%" },
    ],
    emoji: "🔥",
  },
  {
    id: "oct",
    month: "October",
    monthShort: "Oct",
    degree: 135,
    variant: "large",
    title: "Streak Master",
    description: "23 consecutive days of using Super.",
    stats: [
      { label: "Questions", value: "88" },
      { label: "Streak", value: "23d" },
    ],
    emoji: "📅",
  },
  {
    id: "nov",
    month: "November",
    monthShort: "Nov",
    degree: 150,
    variant: "medium",
    title: "Knowledge Seeker",
    description: "Notion became your most-searched source.",
    stats: [
      { label: "Questions", value: "56" },
      { label: "Top source", value: "Notion" },
    ],
    emoji: "📝",
  },
  {
    id: "dec",
    month: "December",
    monthShort: "Dec",
    degree: 165,
    variant: "large",
    title: "Year in Review",
    description: "What a year of finding answers with Super!",
    stats: [
      { label: "Total", value: "847" },
      { label: "Saved", value: "94h" },
    ],
    emoji: "🎉",
  },
];

export function transformTimelineData(data: TimelineItem[], totalDegrees = 180) {
  const itemCount = data.length;
  const degreePerItem = totalDegrees / (itemCount - 1);
  
  return data.map((item, index) => ({
    ...item,
    degree: Math.round(index * degreePerItem),
  }));
}

export const PROCESSED_DATA = transformTimelineData(TIMELINE_DATA);
