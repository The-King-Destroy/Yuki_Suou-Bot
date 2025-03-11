var handler = async (m, { conn, text, usedPrefix, command }) => {
    let user, number, bot, bant, ownerNumber, aa, users, usr

    try {
        function no(number) {
            return number.replace(/\s/g, '').replace(/([@+-])/g, '')
        }
        text = no(text)
        number = isNaN(text) ? text.split`@`[1] : text
        user = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
        bot = conn.user.jid.split`@`[0]
        bant = `❀ Por favor, etiqueta o escrive el número del usuario al que quieres banear del Bot.`
        const nn = conn.getName(m.sender)
        if (!text && !m.quoted) return conn.reply(m.chat, bant, m, { mentions: [user] })
        
        if (text) {
            user = number + '@s.whatsapp.net'
        } else if (m.quoted.sender) {
            user = m.quoted.sender
        } else if (m.mentionedJid) {
            user = number + '@s.whatsapp.net'
        }

        number = user.split('@')[0]
        if (user === conn.user.jid) return conn.reply(m.chat, `✧ @${bot} No puede ser baneado con este comando.`, m, { mentions: [user] })

        for (let i = 0; i < global.owner.length; i++) {
            ownerNumber = global.owner[i][0]
            if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
                aa = ownerNumber + '@s.whatsapp.net'
                await conn.reply(m.chat, `✧ No puedo banear al propietario @${ownerNumber} de *${botname}*.`, m, { mentions: [aa] })
                return
            }
        }

        users = global.db.data.users
        if (!users[user]) {
            users[user] = { banned: false }
        }
        if (users[user].banned === true) return conn.reply(m.chat, `✦ No es necesario volver a banear a @${number}.`, m, { mentions: [user] })

        users[user].banned = true
        usr = m.sender.split('@')[0]
        await conn.reply(m.chat, `❀ Usuario baneado con éxito.`, m, { mentions: [user] })
        let nametag = conn.getName(user)
        await conn.reply(`${suittag}@s.whatsapp.net`, `❀ El usuario *${nametag}* ha sido Baneado por *${nn}*.`, m)
    } catch (e) {
        await conn.reply(m.chat, `⚠︎ Ocurrió un error.`, m)
    }
}

handler.help = ['banuser <@tag> <razón>']
handler.command = ['banuser']
handler.tags = ['mods']
handler.rowner = true

export default handler
