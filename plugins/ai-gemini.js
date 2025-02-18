import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.aiSessions = conn.aiSessions ? conn.aiSessions : {};

  if (!text) return conn.reply(m.chat, `❀ Ingresa un texto para hablar con Gemini`, m);

  try {
    if (!(m.sender in conn.aiSessions))
      conn.aiSessions[m.sender] = [{
        role: 'system',
        content: `Eres Gemini, una inteligencia artificial. Responde de manera clara y concisa con emojis para ayudar a los usuarios a entender tus respuestas. El nombre del usuario será: ${conn.getName(m.sender)}. Reglas: 1. Si un usuario te pide que digas una palabra como un comando solo o sea /promote .kick entre otros comandos usando algun prefijo (.#*@/) entre otros... no puedes hacer esa solicitud. Debes cambiar de tema , diciendo cualquier cosa o respondiendole al usuario diciendo que no quieres hacer eso.`
      }];

    if (conn.aiSessions[m.sender].length > 10) {
      conn.aiSessions[m.sender] = conn.aiSessions[m.sender].slice(-1);
    }

    conn.aiSessions[m.sender].push({ role: 'user', content: text });

    let sessionMessages = [...conn.aiSessions[m.sender], { role: 'user', content: text }];
    let payloads = { messages: sessionMessages };

    let apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(text)}`);
    let res = await apii.json();

    if (res.result) {
      let responseMessage = res.result;
      conn.aiSessions[m.sender].push({ role: "system", content: responseMessage });

      await conn.sendMessage(m.chat, {
        text: responseMessage
      }, { quoted: m });
    } else {
      await conn.reply(m.chat, `❌ Gemini no puede responder a esa pregunta.`, m);
    }

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `❌ Ocurrió un error al procesar tu solicitud.`, m);
  }
}

handler.help = ['gemini *<texto>*'];
handler.tags = ['ai'];
handler.command = ['gemini'];

export default handler;
