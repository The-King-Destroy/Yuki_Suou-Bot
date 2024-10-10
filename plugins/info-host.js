let handler = async (m, { conn, command, usedPrefix }) => {
let txt = `✨ *S K A Y - U L T R A - P L U S* 

*¿Quieres un Host de calidad y con bajos precios?*
Pues te presento a *SkayUltraPlus*, un hosting de calidad con servidores dedicados y precios accesibles, estos servidores están destinados a ofrecerte un Uptime 24/7 para que puedas alojar tus proyectos y qué estos funcionen de manera eficaz, qué esperás para unirte.

🟢 \`\`\`Información del Host\`\`\`

🔮 *Dashboard:* 
• https://dash.skyultraplus.com

🧃 *Panel:*
• https://panel.skyultraplus.com

🌟 *Canal:*
• https://whatsapp.com/channel/0029VamOVm08fewr5jix2Z3t

⚜️ *Contacto (Gata-Lina)*
https://wa.me/524531287294

> *Únete a está comunidad y disfruta de un servicio de calidad :D*` 
await conn.sendMessage(m.chat, { text: txt,
contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: `✨ S K A Y - U L T R A - P L U S ✨`,
body: `⚜️ Super Hosting 24/7 ⚜️`,
"previewType": "PHOTO",
thumbnailUrl: 'https://qu.ax/VsQcv.png', 
sourceUrl: 'https://dash.skyultraplus.com'}}},
{ quoted: fkontak})
}
handler.tags =['info'] 
handler.help = ['host', 'hosting'] 
handler.command = ['host', 'olympus', 'olympushost', 'hosting']
export default handler
