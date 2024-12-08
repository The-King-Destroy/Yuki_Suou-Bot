let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {};
    if (!text) throw m.reply(`*🌸 Ejemplo:*\n\n${usedPrefix + command} numero mensaje\n\n*🍂 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);
    
    let split = text.trim().split(/ (.+)/); 
    let jid = split[0];
    let pesan = split[1];
    
    if (!jid || !pesan) throw m.reply(`*🌸 Ejemplo:*\n\n${usedPrefix + command} numero mensaje\n\n*🍂 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);
    
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw m.reply(' El número no está registrado en WhatsApp.');
    if (jid == m.sender) throw m.reply('🌷 No puedes mandarte un mensaje a ti mismo.');
    
    let mf = Object.values(conn.menfess).find(mf => mf.status === true);
    if (mf) return !0;
    
    let id = Math.floor(1000 + Math.random() * 9000); 
    let teks = `*Hola* @${data.jid.split("@")[0]}, *recibiste un mensaje de confesión.*\n*Para* responder\n*Ejemplo: .respuesta <id> <Mensaje>*\n\n*\`ID:\`* *${id}*\n*\`MENSAJE:\`* \n\n${pesan}`.trim();
    
    await conn.relayMessage(data.jid, {
        extendedTextMessage: {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'C O N F E S A R - Y U K I _ S U O U',
                    body: '¡responder! .respuesta (id) (Mensaje)',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: 'https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T'
                }
            }
        }
    }, {}).then(() => {
        return conn.reply(m.chat, '*🌸 Respuesta enviada con éxito.*\n\n*ID del mensaje original:*' + ` *${id}*`, m, fake);
       
        conn.menfess[id] = {
            id,
            dari: m.sender,
            penerima: data.jid,
            pesan: pesan,
            status: false
        };
        return !0;
    });
}

handler.tags = ['rg'];
handler.help = ['ngl'].map(v => v + ' <número mensaje>');
handler.command = /^(ngl|nglanonimo)$/i;
handler.register = true;
handler.private = true;

export default handler;
