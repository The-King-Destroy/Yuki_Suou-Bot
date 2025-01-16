let handler = async (m, { conn, args }) => {
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;

    const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
      .map((item) => item.key.participant)
      .filter((value, index, self) => self.indexOf(value) === index);

    const listaEnLinea =
      participantesUnicos
        .map((k) => `@${k.split("@")[0]}`)
        .join("\n") || "*✧ No hay usuarios en línea en este momento :c.*";

    const mensaje = `*♡ Lista de usuarios en línea:*\n\n${listaEnLinea}\n\n> ${dev}`;

    await conn.sendMessage(m.chat, {
      text: mensaje,
      mentions: participantesUnicos,
    });

    await m.react("✅");
  } catch (error) {
    console.error(error);
    await m.reply("⚠️ Hubo un error al enviar la lista de usuarios.");
  }
};

handler.help = ["listonline"];
handler.tags = ["grupo"];
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