import { useState, useEffect, useRef } from "react";

const SAFFRON = "#FF6B00";
const GOLD = "#FFB800";
const DEEP = "#0A0A0F";
const CARD = "#13131A";
const BORDER = "#2A2A3A";
const TEXT = "#E8E8F0";
const MUTED = "#6B6B80";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${DEEP};
    color: ${TEXT};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .ayudha-root {
    min-height: 100vh;
    background: ${DEEP};
    position: relative;
    overflow-x: hidden;
  }

  .grain {
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .glow-orb {
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    top: -200px;
    right: -200px;
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 1; }
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(10,10,15,0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${BORDER};
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 24px;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, ${SAFFRON}, ${GOLD});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .logo span {
    color: white;
    -webkit-text-fill-color: white;
  }

  .nav-badge {
    background: rgba(255,107,0,0.15);
    border: 1px solid rgba(255,107,0,0.3);
    color: ${SAFFRON};
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px 40px 80px;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,184,0,0.1);
    border: 1px solid rgba(255,184,0,0.2);
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 13px;
    color: ${GOLD};
    margin-bottom: 32px;
    letter-spacing: 0.5px;
  }

  .hero-eyebrow::before {
    content: '🔱';
    font-size: 14px;
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -3px;
    margin-bottom: 24px;
  }

  .hero-title .gradient {
    background: linear-gradient(135deg, ${SAFFRON} 0%, ${GOLD} 50%, #FF8C42 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: clamp(16px, 2vw, 20px);
    color: ${MUTED};
    max-width: 560px;
    line-height: 1.7;
    margin-bottom: 48px;
    font-weight: 300;
  }

  .hero-sub strong {
    color: ${TEXT};
    font-weight: 500;
  }

  .cta-group {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary {
    background: linear-gradient(135deg, ${SAFFRON}, ${GOLD});
    color: #000;
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.3s ease;
    letter-spacing: -0.3px;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(255,107,0,0.3);
  }

  .btn-secondary {
    background: transparent;
    color: ${TEXT};
    border: 1px solid ${BORDER};
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    border-color: ${SAFFRON};
    color: ${SAFFRON};
  }

  .stats-row {
    display: flex;
    gap: 48px;
    justify-content: center;
    margin-top: 80px;
    flex-wrap: wrap;
  }

  .stat {
    text-align: center;
  }

  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, ${SAFFRON}, ${GOLD});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 13px;
    color: ${MUTED};
    margin-top: 4px;
    letter-spacing: 0.5px;
  }

  .section {
    padding: 100px 40px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .section-label {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${SAFFRON};
    margin-bottom: 16px;
    font-weight: 500;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -2px;
    margin-bottom: 16px;
  }

  .section-sub {
    color: ${MUTED};
    font-size: 18px;
    max-width: 500px;
    line-height: 1.7;
    font-weight: 300;
    margin-bottom: 60px;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
  }

  .step-card {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 20px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .step-card:hover {
    border-color: rgba(255,107,0,0.4);
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0,0,0,0.4);
  }

  .step-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${SAFFRON}, ${GOLD});
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .step-card:hover::before {
    opacity: 1;
  }

  .step-num {
    font-family: 'Syne', sans-serif;
    font-size: 48px;
    font-weight: 800;
    color: rgba(255,107,0,0.15);
    line-height: 1;
    margin-bottom: 16px;
  }

  .step-icon {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .step-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .step-desc {
    color: ${MUTED};
    font-size: 15px;
    line-height: 1.7;
    font-weight: 300;
  }

  .ai-section {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 32px;
    padding: 60px;
    position: relative;
    overflow: hidden;
  }

  .ai-section::after {
    content: '';
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,184,0,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .chat-window {
    background: ${DEEP};
    border: 1px solid ${BORDER};
    border-radius: 20px;
    overflow: hidden;
    margin-top: 40px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
  }

  .chat-header {
    padding: 16px 24px;
    border-bottom: 1px solid ${BORDER};
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,107,0,0.05);
  }

  .chat-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${SAFFRON};
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .chat-title {
    font-size: 14px;
    font-weight: 500;
    color: ${TEXT};
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 320px;
  }

  .chat-messages::-webkit-scrollbar {
    width: 4px;
  }

  .chat-messages::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-messages::-webkit-scrollbar-thumb {
    background: ${BORDER};
    border-radius: 4px;
  }

  .msg {
    display: flex;
    gap: 12px;
    animation: fadeUp 0.4s ease forwards;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .msg.user {
    flex-direction: row-reverse;
  }

  .msg-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    font-weight: 600;
  }

  .msg-avatar.ai {
    background: linear-gradient(135deg, ${SAFFRON}, ${GOLD});
    color: #000;
    font-family: 'Syne', sans-serif;
  }

  .msg-avatar.user-av {
    background: ${BORDER};
    color: ${TEXT};
  }

  .msg-bubble {
    max-width: 75%;
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.6;
  }

  .msg.ai .msg-bubble {
    background: rgba(255,107,0,0.08);
    border: 1px solid rgba(255,107,0,0.15);
    color: ${TEXT};
    border-bottom-left-radius: 4px;
  }

  .msg.user .msg-bubble {
    background: ${CARD};
    border: 1px solid ${BORDER};
    color: ${TEXT};
    border-bottom-right-radius: 4px;
  }

  .typing {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 4px 0;
  }

  .typing-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${SAFFRON};
    animation: typingBounce 1.2s ease-in-out infinite;
  }

  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typingBounce {
    0%, 100% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(-6px); opacity: 1; }
  }

  .chat-input-row {
    padding: 16px 24px;
    border-top: 1px solid ${BORDER};
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .chat-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid ${BORDER};
    border-radius: 12px;
    padding: 12px 16px;
    color: ${TEXT};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .chat-input::placeholder {
    color: ${MUTED};
  }

  .chat-input:focus {
    border-color: rgba(255,107,0,0.4);
  }

  .send-btn {
    background: linear-gradient(135deg, ${SAFFRON}, ${GOLD});
    border: none;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .send-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(255,107,0,0.3);
  }

  .send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .store-preview {
    background: ${DEEP};
    border: 1px solid ${BORDER};
    border-radius: 20px;
    overflow: hidden;
    margin-top: 40px;
  }

  .store-preview-header {
    padding: 12px 20px;
    border-bottom: 1px solid ${BORDER};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .browser-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .store-preview-body {
    padding: 32px;
  }

  .preview-store-name {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .preview-tagline {
    color: ${MUTED};
    font-size: 15px;
    margin-bottom: 24px;
  }

  .preview-products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .preview-product {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }

  .preview-product-emoji {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .preview-product-name {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .preview-product-price {
    font-size: 13px;
    color: ${SAFFRON};
    font-weight: 600;
  }

  .whatsapp-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #25D366;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 20px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s ease;
  }

  .whatsapp-btn:hover {
    background: #20BD5A;
    transform: translateY(-1px);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .feature-card {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 20px;
    padding: 32px;
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    border-color: rgba(255,107,0,0.3);
    transform: translateY(-4px);
  }

  .feature-icon {
    font-size: 36px;
    margin-bottom: 20px;
  }

  .feature-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.3px;
  }

  .feature-desc {
    color: ${MUTED};
    font-size: 14px;
    line-height: 1.7;
    font-weight: 300;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 60px;
  }

  .pricing-card {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 24px;
    padding: 40px 32px;
    position: relative;
    transition: all 0.3s ease;
  }

  .pricing-card.featured {
    border-color: ${SAFFRON};
    background: linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,184,0,0.05));
  }

  .pricing-card:hover {
    transform: translateY(-4px);
  }

  .pricing-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, ${SAFFRON}, ${GOLD});
    color: #000;
    padding: 4px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  .pricing-plan {
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${MUTED};
    margin-bottom: 16px;
  }

  .pricing-price {
    font-family: 'Syne', sans-serif;
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -2px;
    margin-bottom: 4px;
  }

  .pricing-price span {
    font-size: 20px;
    font-weight: 400;
    color: ${MUTED};
    letter-spacing: 0;
  }

  .pricing-per {
    color: ${MUTED};
    font-size: 14px;
    margin-bottom: 32px;
  }

  .pricing-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
  }

  .pricing-features li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: ${TEXT};
  }

  .pricing-features li::before {
    content: '✦';
    color: ${SAFFRON};
    font-size: 10px;
    flex-shrink: 0;
  }

  .footer {
    border-top: 1px solid ${BORDER};
    padding: 60px 40px;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .footer-logo {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, ${SAFFRON}, ${GOLD});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
  }

  .footer-tagline {
    color: ${MUTED};
    font-size: 14px;
    margin-bottom: 32px;
  }

  .footer-links {
    display: flex;
    gap: 32px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .footer-link {
    color: ${MUTED};
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: ${SAFFRON};
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, ${BORDER}, transparent);
    margin: 0 40px;
  }

  .scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }

  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .nav { padding: 16px 20px; }
    .hero { padding: 100px 20px 60px; }
    .section { padding: 60px 20px; }
    .ai-section { padding: 32px 24px; }
    .stats-row { gap: 32px; }
    .preview-products { grid-template-columns: repeat(2, 1fr); }
    .footer { padding: 40px 20px; }
  }
