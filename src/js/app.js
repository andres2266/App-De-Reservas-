// ============================================
// app.js - Lógica principal
// ============================================

import { 
    obtenerHorasDisponiblesHoy, 
    obtenerHorasDisponibles,
    crearCita,
    eliminarCita 
} from '../api/fetchInstance.js';

import { 
    mostrarHoras, 
    limpiarHoras, 
    mostrarMensaje, 
    mostrarCodigo,
    copiarCodigo,
    configurarFechaMinima,
    seleccionarHoraUI
} from './ui.js';

import { ICONS_SVG } from './icons.js';

// Variables globales
let horaSeleccionada = null;
let fechaSeleccionada = null;
let fechaFormateada = null;

// ============================================
// 1. CARGAR HORAS DISPONIBLES HOY
// ============================================

export async function cargarHorasDisponiblesHoy() {
    console.log('🔄 Cargando horas disponibles para hoy...');
    
    const container = document.getElementById('horasContainer');
    if (!container) return;
    
    try {
        container.innerHTML = '<div class="loading-spinner">⏳ Cargando horas disponibles...</div>';
        
        const response = await obtenerHorasDisponiblesHoy();
        console.log('📥 Respuesta completa:', response);
        
        if (response.success && response.data) {
            const data = response.data;
            
            const fechaInput = document.getElementById('fechaInput');
            if (fechaInput) {
                fechaInput.value = data.date;
            }
            
            fechaSeleccionada = data.date;
            fechaFormateada = data.dateFormatted || null;
            
            // Pasar TODO el data a mostrarHoras
            mostrarHoras(data);
            
            horaSeleccionada = null;
            document.getElementById('btnReservar').disabled = true;
            
            if (data.bloqueado) {
                mostrarMensaje('reservar', `📅 ${data.motivo || 'Día cerrado'}`, 'warning');
            } else if (data.available && data.available.length > 0) {
                const msg = data.horario?.texto 
                    ? `✅ Horas disponibles (${data.horario.texto})` 
                    : '✅ Horas disponibles cargadas correctamente';
                mostrarMensaje('reservar', msg, 'success');
            } else {
                mostrarMensaje('reservar', '⚠️ No hay horas disponibles para hoy', 'warning');
            }
        } else {
            container.innerHTML = `
                <div class="no-hours">
                    <span class="icon-svg" style="width:48px;height:48px;margin:0 auto 12px;display:block;opacity:0.5">
                        ${ICONS_SVG.clock || ''}
                    </span>
                    <p>No hay horas disponibles para hoy</p>
                    <p class="small">Intenta con otra fecha</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        container.innerHTML = `
            <div class="no-hours">
                <p>❌ Error al cargar las horas</p>
                <p class="small">Por favor, recarga la página</p>
            </div>
        `;
    }
}

// ============================================
// 2. CARGAR HORAS POR FECHA
// ============================================

async function cargarHorasPorFecha(fecha) {
    const container = document.getElementById('horasContainer');
    container.innerHTML = '<div class="loading-spinner">⏳ Cargando horas...</div>';
    
    try {
        const response = await obtenerHorasDisponibles(fecha);
        console.log(`📥 Horas para ${fecha}:`, response);
        
        if (response.success && response.data) {
            const data = response.data;
            
            fechaSeleccionada = fecha;
            fechaFormateada = data.dateFormatted || null;
            
            // Pasar TODO el data a mostrarHoras
            mostrarHoras(data);
            
            horaSeleccionada = null;
            document.getElementById('btnReservar').disabled = true;
            
            if (data.bloqueado) {
                mostrarMensaje('reservar', `📅 ${data.motivo || 'Día cerrado'}`, 'warning');
            } else if (data.available && data.available.length === 0) {
                mostrarMensaje('reservar', '⚠️ No hay horas disponibles para esta fecha', 'warning');
            }
        } else {
            container.innerHTML = `
                <div class="no-hours">
                    <span class="icon-svg" style="width:48px;height:48px;margin:0 auto 12px;display:block;opacity:0.5">
                        ${ICONS_SVG.clock || ''}
                    </span>
                    <p>No hay horas disponibles para esta fecha</p>
                    <p class="small">Selecciona otra fecha</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        container.innerHTML = `
            <div class="no-hours">
                <p>❌ Error al cargar las horas</p>
                <p class="small">Por favor, intenta de nuevo</p>
            </div>
        `;
    }
}

// ============================================
// 3. SELECCIONAR HORA (GLOBAL)
// ============================================

window.seleccionarHora = function(hora) {
    console.log(`🕐 Hora seleccionada: ${hora}`);
    
    seleccionarHoraUI(hora);
    horaSeleccionada = hora;
    
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.disabled = false;
        btnReservar.innerHTML = `
            <span class="icon-svg" style="width:20px;height:20px;display:inline-block;vertical-align:middle;">${ICONS_SVG.check || '✅'}</span>
            Reservar cita - ${hora}
        `;
    }
    
    mostrarMensaje('reservar', `🕐 Hora seleccionada: ${hora}`, 'info');
};

