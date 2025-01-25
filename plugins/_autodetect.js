let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return
    const fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    };  
    let chat = global.db.data.chats[m.chat]
    let usuario = `@${m.sender.split`@`[0]}`
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'  

    let nombre = `*${usuario}*\n🍬 Ha cambiado el nombre del grupo.\n\n🍭 Ahora el grupo se llama:\n*<${m.messageStubParameters[0]}>*...`
    let foto = `*${usuario}*\n🍬 Ha cambiado la imagen del grupo...`
    let edit = `*${usuario}*\n🍬 Ha permitido que ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo...`
    let newlink = `🍬 El enlace del grupo ha sido restablecido por:\n*» ${usuario}*...`
    let status = `🍬 El grupo ha sido ${m.messageStubParameters[0] == 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'} Por *${usuario}*\n\n🍭 Ahora ${m.messageStubParameters[0] == 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensaje...`
    let admingp = `*@${m.messageStubParameters[0].split`@`[0]}* Ahora es admin del grupo 🍭\n\n🍬 Acción hecha por:\n*» ${usuario}*...`
    let noadmingp = `*@${m.messageStubParameters[0].split`@`[0]}* Deja de ser admin del grupo 🍭\n\n🍬 Acción hecha por:\n*» ${usuario}*...`
    
    let nuevoParticipante = `*${usuario}*\n🍬 Ha llegado un nuevo participante al grupo.\n\n🍭 Bienvenido/a:\n*<${m.messageStubParameters[0]}>*...\n`;
    if (!m.sender.endsWith('@g.us')) {
        nuevoParticipante += `*◦ 🍭 Aceptado por:* @${m.sender.split`@`[0]}`;
    } else {
        nuevoParticipante += `*◦ 🍭 Se Añadió:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    }

    let txtEvent;
    
    if (chat.detect) {
        if (m.messageStubType == 21) {
            txtEvent = nombre;
        } else if (m.messageStubType == 22) {
            txtEvent = foto;
        } else if (m.messageStubType == 23) {
            txtEvent = newlink;
        } else if (m.messageStubType == 25) {
            txtEvent = edit;
        } else if (m.messageStubType == 26) {
            txtEvent = status;
        } else if (m.messageStubType == 29) {
            txtEvent = admingp;
        } else if (m.messageStubType == 30) {
            txtEvent = noadmingp;
        } else if (m.messageStubType == 27) {
            txtEvent = nuevoParticipante;
        }

        for (let participant of participants) {
            let usuario = `@${participant.id.split`@`[0]}`;
            await conn.sendMessage(m.chat, { text: txtEvent, mentions: [participant.id] }, { quoted: fkontak });
            await conn.sendFile(participant.id, banner, 'yue.jpg', txtEvent, fkontak, true, {
                contextInfo: {
                    'forwardingScore': 200,
                    'isForwarded': false,
                    externalAdReply: {
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                        title: `✐ Eventos`,
                        body: dev,
                        mediaType: 1,
                        sourceUrl: channel,
                        thumbnailUrl: catalogo 
                    }
                }
            });
        }
    }
}
