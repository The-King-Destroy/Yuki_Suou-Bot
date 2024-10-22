let handler = async (m, { conn, args, participants, isAdmin, isBotAdmin }) => {

    // Verifica si el comando fue enviado en un grupo y si el usuario es admin

    if (!m.isGroup) return m.reply('❌ *Este comando solo se puede usar en grupos.*');

    if (!isAdmin) return m.reply('⚠️ *Solo los administradores del grupo pueden usar este comando.*');

    if (!isBotAdmin) return m.reply('🤖 *Necesito ser administrador para ejecutar este comando.*');

    // Verifica que se hayan pasado los argumentos correctos

    if (args.length < 2) return m.reply('ℹ️ *Uso correcto del comando:* \n\n*!repetir <mensaje> <cantidad>*\n\n*Ejemplo:* !repetir Hola 5');

    let message = args.slice(0, -1).join(' '); // El mensaje que se repetirá

    let count = parseInt(args[args.length - 1]); // El número de repeticiones

    // Verifica que el número de repeticiones sea válido

    if (isNaN(count) || count <= 0 || count > 20) return m.reply('🚫 *El número de repeticiones debe ser un valor entre 1 y 20.*');

    // Mensaje de confirmación antes de empezar

    await m.reply(`🔄 *Repitiendo el mensaje "${message}"* \n\n📊 *Cantidad de veces:* ${count}`);

    // Repite el mensaje la cantidad de veces especificada

    for (let i = 0; i < count; i++) {

        await m.reply(`📢 ${message}`);

    }

    // Mensaje final después de completar las repeticiones

    await m.reply(`✅ *Repetición completada correctamente.*`);

};

handler.command = /^(repetir|rep)$/i; // Comandos que activan el plugin

handler.group = true; // Solo puede usarse en grupos

handler.admin = true; // Solo lo pueden usar los administradores

export default handler;