// ============================================
// 4. CAMBIAR FECHA
// ============================================

export function onFechaChange() {
    const fecha = document.getElementById('fechaInput').value;
    if (!fecha) return;
    
    limpiarHoras();
    horaSeleccionada = null;
    
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.disabled = true;
        btnReservar.innerHTML = `
            <span class="icon-svg" style="width:20px;height:20px;display:inline-block;vertical-align:middle;">${ICONS_SVG.check || '✅'}</span>
            Reservar cita
        `;
    }
    
    cargarHorasPorFecha(fecha);
}

// ============================================
// 5. RESERVAR CITA
// ============================================

export async function handleReservar(event) {
    event.preventDefault();
    
    if (!horaSeleccionada || !fechaSeleccionada) {
        mostrarMensaje('reservar', '⚠️ Por favor, selecciona una hora', 'warning');
        return;
    }
    
    const btn = document.getElementById('btnReservar');
    btn.disabled = true;
    btn.innerHTML = `
        <span class="icon-svg" style="width:20px;height:20px;display:inline-block;vertical-align:middle;animation:spin 0.8s linear infinite;">${ICONS_SVG.clock || '⏳'}</span>
        Reservando...
    `;
    
    try {
        const startTime = new Date(`${fechaSeleccionada}T${horaSeleccionada}:00`);
        const endTime = new Date(startTime.getTime() + 60 * 60000);
        
        console.log('📌 Creando cita:', {
            start: startTime.toISOString(),
            end: endTime.toISOString()
        });
        
        const response = await crearCita({
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            location: 'Peluquería'
        });
        
        console.log('📥 Respuesta:', response);
        
        if (response.success) {
            mostrarCodigo(response.data.codigo);
            mostrarMensaje('reservar', response.message, 'success');
            
            horaSeleccionada = null;
            limpiarHoras();
            await cargarHorasDisponiblesHoy();
        } else {
            mostrarMensaje('reservar', response.message || '❌ Error al reservar', 'error');
        }
        
        btn.innerHTML = `
            <span class="icon-svg" style="width:20px;height:20px;display:inline-block;vertical-align:middle;">${ICONS_SVG.check || '✅'}</span>
            Reservar cita
        `;
        btn.disabled = false;
        
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarMensaje('reservar', '❌ Error de conexión. Por favor, intenta de nuevo.', 'error');
        btn.innerHTML = `
            <span class="icon-svg" style="width:20px;height:20px;display:inline-block;vertical-align:middle;">${ICONS_SVG.check || '✅'}</span>
            Reservar cita
        `;
        btn.disabled = false;
    }
}

// ============================================
// 6. CANCELAR CITA
// ============================================

