const handler = async (m, {conn, text, command}) => {
  const yh = global.alpes;
  const url = yh[Math.floor(Math.random() * yh.length)];
  conn.sendMessage(m.chat, {image: {url: url}, caption: '*🔮 ALPES 🔮*'}, {quoted: m});
};
handler.command = /^(alpes|mapaalpes)$/i;
handler.tags = ['free'];
handler.help = ['alpes'];
export default handler;

global.alpes = [
  'https://telegra.ph/file/527ae25478f03c298f584.jpg',
];