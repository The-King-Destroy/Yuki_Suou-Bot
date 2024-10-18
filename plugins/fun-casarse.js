let marriageDivorceConfirmation = {};

let handleMarriageDivorce = async (m, { conn, usedPrefix, isGroup }) => {
  const action = m.text.split(' ')[0]; // "casarse" o "divorciarse"
  let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  if (!who) throw 'Etiqueta o menciona a alguien';

  if (marriageDivorceConfirmation[m.sender]) {
    return m.reply('Ya tienes una solicitud pendiente. Espera a que finalice.');
  }

  let str;
  if (action === 'casarse') {
    str = `@${m.sender.split('@')[0]} te ha propuesto matrimonio @${who.split('@')[0]}! Responde con "acepto" o "rechazo" en los próximos 5 minutos.`;
    await conn.sendMessage(m.chat, { text: str, mentions: conn.parseMention(str) }, { quoted: m });

    marriageDivorceConfirmation[who] = {
      sender: m.sender,
      to: who,
      type: 'marriage',
      message: m,
      timeout: setTimeout(() => {
        conn.sendMessage(m.chat, `⏳ Tiempo de respuesta agotado para la propuesta de matrimonio.`, { quoted: m });
        delete marriageDivorceConfirmation[who];
      }, 5 * 60 * 1000) // 5 minutos
    };
  } else if (action === 'divorciarse') {
    str = `@${m.sender.split('@')[0]} ha solicitado el divorcio de @${who.split('@')[0]}! Responde con "acepto" o "rechazo" en los próximos 5 minutos.`;
    await conn.sendMessage(m.chat, { text: str, mentions: conn.parseMention(str) }, { quoted: m });

    marriageDivorceConfirmation[who] = {
      sender: m.sender,
      to: who,
      type: 'divorce',
      message: m,
      timeout: setTimeout(() => {
        conn.sendMessage(m.chat, `⏳ Tiempo de respuesta agotado para la solicitud de divorcio.`, { quoted: m });
        delete marriageDivorceConfirmation[who];
      }, 5 * 60 * 1000) // 5 minutos
    };
  }
};

handleMarriageDivorce.before = async (m) => {
  if (!(m.sender in marriageDivorceConfirmation)) return;
  if (!m.text) return;

  let { timeout, sender, message, to, type } = marriageDivorceConfirmation[m.sender];
  if (m.id === message.id) return;

  if (/rechazo|no/i.test(m.text)) {
    clearTimeout(timeout);
    delete marriageDivorceConfirmation[m.sender];
    return m.reply(`❌ La propuesta fue rechazada por @${to.split('@')[0]}.`);
  }

  if (/acepto|si/i.test(m.text)) {
    let finalStr;
    if (type === 'marriage') {
      let imgs = [
        'https://qu.ax/OpVX.mp4',
        'https://qu.ax/ChmG.mp4',
        'https://qu.ax/yUBa.mp4'
      ];
      let img = imgs[Math.floor(Math.random() * imgs.length)];
      finalStr = `@${sender.split('@')[0]} se ha casado con @${to.split('@')[0]}! ¡Felicidades!`;

      await conn.sendMessage(m.chat, {
        video: { url: img },
        gifPlayback: true,
        caption: finalStr,
        mentions: conn.parseMention(finalStr)
      }, { quoted: message });

      global.db.data.users[sender].casado = true;
      global.db.data.users[to].casado = true;
      global.db.data.users[sender].pareja = to;
      global.db.data.users[to].pareja = sender;

    } else if (type === 'divorce') {
      finalStr = `@${sender.split('@')[0]} se ha divorciado de @${to.split('@')[0]}.`;
      await conn.sendMessage(m.chat, { text: finalStr, mentions: conn.parseMention(finalStr) }, { quoted: message });

      global.db.data.users[sender].casado = false;
      global.db.data.users[to].casado = false;
      global.db.data.users[sender].pareja = null;
      global.db.data.users[to].pareja = null;
    }

    clearTimeout(timeout);
    delete marriageDivorceConfirmation[m.sender];
  }
};

handleMarriageDivorce.help = ['casarse @tag', 'divorciarse @tag'];
handleMarriageDivorce.tags = ['fun'];
handleMarriageDivorce.command = ['casarse', 'divorciarse', 'marry', 'divorce'];
handleMarriageDivorce.group = true;
export default handleMarriageDivorce;
