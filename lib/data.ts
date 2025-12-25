export interface WrappedSlide {
  id: string;
  type: "intro" | "stat" | "highlight" | "personality" | "outro";
}

export interface UserStats {
  name: string;
  year: number;

  // Core Super Usage
  totalQuestions: number;
  questionsAnswered: number;
  timeSavedHours: number;
  searchAccuracy: number;

  // Usage Patterns
  peakUsageDay: string;
  peakUsageHour: string;
  mostActiveMonth: string;
  longestStreak: number;

  // Sources & Integrations
  connectedSources: number;
  favoriteSource: string;
  sourcesSearched: string[];

  // Where Super is Used
  slackQuestions: number;
  chromeExtensionQuestions: number;
  webAppQuestions: number;

  // Assistants & Workflows
  customAssistantsUsed: number;
  favoriteAssistant: string;
  workflowsRun: number;
  
  // Top Assistants used
  topAssistants: { name: string; runs: number; color: string }[];

  // Topics & Themes
  topSearchTopics: string[];
  questionsPerTopic: Record<string, number>;

  // Team Impact
  questionsDeflected: number;
  colleaguesHelped: number;

  // Fun Stats
  fastestAnswer: string;
  longestQuery: number;
  lateNightSearches: number;
  weekendSearches: number;

  // Archetype
  archetype: {
    name: string;
    emoji: string;
    description: string;
    trait1: string;
    trait2: string;
    trait3: string;
  };

  // Monthly activity
  monthlyQuestions: { month: string; count: number }[];
}

export const userStats: UserStats = {
  name: "Alex",
  year: 2025,

  // Core Super Usage
  totalQuestions: 12847,
  questionsAnswered: 12634,
  timeSavedHours: 847,
  searchAccuracy: 99,

  // Usage Patterns
  peakUsageDay: "Tuesday",
  peakUsageHour: "10 AM",
  mostActiveMonth: "September",
  longestStreak: 147,

  // Sources & Integrations
  connectedSources: 14,
  favoriteSource: "Notion",
  sourcesSearched: ["Notion", "Slack", "Google Drive", "Confluence", "GitHub", "Linear", "Intercom", "Figma", "Jira", "Asana", "Dropbox", "Salesforce", "HubSpot", "Zendesk"],

  // Where Super is Used
  slackQuestions: 6847,
  chromeExtensionQuestions: 4123,
  webAppQuestions: 1877,

  // Assistants & Workflows
  customAssistantsUsed: 12,
  favoriteAssistant: "Weekly Digest",
  workflowsRun: 2341,
  
  // Top Assistants used
  topAssistants: [
    { name: "Weekly Digest", runs: 487, color: "#FDE7B5" },
    { name: "Summarize feedback", runs: 342, color: "#B3E4FE" },
    { name: "Create changelog", runs: 289, color: "#FDE7B5" },
    { name: "Top customers", runs: 234, color: "#F8CFFC" },
    { name: "Competitor analysis", runs: 198, color: "#B3E4FE" },
    { name: "Meeting notes", runs: 156, color: "#FDE7B5" },
  ],

  // Topics & Themes
  topSearchTopics: ["Product specs", "Customer data", "Engineering docs"],
  questionsPerTopic: {
    "Product specs": 3847,
    "Customer data": 2956,
    "Engineering docs": 2341,
    "HR & Policies": 1847,
    "Sales materials": 1856,
  },

  // Team Impact
  questionsDeflected: 4521,
  colleaguesHelped: 147,

  // Fun Stats
  fastestAnswer: "0.3s",
  longestQuery: 2847,
  lateNightSearches: 347,
  weekendSearches: 892,

  // Archetype
  archetype: {
    name: "The Knowledge Architect",
    emoji: "🏛️",
    description: "You don't just find answers—you build systems. Your mastery of Super has transformed how your entire team accesses knowledge.",
    trait1: "Visionary",
    trait2: "Systematic",
    trait3: "Influential",
  },

  // Monthly activity
  monthlyQuestions: [
    { month: "Jan", count: 847 },
    { month: "Feb", count: 923 },
    { month: "Mar", count: 1156 },
    { month: "Apr", count: 1089 },
    { month: "May", count: 1234 },
    { month: "Jun", count: 1456 },
    { month: "Jul", count: 1123 },
    { month: "Aug", count: 1347 },
    { month: "Sep", count: 1567 },
    { month: "Oct", count: 1289 },
    { month: "Nov", count: 956 },
    { month: "Dec", count: 860 },
  ],
};

export const slides: WrappedSlide[] = [
  { id: "intro", type: "intro" },
  { id: "journey", type: "highlight" },
  { id: "search-habits", type: "highlight" },
  { id: "impact", type: "stat" },
  { id: "fun-stats", type: "highlight" },
  { id: "archetype", type: "personality" },
  { id: "usage-overview", type: "stat" },
  { id: "outro", type: "outro" },
];
