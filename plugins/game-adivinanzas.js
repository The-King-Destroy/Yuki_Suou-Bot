import fs from 'fs';
import similarity from 'similarity';

const timeout = 60000; // Tiempo máximo para responder
const poin = 10; // Puntos que se ganan
const threshold = 0.72; // Umbral de similitud

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

const handler = async (m, { conn, command }) => {
  const chatId = m.chat;

  // Inicializa la estructura para el juego en el chat
  if (!conn.tekateki) conn.tekateki = {};
  if (!conn.tekateki[chatId]) conn.tekateki[chatId] = {};

  let json;
  let caption;

  if (command === 'acertijo') {
    json = tekatekiData.acertijos[Math.floor(Math.random() * tekatekiData.acertijos.length)];
    caption = `ⷮ🌟 *ACERTIJOS*\n✨️ *${json.question}*\n⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos\n🎁 *Premio:* *+${poin}* Yenes 💴`;
  } else if (command === 'paises') {
    json = tekatekiData.paises[Math.floor(Math.random() * tekatekiData.paises.length)];
    caption = `ⷮ🌏 *\`ADIVINA EL PAIS\`* 🌎\nque pais es: *${json.question}*\n⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos\n🎁 *Premio:* *+${poin}* Yenes 💴`;
  } else if (command === 'peliculas') {
    json = tekatekiData.peliculas[Math.floor(Math.random() * tekatekiData.peliculas.length)];
    caption = `ⷮ🐈‍⬛ *\`ADIVINA LA PELICULA\`* 🐈‍⬛\n*${json.question}*\n⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos\n🎁 *Premio:* *+${poin}* Yenes 💴`;
  } else {
    return m.reply('Comando no reconocido. Usa uno de los siguientes: acertijo, paises, peliculas.');
  }

  const message = await conn.reply(m.chat, caption, m);
  const timeoutId = setTimeout(() => {
    conn.reply(m.chat, `⌛ Se acabó el tiempo!\n*Respuesta:* ${json.response}`, message);
    delete conn.tekateki[chatId]; // Eliminar el juego después del tiempo
  }, timeout);

  conn.tekateki[chatId].json = json;
  conn.tekateki[chatId].timeoutId = timeoutId;
};

handler.before = async function (m) {
  const chatId = m.chat;

  // Verifica si hay un juego en curso
  if (!conn.tekateki || !(chatId in conn.tekateki) || !conn.tekateki[chatId].json) {
    return; // No se envía ningún mensaje si no hay juego
  }

  const json = conn.tekateki[chatId].json;
  const userAnswer = m.text.toLowerCase().trim();
  const correctAnswer = json.response.toLowerCase().trim();

  if (userAnswer === correctAnswer) {
    global.db.data.users[m.sender].yenes = (global.db.data.users[m.sender].yenes || 0) + poin;
    m.reply(`✅ *Respuesta correcta!*\n+${poin} Yenes 💴`);
    clearTimeout(conn.tekateki[chatId].timeoutId);
    delete conn.tekateki[chatId];
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
