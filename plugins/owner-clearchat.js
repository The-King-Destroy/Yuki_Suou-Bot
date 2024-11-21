let handler = async (m, { conn, args }) => {
    try {
        if (!args[0]) throw m.reply('🌸 *Ingresa la ID del chat*')
        const jid = args[0]
        await conn.chatModify({
          delete: true,
          lastMessages: [{
            key: m.key,
            messageTimestamp: m.messageTimestamp
          }]
        }, jid);
      conn.reply(m.chat, `🌷 *Se limpio el chat de ${jid}*`, m);
    } catch (error) {
      console.error(error);
      conn.reply(m.chat, 'Error', m);
    }
  }

  handler.help = ['clearchat']
  handler.tags = ['owner']
  handler.owner = true
  handler.command = /^(clearchat)$/i

  export default handler