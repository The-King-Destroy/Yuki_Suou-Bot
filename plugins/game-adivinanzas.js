import fs from 'fs';
import path from 'path';
import similarity from 'similarity';

const timeout = 60000; // Tiempo en milisegundos
const poin = 10; // Cantidad de Yenes que se ganan
const threshold = 0.72; // Umbral de similitud

// Función para cargar datos desde archivos JSON
const loadJSON = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    console.error(`Error al cargar el archivo ${filePath}:`, error);
    return []; // Retorna un arreglo vacío en caso de error
  }
};

// Rutas de los archivos JSON
const tekatekiData = {
  acertijos: loadJSON('./src/game/acertijo.json'),
  paises: loadJSON('./src/game/paises.json'),
  peliculas: loadJSON('./src/game/peliculas.json'),
};

const handler = async (m, { conn, usedPrefix, command }) => {
  conn.tekateki = conn.tekateki || {};
  const id = m.chat;

  // Verifica si ya hay un juego en curso
  if (id in conn.tekateki) {
    return conn.reply(m.chat, 'Todavía hay alguien jugando aquí, espera hasta que termine.', conn.tekateki[id][0]);
  }

  let json;
  let caption;

  // Selecciona un juego basado en el comando
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

  // Iniciar el juego
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

  // Validar si el mensaje es una respuesta a un juego anterior
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return;

  this.tekateki = this.tekateki || {};
  if (!(id in this.tekateki)) return m.reply('✨️ Ese acertijo ya ha terminado!');

  if (m.quoted.id === this.tekateki[id][0].id) {
    const json = this.tekateki[id][1]; // Obtén la pregunta actual
    if (!json || !json.response) {
      return m.reply('Error: Respuesta no válida.');
    }

    // Comprueba la respuesta del usuario
    const userAnswer = m.text.toLowerCase().trim();
    const correctAnswer = json.response.toLowerCase().trim();

    if (userAnswer === correctAnswer) {
      global.db.data.users[m.sender].yenes = (global.db.data.users[m.sender].yenes || 0) + this.tekateki[id][2]; // Acumular Yenes
      m.reply(`✅ *Respuesta correcta!*\n+${this.tekateki[id][2]} Yenes 💴`);
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(userAnswer, correctAnswer) >= threshold) {
      m.reply(`Casi lo logras! La respuesta correcta era: *${json.response}*`);
    } else {
      m.reply('Respuesta incorrecta! Intenta de nuevo.');
    }
  }
};

handler.help = ['acertijo', 'paises', 'peliculas'];
handler.tags = ['game'];
handler.command = /^(acertijo|paises|peliculas)$/i;

export default handler;
