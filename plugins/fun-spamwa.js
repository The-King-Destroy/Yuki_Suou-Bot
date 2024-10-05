const handler = async (m, {conn, text}) => {
  const [nomor, pesan, jumlah] = text.split('|');
  if (!nomor) throw '*Uso Correcto:*\n*☁️ #spamwa numero|texto|cantidad*\n*Eᴊᴇᴍᴘʟᴏ:*\n*☁️ #spamwa 5219999999999|responde :v|25*';
  if (!pesan) throw '*Uso Correcto:*\n*☁️ #spamwa numero|texto|cantidad*\n*Eᴊᴇᴍᴘʟᴏ:*\n*☁️ #spamwa 5219999999999|responde :v|25*';
  if (jumlah && isNaN(jumlah)) throw '*🌋 Lᴀ Cᴀɴᴛɪᴅᴀᴅ Dᴇᴠᴇ Sᴇʀ Nᴜᴍᴇʀᴏ!*\n*Uso Correcto:*\n*☁️ #spamwa numero|texto|cantidad*\n*𝙴𝙹𝙴𝙼𝙿𝙻𝙾:*\n*☁️ #spamwa 5219999999999|responde :v|25*';

  const fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net';
  const fixedJumlah = jumlah ? jumlah * 1 : 10;
  if (fixedJumlah > 999) throw '*⚠️ Minimo 50 Caracteres*';
  await m.reply(`🛑 *Se Envió Con Exito El Spam*\n*𝙲𝙰𝙽𝚃𝙸𝙳𝙰𝙳 𝙴𝙽𝚅𝙸𝙰𝙳𝙰:*\n*☁️ ${fixedJumlah} 𝚟𝚎𝚌𝚎𝚜!*`);
  for (let i = fixedJumlah; i > 1; i--) {
    if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m);
  }
};
handler.help = ['spamwa <num>|<msj>|'];
handler.tags = ['fun'];
handler.command = /^spam(wa)?$/i;
handler.group = false;
handler.premium = true;
// handler.private = true
// handler.estrellas = true
export default handler;
