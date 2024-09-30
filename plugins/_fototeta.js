let handler = async (m, { conn, usedPrefix, command}) => {
await conn.reply(m.chat,`Padre nuestro, que estás en los Cielos, santificado sea tu nombre, venga tu Reino, hágase tu voluntad así en la tierra como en el cielo. y perdónanos nuestras deudas así como nosotros perdonamos a nuestros deudores, y no nos dejes caer en la tentación, mas líbranos del mal.`, estilo)
}
handler.customPrefix = /^(Fototeta|fototeta)$/i
handler.command = new RegExp
export default handler