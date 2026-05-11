# Getayudha 
<!DOCTYPE html>
<html>
<head>
  <title>GETAYUDHA</title>
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
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
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

</head>
<body>
  <h1>GETAYUDHA</h1>
  <p>Building AI-powered commerce tools for Indian businesses.</p>
</body>
</html>
