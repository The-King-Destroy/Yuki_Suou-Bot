const handler = async (m, {conn, command}) => {
  console.log(`/////////////////////////////////////////////////////////////////\n\nEl único reporte con fallos en este comando, no se presenta aquí.\n\n/////////////////////////////////////////////////////////////////`);
  m.reply('*[ 🌹 ] Hmm, parece que me necesitas. Qué inesperado... 😒.*');
};
handler.command = /^(saludo)$/i;
handler.owner = true;
export default handler;