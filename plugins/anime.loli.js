let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/misc/lolice', {
    avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
    }), 'error.png', '*🚔🚨 DENUNCIADO POR PEDÓFILO 🚨🚔*', m, null, rcanal)
    }

    handler.help = ['lolicon']
    handler.tags = ['anime']
    handler.command = /^(lolicon)$/i

    export default handler
