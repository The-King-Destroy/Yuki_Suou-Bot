import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, {conn, text, command, args, usedPrefix}) => {

    if (!text) {
        conn.reply(m.chat, '✍️ Te faltó el texto para hablar con *Yuki-Bot*', m, rcanal);
        return;
    }

    try {
        const resSimi = await simitalk(text);
        console.log(resSimi); // Ver qué contiene la respuesta

        // Validar si el texto está definido y es de tipo string
        if (resSimi.resultado.simsimi && typeof resSimi.resultado.simsimi === 'string') {
            // Enviar el mensaje deshabilitando la vista previa de enlaces
            conn.sendMessage(m.chat, { text: resSimi.resultado.simsimi }, { quoted: m, linkPreview: false });
        } else {
            throw '⚙️ *Ocurrió un error con la respuesta de Simsimi*';
        }

    } catch (error) {
        console.error(error);
        throw '⚙️ *Ocurrió un error*';
    }
};

handler.help = ['simi', 'bot'];
handler.tags = ['ai'];
handler.group = true;
handler.register = true;
handler.command = ['simi','bot','alexa','yuki','ai'];

export default handler;

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
    if (!ask) return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con simsimi." }};
    
    try {
        const response1 = await axios.get(`https://deliriusapi-official.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
        const trad1 = await translate(`${response1.data.data.message}`, {to: language, autoCorrect: true});
        
        if (trad1.text === 'indefinida' || response1 === '' || !response1.data) throw new Error("Primera API fallida");
        
        return { status: true, resultado: { simsimi: trad1.text }};        

    } catch (error1) {
        try {
            const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
            return { status: true, resultado: { simsimi: response2.data.message }};       

        } catch (error2) {
            return { status: false, resultado: { msg: "Todas las API's fallaron. Inténtalo de nuevo más tarde.", error: error2.message }};
        }
    }
}
