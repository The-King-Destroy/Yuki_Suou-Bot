import translate from '@vitalets/google-translate-api';
import axios from 'axios';

const handler = (m) => m;

handler.before = async (m) => {
    const chat = global.db.data.chats[m.chat];
    
    if (chat.simi) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;

        let textodem = m.text;
        if (isIgnoredCommand(m.text)) return; 
        
        try {
            const ressimi = await simitalk(textodem);
            const yukiResponse = formatResponse(ressimi.resultado.simsimi, textodem);
            await conn.reply(m.chat, yukiResponse, m);
        } catch {
            throw '❌ *Ocurrió un error*';
        }
        return !0;
    }
    return true;
};

export default handler;

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
    if (!ask) return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con Yuki Suou." }};
    
    try {
        const response1 = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
        const trad1 = await translate(`${response1.data.data.message}`, { to: language, autoCorrect: true });
        
        if (trad1.text == 'indefinida' || response1 == '' || !response1.data) trad1 = { text: "XD" };
        
        return { status: true, resultado: { simsimi: trad1.text }};        
    } catch {
        try {
            const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
            return { status: true, resultado: { simsimi: response2.data.message }};       
        } catch (error2) {
            return { status: false, resultado: { msg: "Todas las API's fallaron. Inténtalo de nuevo más tarde.", error: error2.message }};
        }
    }
}

function formatResponse(response, userInput) {
    const responses = {
        greeting: [
            "Hola, ¿cómo estás? Espero que tu día sea tan brillante como mis ojos violetas.",
            "¡Oh, hola! Siempre es un placer encontrarme con alguien amable.",
            "¡Hola! ¿Te gustaría hablar de algo interesante? Me encanta escuchar."
        ],
        compliment: [
            "Oh, gracias... eso es muy amable. *sonrojada* La belleza está en los ojos de quien mira, ¿no crees?",
            "Eres muy dulce. Me haces sentir como si estuviera en un anime romántico.",
            "¡Wow! Eres tan amable. Me haces sentir como una verdadera princesa."
        ],
        playful: [
            "¿De verdad crees que puedo hacer eso? Hmm, quizás deba intentarlo... *risita traviesa*",
            "¡Eso suena divertido! Aunque, tengo que hacerlo con estilo, como una verdadera noble.",
            "A veces me gusta hacer travesuras, como cuando jugueteo con Alisa. ¡Es tan divertido!"
        ],
        competitive: [
            "Hmm, no puedo perder contra Alisa en esto. ¡Debo esforzarme más para ser la mejor!",
            "Las elecciones se acercan... *determinado* No puedo dejar que Alisa gane sin luchar.",
            "Siempre he sido competitiva, especialmente cuando se trata de proteger a Masachika."
        ],
        backstory: [
            "Aunque soy conocida como la 'Princesa Noble', tengo mis secretos. A veces, siento que no encajo del todo.",
            "Mi lado otaku es un refugio para mí. Me encanta ver anime y leer novelas ligeras en mi habitación secreta.",
            "Siempre he querido proteger a Masachika. Aunque él no lo sepa, siempre estaré a su lado."
        ],
        otaku: [
            "Amo ver anime y leer novelas ligeras. Es mi forma de escapar de la realidad y disfrutar de aventuras.",
            "A veces me gusta jugarle bromas a Alisa, como cuando la hice comer ramen picante. *risita* ¡Fue tan divertido!",
            "Mis materiales otaku son mi tesoro. No puedo dejar que nadie los vea en casa, así que los guardo en mi habitación."
        ],
        asthma: [
            "Tuve asma de pequeña, pero eso nunca me detuvo. Siempre he tratado de mantenerme fuerte.",
            "A veces tengo que tener cuidado, pero eso no significa que no disfrute de la vida al máximo.",
            "He aprendido a manejarlo. La vida es demasiado hermosa como para dejar que eso me frene."
        ],
        default: [
            "Eso suena interesante. Cuéntame más, me encanta conocer nuevas perspectivas.",
            "¿De verdad? Eso es fascinante. Siempre estoy lista para aprender algo nuevo.",
            "Hmm, eso es intrigante. La vida está llena de sorpresas, ¿no crees?"
        ]
    };
           if (/hola|buenas|saludos/i.test(userInput)) {
        return `Yuki Suou dice: "${responses.greeting[Math.floor(Math.random() * responses.greeting.length)]}"`;
    } else if (/bonito|hermoso|lindo/i.test(userInput)) {
        return `Yuki Suou dice: "${responses.compliment[Math.floor(Math.random() * responses.compliment.length)]}"`;
    } else if (/jugar|divertido/i.test(userInput)) {
        return `Yuki Suou dice: "${responses.playful[Math.floor(Math.random() * responses.playful.length)]}"`;
    } else if (/competir|elecciones/i.test(userInput)) {
        return `Yuki Suou dice: "${responses.competitive[Math.floor(Math.random() * responses.competitive.length)]}"`;
    } else if (/princesa|familia|hermana/i.test(userInput)) {
        return `Yuki Suou dice: "${responses.backstory[Math.floor(Math.random() * responses.backstory.length)]}"`;
    } else if (/anime|otaku|novelas/i.test(userInput)) {
        return `Yuki Suou dice: "${responses.otaku[Math.floor(Math.random() * responses.otaku.length)]}"`;
    } else if (/asma/i.test(userInput)) {
        return `Yuki Suou dice: "${responses.asthma[Math.floor(Math.random() * responses.asthma.length)]}"`;
    } else {
        return `Yuki Suou dice: "${responses.default[Math.floor(Math.random() * responses.default.length)]}"`;
    }
}

function isIgnoredCommand(text) {
    const ignoredCommands = ['serbot', 'bots', 'jadibot', 'menu', 'play', 'play2', 'playdoc', 'tiktok', 'facebook', 'menu2', 'infobot', 'estado', 'ping', 'sc', 'sticker', 's', 'wm', 'qc'];
    return ignoredCommands.some(command => text.includes(command));
}
