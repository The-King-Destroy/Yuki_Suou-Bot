const handler = async (m, {conn, text, command}) => {
  const yh = global.bianca;
  const url = yh[Math.floor(Math.random() * yh.length)];
  conn.sendMessage(m.chat, {image: {url: url}, caption: '*🥵 BIANCA 🥵*'}, {quoted: m});
};
handler.command = /^(bianca)$/i;
handler.tags = ['Internet'];
handler.help = ['bianca'];
export default handler;


global.bianca = [
  "https://qu.ax/HEJE.jpg",
  "https://qu.ax/jggx.jpg",
  "https://qu.ax/NXzg.jpg",
  "https://qu.ax/iGMf.jpg",
  "https://qu.ax/FyqK.jpg",
  "https://qu.ax/bETU.jpg",
  "https://qu.ax/jjae.jpg", 
];

handler.limit = 3;