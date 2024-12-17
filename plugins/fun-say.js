let handler = async (m, { conn, args }) => {
    if (!args.length) return m.reply('ℹ️ *Por favor, ingresa un mensaje después del comando.*\n\n*Ejemplo:* #say Hola, ¿cómo están?');
    let message = args.join(' ');

    let invisibleChar = '\u200B'; // (Zero Width Space)
    let finalMessage = invisibleChar + message;
    await m.reply(finalMessage);
};
handler.command = /^(say|decir)$/i; 
handler.tag = ['fun']; 
handler.group = true; 
export default handler;
