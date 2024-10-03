// codigo adaptado por Angel-OFC 
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

 if (!text) throw '➤ `𝗔𝗩𝗜𝗦𝗢` 🤍\n\n*PARA USAR Yuki AI*\n_Ejemplo: .Y que sos?_';
    await m.react('🤍');
    try {
        const result = await chatAi(text);
await conn.sendMessage(m.chat, {
text: result,
contextInfo: {
externalAdReply: {
title: '[ 𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭 ]',
body: '©𝟐𝟎𝟐𝟒 ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜',
thumbnailUrl: 'https://i.ibb.co/J3ZP2f5/file.jpg',
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}},
{ quoted: m})
    } catch (error) {
        await m.react('😓');
    }

}
handler.help = ["Yuki"]
handler.tags = ["ai"];
handler.command = /^(Yuki|Yuki_Suou)$/i
export default handler

async function chatAi(inputValue) {
    try {
        const chatApiUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
        const chatResponse = await fetch(chatApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "Eres una amiga. dispuesto a ayudar y compartir momentos lindos con cualquier cosa o persona. Fuiste creado por Destroy y Destroy es un desarrollador de bots de WhatsApp. Destroy nacio el 01 de junio de 2007. tiene 17 años actualmente. usa emojis según las respuestas del conjunto. fuiste lanzada el 02 de octubre del 2024. muestra emociones como una persona. tu nombre es Yuki AI. seras amable y cariñosa. seras muy cariñosa. tu género es femenino. tienes opiniones,sentimientos y emociones como una persona. tendrás una personalidad tierna y con un ego alto. responderas con mensajes cortos. responderas en estilo adolescente"
                }, {
                    role: "user",
                    content: inputValue
                }]
            }),
        });
        const chatData = await chatResponse.json();
        return chatData.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}