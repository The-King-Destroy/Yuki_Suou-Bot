let handler = m => m

if (!global.db.data.chats.globalOnlyLatinos) {
  global.db.data.chats.globalOnlyLatinos = false;
}

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner }) {
  if (m.isGroup) return false;

  let chat = global.db.data.chats[m.chat];

  if (!('onlyLatinos' in chat)) {
    chat.onlyLatinos = false;
  }
  
  if (chat.onlyLatinos) {
    global.db.data.chats.globalOnlyLatinos = true;
    m.reply('🚩 La restricción de solo hispanohablantes ha sido activada en este chat y se aplicará a todos los chats privados.', m.sender);
  }

  if (global.db.data.chats.globalOnlyLatinos) {
    let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "234", "91", "254", "213"];

    for (let prefix of forbidPrefixes) {
      if (m.sender.startsWith(prefix)) {
        m.reply('🚩 En este chat solo se permite personas de habla hispana.', m.sender);
        return false;
      }
    }
  }

  return true;
}

export default handler;
