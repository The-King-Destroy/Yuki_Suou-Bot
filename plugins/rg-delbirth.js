import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (!user.birth) {
return conn.reply(m.chat, `${emoji2} No tienes una fecha de nacimiento establecida que se pueda eliminar.`, m);
}

user.birth = '';

return conn.reply(m.chat, `${emoji} Tu fecha de nacimiento ha sido eliminada.`, m);
};

handler.help = ['delbirth']
handler.tags = ['rg']
handler.command = ['delbirth']
export default handler;