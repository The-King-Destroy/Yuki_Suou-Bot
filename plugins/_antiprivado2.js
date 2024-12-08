export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "234", "91", "254", "213"];
  let senderNumber = m.sender.split('@')[0];
  let isForbidden = forbidPrefixes.some(prefix => senderNumber.startsWith(prefix));

  if (isForbidden) {
    await m.reply(`> "🤬 Pinché Árabe de mierda No los quiero ver vivos me tienen la vrg parada ya de tanto\n> .apk WhatsApp\n vas hacer bloqueado por Perra.`, false, { mentions: [m.sender] });
    await this.updateBlockStatus(m.chat, 'block');
  }

  return false;
}