import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

const owners = ['584120346669@s.whatsapp.net', 'otroOwnerID@s.whatsapp.net']; // Agrega aquí los IDs de los propietarios

var handler = async (m, { conn }) => {
    // Verificamos si el usuario que ejecuta el comando es un owner
    if (!owners.includes(m.sender)) {
        return m.reply('⚠️ Solo los propietarios del bot pueden usar este comando.');
    }

    // Obtenemos la información del usuario mencionado o del que envió el mensaje
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://example.com/default-profile.png'); // Imagen predeterminada
    let { premium, level, cookies, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[who];
    let username = conn.getName(who);

    // Formato del perfil épico
    let profileMessage = `
𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐄́𝐏𝐈𝐂𝐎
👤 *𝐍𝐨𝐦𝐛𝐫𝐞:* ${username}
💼 *𝐓𝐚𝐠:* @${who.replace(/@.+/, '')}
🧾 *𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨:* ${registered ? '✅' : '❌'}
🎂 *𝐄𝐝𝐚:* ${age ? age + ' años' : 'No especificada'}
🕒 *𝐅𝐞𝐜𝐡𝐚 𝐝𝐞 𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐨:* ${regTime ? new Date(regTime).toLocaleDateString() : 'No registrado'}
⏳ *𝐋𝐢𝐦𝐢𝐭𝐞 𝐝𝐞 𝐂𝐨𝐨𝐤𝐢𝐞𝐬:* ${cookies}
🌟 *𝐋𝐨𝐭𝐞 𝐝𝐞 𝐄𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐢𝐚:* ${exp}
🔝 *𝐑𝐚𝐧𝐠𝐨:* ${role}
💖 *𝐏𝐫𝐞𝐦𝐢𝐮𝐦:* ${premium ? '✅' : '❌'}

👑 *𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒* 👑
💰 *𝐍𝐔𝐌𝐄𝐑𝐎 𝐃𝐄 𝐂𝐎𝐎𝐊𝐈𝐄𝐒:* ${cookies}
📈 *𝐋𝐞𝐯𝐞𝐥:* ${level}
✨ *𝐄𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐢𝐚:* ${exp} puntos

🌈 *¡𝐄𝐫𝐞𝐬 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨 𝐝𝐞𝐬𝐭𝐚𝐜𝐚𝐝𝐨!*
`.trim();

    // Enviar el perfil al chat
    conn.sendMessage(m.chat, { image: { url: pp }, caption: profileMessage, mentions: [who] }, { quoted: m });
}

handler.help = ['epicprofile', 'perfilépico'];
handler.tags = ['owner'];
handler.command = /^(epicprofile|perfilépico)$/i;
handler.owner = true; // Solo los owner pueden usar este comando
handler.register = true;
handler.group = true;

export default handler;
