const handler = async (m, {conn, command}) => {
  console.log(`/////////////////////////////////////////////////////////////////\n\nEl único reporte con fallos en este comando, no se presenta aquí.\n\n/////////////////////////////////////////////////////////////////`);
  m.reply('*[ 🌹 ] 𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉 Te Saluda 🥰.*');
};
handler.command = /^(saludo)$/i;
handler.owner = true;
export default handler;