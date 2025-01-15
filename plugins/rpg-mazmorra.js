let handler = async (m, { conn, usedPrefix, command }) => {
   let user = db.data.users[m.sender]
   function explorarMazmorra(usuario) {
  const coinEncontradas = randomNumber(10, 20);

  const probabilidadMonstruo = randomNumber(1, 16);

  if (probabilidadMonstruo <= 15) {
    const fuerzaUsuario = randomNumber(51, 100);
    const fuerzaMonstruo = randomNumber(50, 90);

    if (fuerzaUsuario > fuerzaMonstruo) {
      const bonoExtra = randomNumber(20, 30);
      global.db.data.users[m.sender].coin += bonoExtra + coinEncontradas;
      return `\`\`\`[ 🏆  ¡Encontraste un monstruo! Lo derrotaste y encontraste ${coinEncontradas} ${moneda}, más ➔ ${bonoExtra} como bono extra. ]\`\`\``;
    } else {
      global.db.data.users[m.sender].coin -= coinEncontradas;
      return `\`\`\`[ ⚠️  ¡Encontraste un monstruo! El monstruo te derrotó y perdiste ➔ ${coinEncontradas} ${moneda}. ]\`\`\``;
    
    }
  } else {
    return `\`\`\`[ 🎆 ¡Exploraste la mazmorra y encontraste ${coinEncontradas} ${moneda}.]\`\`\``;
    global.db.data.users[m.sender].coin += coinEncontradas; 
  }
}
const result = explorarMazmorra(m.sender)
await conn.reply(m.chat, result, m)
}
handler.help = ['mazmorra']
handler.tags = ['rpg']
handler.command = ['explorar', 'mazmorra']

export default handler
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}