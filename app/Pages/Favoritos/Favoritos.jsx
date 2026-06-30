"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBolt,
  FaArrowLeft,
  FaBroom,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaFilter,
  FaHeart,
  FaMapMarkerAlt,
  FaPaintRoller,
  FaSearch,
  FaStar,
  FaTools,
  FaWater,
} from "react-icons/fa";

const C = {
  navy: "#0A0B2D",
  orange: "#F1670F",
  bg: "#F4F6FA",
  text: "#10132E",
  muted: "#667085",
  border: "#E0E3EB",
  soft: "#F8FAFC",
};

const savedServices = [
  {
    id: 1,
    title: "Instalação de chuveiro",
    category: "Elétrica",
    categoryIcon: <FaBolt />,
    categoryColor: "#3458F6",
    provider: "João Silva",
    providerPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    image: "/foto_encanador.jpg",
    rating: "4,9",
    reviews: 128,
    response: "Responde em 10 min",
    distance: "3 km de você",
    price: "R$ 120",
  },
  {
    id: 2,
    title: "Instalação de torneira",
    category: "Hidráulica",
    categoryIcon: <FaWater />,
    categoryColor: "#2563EB",
    provider: "Ana Paula",
    providerPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    image: "/foto_encanador2.jpg",
    rating: "4,8",
    reviews: 97,
    response: "Responde em 15 min",
    distance: "5 km de você",
    price: "R$ 100",
  },
  {
    id: 3,
    title: "Troca de tomada",
    category: "Elétrica",
    categoryIcon: <FaBolt />,
    categoryColor: "#3458F6",
    provider: "Carlos Mendes",
    providerPhoto: "https://randomuser.me/api/portraits/men/11.jpg",
    image: "/foto_eletricista.jpg",
    rating: "4,7",
    reviews: 46,
    response: "Responde em 20 min",
    distance: "4 km de você",
    price: "R$ 80",
  },
  {
    id: 4,
    title: "Pintura residencial",
    category: "Pintura",
    categoryIcon: <FaPaintRoller />,
    categoryColor: "#3458F6",
    provider: "Fernanda Oliveira",
    providerPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
    image: "/foto_pintora.avif",
    rating: "4,6",
    reviews: 72,
    response: "Responde em 1 h",
    distance: "6 km de você",
    price: "R$ 250",
  },
];

const savedProfessionals = [
  {
    id: 1,
    name: "João Silva",
    role: "Eletricista",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: "4,9",
    reviews: 128,
    services: 126,
    distance: "3 km de você",
  },
  {
    id: 2,
    name: "Ana Paula",
    role: "Encanadora",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: "4,8",
    reviews: 97,
    services: 98,
    distance: "5 km de você",
  },
  {
    id: 3,
    name: "Carlos Mendes",
    role: "Eletricista",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: "4,7",
    reviews: 46,
    services: 87,
    distance: "4 km de você",
  },
  {
    id: 4,
    name: "Fernanda Oliveira",
    role: "Pintora",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: "4,6",
    reviews: 72,
    services: 65,
    distance: "6 km de você",
  },
];

const allSavedServices = [
  ...savedServices,
  {
    id: 101,
    title: "Limpeza residencial",
    category: "Limpeza",
    categoryIcon: <FaBroom />,
    categoryColor: "#3458F6",
    provider: "Patrícia Lima",
    providerPhoto: "/foto_faxineira2.avif",
    image: "/foto_faxineira1.avif",
    rating: "4,9",
    reviews: 134,
    response: "Responde em 12 min",
    distance: "2 km de você",
    price: "R$ 140",
  },
  {
    id: 102,
    title: "Montagem de móveis",
    category: "Reformas",
    categoryIcon: <FaTools />,
    categoryColor: "#3458F6",
    provider: "Pedro Henrique",
    providerPhoto: "https://randomuser.me/api/portraits/men/52.jpg",
    image: "/foto_eletricista2.jpg",
    rating: "4,7",
    reviews: 58,
    response: "Responde em 25 min",
    distance: "4 km de você",
    price: "R$ 90",
  },
  {
    id: 103,
    title: "Instalação de ar-condicionado",
    category: "Ar-condicionado",
    categoryIcon: <FaBolt />,
    categoryColor: "#3458F6",
    provider: "Rafael Costa",
    providerPhoto: "https://randomuser.me/api/portraits/men/45.jpg",
    image: "/foto_eletricista.jpg",
    rating: "4,8",
    reviews: 83,
    response: "Responde em 18 min",
    distance: "3,5 km de você",
    price: "R$ 180",
  },
  {
    id: 104,
    title: "Jardinagem",
    category: "Jardinagem",
    categoryIcon: <FaTools />,
    categoryColor: "#3458F6",
    provider: "Renata Alves",
    providerPhoto: "https://randomuser.me/api/portraits/women/52.jpg",
    image: "/foto_pintora2.avif",
    rating: "4,6",
    reviews: 61,
    response: "Responde em 35 min",
    distance: "7 km de você",
    price: "R$ 90",
  },
];

