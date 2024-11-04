let media = './src/Grupo.mp4'; // Ruta del archivo de video

let handler = async (m, { conn, command }) => {
    // Asumimos que m.chat es el chat correcto

    let fkontak = {
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

    await m.react('🌷'); // Reacción al mensaje

    let str = `*📍 GRUPOS OFICIALES*

   *_〾̷̸‣⃝⃨⃛⃰⁝̵̓ᝒ̷̸͙🌹̶̩ܻᝒ̷̸꯭͙𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭𓆩֟֯፝𓆪𝝣⃯ᵴͦ𝛒⃨ᷫ𝛆ͨ🄲⃪⃯𝛊ᷨ𝛂⃨ͦꝆ᷽ͭ🍁⃝⃙̻⃮̋⃛⃰⁌̷̸̊͟⿻᳔̶̷̸_*
  ┃🪷❏ ${gp4}

   *_ ͟͞〾⃝̵͡♡⃝𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾 𝓑𝓸𝓣 𝒩𝐹𝒮𝒲☙_*
┃🥀❏ https://chat.whatsapp.com/E78uEs2qJIE0apCLB7rSQZ
   
   *_❦𝒴𝓊𝓚𝒾 𝒮𝓊𝒪𝒰 𝐵𝒪𝒯  𝒩𝐹𝒮𝒲☙_*
┃🍒❏ https://chat.whatsapp.com/BELmEmNjNlv36w7ElRrOKa

   *_✿:･ﾟ✧ 𝒴𝒰𝒦𝐼 𝒮𝒰𝒪𝒰 𝐵𝒪𝒯 ✧ﾟ･:✿_*
┃🌹❏ https://chat.whatsapp.com/BuLovToIxdiLeycG2d3xJN

   *_♡⃝𝒞𝐻𝒜𝒩𝒩𝐸𝐿 𝒴𝒰𝒦𝐼 𝒮𝒰𝒪𝒰ᚐ҉ᚐ_*
┃🌹❏ https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T
*_╰━━━━━━━━━━━━━━━━⊜_*`;

    try {
        // Enviar video directamente sin botones
        await conn.sendMessage(m.chat, { video: { url: media }, caption: str });
    } catch (error) {
        console.error('Error al enviar el video:', error); // Mensaje de error
    }
};

handler.command = ['grupos', 'links', 'gruposofc', 'gruposoficiales'];
handler.register = true;
handler.exp = 33; // Puedes cambiar esto a 0 si lo deseas

export default handler;
