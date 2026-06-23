// ============================================
// ui.js - Funciones de interfaz de usuario
// ============================================

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
// 2. MOSTRAR SERVICIOS (ACTUALIZADO)
// ============================================

export function mostrarServicios(servicios) {
    const container = document.getElementById('serviciosContainer');
    if (!container) return;
    
    if (!servicios || servicios.length === 0) {
        container.innerHTML = '<p>No hay servicios disponibles</p>';
        return;
    }
    
    let html = `<div class="servicios-grid">`;
    
    servicios.forEach(servicio => {
        const isSelected = servicio.id === 'corte_degradado' ? 'selected' : '';
        const duracionTexto = servicio.duracion >= 60 
            ? `${servicio.duracion/60}h` 
            : `${servicio.duracion} min`;
        
        html += `
            <button 
                class="servicio-btn ${isSelected}" 
                data-servicio-id="${servicio.id}"
                onclick="window.seleccionarServicio('${servicio.id}')"
                type="button"
            >
                <span class="servicio-emoji">${servicio.emoji}</span>
                <span class="servicio-nombre">${servicio.nombre}</span>
                <span class="servicio-duracion">⏱️ ${duracionTexto}</span>
                <span class="servicio-precio">${servicio.precio}€</span>
            </button>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// ============================================
// 3. SELECCIONAR SERVICIO UI
// ============================================

export function seleccionarServicioUI(servicioId) {
    document.querySelectorAll('.servicio-btn').forEach(el => {
        el.classList.remove('selected');
    });
    
    const servicioElement = document.querySelector(`.servicio-btn[data-servicio-id="${servicioId}"]`);
    if (servicioElement) {
        servicioElement.classList.add('selected');
    }
}

// ============================================
// 4. MOSTRAR HORAS
// ============================================

export function mostrarHoras(data) {
    const container = document.getElementById('horasContainer');
    if (!container) return;
    
    if (!data || data.bloqueado) {
        container.innerHTML = `
            <div class="no-hours" style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 12px; padding: 30px;">
                <span style="font-size: 48px; display: block; margin-bottom: 12px;">📅</span>
                <p style="color: #856404; font-weight: 700; font-size: 18px;">${data?.motivo || 'Día no disponible'}</p>
                <p class="small" style="color: #856404;">Por favor, selecciona otro día</p>
            </div>
        `;
        return;
    }
    
    const horas = data.available || [];
    const fechaFormateada = data.dateFormatted || data.date;
    const horarioTexto = data.horario?.texto || '';
    const servicioNombre = data.servicio?.nombre || '';
    const duracion = data.servicio?.duracion || 30;
    const duracionTexto = duracion >= 60 ? `${duracion/60}h` : `${duracion} min`;
    
    if (horas.length === 0) {
        container.innerHTML = `
            <div class="no-hours">
                <span class="icon-svg" style="width:48px;height:48px;margin:0 auto 12px;display:block;opacity:0.5">
                    ${ICONS_SVG.clock || ''}
                </span>
                <p>No hay horas disponibles para ${servicioNombre}</p>
                <p class="small">Duración del servicio: ${duracionTexto}</p>
                ${horarioTexto ? `<p class="small">Horario: ${horarioTexto}</p>` : ''}
                <p class="small">Intenta con otra fecha u otro servicio</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="info-servicio">
            <span>✂️ Servicio: <strong>${servicioNombre}</strong></span>
            <span>⏱️ Duración: <strong>${duracionTexto}</strong></span>
        </div>
        <div class="horas-grid">
    `;
    
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
    
    if (horarioTexto) {
        html += `
            <div class="horario-info">
                <span>🕐</span>
                <span><strong>Horario de atención:</strong> ${horarioTexto}</span>
            </div>
        `;
    }
    
    container.innerHTML = html;
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
// 6. LIMPIAR HORAS
// ============================================

export function limpiarHoras() {
    document.querySelectorAll('.hora-btn').forEach(el => {
        el.classList.remove('seleccionada');
    });
}

// ============================================
// 7. SELECCIONAR HORA UI
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
// 8. MOSTRAR CÓDIGO
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
// 9. COPIAR CÓDIGO
// ============================================

export async function copiarCodigo() {
    const codigoGenerado = document.getElementById('codigoGenerado');
    if (!codigoGenerado) {
        console.error('❌ Elemento codigoGenerado no encontrado');
        mostrarMensaje('reservar', '❌ Error: No se encontró el código', 'error');
        return;
    }
    
    const codigo = codigoGenerado.textContent;
    
    if (!codigo || codigo === 'XXXXXX') {
        mostrarMensaje('reservar', '⚠️ No hay código para copiar', 'warning');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(codigo);
        mostrarMensaje('reservar', '✅ Código copiado al portapapeles', 'success');
        console.log('📋 Código copiado:', codigo);
    } catch (err) {
        console.warn('⚠️ Falló el método moderno, usando fallback:', err);
        
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

window.copiarCodigo = copiarCodigo;