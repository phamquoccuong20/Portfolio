import { Project, Skill, Experience } from "./types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "gtos-tos",
    title: "GTOS - Terminal Operating System",
    subtitle: "Real-time Port Logistics Operating System",
    description: "High-performance real-time port logistics operating system managing container handling, yard gate control, and complex role-based access control.",
    fullDetails: "Comprehensive digital transformation solution for seaport cargo operations. Integrates real-time WebSockets data transfer to eliminate high-volume bottlenecks across Gate, Yard, and Tally locations. Enforces strict Role-Based Access Control (RBAC) to seal operational security, alongside complex SQL query tuning to accelerate database response speed by over 30%.",
    tags: ["React", "Express.js", "WebSocket", "SQL Server", "Docker", "Tailwind CSS"],
    category: "Fullstack",
    metrics: "30% query performance improvement, sub-100ms real-time latency",
    imagePrompt: "sleek dark ports container shipping terminal management dashboard interface glowing on black display",
    role: "Lead Fullstack Developer",
    featured: true,
  },
  {
    id: "restaurant-management",
    title: "Restaurant Management System",
    subtitle: "End-to-End Table Booking & Smart Food Ordering SaaS",
    description: "A comprehensive restaurant management system featuring multi-role (admin, staff, customer) modules to manage tables, categorized food menus, and dynamic table ordering workflows.",
    fullDetails: "An engineered restaurant operations engine featuring a high-performance Next.js and Zustand client-side application and a Node.js/Express.js backend. Built secure Role-Based Access Control APIs safeguarding table reservations, kitchen order dispatch, and menu catalogs. Optimized lookup speeds with clean Redis caching layers, implemented JWT user authentication middleware, leveraged Cloudinary for image asset handling, and automated building with a GitHub Actions CI/CD pipeline to Vercel & Render.",
    tags: ["Next.js", "Express.js", "Zustand", "MongoDB", "Redis", "Cloudinary", "JWT", "GitHub Actions"],
    category: "Fullstack",
    metrics: "Redis lookup performance boost, full team CD/CI automations",
    imagePrompt: "gorgeous clean premium wooden digital tablet screen showing luxury restaurant food dashboard ordering catalog",
    liveUrl: "https://dashboard-foodreservation.onrender.com/",
    githubUrl: "https://github.com/phamquoccuong20/api-restaurant",
    role: "Full-stack Developer (Team of 2)",
    featured: true,
  },
  {
    id: "andat-clinic",
    title: "An Dat Clinic Management",
    subtitle: "Healthcare & Appointment Management Platform",
    description: "Healthcare management platform for international clinics coordinating appointment schedules, doctor profiles, and Electronic Medical Records (EMR).",
    fullDetails: "Multi-threaded healthcare system for international clinics, managing medical records and consultation timetables. Built on Node.js & Express coupled with MongoDB/MySQL, integrating custom Redis caching and streamlined pagination to shave 30% off API response latencies.",
    tags: ["Node.js", "Express.js", "MongoDB", "MySQL", "Redis", "Cloudinary"],
    category: "Web Performance",
    metrics: "30% reduction in API response latency with database indexing and query tuning",
    imagePrompt: "modern elegant blue medical patient booking records dashboard desktop console app",
    role: "Backend Engineer",
    featured: true,
  }
];

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 95, category: "Frontend", iconName: "Code2", yearsOfExp: 2 },
  { name: "TypeScript", level: 93, category: "Frontend", iconName: "Cpu", yearsOfExp: 2 },
  { name: "Tailwind CSS", level: 98, category: "Frontend", iconName: "Code2", yearsOfExp: 2 },
  { name: "Redux / Zustand", level: 90, category: "Frontend", iconName: "Cpu", yearsOfExp: 2 },

  // Backend
  { name: "Node.js (Express)", level: 92, category: "Backend", iconName: "Layers", yearsOfExp: 2 },
  { name: "NestJS", level: 88, category: "Backend", iconName: "Layers", yearsOfExp: 2 },
  { name: "WebSocket & Socket.io", level: 85, category: "Backend", iconName: "Cpu", yearsOfExp: 2 },
  { name: "RESTful API & GraphQL", level: 94, category: "Backend", iconName: "Code2", yearsOfExp: 2 },

  // Databases & DevOps
  { name: "PostgreSQL & MySQL", level: 90, category: "Databases & DevOps", iconName: "Database", yearsOfExp: 2 },
  { name: "NoSQL / MongoDB", level: 88, category: "Databases & DevOps", iconName: "Database", yearsOfExp: 2 },
  { name: "SQL Server", level: 84, category: "Databases & DevOps", iconName: "Database", yearsOfExp: 2 },
  { name: "Docker", level: 83, category: "Databases & DevOps", iconName: "Box", yearsOfExp: 2 },
  { name: "CI/CD (GitHub Actions)", level: 81, category: "Databases & DevOps", iconName: "Layers", yearsOfExp: 2 },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-1",
    role: "Fullstack Engineer",
    company: "CEH Technology Platform JSC",
    period: "08/2025 - Present",
    location: "Ho Chi Minh City",
    description: [
      "Worked on GTOS - Terminal Operating System (TOS) project, developing scalable RESTful APIs and real-time systems for port operations.",
      "Implemented real-time features using WebSockets for TOS workflows across Gate, Yard, and Tally, ensuring instant responsive updates.",
      "Designed and built secure Role-Based Access Control (RBAC) system for complex logistics operations workflows.",
      "Optimized complex SQL Server databases and queries for large datasets, improving query execution and report processing speed by ~30%.",
      "Participated in field deployment and operations across multiple deep-water port systems.",
      "Leveraged modern AI productivity tools (GitHub Copilot Explorer, ChatGPT, Cursor, Gemini) to accelerate backend development, refactoring, and troubleshooting."
    ],
    skills: ["React", "Express.js", "WebSocket", "SQL Server", "GitLab", "Docker", "REST API"]
  },
  {
    id: "exp-2",
    role: "Backend Engineer",
    company: "MCV Group (AN DAT INTERNATIONAL CLINIC)",
    period: "03/2024 - 03/2025",
    location: "Ho Chi Minh City",
    description: [
      "Developed a robust medical records, appointments, and doctor management system for an international clinic.",
      "Designed features to efficiently schedule appointments, handle medical records processing, and coordinate doctor timetables.",
      "Optimized MySQL database query schemas and integrated pagination, custom indexing, and Redis caching to improve data processing speed.",
      "Reduced average API response/data retrieval latency by 30%, enabling seamless fast-loading user interactions across patients and clinic admins.",
      "Integrated Cloudinary for secure medical image storage and JWT-based authentication for medical records privacy."
    ],
    skills: ["Node.js", "Express.js", "MongoDB", "MySQL", "Redis", "Cloudinary", "Mongoose", "JWT"]
  }
];

export const CHAT_SUGGESTIONS = [
  "How many years of experience does Cuong have and what is his core field of expertise?",
  "How does the GTOS Terminal Operating System handle real-time processes?",
  "How did Cuong optimize SQL Server & MySQL queries to achieve a 30% performance boost?",
  "Does Quoc Cuong have experience incorporating AI tools in software engineering?",
  "Let's start a mock interview!"
];
