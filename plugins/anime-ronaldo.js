import axios from "axios";
let handler = async (m, { conn, usedPrefix, command }) => {
  let cristiano = (
    await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json`,)).data;
  let ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())];
  conn.sendFile(m.chat, ronaldo, "error.jpg", `*CR7*`, m, null, rcanal);
};

//conn.sendButton(m.chat, "*Siiiuuuuuu*", author, ronaldo, [['⚽ NEXT ⚽', `${usedPrefix + command}`]], m)}

handler.help = ["cr7"];
handler.tags = ["anime"];
handler.command = /^(ronaldo|cr7)$/i;

export default handler;
