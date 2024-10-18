let marriageDivorceConfirmation = {};

const handleMarriageDivorce = async (m, { conn, usedPrefix, isGroup }) => {
  const action = m.text.split(' ')[0]; // "casarse" o "divorciarse"
  const who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);
  
  if (!who) throw 'Por favor etiqueta o menciona a alguien.';

  // Verifica si ya hay una solicitud pendiente para el destinatario
  if (marriageDivorceConfirmation[who]) {
    return m.reply('Ya tienes una solicitud pendiente. Espera a que finalice.');
  }

  let str;
  if (action === 'casarse') {
    str = `@${m.sender.split('@')[0]} te ha propuesto matrimonio @${who.split('@')[0]}! Responde con "acepto" o "rechazo" en los próximos 5 minutos.`;
    await conn.sendMessage(m.chat, { text: str, mentions: conn.parseMention(str) }, { quoted: m });
    
    // Configura la solicitud de matrimonio
    marriageDivorceConfirmation[who] = createConfirmationObject(m.sender, who, 'marriage', m);
  } else if (action === 'divorciarse') {
    str = `@${m.sender.split('@')[0]} ha solicitado el divorcio de @${who.split('@')[0]}! Responde con "acepto" o "rechazo" en los próximos 5 minutos.`;
    await conn.sendMessage(m.chat, { text: str, mentions: conn.parseMention(str) }, { quoted: m });

    // Configura la solicitud de divorcio
    marriageDivorceConfirmation[who] = createConfirmationObject(m.sender, who, 'divorce', m);
  }
};

const createConfirmationObject = (sender, to, type, message) => {
  const timeout = setTimeout(() => {
    conn.sendMessage(message.chat, `⏳ Tiempo de respuesta agotado para la solicitud de ${type === 'marriage' ? 'matrimonio' : 'divorcio'}.`, { quoted: message });
    delete marriageDivorceConfirmation[to]; // Usar 'to' para eliminar la solicitud del destinatario
  }, 5 * 60 * 1000); // 5 minutos

  return { sender, to, type, message, timeout };
};

handleMarriageDivorce.before = async (m) => {
  const confirmation = marriageDivorceConfirmation[m.sender];
  if (!confirmation) return; // No hay solicitud pendiente
  if (!m.text) return; // No hay texto en el mensaje
  
  const { timeout, sender, to, type } = confirmation;
  if (m.id === confirmation.message.id) return; // Ignora respuestas al mismo mensaje

  // Manejo de rechazo
  if (/rechazo|no/i.test(m.text)) {
    clearTimeout(timeout);
    delete marriageDivorceConfirmation[m.sender];
    return m.reply(`❌ La propuesta fue rechazada por @${to.split('@')[0]}.`);
  }

  // Manejo de aceptación
  if (/acepto|si/i.test(m.text)) {
    let finalStr;
    if (type === 'marriage') {
      finalStr = `@${sender.split('@')[0]} se ha casado con @${to.split('@')[0]}! ¡Felicidades!`;
      await conn.sendMessage(m.chat, { text: finalStr, mentions: conn.parseMention(finalStr) }, { quoted: confirmation.message });

      // Actualiza la base de datos
      updateMarriageStatus(sender, to, true);
    } else if (type === 'divorce') {
      finalStr = `@${sender.split('@')[0]} se ha divorciado de @${to.split('@')[0]}.`;
      await conn.sendMessage(m.chat, { text: finalStr, mentions: conn.parseMention(finalStr) }, { quoted: confirmation.message });

      // Actualiza la base de datos
      updateMarriageStatus(sender, to, false);
    }

    clearTimeout(timeout);
    delete marriageDivorceConfirmation[m.sender];
  }
};

const updateMarriageStatus = (sender, to, isMarried) => {
  global.db.data.users[sender].casado = isMarried;
  global.db.data.users[to].casado = isMarried;
  global.db.data.users[sender].pareja = isMarried ? to : null;
  global.db.data.users[to].pareja = isMarried ? sender : null;
};

handleMarriageDivorce.help = ['casarse @tag', 'divorciarse @tag'];
handleMarriageDivorce.tags = ['fun'];
handleMarriageDivorce.command = ['casarse', 'divorciarse', 'marry', 'divorce'];
handleMarriageDivorce.group = true;

export default handleMarriageDivorce;
