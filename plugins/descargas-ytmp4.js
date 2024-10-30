import yts from 'yt-search';
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
    
if (!text) throw `*[🌹] Complementa tu peticion con algún enlace de YouTube.*\n_(Puedes hacer una búsqueda utilizando el comando ${usedPrefix}yts)_

 _🌷.- Ejemplo:_ *${usedPrefix + command}* https://youtu.be/sBKR6aUorzA?si=TmC01EGbXUx2DUca`;
    
await conn.sendMessage(m.chat, { react: { text: '🥀', key: m.key }})
const videoSearch = await yts(text);
if (!videoSearch.all.length) {
return global.errori;
}
const vid = videoSearch.all[0];
const videoUrl = vid.url;
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();

if (!delius.status) {
return global.errori
};
const downloadUrl = delius.data.download.url;
await conn.sendMessage(m.chat, { react: { text: '🌹', key: m.key }})
conn.sendMessage(m.chat, { video: { url: downloadUrl }}, {quoted: m})
};

handler.command = ['ytv', 'ytmp4']
handler.limit = 5;
export default handler