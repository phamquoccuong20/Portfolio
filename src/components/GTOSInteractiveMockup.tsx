import React, { useState, useEffect, useRef } from "react";
import { 
  BarChart3, 
  Layers, 
  Clock, 
  Users, 
  Ship, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  ChevronRight, 
  Calendar,
  Grid
} from "lucide-react";

export default function GTOSInteractiveMockup() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "yard" | "history" | "users">("dashboard");
  const [isAuto, setIsAuto] = useState<boolean>(true);

  // Driven states for automation logs & statistics
  const [totalTons, setTotalTons] = useState<number>(24850);
  const [vesselsCount, setVesselsCount] = useState<number>(5);
  const [revenue, setRevenue] = useState<number>(10.2);
  const [efficiency, setEfficiency] = useState<number>(94.2);
  const [flashStat, setFlashStat] = useState<string | null>(null);

  // Setup state arrays so content can shift smoothly in real-time
  const [cargoPie, setCargoPie] = useState([
    { name: "Coiled Cables", value: 8500, percent: 85, color: "bg-blue-500" },
    { name: "Hot Rolled Coils", value: 6200, percent: 62, color: "bg-indigo-500" },
    { name: "Hot Rolled Plates", value: 5100, percent: 51, color: "bg-cyan-500" },
    { name: "Galvanized Coils", value: 3200, percent: 32, color: "bg-emerald-500" },
    { name: "Coiled Sheets", value: 1850, percent: 18, color: "bg-teal-500" }
  ]);

  const yardCategories = [
    { name: "Hot Rolled Coils", count: "48 / 100", type: "COIL", active: true },
    { name: "Steel Rails", count: "12 / 20", type: "BUNDLE", active: false },
    { name: "Angle Steel", count: "15 / 15", type: "BUNDLE", active: false }
  ];

  const [yardSlots, setYardSlots] = useState<any[]>([
    { id: "BCSBTDTT2", bay: "Bay 1", vessel: "BIEN DONG STAR", cargo: "Hot Rolled Coils", weight: "12 T", capacity: "60%" },
    { id: "BCSBVTT2", bay: "Bay 2", status: "Empty", capacity: "0%" },
    { id: "BCSCC2TT2", bay: "Bay 3", vessel: "MV PACIFIC GLORY", cargo: "Steel Coils", weight: "18 T", capacity: "85%" },
    { id: "BCSKCXTT2", bay: "Bay 4", status: "Empty", capacity: "0%" }
  ]);

  const [timelineEvents, setTimelineEvents] = useState<any[]>([
    {
      time: "10:15:20",
      title: "Yard progress update",
      vessel: "MV PACIFIC GLORY",
      location: "Berth A2 (Crane 2)",
      desc: "Discharging from hatch #2 completed. Recorded yard stacking: 1,250 tons of steel coils.",
      user: "Automatic System (RTG-04)",
      type: "progress"
    },
    {
      time: "09:30:15",
      title: "Work shift execution initiated",
      desc: "Operation Team #3 started a new shift. Integrated synchronized devices: Quay Crane QC-01, QC-02.",
      user: "Coordinator Admin",
      type: "shift"
    },
    {
      time: "08:45:10",
      title: "Port API connection initialized",
      desc: "Electronic port clearance successfully verified with Hai Phong customs. Package ping: 12ms.",
      user: "Quoc Cuong Dev",
      type: "info"
    }
  ]);

  // System management list
  const systemUsers = [
    { stt: 1, group: "Admin Group", port: "TTP", username: "admin", name: "Administrator", userId: "241231234", location: "Dist. 7, HCMC", phone: "0902120031", email: "admin@gtos.com.vn", status: "Active" },
    { stt: 2, group: "Accounting Group", port: "TTP", username: "anhbtk", name: "Bui Thi Kim Anh", userId: "079182938", location: "Updating", phone: "0909112233", email: "anhbtk@gtos.com.vn", status: "Active" },
    { stt: 3, group: "Admin Group", port: "TTP", username: "anhnnl", name: "Nguyen Nhat Linh Anh", userId: "Updating", location: "Hanoi", phone: "0912334455", email: "linhanh@gmail.com", status: "Locked" }
  ];

  // Auto Ticking Simulation Engine
  useEffect(() => {
    if (!isAuto) return;

    const interval = setInterval(() => {
      // 1. Construct dynamic operational logistics system event
      const logTemplates = [
        {
          title: "RTG Yard Stacking Device",
          desc: "RTG crane RT-05 transferred sheet coils container to Block C1. Position optimizer completed successfully.",
          user: "Docker RTG-05",
          type: "progress"
        },
        {
          title: "SQL Server Transaction Sync",
          desc: "Synchronized cargo hold load structure. Batch write transaction successful (9ms).",
          user: "Database Node",
          type: "shift"
        },
        {
          title: "IIoT Customs Receipt",
          desc: "Automated system detected trailer truck RM-442 at the auto-weigh station. Stacking instruction dispatched immediately.",
          user: "Electronic Scale",
          type: "progress"
        }
      ];

      const chosen = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setTimelineEvents(prev => [
        {
          time: timeStr,
          title: chosen.title,
          desc: chosen.desc,
          user: chosen.user,
          type: chosen.type
        },
        ...prev.slice(0, 3) // restrict queue size to stay tidy
      ]);

      // 2. Increment statistics
      const deltaTons = Math.floor(Math.random() * 20) + 8;
      setTotalTons(prev => prev + deltaTons);
      setRevenue(prev => parseFloat((prev + (deltaTons * 0.00042)).toFixed(3)));
      setEfficiency(prev => {
        const nextEff = prev + (Math.random() * 0.3 - 0.13);
        return parseFloat(Math.min(99.4, Math.max(91.5, nextEff)).toFixed(1));
      });

      // Flash KPI card visually
      setFlashStat("tons");
      const flashTimeout = setTimeout(() => setFlashStat(null), 800);

      // 3. Dynamic Yard slots occupancy transition
      setYardSlots(prev => {
        const updated = [...prev];
        const randomIdx = Math.floor(Math.random() * updated.length);
        const slot = updated[randomIdx];

        if (slot.vessel) {
          updated[randomIdx] = {
            id: slot.id,
            bay: slot.bay,
            status: "Empty",
            capacity: "0%"
          };
        } else {
          const vessels = ["BIEN DONG STAR", "MV PACIFIC GLORY", "EVERGREEN SEA", "OOCL CONTAINER"];
          const cargos = ["Galvanized Coils", "Steel Coils", "Hot Rolled Coils"];
          updated[randomIdx] = {
            id: slot.id,
            bay: slot.bay,
            vessel: vessels[Math.floor(Math.random() * vessels.length)],
            cargo: cargos[Math.floor(Math.random() * cargos.length)],
            weight: `${Math.floor(Math.random() * 15) + 12} T`,
            capacity: `${Math.floor(Math.random() * 45) + 50}%`
          };
        }
        return updated;
      });

      // 4. Update commodity value counts
      setCargoPie(prev => {
        return prev.map(item => {
          if (item.name === "Hot Rolled Coils") {
            const newVal = item.value + deltaTons;
            return {
              ...item,
              value: newVal,
              percent: Math.min(100, Math.round((newVal / 10000) * 100))
            };
          }
          return item;
        });
      });

      return () => clearTimeout(flashTimeout);
    }, 3800);

    return () => clearInterval(interval);
  }, [isAuto]);

  return (
    <div className="w-full bg-[#f4f7fc] border border-slate-200 rounded-2xl overflow-hidden shadow-xl flex flex-col" id="gtos-interactive-container">
      {/* Simulation Browser Header */}
      <div className="bg-[#1353b3] border-b border-blue-800 px-3 sm:px-4 py-2 sm:py-2.5 flex flex-nowrap items-center justify-between gap-2 md:gap-3 text-white overflow-hidden" id="mock-browser-header">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mac style closing signals */}
          <div className="flex gap-1 sm:gap-1.5 mr-1 sm:mr-2">
            <span className="w-2 h-2 rounded-full bg-red-400 block" />
            <span className="w-2 h-2 rounded-full bg-yellow-400 block" />
            <span className="w-2 h-2 rounded-full bg-green-400 block" />
          </div>
          <span className="px-1.5 sm:px-2.5 py-0.5 bg-blue-900/60 border border-white/20 rounded text-[9px] sm:text-[10px] font-bold text-blue-100 shrink-0">
            GTOS SYSTEM
          </span>
          <span className="text-xs text-blue-100 hidden lg:inline opacity-80 shrink-0">http://gtos.port.vn/terminal_live</span>
        </div>

        {/* Operational Nav Menu representing screenshots */}
        <div className="flex items-center bg-[#0d3f8f] p-0.5 sm:p-1 border border-blue-900/40 rounded-lg text-[11px] sm:text-xs gap-0.5 sm:gap-1 shrink-0" id="mockup-tab-triggers">
          <button 
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer ${activeTab === "dashboard" ? "bg-[#1d6bdf] font-bold text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-blue-600/25"}`}
          >
            <BarChart3 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="hidden md:inline">Main Dashboard</span>
            <span className="md:hidden">KPIs</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("yard")}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer ${activeTab === "yard" ? "bg-[#1d6bdf] font-bold text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-blue-600/25"}`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Yard plan</span>
            <span className="md:hidden">Yard</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("history")}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer ${activeTab === "history" ? "bg-[#1d6bdf] font-bold text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-blue-600/25"}`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Updates</span>
            <span className="md:hidden">Logs</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("users")}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-medium transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer ${activeTab === "users" ? "bg-[#1d6bdf] font-bold text-white shadow-sm" : "text-blue-100 hover:text-white hover:bg-blue-600/25"}`}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Administration</span>
            <span className="md:hidden">User</span>
          </button>
        </div>


      </div>

      {/* Simulator Workspace Screen */}
      <div className="p-4 sm:p-6 flex-1 min-h-[380px]" id="mockup-display-canvas">
        {/* TAB 1: GTOS DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* KPI 4 Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`bg-white border p-4 rounded-xl flex flex-col justify-between shadow-sm cursor-help hover:border-cyan-400 duration-300 transition-all ${flashStat === "tons" ? "border-green-400 ring-2 ring-green-100 scale-102" : "border-slate-200/80"}`}>
                <span className="text-[10px] text-slate-500 uppercase">Total Production</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{totalTons.toLocaleString()} T</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">+14.2%</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:border-cyan-400 duration-300">
                <span className="text-[10px] text-slate-500 uppercase">Vessels In Port</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{vesselsCount} vessels</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">Operating</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:border-cyan-400 duration-300">
                <span className="text-[10px] text-slate-500 uppercase">Revenue Statistics</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{revenue.toFixed(3)} B</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">+19.1%</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:border-cyan-400 duration-300">
                <span className="text-[10px] text-slate-500 uppercase">Crane Efficiency</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{efficiency}%</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">+5.5%</span>
                </div>
              </div>
            </div>

            {/* Simulated Main chart / Side bars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Product Shipping line graph */}
              <div className="lg:col-span-8 bg-white border border-slate-200 p-4 sm:p-5 rounded-xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Cargo Stacking Chart (Tons)</h4>
                      <span className="text-[10px] text-slate-400">Automated stacking metrics (Berth & Container Yard)</span>
                    </div>
                    <span className="text-[10px] text-[#1353b3] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded animate-pulse">Socket active</span>
                  </div>

                  {/* Built-in dynamic SVG line chart replicating the exact look */}
                  <div className="w-full aspect-[21/9] relative pt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                      <defs>
                        <linearGradient id="chartGradBlue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="chartGradGreen" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Chart Grid Lines */}
                      <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="1" />
                      <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="1" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="1" />
                      <line x1="0" y1="140" x2="500" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                      {/* Gradient Fill under Blue Curve */}
                      <path 
                        d="M 10,100 C 100,70 180,105 270,60 C 350,75 420,50 490,25 L 490,140 L 10,140 Z" 
                        fill="url(#chartGradBlue)" 
                      />

                      {/* Gradient Fill under Green Curve */}
                      <path 
                        d="M 10,120 C 100,105 180,90 270,100 C 350,110 420,80 490,65 L 490,140 L 10,140 Z" 
                        fill="url(#chartGradGreen)" 
                      />

                      {/* Line Curves */}
                      <path 
                        d="M 10,100 C 100,70 180,105 270,60 C 350,75 420,50 490,25" 
                        fill="none" 
                        stroke="#2563eb" 
                        strokeWidth="2.5" 
                      />
                      <path 
                        d="M 10,120 C 100,105 180,90 270,100 C 350,110 420,80 490,65" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="2" 
                      />

                      {/* Plotting points */}
                      <circle cx="10" cy="100" r="3.5" fill="#2563eb" />
                      <circle cx="270" cy="60" r="4.5" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="490" cy="25" r="3.5" fill="#2563eb" />
                    </svg>

                    {/* Chart axis label tags */}
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-1">
                      <span>M1</span>
                      <span>M2</span>
                      <span>M3</span>
                      <span>M4</span>
                      <span>M5</span>
                      <span>M6 (Auto Update...)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress of commodities (Cargo structure) */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-xl flex flex-col justify-between shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1 font-sans">Yard Capacity</h4>
                  <span className="text-[10px] text-slate-400 block mb-5">Categorized by main groups</span>

                  <div className="space-y-4">
                    {cargoPie.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-650 font-medium">{item.name}</span>
                          <span className="text-slate-900 text-[11px] font-bold">{item.value.toLocaleString()} tons</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.color} transition-all duration-1000`} 
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setActiveTab("yard")}
                  className="w-full mt-6 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-950 transition-all rounded-lg flex items-center justify-center gap-1"
                >
                  <span>Open Yard Plan</span>
                  <ChevronRight className="w-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: YARD OPERATIONS (Yard layout plan) */}
        {activeTab === "yard" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            {/* Left cargo controller */}
            <div className="lg:col-span-4 bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-4 flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-blue-600" />
                  Cargo Inventory List ({yardCategories.length})
                </h4>
                
                <div className="space-y-3">
                  {yardCategories.map((cat) => (
                    <div 
                      key={cat.name} 
                      className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${cat.active ? "bg-blue-50 border-blue-200" : "bg-slate-50/50 border-slate-100"}`}
                    >
                      <div className="space-y-0.5">
                        <span className={`text-xs font-bold ${cat.active ? "text-blue-700 font-bold" : "text-slate-800 font-medium"}`}>{cat.name}</span>
                        <div className="text-[10px] text-slate-400 uppercase">Remaining: {cat.count}</div>
                      </div>
                      <span className="px-2 py-0.5 bg-white border border-slate-200 text-[9px] rounded font-bold text-slate-500">
                        {cat.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 text-[10px] text-slate-400 space-y-1">
                <span className="block">DIRECT FEEDER VESSEL:</span>
                <span className="text-[#1353b3] font-bold block pb-2">BIEN DONG STAR | 0912N</span>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-blue-600 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right slots representation */}
            <div className="lg:col-span-8 bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Yard Operations (Real-time Grid)</h4>
                  <span className="text-[10px] text-slate-400">Container slot map updated automatically with trailer throughput</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span className="text-[10px] text-emerald-600 font-bold">Auto Updating</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {yardSlots.map((slot) => {
                  const isOccupied = !!slot.vessel;
                  return (
                    <div 
                      key={slot.id} 
                      className={`border rounded-xl p-4 flex flex-col justify-between min-h-[10rem] transition-all duration-500 ${
                        isOccupied 
                          ? "border-blue-300 bg-blue-50/20 shadow-sm" 
                          : "border-slate-100 bg-slate-50/30 border-dashed"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-slate-950 font-bold text-sm block">{slot.id}</span>
                          <span className="text-[10px] font-medium text-blue-800 bg-blue-100/70 border border-blue-200 px-1.5 py-0.5 rounded mt-1.5 inline-block">{slot.bay}</span>
                        </div>
                        <span className="text-[9px] text-slate-400">LOAD: {slot.capacity}</span>
                      </div>

                      {slot.vessel ? (
                        <div className="space-y-1 bg-white p-2 rounded border border-slate-200/60 shadow-sm animate-in zoom-in-95 duration-300">
                          <span className="text-[9px] text-slate-400 block uppercase tracking-tighter">ASSIGNED EQUIPMENT:</span>
                          <span className="text-xs font-extrabold text-slate-800 block truncate">{slot.vessel}</span>
                          <div className="flex justify-between text-[9px] text-slate-500 pt-1">
                            <span className="font-bold text-[#1353b3]">{slot.cargo}</span>
                            <span className="font-bold text-slate-700">{slot.weight}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-12 bg-slate-100/40 border border-dashed border-slate-200 rounded">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Empty Area (Ready for stacking)</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REAL-TIME ACTIVITY (Real-time activity logs) */}
        {activeTab === "history" && (
          <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-xl animate-in fade-in duration-300 shadow-sm">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#1353b3]" />
                  Real-time Server Workflows (WebSockets)
                </h4>
                <span className="text-[10px] text-slate-400 block">Data stream synchronized from Yard Terminal WebSocket and Discharging Cranes</span>
              </div>
              <span className="px-2 py-1 bg-blue-50 border border-blue-200 text-[9px] font-bold text-[#1353b3] rounded">
                Nha Rong Port Server - HCMC
              </span>
            </div>

            {/* Simulated Timeline */}
            <div className="relative border-l border-slate-200 pl-6 ml-3 space-y-6">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative group/timeline animate-in slide-in-from-top-4 duration-300">
                  {/* Timeline bullet */}
                  <span className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white flex items-center justify-center ${evt.type === "error" ? "bg-rose-500" : evt.type === "shift" ? "bg-indigo-500" : "bg-emerald-500"}`} />

                  {/* Operational Detail panel */}
                  <div className="bg-slate-50 hover:bg-slate-100/60 border border-slate-200/80 p-4 rounded-xl duration-250 shadow-sm hover:border-blue-200 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">{evt.time}</span>
                        <h5 className="text-[13px] font-bold text-slate-800">{evt.title}</h5>
                      </div>
                      
                      {evt.level && (
                        <span className="px-1.5 py-0.5 bg-rose-50 border border-rose-100 text-[9px] font-bold text-rose-700 rounded">
                          Level: {evt.level}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{evt.desc}</p>
                    
                    <div className="flex items-center justify-between mt-3 text-[10px] text-slate-400 border-t border-slate-200 pt-2">
                      <span>Operated by / Equipment: <span className="text-slate-750 font-bold">{evt.user}</span></span>
                      <span className="font-bold text-emerald-600">CONNECTED ✔</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: USER DIRECTORY (User permissions index) */}
        {activeTab === "users" && (
          <div className="bg-white border border-slate-200 p-5 rounded-xl animate-in fade-in duration-300 shadow-sm">
            <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-800">System Admin Control & Assignments (TOS RBAC)</h4>
                <span className="text-[10px] text-slate-400">List of sandbox testing accounts designated for quay dispatch & yard control</span>
              </div>
              <button 
                type="button" 
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition-colors cursor-pointer"
              >
                + New User
              </button>
            </div>

            {/* Responsive Table for users screen */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-500 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5">No.</th>
                    <th className="py-2.5">Group / Port</th>
                    <th className="py-2.5">Username</th>
                    <th className="py-2.5 font-sans">Personal Info</th>
                    <th className="py-2.5">Contact</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {systemUsers.map((usr) => (
                    <tr key={usr.stt} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 text-slate-400">{usr.stt}</td>
                      <td className="py-3">
                        <span className="font-bold text-slate-800 block">{usr.group}</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-tight">Terminal: {usr.port}</span>
                      </td>
                      <td className="py-3 font-medium text-blue-600">@{usr.username}</td>
                      <td className="py-3">
                        <span className="block text-slate-700 font-medium">{usr.name}</span>
                        <span className="text-[9px] text-slate-400">ID: {usr.userId} | {usr.location}</span>
                      </td>
                      <td className="py-3">
                        <span className="block text-slate-500 text-[10px]">{usr.phone}</span>
                        <span className="block text-[9px] text-[#1353b3]">{usr.email}</span>
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold ${usr.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}>
                          <span className={`w-1 h-1 rounded-full ${usr.status === "Active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                          {usr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Simulator footer */}
      <div className="bg-slate-100 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-[10px] text-slate-400">
        <span>Running on Docker Kubernetes Container</span>
        <span>Layout description: GTOS v2.4 (React UI Component)</span>
      </div>
    </div>
  );
}
