let handler = async (m, { conn, usedPrefix, command, text }) => {
    let txt = `☁️ *S K Y - U L T R A - P L U S* ☁️

¿Tu Nokia es muy lento y necesitas que tu bot esté activo 24/7? 📱⏳

¡Tenemos la solución perfecta para ti! 🎉 Mantén tu bot funcionando sin interrupciones con nuestros servidores, Ofrecemos servidores gratuitos y de pago a precios súper accesibles, al alcance de todos. 💸 

🖥️ *Totalmente compatible con Yuki_Suou-Bot:* Disfruta al máximo de su potencial en nuestros servidores de alto rendimiento, asegurando una experiencia fluida y de alta calidad. El staff de Yuki_Suou-Bot y Sky Ultra Plus Host se encarga de que disfrutes de todas sus funciones al máximo. ✨

🔮 \`\`\`Información del Host\`\`\`

💻 *Página:*

https://dash.skyultraplus.com

*🟢 Dashboard:*

https://dash.skyultraplus.com

⚙️ *Panel*

https://panel.skyultraplus.com

🌟 *Comunidad de WhatsApp:*

https://chat.whatsapp.com/KGPhTIfgOzZCMNqoc3R7OW

*🔵 Discord:*

https://discord.gg/zvKgtc2RBc

💚 *Canal de WhatsApp:*

https://whatsapp.com/channel/0029VakUvreFHWpyWUr4Jr0g

🗣📲 *Contacto:*

• wa.me/5214531287294

• wa.me/15167096032

• wa.me/573147616444

No esperes más y lleva tu bot al siguiente nivel con nuestro servicio de alojamiento. ¡Es fácil, rápido y económico! ✨🚀`;

    // Define redeshost o reemplaza con la URL necesaria
    let redeshost = 'https://tu-url-aqui.com'; // Reemplaza con la URL correcta

    await conn.sendMessage(m.chat, { 
        text: txt,
        contextInfo: {
            forwardedNewsletterMessageInfo: { 
                newsletterJid: '120363301598733462@newsletter', 
                serverMessageId: '', 
                newsletterName: 'Sky-Ultra-Plus ☁️' 
            }, 
            forwardingScore: 9999999,
            isForwarded: true, 
            "externalAdReply": {
                "showAdAttribution": true,
                "containsAutoReply": true,
                title: `☁️ 𝐒𝐊𝐘𝐏𝐋𝐔𝐒-𝐇𝐎𝐒𝐓 ☁️`,
                body: `¡El plus que necesitas!`,
                "previewType": "PHOTO",
                thumbnailUrl: 'https://qu.ax/wXciz.jpg', 
                sourceUrl: redeshost
            }
        }
    }, { quoted: fkontak });
}

handler.help = ['skyplus'];
handler.tags = ['info'];
handler.command = ['skyplus', 'skyultra', 'skyultraplus', 'sky', 'hosting', 'host'];

export default handler;
