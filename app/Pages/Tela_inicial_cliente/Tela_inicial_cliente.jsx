"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/SideBar_cliente";
import Topbar  from "../../components/TopBar_cliente";

// ─── ICON COMPONENT ──────────────────────────────────────────────────────────
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const paths = {
    chevRight:    ["M9 18l6-6-6-6"],
    chevLeft:     ["M15 18l-6-6 6-6"],
    mapPin:       ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z","M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0"],
    checkCircle:  ["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
    search:       ["M11 11m-8 0a8 8 0 1016 0 8 8 0 00-16 0","M21 21l-4.35-4.35"],
    sliders:      ["M4 21v-7","M4 10V3","M12 21v-9","M12 8V3","M20 21v-5","M20 12V3","M1 14h6","M9 8h6","M17 16h6"],
    zap:          ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
    droplet:      ["M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"],
    wrench2:      ["M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"],
    heartIcon:    ["M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"],
    broomCat:     ["M2 19.5A2.5 2.5 0 014.5 17h15","M4.5 17l1.5-9h12l1.5 9","M9 11v6","M12 11v6","M15 11v6"],
    homeIcon:     ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"],
    scissorsIcon: ["M6 9a3 3 0 100-6 3 3 0 000 6z","M6 15a3 3 0 100 6 3 3 0 000-6z","M20 4L8.12 15.88","M14.47 14.48L20 20","M8.12 8.12L12 12"],
    leafIcon:     ["M17 8C8 10 5.9 16.17 3.82 19.56A1 1 0 004.72 21C11.81 17.44 14.83 12.66 17 8zm0 0c0 9-9 15-17 7"],
    carIcon:      ["M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2","M17 17m-2 0a2 2 0 104 0 2 2 0 00-4 0","M7 17m-2 0a2 2 0 104 0 2 2 0 00-4 0"],
    monitorIcon:  ["M20 3H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2z","M8 21h8","M12 17v4"],
    pawIcon:      ["M11 4a2 2 0 114 0","M18 8a2 2 0 114 0","M18 16a2 2 0 114 0","M4 12a2 2 0 114 0","M9 10a5 5 0 015 5v3.5a3.5 3.5 0 01-7 0V15a5 5 0 015-5z"],
    bookIcon:     ["M4 19.5A2.5 2.5 0 016.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"],
    user:         ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 7m-4 0a4 4 0 108 0 4 4 0 00-8 0"],
    users:        ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M9 7m-4 0a4 4 0 108 0 4 4 0 00-8 0","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75"],
    grid:         null,
    star:         null,
  };

  if (name === "star") {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  }
  if (name === "grid") {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
  }
  const d = paths[name];
  if (!d || d.length === 0) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p}/>)}
    </svg>
  );
}

// ─── INFINITE CAROUSEL ───────────────────────────────────────────────────────
function InfiniteCarousel({ items, renderItem, itemWidth, gap = 16, visibleCount }) {
  const CLONE_COUNT = visibleCount + 1;
  const cloned = [
    ...items.slice(-CLONE_COUNT),
    ...items,
    ...items.slice(0, CLONE_COUNT),
  ];
  const realStart = CLONE_COUNT;
  const step = itemWidth + gap;

  const [index, setIndex] = useState(realStart);
  const [animating, setAnimating] = useState(true);
  const lockRef = useRef(false);

  const handleTransitionEnd = useCallback(() => {
    if (index < realStart) {
      setAnimating(false);
      setIndex(index + items.length);
    } else if (index >= realStart + items.length) {
      setAnimating(false);
      setIndex(index - items.length);
    }
  }, [index, items.length, realStart]);

  useEffect(() => {
    if (!animating) {
      const id = requestAnimationFrame(() => setAnimating(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animating]);

  const go = (dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimating(true);
    setIndex(i => i + dir);
    setTimeout(() => { lockRef.current = false; }, 380);
  };

  const offset = -(index * step);

  const ArrowBtn = ({ dir }) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [dir === -1 ? "left" : "right"]: 0,
        zIndex: 10,
        width: 40,
        height: 40,
      }}
      onClick={() => go(dir)}
    >
      <button
        style={{
          width: 40, height: 40, borderRadius: "50%", border: "2px solid #e5e7eb",
          background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "background 0.18s, border-color 0.18s, box-shadow 0.18s, transform 0.15s", flexShrink: 0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "#f97316";
          e.currentTarget.style.borderColor = "#f97316";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(249,115,22,0.4)";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.borderColor = "#e5e7eb";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.14)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Icon name={dir === -1 ? "chevLeft" : "chevRight"} size={18} color="#0d1b3e" strokeWidth={2.5} />
      </button>
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      <div style={{ overflow: "hidden", margin: "0 28px", paddingTop: 8, paddingBottom: 12 }}>
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            display: "flex", gap,
            transform: `translateX(${offset}px)`,
            transition: animating ? "transform 0.35s cubic-bezier(0.4,0,0.2,1)" : "none",
            willChange: "transform",
          }}
        >
          {cloned.map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: itemWidth }}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>
      <ArrowBtn dir={-1} />
      <ArrowBtn dir={1} />
    </div>
  );
}

