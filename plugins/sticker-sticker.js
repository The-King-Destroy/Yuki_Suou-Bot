import fs from 'fs';
import WebP from 'node-webpmux';
import ffmpeg from 'fluent-ffmpeg'

let handler = async (m, { conn }) => {
    let buffer;

    try {
        let v = m?.quoted ? m.quoted : m;
        let mime = (v.msg || v).mimetype || v?.mediaType || '';

        if (/image\//.test(mime)) {
            let media = await v?.download?.();

            let crop = /\-x|\-crop/i.test(m.text);
            buffer = await imageToWebp(media, crop, { author: global.packsticker2, packName: global.packsticker });
        } else if(/video/.test(mime)) {
            let media = await v?.download?.();

            let crop = /\-x|\-crop/i.test(m.text);
            buffer = await videoToWebp(media, crop, { author: global.packsticker2, packName: global.packsticker });
        } else {
            return conn.reply(m.chat, `${emoji} Por favor, envia una imagen o video para hacer un sticker.`, m);
        };

        await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m });
    } catch(e) {
        console.error(e);
    };
};
handler.help = ['stiker <img>', 'sticker <url>']
handler.tags = ['sticker']
//handler.group = true;
handler.register = true
handler.command = ['s', 'sticker', 'stiker']

export default handler

