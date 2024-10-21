const annualReward = {
    cookie: 100, // Cantidad de Cookies que se otorgan
    coin: 2000,  // Cantidad de YukiCoins que se otorgan
    exp: 5000,   // Experiencia que se otorgan
    diamond: 50, // Cantidad de Diamantes que se otorgan
};

var handler = async (m, { conn }) => {
    // Verifica si el usuario ya reclamó la recompensa anual
    const lastClaim = global.db.data.users[m.sender].lastAnnualClaim || 0;
    const currentTime = new Date().getTime();
    const oneYear = 365 * 24 * 60 * 60 * 1000; // Tiempo en milisegundos para un año

    if (currentTime - lastClaim < oneYear) {
        return conn.reply(m.chat, `🕚 *Ya has reclamado tu recompensa anual. Vuelve en ${msToTime(oneYear - (currentTime - lastClaim))}*`, m);
    }

    // Asigna las recompensas al usuario
    global.db.data.users[m.sender].cookie += annualReward.cookie;
    global.db.data.users[m.sender].money += annualReward.coin;
    global.db.data.users[m.sender].diamond += annualReward.diamond;
    global.db.data.users[m.sender].exp += annualReward.exp;

    // Actualiza la fecha de la última reclamación
    global.db.data.users[m.sender].lastAnnualClaim = currentTime;

    // Mensaje de respuesta
    conn.reply(m.chat, `🎉 *Recompensa Anual Reclamada*

Recursos:
🍪 Cookies : *+${annualReward.cookie}*
💎 Diamantes : *+${annualReward.diamond}*
🪙 YukiCoins : *+${annualReward.coin}*
✨ Xp : *+${annualReward.exp}*`, m);
}

handler.help = ['annual', 'yearly']
handler.tags = ['rpg']
handler.command = ['annual', 'yearly']
handler.group = true;
handler.register = true

export default handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor(duration / (1000 * 60 * 60 * 24)); // Cálculo de días

    return `${days} Días ${hours < 10 ? '0' + hours : hours} Horas ${minutes < 10 ? '0' + minutes : minutes} Minutos ${seconds < 10 ? '0' + seconds : seconds} Segundos`;
}