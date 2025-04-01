import fetch from 'node-fetch'
var handler = async (m, { text,  usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `${emoji} Ingrese una petición para que Gemini lo responda.`, m)
try {
await m.react(rwait)
conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
var res = await apii.json()
await m.reply(res.result)
} catch {
await m.react('❌')
await conn.reply(m.chat, `${msm} Gemini no puede responder a esa pregunta.`, m)
}}
handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
handler.group = true

export default handler
