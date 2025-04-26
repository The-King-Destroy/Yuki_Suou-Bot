const handler = async (m, { conn, command, participants, text }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

    if (!text) throw `${emoji} Ingresa un texto para dejarlo después de 2 horas.*`;
    m.reply(`${emoji} El texto será enviado después del tiempo estipulado.`);

    function espera() {
        conn.reply(m.chat, text, null, { forward: text.fakeObj, mentions: users } )
    }
    setTimeout(espera, 720000);

  };
handler.command = ['let'];
handler.rowner = true;

export default handler;