import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (user.description) {
return conn.reply(m.chat, `${emoji2} Ya tienes una descripción establecida, si quieres borrar la descripcion actual usa:\n> » ${usedPrefix}deldescription`, m);
}

if (!text) return conn.reply(m.chat, `${emoji}︎ Debes especificar una descripcion valida para tu perfil.\n\n> ✐ Ejemplo » *${usedPrefix + command} Hola, uso WhatsApp!*`, m);

user.description = text;

return conn.reply(m.chat, `${emoji} Se ha establecido tu descripcion.\n\n> *${user.description}*`, m);
};

handler.help = ['setdescription']
handler.tags = ['rg']
handler.command = ['setdescription', 'setdesc']
export default handler;