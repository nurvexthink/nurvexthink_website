/**
 * Site content / sample data for NurvexThink.
 * Plain, serializable data consumed by Server Components. Icons are referenced by
 * string key and mapped to lucide components where rendered.
 */

export const siteConfig = {
  name: "NurvexThink",
  tagline: "Software, built and published.",
  description:
    "A software studio that designs, builds, and ships products — and takes custom software on demand.",
  email: "nurvexthink@gmail.com",
  founded: "2026",
  socials: [
    { label: "GitHub", href: "https://github.com/nurvexthink" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

export type Stat = { value: string; label: string };
export const stats: Stat[] = [
  { value: "100%", label: "Built & owned in-house" },
  { value: "< 1 wk", label: "From kickoff to a preview link" },
  { value: "24/7", label: "Uptime monitoring on what we ship" },
  { value: "2026", label: "Studio founded" },
];

export type Service = {
  icon: string;
  title: string;
  description: string;
};
export const services: Service[] = [
  {
    icon: "Rocket",
    title: "Published products",
    description:
      "We build and launch our own software, then put it in your hands — explore the catalog and use it today.",
  },
  {
    icon: "Workflow",
    title: "Custom software on demand",
    description:
      "Tell us the problem. We scope it, design it, and deliver the system that solves it — end to end.",
  },
  {
    icon: "Code2",
    title: "Product engineering",
    description:
      "Web and mobile apps built to ship, from first commit to production, with a preview link from day one.",
  },
  {
    icon: "Sparkles",
    title: "Design & interface",
    description:
      "Interfaces that feel considered: clear, fast, accessible, and unmistakably on-brand.",
  },
  {
    icon: "Database",
    title: "Cloud & data",
    description:
      "Databases, deploys, and pipelines that stay up under load and scale back down to near-zero cost.",
  },
  {
    icon: "Cpu",
    title: "AI features",
    description:
      "Practical AI woven into products — search, assistants, and automation that earn their place.",
  },
];

export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  status: "Live" | "Beta" | "Soon";
  tags: string[];
  year: string;
  liveUrl: string;
};
export const products: Product[] = [
  {
    slug: "fluxboard",
    name: "FluxBoard",
    category: "Productivity",
    summary: "A keyboard-first project board that turns standups into shipped work.",
    description:
      "FluxBoard is a fast, keyboard-driven board for small teams. Plan, assign, and move work without lifting your hands off the keys — with realtime sync so everyone sees the same board.",
    status: "Live",
    tags: ["Next.js", "Realtime", "Postgres"],
    year: "2026",
    liveUrl: "#",
  },
  {
    slug: "pulse",
    name: "Pulse",
    category: "Analytics",
    summary: "Product analytics that answer one question: what did people actually do?",
    description:
      "Pulse is privacy-first product analytics. Track the events that matter, build funnels in seconds, and get a weekly digest of what changed — no cookie banners, no bloat.",
    status: "Live",
    tags: ["Analytics", "Edge", "Charts"],
    year: "2026",
    liveUrl: "#",
  },
  {
    slug: "ledger",
    name: "Ledger",
    category: "Finance",
    summary: "Invoicing for people who would rather be building than billing.",
    description:
      "Ledger turns a project into a paid invoice in two clicks. Recurring billing, reminders, and clean exports your accountant will actually thank you for.",
    status: "Beta",
    tags: ["Payments", "PDF", "Stripe"],
    year: "2026",
    liveUrl: "#",
  },
  {
    slug: "draft",
    name: "Draft",
    category: "AI",
    summary: "An AI writing desk that drafts with your voice, not a robot's.",
    description:
      "Draft learns how you write and helps you go from blank page to finished piece — outlines, rewrites, and tone control, with you always in the driver's seat.",
    status: "Beta",
    tags: ["AI", "Editor", "Streaming"],
    year: "2026",
    liveUrl: "#",
  },
  {
    slug: "shipgate",
    name: "ShipGate",
    category: "Developer tools",
    summary: "Preview every change before it ships — a link for every pull request.",
    description:
      "ShipGate spins up a live preview for every branch, runs your checks, and posts the link back to the PR so reviewers see the real thing, not a screenshot.",
    status: "Live",
    tags: ["CI/CD", "Previews", "DX"],
    year: "2026",
    liveUrl: "#",
  },
  {
    slug: "vault",
    name: "Vault",
    category: "Security",
    summary: "Encrypted documents you can share without holding your breath.",
    description:
      "Vault keeps sensitive documents end-to-end encrypted, with expiring links, access logs, and zero plaintext on our servers. Share confidently, revoke instantly.",
    status: "Soon",
    tags: ["E2E", "Storage", "Audit"],
    year: "2026",
    liveUrl: "#",
  },
];

export type ProcessStep = { step: string; title: string; description: string };
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Scope",
    description:
      "We map the problem, agree on what success looks like, and hand you a plan you can actually see — not a black box.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "Short cycles with working software every week and a preview link from day one, so there are no surprises at the end.",
  },
  {
    step: "03",
    title: "Ship & support",
    description:
      "We launch, watch the metrics, and keep improving what we shipped — monitoring and fixes included.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  content: string[];
};
export const blogPosts: BlogPost[] = [
  {
    slug: "why-we-publish-our-own-software",
    title: "Why we publish our own software",
    excerpt:
      "Building products we run ourselves keeps us honest. Here's how shipping our own tools makes the client work better.",
    category: "Studio",
    date: "2026-06-18",
    readingTime: "4 min",
    author: "Fatima Abdul Raheem",
    content: [
      "Every studio says it cares about quality. Running our own products is how we prove it to ourselves. When we depend on the same tools we sell, we feel every slow load, every confusing screen, every surprise bill — and we fix them before a client ever would.",
      "Publishing our software also keeps our skills honest. There's nowhere to hide when real users show up: the database has to hold, the deploy has to work, the design has to make sense without a sales call. That pressure is the best teacher we've found.",
      "So the catalog isn't a side project. It's our research lab, our portfolio, and our promise — the clearest way to show what we'd build for you by showing what we've already built for ourselves.",
    ],
  },
  {
    slug: "a-preview-link-from-day-one",
    title: "A preview link from day one",
    excerpt:
      "The single practice that removes the most risk from a software project: making the work visible before it's done.",
    category: "Engineering",
    date: "2026-06-05",
    readingTime: "6 min",
    author: "Muhammad Ali",
    content: [
      "The riskiest moment in any software project is the big reveal — weeks of work shown for the first time at the end, when changing direction is expensive. We remove that risk with one habit: a live preview link from the first day.",
      "From day one, every change is deployed somewhere you can click. You don't read a status report; you use the product as it grows. Misunderstandings surface in hours, not at launch, and feedback lands while it's still cheap to act on.",
      "It sounds simple, and it is — but it changes the whole relationship. The work stops being a black box and becomes a shared, visible thing. That trust is worth more than any amount of documentation.",
    ],
  },
  {
    slug: "dark-mode-is-a-feature-not-a-toggle",
    title: "Dark mode is a feature, not a toggle",
    excerpt:
      "Designing for both themes from the start changes how you pick color. A short tour of the system behind this very site.",
    category: "Design",
    date: "2026-05-22",
    readingTime: "5 min",
    author: "Fatima Abdul Raheem",
    content: [
      "Dark mode bolted on at the end always looks bolted on. Colors that were picked for a white page turn muddy on black, contrast breaks, and the toggle becomes a compromise instead of a choice.",
      'We design both themes from the start using semantic tokens — background, foreground, muted, primary — instead of hard-coded colors. Components ask for "the foreground color," and the theme decides what that means. Switching themes is then just swapping a small set of values, not rewriting the UI.',
      "This site is built that way. The navy-and-silver of our logo carries through both modes, and an indigo accent ties them together. Try the toggle in the header — nothing should feel like an afterthought in either direction.",
    ],
  },
  {
    slug: "scaling-to-zero-with-supabase",
    title: "Scaling to zero with Supabase",
    excerpt:
      "How we run real products on a budget that starts at nothing — and only grows when the users do.",
    category: "Infrastructure",
    date: "2026-05-09",
    readingTime: "7 min",
    author: "Muhammad Ali",
    content: [
      "A new product shouldn't cost money before it has users. We build so that an idle app costs almost nothing and only grows its bill when real people show up — which is exactly when you can afford it.",
      "Supabase is a big part of how we do that: a managed Postgres database, authentication, file storage, and serverless functions on a free tier that's generous enough to launch on. No servers to babysit, no fixed monthly floor to justify before launch.",
      'The discipline is in the architecture — push work to the edge, cache what\'s stable, and keep the database lean. Do that, and "scale to zero" stops being a slogan and becomes your default cost.',
    ],
  },
];

export type Value = { title: string; description: string };
export const values: Value[] = [
  {
    title: "Own what we ship",
    description: "We build it, launch it, and stand behind it. No throwing code over a wall.",
  },
  {
    title: "Ship small, ship often",
    description: "Working software beats big promises. Every week there's something to click.",
  },
  {
    title: "Clarity over cleverness",
    description: "Simple systems the next person can understand — including future us.",
  },
  {
    title: "Measure real outcomes",
    description: "Success is what your users actually do, not what a slide deck claims.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};
export const team: TeamMember[] = [
  {
    name: "Fatima Abdul Raheem",
    role: "Chief Executive Officer",
    bio: "Sets the product direction and makes sure the things we ship are worth shipping.",
    initials: "FA",
  },
  {
    name: "Muhammad Ali",
    role: "Chief Financial Officer",
    bio: "Runs operations and the numbers so the building never has to stop.",
    initials: "MA",
  },
  {
    name: "Join the studio",
    role: "We're hiring",
    bio: "We're a small team that ships a lot. If that sounds like you, we'd love to talk.",
    initials: "+",
  },
];

export type Faq = { q: string; a: string };
export const faqs: Faq[] = [
  {
    q: "How does a custom project start?",
    a: "With a conversation and a short scope. We define the problem and what success looks like, then send a plan with milestones before any code is written.",
  },
  {
    q: "Do you only build web apps?",
    a: "Web is our home base, but we also build mobile apps, internal tools, APIs, and AI features. If it's software, we can probably help.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Custom work is delivered to your repositories and accounts. Our published products stay ours, but anything we build for you is yours.",
  },
  {
    q: "How fast can we see something?",
    a: "Usually within a week. We set up a live preview link early so you can watch the product take shape instead of waiting for a big reveal.",
  },
];
