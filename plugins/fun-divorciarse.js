let divorceConfirmation = {};

let divorceHandler = async (m, { conn, usedPrefix, isGroup }) => {
  let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  if (!who) throw 'Etiqueta o menciona a alguien';

  let name1 = conn.getName(who);
  let name2 = conn.getName(m.sender);

  if (divorceConfirmation[m.sender]) return m.reply('Ya tienes una solicitud de divorcio pendiente.');

  let str = `@${m.sender.split('@')[0]} ha solicitado el divorcio de @${who.split('@')[0]}! Responde con "acepto" o "rechazo" en los próximos 5 minutos.`;
  await conn.sendMessage(m.chat, { text: str, mentions: conn.parseMention(str) }, { quoted: m });

  divorceConfirmation[who] = {
    sender: m.sender,
    to: who,
    message: m,
    timeout: setTimeout(() => {
      m.reply(`⏳ Tiempo de respuesta agotado.`);
      delete divorceConfirmation[m.sender];
    }, 5 * 60 * 1000) // 5 minutos
  };
};

divorceHandler.before = async (m) => {
  if (!(m.sender in divorceConfirmation)) return;
  if (!m.text) return;

  let { timeout, sender, message, to } = divorceConfirmation[m.sender];
  if (m.id === message.id) return;

  if (/rechazo|no/i.test(m.text)) {
    clearTimeout(timeout);
    delete divorceConfirmation[sender];
    return m.reply(`❌ La solicitud de divorcio fue rechazada por @${to.split('@')[0]}.`);
  }

  if (/acepto|si/i.test(m.text)) {
    let finalStr = `@${sender.split('@')[0]} se ha divorciado de @${to.split('@')[0]}.`;
    await conn.sendMessage(m.chat, { text: finalStr, mentions: conn.parseMention(finalStr) }, { quoted: message });

    global.db.data.users[sender].casado = false;
    global.db.data.users[to].casado = false;
    global.db.data.users[sender].pareja = null;
    global.db.data.users[to].pareja = null;

    clearTimeout(timeout);
    delete divorceConfirmation[sender];
  }
};

divorceHandler.help = ['divorciarse @tag'];
divorceHandler.tags = ['fun'];
divorceHandler.command = ['divorciarse', 'divorce'];
divorceHandler.group = true;
export default divorceHandler;
