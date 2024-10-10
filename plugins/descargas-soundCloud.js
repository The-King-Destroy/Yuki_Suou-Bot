// By Jtxs 🐢
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, '*Ingresa un enlace de SoundCloud*', m, fake);
await m.react('🕓');
 
try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${args[0]}`);
let json = await api.json();
let { title, quality, image, link } = json

let txt = `*Titulo* : ${title}
*Calidad* : ${quality}
`;
await conn.sendFile(m.chat, image, 'soundcloud.jpg', txt, m)

await m.react('✅');
await conn.sendMessage(m.chat, { audio: { url: link }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });

} catch {
conn.reply('error :v')    
}
}
    
handler.help = ['soundclouddl *<link>*']
handler.corazones = 3
handler.tags = ['descargas']
handler.command = ['soundclouddl'];

export default handler;
