import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (user.birth) {
return conn.reply(m.chat, `${emoji2} Ya tienes una fecha establecida, si quieres borrar la fecha actual usa:\n> » ${usedPrefix}delbirth`, m);
}

if (!text) return conn.reply(m.chat, `${emoji} Debes ingresar una fecha válida para tu cumpleaños.\n\n> ✐ Ejemplo » *${usedPrefix + command} 01/01/2000* (dia/mes/año)`, m);

function validarFechaNacimiento(text) {
const opcionesFecha = [
/^\d{1,2}\/\d{1,2}\/\d{4}$/ // dd/mm/yyyy or m/d/yyyy
];

let esValida = opcionesFecha.some(regex => regex.test(text));
if (!esValida) return null;

if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text)) {
const [dia, mes, año] = text.split('/');
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${año}`;
}
return text;
}

let birth = validarFechaNacimiento(text);
if (!birth) {
return conn.reply(m.chat, `${emoji2} Recuerda elegir una fecha de nacimiento válida.\n> Ejemplo: ${usedPrefix + command} 01/12/2024`, m);
}

user.birth = birth;
return conn.reply(m.chat, `${emoji} Se ha establecido tu fecha de nacimiento como: *${user.birth}*!`, m);
};

handler.help = ['setbirth']
handler.tags = ['rg']
handler.command = ['setbirth', 'setcumpleaños']
export default handler;