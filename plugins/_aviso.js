export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) {
    return;
  }

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (command === "bot" || command === "unbanchat") {
    return;
  }

  let chat = global.db.data.chats[m.chat];

  if (chat.isBanned) {
    const avisoDesactivado = `《✧》El bot *${botname}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`;
    
    await m.reply(avisoDesactivado);
    return;
  }

  if (!global.validCommands.includes(command)) {
    await m.reply(`《✧》El comando *${command}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
    return;
  }

  let user = global.db.data.users[m.sender];
  if (!user.commands) {
    user.commands = 0;
  }
  user.commands += 1;
}