const allSavedProfessionals = [
  ...savedProfessionals,
  {
    id: 101,
    name: "Rafael Costa",
    role: "Técnico em ar-condicionado",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: "4,8",
    reviews: 83,
    services: 74,
    distance: "3,5 km de você",
  },
  {
    id: 102,
    name: "Patrícia Lima",
    role: "Diarista",
    photo: "/foto_faxineira2.avif",
    rating: "4,9",
    reviews: 134,
    services: 154,
    distance: "2 km de você",
  },
  {
    id: 103,
    name: "Pedro Henrique",
    role: "Montador",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: "4,7",
    reviews: 58,
    services: 49,
    distance: "4 km de você",
  },
  {
    id: 104,
    name: "Renata Alves",
    role: "Jardineira",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    rating: "4,6",
    reviews: 61,
    services: 52,
    distance: "7 km de você",
  },
];

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function FavoriteServiceCard({ service }) {
  const router = useRouter();
  const [saved, setSaved] = useState(true);

  function openDirectStep(step) {
    const directService = {
      title: service.title,
      professional: service.provider,
      rating: service.rating.replace(",", "."),
      reviews: String(service.reviews),
      price: service.price,
      distance: service.distance.replace(" de você", "").replace(" de você", ""),
      eta: service.response.replace("Responde em ", ""),
      image: service.image,
      profilePhoto: service.providerPhoto,
      category: service.category,
      subcategory: "Residencial",
      description: `${service.title} com atendimento profissional e execução conforme a necessidade do cliente.`,
      attendanceMode: "Presencial",
      executionTime: service.response.replace("Responde em ", ""),
      serviceArea: "Vila Madalena, Pinheiros e regiões próximas",
      nextAvailability: "Hoje após 14h",
      completedServices: `${service.reviews} serviços realizados`,
      address: "Rua das Flores, 123, Vila Madalena, São Paulo - SP",
    };

    window.sessionStorage.setItem("fazuno_solicitacao_direta_servico_externo", JSON.stringify(directService));
    router.push(`/Pages/Escolha_contratacao?fluxo=direta&etapa=${step}&servicoExterno=1`);
  }



  return (
    <article className="service-card">
      <div className="service-image">
        <img src={service.image} alt={service.title} />
        <span className="category-badge" style={{ background: service.categoryColor }}>
          {service.category}
        </span>
        <button
          type="button"
          className={`heart-button ${saved ? "active" : ""}`}
          aria-label={saved ? "Remover dos favoritos" : "Salvar favorito"}
          aria-pressed={saved}
          onClick={() => setSaved((current) => !current)}
        >
          <FaHeart />
        </button>
      </div>

      <div className="service-body">
        <h3>{service.title}</h3>
        <div className="provider-row">
          <img src={service.providerPhoto} alt={service.provider} />
          <span>{service.provider}</span>
        </div>
        <div className="meta-line">
          <FaStar className="star" />
          <span>{service.rating} ({service.reviews})</span>
        </div>
        <div className="meta-line">
          <FaClock />
          <span>{service.response}</span>
        </div>
        <div className="meta-line">
          <FaMapMarkerAlt />
          <span>{service.distance}</span>
        </div>
        <p className="price-label">A partir de {service.price}</p>
        <div className="card-actions">
          <button type="button" className="primary" onClick={() => openDirectStep(3)}>Ver detalhes</button>
          <button type="button" className="outline" onClick={() => openDirectStep(4)}>Solicitar</button>
        </div>
      </div>
    </article>
  );
}

