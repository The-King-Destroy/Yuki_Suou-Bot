export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) {
    return;
  }

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (command === "bot") {
    return;
  }

  let chat = global.db.data.chats[m.chat];

  if (chat.isBanned) {
    const avisoDesactivado = `《✧》El bot *${botname}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`;
    
    if (!global.validCommands.includes(command)) {
      return;
    }
    
    await m.reply(avisoDesactivado);
    return;
  }

  let user = global.db.data.users[m.sender];
  if (!user.commands) {
    user.commands = 0;
  }
  user.commands += 1;
}
