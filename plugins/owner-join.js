let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
    if (!text) return m.reply('🍬 Debes enviar una invitacion para que *Yuki-Bot* se una al grupo.');

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply('🍨 Enlace de invitación no válido.');

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`🍬 Me he unido exitosamente al grupo.`))
            .catch(err => m.reply(`⚠️ Error al unirme al grupo.`));
    } else {
        let message = `🍭 Invitación a un grupo:\n${text}\n\nPor: @${m.sender.split('@')[0]}`;
        await conn.sendMessage('584120346669' + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`🍬 El link del grupo ha sido enviado, gracias por tu invitacion *ฅ^•ﻌ•^ฅ*`);
    }
};

handler.help = ['invite'];
handler.tags = ['owner', 'tools'];
handler.command = ['invite', 'join'];

export default handler;