const handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].bye = text;
    m.reply('✅ [❗] MENSAJE DE DESPEDIDA CONFIGURADO CORRECTAMENTE PARA ESTE GRUPO*');
  } else throw `[❗] INGRESE EL MENSAJE DE BIENVENIDA QUE DESEE AGREGAR, USE:*\n*- @user (mención)*\n*- @group (nombre de grupo)*\n*- @desc (description de grupo)*`;
}
handler.help = ['setbye <text>'];
handler.tags = ['grupo'];
handler.command = ['setbye'];
handler.admin = true;
export default handler;
