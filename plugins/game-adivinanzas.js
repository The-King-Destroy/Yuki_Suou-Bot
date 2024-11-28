import fs from 'fs';
import similarity from 'similarity';

const timeout = 60000;
const poin = 10;
const threshold = 0.72;

const loadJSON = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    console.error(`Error al cargar el archivo ${filePath}:`, error);
    return [];
  }
};

const tekatekiData = {
  acertijos: loadJSON('./src/game/acertijo.json'),
  paises: loadJSON('./src/game/paises.json'),
  peliculas: loadJSON('./src/game/peliculas.json'),
};

const handler = async (m, { conn, usedPrefix, command }) => {
  conn.tekateki = conn.tekateki || {};
  const id = m.chat;

  if (id in conn.tekateki) {
    return conn.reply(m.chat, 'Todavía hay alguien jugando aquí, espera hasta que termine.', conn.tekateki[id][0]);
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
      return m.reply('Comando no reconocido. Usa uno de los siguientes: acertijo, paises, peliculas.');
  }

  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) {
        await conn.reply(m.chat, `⌛ Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0]);
      }
      delete conn.tekateki[id];
    }, timeout)
  ];
};

handler.before = async function (m) {
  const id = m.chat;

  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) {
    return;
  }

  this.tekateki = this.tekateki || {};
  if (!(id in this.tekateki)) {
    return m.reply('✨️ Ese acertijo ya ha terminado!');
  }

  const json = this.tekateki[id][1];
  if (!json || !json.response) {
    return m.reply('Error: Respuesta no válida.');
  }

  const userAnswer = m.text.toLowerCase().trim();
  const correctAnswer = json.response.toLowerCase().trim();

  if (userAnswer === correctAnswer) {
    global.db.data.users[m.sender].yenes = (global.db.data.users[m.sender].yenes || 0) + this.tekateki[id][2];
    m.reply(`✅ *Respuesta correcta!*\n+${this.tekateki[id][2]} Yenes 💴`);
    clearTimeout(this.tekateki[id][3]);
    delete this.tekateki[id];
  } else if (similarity(userAnswer, correctAnswer) >= threshold) {
    m.reply(`Casi lo logras! La respuesta correcta era: *${json.response}*`);
  } else {
    m.reply('Respuesta incorrecta! Intenta de nuevo.');
  }
};

handler.help = ['acertijo', 'paises', 'peliculas'];
handler.tags = ['game'];
handler.command = /^(acertijo|paises|peliculas)$/i;

export default handler;
