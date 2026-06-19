// script.js - TODOS LOS SCRIPTS COMBINADOS

// ============================================
// CONFIGURACIÓN
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbx3lAgmDMEIsJOBu_fWnqcb0ClZyVUi0l_UxweEg-uEbaJr521TJP-owHXYTm4xPk2p/exec';

// ============================================
// FUNCIONES DE API
// ============================================

async function crearCita(datos) {
    try {
        const respuesta = await fetch(`${API_URL}?action=create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        return await respuesta.json();
    } catch (error) {
        console.error('❌ Error en crearCita:', error);
        return { success: false, message: 'Error de conexión: ' + error.message };
    }
}

async function listarCitas(dias = 30, max = 50) {
    try {
        const respuesta = await fetch(`${API_URL}?action=list&days=${dias}&max=${max}`);
        return await respuesta.json();
    } catch (error) {
        console.error('❌ Error en listarCitas:', error);
        return { success: false, message: 'Error de conexión: ' + error.message };
    }
}

async function actualizarCita(datos) {
    try {
        const respuesta = await fetch(`${API_URL}?action=update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        return await respuesta.json();
    } catch (error) {
        console.error('❌ Error en actualizarCita:', error);
        return { success: false, message: 'Error de conexión: ' + error.message };
    }
}

async function eliminarCita(codigo) {
    try {
        const respuesta = await fetch(`${API_URL}?action=cancel`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo: codigo })
        });
        return await respuesta.json();
    } catch (error) {
        console.error('❌ Error en eliminarCita:', error);
        return { success: false, message: 'Error de conexión: ' + error.message };
    }
}

async function obtenerHorasDisponiblesHoy() {
    try {
        const respuesta = await fetch(`${API_URL}?action=availableToday`);
        const data = await respuesta.json();
        console.log('📅 Horas disponibles hoy:', data);
        return data;
    } catch (error) {
        console.error('❌ Error en obtenerHorasDisponiblesHoy:', error);
        return { 
            success: false, 
            message: 'Error de conexión: ' + error.message,
            data: { available: [] }
        };
    }
}

async function obtenerHorasDisponibles(fecha) {
    try {
        const respuesta = await fetch(`${API_URL}?action=available&date=${fecha}`);
        const data = await respuesta.json();
        console.log(`📅 Horas disponibles para ${fecha}:`, data);
        return data;
    } catch (error) {
        console.error('❌ Error en obtenerHorasDisponibles:', error);
        return { 
            success: false, 
            message: 'Error de conexión: ' + error.message,
            data: { available: [] }
        };
    }
}

async function listarCitasHoy(max = 50) {
    try {
        const respuesta = await fetch(`${API_URL}?action=today&max=${max}`);
        const data = await respuesta.json();
        console.log('📋 Citas agendadas hoy:', data);
        return data;
    } catch (error) {
        console.error('❌ Error en listarCitasHoy:', error);
        return { 
            success: false, 
            message: 'Error de conexión: ' + error.message,
            data: { events: [] }
        };
    }
}

// ============================================
// FUNCIONES DE UI
// ============================================

