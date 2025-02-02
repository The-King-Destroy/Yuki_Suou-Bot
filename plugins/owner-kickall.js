/* 
- Kickall By Angel-OFC  
- elimina todos de un grupo con un comando 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import axios from 'axios';

let handler = async (m, { conn, text, participants }) => {

    const groupAdmins = participants.filter(p => p.admin);
    const botId = conn.user.jid;
    const groupOwner = groupAdmins.find(p => p.isAdmin)?.id;
    const groupNoAdmins = participants.filter(p => p.id !== botId && p.id !== groupOwner && !p.admin).map(p => p.id);

    if (groupNoAdmins.length === 0) throw '*🍭 No hay usuarios para eliminar.*'; 

    for (let userId of groupNoAdmins) {
        await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    m.reply('*🍬 Eliminación Exitosa.*');
}

handler.help = ['kickall']
handler.tags = ['group'];
handler.command = /^(kickall)$/i;
handler.group = true;
handler.botAdmin = true;
handler.suittag;

export default handler;
