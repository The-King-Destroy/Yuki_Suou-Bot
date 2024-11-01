import axios from 'axios';
import yts from 'yt-search';

var handler = async (m, {
 text, //texto luego del comando
 usedPrefix, //prefijo usado en el comando
 command, //comando usado
 conn //conn uso universal, al igual que el this
 }) => {
 
if (!text) return m.reply(`✧Ejemplo: ${usedPrefix+command} Joji`);
try {
let searchMusicDeezerFind = (await axios.get(`https://api.deezer.com/search?q=${encodeURIComponent(text)}`)).data;
if (searchMusicDeezerFind.length == 0) return m.reply(`No hay resultados de la api!`);

const artistName = searchMusicDeezerFind.data[0].artist.name;
const songTitle = searchMusicDeezerFind.data[0].title;

let ABC = await yts(`${artistName} ${songTitle}`);

let informationVideoYT = ABC.videos[0];

const deezerMessage = `_*DEZZER MUSIC*_

✧ titulo: ${songTitle}
✧ artista: ${artistName}
✧ album: ${searchMusicDeezerFind.data[0].album.title}
✧ duración: ${searchMusicDeezerFind.data[0].duration} Segundos
✧ explícito: ${searchMusicDeezerFind.data[0].explicit_lyrics ? 'Sip' : 'Nom'}
✧ link artista: ${searchMusicDeezerFind.data[0].artist.link}
✧ link album: ${searchMusicDeezerFind.data[0].album.tracklist.replace('api.', '')}
✧ link deezer: ${searchMusicDeezerFind.data[0].link}`;

await conn.sendMessage(m.chat, {
 image: {
  url: informationVideoYT.thumbnail 
  }, caption: deezerMessage });
await conn.sendMessage(m.chat, {
 audio: {
  url: searchMusicDeezerFind.data[0].preview 
  }, mimetype: 'audio/mpeg'},
   {quoted: m}).catch(e => { console.log(e) });
} catch (e) {
console.log(e);
m.reply("Error / Api Down");
}
}
handler.help = ["deezer"]
handler.tags = ["descargas"]
handler.command = ["deezer","deezermusic","dzr"]

export default handler```