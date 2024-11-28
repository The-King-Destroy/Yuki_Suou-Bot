import fs from 'fs';
import path from 'path';
import similarity from 'similarity';

const timeout = 60000; // Tiempo en milisegundos
const poin = 10; // Cantidad de Yenes que se ganan
const threshold = 0.72; // Umbral de similitud

// Rutas de los archivos JSON
const tekatekiData = {
  acertijos: JSON.parse(fs.readFileSync('./src/game/acertijo.json')),
  paises: JSON.parse(fs.readFileSync('./src/game/paises.json')),
  peliculas: JSON.parse(fs.readFileSync('./src/game/peliculas.json')),
};

const handler = async (m, { conn, usedPrefix, command }) => {
  conn.tekateki = conn.tekateki || {};
  const id = m.chat;

  if (id in conn.tekateki) {
    conn.reply(m.chat, 'Todavía hay alguien jugando aquí, espera hasta que termine.', conn.tekateki[id][0]);
    throw false;
  }

  let json;
  let caption;

  switch (command) {
    case 'acertijo':
      json = tekatekiData.acertijos[Math.floor(Math.random() * tekatekiData.acertijos.length)];
      caption = `
ⷮ🌟 *ACERTIJOS*
✨️ *${json.question}*

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos
🎁 *Premio:* *+${poin}* Yenes 💴`.trim();
      break;
    case 'paises':
      json = tekatekiData.paises[Math.floor(Math.random() * tekatekiData.paises.length)];
      caption = `
ⷮ🌏 *\`ADIVINA EL PAIS\`* 🌎
que pais es: *${json.question}*

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos
🎁 *Premio:* *+${poin}* Yenes 💴`.trim();
      break;
    case 'peliculas':
      json = tekatekiData.peliculas[Math.floor(Math.random() * tekatekiData.peliculas.length)];
      caption = `
ⷮ🐈‍⬛ *\`ADIVINA LA PELICULA\`* 🐈‍⬛
*${json.question}*

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos
🎁 *Premio:* *+${poin}* Yenes 💴`.trim();
      break;
    default:
      return;
  }

  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `⌛ Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)
  ];
};

handler.before = async function (m) {
  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;
  
  this.tekateki = this.tekateki || {};
  if (!(id in this.tekateki)) return m.reply('✨️ Ese acertijo ya ha terminado!');

  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));
    if (m.text.toLowerCase() === json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].yenes = (global.db.data.users[m.sender].yenes || 0) + this.tekateki[id][2]; // Acumular Yenes
      m.reply(`✅ *Respuesta correcta!*\n+${this.tekateki[id][2]} Yenes 💴`);
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
      m.reply(`Casi lo logras!`);
    } else {
      m.reply('Respuesta incorrecta!');
    }
  }
  return !0;
};

handler.help = ['acertijo', 'paises', 'peliculas'];
handler.tags = ['game'];
handler.command = /^(acertijo|paises|peliculas)$/i;

export default handler;
