import {toAudio} from '../lib/converter.js';

const handler = async (m, {conn, usedPrefix, command}) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';
  
  if (!/video|audio/.test(mime)) {
    return conn.reply(m.chat, `${emoji} Por favor, responda al video o nota de voz que desee convertir a Audio/MP3.`, m);
  }
  
  const media = await q.download();
  if (!media) {
    return conn.reply(m.chat, `${msm} Ocurrio un error al descargar su video.`, m);
  }
  
  const audio = await toAudio(media, 'mp4');
  if (!audio.data) {
    return conn.reply(m.chat, `${msm} Ocurrio un error al convertir su nota de voz a Audio/MP3.`, m);
  }
  
  conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg'}, {quoted: m});
};

handler.help = ['tomp3', 'toaudio'];
handler.command = ['tomp3', 'toaudio'];
handler.group = true;
handler.register = true;

export default handler;