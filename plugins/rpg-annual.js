const annualReward = {
    coin: 1000,
    exp: 5000,
    diamond: 50,
};

var handler = async (m, { conn }) => {
    const lastClaim = global.db.data.users[m.sender].lastAnnualClaim || 0;
    const currentTime = new Date().getTime();
    const oneYear = 365 * 24 * 60 * 60 * 1000; // Tiempo en milisegundos para un año

    if (currentTime - lastClaim < oneYear) {
        return conn.reply(m.chat, `🕚 *Ya has reclamado tu recompensa anual. Vuelve en ${msToTime(oneYear - (currentTime - lastClaim))}*`, m);
    }

    global.db.data.users[m.sender].coin += annualReward.coin;
    global.db.data.users[m.sender].diamond += annualReward.diamond;
    global.db.data.users[m.sender].exp += annualReward.exp;

    global.db.data.users[m.sender].lastAnnualClaim = currentTime;

    conn.reply(m.chat, `🎉 *Recompensa Anual Reclamada*

Recursos:
💸 ${moneda} : *+${annualReward.coin}*
💎 Diamantes : *+${annualReward.diamond}*
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
    days = Math.floor(duration / (1000 * 60 * 60 * 24));

    return `${days} Días ${hours < 10 ? '0' + hours : hours} Horas ${minutes < 10 ? '0' + minutes : minutes} Minutos ${seconds < 10 ? '0' + seconds : seconds} Segundos`;
}