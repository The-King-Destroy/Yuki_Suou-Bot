//Codígo creado por Destroy wa.me/584120346669

let handler = async (m, { conn, command, text }) => {
    let userId;

    // Verifica si hay un mensaje al que se está respondiendo
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender; // Obtiene el remitente del mensaje citado
    } else if (text) {
        userId = conn.parseMention(text)[0]; // Obtiene el usuario mencionado en el texto
    } else {
        return m.reply("Por favor, menciona a alguien o responde a su mensaje."); // Mensaje de error
    }

    // Genera un porcentaje de odio
    let hatePercentage = Math.floor(Math.random() * 100);
    
    // Crea el mensaje de odio
    let hateMessage = `
══════ •⊰✧⊱• ══════
𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐃𝐎𝐑 𝐃𝐄 𝐎𝐃𝐈𝐎 😡
El odio entre @${userId.split('@')[0]} y tú es de: ${hatePercentage}%
══════ •⊰✧⊱• ══════`.trim();

    // Responde al mensaje original mencionando al usuario
    await conn.reply(m.chat, hateMessage, m, { mentions: [userId] });
};

handler.command = /^(odio)$/i;
export default handler;