function FavoriteProfessionalCard({ professional }) {
  const router = useRouter();
  const [saved, setSaved] = useState(true);

  function openProfile() {
    const params = new URLSearchParams({
      nome: professional.name,
      categoria: professional.role,
      avaliacao: professional.rating.replace(",", "."),
      avaliacoes: String(professional.reviews),
      foto: professional.photo,
      returnTo: "/Pages/Favoritos",
    });

    router.push(`/Pages/Perfil_prestador?${params.toString()}`);
  }

  return (
    <article className="professional-card">
      <button
        type="button"
        className={`professional-heart ${saved ? "active" : ""}`}
        aria-label={saved ? "Remover profissional dos favoritos" : "Salvar profissional"}
        aria-pressed={saved}
        onClick={() => setSaved((current) => !current)}
      >
        <FaHeart />
      </button>

      <div className="professional-main">
        <img src={professional.photo} alt={professional.name} />
        <div>
          <h3>{professional.name}</h3>
          <p>{professional.role}</p>
          <div className="meta-line">
            <FaStar className="star" />
            <span>{professional.rating} ({professional.reviews} avaliações)</span>
          </div>
          <div className="meta-line soft">
            <FaTools />
            <span>{professional.services} serviços realizados</span>
          </div>
          <div className="meta-line soft">
            <FaMapMarkerAlt />
            <span>{professional.distance}</span>
          </div>
        </div>
      </div>

      <button type="button" className="profile-button" onClick={openProfile}>Ver perfil</button>
    </article>
  );
}

