const handler = async (m, { conn }) => {
    const user = global.db.data.users[m.sender];
        conn.sendMessage(m.chat, {text: `🌸 *@${m.sender.split('@')[0]} Pos Ahora tienes recursos ilimitados :v*`, mentions: [m.sender]}, {quoted: fkontak});
      global.db.data.users[m.sender].coins = Infinity;
    global.db.data.users[m.sender].yenes = Infinity;
  global.db.data.users[m.sender].level = Infinity;
 global.db.data.users[m.sender].exp = Infinity;
};
handler.help = ['chetar'];
handler.tags = ['owner'];
handler.command = ['ilimitado', 'infiniy', 'chetar'];
handler.rowner = true;
handler.fail = null;
export default handler;
