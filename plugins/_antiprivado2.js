
export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  // Definir los prefijos prohibidos
  let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "234", "91", "254", "213"];
  let senderNumber = m.sender.split('@')[0]; // Obtener el número del remitente
  let isForbidden = forbidPrefixes.some(prefix => senderNumber.startsWith(prefix)); // Verificar si el número está en los prefijos prohibidos

  const chat = global.db.data.chats[m.chat];
  const settings = global.db.data.settings[this.user.jid] || {}; // Obtener la configuración del bot

  // Asegúrate de que antiPrivate2 esté definido en settings
  if (!('antiPrivate2' in settings)) settings.antiPrivate2 = false;

  // Si la opción antiPrivate2 está activada y el remitente no es el propietario
  if (settings.antiPrivate2 && !isOwner && !isROwner && isForbidden) {
    await m.reply(`> "🤬 Pinché Árabe de mierda No los quiero ver vivos me tienen la vrg parada ya de tanto\n> .apk WhatsApp\n vas hacer bloqueado por Perra.`, false, { mentions: [m.sender] });
    await this.updateBlockStatus(m.chat, 'block');
  }

  return false;
}

// Comandos para activar o desactivar la opción antiPrivate2
case 'antiprivado2':
  const [action] = m.text.split(' ').slice(1); // Obtener la acción (on/off)

  if (!isROwner) {
    global.dfail('admin', m, conn);
    throw false;
  }

  // Activar o desactivar según la acción
  if (action === 'on') {
    settings.antiPrivate2 = true; // Activar la opción antiPrivate2
    await m.reply('✅ La opción anti privado 2 ha sido activada.');
  } else if (action === 'off') {
    settings.antiPrivate2 = false; // Desactivar la opción antiPrivate2
    await m.reply('❌ La opción anti privado 2 ha sido desactivada.');
  } else {
    await m.reply('⚠️ Por favor, usa .antiprivado2 on para activar o .antiprivado2 off para desactivar.');
  }
  break;

// Comando para verificar el estado de antiPrivate2
case 'estadoAntiPrivate2':
  const estado = settings.antiPrivate2 ? 'activada' : 'desactivada';
  await m.reply(`📜 La opción anti privado 2 está actualmente ${estado}.`);
  break;