function mostrarHoras(horas, fechaFormateada = null) {
    const container = document.getElementById('horasContainer');
    
    if (!container) {
        console.error('❌ Contenedor de horas no encontrado');
        return;
    }
    
    if (!horas || horas.length === 0) {
        container.innerHTML = `
            <div class="no-hours">
                <p>😕 No hay horas disponibles</p>
                <p class="small">Intenta con otra fecha</p>
            </div>
        `;
        return;
    }
    
    let html = `<div class="horas-grid">`;
    
    horas.forEach(hora => {
        const horaDisplay = hora.hora || hora.display || hora;
        html += `
            <div class="hora-item" data-hora="${horaDisplay}" onclick="seleccionarHora('${horaDisplay}')">
                ${horaDisplay}
            </div>
        `;
    });
    
    html += `</div>`;
    
    if (fechaFormateada) {
        html += `
            <div class="fecha-info">
                📅 ${fechaFormateada}
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function limpiarHoras() {
    document.querySelectorAll('.hora-item').forEach(el => {
        el.classList.remove('seleccionada');
    });
}

function mostrarMensaje(tipo, mensaje, clase = 'info') {
    const containerId = tipo === 'reservar' ? 'mensajeReservar' : 'mensajeCancelar';
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    container.className = `mensaje ${clase}`;
    container.textContent = mensaje;
    container.style.display = 'block';
    
    if (clase === 'success') {
        setTimeout(() => {
            container.style.display = 'none';
        }, 5000);
    }
}

function mostrarCodigo(codigo) {
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

async function copiarCodigo() {
    const codigoGenerado = document.getElementById('codigoGenerado');
    if (!codigoGenerado) return;
    
    const codigo = codigoGenerado.textContent;
    
    try {
        await navigator.clipboard.writeText(codigo);
        mostrarMensaje('reservar', '✅ Código copiado al portapapeles', 'success');
    } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = codigo;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        mostrarMensaje('reservar', '✅ Código copiado al portapapeles', 'success');
    }
}

// ============================================
// LÓGICA PRINCIPAL DE LA APLICACIÓN
// ============================================

let horaSeleccionada = null;
let fechaSeleccionada = null;
let fechaFormateada = null;

async function cargarHorasDisponiblesHoy() {
    console.log('🔄 Cargando horas disponibles para hoy...');
    
    const horasContainer = document.getElementById('horasContainer');
    if (!horasContainer) return;
    
    try {
        horasContainer.innerHTML = '<div class="loading-spinner">⏳ Cargando horas disponibles...</div>';
        
        const response = await obtenerHorasDisponiblesHoy();
        console.log('📥 Respuesta del servidor:', response);
        
        if (response.success && response.data && response.data.available) {
            const fechaInput = document.getElementById('fechaInput');
            if (fechaInput) {
                fechaInput.value = response.data.date;
                const hoy = new Date().toISOString().split('T')[0];
                fechaInput.setAttribute('min', hoy);
            }
            
            fechaSeleccionada = response.data.date;
            fechaFormateada = response.data.dateFormatted || null;
            
            mostrarHoras(response.data.available, fechaFormateada);
            
            mostrarMensaje(
                'reservar',
                `✅ ${response.message || 'Horas disponibles cargadas correctamente'}`,
                'success'
            );
            
            console.log(`✅ ${response.data.total} horas disponibles para hoy`);
        } else {
            horasContainer.innerHTML = `
                <div class="no-hours">
                    <p>😕 No hay horas disponibles para hoy</p>
                    <p class="small">Intenta con otra fecha</p>
                </div>
            `;
            mostrarMensaje(
                'reservar',
                '⚠️ No hay horas disponibles para hoy. Selecciona otra fecha.',
                'warning'
            );
        }
    } catch (error) {
        console.error('❌ Error cargando horas:', error);
        horasContainer.innerHTML = `
            <div class="no-hours">
                <p>❌ Error al cargar las horas</p>
                <p class="small">Por favor, recarga la página</p>
            </div>
        `;
        mostrarMensaje(
            'reservar',
            '❌ Error al cargar las horas disponibles. Por favor, recarga la página.',
            'error'
        );
    }
}

async function cargarHorasPorFecha(fecha) {
    console.log(`🔄 Cargando horas para ${fecha}...`);
    
    const horasContainer = document.getElementById('horasContainer');
    if (!horasContainer) return;
    
    try {
        horasContainer.innerHTML = '<div class="loading-spinner">⏳ Cargando horas...</div>';
        
        const response = await obtenerHorasDisponibles(fecha);
        console.log(`📥 Horas para ${fecha}:`, response);
        
        if (response.success && response.data && response.data.available) {
            fechaSeleccionada = fecha;
            fechaFormateada = response.data.dateFormatted || null;
            mostrarHoras(response.data.available, fechaFormateada);
        } else {
            horasContainer.innerHTML = `
                <div class="no-hours">
                    <p>😕 No hay horas disponibles para esta fecha</p>
                    <p class="small">Selecciona otra fecha</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Error cargando horas por fecha:', error);
        horasContainer.innerHTML = `
            <div class="no-hours">
                <p>❌ Error al cargar las horas</p>
                <p class="small">Por favor, intenta de nuevo</p>
            </div>
        `;
    }
}

function seleccionarHora(hora) {
    console.log(`🕐 Hora seleccionada: ${hora}`);
    
    document.querySelectorAll('.hora-item').forEach(el => {
        el.classList.remove('seleccionada');
    });
    
    const horaElement = document.querySelector(`[data-hora="${hora}"]`);
    if (horaElement) {
        horaElement.classList.add('seleccionada');
    }
    
    horaSeleccionada = hora;
    
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.disabled = false;
    }
}

