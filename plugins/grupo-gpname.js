import Presence from '@whiskeysockets/baileys';
const handler = async (m, {conn, args, text}) => {
  if (!text) throw `${emoji} Por favor, ingresé el nuevo nombre qué desea ponerle al grupo.`;
  try {
    const text = args.join` `;
    if (!args || !args[0]) {
    } else {
      conn.groupUpdateSubject(m.chat, text);
    }
  } catch (e) {
    throw `${msm} Ocurrió un error.`;
  }
};
handler.help = ['gruponame <text>'];
handler.tags = ['grupo'];
handler.command = ['gpname', 'groupname']
handler.group = true;
handler.admin = true;

export default handler;