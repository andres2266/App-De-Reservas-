// ============================================
// CONFIGURACIÓN
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycby4itH7PvdJvswkk_fwO2H241Qj7RLsijVRn7Z5CFpCvuvWZbf4QOFWzJMUHL1i1ZBu/exec';

// ============================================
// 1. CREATE - Crear una nueva cita
// ============================================

export async function crearCita(datos) {
    try {
        console.log('📌 Enviando petición de creación...');
        console.log('📦 Datos:', datos);
        
        const respuesta = await fetch(`${API_URL}?action=create`, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(datos)
        });
        
        const text = await respuesta.text();
        console.log('📥 Respuesta cruda:', text);
        
        let resultado;
        try {
            resultado = JSON.parse(text);
        } catch (parseError) {
            console.error('❌ Error parseando JSON:', parseError);
            return { 
                success: false, 
                message: 'Error: Respuesta no válida del servidor' 
            };
        }
        
        console.log('📥 Respuesta crearCita:', resultado);
        return resultado;
        
    } catch (error) {
        console.error('❌ Error en crearCita:', error);
        return { 
            success: false, 
            message: 'Error de conexión: ' + error.message 
        };
    }
}

// ============================================
// 2. DELETE - Eliminar una cita
// ============================================

export async function eliminarCita(codigo) {
    try {
        console.log(`🗑️ Intentando cancelar cita con código: ${codigo}`);
        
        const respuesta = await fetch(`${API_URL}?action=cancel`, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ codigo: codigo.trim() })
        });
        
        const text = await respuesta.text();
        console.log('📥 Respuesta cruda:', text);
        
        let resultado;
        try {
            resultado = JSON.parse(text);
        } catch (parseError) {
            console.error('❌ Error parseando JSON:', parseError);
            return { 
                success: false, 
                message: 'Error: Respuesta no válida del servidor' 
            };
        }
        
        console.log('📥 Respuesta eliminarCita:', resultado);
        return resultado;
        
    } catch (error) {
        console.error('❌ Error en eliminarCita:', error);
        return { 
            success: false, 
            message: 'Error de conexión: ' + error.message 
        };
    }
}

// ============================================
// 3. GET - Horas disponibles para hoy
// ============================================

export async function obtenerHorasDisponiblesHoy() {
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

// ============================================
// 4. GET - Horas disponibles para una fecha
// ============================================

export async function obtenerHorasDisponibles(fecha) {
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

// ============================================
// 5. GET - Listar citas de hoy
// ============================================

export async function listarCitasHoy(max = 50) {
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