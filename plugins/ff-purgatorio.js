const handler = async (m, {conn, text, command}) => {
  const yh = global.purgatorio;
  const url = yh[Math.floor(Math.random() * yh.length)];
  conn.sendMessage(m.chat, {image: {url: url}, caption: '*🔮 PURGATORIO 🔮*'}, {quoted: m});
};
handler.command = /^(purgatorio|mapapurgatorio)$/i;
handler.tags = ['free'];
handler.help = ['purgatorio'];
export default handler;

global.purgatorio = [
  'https://telegra.ph/file/906cbccf4259b5395abb5.jpg',
];