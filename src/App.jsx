import { useState, useEffect, useRef } from "react";

const MANUFACTURERS = [
  { id: 1, name: "Apex Knit Composite", location: "Gazipur, Dhaka", specialties: ["Jersey Knit", "French Terry", "Rib Knit"], moq: 500, leadTime: "21–28 days", certifications: ["GOTS", "OEKO-TEX"], rating: 4.8, priceRange: "$2.10 – $4.80/yd", capacity: "120,000 yds/mo", established: 2011 },
  { id: 2, name: "Rumi Textiles Ltd.", location: "Narayanganj", specialties: ["Denim", "Twill", "Canvas"], moq: 1000, leadTime: "28–35 days", certifications: ["BCI", "WRAP"], rating: 4.6, priceRange: "$3.40 – $7.20/yd", capacity: "85,000 yds/mo", established: 2007 },
  { id: 3, name: "Green Fiber Mills", location: "Chittagong", specialties: ["Organic Cotton", "Bamboo Blend", "Hemp"], moq: 300, leadTime: "18–25 days", certifications: ["GOTS", "Fair Trade", "OEKO-TEX"], rating: 4.9, priceRange: "$3.80 – $6.50/yd", capacity: "60,000 yds/mo", established: 2015 },
  { id: 4, name: "Shahjalal Weaving Co.", location: "Savar, Dhaka", specialties: ["Poplin", "Voile", "Chambray"], moq: 800, leadTime: "25–30 days", certifications: ["SEDEX", "ISO 9001"], rating: 4.5, priceRange: "$1.90 – $3.60/yd", capacity: "200,000 yds/mo", established: 2003 },
  { id: 5, name: "Padma Dye & Finish", location: "Tongi, Gazipur", specialties: ["Garment Dyeing", "Piece Dyeing", "Print"], moq: 200, leadTime: "14–21 days", certifications: ["OEKO-TEX", "bluesign"], rating: 4.7, priceRange: "$0.60 – $1.80/yd", capacity: "150,000 yds/mo", established: 2009 },
  { id: 6, name: "Bengal Loom Works", location: "Narsingdi", specialties: ["Muslin", "Jamdani", "Handloom"], moq: 100, leadTime: "35–45 days", certifications: ["Fair Trade", "Handloom Mark"], rating: 4.9, priceRange: "$5.20 – $14.00/yd", capacity: "8,000 yds/mo", established: 2018 },
];

const FABRIC_TYPES = ["All", "Jersey Knit", "French Terry", "Denim", "Twill", "Organic Cotton", "Bamboo Blend", "Poplin", "Muslin", "Jamdani"];

const StarRating = ({ rating }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: "1px", fontSize: "13px" }}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? "#E8782D" : "#ddd" }}>★</span>
    ))}
    <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#999", marginLeft: "5px" }}>{rating}</span>
  </span>
);

const Tag = ({ children, accent }) => (
  <span style={{
    display: "inline-block", padding: "3px 10px", fontSize: "11px",
    fontFamily: "var(--sans)", fontWeight: 500, letterSpacing: "0.01em",
    background: accent ? "#FEF3EB" : "#F3F3F5", color: accent ? "#C06A25" : "#64646E",
    borderRadius: "100px",
  }}>{children}</span>
);

