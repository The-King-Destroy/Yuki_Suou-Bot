//Código creando por LAN sígueme en ig https://www.instagram.com/lansg___/

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;
    const viper = /viper|vik|miau|maw|evil/i;
    if (viper.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/ypQ59NZ/Abstract-All.webp', '', '', m);
        }
    }
    const kassie = /kassie|kass|kas|casi/i;
    if (kassie.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/8stv66m/Abstract-All.webp', '', '', m);
        }
    }
    const narrador = /narrador|emanuel|emmanuel/i;
    if (narrador.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/VCLgZyh/Abstract-All.webp', '', '', m);
        }
    }
    const mani = /mani/i;
    if (mani.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/98K9w5p/Abstract-All.webp', '', '', m);
        }
    }
    
    const lan = /lan|ñioks|hoobls|ñiobs|jols|cocks|boobs/i;
    if (lan.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/Jr39HC7/Abstract-All.webp', `, `, m);
        }
    }
    const elias = /elias|elías/i;
    if (elias.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/C0mXqJL/Abstract-All.webp', `, `, m);
        }
    }
        
    const lil = /lil|weed/i;
    if (lil.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/jfrQyCG/Abstract-All.webp', `, `, m);
        }
    }
    const eze = /eze|ezequiel/i;
    if (eze.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/zf5FpkK/Abstract-All.webp', `, `, m);
        }
    }
    const tesis = /tesis|teiz|teis|fz/i;
    if (tesis.test(m.text)) {
        if (m.fromMe) {
            return;
        }
        if (global.db.data.users[m.sender].banned == true) {
            return;
        }
        if (global.db.data.users[m.sender].banned == false) {
            await conn.sendFile(m.chat, 'https://i.ibb.co/vk3C3DK/Abstract-All.webp', `, `, m);
        }
    }
    return !0;
}