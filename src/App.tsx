import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  ArrowRight,
  ChevronRight,
  Code2,
  Box,
  Layers,
  Cpu,
  Database,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  RefreshCw,
  Briefcase,
  User,
  FileText,
  CheckCircle2,
  Zap,
  Info
} from "lucide-react";
import Canvas3D from "./components/Canvas3D";
import TiltCard from "./components/TiltCard";
import GTOSInteractiveMockup from "./components/GTOSInteractiveMockup";
import { PROJECTS_DATA, SKILLS_DATA, EXPERIENCE_DATA } from "./data";
import { Project } from "./types";
import ScrollReveal from "./components/ScrollReveal";

export default function App() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Scroll spy or tab navigation handler
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate submission with a short delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus("success");
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter projects by category
  const filteredProjects = selectedCategory === "All" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  // Helper dynamic Icon retriever for technical badges
  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2": return <Code2 className="w-4 h-4 text-cyan-400" />;
      case "Box": return <Box className="w-4 h-4 text-emerald-400" />;
      case "Layers": return <Layers className="w-4 h-4 text-blue-400" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-purple-400" />;
      case "Database": return <Database className="w-4 h-4 text-teal-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden selection:bg-cyan-200 selection:text-slate-900" id="main-portfolio-root">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-l from-cyan-200/25 to-transparent pointer-events-none z-0" id="ambient-top-gradient" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse duration-5000" id="ambient-blur-1" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-emerald-100/25 rounded-full blur-[160px] pointer-events-none z-0" id="ambient-blur-2" />

      {/* Floating Spark particles on the grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none z-0" id="space-grid-pattern" />

      {/* 3D Cosmic Space Canvas Backdrop behind Hero */}
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-10" id="canvas3d-ambient-wrapper">
        <Canvas3D />
      </div>

      {/* FIXED SUPERIOR GLASS HEADER */}
      <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300" id="main-header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" id="header-container">
          
          {/* Logo Signature */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection("home")} id="brand-logo">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-400 rounded-xl flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 duration-300 transition-transform">
              C
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors duration-200">
              QUOC CUONG<span className="text-cyan-500 font-black">.</span>
              <span className="block text-[9px] text-slate-500 font-mono font-normal tracking-widest uppercase">Full-Stack Developer</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-slate-500" id="header-nav">
            <button 
              onClick={() => scrollToSection("home")} 
              className={`hover:text-cyan-600 transition-colors duration-200 cursor-pointer ${activeTab === "home" ? "text-cyan-600 font-bold" : ""}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("projects")} 
              className={`hover:text-cyan-600 transition-colors duration-200 cursor-pointer ${activeTab === "projects" ? "text-cyan-600 font-bold" : ""}`}
            >
              Featured Projects
            </button>
            <button 
              onClick={() => scrollToSection("skills")} 
              className={`hover:text-cyan-600 transition-colors duration-200 cursor-pointer ${activeTab === "skills" ? "text-cyan-600 font-bold" : ""}`}
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection("experience")} 
              className={`hover:text-cyan-600 transition-colors duration-200 cursor-pointer ${activeTab === "experience" ? "text-cyan-600 font-bold" : ""}`}
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className={`hover:text-cyan-600 transition-colors duration-200 cursor-pointer ${activeTab === "contact" ? "text-cyan-600 font-bold" : ""}`}
            >
              Contact
            </button>
          </nav>

          {/* Direct Pulse Availability Badge */}
          <div className="flex items-center gap-3" id="header-availability-badge">
            <div className="hidden lg:flex px-4 py-2 border border-emerald-250 rounded-full text-[10px] font-mono text-emerald-700 items-center gap-2 bg-emerald-50 backdrop-blur-sm shadow-sm">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping absolute duration-1000" />
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full relative" />
              AVAILABLE FOR NEW ROLES
            </div>
            
            {/* Quick action: Contact */}
            <button 
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer"
              id="quick-contact-button"
            >
              Let's Talk
            </button>
          </div>

        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="max-w-7xl mx-auto px-6 relative z-20" id="main-content">
        
        {/* HERO SECTION */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 md:py-20" id="home">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-layout">
            
            {/* Left Bio Column */}
            <div className="lg:col-span-7 flex flex-col justify-center" id="hero-info-column">
              
              {/* Specialized Tagline */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 border border-cyan-200 rounded-full text-xs font-mono text-cyan-700 w-fit mb-6" id="hero-mini-tag">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FULL-STACK DEVELOPER</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-none tracking-tight mb-6" id="hero-headline">
                Crafting <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-500 animate-gradient">
                  High-Performance
                </span> <br />
                Full-Stack Solutions.
              </h1>
              
               <p className="text-md sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-10" id="hero-brief">
                Hello, I am <strong>Pham Quoc Cuong</strong>. A seasoned Full-stack/Backend Developer with extensive experience designing custom real-time Terminal Operating Systems (TOS), optimizing clinic management platforms, and accelerating large-scale database query execution by over 30%.
              </p>

              {/* Action Call buttons */}
              <div className="flex flex-wrap gap-4" id="hero-cta-buttons">
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-xl shadow-slate-900/10 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  id="hero-primary-cta"
                >
                  <Mail className="w-5 h-5 text-white" />
                  Contact Me
                </button>
                <button 
                  onClick={() => scrollToSection("projects")} 
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-semibold rounded-xl border border-slate-200 transition-all duration-200 cursor-pointer shadow-sm"
                  id="hero-secondary-cta"
                >
                  View My Projects
                </button>
              </div>

              {/* Tech Stack quick badges */}
              <div className="mt-16 border-t border-slate-200 pt-8" id="hero-mini-stack">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-4">core tech stack</p>
                <div className="flex flex-wrap gap-2.5">
                  {["React & Next.js", "TypeScript", "Node.js (Express)", "WebSocket", "SQL Server / MySQL", "Docker"].map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 hover:text-cyan-600 hover:border-cyan-300 transition-all hover:scale-105 duration-200 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Decorative Interactive 3D Mockup Container */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]" style={{ perspective: "1200px" }} id="hero-interactive-column">
              
              {/* Back Card: Tech telemetry log snippet */}
              <div 
                className="absolute w-72 h-80 bg-white border border-cyan-100 rounded-2xl p-5 flex flex-col justify-between select-none opacity-60 shadow-2xl transition-all duration-700 hover:opacity-90"
                style={{ transform: "rotateY(-24deg) rotateX(12deg) translateZ(-110px) translateX(-70px)" }}
                id="back-card-telemetry"
              >
                <div>
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-mono text-cyan-600 font-bold">duc_sys_core.log</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  </div>
                  <pre className="text-[8px] text-slate-500 font-mono space-y-1 overflow-hidden pointer-events-none">
                    <code>{`> Initializing WebGL Context...
> GPU Core: hardware acceleration ON
> Loaded Three.js bundle 146KB
> Render loop: 60 FPS verified
> Core Web Vitals: LCP 0.8s
> Memory allocation: 4.2MB normal
> Router state synced successfully.
> Ready for interview.`}</code>
                  </pre>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-3/4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-cyan-500" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">80%</span>
                </div>
              </div>

              {/* Main Interactive Interactive Interactive Card */}
              <div 
                className="relative w-80 h-[420px] bg-gradient-to-br from-white to-slate-50 border border-slate-205 rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] p-6 flex flex-col overflow-hidden group"
                style={{ transform: "rotateY(-18deg) rotateX(6deg) translateZ(40px)" }}
                id="main-floating-card"
              >
                {/* Shiny glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-10" />

                {/* Simulated WebGL Canvas Viewport */}
                <div className="w-full aspect-video bg-cyan-50/50 rounded-2xl mb-6 flex flex-col items-center justify-center border border-cyan-200/60 overflow-hidden relative" id="card-canvas-viewport">
                  {/* Subtle spinning particle halo */}
                  <div className="absolute w-24 h-24 border border-cyan-400/20 rounded-full animate-spin duration-10000 opacity-60" />
                  <div className="absolute w-36 h-36 border border-emerald-400/10 rounded-full animate-spin duration-15000 opacity-40" />
                  
                  {/* Digital Core Icon */}
                  <div className="w-12 h-12 bg-white border border-cyan-200 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/10 z-10" id="card-inner-icon">
                    <Sparkles className="w-6 h-6 text-cyan-500 animate-pulse" />
                  </div>
                  <div className="text-[9px] font-mono text-cyan-600 mt-2 tracking-widest z-10 uppercase font-bold">
                    Orbital Network
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between" id="card-details">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors duration-200">
                      Pham Quoc Cuong
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Full-stack Developer specialized in real-time Terminal Operating Systems (TOS), database optimizations, and complex workflows.
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-slate-100 pt-4" id="card-footer">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span className="text-[10px] font-mono text-slate-550">Express & React</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">SYS_VER 5.1</span>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Glass badges */}
              <div 
                className="absolute top-10 right-2 w-20 h-20 bg-white border border-cyan-100 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 duration-300 transition-transform cursor-pointer"
                style={{ transform: "translateZ(100px) rotate(-10deg)" }}
                onClick={() => scrollToSection("contact")}
                id="floating-badge-contact"
              >
                <div className="text-center">
                  <span className="block text-xl leading-none">✉️</span>
                  <span className="text-[8px] font-mono text-cyan-600 tracking-tight uppercase font-bold">Contact</span>
                </div>
              </div>

              <div 
                className="absolute bottom-16 left-2 w-16 h-16 bg-white border border-emerald-100 rounded-full flex items-center justify-center shadow-xl hover:scale-110 duration-300 transition-transform cursor-pointer"
                style={{ transform: "translateZ(130px) rotate(12deg)" }}
                onClick={() => scrollToSection("skills")}
                id="floating-badge-stack"
              >
                <div className="text-center">
                  <span className="block text-lg leading-none">⚡</span>
                  <span className="text-[8px] font-mono text-emerald-600 tracking-tight uppercase font-bold">60 fps</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FULLSTACK PROJECTS SHOWCASE SECTION */}
        <section className="py-24 border-t border-slate-200" id="projects">
          
          {/* Header section title */}
          <ScrollReveal direction="up" duration={0.8}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16" id="projects-header-info">
              <div id="projects-title-block">
                <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-[0.3em] block mb-3">Portfolio Highlights</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Projects</span>
                </h2>
              </div>
              
              {/* Category toggle filter pills */}
              <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-slate-200/50 p-1.5 border border-slate-200/60 rounded-xl w-fit" id="projects-filters">
                {["All", "Fullstack", "Web Performance"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === category 
                        ? "bg-slate-900 text-white font-bold shadow-md" 
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive project grid utilizing our TiltCard custom component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">
            {filteredProjects.map((project, idx) => (
              <ScrollReveal 
                key={project.id} 
                direction="up" 
                delay={idx * 0.12} 
                duration={0.7}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-lg duration-300 relative group" id={`project-card-${project.id}`}>
                    
                    <div>
                      {/* Simulated visual image pattern placeholder */}
                      <div className="w-full aspect-video bg-slate-50 border border-slate-100 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center group-hover:border-cyan-500/20 transition-all duration-300" id={`project-asset-wrapper-${project.id}`}>
                        
                        {/* Grid background on mockup visual area */}
                        <div className="absolute inset-0 bg-slate-100 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                        
                        {/* Subtle custom background styling for different categories */}
                        {project.category === "3D/WebGL" && (
                          <div className="absolute w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 duration-700 transition-transform" />
                        )}
                        {project.category === "Fullstack" && (
                          <div className="absolute w-20 h-20 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 duration-700 transition-transform" />
                        )}
                        {project.category === "Web Performance" && (
                          <div className="absolute w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 duration-700 transition-transform" />
                        )}

                        {/* Display metric as a floating badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-cyan-50 border border-cyan-150 rounded-md text-[10px] font-mono text-cyan-700 tracking-tight font-bold" id="project-metric-badge">
                          {project.metrics}
                        </div>

                        {/* Symbolic aesthetic vector placeholder inside the frame */}
                        <div className="z-10 flex flex-col items-center">
                          {project.category === "3D/WebGL" ? (
                            <Box className="w-10 h-10 text-cyan-600 group-hover:rotate-12 duration-500 transition-transform" />
                          ) : project.category === "Fullstack" ? (
                            <Layers className="w-10 h-10 text-purple-600 group-hover:translate-y-[-4px] duration-500 transition-transform" />
                          ) : (
                            <Cpu className="w-10 h-10 text-emerald-600 group-hover:scale-110 duration-500 transition-transform" />
                          )}
                          <span className="text-[10px] font-mono text-slate-500 mt-2 uppercase tracking-widest">{project.category}</span>
                        </div>
                      </div>

                      {/* Metadata details */}
                      <div className="flex items-center gap-2 mb-3" id="project-top-meta">
                        <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-mono text-slate-600 uppercase">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-0.5 bg-cyan-50 border border-cyan-200 rounded-md text-[9px] font-mono text-cyan-700 flex items-center gap-1 font-bold">
                            ★ FEATURED
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom: Tags & deep inspection button */}
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6" id="project-tags-list">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="w-full py-3 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-cyan-600 border border-slate-250 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                        id="view-details-btn"
                      >
                        <span>View Detailed Solution</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-1 duration-200 transition-transform group-hover/btn:text-cyan-600" />
                      </button>
                    </div>

                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Interactive GTOS Terminal Operating System interface simulator */}
          <ScrollReveal direction="up" delay={0.15} duration={0.8} className="mt-16">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm" id="gtos-live-preview-section">
              <div className="max-w-2xl mb-8">
                <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-[0.2em] block mb-2">Interactive Simulation</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  GTOS Live Operating Interface Simulator
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  We have digitized the core operational screens of the Terminal Operating System (TOS) into an interactive, high-fidelity browser experience. Use the tabs above to toggle between the Performance Metrics Dashboard, Container Yard Planner, Gate & Yard Operations History log, and the User Permissions panel.
                </p>
              </div>
              
              <GTOSInteractiveMockup />
            </div>
          </ScrollReveal>

        </section>

        {/* DETAILS POPUP MODAL */}
        {selectedProject && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[999]" id="details-modal">
            <div className={`bg-white border border-slate-200 ${selectedProject.id === "gtos-tos" ? "max-w-5xl" : "max-w-xl md:max-w-2xl"} w-full rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300`} id="modal-container">
              
              {/* Header block with close */}
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50" id="modal-header">
                <div>
                  <span className="text-[10px] font-mono text-cyan-700 tracking-widest uppercase block mb-1 font-bold">{selectedProject.category} Solution</span>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200"
                  id="modal-close"
                >
                  ✕
                </button>
              </div>

              {/* Payload Details */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto" id="modal-body">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">project overview</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
                  <h4 className="text-xs font-mono text-cyan-700 uppercase tracking-wider mb-2 flex items-center gap-1 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    TECHNICAL SOLUTIONS & PERFORMANCE OPTIMIZATION
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-sans">{selectedProject.fullDetails}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-400 block">KEY METRICS ACHIEVED</span>
                    <span className="text-sm font-bold text-emerald-700">{selectedProject.metrics}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-400 block">DEVELOPMENT ROLE</span>
                    <span className="text-sm font-bold text-slate-800">{selectedProject.role || "Full-stack Developer"}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">primary technology stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.id === "gtos-tos" && (
                  <div className="border-t border-slate-200 pt-6">
                    <h4 className="text-xs font-mono text-cyan-700 uppercase tracking-wider mb-4 flex items-center gap-1.5 font-bold">
                      <span>🖥️ DEEP INTERACTIVE SYSTEM MOCKUP</span>
                    </h4>
                    <GTOSInteractiveMockup />
                  </div>
                )}
              </div>

              {/* Modal controls footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3" id="modal-footer">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-white text-slate-700 hover:text-slate-900 text-xs font-bold rounded-lg border border-slate-205 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-600" />
                      <span>Codebase</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-cyan-50 text-cyan-700 hover:text-cyan-800 text-xs font-bold rounded-lg border border-cyan-200 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 bg-slate-100 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      scrollToSection("contact");
                    }}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>Discuss Project Partnerships</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* INTERACTIVE SKILLS SECTION */}
        <section className="py-24 border-t border-slate-200" id="skills">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="skills-layout">
            
            {/* Left Info side */}
            <ScrollReveal direction="left" className="lg:col-span-4" id="skills-left" duration={0.8}>
              <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-[0.3em] block mb-3">Core Capabilities</span>
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 animate-fade-in">
                Expertise & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Technical Stack</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Skill gauges are based on practical, full-scale development cycles. Cuong strikes a balance between pixel-perfect, responsive UI design on the frontend and scalable, query-optimized services on the backend.
              </p>

              <div className="bg-slate-100 border border-slate-200 p-5 rounded-2xl space-y-4" id="skills-praise-block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">FULL-STACK PRODUCTION READY</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enforcing clean unidirectional and bi-directional data flow, designing RESTful/WebSocket APIs with extreme care, crafting responsive web layouts, and containerizing runtimes cleanly with Docker.
                </p>
              </div>
            </ScrollReveal>

            {/* Right Skills Grid side */}
            <div className="lg:col-span-8 space-y-10" id="skills-right">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="skills-cards-list">
                {/* Categorized Skills display */}
                {["Frontend", "Backend", "Databases & DevOps"].map((cat, idx) => (
                  <ScrollReveal key={cat} direction="up" delay={idx * 0.12} duration={0.65} className="h-full">
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden shadow-sm h-full" id={`skill-category-${cat}`}>
                      
                      {/* Visual glowing accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/5 to-transparent pointer-events-none" />

                      <h3 className="text-sm font-mono font-bold text-cyan-700 uppercase tracking-widest mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-600" />
                        {cat}
                      </h3>

                      <div className="space-y-5">
                        {SKILLS_DATA.filter(s => s.category === cat).map((skill) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-start text-xs gap-2">
                              <span className="text-slate-800 font-semibold flex items-center gap-1.5 font-sans min-w-0">
                                <span className="shrink-0 pt-0.5">{renderSkillIcon(skill.iconName)}</span>
                                <span className="truncate sm:whitespace-normal leading-tight">{skill.name}</span>
                              </span>
                              <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap shrink-0 pt-0.5">{skill.level}%</span>
                            </div>
                            
                            {/* Premium indicator track */}
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full transition-all duration-1000"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </ScrollReveal>
                ))}

              </div>

            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section className="py-24 border-t border-slate-200" id="experience">
          <div className="max-w-3xl mx-auto" id="experience-container">
            
            <ScrollReveal direction="up" duration={0.8}>
              <div className="text-center mb-16" id="experience-header-block">
                <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-[0.3em] block mb-3">Professional Milestones</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Professional Experience</h2>
              </div>
            </ScrollReveal>

            {/* Vertical timeline layout */}
            <div className="relative border-l border-slate-200 ml-4 md:ml-6 space-y-12" id="experience-timeline">
              {EXPERIENCE_DATA.map((exp, index) => (
                <ScrollReveal 
                  key={exp.id} 
                  direction="up" 
                  delay={index * 0.15} 
                  duration={0.7} 
                  className="relative pl-8 md:pl-10 group" 
                  id={`timeline-item-${exp.id}`}
                >
                  
                  {/* Timeline point bullet */}
                  <span className="absolute left-[-9px] top-1.5 w-4.5 h-4.5 bg-white border-2 border-cyan-500 rounded-full group-hover:scale-125 duration-300 transition-all z-10 flex items-center justify-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  </span>

                  {/* Year block floating */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-lg text-xs font-mono text-cyan-700 w-fit font-bold">
                      {exp.period}
                    </span>
                    <span className="text-xs font-mono text-slate-500 mt-1 sm:mt-0">{exp.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors duration-200">
                    {exp.role}
                  </h3>
                  
                  <span className="text-md font-mono text-slate-500 block mb-4 font-semibold">
                    {exp.company}
                  </span>

                  {/* Detail items */}
                  <ul className="space-y-3.5 mb-6 text-slate-600 text-xs sm:text-sm list-none pl-0">
                    {exp.description.map((bullet, bIndex) => (
                      <li key={bIndex} className="flex gap-2 items-start leading-relaxed text-slate-600">
                        <ChevronRight className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags deployed */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono rounded-md shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Aesthetic divider */}
                  {index < EXPERIENCE_DATA.length - 1 && (
                    <div className="h-[1px] bg-slate-200 w-full mt-10" />
                  )}

                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>

        {/* PORTFOLIO CONTACT SECTION (DIRECT INQUIRIES) */}
        <section className="py-24 border-t border-slate-200" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-layout">
            
            {/* Direct Contact Invitation Left */}
            <ScrollReveal direction="left" className="lg:col-span-5 flex flex-col justify-between" id="contact-info-panel" duration={0.8}>
              <div id="contact-intro-main">
                <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-[0.3em] block mb-3">Contact</span>
                <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                  Let's Connect <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">& Discuss Opportunities</span>
                </h2>
                
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  Are you looking for an agile Full-stack/Backend Developer who understands real-time logistics, modern web standards, and holds a proven track record of optimizing complex databases to peak execution? Reach out today!
                </p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-8">
                  Cuong is highly motivated by high-impact SaaS products and mission-critical operating software requiring low-latency real-time streams and smart automated backends.
                </p>

                {/* Direct info list */}
                <div className="space-y-4" id="direct-contact-shortlist">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">CONTACT DETAILS</span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                        <Mail className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="font-medium">phamquocuong19@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="font-medium">Ho Chi Minh City, Vietnam</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-3 bg-cyan-50 border border-cyan-150 rounded-xl mt-8 flex items-start gap-2.5" id="contact-instruction-banner">
                <Info className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span className="text-[10px] font-mono text-cyan-850 leading-normal font-medium">
                  Cuong's contact information is verified and monitored daily. Please feel free to call, email, or message him directly to coordinate interviews or code discussions!
                </span>
              </div>
            </ScrollReveal>

            {/* Direct contact channels Right */}
            <ScrollReveal direction="right" className="lg:col-span-7 flex flex-col justify-center animate-fade-in" id="contact-channels-viewport" duration={0.8} delay={0.1}>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 relative flex flex-col justify-center" id="contact-info-cards-wrapper">
                
                <div className="mb-6" id="contact-cards-header">
                  <div className="flex flex-wrap items-center gap-3 mb-2.5">
                    <span className="px-2 py-0.5 bg-cyan-50 border border-cyan-150 rounded-md text-[9px] uppercase font-mono font-bold text-cyan-700 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-600" /> Fast Response
                    </span>
                    <span className="text-emerald-600 text-[10px] font-mono flex items-center gap-1 font-bold">
                      ● Actively seeking opportunities
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    Direct Contact
                  </h3>
                  <p className="text-slate-650 text-xs leading-relaxed">
                    Click any of the channels below to reach out directly, or copy values to clipboard in a single click.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5" id="contact-cards-grid">
                  
                  {/* Card 1: Email */}
                  <div className="bg-slate-50/40 border border-slate-200 hover:border-cyan-400 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 group hover:shadow-md hover:bg-white" id="contact-card-email">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform">
                          <Mail className="w-4.5 h-4.5" />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("phamquocuong19@gmail.com", "email")}
                          className="text-[9px] font-mono text-slate-500 hover:text-cyan-600 bg-white border border-slate-200 hover:border-cyan-200 px-2 py-0.5 rounded transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          {copiedText === "email" ? "Copied! ✓" : "Copy"}
                        </button>
                      </div>
                      <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-1">
                        Direct Email Address
                      </h4>
                      <p className="text-slate-950 font-bold text-xs sm:text-sm truncate" title="phamquocuong19@gmail.com">
                        phamquocuong19@gmail.com
                      </p>
                      <p className="text-slate-500 text-[10px] mt-1 line-clamp-2 leading-normal">
                        Perfect place to send interview invites, project proposals, or complete development specs.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center gap-3">
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=phamquocuong19@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors inline-flex items-center gap-1"
                      >
                        Compose Gmail <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  {/* Card 2: Phone & Zalo */}
                  <div className="bg-slate-50/40 border border-slate-200 hover:border-cyan-400 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 group hover:shadow-md hover:bg-white" id="contact-card-phone">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                          <Phone className="w-4.5 h-4.5" />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("0345065273", "phone")}
                          className="text-[9px] font-mono text-slate-500 hover:text-cyan-600 bg-white border border-slate-200 hover:border-cyan-200 px-2 py-0.5 rounded transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          {copiedText === "phone" ? "Copied! ✓" : "Copy"}
                        </button>
                      </div>
                      <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-1">
                        Phone & Zalo Contact
                      </h4>
                      <p className="text-slate-950 font-bold text-xs sm:text-sm">
                        (+84) 34-506-5273
                      </p>
                      <p className="text-slate-500 text-[10px] mt-1 line-clamp-2 leading-normal">
                        Ideal for instant calling or rapid texting/calling on Zalo Messenger.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center gap-3">
                      <a
                        href="tel:+84345065273"
                        className="text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                      >
                        Direct Call
                      </a>
                      <span className="text-slate-300 text-xs">|</span>
                      <a
                        href="https://zalo.me/0345065273"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                      >
                        Chat via Zalo <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  {/* Card 3: GitHub */}
                  <div className="bg-slate-50/40 border border-slate-200 hover:border-cyan-400 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 group hover:shadow-md hover:bg-white" id="contact-card-github">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Github className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest font-bold">
                          Code Space
                        </span>
                      </div>
                      <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-1">
                        Open Source Registries
                      </h4>
                      <p className="text-slate-950 font-bold text-xs sm:text-sm truncate">
                        github/phamquoccuong20
                      </p>
                      <p className="text-slate-500 text-[10px] mt-1 line-clamp-2 leading-normal">
                        Inspect repositories for projects, container configurations, and core web platform implementations.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100/80">
                      <a
                        href="https://github.com/phamquoccuong20"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                      >
                        Explore Profile <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-600" />
                      </a>
                    </div>
                  </div>

                  {/* Card 4: LinkedIn */}
                  <div className="bg-slate-50/40 border border-slate-200 hover:border-cyan-400 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 group hover:shadow-md hover:bg-white" id="contact-card-linkedin">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                          <Linkedin className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-[9px] font-mono text-blue-600 uppercase tracking-widest font-bold">
                          Connect
                        </span>
                      </div>
                      <h4 className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-1">
                        Professional Network
                      </h4>
                      <p className="text-slate-950 font-bold text-xs sm:text-sm truncate">
                        Pham Quoc Cuong
                      </p>
                      <p className="text-slate-500 text-[10px] mt-1 line-clamp-2 leading-normal">
                        Connect to build dynamic career networks and keep track of modern systems progress.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100/80">
                      <a
                        href="https://www.linkedin.com/in/ph%E1%BA%A1m-qu%E1%BB%91c-c%C6%B0%E1%BB%9Dng-313939347"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                      >
                        Connect Now <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-600" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

      </main>

      {/* FOOTER & CONTACT SIGNATURE BLOCK */}
      <footer className="mt-24 border-t border-slate-200 bg-slate-100/55 py-16 relative z-20" id="main-footer-sec">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-start" id="footer-layout">
          
          <div className="md:col-span-4 space-y-4" id="footer-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-white text-md shadow-sm">C</div>
              <span className="text-md font-bold tracking-tight text-slate-900 font-sans">PHAM QUOC CUONG<span className="text-cyan-500 font-extrabold">.</span></span>
            </div>
            <p className="text-xs text-slate-650 leading-relaxed max-w-sm font-sans font-medium">
              Portfolio of an agile Full-stack/Backend Developer specialized in Terminal Operating Systems (TOS) and real-time medical clinic SaaS solutions.
            </p>
            <p className="text-[10px] text-slate-500 font-mono pt-4">
              © {new Date().getFullYear()} Pham Quoc Cuong. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4" id="footer-middle">
            <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-2 font-bold">contact info</h4>
            <div className="space-y-2 text-xs text-slate-600" id="footer-contact-details">
              <a href="mailto:phamquocuong19@gmail.com" className="flex items-center gap-3 hover:text-cyan-600 transition-colors">
                <Mail className="w-4 h-4 text-cyan-600" />
                <span>phamquocuong19@gmail.com</span>
              </a>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>(+84) 34-506-5273</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-600" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4" id="footer-right">
            <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-2 font-bold">socials & codebases</h4>
            <div className="flex gap-4 pt-2" id="footer-social-links">
              <a 
                href="https://github.com/phamquoccuong20" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 bg-white hover:bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 hover:text-cyan-600 transition-all cursor-pointer shadow-sm hover:border-cyan-200 hover:-translate-y-0.5 duration-200"
                id="github-link"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ph%E1%BA%A1m-qu%E1%BB%91c-c%C6%B0%E1%BB%9Dng-313939347" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 bg-white hover:bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 hover:text-cyan-600 transition-all cursor-pointer shadow-sm hover:border-cyan-200 hover:-translate-y-0.5 duration-200"
                id="linkedin-link"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            

          </div>

        </div>
      </footer>

    </div>
  );
}