`;

const INITIAL_MESSAGES = [
  {
    role: "ai",
    content: "Namaste! 🔱 I'm AYUDHA AI. Tell me about your business and I'll help you build your store in minutes. What do you sell?"
  }
];

const SYSTEM_PROMPT = `You are AYUDHA AI, the intelligent assistant for AYUDHA — India's AI-powered business platform that helps small business owners set up their digital store, payments, and presence online.

You help Indian small business owners (kirana stores, home bakers, tailors, artisans, etc.) and E-commerce businesses set up their business online. You are warm, encouraging, speak simply, and occasionally in Hindi.

When a user tells you about their business, you:
1. Acknowledge warmly and enthusiastically
2. Ask 1-2 focused questions to understand their business better (products, location, target customers)
3. Help them think through their store name, tagline, and first products
4. Guide them step by step
5. Help them build a dashboard for all their SaaS needs
6. Provide direct listing of products to website and other APIs.

Keep responses SHORT (2-4 sentences max). Be conversational, warm, and encouraging. Use emojis occasionally. Always end with a specific question to keep the conversation moving forward.

Remember: Your users are non-tech savvy Indian business owners. Speak simply. Be their friend, not a robot.`;

export default function AYUDHAWebsite() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [storePreview, setStorePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const chatHistoryRef = useRef([]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    return () => { document.head.removeChild(style); observer.disconnect(); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    chatHistoryRef.current = [...chatHistoryRef.current, { role: "user", content: input.trim() }];

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: chatHistoryRef.current
        })
      });

      const data = await response.json();
      const aiText = data.content?.find(b => b.type === "text")?.text || "Main samajh raha hoon... thoda aur batao! 😊";

      chatHistoryRef.current = [...chatHistoryRef.current, { role: "assistant", content: aiText }];
      setMessages(prev => [...prev, { role: "ai", content: aiText }]);

      if (chatHistoryRef.current.length >= 4 && !storePreview) {
        generateStorePreview();
      }

    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", content: "Thodi problem aayi hai. Please dobara try karein! 🙏" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateStorePreview = async () => {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Based on the conversation, extract business details and return ONLY a JSON object with no markdown:
{"storeName": "...", "tagline": "...", "products": [{"name": "...", "price": "₹...", "emoji": "..."}, ...]}`,
          messages: [{ role: "user", content: `Conversation: ${JSON.stringify(chatHistoryRef.current)}. Extract store details as JSON.` }]
        })
      });
      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      try {
        const clean = text.replace(/```json|```/g, "").trim();
        setStorePreview(JSON.parse(clean));
      } catch (e) {
        console.log("Could not parse store preview");
      }
    } catch (err) {
      console.log("Error generating preview");
    }
  };

  return (
    <div className="ayudha-root">
      <div className="grain" />
      <div className="glow-orb" />

      {/* NAV */}
      <nav className="nav">
        <div className="logo">AYUDH<span>A</span></div>
        <div className="nav-badge">🇮🇳 Made for Bharat</div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">India's AI Business Platform</div>
        <h1 className="hero-title">
          Your Business.<br />
          <span className="gradient">Online. Today.</span>
        </h1>
        <p className="hero-sub">
          GETAYUDHA is the <strong>AI-powered Shopify for India</strong> — built for kirana stores, home bakers, artisans, every small business owner and e-commerce business who deserves to grow.
        </p>
        <div className="cta-group">
          <button className="btn-primary" onClick={() => document.getElementById('ai-section').scrollIntoView({behavior:'smooth'})}>
            Start For Free 🔱
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior:'smooth'})}>
            See How It Works
          </button>
        </div>
        <div className="stats-row">
          {[["10 Min", "Setup Time"], ["₹0", "To Start"], ["AI-Powered", "Growth Tools"], ["100%", "Made in India"]].map(([num, label]) => (
            <div className="stat" key={label}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* HOW IT WORKS */}
      <section className="section scroll-reveal" id="how-it-works">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Simple as<br />1, 2, 3</h2>
        <p className="section-sub">No tech knowledge needed. No complicated setup. Just tell us about your business.</p>
        <div className="steps-grid">
          {[
            { num: "01", icon: "💬", title: "Tell AYUDHA AI", desc: "Just chat with our AI in Hindi or English. Tell us what you sell, where you are, and who your customers are." },
            { num: "02", icon: "⚡", title: "We Build Your Store", desc: "AYUDHA creates your complete digital store — products, payments, WhatsApp integration — automatically." },
            { num: "03", icon: "📈", title: "Start Earning", desc: "Share your store link. Accept orders. Get paid. We handle the tech so you can focus on your business." }
          ].map(step => (
            <div className="step-card" key={step.num}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI CHAT SECTION */}
      <section className="section scroll-reveal" id="ai-section">
        <div className="ai-section">
          <div className="section-label">Try It Now — Free</div>
          <h2 className="section-title">Talk to<br />AYUDHA AI</h2>
          <p className="section-sub">Tell us about your business. Watch your store come to life.</p>

          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-dot" />
              <div className="chat-title">AYUDHA AI — Online</div>
            </div>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`msg ${msg.role === "user" ? "user" : "ai"}`}>
                  <div className={`msg-avatar ${msg.role === "ai" ? "ai" : "user-av"}`}>
                    {msg.role === "ai" ? "🔱" : "U"}
                  </div>
                  <div className="msg-bubble">{msg.content}</div>
                </div>
              ))}
              {isTyping && (
                <div className="msg ai">
                  <div className="msg-avatar ai">🔱</div>
                  <div className="msg-bubble">
                    <div className="typing">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-row">
              <input
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Tell us about your business..."
              />
              <button className="send-btn" onClick={sendMessage} disabled={isTyping || !input.trim()}>
                →
              </button>
            </div>
          </div>

          {/* STORE PREVIEW */}
          {storePreview && (
            <div className="store-preview" style={{animation: 'fadeUp 0.5s ease'}}>
              <div className="store-preview-header">
                <div className="browser-dot" style={{background: '#FF5F57'}} />
                <div className="browser-dot" style={{background: '#FEBC2E'}} />
                <div className="browser-dot" style={{background: '#28C840'}} />
                <span style={{fontSize: 13, color: MUTED, marginLeft: 8}}>ayudha.in/{storePreview.storeName?.toLowerCase().replace(/\s/g, '')}</span>
              </div>
              <div className="store-preview-body">
                <div className="preview-store-name" style={{background: `linear-gradient(135deg, ${SAFFRON}, ${GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                  {storePreview.storeName}
                </div>
                <div className="preview-tagline">{storePreview.tagline}</div>
                <div className="preview-products">
                  {storePreview.products?.map((p, i) => (
                    <div className="preview-product" key={i}>
                      <div className="preview-product-emoji">{p.emoji}</div>
                      <div className="preview-product-name">{p.name}</div>
                      <div className="preview-product-price">{p.price}</div>
                    </div>
                  ))}
                </div>
                <button className="whatsapp-btn">
                  📱 Order on WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section scroll-reveal">
        <div className="section-label">Everything You Need</div>
        <h2 className="section-title">Built for<br />Real Businesses</h2>
        <p className="section-sub">Everything a small business needs. Nothing they don't.</p>
        <div className="features-grid">
          {[
            { icon: "🏪", title: "Your Own Store", desc: "A beautiful digital storefront with your products, photos, and prices. Works on any phone, any internet connection." },
            { icon: "💳", title: "Indian Payments", desc: "UPI, PhonePe, Paytm, Google Pay, cards — all payment methods Indians actually use, built in from day one." },
            { icon: "📱", title: "WhatsApp Orders", desc: "Customers order directly on WhatsApp. No app download needed. Works exactly how India already shops." },
            { icon: "🤖", title: "AI Marketing", desc: "AI writes your product descriptions, social media posts, and marketing content in Hindi and English automatically." },
            { icon: "📊", title: "Simple Dashboard", desc: "See your sales, customers, and growth in one simple screen. No complicated reports. Just clear numbers." },
            { icon: "💰", title: "Business Credit", desc: "Once you're selling, unlock access to working capital and credit based on your actual sales data." }
          ].map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section scroll-reveal">
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Start Free.<br />Grow Together.</h2>
        <div className="pricing-grid">
          {[
            {
              plan: "SHURUAT", price: "₹0", per: "forever free",
              features: ["1 page store", "UPI payments", "WhatsApp integration", "5 products", "Basic dashboard"],
              featured: false
            },
            {
              plan: "VYAPAR", price: "₹499", per: "per month",
              features: ["Unlimited products", "All payment methods", "AI content writer", "Order management", "Analytics dashboard", "Priority support"],
              featured: true, badge: "Most Popular"
            },
            {
              plan: "UDYOG", price: "₹1,499", per: "per month",
              features: ["Everything in Vyapar", "Multi-location", "Business credit access", "Custom domain", "Dedicated account manager", "API access"],
              featured: false
            }
          ].map(p => (
            <div className={`pricing-card ${p.featured ? 'featured' : ''}`} key={p.plan}>
              {p.badge && <div className="pricing-badge">{p.badge}</div>}
              <div className="pricing-plan">{p.plan}</div>
              <div className="pricing-price">{p.price}<span>/mo</span></div>
              <div className="pricing-per">{p.per}</div>
              <ul className="pricing-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button className={p.featured ? "btn-primary" : "btn-secondary"} style={{width: '100%'}}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">AYUDHA 🔱</div>
        <div className="footer-tagline">The weapon that helps you grow. Built in India. For India.</div>
        <div className="footer-links">
          {["About", "Features", "Pricing", "Blog", "Contact", "Privacy"].map(l => (
            <div className="footer-link" key={l}>{l}</div>
          ))}
        </div>
        <div style={{marginTop: 32, color: MUTED, fontSize: 13}}>
          © 2025 AYUDHA. Made with 🔱 in India.
        </div>
      </footer>
    </div>
  );
}
