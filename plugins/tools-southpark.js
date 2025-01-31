/* País Info By WillZek 
- https://github.com/WillZek 
- https://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13W
*/

import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) return m.reply('🍬 Ingresa Un Nombre De Un Pais');

try {
let api = `https://delirius-apiofc.vercel.app/tools/flaginfo?query=${text}`;

let response = await fetch(api);
let json = await response.json();
let datas = json.data;

let park = `*Información De:* ${text}\n\n*Nombre Oficial:* ${datas.officialName}\n*Organización:* ${datas.memberOf}\n*Capital:* ${datas.capitalCity}\n*Continente:* ${datas.continent}\n*Población:* ${datas.population}\n*Prefijo:* ${datas.callingCode}\n*Moneda:* ${datas.currency}\n*Descripción:* ${datas.description}`;

let img = datas.image;

conn.sendMessage(m.chat, { image: { url: img }, caption: park }, { quoted: fkontak });

} catch (e) {
m.reply(`*Error:* ${e.message}`);
m.react('✖️');
  }
};

handler.command = ['paisinfo', 'flag'];

export default handler;