function onFechaChange() {
    const fechaInput = document.getElementById('fechaInput');
    if (!fechaInput) return;
    
    const fecha = fechaInput.value;
    
    if (fecha) {
        limpiarHoras();
        horaSeleccionada = null;
        
        const btnReservar = document.getElementById('btnReservar');
        if (btnReservar) {
            btnReservar.disabled = true;
        }
        
        cargarHorasPorFecha(fecha);
    }
}

async function handleReservar(event) {
    event.preventDefault();
    
    console.log('📌 Iniciando reserva...');
    
    if (!horaSeleccionada || !fechaSeleccionada) {
        mostrarMensaje('reservar', '⚠️ Por favor, selecciona una hora', 'warning');
        return;
    }
    
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.disabled = true;
        btnReservar.textContent = '⏳ Reservando...';
    }
    
    try {
        const startTime = new Date(`${fechaSeleccionada}T${horaSeleccionada}:00`);
        const endTime = new Date(startTime.getTime() + 60 * 60000);
        
        const response = await crearCita({
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            location: 'Peluquería'
        });
        
        console.log('📥 Respuesta de reserva:', response);
        
        if (response.success) {
            mostrarCodigo(response.data.codigo);
            mostrarMensaje('reservar', `✅ ${response.message}`, 'success');
            
            horaSeleccionada = null;
            limpiarHoras();
            
            await cargarHorasDisponiblesHoy();
        } else {
            mostrarMensaje('reservar', `❌ ${response.message || 'Error al reservar'}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error en reserva:', error);
        mostrarMensaje('reservar', '❌ Error de conexión. Por favor, intenta de nuevo.', 'error');
    } finally {
        if (btnReservar) {
            btnReservar.disabled = false;
            btnReservar.textContent = '📌 Reservar cita';
        }
    }
}

async function handleCancelar(event) {
    event.preventDefault();
    
    const codigoInput = document.getElementById('codigoInput');
    if (!codigoInput) return;
    
    const codigo = codigoInput.value.trim();
    
    if (!codigo || codigo.length !== 6) {
        mostrarMensaje('cancelar', '⚠️ Por favor, ingresa un código válido de 6 dígitos', 'warning');
        return;
    }
    
    const btnCancelar = event.target.querySelector('.btn-danger');
    if (btnCancelar) {
        btnCancelar.disabled = true;
        btnCancelar.textContent = '⏳ Cancelando...';
    }
    
    try {
        const response = await eliminarCita(codigo);
        console.log('📥 Respuesta de cancelación:', response);
        
        if (response.success) {
            mostrarMensaje('cancelar', `✅ ${response.message}`, 'success');
            codigoInput.value = '';
            
            await cargarHorasDisponiblesHoy();
        } else {
            mostrarMensaje('cancelar', `❌ ${response.message || 'Error al cancelar'}`, 'error');
        }
    } catch (error) {
        console.error('❌ Error en cancelación:', error);
        mostrarMensaje('cancelar', '❌ Error de conexión. Por favor, intenta de nuevo.', 'error');
    } finally {
        if (btnCancelar) {
            btnCancelar.disabled = false;
            btnCancelar.textContent = '❌ Cancelar cita';
        }
    }
}

function showTab(tab) {
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
}

// ============================================
// INICIALIZACIÓN
// ============================================

function init() {
    console.log('🚀 Inicializando aplicación...');
    
    cargarHorasDisponiblesHoy();
    
    const fechaInput = document.getElementById('fechaInput');
    if (fechaInput) {
        fechaInput.addEventListener('change', onFechaChange);
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.setAttribute('min', hoy);
    }
    
    const formReservar = document.getElementById('formReservar');
    if (formReservar) {
        formReservar.addEventListener('submit', handleReservar);
    }
    
    const formCancelar = document.getElementById('formCancelar');
    if (formCancelar) {
        formCancelar.addEventListener('submit', handleCancelar);
    }
    
    window.copiarCodigo = copiarCodigo;
    window.seleccionarHora = seleccionarHora;
    window.showTab = showTab;
    
    console.log('✅ Aplicación inicializada correctamente');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}