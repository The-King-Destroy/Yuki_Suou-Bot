import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'

const LimitAud = 725 * 1024 * 1024;
const LimitVid = 425 * 1024 * 1024;

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (command == 'play' || command == 'mp3') {
    if (!text) return conn.reply(m.chat, `🌸 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`, m, rcanal);
    await m.react(rwait);
    const yt_play = await search(args.join(' '));
    const texto1 = `*_𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕_*

> 📚 *Título:*
» ${yt_play[0].title}
> 📆 *Publicado:* 
» ${yt_play[0].ago}
> 🕒 *Duración:* 
» ${secondString(yt_play[0].duration.seconds)}
> 👀 *Vistas:* 
» ${MilesNumber(yt_play[0].views)}
> 👤 *Autor:* 
» ${yt_play[0].author.name}
> 🔗 *Enlace:*
» ${yt_play[0].url}

> 📽️ *Su Audio se está enviando, espere un momento...*`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply: { title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', body: '<(✿◠‿◠)> 𝙔𝙪𝙠𝙞 𝙎𝙪𝙤𝙪🌸', sourceUrl: cn, thumbnail: logo7 } }, quoted: estilo
    });

    try {
      await m.react(rwait);
      const downloadData = await fetchHostBot(yt_play[0].url);
      if (downloadData) {
        await conn.sendMessage(m.chat, { audio: { url: downloadData.audio }, mimetype: 'audio/mpeg' }, { quoted: m });
        await m.react(done);
      }
    } catch (error) {
      console.log(error);
      await m.react(error);
    }
  }

  if (command == 'play2' || command == 'mp4') {
    if (!text) return conn.reply(m.chat, `🌸 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`, m, rcanal);
    await m.react(rwait);
    const yt_play = await search(args.join(' '));
    const texto1 = `*_𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕_*

> 📚 *Título:*
» ${yt_play[0].title}
> 📆 *Publicado:* 
» ${yt_play[0].ago}
> 🕒 *Duración:* 
» ${secondString(yt_play[0].duration.seconds)}
> 👀 *Vistas:* 
» ${MilesNumber(yt_play[0].views)}
> 👤 *Autor:* 
» ${yt_play[0].author.name}
> 🔗 *Enlace:*
» ${yt_play[0].url}

> 📽️ *Su Video se está enviando, espere un momento...*`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply: { title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', body: '<(✿◠‿◠)> 𝙔𝙪𝙠𝙞 𝙎𝙪𝙤𝙪🌸', sourceUrl: cn, thumbnail: logo7 } }, quoted: estilo
    });

    try {
      await m.react(rwait);
      const downloadData = await fetchHostBot(yt_play[0].url);
      if (downloadData) {
        await conn.sendMessage(m.chat, { video: { url: downloadData.video }, fileName: `${yt_play[0].title}.mp4`, caption: `🌷 Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
        await m.react(done);
      }
    } catch (error) {
      console.log(error);
      await m.react(error);
    }
  }

  if (command == 'play3' || command == 'playdoc') {
    if (!text) return conn.reply(m.chat, `🌸 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`, m, rcanal);
    await m.react(rwait);
    const yt_play = await search(args.join(' '));
    const texto1 = `*_𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕_*

> 📚 *Título:*
» ${yt_play[0].title}
> 📆 *Publicado:* 
» ${yt_play[0].ago}
> 🕒 *Duración:* 
» ${secondString(yt_play[0].duration.seconds)}
> 👀 *Vistas:* 
» ${MilesNumber(yt_play[0].views)}
> 👤 *Autor:* 
» ${yt_play[0].author.name}
> 🔗 *Enlace:*
» ${yt_play[0].url}

> 📽️ *Su Audio en documento se está enviando, espere un momento...*`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply: { title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', body: '<(✿◠‿◠)> 𝙔𝙪𝙠𝙞 𝙎𝙪𝙤𝙪🌸', sourceUrl: cn, thumbnail: logo7 } }, quoted: estilo
    });

    try {
      await m.react(rwait);
      const downloadData = await fetchHostBot(yt_play[0].url);
      if (downloadData) {
        await conn.sendMessage(m.chat, { document: { url: downloadData.audio }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
        await m.react(done);
      }
    } catch (error) {
      console.log(error);
      await m.react(error);
    }
  }

  if (command == 'play4' || command == 'playdoc2') {
    if (!text) return conn.reply(m.chat, `🌸 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`, m, rcanal);
    await m.react(rwait);
    const yt_play = await search(args.join(' '));
    const texto1 = `*_𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕_*

> 📚 *Título:*
» ${yt_play[0].title}
> 📆 *Publicado:* 
» ${yt_play[0].ago}
> 🕒 *Duración:* 
» ${secondString(yt_play[0].duration.seconds)}
> 👀 *Vistas:* 
» ${MilesNumber(yt_play[0].views)}
> 👤 *Autor:* 
» ${yt_play[0].author.name}
> 🔗 *Enlace:*
» ${yt_play[0].url}

> 📽️ *Su video en documento se está enviando, espere un momento...*`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply: { title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', body: '<(✿◠‿◠)> 𝙔𝙪𝙠𝙞 𝙎𝙪𝙤𝙪🌸', sourceUrl: cn, thumbnail: logo7 } }, quoted: estilo
    });

    try {
      await m.react(rwait);
      const downloadData = await fetchHostBot(yt_play[0].url);
      if (downloadData) {
        await conn.sendMessage(m.chat, { document: { url: downloadData.video }, fileName: `${yt_play[0].title}.mp4`, caption: `${wm}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
        await m.react(done);
      }
    } catch (error) {
      console.log(error);
      await m.react(error);
    }
  }
}

handler.help = ['play', 'play2', 'play3', 'play4', 'playdoc'];
handler.tags = ['descargas'];
handler.command = ['play', 'play2', 'play3', 'play4', 'mp3', 'mp4', 'playdoc', 'playdoc2']
handler.group = true;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

async function fetchHostBot(url) {
  const apiKey = 'Tetas';
  const apiUrl = `https://api.host-bot.store/api/dl/yt2?url=${encodeURIComponent(url)}&apikey=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.status === 'success') {
    return data.result;
  } else {
    throw new Error("No se pudo obtener la descarga desde Host-Bot");
  }
}

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}

async function getFileSize(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : 0;
  } catch (error) {
    console.error("Error al obtener el tamaño del archivo", error);
    return 0;
  }
}
