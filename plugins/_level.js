import { canLevelUp } from '../lib/levelling.js'

const roles = {
'*Aventurero(a) - Novato(a) V*': 0,
'*Aventurero(a) - Novato(a) IV*': 2,
'*Aventurero(a) - Novato(a) III*': 4,
'*Aventurero(a) - Novato(a) II*': 6,
'*Aventurero(a) - Novato(a) I*': 8,
'*Aprendiz del Camino V*': 10,
'*Aprendiz del Camino IV*': 12,
'*Aprendiz del Camino III*': 14,
'*Aprendiz del Camino II*': 16,
'*Aprendiz del Camino I*': 18,
'*Explorador(a) del Valle V*': 20,
'*Explorador(a) del Valle IV*': 22,
'*Explorador(a) del Valle III*': 24,
'*Explorador(a) del Valle II*': 26,
'*Explorador(a) del Valle I*': 28,
'*Guerrero(a) del Alba V*': 30,
'*Guerrero(a) del Alba IV*': 32,
'*Guerrero(a) del Alba III*': 34,
'*Guerrero(a) del Alba II*': 36,
'*Guerrero(a) del Alba I*': 38,
'*Guardián(a) de los Bosques V*': 40,
'*Guardián(a) de los Bosques IV*': 42,
'*Guardián(a) de los Bosques III*': 44,
'*Guardián(a) de los Bosques II*': 46,
'*Guardián(a) de los Bosques I*': 48,
'*Mago(a) del Crepúsculo V*': 50,
'*Mago(a) del Crepúsculo IV*': 52,
'*Mago(a) del Crepúsculo III*': 54,
'*Mago(a) del Crepúsculo II*': 56,
'*Mago(a) del Crepúsculo I*': 58,
'*Héroe(a) de la Corona V*': 60,
'*Héroe(a) de la Corona IV*': 62,
'*Héroe(a) de la Corona III*': 64,
'*Héroe(a) de la Corona II*': 66,
'*Héroe(a) de la Corona I*': 68,
'*Paladín(a) de Diamante V*': 70,
'*Paladín(a) de Diamante IV*': 72,
'*Paladín(a) de Diamante III*': 74,
'*Paladín(a) de Diamante II*': 76,
'*Paladín(a) de Diamante I*': 78,
'*Maestro(a) de las Estrellas V*': 80,
'*Maestro(a) de las Estrellas IV*': 85,
'*Maestro(a) de las Estrellas III*': 90,
'*Maestro(a) de las Estrellas II*': 95,
'*Maestro(a) de las Estrellas I*': 99,
'*Leyenda del Valle V*': 100,
'*Leyenda del Valle IV*': 110,
'*Leyenda del Valle III*': 120,
'*Leyenda del Valle II*': 130,
'*Leyenda del Valle I*': 140,
'*Soberano(a) del Reino V*': 150,
'*Soberano(a) del Reino IV*': 160,
'*Soberano(a) del Reino III*': 170,
'*Soberano(a) del Reino II*': 180,
'*Soberano(a) del Reino I*': 199,
'*Titán(a) del Norte V*': 200,
'*Titán(a) del Norte IV*': 225,
'*Titán(a) del Norte III*': 250,
'*Titán(a) del Norte II*': 275,
'*Titán(a) del Norte I*': 299,
'*Guardían(a) de la Luz V*': 300,
'*Guardían(a) de la Luz IV*': 325,
'*Guardían(a) de la Luz III*': 350,
'*Guardían(a) de la Luz II*': 375,
'*Guardían(a) de la Luz I*': 399,
'*Maestro(a) de la Magia V*': 400,
'*Maestro(a) de la Magia IV*': 425,
'*Maestro(a) de la Magia III*': 450,
'*Maestro(a) de la Magia II*': 475,
'*Maestro(a) de la Magia I*': 499,
'*Señor(a) de la Guerra V*': 500,
'*Señor(a) de la Guerra IV*': 525,
'*Señor(a) de la Guerra III*': 550,
'*Señor(a) de la Guerra II*': 575,
'*Señor(a) de la Guerra I*': 599,
'*Héroe(a) Inmortal V*': 600,
'*Héroe(a) Inmortal IV*': 625,
'*Héroe(a) Inmortal III*': 650,
'*Héroe(a) Inmortal II*': 675,
'*Héroe(a) Inmortal I*': 699,
'*Maestro(a) de la Realidad V*': 700,
'*Maestro(a) de la Realidad IV*': 725,
'*Maestro(a) de la Realidad III*': 750,
'*Maestro(a) de la Realidad II*': 775,
'*Maestro(a) de la Realidad I*': 799,
'*Sabio(a) Eterno(a) V*': 800,
'*Sabio(a) Eterno(a) IV*': 825,
'*Sabio(a) Eterno(a) III*': 850,
'*Sabio(a) Eterno(a) II*': 875,
'*Sabio(a) Eterno(a) I*': 899,
'*Viajero(a) del Multiverso V*': 900,
'*Viajero(a) del Multiverso IV*': 925,
'*Viajero(a) del Multiverso III*': 950,
'*Viajero(a) del Multiverso II*': 975,
'*Viajero(a) del Multiverso I*': 999,
'*Deidad de la Eternidad V*': 1000,
'*Deidad de la Eternidad IV*': 2000,
'*Deidad de la Eternidad III*': 3000,
'*Deidad de la Eternidad II*': 4000,
'*Deidad de la Eternidad I*': 5000,
'*Gran Monarca de las Sombras*': 10000,
}

let handler = m => m
handler.before = async function (m, { conn }) {
    
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[m.sender]
    
    let level = user.level
    let before = user.level * 1
    
    while (canLevelUp(user.level, user.exp, global.multiplier)) 
        user.level++
    
    if (before !== user.level) {
        let especial = 'coin'
        let especial2 = 'exp'
        let especialCant = Math.floor(Math.random() * (100 - 10 + 1)) + 10
        let especialCant2 = Math.floor(Math.random() * (100 - 10 + 1)) + 10

        if (user.level % 5 === 0) {
            user[especial] += especialCant
            user[especial2] += especialCant2
        }
    }

    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role

    return !0
}

export default handler