// ─── CARDS ───────────────────────────────────────────────────────────────────
function CategoryCard({ cat, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 14, backgroundColor: "white",
        border: hovered ? "2px solid #f97316" : "2px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(249,115,22,0.22)" : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
      }}>
        <Icon name={cat.icon} size={26} color="#0d1b3e" strokeWidth={1.7} />
      </div>
      <span style={{ fontSize: 12, color: "#4b5563", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{cat.label}</span>
    </div>
  );
}

function ProfessionalCard({ pro }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "white", borderRadius: 18, padding: 16,
        boxShadow: hovered ? "0 0 0 2px #f97316, 0 12px 28px rgba(249,115,22,0.18)" : "0 0 0 1.5px #e5e7eb, 0 2px 12px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)", transition: "all 0.25s ease", cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "2px solid #fed7aa", flexShrink: 0 }}>
          <img src={pro.photo} alt={pro.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
        </div>
      </div>
      <p style={{ fontWeight: 700, fontSize: 13, color: "#111827", textAlign: "center", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pro.name}</p>
      <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", margin: "0 0 8px" }}>{pro.role}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
        <Icon name="star" size={13} color="#f59e0b" />
        <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{pro.rating}</span>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>({pro.reviews})</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
        <Icon name="mapPin" size={12} color="#9ca3af" />
        <span style={{ fontSize: 11, color: "#9ca3af" }}>{pro.distance}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 12 }}>
        <Icon name="checkCircle" size={13} color="#22c55e" />
        <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>Verificada</span>
      </div>
      <button
        style={{ width: "100%", backgroundColor: "#0d1b3e", color: "white", fontWeight: 700, fontSize: 12, padding: "9px 0", borderRadius: 12, border: "none", cursor: "pointer", transition: "background 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f97316"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d1b3e"}
      >Contratar</button>
    </div>
  );
}

function ServiceCard({ svc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "white", borderRadius: 18, overflow: "hidden",
        boxShadow: hovered ? "0 0 0 2px #f97316, 0 12px 28px rgba(249,115,22,0.18)" : "0 0 0 1.5px #e5e7eb, 0 2px 12px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)", transition: "all 0.25s ease", cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
        <img
          src={svc.photo}
          alt={svc.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = `linear-gradient(135deg, ${svc.bg} 0%, ${svc.color}22 100%)`; }}
        />
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "white", border: "1.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={svc.icon} size={12} color="#0d1b3e" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{svc.label}</span>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>A partir de {svc.price}</p>
      </div>
    </div>
  );
}

