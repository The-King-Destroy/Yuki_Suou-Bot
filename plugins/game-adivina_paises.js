
import fs from 'fs';

const timeout = 60000;
const yenes = 10;

const handler = async (m, { conn, usedPrefix }) => {
  conn.tekateki = conn.tekateki || {};
  const id = m.chat;

  if (id in conn.tekateki) {
    conn.reply(m.chat, 'Todavía hay alguien jugando aquí, espera hasta que termine', conn.tekateki[id][0]);
    throw false;
  }

  const tekateki = JSON.parse(fs.readFileSync('./src/game/paises.json'));
  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const clue = json.response.replace(/[A-Za-z]/g, '_');

  const caption = `
ⷮ🌏 *\`ADIVINA EL PAIS\`* 🌎
¿qué país es: *${json.question}*?

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos
🎁 *Premio:* *+${yenes}* Yenes 💴`.trim();

  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    yenes,
    setTimeout(async () => {
      if (conn.tekateki[id]) {
        await conn.reply(m.chat, `⌛ Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0]);
        delete conn.tekateki[id];
      }
    }, timeout)
  ];

  const handleResponse = async (message) => {
    if (conn.tekateki[id]) {
      const userResponse = message.body.toLowerCase();
      const correctAnswer = json.response.toLowerCase();

      if (userResponse === correctAnswer) {
        await conn.reply(m.chat, `🎉 ¡Correcto! El país es: *${json.response}*`, conn.tekateki[id][0]);
        delete conn.tekateki[id];
      } else {
        await conn.reply(m.chat, `❌ Incorrecto. Intenta de nuevo.`, conn.tekateki[id][0]);
      }
    }
  };

  conn.on('chat-update', (chat) => {
    if (chat.messages) {
      chat.messages.all().forEach((msg) => {
        if (msg.key.remoteJid === id && msg.message && msg.message.conversation) {
          handleResponse(msg.message);
        }
      });
    }
  });
};

handler.help = ['paises'];
handler.tags = ['game'];
handler.command = /^(paises)$/i;

export default handler;
