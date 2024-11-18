let handler = async(m, { conn, command, text }) => {
  if (!text) return m.reply(`❗𝙸𝙽𝙶𝚁𝙴𝚂𝙰 𝙴𝙻 𝙼𝙾𝚃𝙸𝚅𝙾 𝙿𝙰𝚁𝙰 𝙻𝙰 𝚁𝙴𝚄𝙽𝙸𝙾𝙽 𝙳𝙴𝙻 𝚂𝚃𝙰𝙵𝙵`)
    if (text.length < 11) return m.reply(`❗ 𝙸𝙽𝙶𝚁𝙴𝚂𝙰 𝙰𝙻 𝙼𝙴𝙽𝙾𝚂 11 𝙲𝙰𝚁𝙰𝙲𝚃𝙴𝚁𝙴𝚂 𝙿𝙰𝚁𝙰 𝙴𝙻 𝙼𝙾𝚃𝙸𝚅𝙾 𝙳𝙴 𝙻𝙰 𝚁𝙴𝚄𝙽𝙸𝙾𝙽`)
    
let texto = `*_🐶 𝙴𝙻 𝙾𝚆𝙽𝙴𝚁 @${m.sender.split`@`[0]} 𝙰 𝙴𝙽𝙿𝙴𝚉𝙰𝙳𝙾 𝚄𝙽𝙰 𝚁𝙴𝚄𝙽𝙸𝙾𝙽 𝙴𝙽𝚃𝚁𝙰𝚁 𝙻𝙾 𝙼𝙰𝚂 𝙿𝚁𝙾𝙽𝚃𝙾 𝙰𝙻 𝙶𝚁𝚄𝙿𝙾 𝙳𝙴𝙻 𝚂𝚃𝙰𝙵𝙵 𝙳𝙴 ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ _*\n*➪ 𝙼𝙾𝚃𝙸𝚅𝙾: ${text}*`
m.reply('*_🚀 Enviando mensaje de reunión a todos los owners de Yuki Suou._*')
for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await conn.onWhatsApp(jid))[0] || {}
                        if (data.exists)
                        conn.sendPayment(data.jid, '999999999', texto, m)
                        
                           // conn.reply(data.jid, text, m, { mentions: [m.sender] })
                    }

}
handler.tags = ['owner']
handler.command = handler.help =['reunion','reunionstaff']
handler.rowner = true

export default handler
