let responseHandler = async (m) => {
  if (/acepto|si/i.test(m.text)) {
    return m.reply("Respuesta afirmativa recibida.");
  } else if (/rechazo|no/i.test(m.text)) {
    return m.reply("Respuesta negativa recibida.");
  }
};

responseHandler.help = ['acepto', 'rechazo'];
responseHandler.tags = ['fun'];
responseHandler.command = ['acepto', 'rechazo'];
responseHandler.group = true;
export default responseHandler;
