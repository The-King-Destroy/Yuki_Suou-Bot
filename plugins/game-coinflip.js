let cooldowns = {};

// Función principal que maneja la apuesta de cara o cruz
let handler = async (m, { conn, text, command, usedPrefix }) => {
    // Tiempo de espera en segundos
    let tiempoEspera = 5;

    // Verifica si el usuario está en cooldown
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
        return m.reply(`[ ✨ ] Ya has iniciado una apuesta recientemente, espera *⏱ ${tiempoRestante}* para apostar nuevamente.`);
    }

    // Verifica si el texto ingresado es válido
    if (!text || !['cara', 'cruz'].includes(text.toLowerCase())) {
        return conn.reply(m.chat, '[ ✰ ] Elige una opción ( *Cara o Cruz* ) para lanzar la moneda.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* cara`, m);
    }

    // Inicia el cooldown para el usuario
    cooldowns[m.sender] = Date.now();
    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz'; // Genera el resultado aleatorio
    let esGanador = text.toLowerCase() === resultado; // Verifica si el usuario ganó

    // Actualiza las cookies del usuario según el resultado
    if (esGanador) {
        global.database.users[m.sender].limit += 1000;
        return conn.reply(m.chat, `✨ La moneda cayó en *${resultado}*, acabas de ganar *1000 🍪 Cookies*`, m);
    } else {
        global.database.users[m.sender].limit -= 500;
        return conn.reply(m.chat, `✨ La moneda cayó en *${resultado}*, acabas de perder *500 🍪 Cookies*`, m);
    }
}

// Ayuda y configuración del comando
handler.help = ['coinflip'];
handler.tags = ['game'];
handler.command = ['suerte', 'cf', 'flip', 'coinflip'];
handler.register = true;

// Exporta el manejador
export default handler;

// Función para convertir segundos en un formato legible
function segundosAHMS(segundos) {
    return `${segundos} segundos`;
}
