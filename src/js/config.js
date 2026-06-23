/**
 * CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
 * Aquí se definen todas las constantes y configuraciones
 */

// URL del backend (¡REEMPLAZAR CON LA TUYA!)

export const API_URL = 'https://script.google.com/macros/s/AKfycbyXDDbjuef4Z5gpDmYsU2R4oITIH1_9RCmai0vEIsqbZKB1dD4ODEFUdFFMXNg9fvuC/exec';

// Configuración de horarios
export const CONFIG = {
    HORA_INICIO: 9,      // 9:00 AM
    HORA_FIN: 20,        // 8:00 PM
    DURACION_CITA: 60,   // 60 minutos
    DIAS_MAX: 30,        // Días hacia adelante para listar
    CODIGO_LENGTH: 6     // Longitud del código de confirmación
};

// Mensajes de la aplicación
export const MENSAJES = {
    LOADING: '⏳ Cargando horas disponibles...',
    NO_HOURS: '📭 No hay horas disponibles para este día',
    SELECT_HOUR: '❌ Selecciona una hora',
    PAST_DATE: '❌ No puedes reservar en el pasado',
    CONFIRM_DELETE: '¿Estás seguro de cancelar la cita con código {codigo}?',
    SUCCESS_CREATE: '✅ Cita reservada. Código: {codigo}',
    SUCCESS_DELETE: '✅ Cita con código {codigo} cancelada'
};

// Selectores del DOM (para evitar errores de tipeo)
export const DOM = {
    fechaInput: 'fechaInput',
    horasContainer: 'horasContainer',
    btnReservar: 'btnReservar',
    mensajeReservar: 'mensajeReservar',
    areaCodigo: 'areaCodigo',
    codigoGenerado: 'codigoGenerado',
    codigoInput: 'codigoInput',
    mensajeCancelar: 'mensajeCancelar',
    tabReservar: 'tab-reservar',
    tabCancelar: 'tab-cancelar'
};