/// FUNCION CREADA POR HIDEKI PARA YUKI-BOT
const _0x183844=_0x23c3;(function(_0x1c411b,_0x5b99c0){const _0x494b37=_0x23c3,_0x3f2c54=_0x1c411b();while(!![]){try{const _0x516dc1=parseInt(_0x494b37(0x17d))/0x1+-parseInt(_0x494b37(0x160))/0x2+-parseInt(_0x494b37(0x182))/0x3+-parseInt(_0x494b37(0x16c))/0x4+-parseInt(_0x494b37(0x179))/0x5+parseInt(_0x494b37(0x181))/0x6+parseInt(_0x494b37(0x16b))/0x7;if(_0x516dc1===_0x5b99c0)break;else _0x3f2c54['push'](_0x3f2c54['shift']());}catch(_0x35432a){_0x3f2c54['push'](_0x3f2c54['shift']());}}}(_0x29f8,0x2403b));function _0x23c3(_0x52921a,_0x9f210e){const _0x29f885=_0x29f8();return _0x23c3=function(_0x23c330,_0x1639b1){_0x23c330=_0x23c330-0x159;let _0x1e49d5=_0x29f885[_0x23c330];return _0x1e49d5;},_0x23c3(_0x52921a,_0x9f210e);}function _0x29f8(){const _0x3a367e=['end','834942LkTLvj','9633YHOHed','error','floor','toFormat','crop=w=\x27min(min(iw,ih),500)\x27:h=\x27min(min(iw,ih),500)\x27,scale=500:500,setsar=1,fps=15','promises','from','-an','.webp','97054hKpZOy','libwebp','concat','unlink','save','exif','addOutputOptions','.mp4','writeUIntLE','writeFileSync','https://play.google.com/store/apps/details?id=com.snowcorp.stickerly.android','2203649UyFoXy','484836bNbyrf','readFileSync','default','Image','-ss','utf-8','stringify','-vcodec','all','webp','00:00:00','load','scale=\x27min(200,iw)\x27:min\x27(200,ih)\x27:force_original_aspect_ratio=decrease,fps=15,\x20pad=200:200:-1:-1:color=white@0.0,\x20split\x20[a][b];\x20[a]\x20palettegen=reserve_transparent=on:transparency_color=ffffff\x20[p];\x20[b][p]\x20paletteuse','1371380vNobwe','random','packName','emojis','140774uflyMX','00:00:05','-vf'];_0x29f8=function(){return _0x3a367e;};return _0x29f8();}const getRandom=(_0x11122f='',_0x1ff339=0x2710)=>Math[_0x183844(0x159)](Math[_0x183844(0x17a)]()*_0x1ff339)+_0x11122f,imageToWebp=(_0x315674,_0x499177=![],_0x3dcc5a)=>{const _0x45ef58=_0x183844;let _0x285fd9=getRandom('.jpg'),_0x406b52=getRandom('.webp'),_0x1164ea=_0x499177?_0x45ef58(0x15b):_0x45ef58(0x178);return fs[_0x45ef58(0x169)](_0x285fd9,_0x315674),new Promise((_0x31e87a,_0xf165f2)=>{const _0x3e6983=_0x45ef58;ffmpeg(_0x285fd9)['on'](_0x3e6983(0x183),_0xf165f2)['on']('end',async()=>{const _0x386548=_0x3e6983;let _0x566f9b=await writeExif(_0x406b52,_0x3dcc5a);await Promise['all']([fs[_0x386548(0x15c)][_0x386548(0x163)](_0x285fd9),fs[_0x386548(0x15c)][_0x386548(0x163)](_0x406b52)]),_0x31e87a(_0x566f9b);})[_0x3e6983(0x166)]([_0x3e6983(0x173),_0x3e6983(0x161),_0x3e6983(0x17f),_0x1164ea])[_0x3e6983(0x15a)]('webp')[_0x3e6983(0x164)](_0x406b52);});},videoToWebp=(_0x5a573e,_0x1391b5=![],_0xc4f3e8)=>{const _0x230685=_0x183844;let _0x4c8b53=getRandom(_0x230685(0x167)),_0x58f048=getRandom(_0x230685(0x15f)),_0x1849ba=_0x1391b5?_0x230685(0x15b):_0x230685(0x178);return fs[_0x230685(0x169)](_0x4c8b53,_0x5a573e),new Promise((_0x239408,_0x1decec)=>{const _0x4ace74=_0x230685;ffmpeg(_0x4c8b53)['on'](_0x4ace74(0x183),_0x1decec)['on'](_0x4ace74(0x180),async()=>{const _0xa097e9=_0x4ace74;let _0x3c690b=await writeExif(_0x58f048,_0xc4f3e8);await Promise[_0xa097e9(0x174)]([fs[_0xa097e9(0x15c)][_0xa097e9(0x163)](_0x4c8b53),fs[_0xa097e9(0x15c)][_0xa097e9(0x163)](_0x58f048)]),_0x239408(_0x3c690b);})[_0x4ace74(0x166)](['-vcodec','libwebp','-vf',_0x1849ba,'-loop','0',_0x4ace74(0x170),_0x4ace74(0x176),'-t',_0x4ace74(0x17e),'-preset',_0x4ace74(0x16e),_0x4ace74(0x15e),'-vsync','0'])[_0x4ace74(0x15a)](_0x4ace74(0x175))[_0x4ace74(0x164)](_0x58f048);});},writeExif=(_0x61ebdb,_0x1278b1={})=>{const _0x3ce8a5=_0x183844;let _0x2cb610=getRandom(_0x3ce8a5(0x15f));return new Promise(async(_0x1dc13d,_0x4a30e3)=>{const _0x1e7469=_0x3ce8a5;let _0x52936d=new WebP[(_0x1e7469(0x16f))](),_0x188c66={'android-app-store-link':_0x1e7469(0x16a),'sticker-pack-name':_0x1278b1[_0x1e7469(0x17b)]||'','sticker-pack-id':Math[_0x1e7469(0x159)](Math[_0x1e7469(0x17a)]()*0x1869f),'sticker-pack-publisher':_0x1278b1['author']||'','emojis':_0x1278b1[_0x1e7469(0x17c)]||['🚀']},_0x194b23=Buffer[_0x1e7469(0x15d)]([0x49,0x49,0x2a,0x0,0x8,0x0,0x0,0x0,0x1,0x0,0x41,0x57,0x7,0x0,0x0,0x0,0x0,0x0,0x16,0x0,0x0,0x0]),_0x256af6=Buffer['from'](JSON[_0x1e7469(0x172)](_0x188c66),_0x1e7469(0x171)),_0x36a3a5=Buffer[_0x1e7469(0x162)]([_0x194b23,_0x256af6]);_0x36a3a5[_0x1e7469(0x168)](_0x256af6['length'],0xe,0x4),await _0x52936d[_0x1e7469(0x177)](_0x61ebdb),_0x52936d[_0x1e7469(0x165)]=_0x36a3a5,await _0x52936d['save'](_0x2cb610),_0x1dc13d(fs[_0x1e7469(0x16d)](_0x2cb610)),await fs['unlinkSync'](_0x2cb610);});};
