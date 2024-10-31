const handler = async (m, {conn, text}) => {

if (!text) return await conn.reply(m.chat, `🚩 Y el texto que quiere transmitir al canal?`, m)

try {
await m.react(rwait)

await conn.reply(m.chat, `🚩 El texto se envió correctamente al canal.`, m, fake)
await conn.reply(global.channelid, text, null, fake)
await m.react(done)

} catch {
await conn.reply(m.chat, `🐢 No se pudo enviar el mensaje al canal.`, m, rcanal)
await m.react(error)}}

handler.command = ['enviarmsg', 'enviarmsgcanal', 'enviarmsgchannel']
handler.rowner = true
export default handler