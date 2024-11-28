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

  // Aquí se maneja la respuesta del usuario
  const handleUserMessage = async (message) => {
    if (message.key.remoteJid === id && message.message && message.message.conversation) {
      const userResponse = message.message.conversation.toLowerCase();
      const correctAnswer = json.response.toLowerCase();

      if (userResponse === correctAnswer) {
        await conn.reply(m.chat, `🎉 ¡Correcto! El país es: *${json.response}*`, conn.tekateki[id][0]);
        delete conn.tekateki[id];
      } else {
        await conn.reply(m.chat, `❌ Incorrecto. Intenta de nuevo.`, conn.tekateki[id][0]);
      }
    }
  };

  // Escucha mensajes de forma sincrónica
  conn.onMessage = (message) => {
    handleUserMessage(message);
  };
};

handler.help = ['paises'];
handler.tags = ['game'];
handler.command = /^(paises)$/i;

export default handler;