function ReviewCard({ r }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "white", borderRadius: 18, padding: 16,
        boxShadow: hovered ? "0 0 0 2px #f97316, 0 12px 28px rgba(249,115,22,0.15)" : "0 0 0 1.5px #e5e7eb, 0 2px 12px rgba(0,0,0,0.06)",
        cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s", transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
        {Array.from({ length: r.rating }).map((_, j) => <Icon key={j} name="star" size={15} color="#f59e0b" />)}
      </div>
      <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, margin: "0 0 12px" }}>&ldquo;{r.text}&rdquo;</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12, borderTop: "1px solid #f9fafb" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1px solid #f3f4f6" }}>
          <img src={r.photo} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#111827", margin: 0 }}>{r.name}</p>
          <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{r.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const categories = [
  { icon: "heartIcon", label: "Saúde", route: "/Pages/Categorias_servico_cliente" },
  { icon: "broomCat",     label: "Limpeza",    route: null },
  { icon: "wrench2",      label: "Reparos",    route: null },
  { icon: "homeIcon",     label: "Reformas",   route: null },
  { icon: "scissorsIcon", label: "Beleza",     route: null },
  { icon: "leafIcon",     label: "Jardinagem", route: null },
  { icon: "carIcon",      label: "Automotivo", route: null },
  { icon: "monitorIcon",  label: "Tecnologia", route: null },
  { icon: "pawIcon",      label: "Pet",        route: null },
  { icon: "bookIcon",     label: "Educação",   route: null },
];

// Profissionais com fotos temáticas por profissão e gênero (Unsplash)
const professionals = [
  {
    name: "Ana Silva",
    role: "Faxineira",
    rating: 4.9, reviews: 120, distance: "2 km de você",
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Carlos Lima",
    role: "Eletricista",
    rating: 4.8, reviews: 98, distance: "3 km de você",
    photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Juliana Costa",
    role: "Cuidadora",
    rating: 4.9, reviews: 76, distance: "1,5 km de você",
    photo: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Roberto Souza",
    role: "Encanador",
    rating: 4.7, reviews: 143, distance: "4 km de você",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Fernanda Reis",
    role: "Pintora",
    rating: 5.0, reviews: 55, distance: "2,5 km de você",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Marcos Antunes",
    role: "Jardineiro",
    rating: 4.8, reviews: 61, distance: "3,5 km de você",
    photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&h=200&fit=crop&crop=face&auto=format",
  },
  {
    name: "Patrícia Melo",
    role: "Cozinheira",
    rating: 4.9, reviews: 88, distance: "1 km de você",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face&auto=format",
  },
];

const services = [
  {
    icon: "broomCat", label: "Faxina Residencial", price: "R$ 120", color: "#22c55e", bg: "#dcfce7",
    // mulher fazendo faxina
    photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=200&fit=crop",
  },
  {
    icon: "zap", label: "Eletricista", price: "R$ 80", color: "#eab308", bg: "#fef9c3",
    // homem eletricista trabalhando
    photo: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=200&fit=crop",
  },
  {
    icon: "droplet", label: "Encanador", price: "R$ 90", color: "#3b82f6", bg: "#dbeafe",
    // homem encanador com ferramentas
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
  },
  {
    icon: "wrench2", label: "Montagem de Móveis", price: "R$ 70", color: "#f97316", bg: "#ffedd5",
    // homem montando móvel
    photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
  },
  {
    icon: "heartIcon", label: "Cuidadora", price: "R$ 150", color: "#8b5cf6", bg: "#ede9fe",
    // mulher uniforme saúde cuidando de idoso
    photo: "https://images.unsplash.com/photo-1576765608622-067973a79f53?w=400&h=200&fit=crop",
  },
  {
    icon: "leafIcon", label: "Jardinagem", price: "R$ 100", color: "#16a34a", bg: "#dcfce7",
    // homem jardineiro
    photo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop",
  },
  {
    icon: "carIcon", label: "Automotivo", price: "R$ 130", color: "#0284c7", bg: "#dbeafe",
    // homem mecânico trabalhando em carro
    photo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=200&fit=crop",
  },
];

const reviews = [
  {
    name: "Marcos A.", role: "Faxina Residencial",
    text: "Profissional excelente, chegou no horário e fez um ótimo trabalho. Super recomendo!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face&auto=format",
  },
  {
    name: "Patrícia M.", role: "Eletricista",
    text: "Atendimento rápido e muito atencioso. Resolveu meu problema em minutos!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face&auto=format",
  },
  {
    name: "Luciana S.", role: "Cuidadora",
    text: "Ótima profissional, cuidadosa e muito dedicada. Minha mãe adorou!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&auto=format",
  },
  {
    name: "Felipe R.", role: "Encanador",
    text: "Resolveu o problema rapidinho, preço justo e muito educado. Recomendo!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=face&auto=format",
  },
  {
    name: "Camila T.", role: "Pintura",
    text: "Resultado impecável, muito cuidadosa com os detalhes. Ficou lindo!",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&h=100&fit=crop&crop=face&auto=format",
  },
  {
    name: "Eduardo L.", role: "Jardinagem",
    text: "Jardim ficou uma obra de arte. Pontual e super profissional.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face&auto=format",
  },
];

// ─── SECTION WRAPPER COM CAROUSEL ────────────────────────────────────────────
function CarouselSection({ title, items, renderItem, itemWidth, gap = 16, visibleCount }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>{title}</h3>
      </div>
      <InfiniteCarousel items={items} renderItem={renderItem} itemWidth={itemWidth} gap={gap} visibleCount={visibleCount} />
    </section>
  );
}

