//Codígo creado por Destroy wa.me/584120346669

let handler = async (m, { conn, command, text }) => {
    let userId;

    // Verifica si hay un mensaje al que se está respondiendo o un usuario mencionado
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender; // Obtiene el remitente del mensaje citado
    } else if (text) {
        userId = conn.parseMention(text)[0]; // Obtiene el usuario mencionado en el texto
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        userId = m.mentionedJid[0]; // Obtiene el primer usuario mencionado
    } else {
        userId = m.sender; // Si no se menciona a nadie, se usa el remitente del mensaje
    }

    // Genera un porcentaje de "horny"
    let hornyPercentage = Math.floor(Math.random() * 100);

    // Crea el mensaje de "horny"
    let hornyMessage = `
══════ •⊰✧⊱• ══════
𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐃𝐎𝐑 𝐃𝐄 𝐇𝐎𝐑𝐍𝐘 🥵
El nivel de horny de @${userId.split('@')[0]} es: ${hornyPercentage}%
══════ •⊰✧⊱• ══════`.trim();

    // Responde al mensaje original mencionando al usuario
    await conn.reply(m.chat, hornyMessage, m, { mentions: [userId] });
};

handler.help = ['horny'];
handler.tags = ['fun'];
handler.command = /^(cekhorny|horny)$/i;
handler.group = true;

export default handler;