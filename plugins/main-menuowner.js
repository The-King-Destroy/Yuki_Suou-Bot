import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
let owner = `
һ᥆ᥣᥲ! ძᥱsᥲrr᥆ᥣᥣᥲძ᥆r s᥆ᥡ  *${botname}*
ᥲ𝗊ᥙí 𝗍іᥱᥒᥱs ᥣᥲ ᥣіs𝗍ᥲ ძᥱ ᥴ᥆mᥲᥒძ᥆s ძᥱ m᥆ძs ᥡ ᥆ᥕᥒᥱrs


`.trim();

await conn.sendMessage(m.chat, {
text: owner,
contextInfo: {
externalAdReply: {
title: packname,
body: dev,
thumbnailUrl: icono,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
}, { quoted: m });
};

handler.help = ['staff'];
handler.tags = ['main'];
handler.command = ['mods', 'dev', 'owners'];
handler.mods = true

export default handler;
