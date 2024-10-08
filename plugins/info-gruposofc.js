let media = './src/Grupo.jpg'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    await conn.sendMessage(m.chat, { react: { text: '⚡️', key: m.key } })
let str = `*📍 GRUPO OFICIAL*

   *_〾̷̸‣⃝⃨⃛⃰⁝̵̓ᝒ̷̸͙✨̶̩ܻᝒ̷̸꯭͙𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭𓆩֟֯፝𓆪𝝣⃯ᵴͦ𝛒⃨ᷫ𝛆ͨ🄲⃪⃯𝛊ᷨ𝛂⃨ͦꝆ᷽ͭ🍁⃝⃙̻⃮̋⃛⃰⁌̷̸̊͟⿻᳔̶̷̸_*
  ┃🧸❏ ${gp4}

   *_ ͟͞〾⃝̵͡✨𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 𝐎𝐟𝐢𝐜𝐢𝐚𝐥✨_*
┃🧸❏ https://chat.whatsapp.com/E78uEs2qJIE0apCLB7rSQZ
   
   *_🌟𝙔𝙪𝙠𝙞_𝙎𝙪𝙤𝙪-𝘽𝙤𝙩 𝙂𝙚𝙣𝙚𝙧𝙖𝙡🌟_*
┃🧸❏ https://chat.whatsapp.com/BELmEmNjNlv36w7ElRrOKa

   *_★彡[ᴛᴇᴀᴍ ʏᴜᴋɪ_ꜱᴜᴏᴜ-ʙᴏᴛ]彡★_*
┃❤️‍🔥❏ https://chat.whatsapp.com/BuLovToIxdiLeycG2d3xJN

   *_Canal Oficial_*
┃❤️‍🔥❏ https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T

   *_Canal Oficial2_*
┃❤️‍🔥❏ https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T
*_╰━━━━━━━━━━━━━━━━⊜_*
`
await conn.sendButton(m.chat, str, `͟͞ 𓆩ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜ৎ୭࠱࠭ ͟͞\n` + wm, media, [
['Menu 💖', '#Menu']], null, [
['⏤͟͞ू⃪ ፝͜⁞𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭✰⃔࿐', `${md}`]], fkontak)}
                      
handler.command = ['grupos','links','gruposofc','gruposoficiales']
handler.register = true
handler.exp = 33

export default handler
