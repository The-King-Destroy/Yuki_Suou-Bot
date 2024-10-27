//Codígo creado por Destroy wa.me/584120346669

// Definición del manejador
let handler = async (m, { conn }) => {
    // Reacción inicial al mensaje
    await m.react('☀️');

    // Mensajes personalizados para los buenos días
    const messages = [
        "¡Buenos días! 🌸 Espero que tu día esté lleno de alegría y oportunidades brillantes.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ ",
        "¡Buenos días! ☀️ Que este nuevo día te traiga sonrisas y momentos inolvidables.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ ",
        "¡Buenos días! 🌼 Espero que hoy encuentres belleza en cada pequeño detalle.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ ",
        "¡Buenos días! ✨ Que este día esté lleno de inspiración y que cada paso te acerque a tus sueños.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ ",
        "¡Buenos días! 🌷 Espero que hoy sea un día lleno de luz y amor.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ ",
        "¡Buenos días! 🌺 Que el día de hoy esté lleno de alegría y oportunidades para crecer.\n> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ "
    ];

    // URLs de los videos disponibles
    const videos = [
        'https://qu.ax/ZVcM.mp4',
        'https://qu.ax/tCblW.mp4',
        'https://qu.ax/kGzZr.mp4',
        'https://qu.ax/iioMV.mp4',
        'https://qu.ax/JgSvx.mp4',
        'https://qu.ax/dvrKi.mp4',
        'https://qu.ax/TZuhK.mp4'
    ];

    // Comprobación de si es un grupo
    if (!m.isGroup) {
        return await conn.sendMessage(m.chat, { text: "Este comando solo se puede usar en grupos." }, { quoted: m });
    }

    // Selección aleatoria de un video y un mensaje
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Obtener la lista de participantes del grupo
    let participants = conn.chats[m.chat].participants || [];
    let mentions = participants.map(participant => participant.jid);

    // Enviamos el video con el mensaje y menciones
    await conn.sendMessage(m.chat, { 
        video: { url: randomVideo }, 
        gifPlayback: true, 
        caption: randomMessage, 
        mentions 
    }, { quoted: m });
};

// Definición de ayuda, etiquetas y comandos
handler.help = ['dias/days'];
handler.tags = ['grupo'];
handler.command = ['dias', 'días', 'dia', 'día', 'days'];
handler.group = true;

// Exportación del manejador
export default handler;
