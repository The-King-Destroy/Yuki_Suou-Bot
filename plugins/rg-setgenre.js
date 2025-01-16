import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (user.genre) {
return conn.reply(m.chat, `🍬 Ya tienes un género establecido, si quieres borrar el género actual usa:\n> » ${usedPrefix}delgenre`, m);
}

if (!text) return conn.reply(m.chat, `🍬 Debes ingresar un género válido.\n> Ejemplo » *${usedPrefix + command} hombre*`, m);

function asignarGenre(text) {
let genre;
switch (text.toLowerCase()) {
case "hombre":
genre = "Hombre";
break;
case "mujer":
genre = "Mujer";
break;
default:
return null;
}
return genre;
}

let genre = asignarGenre(text);
if (!genre) {
return conn.reply(m.chat, `🍭 Recuerda elegir un género válido.\n> Ejemplo: ${usedPrefix + command} hombre`, m);
}

user.genre = genre;

return conn.reply(m.chat, `🍬 Se ha establecido tu género como: *${user.genre}*!`, m);
};

handler.help = ['setgenre']
handler.tags = ['rg']
handler.command = ['setgenero', 'setgenre']
export default handler;
