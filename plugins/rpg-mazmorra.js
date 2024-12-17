let handler = async (m, { conn, usedPrefix, command }) => {
   let user = db.data.users[m.sender]
   function explorarMazmorra(usuario) {
  const yenesEncontradas = randomNumber(10, 20); // Genera una cantidad aleatoria de monedas
  // Añade las monedas al usuario

  const probabilidadMonstruo = randomNumber(1, 16); // Probabilidad de encontrar un monstruo

  if (probabilidadMonstruo <= 15) { // Probabilidad de 30% de encontrar un monstruo
    const fuerzaUsuario = randomNumber(51, 100); // Fuerza del usuario
    const fuerzaMonstruo = randomNumber(50, 90); // Fuerza del monstruo

    if (fuerzaUsuario > fuerzaMonstruo) {
      // El usuario mata al monstruo y recibe un bono extra
      const bonoExtra = randomNumber(20, 30);
      global.db.data.users[m.sender].yenes += bonoExtra + yenesEncontradas;
      return `\`\`\`[ 🏆  ¡Encontraste un monstruo! Lo derrotaste y encontraste ${yenesEncontradas} Yenes 💴 más ➔ ${bonoExtra} como bono extra. ]\`\`\``;
    } else {
      // El monstruo mata al usuario y pierde la recompensa
      global.db.data.users[m.sender].yenes -= yenesEncontradas;
      return `\`\`\`[ ⚠️  ¡Encontraste un monstruo! El monstruo te derrotó y perdiste ➔ ${yenesEncontradas} Yenes 💴. ]\`\`\``;
    
    }
  } else {
    // No se encuentra ningún monstruo
    return `\`\`\`[ 🎆 ¡Exploraste la mazmorra y encontraste ${yenesEncontradas} Yenes 💴]\`\`\``;
    global.db.data.users[m.sender].yenes += yenesEncontradas; 
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