import { useState, useEffect, useRef } from "react";

const MANUFACTURERS = [
  { id: 1, name: "Apex Knit Composite", location: "Gazipur, Dhaka", specialties: ["Jersey Knit", "French Terry", "Rib Knit"], moq: 500, leadTime: "21-28 days", certifications: ["GOTS", "OEKO-TEX"], rating: 4.8, priceRange: "$2.10 - $4.80/yd", capacity: "120,000 yds/mo", established: 2011 },
  { id: 2, name: "Rumi Textiles Ltd.", location: "Narayanganj", specialties: ["Denim", "Twill", "Canvas"], moq: 1000, leadTime: "28-35 days", certifications: ["BCI", "WRAP"], rating: 4.6, priceRange: "$3.40 - $7.20/yd", capacity: "85,000 yds/mo", established: 2007 },
  { id: 3, name: "Green Fiber Mills", location: "Chittagong", specialties: ["Organic Cotton", "Bamboo Blend", "Hemp"], moq: 300, leadTime: "18-25 days", certifications: ["GOTS", "Fair Trade", "OEKO-TEX"], rating: 4.9, priceRange: "$3.80 - $6.50/yd", capacity: "60,000 yds/mo", established: 2015 },
  { id: 4, name: "Shahjalal Weaving Co.", location: "Savar, Dhaka", specialties: ["Poplin", "Voile", "Chambray"], moq: 800, leadTime: "25-30 days", certifications: ["SEDEX", "ISO 9001"], rating: 4.5, priceRange: "$1.90 - $3.60/yd", capacity: "200,000 yds/mo", established: 2003 },
  { id: 5, name: "Padma Dye & Finish", location: "Tongi, Gazipur", specialties: ["Garment Dyeing", "Piece Dyeing", "Print"], moq: 200, leadTime: "14-21 days", certifications: ["OEKO-TEX", "bluesign"], rating: 4.7, priceRange: "$0.60 - $1.80/yd", capacity: "150,000 yds/mo", established: 2009 },
  { id: 6, name: "Bengal Loom Works", location: "Narsingdi", specialties: ["Muslin", "Jamdani", "Handloom"], moq: 100, leadTime: "35-45 days", certifications: ["Fair Trade", "Handloom Mark"], rating: 4.9, priceRange: "$5.20 - $14.00/yd", capacity: "8,000 yds/mo", established: 2018 },
];

const FABRIC_TYPES = ["All", "Jersey Knit", "French Terry", "Denim", "Twill", "Organic Cotton", "Bamboo Blend", "Poplin", "Muslin", "Jamdani"];

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", fontSize: "13px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < full ? "#C8A55C" : i === full && partial > 0 ? "#C8A55C" : "#3a3a3a", opacity: i < full || (i === full && partial > 0) ? 1 : 0.3 }}>★</span>
      ))}
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#999", marginLeft: "4px" }}>{rating}</span>
    </span>
  );
};

const CertBadge = ({ name }) => (
  <span style={{
    display: "inline-block", padding: "2px 8px", fontSize: "10px", fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.05em", textTransform: "uppercase", border: "1px solid #2a2a2a",
    borderRadius: "2px", color: "#aaa", background: "rgba(200,165,92,0.05)"
  }}>{name}</span>
);

const SupplierCard = ({ m, onRequestQuote }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      background: "#111", border: "1px solid #1e1e1e", padding: "24px", cursor: "pointer",
      transition: "all 0.3s ease", borderLeft: expanded ? "3px solid #C8A55C" : "3px solid transparent",
    }} onClick={() => setExpanded(!expanded)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h4 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px", color: "#e8e8e8", margin: 0 }}>{m.name}</h4>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#777", margin: "4px 0 8px" }}>{m.location} · Est. {m.established}</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {m.specialties.map(s => <CertBadge key={s} name={s} />)}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <StarRating rating={m.rating} />
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "#C8A55C", margin: "6px 0 0" }}>{m.priceRange}</p>
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #1e1e1e", animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            {[["MOQ", `${m.moq} yds`], ["Lead Time", m.leadTime], ["Capacity", m.capacity]].map(([label, val]) => (
              <div key={label}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", margin: 0 }}>{label}</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "#ccc", margin: "4px 0 0" }}>{val}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "12px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", margin: 0 }}>Certifications</p>
            <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>{m.certifications.map(c => <CertBadge key={c} name={c} />)}</div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onRequestQuote(m); }} style={{
            marginTop: "16px", padding: "10px 24px", background: "#C8A55C", color: "#0a0a0a", border: "none",
            fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s ease",
          }} onMouseEnter={e => e.target.style.background = "#d4b36a"} onMouseLeave={e => e.target.style.background = "#C8A55C"}>
            Request Quote
          </button>
        </div>
      )}
    </div>
  );
};

