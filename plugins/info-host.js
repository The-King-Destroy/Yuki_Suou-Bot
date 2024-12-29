let handler = async (m, { conn, usedPrefix, command, text }) => {
    let txt = `✿ *M A S H A  -  H O T S* ✿

¿Tu Nokia es muy lento y necesitas que tu bot esté activo 24/7? ⴵ

♛ ¡Tenemos la solución perfecta para ti! 🜸 Mantén tu bot funcionando sin interrupciones con nuestros servidores, Ofrecemos servidores de calidad a precios accesibles. ⛁

➨ Totalmente compatible con Yuki-Suou-Bot. Disfruta al máximo de su potencial en nuestros servidores de alto rendimiento, asegurando una experiencia fluida y de alta calidad. El staff de Yuki-Suou-Bot y Masha-Hots se encarga de que disfrutes de todas sus funciones al máximo.

❒ \`\`\`Información del Host\`\`\`

✦ *Dashboard:*

https://dash.masha-host.shop

✰ *Panel*

https://panel.masha-host.shop

✧ *Comunidad de WhatsApp:*

https://chat.whatsapp.com/Fz9rCXegzos1Yh0qHkxGhD

✐ *Canal de WhatsApp:*

https://whatsapp.com/channel/0029VaoyLfA0LKZKjEh5Yh1J

❀ *Contactos:*

• wa.me/595976230899

• wa.me/522431268546

• wa.me/584148256527

No esperes más y lleva tu bot al siguiente nivel con nuestro servicio de alojamiento. ¡Es fácil, rápido y económico! ♡`;

    let redeshost = 'https://whatsapp.com/channel/0029VaoyLfA0LKZKjEh5Yh1J';

    await conn.sendMessage(m.chat, { 
        text: txt,
        contextInfo: {
            forwardedNewsletterMessageInfo: { 
                newsletterJid: '120363338362822764@newsletter', 
                serverMessageId: '', 
                newsletterName: '♡ Masha-Hots Hosting ♡' 
            }, 
            forwardingScore: 9999999,
            isForwarded: true, 
            "externalAdReply": {
                "showAdAttribution": true,
                "containsAutoReply": true,
                title: `✦ 𝐌𝐚𝐬𝐡𝐚-𝐇𝐨𝐭𝐬 𝐇𝐨𝐬𝐭𝐢𝐧𝐠 ✦`,
                body: `¡El Hots que necesitas!`,
                "previewType": "PHOTO",
                thumbnailUrl: 'https://qu.ax/aHudo.jpg', 
                sourceUrl: redeshost
            }
        }
    }, { quoted: fkontak });
}

handler.help = ['masha'];
handler.tags = ['info'];
handler.command = ['masha', 'hosting', 'host'];

export default handler;
