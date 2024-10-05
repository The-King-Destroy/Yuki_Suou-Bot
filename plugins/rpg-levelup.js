import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
let img = await (await fetch(`https://telegra.ph/file/b97148e2154508f63d909.jpg`)).buffer()
let name = conn.getName(m.sender)
let user = global.db.data.users[m.sender]
if (!canLevelUp(user.level, user.exp, global.multiplier)) {
let { min, xp, max } = xpRange(user.level, global.multiplier)
let txt = `👤 *Nombre* ${name}\n\n`
txt += `✨ *Nivel* ${user.level}\n`
txt += `🌟 *XP* ${user.exp - min} / ${xp}\n\n`
txt += `💫 No es suficiente XP *${max - user.exp}* ¡De nuevo! ✨`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)}
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
if (before !== user.level) {
let txt = `🎊 F E L I C I T A C I O N E S 🎊\n\n` 
txt += `*${before}* ➔ *${user.level}* [ ${user.role} ]\n\n`
txt += `• 🌟 Nivel anterior : ${before}\n`
txt += `• ✨ Nuevos niveles : ${user.level}\n`
txt += `• 📅 Fecha : ${new Date().toLocaleString('id-ID')}\n\n`
txt += `🚩 *Nota:* _Cuanto más a interactúes con *Yuki_suou-Bot*, mayor será tu nivel_`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)}}

handler.help = ['levelup']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.group = true;
handler.register = true
export default handler