export async function handleCancelar(event) {
    event.preventDefault();
    
    const codigoInput = document.getElementById('codigoInput');
    if (!codigoInput) return;
    
    const codigo = codigoInput.value.trim();
    
    if (!codigo || codigo.length !== 6) {
        mostrarMensaje('cancelar', '⚠️ Por favor, ingresa un código válido de 6 dígitos', 'warning');
        return;
    }
    
    const btn = document.getElementById('btnCancelar');
    if (!btn) return;
    
    btn.disabled = true;
    btn.innerHTML = `
        <span class="icon-svg" style="width:20px;height:20px;display:inline-block;vertical-align:middle;animation:spin 0.8s linear infinite;">${ICONS_SVG.clock || '⏳'}</span>
        Cancelando...
    `;
    
    try {
        const response = await eliminarCita(codigo);
        console.log('📥 Respuesta cancelación:', response);
        
        if (response.success) {
            mostrarMensaje('cancelar', response.message, 'success');
            codigoInput.value = '';
            await cargarHorasDisponiblesHoy();
        } else {
            mostrarMensaje('cancelar', response.message || '❌ Error al cancelar', 'error');
        }
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarMensaje('cancelar', '❌ Error de conexión. Por favor, intenta de nuevo.', 'error');
    } finally {
        btn.innerHTML = `
            <span class="icon-svg" style="width:20px;height:20px;display:inline-block;vertical-align:middle;">${ICONS_SVG.cancel || '❌'}</span>
            Cancelar cita
        `;
        btn.disabled = false;
    }
}

// ============================================
// 7. CAMBIAR TAB (GLOBAL)
// ============================================

window.showTab = function(tab) {
    console.log(`📋 Cambiando a tab: ${tab}`);
    
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });
    
    const tabContent = document.getElementById(`tab-${tab}`);
    if (tabContent) {
        tabContent.classList.add('active');
    }
    
    document.querySelectorAll('.tab').forEach(el => {
        el.classList.remove('active');
    });
    
    const buttons = document.querySelectorAll('.tab');
    const tabMap = { 'reservar': 0, 'cancelar': 1 };
    if (tabMap[tab] !== undefined && buttons[tabMap[tab]]) {
        buttons[tabMap[tab]].classList.add('active');
    }
};

// ============================================
// 8. CONFIGURAR TABS
// ============================================

export function setupTabs() {
    const tabReservar = document.getElementById('tabReservarBtn');
    const tabCancelar = document.getElementById('tabCancelarBtn');
    
    if (tabReservar) {
        tabReservar.removeAttribute('onclick');
        tabReservar.addEventListener('click', function(e) {
            e.preventDefault();
            window.showTab('reservar');
        });
        console.log('✅ Tab Reservar configurado');
    }
    
    if (tabCancelar) {
        tabCancelar.removeAttribute('onclick');
        tabCancelar.addEventListener('click', function(e) {
            e.preventDefault();
            window.showTab('cancelar');
        });
        console.log('✅ Tab Cancelar configurado');
    }
}

// ============================================
// 9. INICIALIZAR
// ============================================

export function init() {
    console.log('🚀 Inicializando aplicación...');
    
    configurarFechaMinima();
    cargarHorasDisponiblesHoy();
    
    const fechaInput = document.getElementById('fechaInput');
    if (fechaInput) {
        fechaInput.addEventListener('change', onFechaChange);
    }
    
    const formReservar = document.getElementById('formReservar');
    if (formReservar) {
        formReservar.addEventListener('submit', handleReservar);
    }
    
    const formCancelar = document.getElementById('formCancelar');
    if (formCancelar) {
        formCancelar.addEventListener('submit', handleCancelar);
    }
    
    setupTabs();
    
    window.copiarCodigo = copiarCodigo;
    window.seleccionarHora = window.seleccionarHora;
    window.showTab = window.showTab;
    
    const btnCopiar = document.getElementById('btnCopiarCodigo');
    if (btnCopiar) {
        btnCopiar.removeAttribute('onclick');
        btnCopiar.addEventListener('click', function(e) {
            e.preventDefault();
            window.copiarCodigo();
        });
        console.log('✅ Botón copiar configurado');
    }
    
    window.showTab('reservar');
    
    console.log('✅ Aplicación inicializada correctamente');
}

// ============================================
// AUTO-INICIAR
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}