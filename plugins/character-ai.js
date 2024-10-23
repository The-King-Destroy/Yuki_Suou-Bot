import Starlights from "@StarlightsTeam/Scraper"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '[ ✰ ] Qué le quieres decir a *Ai Hoshino*?.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* Holaa`, m, rcanal)
  
  try {
    let character_id = "99ab5940-1ed9-4543-825b-056f32d0690b" //Consigue el ID de tu preferencia en https://spicychat.ai
    let name = conn.getName(m.sender)
    let { msg } = await Starlights.characterAi(character_id, text, name)

    await conn.reply(m.chat, `${msg.join("\n")}`, m, rcanal)
  } catch {
    await m.react('✖️')
  }
}
handler.tags = ["tools"]
handler.help = ["ai *<texto>*"]
handler.command = ["ai", "hoshino"]
handler.register = true 
export default handler