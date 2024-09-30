//import db from '../lib/database.js'

export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
   𝙳𝚎𝚓𝚊𝚜𝚝𝚎 𝚍𝚎 𝚎𝚜𝚝𝚊𝚛 𝚊𝚏𝚔 ✅
${user.afkReason ? ' \n▢ *𝚁𝚊𝚣𝚘𝚗 :* ' + user.afkReason : ''}
▢ *𝙴𝚜𝚝𝚞𝚟𝚒𝚜𝚝𝚎 𝚊𝚏𝚔 𝚍𝚞𝚛𝚊𝚗𝚝𝚎* ${(new Date - user.afk).toTimeString()} :3  `.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        m.reply(`
💤 𝙻𝚊 𝚙𝚎𝚛𝚜𝚘𝚗𝚊 𝚚𝚞𝚎 𝚖𝚎𝚗𝚌𝚒𝚘𝚗𝚊𝚜 𝚎𝚜𝚝𝚊 𝚊𝚏𝚔 💤

${reason ? '▢ *𝚁𝚊𝚣𝚘𝚗* : ' + reason : '▢ *𝚁𝚊𝚣𝚘𝚗* : Sin razon'}
▢ *𝙻𝚕𝚎𝚟𝚊 𝚊𝚏𝚔 :* ${(new Date - afkTime).toTimeString()} :3 
  `.trim())
    }
    return true
}
