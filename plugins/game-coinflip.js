let cooldowns = {};

// Función principal que maneja la apuesta de cara o cruz
let handler = async (m, { conn, text, command, usedPrefix }) => {
    const tiempoEspera = 5 * 1000; // 5 segundos en milisegundos

    // Verifica si el usuario está en cooldown
    if (cooldowns[m.sender] && Date.now() < cooldowns[m.sender] + tiempoEspera) {
        let tiempoRestante = Math.ceil((cooldowns[m.sender] + tiempoEspera - Date.now()) / 1000);
        return m.reply(`[ ✨ ] Espera *${tiempoRestante}* segundos para apostar nuevamente.`);
    }

    // Verifica si el texto ingresado es válido
    if (!text || !['cara', 'cruz'].includes(text.toLowerCase())) {
        return conn.reply(m.chat, '[ ✨ ] Elige una opción ( *Cara o Cruz* ) para lanzar la moneda.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* cara`, m);
    }

    // Inicializa el límite de cookies si no existe
    global.database = global.database || {};
    global.database.users = global.database.users || {};
    global.database.users[m.sender] = global.database.users[m.sender] || { limit: 0 };

    // Inicia el cooldown para el usuario
    cooldowns[m.sender] = Date.now();
    const resultado = Math.random() < 0.5 ? 'cara' : 'cruz'; // Genera el resultado aleatorio
    const esGanador = text.toLowerCase() === resultado; // Verifica si el usuario ganó

    // Define la cantidad de cookies a sumar/restar
    const cantidadGanada = 1000;
    const cantidadPerdida = 500;

    // Actualiza las cookies del usuario según el resultado
    if (esGanador) {
        global.database.users[m.sender].limit += cantidadGanada;
        return conn.reply(m.chat, `✨ La moneda cayó en *${resultado}*, acabas de ganar *${cantidadGanada} YukiCoins 🪙*`, m);
    } else {
        // Asegúrate de que el usuario no tenga menos de 0 cookies
        if (global.database.users[m.sender].limit < cantidadPerdida) {
            return conn.reply(m.chat, `✨ La moneda cayó en *${resultado}*, pero no tienes suficientes cookies para perder *${cantidadPerdida} 🍪 Cookies*`, m);
        }
        global.database.users[m.sender].limit -= cantidadPerdida;
        return conn.reply(m.chat, `✨ La moneda cayó en *${resultado}*, acabas de perder *${cantidadPerdida} YukiCoins 🪙*`, m);
    }
}

// Ayuda y configuración del comando
handler.help = ['coinflip'];
handler.tags = ['game'];
handler.command = ['suerte', 'cf', 'flip', 'coinflip'];
handler.register = true;

// Exporta el manejador
export default handler;
