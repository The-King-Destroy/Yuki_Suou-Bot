const we = 5000;
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Tiempo de cooldown fijo: 1 semana (en milisegundos)
    const cooldown = 604800000;

    if (new Date - user.weekly < cooldown) throw `⏱️ ¡Ya reclamaste tu regalo semanal! Vuelve en:\n *${msToTime((user.weekly + cooldown) - new Date())}*`;
  
    let cookieReward = pickRandom([1, 2, 3]);
    let expReward = pickRandom([100, 200, 300]);

    user.coin += we;
    user.cookies = (user.cookies || 0) + cookieReward;
    user.exp = (user.exp || 0) + expReward;

    m.reply(`
🎁 ¡Ha pasado una semana! ¡Disfruta de tu regalo semanal! 🐢

🪙 *YukiCoins* : +${we.toLocaleString()}
🍪 *Cookies* : +${cookieReward}
✨ *Experiencia* : +${expReward}`);

    user.weekly = new Date * 1; // Actualizar la fecha de reclamación
}

handler.help = ['weekly'];
handler.tags = ['econ'];
handler.command = ['semanal', 'weekly']; 

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24), 
        days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    days = (days > 0) ? days : 0;

    return days + ` días ` + hours + ` horas ` + minutes + ` minutos`;
}
