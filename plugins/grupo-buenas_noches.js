//Codígo creado por Destroy wa.me/584120346669

// Definición del manejador
let handler = async (m, { conn }) => {
    // Reacción inicial al mensaje
    await m.react('🌙');

    // Mensajes personalizados para las buenas noches
    const messages = [
        "¡Buenas noches! 🌜 Espero que tengas un descanso reparador y sueñes con cosas hermosas.\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ ",
        "¡Buenas noches! 🌟 Que la tranquilidad de la noche te envuelva y te prepare para un nuevo día.\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ ",
        "¡Buenas noches! 🌌 Recuerda que cada estrella en el cielo es un sueño esperando a hacerse realidad.\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ ",
        "¡Buenas noches! 🌙 Deja atrás las preocupaciones de hoy y abraza la paz de la noche.",
        "¡Buenas noches! 🌠 Espero que tus sueños sean tan brillantes como las estrellas que iluminan el cielo.\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ ",
        "¡Buenas noches! 💤 Que encuentres serenidad en el silencio de la noche y te despiertes renovado.\n> ৎ୭࠭͢𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭ⷭ𓆪͟͞ "
    ];

    // URLs de los videos disponibles
    const videos = [
        'https://files.catbox.moe/0n2bf5.mp4',
        'https://files.catbox.moe/zua131.mp4',
        'https://files.catbox.moe/0im4vk.mp4',
        'https://files.catbox.moe/9cm0x9.mp4',
        'https://files.catbox.moe/7kxjhv.mp4',
        'https://files.catbox.moe/id09sr.mp4',
        'https://files.catbox.moe/3kyhf0.mp4',
        'https://files.catbox.moe/4qokmi.mp4'
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
handler.help = ['noches/nights'];
handler.tags = ['grupo'];
handler.command = ['noches','noche','nights'];
handler.group = true;

// Exportación del manejador
export default handler;