const QuoteForm = ({ supplier, onClose, onSubmit }) => {
  const [form, setForm] = useState({ brand: "", fabric: "", qty: "", color: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => { setSubmitted(true); setTimeout(onSubmit, 2000); };

  if (submitted) {
    return (
      <div style={{ padding: "60px 40px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>✓</div>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", color: "#e8e8e8", margin: 0 }}>Quote Requested</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#777", marginTop: "8px" }}>
          {supplier.name} typically responds within 24-48 hours.
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%", padding: "10px 12px", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#e8e8e8",
    fontFamily: "'DM Sans', sans-serif", fontSize: "14px", outline: "none", boxSizing: "border-box",
  };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", display: "block", marginBottom: "6px" };

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "22px", color: "#e8e8e8", margin: 0 }}>Request Quote</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#C8A55C", margin: "4px 0 0" }}>{supplier.name}</p>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", fontSize: "20px", cursor: "pointer" }}>✕</button>
      </div>
      <div style={{ display: "grid", gap: "16px" }}>
        <div><label style={labelStyle}>Brand Name</label><input style={inputStyle} value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} placeholder="e.g., Everlane" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div><label style={labelStyle}>Fabric Type</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.fabric} onChange={e => setForm({ ...form, fabric: e.target.value })}>
              <option value="">Select...</option>
              {supplier.specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Quantity (yards)</label><input style={inputStyle} type="number" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} placeholder={`Min: ${supplier.moq}`} /></div>
        </div>
        <div><label style={labelStyle}>Color / Finish Notes</label><input style={inputStyle} value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} placeholder="e.g., Navy, enzyme wash" /></div>
        <div><label style={labelStyle}>Additional Requirements</label><textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Certifications needed, delivery timeline, etc." /></div>
        <button onClick={handleSubmit} style={{
          width: "100%", padding: "14px", background: "#C8A55C", color: "#0a0a0a", border: "none",
          fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", cursor: "pointer", marginTop: "4px",
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
    { id: "SF-2026-0035", supplier: "Bengal Loom Works", fabric: "Muslin", qty: "300 yds", status: "Awaiting Payment", progress: 20, eta: "Apr 15" },
  ];
  const statusColor = { "In Production": "#C8A55C", "Quality Check": "#5CA7C8", "Shipped": "#5CC87A", "Awaiting Payment": "#C85C5C" };

  return (
    <div style={{ padding: "4px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[["Active Orders", "4"], ["Pending Quotes", "2"], ["Total Suppliers", "6"], ["Avg Lead Time", "24 days"]].map(([label, val]) => (
          <div key={label} style={{ background: "#111", border: "1px solid #1e1e1e", padding: "16px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", margin: 0 }}>{label}</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "28px", color: "#e8e8e8", margin: "8px 0 0", fontWeight: 500 }}>{val}</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#111", border: "1px solid #1e1e1e" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e1e1e" }}>
          <h4 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "18px", color: "#e8e8e8", margin: 0 }}>Order Tracker</h4>
        </div>
        {orders.map((o, i) => (
          <div key={o.id} style={{ padding: "16px 20px", borderBottom: i < orders.length - 1 ? "1px solid #1a1a1a" : "none", display: "grid", gridTemplateColumns: "120px 1fr 1fr 100px 140px 80px", alignItems: "center", gap: "12px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#777" }}>{o.id}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#ccc" }}>{o.supplier}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#999" }}>{o.fabric} · {o.qty}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: statusColor[o.status] || "#777", textTransform: "uppercase", letterSpacing: "0.04em" }}>{o.status}</span>
            <div style={{ height: "4px", background: "#1e1e1e", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${o.progress}%`, background: statusColor[o.status] || "#555", borderRadius: "2px", transition: "width 1s ease" }} />
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#555", textAlign: "right" }}>{o.eta}</span>
          </div>
        ))}
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
  const [visible, setVisible] = useState({});
  const demoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.anim]: true })); });
    }, { threshold: 0.15 });
    document.querySelectorAll("[data-anim]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = MANUFACTURERS.filter(m =>
    (filter === "All" || m.specialties.includes(filter)) &&
    (search === "" || m.name.toLowerCase().includes(search.toLowerCase()) || m.specialties.some(s => s.toLowerCase().includes(search.toLowerCase())))
  );

  const demoTabs = [
    { id: "directory", label: "Supplier Directory" },
    { id: "quote", label: "Quote System" },
    { id: "dashboard", label: "Brand Dashboard" },
  ];

  return (
    <div style={{ background: "#0a0a0a", color: "#e8e8e8", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: #C8A55C; color: #0a0a0a; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes widthGrow { from { width: 0; } to { width: 60px; } }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(-10%, 5%); }
          70% { transform: translate(8%, -5%); }
          90% { transform: translate(-3%, 10%); }
        }
        .grain-overlay {
          position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; z-index: 9999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
        }
        select option { background: #111; color: #e8e8e8; }
        @media (max-width: 768px) {
          .hero-title { font-size: 48px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .demo-tabs { flex-direction: column !important; }
          .order-row { grid-template-columns: 1fr !important; gap: 6px !important; }
          .kpi-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div className="grain-overlay" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 50 ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid #1a1a1a" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", border: "2px solid #C8A55C", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "12px", height: "12px", background: "#C8A55C" }} />
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8e8e8" }}>Stitchface</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["How It Works", "Suppliers", "Pricing"].map(item => (
            <a key={item} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#777", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#e8e8e8"} onMouseLeave={e => e.target.style.color = "#777"}>{item}</a>
          ))}
          <button style={{
            padding: "8px 20px", background: "transparent", border: "1px solid #C8A55C", color: "#C8A55C",
            fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
          }} onMouseEnter={e => { e.target.style.background = "#C8A55C"; e.target.style.color = "#0a0a0a"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#C8A55C"; }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px 60px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "15%", right: "8%", width: "400px", height: "400px", border: "1px solid #1a1a1a", opacity: 0.4, transform: `rotate(${scrollY * 0.02}deg)` }} />
        <div style={{ position: "absolute", top: "25%", right: "13%", width: "250px", height: "250px", border: "1px solid #1e1e1e", opacity: 0.25, transform: `rotate(${-scrollY * 0.03}deg)` }} />

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#C8A55C", marginBottom: "24px", animation: "slideDown 0.8s ease both", animationDelay: "0.2s",
        }}>US Brands × Bangladesh Textiles</p>

        <h1 className="hero-title" style={{
          fontFamily: "'Instrument Serif', serif", fontSize: "82px", lineHeight: 1.05, fontWeight: 400,
          maxWidth: "800px", animation: "slideUp 1s ease both", animationDelay: "0.4s",
        }}>
          Source textiles<br />
          <span style={{ fontStyle: "italic", color: "#C8A55C" }}>without</span> the friction
        </h1>

        <div style={{ width: "60px", height: "1px", background: "#C8A55C", margin: "32px 0", animation: "widthGrow 0.8s ease both", animationDelay: "0.8s" }} />

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "18px", lineHeight: 1.7, color: "#888", maxWidth: "520px",
          fontWeight: 300, animation: "slideUp 1s ease both", animationDelay: "0.6s",
        }}>
          Stitchface connects American fashion brands directly with verified Bangladeshi textile manufacturers — cutting out the middlemen, reducing lead times, and making ethical sourcing the default.
        </p>

        <div style={{ display: "flex", gap: "16px", marginTop: "40px", animation: "slideUp 1s ease both", animationDelay: "0.8s" }}>
          <button onClick={() => demoRef.current?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "16px 36px", background: "#C8A55C", color: "#0a0a0a", border: "none",
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
          }} onMouseEnter={e => e.target.style.background = "#d4b36a"} onMouseLeave={e => e.target.style.background = "#C8A55C"}>
            Try the Demo
          </button>
          <button style={{
            padding: "16px 36px", background: "transparent", color: "#e8e8e8", border: "1px solid #333",
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 400, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
          }} onMouseEnter={e => e.target.style.borderColor = "#C8A55C"} onMouseLeave={e => e.target.style.borderColor = "#333"}>
            Learn More
          </button>
        </div>
      </section>

      {/* STATS BAR */}
      <section data-anim="stats" style={{
        borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "50px 60px",
        opacity: visible.stats ? 1 : 0, transform: visible.stats ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease",
      }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px" }}>
          {[
            ["4,500+", "Verified Manufacturers", "Across 8 districts in Bangladesh"],
            ["72 hrs", "Average First Response", "From quote request to supplier reply"],
            ["40%", "Cost Reduction", "vs. traditional sourcing intermediaries"],
            ["100%", "Compliance Verified", "GOTS, OEKO-TEX, Fair Trade certified"],
          ].map(([num, label, sub]) => (
            <div key={label}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "36px", fontWeight: 400, color: "#C8A55C", marginBottom: "8px" }}>{num}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "#e8e8e8" }}>{label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#555", marginTop: "4px" }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-anim="how" style={{
        padding: "100px 60px",
        opacity: visible.how ? 1 : 0, transform: visible.how ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease",
      }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A55C", marginBottom: "12px" }}>How It Works</p>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "44px", fontWeight: 400, marginBottom: "60px", maxWidth: "500px", lineHeight: 1.15 }}>
          Three steps to your<br /><span style={{ fontStyle: "italic" }}>first shipment</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {[
            ["01", "Discover", "Browse verified manufacturers by fabric type, certification, MOQ, and capacity. Every supplier is audited and rated by brands like yours."],
            ["02", "Quote", "Send detailed quote requests directly to manufacturers. Compare pricing, lead times, and capabilities side by side — no phone tag required."],
            ["03", "Track", "Monitor production in real time from your dashboard. Get alerts on milestones, quality checks, and shipping — all the way to your warehouse."],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ background: "#111", border: "1px solid #1a1a1a", padding: "40px 32px" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#C8A55C" }}>{num}</span>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "28px", fontWeight: 400, margin: "16px 0 12px" }}>{title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "#777", fontWeight: 300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section ref={demoRef} data-anim="demo" style={{
        padding: "100px 60px", borderTop: "1px solid #1a1a1a",
        opacity: visible.demo ? 1 : 0, transform: visible.demo ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease",
      }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A55C", marginBottom: "12px" }}>Interactive Demo</p>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "44px", fontWeight: 400, marginBottom: "40px", lineHeight: 1.15 }}>
          See it in action
        </h2>

        {/* Demo Tabs */}
        <div className="demo-tabs" style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
          {demoTabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveDemo(tab.id); setQuoteSupplier(null); }} style={{
              flex: 1, padding: "16px 24px", background: activeDemo === tab.id ? "#111" : "#0e0e0e",
              border: "1px solid #1a1a1a", borderBottom: activeDemo === tab.id ? "1px solid #111" : "1px solid #1a1a1a",
              color: activeDemo === tab.id ? "#C8A55C" : "#555", fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.3s",
            }}>{tab.label}</button>
          ))}
        </div>

        {/* Demo Content */}
        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderTop: "none", minHeight: "500px" }}>
          {activeDemo === "directory" && (
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
                <input
                  type="text" placeholder="Search manufacturers..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{
                    padding: "10px 16px", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#e8e8e8",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "13px", outline: "none", width: "250px",
                  }}
                />
                <select value={filter} onChange={e => setFilter(e.target.value)} style={{
                  padding: "10px 16px", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#e8e8e8",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "13px", outline: "none", cursor: "pointer",
                }}>
                  {FABRIC_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#555" }}>{filtered.length} results</span>
              </div>
              <div style={{ display: "grid", gap: "8px" }}>
                {filtered.map(m => <SupplierCard key={m.id} m={m} onRequestQuote={setQuoteSupplier} />)}
                {filtered.length === 0 && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#555", textAlign: "center", padding: "60px" }}>No manufacturers match your criteria. Try adjusting your filters.</p>
                )}
              </div>
            </div>
          )}

          {activeDemo === "quote" && (
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              {quoteSupplier ? (
                <QuoteForm supplier={quoteSupplier} onClose={() => setQuoteSupplier(null)} onSubmit={() => setQuoteSupplier(null)} />
              ) : (
                <div style={{ padding: "60px 40px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "24px", color: "#e8e8e8", marginBottom: "12px" }}>Select a supplier first</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#555" }}>
                    Browse the <span style={{ color: "#C8A55C", cursor: "pointer" }} onClick={() => setActiveDemo("directory")}>Supplier Directory</span> and click "Request Quote" on any manufacturer to start.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeDemo === "dashboard" && (
            <div style={{ padding: "24px" }}>
              <DashboardDemo />
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section data-anim="cta" style={{
        padding: "120px 60px", borderTop: "1px solid #1a1a1a", textAlign: "center",
        opacity: visible.cta ? 1 : 0, transform: visible.cta ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease",
      }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "52px", fontWeight: 400, marginBottom: "16px", lineHeight: 1.15 }}>
          Ready to source <span style={{ fontStyle: "italic", color: "#C8A55C" }}>smarter</span>?
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#777", maxWidth: "440px", margin: "0 auto 40px", fontWeight: 300, lineHeight: 1.7 }}>
          Join brands already using Stitchface to connect directly with Bangladesh's best textile manufacturers.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button style={{
            padding: "18px 48px", background: "#C8A55C", color: "#0a0a0a", border: "none",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", cursor: "pointer",
          }}>Create Free Account</button>
          <button style={{
            padding: "18px 48px", background: "transparent", color: "#e8e8e8", border: "1px solid #333",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 400, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: "pointer",
          }}>Talk to Sales</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #1a1a1a", padding: "48px 60px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "20px", height: "20px", border: "1.5px solid #C8A55C", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "8px", height: "8px", background: "#C8A55C" }} />
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#555" }}>Stitchface</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#333" }}>© 2026 Stitchface. Dhaka · New York · Los Angeles</p>
      </footer>
    </div>
  );
}