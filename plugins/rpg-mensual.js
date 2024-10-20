const baseCoinReward = 20000;

var handler = async (m, { conn }) => {
    if (!m.isGroup) return m.reply("❌ Este comando solo puede usarse en grupos.");

    let user = global.db.data.users[m.sender] || {};
    user.monthly = user.monthly || 0; // Asegurarse de que user.monthly esté definido

    const cooldown = 604800000 * 4; // 4 semanas

    let timeRemaining = user.monthly + cooldown - new Date();

    if (timeRemaining > 0) {
        return m.reply(`⏱️ ¡Ya reclamaste tu regalo mensual! Vuelve en:\n *${msToTime(timeRemaining)}*`);
    }

    let coinReward = pickRandom([5000, 10000, 15000, 20000, baseCoinReward]);
    let cookieReward = pickRandom([1, 2, 3, 4, 5]);
    let expReward = pickRandom([500, 1000, 1500, 2000, 2500]);
    let diamondReward = pickRandom([1, 2, 3]);

    user.coin = (user.coin || 0) + coinReward;
    user.cookies = (user.cookies || 0) + cookieReward;
    user.exp = (user.exp || 0) + expReward;
    user.diamonds = (user.diamonds || 0) + diamondReward;

    m.reply(`
\`\`\`🎁 ¡Ha pasado un mes! ¡Disfruta de tu regalo mensual! 🐢\`\`\`

🪙 *YukiCoins* : +${coinReward.toLocaleString()}
🍪 *Cookies* : +${cookieReward}
✨ *Experiencia* : +${expReward}
💎 *Diamantes* : +${diamondReward}`);

    user.monthly = new Date * 1; // Actualizar la fecha de reclamación
}

handler.help = ['monthly'];
handler.tags = ['rpg'];
handler.command = ['mensual', 'monthly'];

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days} días ${hours} horas ${minutes} minutos`;
}
