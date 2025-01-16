import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🍬 Por favor, ingresa un enlace de TikTok.', m);

  const tiktokAPI = `https://apis-starlights-team.koyeb.app/starlight/tiktok2?url=${text}`;

  try {
    await m.react(rwait);
    const res = await fetch(tiktokAPI);
    const json = await res.json();

    if (!json || !json.video) return conn.reply(m.chat, '🍭 No se pudo descargar el video. Verifica que la URL sea correcta.', m);

    await conn.sendMessage(m.chat, { video: { url: json.video }, caption: '🍬 Aqui tienes ฅ^•ﻌ•^ฅ.' }, { quoted: m });
   await m.react(done);

  } catch (e) {
    conn.reply(m.chat, '⚠️ Ocurrió un error al descargar el video.', m);
    await m.react(error);
    console.log(e);
  }
};

handler.help = ['tiktok', 'tt'];
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.coin = 1;
handler.register = true;

export default handler;