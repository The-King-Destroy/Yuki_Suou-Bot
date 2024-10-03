import axios from "axios";

let handler = async (m, { conn, args }) => {
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;

    const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
      .map((item) => item.key.participant)
      .filter((value, index, self) => self.indexOf(value) === index);

    const participantesOrdenados = participantesUnicos.sort((a, b) =>
      a.split("@")[0].localeCompare(b.split("@")[0]),
    );

    const listaEnLinea =
      participantesOrdenados
        .map((k, i) => `*${i + 1}.* @${k.split("@")[0]}`)
        .join("\n") || "No hay usuarios en linea en este momento :c.";

    const imgUrl = "https://qu.ax/Xbzc.jpg";
    const responseImg = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    await conn.sendFile(
      m.chat,
      responseImg.data,
      "thumbnail.png",
      `*🌐 Lista de usuarios en línea ahora ♡:*\n${listaEnLinea}\n\n\`Yuki-Suou-Bot by Destroy\``,
      m,
      {
        contextInfo: { mentionedJid: participantesOrdenados },
      },
    );

    await m.react("✅");
  } catch (error) {
    console.error(error);
    await m.reply("Hubo un error al enviar  la imagen.");
  }
};

handler.help = ["listonline"];
handler.tags = ["owner"];
handler.command = ["listonline", "online", "linea", "enlinea"];
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.register = true;

export default handler;
