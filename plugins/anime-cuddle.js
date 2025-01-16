//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;

    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('👥');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *se acurrucó con* ${name || who}.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *está acurrucándose con* ${name || who}.`;
    } else {
        str = `\`${name2}\` *se esta acurrucando.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/snjY.mp4'; 
        let pp2 = 'https://qu.ax/MpVBh.mp4'; 
        let pp3 = 'https://qu.ax/fLTgG.mp4';
        let pp4 = 'https://qu.ax/jDioL.mp4';
        let pp5 = 'https://qu.ax/cEGWw.mp4';
        let pp6 = 'https://qu.ax/PRgKB.mp4';
        let pp7 = 'https://qu.ax/cUfzD.mp4';
        let pp8 = 'https://qu.ax/xgsXY.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['cuddle/acurrucarse @tag'];
handler.tags = ['anime'];
handler.command = ['cuddle', 'acurrucarse'];
handler.group = true;

export default handler;