const handler = async (m, {conn, text, command}) => {
  const yh = global.kalahari;
  const url = yh[Math.floor(Math.random() * yh.length)];
  conn.sendMessage(m.chat, {image: {url: url}, caption: '*🔮 KALAHARI 🔮*'}, {quoted: m});
};
handler.command = /^(kalahari|mapakalahari)$/i;
handler.tags = ['free'];
handler.help = ['kalahari'];
export default handler;

global.kalahari = [
  'https://telegra.ph/file/c2ac00af19ad02ae2fddf.jpg',
];