let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    } else {
        who = m.chat;
    }
    if (!who) throw 'Etiqueta a la persona que deseas eliminar como moderador!';
    
    const ownerId = who.split('@')[0];
    const ownerIndex = global.owner.findIndex(owner => owner[0] === ownerId);
    
    if (ownerIndex === -1) throw 'Esta persona no es moderador!';
    
    const removedOwner = global.owner.splice(ownerIndex, 1)[0];
    const caption = `@${removedOwner[0]} has been removed as an Owner.`;
    
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}

handler.help = ['removeowner @user', 'removerowner'];
handler.tags = ['owner'];
handler.command = /^(remove|del|-)(owner|sudo)$/i;
handler.owner = true;

export default handler;
