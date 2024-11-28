import fs from 'fs';
const timeout = 60000;
const yenes = 10;
const handler = async (m, {conn, usedPrefix}) => {
  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;
  if (id in conn.tekateki) {
    conn.reply(m.chat, 'Todavía hay alguien jugando aquí, espera hasta que termine', conn.tekateki[id][0]);
    throw false;
  }
  const tekateki = JSON.parse(fs.readFileSync(`./src/game/peliculas.json`));
  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');
  const caption = `
ⷮ🐈‍⬛ *\`ADIVINA LA PELICULA\`* 🐈‍⬛
*${json.question}*

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos
🎁 *Premio:* *+${yenes}* Yenes 💴`.trim();
  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m, fake), json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `⌛ Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)];
};
handler.help = ['pelis'];
handler.tags = ['game'];
handler.command = /^(pelis)$/i;
export default handler;