// ─── CATEGORIAS EM GRID FIXO ─────────────────────────────────────────────────
function CategoriesGrid({ onCategoryClick }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Categorias</h3>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 12 }}>
        {categories.map((cat, i) => (
          <CategoryCard key={i} cat={cat} onClick={() => onCategoryClick(cat)} />
        ))}
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ onCategoryClick }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const popularSearches = [
    { label: "Instalação de chuveiro", icon: "droplet" },
    { label: "Limpeza residencial", icon: "broomCat" },
    { label: "Pintura residencial", icon: "heartIcon" },
    { label: "Instalação elétrica", icon: "zap" },
    { label: "Encanamento", icon: "wrench2" },
    { label: "Ar-condicionado", icon: "monitorIcon" },
  ];

  const recentSearches = [
    { label: "instalação de chuveiro", type: "Serviço" },
    { label: "eletricista", type: "Profissional" },
    { label: "limpeza residencial", type: "Serviço" },
    { label: "pintura", type: "Serviço" },
    { label: "ar-condicionado", type: "Serviço" },
  ];

  function openSearchPage(query = "") {
    const trimmedQuery = query.trim();
    const params = new URLSearchParams();
    if (trimmedQuery) params.set("q", trimmedQuery);
    router.push(`/Pages/Busca_cliente${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    openSearchPage(searchQuery);
  }

  function chooseSearch(term) {
    setSearchQuery(term);
    setSearchOpen(false);
    openSearchPage(term);
  }

  return (
    <div className="fazuno-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", backgroundColor: "#f9fafb" }}>
      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(130deg, #0d1b3e 0%, #1e3a8a 55%, #1e40af 100%)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse at 10% 50%, rgba(249,115,22,0.18) 0%, transparent 50%)" }}/>
        <div style={{ display: "flex", alignItems: "center", padding: "32px 40px", gap: 0, position: "relative", boxSizing: "border-box", minHeight: 220 }}>
          <div style={{ maxWidth: 380, flexShrink: 0, zIndex: 2 }}>
            <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, lineHeight: 1.25, margin: "0 0 12px" }}>
              Tudo o que sua casa<br/>precisa em um <span style={{ color: "#fb923c" }}>só lugar!</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>
              Encontre profissionais confiáveis para serviços residenciais, saúde, beleza e muito mais.
            </p>
          </div>
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "58%", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #1e3a8a, transparent)", zIndex: 1 }}/>
            <img src="/imagem_profissionais.avif" alt="Profissionais FazUno" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(8,18,38,0.65)", display: "flex", justifyContent: "space-around", padding: "16px 40px", flexWrap: "wrap", gap: 16, position: "relative", zIndex: 2 }}>
          {[
            { icon: "user",  val: "2.500+",   lbl: "Clientes atendidos", yellow: false },
            { icon: "users", val: "1.200+",   lbl: "Profissionais",      yellow: false },
            { icon: "star",  val: "4,9",      lbl: "Avaliação média",    yellow: true  },
            { icon: "grid",  val: "Diversas", lbl: "categorias",         yellow: false },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, color: "white" }}>
              <Icon name={s.icon} size={22} color={s.yellow ? "#f59e0b" : "rgba(255,255,255,0.8)"} strokeWidth={s.yellow ? 0 : 1.8} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{s.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 40px", boxSizing: "border-box" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Olá, Isaac! </h2>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: "4px 0 0" }}>O que você precisa hoje?</p>
        </div>
        <form onSubmit={handleSearchSubmit} style={{ position: "relative", marginBottom: 32 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
            <Icon name="search" size={18} color="#9ca3af" />
          </span>
          <input type="search"
            placeholder="Buscar serviço ou prestador..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onClick={() => setSearchOpen(true)}
            style={{ width: "100%", boxSizing: "border-box", paddingLeft: 44, paddingRight: 50, paddingTop: 12, paddingBottom: 12, fontSize: 14, color: "#374151", backgroundColor: "white", border: "1.5px solid #e5e7eb", borderRadius: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", outline: "none", transition: "border 0.2s, box-shadow 0.2s" }}
            onFocus={e => { setSearchOpen(true); e.target.style.borderColor = "#0A0B2D"; e.target.style.boxShadow = "0 0 0 3px rgba(10,11,45,0.12)"; }}
            onBlur={e => { setTimeout(() => setSearchOpen(false), 120); e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
          />
          <button type="button" aria-label="Abrir busca" onClick={() => openSearchPage(searchQuery)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", display: "flex", border: 0, background: "transparent", padding: 4, cursor: "pointer" }}>
            <Icon name="sliders" size={18} color="#9ca3af" />
          </button>
          {searchOpen && (
            <div className="home-search-popover" onMouseDown={(event) => event.preventDefault()}>
              <button type="button" className="home-search-clear" onClick={() => { setSearchQuery(""); setSearchOpen(false); }}>
                Limpar
              </button>

              <section>
                <h4>Mais procurados</h4>
                <div className="home-popular-grid">
                  {popularSearches.map((item) => (
                    <button key={item.label} type="button" onClick={() => chooseSearch(item.label)}>
                      <Icon name={item.icon} size={22} color="#0A0B2D" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <div className="home-recent-title">
                  <h4>Últimos pesquisados</h4>
                  <button type="button" onClick={() => openSearchPage(searchQuery)}>
                    Ver tudo
                  </button>
                </div>
                <div className="home-recent-list">
                  {recentSearches.map((item) => (
                    <button key={item.label} type="button" onClick={() => chooseSearch(item.label)}>
                      <span className="home-clock">◷</span>
                      <span>{item.label}</span>
                      <small>{item.type}</small>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}
        </form>

        <style jsx>{`
          .home-search-popover {
            position: absolute;
            left: 0;
            right: 0;
            top: 56px;
            z-index: 40;
            background: #ffffff;
            border: 1px solid #e0e3eb;
            border-radius: 16px;
            padding: 14px;
            box-shadow: 0 22px 48px rgba(15, 23, 42, 0.14);
          }

          .home-recent-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 12px;
          }

          .home-search-clear,
          .home-recent-title button {
            border: 0;
            background: transparent;
            color: #0A0B2D;
            cursor: pointer;
            font-size: 12px;
            font-weight: 700;
          }

          .home-search-clear {
            position: absolute;
            right: 14px;
            top: 14px;
          }

          .home-search-popover h4 {
            margin: 0;
            color: #0a0b2d;
            font-size: 14px;
            font-weight: 800;
          }

          .home-popular-grid {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 12px;
            margin: 10px 0 18px;
          }

          .home-popular-grid button {
            min-height: 84px;
            border: 0;
            border-radius: 12px;
            background: #eef2ff;
            color: #0a0b2d;
            cursor: pointer;
            display: grid;
            place-items: center;
            gap: 8px;
            padding: 12px 8px;
            text-align: center;
            font-size: 11px;
            font-weight: 800;
          }

          .home-popular-grid button:hover {
            background: #e0e7ff;
            transform: translateY(-1px);
          }

          .home-recent-list {
            display: grid;
            gap: 4px;
          }

          .home-recent-list button {
            border: 0;
            background: #ffffff;
            cursor: pointer;
            display: grid;
            grid-template-columns: 24px 1fr auto;
            align-items: center;
            gap: 8px;
            padding: 7px 0;
            color: #475467;
            text-align: left;
            font-size: 13px;
          }

          .home-clock {
            color: #667085;
            font-size: 16px;
          }

          .home-recent-list small {
            background: #f4f6fa;
            border-radius: 999px;
            color: #667085;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 8px;
          }
        `}</style>

        {/* CATEGORIAS — grid fixo sem carrossel */}
        <CategoriesGrid onCategoryClick={onCategoryClick} />

        {/* PROFISSIONAIS — carrossel com 5 visíveis */}
        <CarouselSection
          title="Profissionais perto de você"
          items={professionals}
          itemWidth={195}
          gap={16}
          visibleCount={5}
          renderItem={(pro) => <ProfessionalCard pro={pro} />}
        />

        {/* SERVIÇOS — carrossel com 5 visíveis */}
        <CarouselSection
          title="Serviços mais solicitados"
          items={services}
          itemWidth={195}
          gap={16}
          visibleCount={5}
          renderItem={(svc) => <ServiceCard svc={svc} />}
        />

        {/* AVALIAÇÕES — carrossel com 4 visíveis */}
        <CarouselSection
          title="O que nossos clientes dizem"
          items={reviews}
          itemWidth={248}
          gap={16}
          visibleCount={4}
          renderItem={(r) => <ReviewCard r={r} />}
        />
      </div>

      <footer style={{ backgroundColor: "#0d1b3e", color: "white", marginTop: 16 }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/Logo_branca.png" alt="Fazuno" style={{ height: 36, width: "auto", display: "block" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>© 2026 FazUno. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function TelainicialCliente() {
  const router = useRouter();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ".fazuno-scroll::-webkit-scrollbar{display:none}.fazuno-scroll{-ms-overflow-style:none;scrollbar-width:none}";
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleCategoryClick = (cat) => {
    if (cat.route) {
      router.push(cat.route);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9fafb" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Topbar />
        <HomePage onCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
}
