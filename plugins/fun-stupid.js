let handler = async (m, { conn, args }) => {
    let text = args.slice(1).join(' ')
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/misc/its-so-stupid', {
    avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/08f43c70269b38fd8ac12.jpg'),
    dog: text || 'Soy+Estupido'
    }), 'error.png', `*@${author}*`, m)
    }  
    handler.help = ['itssostupid', 'estupido', 'stupid']
    handler.tags = ['fun']
    handler.command = /^(itssostupid|iss|stupid)$/i
    export default handler
