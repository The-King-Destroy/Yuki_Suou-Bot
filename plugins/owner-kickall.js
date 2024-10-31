import fs from 'fs/promises';

const botName = '𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉'; // Nombre predeterminado del bot
const authorizedNumber = '584120346669'; // Número autorizado
let deletionLimit = 10; // Límite de eliminaciones, puedes cambiar este valor

let handler = async (m, { conn, args, participants }) => {
    if (!global.db.data.settings[conn.user.jid].restrict) throw '*⚠️ EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*';
    
    // Verificación del número autorizado
    if (m.sender !== authorizedNumber) throw '*⚠️ No tienes permiso para usar este comando.*';

    const groupNoAdmins = participants.filter(p => !p.admin && p.id);
    const listUsers = groupNoAdmins.slice(0, deletionLimit).map((v) => v.id).join(','); // Limitar la cantidad de usuarios a eliminar

    let pesan = args.join` `;
    let oi = `${pesan}`;
    let text = `「 *𝙲𝚕𝚎𝚊𝚗𝚎𝚍 𝙱𝚢 - ${botName}* 」`.trim();

    let txt = text;
    let txt2 = `*[🌹] Eliminación Exitosa.*`;

    let mediaFolder = './src/';
    let fileName = 'user.jpg';  
    let filePath = mediaFolder + fileName;

    try {
        await fs.access(filePath);
        await conn.updateProfilePicture(m.chat, await fs.readFile(filePath));
    } catch (error) {
        throw '*⚠️️ La imagen especificada no existe en la carpeta media.*';
    }

    try {
        conn.groupUpdateSubject(m.chat, pesan);
    } catch (e) {
        throw '*25 caracteres maximo..*';
    }

    await conn.sendMessage(m.chat, { image: { url: filePath }, caption: txt, mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });

    for (let userId of listUsers.split(',')) {
        await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
    }
    m.reply(txt2);
}

// Permite cambiar el límite de eliminación
handler.changeLimit = (newLimit) => {
    deletionLimit = newLimit;
};

handler.help = ['kickall', '-'].map(v => 'o' + v + ' @user');
handler.tags = ['owner'];
handler.command = /^(kickall)$/i;

handler.owner = true;
handler.group = true;
handler.botAdmin = true;

export default handler;