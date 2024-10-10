let handler = async (m, { conn, command, usedPrefix }) => {
let txt = `✨ *S K A Y - U L T R A - P L U S* 

*¿Buscas un hosting de alta calidad a precios imbatibles?*  
Descubre *SkayUltraPlus*, tu solución ideal con servidores dedicados y precios accesibles  Ofrecemos un Uptime garantizado 24/7, asegurando que tus proyectos funcionen de manera óptima en todo momento.

🟢 **Información del Host**

🔮 **Dashboard:**  
• [Accede a tu Dashboard](https://dash.skyultraplus.com)

🧃 **Panel de Control:**  
• [Visita el Panel](https://panel.skyultraplus.com)

🌟 **Únete a nuestro Canal:**  
• [Canal de WhatsApp](https://whatsapp.com/channel/0029VamOVm08fewr5jix2Z3t)

⚜️ **Contacto (Gata-Lina):**  
• [Escríbenos aquí](https://wa.me/524531287294)

> *¡Únete a nuestra comunidad y disfruta de un servicio excepcional! No dejes pasar la oportunidad de llevar tus proyectos al siguiente nivel con SkayUltraPlus. ¡Estamos aquí para ayudarte! :D*' 
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
