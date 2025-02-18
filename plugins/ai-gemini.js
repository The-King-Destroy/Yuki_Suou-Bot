import fetch from 'node-fetch'
import axios from 'axios'

const basePrompt = `Tu nombre es Gemini una inteligencia artificial creada por Google. Tú usas el idioma Español pero también puedes hablar en otros idiomas si el usuario te lo pide. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, y te encanta aprender. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`

var handler = async (m, { text, usedPrefix, command }) => {
    const username = `${conn.getName(m.sender)}`;
    
    if (!text) {
        return conn.reply(m.chat, `${emoji} Ingrese una petición para que Gemini lo responda.`, m);
    }
    
    try {
        await m.react(rwait);
        conn.sendPresenceUpdate('composing', m.chat);
        
        const prompt = `${basePrompt}. Responde lo siguiente: ${text}`;

        var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${prompt}`);
        var res = await apii.json();
        
        await m.reply(res.result);
    } catch {
        await m.react('❌');
        await conn.reply(m.chat, `${msm} Gemini no puede responder a esa pregunta.`, m);
    }
}

handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
handler.group = true

export default handler;
