global.math = global.math ? global.math : {};
const handler = async (m, {conn}) => {
  const id = m.chat;
  if (!m.quoted) return;
  if (m.quoted.sender != conn.user.jid) return;
  if (!/^Cuanto es el resultado de:/i.test(m.quoted.text)) return;
  if (!(m.chat in global.math)) return conn.reply(m.chat, `${emoji2} Ya se ha respondido a esa pregunta.`, m);

  if (m.quoted.id == global.math[id][0].id) {
    const math = global.math[id][1];
    if (m.text == math.result) {
      conn.reply(m.chat, `Respuesta correcta!!\nHaz ganado: ${math.bonus} XP.`, m);
      global.db.data.users[m.sender].exp += math.bonus;
      clearTimeout(global.math[id][3]);
      delete global.math[id];
    } else {
      if (--global.math[id][2] == 0) {
        conn.reply(m.chat, `Se acabaron tus oportunidades\nLa respuesta es: ${math.result}`, m);
        clearTimeout(global.math[id][3]);
        delete global.math[id];
      } else conn.reply(m.chat, `Respuesta incorrecta!!\nOportunidades disponibles ${global.math[id][2]}`, m);
    }
  }
};
handler.customPrefix = /^-?[0-9]+(\.[0-9]+)?$/;
handler.command = new RegExp;
export default handler;