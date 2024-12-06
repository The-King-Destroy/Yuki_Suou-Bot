const setClaimMsgHandler = async (m, { conn, args }) => {
    const message = args.join(' ');

    // Lógica para establecer el mensaje de reclamación
    await conn.reply(m.chat, `✦ Has modificado el mensaje de reclamación a: "${message}".`, m);
};

setClaimMsgHandler.help = ['setclaimmsg', 'setclaim'];
setClaimMsgHandler.tags = ['harem'];
setClaimMsgHandler.command = /^(setclaimmsg|setclaim)$/i;

export default setClaimMsgHandler;
