// ============================================
// ui.js - Funciones de interfaz de usuario
// ============================================

// Importar iconos
import { ICONS_SVG } from './icons.js';

// ============================================
// 1. CONFIGURAR FECHA MÍNIMA
// ============================================

export function configurarFechaMinima() {
    const fechaInput = document.getElementById('fechaInput');
    if (!fechaInput) return;
    
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaHoy = `${año}-${mes}-${dia}`;
    
    fechaInput.setAttribute('min', fechaHoy);
    
    if (!fechaInput.value || fechaInput.value < fechaHoy) {
        fechaInput.value = fechaHoy;
    }
}

// ============================================
// 2. MOSTRAR HORAS
// ============================================

// ============================================
// 2. MOSTRAR HORAS (ACTUALIZADO)
// ============================================

export function mostrarHoras(horas, fechaFormateada = null, bloqueado = false, motivo = '') {
    const container = document.getElementById('horasContainer');
    if (!container) return;
    
    // 🔥 VERIFICAR SI EL DÍA ESTÁ BLOQUEADO
    if (bloqueado) {
        container.innerHTML = `
            <div class="no-hours" style="background: #fff3cd; border: 2px solid #ffc107;">
                <span style="font-size: 48px; display: block; margin-bottom: 12px;">📅</span>
                <p style="color: #856404; font-weight: 700; font-size: 18px;">${motivo || 'Día no disponible'}</p>
                <p class="small" style="color: #856404;">Por favor, selecciona otro día</p>
            </div>
        `;
        return;
    }
    
    if (!horas || horas.length === 0) {
        container.innerHTML = `
            <div class="no-hours">
                <span class="icon-svg" style="width:48px;height:48px;margin:0 auto 12px;display:block;opacity:0.5">
                    ${ICONS_SVG.clock || ''}
                </span>
                <p>No hay horas disponibles</p>
                <p class="small">Intenta con otra fecha</p>
            </div>
        `;
        return;
    }
    
    let html = `<div class="horas-grid">`;
    
    horas.forEach(hora => {
        const horaDisplay = hora.hora || hora.display || hora;
        html += `
            <button 
                class="hora-btn" 
                data-hora="${horaDisplay}"
                onclick="window.seleccionarHora('${horaDisplay}')"
                type="button"
            >
                ${horaDisplay}
            </button>
        `;
    });
    
    html += `</div>`;
    
    if (fechaFormateada) {
        html += `
            <div class="fecha-info">
                <span class="icon-svg" style="width:18px;height:18px;">${ICONS_SVG.calendar || ''}</span>
                ${fechaFormateada}
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// ============================================
// 3. LIMPIAR HORAS
// ============================================

export function limpiarHoras() {
    document.querySelectorAll('.hora-btn').forEach(el => {
        el.classList.remove('seleccionada');
    });
}

// ============================================
// 4. SELECCIONAR HORA UI
// ============================================

export function seleccionarHoraUI(hora) {
    document.querySelectorAll('.hora-btn').forEach(el => {
        el.classList.remove('seleccionada');
    });
    
    const horaElement = document.querySelector(`.hora-btn[data-hora="${hora}"]`);
    if (horaElement) {
        horaElement.classList.add('seleccionada');
    }
}

// ============================================
// 5. MOSTRAR MENSAJE
// ============================================

export function mostrarMensaje(tipo, mensaje, clase = 'info') {
    const containerId = tipo === 'reservar' ? 'mensajeReservar' : 'mensajeCancelar';
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    let icono = '';
    switch(clase) {
        case 'success':
            icono = ICONS_SVG.check || '✅';
            break;
        case 'error':
            icono = ICONS_SVG.cancel || '❌';
            break;
        case 'warning':
            icono = ICONS_SVG.star || '⚠️';
            break;
        default:
            icono = ICONS_SVG.user || 'ℹ️';
    }
    
    container.className = `mensaje ${clase}`;
    container.innerHTML = `
        <span class="icon-svg" style="width:20px;height:20px;display:inline-block;vertical-align:middle;flex-shrink:0;">${icono}</span>
        ${mensaje}
    `;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '10px';
    
    if (clase === 'success') {
        setTimeout(() => {
            container.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// 6. MOSTRAR CÓDIGO
// ============================================

export function mostrarCodigo(codigo) {
    const areaCodigo = document.getElementById('areaCodigo');
    const codigoGenerado = document.getElementById('codigoGenerado');
    
    if (codigo && areaCodigo && codigoGenerado) {
        codigoGenerado.textContent = codigo;
        areaCodigo.style.display = 'block';
        areaCodigo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (areaCodigo) {
        areaCodigo.style.display = 'none';
    }
}

// ============================================
// 7. COPIAR CÓDIGO
// ============================================

export async function copiarCodigo() {
    const codigoGenerado = document.getElementById('codigoGenerado');
    if (!codigoGenerado) {
        console.error('❌ Elemento codigoGenerado no encontrado');
        mostrarMensaje('reservar', '❌ Error: No se encontró el código', 'error');
        return;
    }
    
    const codigo = codigoGenerado.textContent;
    
    // Verificar que el código no sea "XXXXXX"
    if (!codigo || codigo === 'XXXXXX') {
        mostrarMensaje('reservar', '⚠️ No hay código para copiar', 'warning');
        return;
    }
    
    try {
        // Método moderno (recomendado)
        await navigator.clipboard.writeText(codigo);
        mostrarMensaje('reservar', '✅ Código copiado al portapapeles', 'success');
        console.log('📋 Código copiado:', codigo);
    } catch (err) {
        console.warn('⚠️ Falló el método moderno, usando fallback:', err);
        
        // Fallback para navegadores antiguos
        try {
            const textarea = document.createElement('textarea');
            textarea.value = codigo;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            mostrarMensaje('reservar', '✅ Código copiado al portapapeles', 'success');
            console.log('📋 Código copiado (fallback):', codigo);
        } catch (fallbackError) {
            console.error('❌ Error al copiar:', fallbackError);
            mostrarMensaje('reservar', '❌ Error al copiar el código', 'error');
        }
    }
}

// ============================================
// 8. ASIGNAR FUNCIÓN GLOBAL
// ============================================

// ✅ Solo una asignación global (NO exportar de nuevo)
window.copiarCodigo = copiarCodigo;

// ============================================
// ❌ ELIMINA ESTO - CAUSA EL ERROR
// ============================================
// export {
//     configurarFechaMinima,
//     mostrarHoras,
//     limpiarHoras,
//     seleccionarHoraUI,
//     mostrarMensaje,
//     mostrarCodigo,
//     copiarCodigo  // <-- ESTO ESTÁ DUPLICADO
// };