export default function Favoritos({ view = "overview" }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [professionalIndex, setProfessionalIndex] = useState(0);
  const isOverview = view === "overview";
  const isServicesView = view === "services";
  const isProfessionalsView = view === "professionals";

  const services = useMemo(() => {
    const q = normalize(query);
    if (!q) return allSavedServices;
    return allSavedServices.filter((service) =>
      normalize(`${service.title} ${service.category} ${service.provider}`).includes(q)
    );
  }, [query]);

  const professionals = useMemo(() => {
    const q = normalize(query);
    if (!q) return allSavedProfessionals;
    return allSavedProfessionals.filter((professional) =>
      normalize(`${professional.name} ${professional.role}`).includes(q)
    );
  }, [query]);

  const visibleServices = isServicesView ? services : services.slice(serviceIndex, serviceIndex + 4);
  const visibleProfessionals = isProfessionalsView ? professionals : professionals.slice(professionalIndex, professionalIndex + 4);
  const canCarouselServices = isOverview && services.length > 4;
  const canCarouselProfessionals = isOverview && professionals.length > 4;
  const pageSize = 4;

  function moveServices(direction) {
    setServiceIndex((current) => {
      const max = Math.max(services.length - pageSize, 0);
      if (direction > 0) return current >= max ? 0 : Math.min(current + pageSize, max);
      return current <= 0 ? max : Math.max(current - pageSize, 0);
    });
  }

  function moveProfessionals(direction) {
    setProfessionalIndex((current) => {
      const max = Math.max(professionals.length - pageSize, 0);
      if (direction > 0) return current >= max ? 0 : Math.min(current + pageSize, max);
      return current <= 0 ? max : Math.max(current - pageSize, 0);
    });
  }

  const title = isServicesView ? "Serviços favoritos" : isProfessionalsView ? "Profissionais favoritos" : "Meus favoritos";
  const subtitle = isServicesView
    ? "Todos os serviços que você salvou para contratar depois."
    : isProfessionalsView
      ? "Todos os profissionais que você salvou para consultar depois."
      : "Serviços e profissionais que você salvou para depois.";

  return (
    <main className="favorites-page">
      <header className="favorites-header">
        <div>
          <button
            type="button"
            className="back-link"
            onClick={() => router.push(isOverview ? "/Pages/Tela_inicial_cliente" : "/Pages/Favoritos")}
          >
            <FaArrowLeft />
            Voltar
          </button>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="toolbar">
          <label className="search-box">
            <FaSearch />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar nos favoritos..."
            />
          </label>
          <button type="button" className="filter-button">
            <FaFilter />
            Filtrar
            <FaChevronDown />
          </button>
        </div>
      </header>

      {isOverview && <nav className="tabs" aria-label="Favoritos">
        <button type="button" className="active">
          <FaHeart />
          Todos salvos ({allSavedServices.length + allSavedProfessionals.length})
        </button>
      </nav>}

      {(isOverview || isServicesView) && <section className="favorites-section">
        <div className="section-title">
          <h2>Serviços salvos</h2>
          <span>{services.length} serviços</span>
        </div>
        <div className="cards-row">
          {visibleServices.map((service) => (
            <FavoriteServiceCard key={service.id} service={service} />
          ))}
          {canCarouselServices && <button type="button" className="carousel-arrow left" aria-label="Serviços anteriores" onClick={() => moveServices(-1)}>
            <FaChevronLeft />
          </button>}
          {canCarouselServices && <button type="button" className="carousel-arrow right" aria-label="Próximos serviços" onClick={() => moveServices(1)}>
            <FaChevronRight />
          </button>}
        </div>
        {isOverview && <button type="button" className="view-all" onClick={() => router.push("/Pages/Favoritos/Servicos")}>
          Ver todos os serviços salvos
          <FaChevronRight />
        </button>}
      </section>}

      {(isOverview || isProfessionalsView) && <section className="favorites-section professionals-section">
        <div className="section-title">
          <h2>Profissionais salvos</h2>
          <span>{professionals.length} profissionais</span>
        </div>
        <div className="professional-grid">
          {visibleProfessionals.map((professional) => (
            <FavoriteProfessionalCard key={professional.id} professional={professional} />
          ))}
          {canCarouselProfessionals && <button type="button" className="carousel-arrow left professional-arrow" aria-label="Profissionais anteriores" onClick={() => moveProfessionals(-1)}>
            <FaChevronLeft />
          </button>}
          {canCarouselProfessionals && <button type="button" className="carousel-arrow right professional-arrow" aria-label="Próximos profissionais" onClick={() => moveProfessionals(1)}>
            <FaChevronRight />
          </button>}
        </div>
        {isOverview && <button type="button" className="view-all" onClick={() => router.push("/Pages/Favoritos/Profissionais")}>
          Ver todos os profissionais salvos
          <FaChevronRight />
        </button>}
      </section>}

      <style jsx global>{`
        .favorites-page {
          min-height: 100vh;
          background: ${C.bg};
          color: ${C.text};
          padding: 22px 32px 38px;
          font-family: Poppins, Arial, sans-serif;
        }

        .favorites-header {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) minmax(420px, 0.9fr);
          align-items: center;
          gap: 20px;
          margin-bottom: 14px;
        }

        .favorites-header,
        .tabs,
        .favorites-section {
          max-width: 1360px;
          margin-left: auto;
          margin-right: auto;
        }

        .back-link {
          border: 1px solid ${C.border};
          background: #fff;
          color: ${C.navy};
          font-family: inherit;
          font-size: 13px;
          font-weight: 800;
          padding: 8px 12px;
          margin: 0 0 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 9px;
          box-shadow: 0 8px 18px rgba(10, 11, 45, 0.04);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .back-link:hover {
          border-color: ${C.navy};
          transform: translateY(-1px);
        }

        h1 {
          margin: 0 0 6px;
          font-size: 26px;
          line-height: 1.1;
          color: ${C.navy};
          font-weight: 800;
          letter-spacing: 0;
        }

        .favorites-header p {
          margin: 0;
          color: ${C.muted};
          font-size: 13px;
          font-weight: 500;
        }

        .toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) 132px;
          gap: 12px;
        }

        .search-box,
        .filter-button {
          height: 48px;
          border: 1px solid ${C.border};
          border-radius: 10px;
          background: #fff;
          display: flex;
          align-items: center;
          gap: 12px;
          color: ${C.navy};
          box-shadow: 0 10px 22px rgba(10, 11, 45, 0.04);
        }

        .search-box {
          padding: 0 16px;
        }

        .search-box svg {
          color: #98A2B3;
          flex-shrink: 0;
        }

        .search-box input {
          width: 100%;
          border: 0;
          outline: 0;
          font: inherit;
          color: ${C.navy};
          background: transparent;
          font-size: 14px;
        }

        .search-box input::placeholder {
          color: #98A2B3;
        }

        .filter-button {
          justify-content: center;
          font-weight: 700;
          cursor: default;
          font-size: 14px;
        }

        .tabs {
          display: flex;
          gap: 28px;
          border-bottom: 1px solid ${C.border};
          margin-bottom: 22px;
        }

        .tabs button {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 0;
          background: transparent;
          padding: 0 0 13px;
          color: ${C.muted};
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .tabs button.active {
          color: ${C.orange};
        }

        .tabs button.active::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 3px;
          border-radius: 999px;
          background: ${C.orange};
        }

        .favorites-section {
          margin-bottom: 28px;
          transition: opacity 0.2s ease;
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        h2 {
          margin: 0;
          color: ${C.navy};
          font-size: 18px;
          font-weight: 800;
        }

        .section-title span {
          color: ${C.muted};
          font-size: 14px;
          font-weight: 700;
        }

        .cards-row {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          min-height: 352px;
        }

        .service-card,
        .professional-card {
          background: #fff;
          border: 1px solid ${C.border};
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 22px rgba(10, 11, 45, 0.06);
        }

        .service-image {
          height: 92px;
          position: relative;
          overflow: hidden;
        }

        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .category-badge {
          position: absolute;
          left: 14px;
          bottom: 10px;
          color: #fff;
          padding: 5px 9px;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 800;
        }

        .heart-button,
        .professional-heart {
          border: 0;
          background: #fff;
          color: ${C.orange};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(10, 11, 45, 0.12);
        }

        .heart-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          font-size: 15px;
        }

        .heart-button:not(.active),
        .professional-heart:not(.active) {
          color: #98A2B3;
        }

        .service-body {
          padding: 12px 14px 14px;
        }

        .service-body h3,
        .professional-card h3 {
          margin: 0;
          color: ${C.navy};
          font-size: 15px;
          line-height: 1.25;
          font-weight: 800;
        }

        .provider-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 9px 0 8px;
          color: ${C.navy};
          font-size: 12px;
          font-weight: 700;
        }

        .provider-row img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
        }

        .meta-line {
          display: flex;
          align-items: center;
          gap: 7px;
          color: ${C.navy};
          font-size: 12px;
          font-weight: 600;
          margin: 5px 0;
        }

        .meta-line svg {
          color: ${C.navy};
          width: 13px;
          flex-shrink: 0;
        }

        .meta-line .star,
        .star {
          color: #F59E0B;
        }

        .price-label {
          margin: 10px 0 12px;
          color: ${C.orange};
          font-size: 12px;
          font-weight: 800;
        }

        .card-actions {
          display: grid;
          gap: 8px;
        }

        .card-actions button,
        .profile-button {
          height: 32px;
          border-radius: 6px;
          font-weight: 800;
          font-size: 12px;
          cursor: pointer;
          font-family: inherit;
        }

        .primary {
          border: 1px solid ${C.navy};
          background: ${C.navy};
          color: #fff;
        }

        .outline,
        .profile-button {
          border: 1px solid ${C.navy};
          background: #fff;
          color: ${C.navy};
        }

        .view-all {
          margin: 20px auto 0;
          min-height: 38px;
          padding: 0 18px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: ${C.navy};
          font-weight: 800;
          font-size: 13px;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: none;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .view-all:hover {
          color: ${C.orange};
          transform: translateY(-1px);
        }

        .professional-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          min-height: 160px;
        }

        .professional-card {
          position: relative;
          padding: 14px;
        }

        .professional-heart {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          font-size: 16px;
          box-shadow: none;
        }

        .professional-main {
          display: grid;
          grid-template-columns: 54px 1fr;
          gap: 12px;
          min-height: 112px;
        }

        .professional-main > img {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          object-fit: cover;
        }

        .professional-card p {
          margin: 3px 0 8px;
          color: ${C.muted};
          font-size: 12px;
          font-weight: 600;
        }

        .meta-line.soft {
          color: ${C.muted};
          font-size: 12px;
          margin: 6px 0;
        }

        .meta-line.soft svg {
          color: ${C.muted};
        }

        .profile-button {
          width: 100%;
          margin-top: 12px;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 0;
          background: rgba(255, 255, 255, 0.88);
          color: ${C.navy};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(10, 11, 45, 0.10);
          cursor: pointer;
          z-index: 2;
          transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .carousel-arrow:hover {
          color: ${C.orange};
          background: #fff;
          transform: translateY(-50%) scale(1.04);
        }

        .carousel-arrow.left {
          left: -20px;
        }

        .carousel-arrow.right {
          right: -20px;
        }

        .professional-arrow {
        }

        @media (max-width: 1180px) {
          .cards-row,
          .professional-grid {
            grid-template-columns: repeat(2, minmax(220px, 1fr));
          }
        }

        @media (max-width: 760px) {
          .favorites-page {
            padding: 22px 16px 34px;
          }

          .favorites-header {
            grid-template-columns: 1fr;
          }

          .toolbar {
            grid-template-columns: 1fr;
          }

          .tabs {
            overflow-x: auto;
            gap: 18px;
          }

          .cards-row,
          .professional-grid {
            grid-template-columns: 1fr;
          }

          .carousel-arrow {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
