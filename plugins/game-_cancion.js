const answerHandler = {
  async before(m) {
    const id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/ADIVINA EL TITULO DE LA CANCION/i.test(m.quoted.text)) return true;

    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {};
    if (!(id in this.tebaklagu)) return m.reply('El juego ha terminado');

    if (m.quoted.id == this.tebaklagu[id][0].id) {
      const json = this.tebaklagu[id][1];
      if (m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
        global.db.data.users[m.sender].cookies += this.tebaklagu[id][2];
        m.reply(`✅Correcto!\n+${this.tebaklagu[id][2]} Cookies`);
        clearTimeout(this.tebaklagu[id][3]);
        delete this.tebaklagu[id];
      } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= 0.72) {
        m.reply(`Casi!`);
      } else {
        m.reply(`❌Incorrecto!`);
      }
    }
    return true;
  },
  exp: 0,
};

export { handler, answerHandler };
