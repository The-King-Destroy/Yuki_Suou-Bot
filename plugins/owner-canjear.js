import db from '../lib/database.js';

const COOKIES_REWARD = 100; // Cantidad de cookies que se recibirán por canje

let redeemHandler = async (m, { conn, text }) => {
    const userId = m.sender; // Usuario que envía el mensaje
    const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

    // Asegúrate de que la base de datos tenga la estructura adecuada
    if (!db.data) {
        db.data = {}; // Inicializa la base de datos si no existe
    }

    // Inicializa la sección global si no existe
    if (!db.data.global) {
        db.data.global = { codes: [], lastGenerated: null }; // Estructura global
    }

    const globalData = db.data.global;

    // Inicializa el usuario en la base de datos si no existe
    if (!db.data.users[userId]) {
        db.data.users[userId] = { cookies: 0, redeemedToday: false }; // Inicializa el saldo de cookies
    }

    const userData = db.data.users[userId];

    try {
        // Verifica si los códigos han sido generados
        if (!globalData.codes.length) {
            return m.reply("No hay códigos generados para canjear. Usa el comando *!generar* primero.");
        }

        // Verifica si el usuario ya canjeó un código hoy
        if (userData.redeemedToday) {
            return m.reply("Ya has canjeado un código hoy. Puedes canjear otro mañana.");
        }

        // Verifica si el código ingresado es válido
        if (!text || !globalData.codes.includes(text)) {
            return m.reply('Código inválido. Asegúrate de usar un código generado.');
        }

        // Canjea el código
        userData.cookies += COOKIES_REWARD; // Agrega las cookies al usuario
        userData.redeemedToday = true; // Marca al usuario como que ha canjeado
        globalData.codes = globalData.codes.filter(code => code !== text); // Elimina el código canjeado

        m.reply(`🎉 ¡Canjeo exitoso! Has ganado ${COOKIES_REWARD} cookies 🍪. Tu saldo actual es: ${userData.cookies} cookies.`);

        // Guarda la base de datos después del canje
        await saveDatabase(); // Asegúrate de implementar esta función

        // Verifica si ya no hay códigos disponibles
        if (globalData.codes.length === 0) {
            m.reply("🎉 ¡Se han canjeado todos los códigos! El evento ha terminado. ¡Gracias por participar!");
        }
    } catch (error) {
        console.error("Error al canjear el código:", error);
        m.reply("Hubo un error al procesar tu canje. Inténtalo de nuevo más tarde.");
    }
}

redeemHandler.command = ['canjear'];
export default redeemHandler;
