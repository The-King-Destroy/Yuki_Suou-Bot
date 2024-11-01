import Groq from 'groq-sdk';
const handler = async (m, { conn, text, usedPrefix, command }) => {
const groq = new Groq({ apiKey: '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' });
    conn.sylph = conn.sylph ? conn.sylph : {};
    let ya = text && m.quoted ? (m.quoted.text ? text + '\n\n' + m.quoted.text : text) : text ? text : (m.quoted ? (m.quoted.text ? m.quoted.text : false) : false);
    if (!ya) throw `\`\`\`[ 🌹 ] Por favor ingresa un texto. Ejemplo: ${usedPrefix + command} Hola\`\`\``
      try {
        let { key } = await conn.sendMessage(m.chat, { text: wait }, { quoted: m });
        if (!(m.sender in conn.sylph))
        conn.sylph[m.sender] = [{
          role: 'system',
          content: `Eres Yuki, una inteligencia artificial creada por Destroy, responde de manera clara y concisa para que los usuarios entiendan mejor tus respuestas. El nombre del usuario será: ${conn.getName(m.sender)}`,
        }];
  
        if (conn.sylph[m.sender].length > 10) {
          conn.sylph[m.sender] = conn.sylph[m.sender].slice(-1);
        }

        conn.sylph[m.sender].push({
          role: 'user',
          content: ya,
        });

        let msg = [ ...conn.sylph[m.sender], {
          role: 'user',
          content: ya,
        }];

        const payloads = {
          messages: msg,
          model: 'llama-3.1-70b-versatile'
        };

        const json = await groq.chat.completions.create(payloads)
        let message = json.choices[0].message.content;
        conn.sylph[m.sender].push({
          role: "system",
          content: message,
        });
        await conn.sendMessage(m.chat, { text: message, edit: key }, { quoted: m });
      } catch (e) {
        return m.reply(e.message)
      }
  }
handler.command = ['ai2', 'openai', 'ia', 'chatgpt'];
handler.help = ['openai', 'ia', 'chatgpt'];
handler.tags = ['ai'];
export default handler;