const SupplierCard = ({ m, onRequestQuote }) => {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: "#fff", borderRadius: "14px", padding: "26px 28px", cursor: "pointer",
      border: `1px solid ${open ? "#E8782D" : "#EAEAED"}`,
      boxShadow: open ? "0 6px 28px rgba(232,120,45,0.07)" : "0 1px 4px rgba(0,0,0,0.03)",
      transition: "all 0.25s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "5px" }}>
            <h4 style={{ fontFamily: "var(--serif)", fontSize: "19px", fontWeight: 600, color: "#18182B", margin: 0 }}>{m.name}</h4>
            <StarRating rating={m.rating} />
          </div>
          <p style={{ fontFamily: "var(--sans)", fontSize: "13.5px", color: "#999", margin: "0 0 12px" }}>{m.location} · Est. {m.established}</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>{m.specialties.map(s => <Tag key={s}>{s}</Tag>)}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "24px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "15px", fontWeight: 600, color: "#18182B", margin: 0 }}>{m.priceRange}</p>
          <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "#bbb", margin: "3px 0 0" }}>per yard</p>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: "22px", paddingTop: "22px", borderTop: "1px solid #F2F2F4" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "18px" }}>
            {[["MOQ", `${m.moq} yds`], ["Lead Time", m.leadTime], ["Capacity", m.capacity]].map(([l, v]) => (
              <div key={l}>
                <p style={{ fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#bbb", margin: 0 }}>{l}</p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "15px", color: "#18182B", margin: "5px 0 0" }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "18px" }}>
            <p style={{ fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#bbb", margin: "0 0 8px" }}>Certifications</p>
            <div style={{ display: "flex", gap: "6px" }}>{m.certifications.map(c => <Tag key={c} accent>{c}</Tag>)}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); onRequestQuote(m); }} style={{
            padding: "10px 28px", background: "#18182B", color: "#fff", border: "none", borderRadius: "8px",
            fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s",
          }} onMouseEnter={e => e.target.style.background = "#2C2C42"} onMouseLeave={e => e.target.style.background = "#18182B"}>
            Request Quote →
          </button>
        </div>
      )}
    </div>
  );
};

const QuoteForm = ({ supplier, onClose, onSubmit }) => {
  const [form, setForm] = useState({ brand: "", fabric: "", qty: "", color: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div style={{ padding: "80px 40px", textAlign: "center" }}>
      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#EAFBF0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "24px", color: "#22A355" }}>✓</div>
      <h3 style={{ fontFamily: "var(--serif)", fontSize: "24px", fontWeight: 600, color: "#18182B", margin: "0 0 8px" }}>Quote Requested</h3>
      <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "#999" }}>{supplier.name} typically responds within 24–48 hours.</p>
    </div>
  );

  const inp = {
    width: "100%", padding: "11px 14px", background: "#FAFAFB", border: "1px solid #E5E5E8", borderRadius: "8px",
    color: "#18182B", fontFamily: "var(--sans)", fontSize: "14px", outline: "none", boxSizing: "border-box",
  };
  const lbl = { fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "#666", display: "block", marginBottom: "6px" };

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" }}>
        <div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 600, color: "#18182B", margin: 0 }}>Request a Quote</h3>
          <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "#E8782D", margin: "5px 0 0", fontWeight: 500 }}>{supplier.name}</p>
        </div>
        <button onClick={onClose} style={{ background: "#F4F4F6", border: "none", borderRadius: "50%", width: "32px", height: "32px", fontSize: "15px", color: "#999", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>
      <div style={{ display: "grid", gap: "18px" }}>
        <div><label style={lbl}>Brand Name</label><input style={inp} value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} placeholder="e.g., Everlane" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div><label style={lbl}>Fabric Type</label>
            <select style={{...inp, cursor: "pointer"}} value={form.fabric} onChange={e => setForm({...form, fabric: e.target.value})}>
              <option value="">Select...</option>
              {supplier.specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select></div>
          <div><label style={lbl}>Quantity (yards)</label><input style={inp} type="number" value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} placeholder={`Min: ${supplier.moq}`} /></div>
        </div>
        <div><label style={lbl}>Color / Finish Notes</label><input style={inp} value={form.color} onChange={e => setForm({...form, color: e.target.value})} placeholder="e.g., Navy, enzyme wash" /></div>
        <div><label style={lbl}>Additional Requirements</label><textarea style={{...inp, minHeight: "80px", resize: "vertical"}} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Certifications, delivery timeline, etc." /></div>
        <button onClick={() => { setSubmitted(true); setTimeout(onSubmit, 2000); }} style={{
          width: "100%", padding: "14px", background: "#E8782D", color: "#fff", border: "none", borderRadius: "8px",
          fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, cursor: "pointer",
        }}>Submit Quote Request</button>
      </div>
    </div>
  );
};

