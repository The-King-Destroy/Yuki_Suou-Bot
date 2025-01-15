import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender];

if (!user.description) {
return conn.reply(m.chat, `🍭 No tienes una descripción establecida que se pueda eliminar.`, m);
}

user.description = '';

return conn.reply(m.chat, `🍬 Tu descripción ha sido eliminada.`, m);
};

handler.help = ['deldescription']
handler.tags = ['rg']
handler.command = ['deldescription', 'deldesc']
export default handler;