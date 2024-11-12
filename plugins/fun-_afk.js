//import db from '../lib/database.js'

export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
   Dejaste de estar afk ✅
${user.afkReason ? ' \n💬 *Razon :* ' + user.afkReason : ''}
⏱️ *Estuviste afk durante* ${(new Date - user.afk).toTimeString()} :3  `.trim())
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
💤 La persona que mencionas está afk 💤

${reason ? '💬 *Razon* : ' + reason : '💬 *Razon* : Sin razon'}
⏱️ *Lleva afk :* ${(new Date - afkTime).toTimeString()} :3 
  `.trim())
    }
    return true
}
