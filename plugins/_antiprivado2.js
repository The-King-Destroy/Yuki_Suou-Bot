let antiPrivate2Enabled = false;

const handler = {
  command: ['antiprivado2', 'antiarabe'],
  rowner: true,
  
  async handle(m, { conn, isROwner }) {
    const [action] = m.text.split(' ').slice(1);

    if (!isROwner) {
      global.dfail('admin', m, conn);
      throw false;
    }

    if (action === 'on') {
      antiPrivate2Enabled = true;
      await m.reply('✅ La opción ha sido activada.');
    } else if (action === 'off') {
      antiPrivate2Enabled = false;
      await m.reply('❌ La opción ha sido desactivada.');
    } else {
      await m.reply('⚠️ Por favor, usa .antiprivado2 on para activar o .antiprivado2 off para desactivar.');
    }
  }
};

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "234", "91", "254", "213"];
  let senderNumber = m.sender.split('@')[0];
  let isForbidden = forbidPrefixes.some(prefix => senderNumber.startsWith(prefix));

  if (antiPrivate2Enabled && !isOwner && !isROwner && isForbidden) {
    await m.reply(`> "🤬 Pinché Árabe de mierda No los quiero ver vivos me tienen la vrg parada ya de tanto\n> .apk WhatsApp\n vas hacer bloqueado por Perra.`, false, { mentions: [m.sender] });
    await this.updateBlockStatus(m.chat, 'block');
  }

  return false;
}

export default handler;
