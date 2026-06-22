"use client";

import { useState } from "react";

const ME_AVATAR = "https://i.pravatar.cc/150?img=47";

const conversations = [
  { id: 1, name: "João Eletricista", service: "Instalação elétrica", time: "10:30", preview: "Perfeito! Pode ser amanhã às 9h.", unread: 2, online: true, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 2, name: "Ana Diarista", service: "Diarista", time: "Ontem", preview: "Obrigada pela avaliação! Qualquer...", unread: 0, online: false, avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 3, name: "Carlos Pintor", service: "Pintura residencial", time: "Ontem", preview: "Segue as fotos do trabalho concluído.", unread: 1, online: false, avatar: "https://i.pravatar.cc/150?img=53" },
  { id: 4, name: "Mariana Designer", service: "Design de interiores", time: "2 dias", preview: "Vou preparar a proposta e te envio.", unread: 0, online: false, avatar: "https://i.pravatar.cc/150?img=44" },
  { id: 5, name: "Pedro Encanador", service: "Manutenção hidráulica", time: "3 dias", preview: "Ok, entendido! Obrigado.", unread: 0, online: false, avatar: "https://i.pravatar.cc/150?img=60" },
  { id: 6, name: "Equipe FazUno", service: "Suporte", time: "5 dias", preview: "Sua solicitação foi atualizada.", unread: 0, online: false, avatar: null, avatarColor: "#7C3AED", avatarLetter: "F" },
];

const initialMessages = [
  { id: 1, from: "me", text: "Olá, João! Tudo bem?", time: "10:15", read: true },
  { id: 2, from: "me", text: "Gostaria de confirmar se você pode vir amanhã às 9h para fazer a instalação elétrica.", time: "10:16", read: true },
  { id: 3, from: "other", text: "Olá, Brenda! Tudo ótimo 😊\nPosso sim, amanhã às 9h está perfeito.", time: "10:18" },
  { id: 4, from: "other", text: "Só para confirmar, o endereço é o mesmo que está na contratação, certo?", time: "10:19" },
  { id: 5, from: "me", text: "Isso mesmo! Rua das Flores, 123 - Centro. Qualquer coisa, me avise por aqui.", time: "10:20", read: true },
  { id: 6, from: "other", text: "Perfeito! Pode ser amanhã às 9h.", time: "10:30", reaction: "❤️" },
];

function Avatar({ name, src, color, letter, size = 40, online = false }) {
  const initials = name ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: color || "#D1D5DB", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.35, color: "#fff", overflow: "hidden" }}>
        {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : letter || initials}
      </div>
      {online && <span style={{ position: "absolute", bottom: 1, right: 1, width: size * 0.25, height: size * 0.25, borderRadius: "50%", background: "#22C55E", border: "2px solid #fff" }} />}
    </div>
  );
}

