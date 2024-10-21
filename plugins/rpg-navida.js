const baseCoinReward = 100000; // Aumento en la recompensa base de monedas

var handler = async (m, { conn }) => {
    if (!m.isGroup) return m.reply("❌ Este comando solo puede usarse en grupos.");

    let user = global.db.data.users[m.sender] || {};
    user.christmas = user.christmas || 0; // Asegurarse de que user.christmas esté definido

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isDecember = currentDate.getMonth() === 11; // Diciembre es el mes 11 (0-indexado)

    const cooldown = 365 * 24 * 60 * 60 * 1000; // 1 año en milisegundos
    let timeRemaining = user.christmas + cooldown - currentDate.getTime();

    // Verificar si el usuario puede reclamar el regalo solo en diciembre
    if (!isDecember) {
        return m.reply(`🎄 ¡Solo puedes reclamar tu regalo navideño en diciembre! Vuelve en diciembre de ${currentYear}.`);
    }

    if (timeRemaining > 0) {
        return m.reply(`⏱️ ¡Ya reclamaste tu regalo navideño este año! Vuelve en:\n *${msToTime(timeRemaining)}*`);
    }

    // Aumento en las recompensas
    let coinReward = pickRandom([20000, 30000, 40000, baseCoinReward]);
    let cookieReward = pickRandom([5, 10, 15, 20]);
    let expReward = pickRandom([2000, 3000, 4000, 5000]);
    let giftReward = pickRandom([2, 3, 4, 5]); // Regalos navideños

    user.coin = (user.coin || 0) + coinReward;
    user.cookies = (user.cookies || 0) + cookieReward;
    user.exp = (user.exp || 0) + expReward;
    user.gifts = (user.gifts || 0) + giftReward; // Añadir regalos navideños

    m.reply(`
\`\`\`🎄 ¡Feliz Navidad! ¡Disfruta de tu regalo navideño! 🎁\`\`\`

🪙 *YukiCoins* : +${coinReward.toLocaleString()}
🍪 *Cookies* : +${cookieReward}
✨ *Experiencia* : +${expReward}
🎁 *Regalos Navideños* : +${giftReward}`);

    user.christmas = new Date().getTime(); // Actualizar la fecha de reclamación
}

handler.help = ['navidad', 'christmas'];
handler.tags = ['rpg'];
handler.command = ['navidad', 'christmas'];

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