const DashboardDemo = () => {
  const orders = [
    { id: "SF-2026-0041", supplier: "Apex Knit Composite", fabric: "Jersey Knit", qty: "2,500 yds", status: "In Production", progress: 65, eta: "Mar 28" },
    { id: "SF-2026-0039", supplier: "Green Fiber Mills", fabric: "Organic Cotton", qty: "1,200 yds", status: "Quality Check", progress: 88, eta: "Mar 14" },
    { id: "SF-2026-0037", supplier: "Rumi Textiles Ltd.", fabric: "Denim", qty: "4,000 yds", status: "Shipped", progress: 100, eta: "Delivered" },
    { id: "SF-2026-0035", supplier: "Bengal Loom Works", fabric: "Muslin", qty: "300 yds", status: "Pending", progress: 20, eta: "Apr 15" },
  ];
  const sc = { "In Production": { bg: "#FEF5ED", fg: "#E8782D", bar: "#E8782D" }, "Quality Check": { bg: "#EEF4FF", fg: "#3B82F6", bar: "#3B82F6" }, "Shipped": { bg: "#EAFBF0", fg: "#22A355", bar: "#22A355" }, "Pending": { bg: "#F4F4F6", fg: "#999", bar: "#ccc" } };

  return (
    <div>
      <div className="kpi-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {[["Active Orders", "4", "↑ 2 this month"], ["Pending Quotes", "2", "Avg 36hr response"], ["Suppliers", "6", "All verified"], ["Avg Lead Time", "24d", "↓ 3d vs Q3"]].map(([l, v, s]) => (
          <div key={l} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #EAEAED", padding: "20px 22px" }}>
            <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#bbb", margin: 0 }}>{l}</p>
            <p style={{ fontFamily: "var(--serif)", fontSize: "30px", fontWeight: 700, color: "#18182B", margin: "4px 0 2px" }}>{v}</p>
            <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "#aaa", margin: 0 }}>{s}</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #EAEAED", overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #F2F2F4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "#18182B", margin: 0 }}>Order Tracker</h4>
          <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "#ccc" }}>Updated 2 min ago</span>
        </div>
        {orders.map((o, i) => {
          const c = sc[o.status] || sc["Pending"];
          return (
            <div key={o.id} className="order-grid" style={{ padding: "14px 24px", borderBottom: i < orders.length - 1 ? "1px solid #F8F8FA" : "none", display: "grid", gridTemplateColumns: "100px 1.2fr 1fr 115px 130px 65px", alignItems: "center", gap: "10px" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#bbb" }}>{o.id}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 500, color: "#18182B" }}>{o.supplier}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "#999" }}>{o.fabric} · {o.qty}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "100px", background: c.bg, color: c.fg, textAlign: "center", whiteSpace: "nowrap" }}>{o.status}</span>
              <div style={{ height: "5px", background: "#F0F0F3", borderRadius: "100px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${o.progress}%`, borderRadius: "100px", background: c.bar, transition: "width 0.8s ease" }} />
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#aaa", textAlign: "right" }}>{o.eta}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function StitchfaceHomepage() {
  const [activeDemo, setActiveDemo] = useState("directory");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [quoteSupplier, setQuoteSupplier] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [vis, setVis] = useState({});
  const demoRef = useRef(null);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setVis(v => ({ ...v, [e.target.dataset.anim]: true })); });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-anim]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filtered = MANUFACTURERS.filter(m =>
    (filter === "All" || m.specialties.includes(filter)) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) || m.specialties.some(s => s.toLowerCase().includes(search.toLowerCase())))
  );

  const tabs = [
    { id: "directory", label: "Supplier Directory", icon: "⌕" },
    { id: "quote", label: "Quote System", icon: "✎" },
    { id: "dashboard", label: "Brand Dashboard", icon: "◫" },
  ];

  const anim = key => ({
    opacity: vis[key] ? 1 : 0,
    transform: vis[key] ? "translateY(0)" : "translateY(28px)",
    transition: "all 0.75s cubic-bezier(0.23, 1, 0.32, 1)",
  });

  return (
    <div style={{ background: "#FAFAFB", color: "#18182B", minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        html, body, #root { width: 100%; margin: 0; padding: 0; }
        :root {
          --serif: 'Source Serif 4', Georgia, serif;
          --sans: 'IBM Plex Sans', -apple-system, sans-serif;
          --mono: 'IBM Plex Mono', 'Menlo', monospace;
          --accent: #E8782D;
          --ink: #18182B;
          --muted: #6B6B7B;
          --faint: #EAEAED;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: #FDDCBF; color: #18182B; }
        html { scroll-behavior: smooth; }
        @keyframes heroIn { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        select option { background: #fff; color: #18182B; }
        @media (max-width: 860px) {
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
          .step-grid { grid-template-columns: 1fr !important; }
          .tab-row { flex-direction: column !important; }
          .kpi-row { grid-template-columns: 1fr 1fr !important; }
          .order-grid { grid-template-columns: 1fr !important; gap: 4px !important; }
          .hero-h1 { font-size: 42px !important; }
          .wrap { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
        background: scrollY > 30 ? "rgba(250,250,251,0.92)" : "transparent",
        backdropFilter: scrollY > 30 ? "blur(14px)" : "none",
        borderBottom: scrollY > 30 ? "1px solid var(--faint)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="9" height="9" rx="2.5" fill="var(--accent)" />
            <rect x="13" y="2" width="9" height="9" rx="2.5" fill="var(--ink)" opacity="0.12" />
            <rect x="2" y="13" width="9" height="9" rx="2.5" fill="var(--ink)" opacity="0.12" />
            <rect x="13" y="13" width="9" height="9" rx="2.5" fill="var(--accent)" opacity="0.45" />
          </svg>
          <span style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: "16.5px", color: "var(--ink)", letterSpacing: "-0.01em" }}>stitchface</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["How It Works", "Suppliers", "Pricing"].map(t => (
            <a key={t} href="#" style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "#999", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "var(--ink)"} onMouseLeave={e => e.target.style.color = "#999"}>{t}</a>
          ))}
          <button style={{
            padding: "8px 22px", background: "var(--ink)", color: "#fff", border: "none", borderRadius: "8px",
            fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600, cursor: "pointer",
          }}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "148px 48px 112px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 16px 5px 12px", background: "#FEF3EB", borderRadius: "100px", marginBottom: "32px", animation: "heroIn 0.7s ease both", animationDelay: "0.1s" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />
            <span style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "#C06A25" }}>Connecting US brands with Bangladesh's top textile mills</span>
          </div>

          <h1 className="hero-h1" style={{
            fontFamily: "var(--serif)", fontSize: "58px", lineHeight: 1.1, fontWeight: 700,
            letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: "24px",
            animation: "heroIn 0.8s ease both", animationDelay: "0.2s",
          }}>
            Source textiles directly.{" "}
            <span style={{ color: "var(--accent)" }}>Skip the middlemen.</span>
          </h1>

          <p style={{
            fontFamily: "var(--sans)", fontSize: "18.5px", lineHeight: 1.75, color: "var(--muted)",
            fontWeight: 400, maxWidth: "540px", margin: "0 auto 44px",
            animation: "heroIn 0.8s ease both", animationDelay: "0.35s",
          }}>
            Stitchface connects American fashion brands with verified Bangladeshi textile manufacturers — reducing lead times, cutting costs, and making ethical sourcing simple.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", animation: "heroIn 0.8s ease both", animationDelay: "0.5s" }}>
            <button onClick={() => demoRef.current?.scrollIntoView({ behavior: "smooth" })} style={{
              padding: "14px 34px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "10px",
              fontFamily: "var(--sans)", fontSize: "15px", fontWeight: 600, cursor: "pointer",
              boxShadow: "0 3px 14px rgba(232,120,45,0.25)", transition: "all 0.2s",
            }} onMouseEnter={e => e.target.style.transform = "translateY(-1px)"} onMouseLeave={e => e.target.style.transform = "translateY(0)"}>
              Try the Demo
            </button>
            <button style={{
              padding: "14px 34px", background: "#fff", color: "var(--ink)", border: "1px solid #DDDDE0", borderRadius: "10px",
              fontFamily: "var(--sans)", fontSize: "15px", fontWeight: 600, cursor: "pointer",
            }}>Learn More</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section data-anim="stats" className="wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 112px", ...anim("stats") }}>
        <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {[
            ["4,500+", "Verified manufacturers across 8 districts"],
            ["72 hrs", "Average first response to quote requests"],
            ["40%", "Cost reduction vs. traditional intermediaries"],
            ["100%", "Compliance-verified suppliers"],
          ].map(([n, d]) => (
            <div key={n} style={{ background: "#fff", borderRadius: "14px", border: "1px solid var(--faint)", padding: "28px 26px" }}>
              <p style={{ fontFamily: "var(--serif)", fontSize: "32px", fontWeight: 700, color: "var(--accent)", marginBottom: "8px" }}>{n}</p>
              <p style={{ fontFamily: "var(--sans)", fontSize: "14px", lineHeight: 1.55, color: "var(--muted)" }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-anim="how" className="wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 120px", ...anim("how") }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "14px", textAlign: "center" }}>How It Works</p>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "38px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "52px", textAlign: "center" }}>
          Three steps to your first shipment
        </h2>
        <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
          {[
            ["01", "Discover", "Browse verified manufacturers by fabric type, certification, MOQ, and capacity. Every supplier is audited and rated by brands like yours."],
            ["02", "Quote", "Send detailed RFQs directly to manufacturers. Compare pricing, lead times, and capabilities side by side — no phone tag."],
            ["03", "Track", "Monitor production from your dashboard. Get alerts on milestones, quality checks, and shipping — all the way to your warehouse."],
          ].map(([num, title, desc]) => (
            <div key={num} style={{
              background: "#fff", borderRadius: "16px", border: "1px solid var(--faint)", padding: "36px 32px",
              transition: "box-shadow 0.3s, transform 0.3s",
            }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 36px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px", borderRadius: "10px", background: "#FEF3EB",
                fontFamily: "var(--mono)", fontSize: "14px", fontWeight: 500, color: "var(--accent)", marginBottom: "22px",
              }}>{num}</span>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "23px", fontWeight: 600, color: "var(--ink)", marginBottom: "12px" }}>{title}</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: "15px", lineHeight: 1.7, color: "var(--muted)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section ref={demoRef} data-anim="demo" className="wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 120px", ...anim("demo") }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "14px", textAlign: "center" }}>Interactive Demo</p>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "38px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "40px", textAlign: "center" }}>
          See how it works
        </h2>

        <div className="tab-row" style={{ display: "flex", gap: "6px", marginBottom: "0" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setActiveDemo(t.id); setQuoteSupplier(null); }} style={{
              padding: "11px 22px", display: "flex", alignItems: "center", gap: "7px",
              background: activeDemo === t.id ? "#fff" : "transparent",
              border: activeDemo === t.id ? "1px solid var(--faint)" : "1px solid transparent",
              borderBottom: activeDemo === t.id ? "1px solid #fff" : "none",
              borderRadius: "10px 10px 0 0",
              fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600,
              color: activeDemo === t.id ? "var(--ink)" : "#aaa",
              cursor: "pointer", transition: "color 0.2s",
              position: "relative", zIndex: activeDemo === t.id ? 2 : 1,
              marginBottom: activeDemo === t.id ? "-1px" : "0",
            }}><span style={{ fontSize: "15px" }}>{t.icon}</span>{t.label}</button>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--faint)", borderRadius: "0 14px 14px 14px", minHeight: "520px" }}>
          {activeDemo === "directory" && (
            <div style={{ padding: "28px" }}>
              <div style={{ display: "flex", gap: "12px", marginBottom: "22px", flexWrap: "wrap", alignItems: "center" }}>
                <input type="text" placeholder="Search manufacturers..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: "260px", padding: "10px 14px", background: "#FAFAFB", border: "1px solid #E5E5E8", borderRadius: "8px", fontFamily: "var(--sans)", fontSize: "13.5px", color: "var(--ink)", outline: "none" }} />
                <select value={filter} onChange={e => setFilter(e.target.value)} style={{
                  padding: "10px 14px", background: "#FAFAFB", border: "1px solid #E5E5E8", borderRadius: "8px",
                  fontFamily: "var(--sans)", fontSize: "13.5px", color: "var(--ink)", outline: "none", cursor: "pointer",
                }}>{FABRIC_TYPES.map(f => <option key={f} value={f}>{f}</option>)}</select>
                <span style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "#ccc" }}>{filtered.length} results</span>
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                {filtered.map(m => <SupplierCard key={m.id} m={m} onRequestQuote={setQuoteSupplier} />)}
                {!filtered.length && <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "#bbb", textAlign: "center", padding: "80px" }}>No manufacturers match your criteria.</p>}
              </div>
            </div>
          )}
          {activeDemo === "quote" && (
            <div style={{ maxWidth: "540px", margin: "0 auto" }}>
              {quoteSupplier ? (
                <QuoteForm supplier={quoteSupplier} onClose={() => setQuoteSupplier(null)} onSubmit={() => setQuoteSupplier(null)} />
              ) : (
                <div style={{ padding: "80px 40px", textAlign: "center" }}>
                  <div style={{ fontSize: "36px", marginBottom: "16px", opacity: 0.3 }}>✎</div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" }}>Select a supplier first</h3>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "#999" }}>
                    Browse the <span style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }} onClick={() => setActiveDemo("directory")}>Supplier Directory</span> and click "Request Quote" on any manufacturer.
                  </p>
                </div>
              )}
            </div>
          )}
          {activeDemo === "dashboard" && <div style={{ padding: "28px" }}><DashboardDemo /></div>}
        </div>
      </section>

      {/* CTA */}
      <section data-anim="cta" className="wrap" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px 120px", ...anim("cta") }}>
        <div style={{
          background: "var(--ink)", borderRadius: "20px", padding: "88px 60px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-100px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(232,120,45,0.07)" }} />
          <div style={{ position: "absolute", bottom: "-70px", left: "-50px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(232,120,45,0.04)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "40px", fontWeight: 700, color: "#fff", marginBottom: "16px", letterSpacing: "-0.02em" }}>Ready to source smarter?</h2>
            <p style={{ fontFamily: "var(--sans)", fontSize: "17px", color: "rgba(255,255,255,0.55)", maxWidth: "440px", margin: "0 auto 40px", lineHeight: 1.7 }}>
              Join brands already using Stitchface to connect directly with Bangladesh's top textile manufacturers.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
              <button style={{ padding: "16px 40px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "10px", fontFamily: "var(--sans)", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 3px 16px rgba(232,120,45,0.3)" }}>Create Free Account</button>
              <button style={{ padding: "16px 40px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "10px", fontFamily: "var(--sans)", fontSize: "15px", fontWeight: 500, cursor: "pointer" }}>Talk to Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wrap" style={{
        maxWidth: "1100px", margin: "0 auto", padding: "32px 48px 52px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid var(--faint)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="9" height="9" rx="2.5" fill="var(--accent)" />
            <rect x="13" y="2" width="9" height="9" rx="2.5" fill="var(--ink)" opacity="0.12" />
            <rect x="2" y="13" width="9" height="9" rx="2.5" fill="var(--ink)" opacity="0.12" />
            <rect x="13" y="13" width="9" height="9" rx="2.5" fill="var(--accent)" opacity="0.45" />
          </svg>
          <span style={{ fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600, color: "#bbb" }}>stitchface</span>
        </div>
        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "#ccc" }}>© 2026 Stitchface · Dhaka · New York · Los Angeles</p>
      </footer>
    </div>
  );
}