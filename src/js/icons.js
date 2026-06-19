// ============================================
// icons.js - Iconos SVG Profesionales para Barbería
// ============================================

// Iconos SVG como strings
export const ICONS_SVG = {
    // Logo principal
    logo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#2c1810" stroke="#c9a84c" stroke-width="3"/>
        <path d="M35 45 L50 30 L65 45 L50 60 L35 45Z" fill="#c9a84c"/>
        <line x1="35" y1="45" x2="25" y2="65" stroke="#c9a84c" stroke-width="3"/>
        <line x1="65" y1="45" x2="75" y2="65" stroke="#c9a84c" stroke-width="3"/>
        <circle cx="50" cy="45" r="5" fill="#2c1810"/>
        <line x1="45" y1="70" x2="55" y2="70" stroke="#c9a84c" stroke-width="2"/>
        <line x1="47" y1="75" x2="53" y2="75" stroke="#c9a84c" stroke-width="2"/>
    </svg>`,

    // Tijeras
    scissors: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 11.5L17.5 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M6.5 11.5L17.5 19.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="6.5" cy="11.5" r="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="6.5" cy="11.5" r="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="19" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="19" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    // Navaja
    razor: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="12" width="18" height="4" rx="1" fill="currentColor" opacity="0.3"/>
        <path d="M20 10 L20 18 L22 14 L20 10Z" fill="currentColor"/>
        <circle cx="3" cy="14" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <line x1="5" y1="14" x2="20" y2="14" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,

    // Poste de barbero
    barber_pole: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="6" y1="6" x2="18" y2="6" stroke="#ff4444" stroke-width="2"/>
        <line x1="6" y1="10" x2="18" y2="10" stroke="#ffffff" stroke-width="2"/>
        <line x1="6" y1="14" x2="18" y2="14" stroke="#4488ff" stroke-width="2"/>
        <line x1="6" y1="18" x2="18" y2="18" stroke="#ff4444" stroke-width="2"/>
        <circle cx="12" cy="2" r="2" fill="currentColor"/>
        <circle cx="12" cy="22" r="2" fill="currentColor"/>
    </svg>`,

    // Calendario
    calendar: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
    </svg>`,

    // Reloj
    clock: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="12" y1="12" x2="12" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="12" y1="12" x2="16" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>`,

    // Check
    check: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12 L10 18 L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    // Cancelar
    cancel: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    // Usuario/Cliente
    user: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M4 22C4 16 8 14 12 14C16 14 20 16 20 22" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    // Teléfono
    phone: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    // Ubicación
    location: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C12 22 20 16 20 10C20 5 16 2 12 2C8 2 4 5 4 10C4 16 12 22 12 22Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    // WhatsApp
    whatsapp: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="none" stroke="#25D366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 11L8 11.01" stroke="#25D366" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 11L12 11.01" stroke="#25D366" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 11L16 11.01" stroke="#25D366" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    // Instagram
    instagram: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#E4405F" stroke-width="2"/>
        <circle cx="12" cy="12" r="5" fill="none" stroke="#E4405F" stroke-width="2"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="#E4405F"/>
    </svg>`,

    // Facebook
    facebook: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="none" stroke="#1877F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    // Estrella
    star: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>`,

    // Flecha derecha
    arrow_right: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 5L20 12L13 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    // Flecha izquierda
    arrow_left: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 19L4 12L11 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/>
    </svg>`
};

// Función para obtener un icono SVG
export function getIconSVG(name) {
    return ICONS_SVG[name] || ICONS_SVG.logo;
}

// Función para crear elemento de icono
export function createIcon(name, className = '', size = 24) {
    const div = document.createElement('div');
    div.className = `icon-svg ${className}`;
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.innerHTML = getIconSVG(name);
    return div;
}

// Función para generar HTML de icono
export function iconHTML(name, className = '', size = 24) {
    const svg = getIconSVG(name);
    return `<span class="icon-svg ${className}" style="width:${size}px;height:${size}px">${svg}</span>`;
}