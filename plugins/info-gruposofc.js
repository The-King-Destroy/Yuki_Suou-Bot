let media = 'https://i.ibb.co/Kzp1rHt/Yuki.jpg'; // URL de la imagen que se enviará

// Definiciones de variables adicionales
let gp4 = "Grupo de Yuki Suou"; // Un nombre o descripción del grupo
let wm = "Yuki Suou Bot"; // Marca de agua o nombre del bot

let handler = async (m, { conn, command }) => {
    console.log(`Comando recibido: ${command}`); // Mensaje de depuración

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

    // Reacción al mensaje
    await conn.sendMessage(m.chat, { react: { text: '⚡️', key: m.key } });

    let str = `*📍 GRUPO OFICIAL*

   *_〾̷̸‣⃝⃨⃛⃰⁝̵̓ᝒ̷̸͙✨̶̩ܻᝒ̷̸꯭͙𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭𓆩֟֯፝𓆪𝝣⃯ᵴͦ𝛒⃨ᷫ𝛆ͨ🄲⃪⃯𝛊ᷨ𝛂⃨ͦꝆ᷽ͭ🌸⃙̻⃮⃛⃰⁌̷̸̊͟⿻᳔̶̷̸_*
  ┃🪷❏ ${gp4}

   *_♡⃝𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾 𝓑𝓸𝓽 𝓞𝓯𝓲𝓬𝓲𝓪𝓵ᚐ҉_*
┃🌹❏ https://chat.whatsapp.com/E78uEs2qJIE0apCLB7rSQZ
   
   *_❦𝒴𝓊𝓀𝒾 𝒮𝓊𝑜𝓊 𝐵𝑜𝓣  𝒩𝐹𝒮𝒲 ☙_*
┃🍒❏ https://chat.whatsapp.com/BELmEmNjNlv36w7ElRrOKa

   *_✿:･✧ 𝒴𝒰𝒦𝐼 𝒮𝒰𝒪𝒰 𝐵𝒪𝒯 ✧･:✿_*
┃🥀❏ https://chat.whatsapp.com/BuLovToIxdiLeycG2d3xJN

   *_♡⃝𝒞𝐻𝒜𝒩𝒩𝐸𝐿 𝒴𝒰𝒦𝐼 𝒮𝒰𝒪𝒰ᚐ҉ᚐ_*
┃🌸❏ https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T
*_╰━━━━━━━━━━━━━━━━⊜_*`;

    try {
        // Enviar el mensaje con botones
        await conn.sendButton(m.chat, str, `͟͞ 𓆩ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜ৎ୭࠱࠭ ͟͞\n` + wm, media, [
            ['MENU 🌹', '#menu']
        ], null, [
            ['⏤͟͞ू⃪ ፝͜⁞𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭✰⃔࿐', `${md}`]
        ], fkontak);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error); // Mensaje de error
    }
};

handler.command = ['grupos', 'links', 'gruposofc', 'gruposoficiales'];
handler.register = true;
handler.exp = 0; // Establecer exp en cero

export default handler;