export default function ChatCliente() {
  const [activeId, setActiveId] = useState(1);
  const [tab, setTab] = useState("Todas");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const active = conversations.find((c) => c.id === activeId);

  function sendMessage() {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text: message, time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), read: false }]);
    setMessage("");
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#F9FAFB", color: "#111827" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 280, borderRight: "1px solid #E5E7EB", background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Mensagens</h2>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#7C3AED", padding: 4 }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          </button>
        </div>

        <div style={{ padding: "0 16px 12px" }}>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input placeholder="Buscar conversas..." style={{ width: "100%", boxSizing: "border-box", padding: "8px 12px 8px 34px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, outline: "none", background: "#F9FAFB" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, padding: "0 16px 12px" }}>
          {["Todas", "Não lidas", "Contratações"].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "6px 10px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: tab === t ? "#7C3AED" : "#F3F4F6", color: tab === t ? "#fff" : "#6B7280", display: "flex", alignItems: "center", gap: 4 }}>
              {t}
              {t === "Não lidas" && <span style={{ background: tab === t ? "rgba(255,255,255,0.3)" : "#7C3AED", color: "#fff", borderRadius: 10, padding: "1px 5px", fontSize: 10 }}>2</span>}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {conversations.map((conv) => (
            <div key={conv.id} onClick={() => setActiveId(conv.id)} style={{ display: "flex", gap: 12, padding: "12px 16px", cursor: "pointer", background: activeId === conv.id ? "#F5F3FF" : "transparent", borderLeft: activeId === conv.id ? "3px solid #7C3AED" : "3px solid transparent" }}>
              <Avatar name={conv.name} src={conv.avatar} color={conv.avatarColor} letter={conv.avatarLetter} size={44} online={conv.online} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{conv.name}</span>
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>{conv.time}</span>
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 1 }}>{conv.service}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 13, color: "#6B7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>{conv.preview}</span>
                  {conv.unread > 0 && <span style={{ background: "#7C3AED", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{conv.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: 16, borderTop: "1px solid #E5E7EB", textAlign: "center" }}>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "#6B7280" }}>Não encontrou sua conversa?</p>
          <button style={{ width: "100%", padding: "10px", border: "1.5px solid #7C3AED", borderRadius: 8, background: "none", color: "#7C3AED", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Ver todas as contratações</button>
        </div>
      </aside>

      {/* MAIN CHAT */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>

        <div style={{ padding: "12px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name={active.name} src={active.avatar} color={active.avatarColor} letter={active.avatarLetter} size={44} online={active.online} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{active.name}</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>{active.service}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{ padding: "8px 16px", border: "1.5px solid #7C3AED", borderRadius: 8, background: "none", color: "#7C3AED", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Ver contratação</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
            </button>
          </div>
        </div>

        <div style={{ margin: "12px 20px", padding: "12px 16px", border: "1px solid #E5E7EB", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FAFAFA" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "#EDE9FE", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" fill="none" stroke="#7C3AED" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Instalação elétrica completa</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>
                Código: #CON-4587{" "}
                <span style={{ background: "#DCFCE7", color: "#16A34A", borderRadius: 12, padding: "2px 8px", marginLeft: 6, fontWeight: 600, fontSize: 12 }}>Em andamento</span>
              </div>
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#7C3AED", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
            Ver detalhes <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", padding: "4px 0" }}>Hoje</div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map((msg) => {
            const isMe = msg.from === "me";
            return (
              <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
                {!isMe && <Avatar name={active.name} src={active.avatar} size={32} />}
                <div style={{ maxWidth: "65%" }}>
                  <div style={{ padding: "10px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? "#7C3AED" : "#F3F4F6", color: isMe ? "#fff" : "#111827", fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-line" }}>
                    {msg.text}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2, justifyContent: isMe ? "flex-end" : "flex-start" }}>
                    {msg.reaction && <span style={{ fontSize: 13, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "1px 6px" }}>{msg.reaction} 1</span>}
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>{msg.time}</span>
                    {isMe && (
                      <svg width="14" height="14" fill="none" stroke={msg.read ? "#7C3AED" : "#9CA3AF"} strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20 6 9 17l-5-5"/>
                        {msg.read && <path d="M24 6 13 17"/>}
                      </svg>
                    )}
                  </div>
                </div>
                {isMe && <Avatar name="Brenda Santos" src={ME_AVATAR} size={32} />}
              </div>
            );
          })}
        </div>

        <div style={{ padding: "0 20px 12px", display: "flex", gap: 8 }}>
          {[{ icon: "📅", label: "Agendar visita" }, { icon: "📎", label: "Enviar arquivo" }, { icon: "💬", label: "Mensagens rápidas" }].map((a) => (
            <button key={a.label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", border: "1.5px solid #E5E7EB", borderRadius: 20, background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", fontWeight: 500 }}>
              {a.icon} {a.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "0 20px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1.5px solid #E5E7EB", borderRadius: 12, padding: "10px 14px", background: "#fff" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>😊</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>
            <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Digite sua mensagem..." style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#374151", background: "transparent" }} />
            <button onClick={sendMessage} style={{ width: 36, height: 36, borderRadius: "50%", background: "#7C3AED", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7z"/></svg>
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: "#9CA3AF", margin: "8px 0 0" }}>🔒 Suas mensagens são protegidas com criptografia de ponta a ponta.</p>
        </div>
      </main>
    </div>
  );
}