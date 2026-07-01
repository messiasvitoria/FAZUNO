"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaArrowLeft,
  FaBroom,
  FaCar,
  FaCheckCircle,
  FaChevronRight,
  FaFilter,
  FaGraduationCap,
  FaHeart,
  FaMapMarkerAlt,
  FaPaintRoller,
  FaRegHeart,
  FaSearch,
  FaSlidersH,
  FaStar,
  FaTimes,
  FaTools,
  FaUser,
  FaWater,
  FaWrench,
  FaBolt,
} from "react-icons/fa";
import Sidebar from "../../components/SideBar_cliente";
import Topbar from "../../components/TopBar_cliente";

const C = {
  navy: "#0A0B2D",
  orange: "#F1670F",
  bg: "#F4F6FA",
  border: "#E0E3EB",
  muted: "#667085",
  text: "#111827",
  purple: "#0A0B2D",
};

const services = [
  {
    id: 1,
    title: "Instalação de chuveiro simples",
    category: "Elétrica",
    type: "Residencial",
    price: "R$ 120,00",
    duration: "Até 1 hora",
    description: "Instalação completa com revisão do ponto elétrico e teste.",
    image: "/foto_encanador.jpg",
    icon: <FaBolt />,
    provider: { name: "João Silva", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  },
  {
    id: 2,
    title: "Instalação de chuveiro elétrico",
    category: "Elétrica",
    type: "Residencial",
    price: "R$ 110,00",
    duration: "Até 2 horas",
    description: "Instalação com material básico incluso e teste de funcionamento.",
    image: "/foto_encanador2.jpg",
    icon: <FaBolt />,
    provider: { name: "Carlos Mendes", photo: "https://randomuser.me/api/portraits/men/11.jpg" },
  },
  {
    id: 3,
    title: "Instalação de chuveiro multi-temperaturas",
    category: "Elétrica",
    type: "Residencial",
    price: "R$ 150,00",
    duration: "Até 1 hora",
    description: "Instalação garantida com regulagem de temperatura.",
    image: "/foto_eletricista.jpg",
    icon: <FaBolt />,
    provider: { name: "Fernanda Oliveira", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  },
  {
    id: 4,
    title: "Troca e instalação de chuveiro",
    category: "Elétrica",
    type: "Residencial",
    price: "R$ 100,00",
    duration: "Até 1 hora",
    description: "Troca completa com revisão do ponto.",
    image: "/foto_eletricista2.jpg",
    icon: <FaBolt />,
    provider: { name: "Rafael Costa", photo: "https://randomuser.me/api/portraits/men/45.jpg" },
  },
  {
    id: 5,
    title: "Faxina residencial",
    category: "Limpeza",
    type: "Residencial",
    price: "R$ 120,00",
    duration: "Até 6 horas",
    description: "Limpeza completa de apartamento ou casa.",
    image: "/foto_faxineira1.avif",
    icon: <FaBroom />,
    provider: { name: "Ana Silva", photo: "/foto_faxineira2.avif" },
  },
  {
    id: 6,
    title: "Pintura de parede",
    category: "Pintura",
    type: "Residencial",
    price: "R$ 180,00",
    duration: "1 diária",
    description: "Pintura interna com acabamento limpo.",
    image: "/foto_pintora.avif",
    icon: <FaPaintRoller />,
    provider: { name: "Fernanda Reis", photo: "/foto_pintora2.avif" },
  },
];

const professionals = [
  {
    id: 1,
    name: "João Silva",
    role: "Eletricista profissional",
    category: "Elétrica",
    rating: "4.9",
    reviews: 128,
    services: 126,
    location: "Vila Madalena, SP",
    distance: "2,3 km de você",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Eletricista",
    category: "Elétrica",
    rating: "4.8",
    reviews: 95,
    services: 98,
    location: "Moema, SP",
    distance: "3,1 km de você",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Fernanda Oliveira",
    role: "Eletricista",
    category: "Elétrica",
    rating: "4.7",
    reviews: 76,
    services: 87,
    location: "Pinheiros, SP",
    distance: "4,0 km de você",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true,
  },
  {
    id: 4,
    name: "Rafael Costa",
    role: "Eletricista",
    category: "Elétrica",
    rating: "4.6",
    reviews: 52,
    services: 71,
    location: "Perdizes, SP",
    distance: "4,7 km de você",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    verified: true,
  },
  {
    id: 5,
    name: "Ana Silva",
    role: "Faxineira",
    category: "Limpeza",
    rating: "4.9",
    reviews: 120,
    services: 154,
    location: "Pinheiros, SP",
    distance: "2 km de você",
    photo: "/foto_faxineira2.avif",
    verified: true,
  },
];

const categories = ["Todas", "Elétrica", "Limpeza", "Hidráulica", "Pintura", "Reformas", "Ar-condicionado"];

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function matches(items, query, keys) {
  const q = normalize(query);
  if (!q) return items;
  return items.filter((item) => normalize(keys.map((key) => item[key]).join(" ")).includes(q));
}

function ServiceCard({ service }) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  function openDirectStep(step) {
    const directService = {
      title: service.title,
      professional: service.provider.name,
      rating: service.provider.rating || "4.9",
      reviews: service.provider.reviews || "128",
      price: service.price.replace(",00", ""),
      distance: service.provider.distance || "3 km",
      eta: service.provider.eta || "10 min",
      image: service.image,
      profilePhoto: service.provider.photo,
      category: service.category,
      subcategory: service.type,
      description: service.description,
      attendanceMode: "Presencial",
      executionTime: service.duration,
      serviceArea: "Vila Madalena, Pinheiros e regiões próximas",
      nextAvailability: "Hoje após 14h",
      completedServices: service.provider.completedServices || "124 serviços realizados",
      address: "Rua das Flores, 123, Vila Madalena, São Paulo - SP",
    };

    window.sessionStorage.setItem("fazuno_solicitacao_direta_servico_externo", JSON.stringify(directService));
    router.push(`/Pages/Escolha_contratacao?fluxo=direta&etapa=${step}&servicoExterno=1`);
  }

  return (
    <article className="result-card service-card">
      <div className="service-image">
        <img src={service.image} alt={service.title} />
        <span className="category-pill">{service.category}</span>
        <button
          type="button"
          className={`favorite-button ${isFavorited ? "is-favorited" : ""}`}
          aria-label={isFavorited ? "Remover dos favoritos" : "Favoritar serviço"}
          aria-pressed={isFavorited}
          onClick={() => setIsFavorited((current) => !current)}
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className="result-body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="service-provider">
          <img src={service.provider.photo} alt={service.provider.name} />
          <span>{service.provider.name}</span>
        </div>
        <div className="service-tags">
          <span>{service.type}</span>
          <span>{service.duration}</span>
        </div>
        <small>A partir de</small>
        <strong>{service.price}</strong>
        <div className="card-actions">
          <button type="button" className="outline" onClick={() => openDirectStep(3)}>
            Ver detalhes
          </button>
          <button type="button" className="primary" onClick={() => openDirectStep(4)}>
            Solicitar serviço
          </button>
        </div>
      </div>
    </article>
  );
}

function ProfessionalCard({ professional }) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const params = new URLSearchParams({
    nome: professional.name,
    categoria: professional.category,
    avaliacao: professional.rating,
    avaliacoes: String(professional.reviews),
    foto: professional.photo,
    returnTo: "/Pages/Busca_cliente",
  });

  return (
    <article className="result-card professional-card">
      <button
        type="button"
        className={`professional-favorite ${isFavorited ? "is-favorited" : ""}`}
        aria-label={isFavorited ? "Remover profissional dos favoritos" : "Favoritar profissional"}
        aria-pressed={isFavorited}
        onClick={() => setIsFavorited((current) => !current)}
      >
        {isFavorited ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="professional-header">
        <img src={professional.photo} alt={professional.name} />
        <div>
          <h3>{professional.name} {professional.verified && <FaCheckCircle className="verified-dot" />}</h3>
          <p>{professional.role}</p>
        </div>
      </div>

      <div className="professional-meta">
        <span><FaStar className="star" /> {professional.rating} ({professional.reviews} avaliações)</span>
        <span>{professional.services} serviços realizados</span>
        <span><FaMapMarkerAlt /> {professional.location}</span>
        <span>{professional.distance}</span>
        <span className="available-dot">Disponível hoje</span>
      </div>

      <button type="button" className="profile-button" onClick={() => router.push(`/Pages/Perfil_prestador?${params.toString()}`)}>
        Ver perfil
      </button>
    </article>
  );
}

export default function BuscaCliente() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("Elétrica");

  const filteredServices = useMemo(() => {
    const byCategory = category === "Todas" ? services : services.filter((service) => service.category === category);
    const bySearch = matches(byCategory, query, ["title", "category", "description"]);
    return query.trim() && bySearch.length === 0 ? byCategory : bySearch;
  }, [category, query]);

  const filteredProfessionals = useMemo(() => {
    const matchedServiceCategories = new Set(matches(services, query, ["title", "category", "description"]).map((service) => service.category));
    const q = normalize(query);
    const byCategory = category === "Todas" ? professionals : professionals.filter((professional) => professional.category === category);
    const bySearch = byCategory.filter((professional) => {
      const directMatch = !q || normalize([professional.name, professional.role, professional.category, professional.location].join(" ")).includes(q);
      return directMatch || matchedServiceCategories.has(professional.category);
    });
    return query.trim() && bySearch.length === 0 ? byCategory : bySearch;
  }, [category, query]);

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.replace(`/Pages/Busca_cliente?${params.toString()}`);
  }

  return (
    <div className="search-page-shell">
      <Sidebar />
      <div className="search-content-column">
        <Topbar />
        <main className="search-page">
          <button type="button" className="back-button" onClick={() => router.push("/Pages/Tela_inicial_cliente")}>
            <FaArrowLeft /> Voltar
          </button>

          <header className="search-header">
            <div>
              <h1>Resultados para: <span>"{query || "todos"}"</span></h1>
              <p>Encontre serviços e profissionais próximos de você.</p>
            </div>

            <form className="search-bar" onSubmit={handleSubmit}>
              <FaSearch />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar serviço ou prestador" />
              {query && (
                <button type="button" className="clear-button" onClick={() => setQuery("")} aria-label="Limpar busca">
                  <FaTimes />
                </button>
              )}
            </form>
          </header>


          <div className="results-shell">
            <aside className="filters-panel">
              <div className="filters-title">
                <strong><FaFilter /> Filtros</strong>
                <button type="button" onClick={() => setCategory("Todas")}>Limpar</button>
              </div>
              <div className="side-selects">
                <label>
                  Categoria
                  <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    {categories.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label>
                  Tipo de serviço
                  <select defaultValue="Todos">
                    <option>Todos</option>
                    <option>Residencial</option>
                    <option>Comercial</option>
                  </select>
                </label>
                <label>
                  Localização
                  <select defaultValue="Vila Madalena, SP">
                    <option>Vila Madalena, SP</option>
                    <option>Pinheiros, SP</option>
                    <option>Moema, SP</option>
                  </select>
                </label>
                <label>
                  Distância
                  <select defaultValue="Até 10 km">
                    <option>Até 10 km</option>
                    <option>Até 5 km</option>
                    <option>Até 3 km</option>
                  </select>
                </label>
                <label>
                  Ordenar por
                  <select defaultValue="Mais relevantes">
                    <option>Mais relevantes</option>
                    <option>Menor preço</option>
                    <option>Melhor avaliação</option>
                  </select>
                </label>
              </div>
              <fieldset>
                <legend>Faixa de preço</legend>
                <div className="price-range"><span>R$ 0</span><span>R$ 500+</span></div>
                <input type="range" min="0" max="500" defaultValue="500" />
              </fieldset>
              <fieldset>
                <legend>Disponibilidade</legend>
                <label className="check-row"><input type="checkbox" /> Disponível hoje</label>
              </fieldset>
            </aside>

            <section className="results-content">
              <div className="tabs-row">
                <button type="button" className="active"><FaSlidersH /> Todos ({filteredServices.length + filteredProfessionals.length})</button>
                <button type="button"><FaWrench /> Serviços ({filteredServices.length})</button>
                <button type="button"><FaUser /> Profissionais ({filteredProfessionals.length})</button>
              </div>

              <section className="result-section">
                <div className="section-heading">
                  <h2>Serviços <span>({filteredServices.length} resultados)</span></h2>
                </div>
                <div className="service-grid">
                  {filteredServices.map((service) => <ServiceCard key={service.id} service={service} />)}
                </div>
              </section>

              <section className="result-section">
                <div className="section-heading">
                  <h2>Profissionais <span>({filteredProfessionals.length} resultados)</span></h2>
                </div>
                <div className="professional-grid">
                  {filteredProfessionals.map((professional) => <ProfessionalCard key={professional.id} professional={professional} />)}
                </div>
              </section>
            </section>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .search-page-shell {
          display: flex;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: ${C.bg};
          color: ${C.navy};
        }

        .search-content-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }

        .search-page {
          flex: 1;
          padding: 20px 24px 34px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 0;
          background: transparent;
          color: ${C.navy};
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 14px;
        }

        .search-header {
          display: grid;
          grid-template-columns: 1fr;
          align-items: start;
          gap: 12px;
          margin-bottom: 14px;
        }

        .search-header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 800;
        }

        .search-header span {
          color: ${C.purple};
        }

        .search-header p {
          margin: 6px 0 0;
          color: ${C.muted};
          font-size: 13px;
        }

        .search-bar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1px solid ${C.border};
          border-radius: 12px;
          padding: 0 14px;
          height: 48px;
          width: min(760px, 100%);
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.06);
        }

        .search-bar > svg {
          color: #98A2B3;
        }

        .search-bar input {
          border: 0;
          outline: 0;
          font-size: 14px;
          color: ${C.navy};
          background: transparent;
          min-width: 0;
        }

        .clear-button {
          border: 0;
          background: transparent;
          color: ${C.navy};
          cursor: pointer;
        }

        .results-shell {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 18px;
          margin-top: 14px;
        }

        .filters-panel {
          background: #fff;
          border: 1px solid ${C.border};
          border-radius: 14px;
          padding: 14px;
          align-self: start;
        }

        .side-selects {
          display: grid;
          gap: 10px;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid ${C.border};
        }

        .side-selects label {
          display: grid;
          gap: 6px;
          color: ${C.muted};
          font-size: 11px;
          font-weight: 800;
        }

        .side-selects select {
          width: 100%;
          min-height: 39px;
          border: 1px solid ${C.border};
          border-radius: 10px;
          background: #fff;
          color: ${C.navy};
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          outline: 0;
          padding: 0 10px;
        }

        .filters-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .filters-title strong {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
        }

        .filters-title button {
          border: 0;
          background: transparent;
          color: ${C.purple};
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .filters-title button {
          color: ${C.muted};
        }

        fieldset {
          border: 0;
          padding: 0;
          margin: 0 0 18px;
        }

        legend {
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .check-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${C.muted};
          font-size: 13px;
          margin-bottom: 9px;
        }

        .price-range {
          display: flex;
          justify-content: space-between;
          color: ${C.muted};
          font-size: 12px;
        }

        input[type="range"] {
          width: 100%;
          accent-color: ${C.purple};
        }

        .tabs-row {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 16px;
        }

        .tabs-row button {
          border: 1px solid ${C.border};
          background: #fff;
          color: ${C.navy};
          border-radius: 11px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 750;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
        }

        .tabs-row .active {
          background: #EEF2FF;
          color: ${C.purple};
          border-color: #CBD5E1;
        }

        .result-section {
          margin-bottom: 28px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .section-heading h2 {
          margin: 0;
          font-size: 18px;
        }

        .section-heading span {
          color: ${C.muted};
          font-size: 14px;
          font-weight: 500;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(190px, 1fr));
          gap: 14px;
        }

        .professional-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(190px, 1fr));
          gap: 14px;
        }

        .result-card {
          background: #fff;
          border: 1px solid ${C.border};
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
        }

        .service-card {
          display: flex;
          flex-direction: column;
          min-height: 368px;
        }

        .service-image {
          position: relative;
          height: 118px;
          overflow: hidden;
        }

        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .category-pill {
          position: absolute;
          top: 10px;
          left: 10px;
          background: ${C.purple};
          color: #fff;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
        }

        .favorite-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border: 0;
          border-radius: 50%;
          background: #fff;
          color: ${C.navy};
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .favorite-button.is-favorited {
          color: ${C.orange};
        }

        .result-body {
          padding: 14px 14px 12px;
          display: flex;
          flex: 1;
          flex-direction: column;
        }

        .result-body h3,
        .professional-card h3 {
          margin: 0;
          font-size: 14.5px;
          font-weight: 800;
          color: ${C.navy};
          line-height: 1.28;
        }

        .result-body p,
        .professional-card p {
          color: #3F4A5F;
          font-size: 12px;
          line-height: 1.5;
        }

        .result-body > p {
          margin: 5px 0 10px;
        }

        .service-provider {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin: 0 0 12px;
          color: ${C.navy};
          font-size: 12px;
          font-weight: 750;
        }

        .service-provider img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid ${C.border};
        }

        .service-tags {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
        }

        .service-tags span {
          background: #EEF2F7;
          color: #3F4A5F;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .result-body small {
          display: block;
          color: #5A667A;
          font-size: 12px;
          margin-bottom: 3px;
        }

        .result-body strong {
          display: block;
          margin: 0 0 14px;
          font-size: 16px;
          color: ${C.navy};
        }

        .card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
          margin-top: auto;
        }

        .card-actions button,
        .professional-card .profile-button {
          border-radius: 10px;
          padding: 9px 8px;
          font-weight: 800;
          cursor: pointer;
          font-size: 12px;
          line-height: 1.15;
        }

        .outline {
          border: 1px solid ${C.purple};
          background: #fff;
          color: ${C.purple};
        }

        .primary {
          border: 1px solid ${C.purple};
          background: ${C.purple};
          color: #fff;
        }

        .professional-card {
          position: relative;
          padding: 14px;
          min-height: 230px;
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: 10px;
        }

        .professional-header {
          display: grid;
          grid-template-columns: 56px 1fr;
          align-items: center;
          gap: 12px;
          padding-right: 36px;
        }

        .professional-header img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
        }

        .professional-header h3 {
          margin: 0;
          color: ${C.navy};
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .verified-dot {
          color: #2563EB;
          font-size: 12px;
          flex-shrink: 0;
        }

        .professional-header p {
          margin: 3px 0 0;
          color: ${C.muted};
          font-size: 12px;
          font-weight: 600;
        }

        .professional-favorite {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 30px;
          height: 30px;
          border: 0;
          border-radius: 50%;
          background: #fff;
          color: ${C.navy};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
        }

        .professional-favorite.is-favorited {
          color: ${C.orange};
        }

        .professional-meta {
          display: grid;
          gap: 6px;
          color: #344054;
          font-size: 11px;
          margin: 0 0 4px 68px;
          align-content: start;
        }

        .professional-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          line-height: 1.25;
        }

        .professional-meta svg {
          width: 12px;
          color: ${C.navy};
          flex-shrink: 0;
        }

        .professional-meta .star {
          color: #F59E0B;
        }

        .available-dot {
          color: #16A34A;
          font-weight: 700;
        }

        .available-dot::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16A34A;
          display: inline-block;
        }

        .professional-card .profile-button {
          width: 100%;
          border: 1px solid ${C.navy};
          background: #fff;
          color: ${C.navy};
          height: 34px;
          border-radius: 8px;
        }

        @media (min-width: 1500px) {
          .service-grid,
          .professional-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (max-width: 1180px) {
          .search-header {
            grid-template-columns: 1fr;
            align-items: stretch;
          }

          .search-bar {
            max-width: none;
          }

          .service-grid,
          .professional-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .results-shell {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
