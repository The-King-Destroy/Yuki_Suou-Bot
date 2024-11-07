/*- `PLUGIN BLACKBOX AI`- By Kenisawa*/

import fetch from 'node-fetch';
import { randomBytes, randomUUID } from 'crypto';

const api = 'https://www.blackbox.ai/api/chat';
const headers = {
  'User-Agent': 'Postify/1.0.0',
  'Accept': '*/*',
  'Referer': 'https://www.blackbox.ai',
  'Content-Type': 'application/json',
  'Origin': 'https://www.blackbox.ai',
  'DNT': '1',
  'Sec-GPC': '1',
  'Connection': 'keep-alive'
};

const request = (chat) => chat.map(({ files, ...rest }) => rest);
const rhex = (bytes) => randomBytes(bytes).toString('hex');
const uuid = () => randomUUID();

const config = (model) => ({
  trendingAgentMode: model[model] || {},
  userSelectedModel: defaultModel[model] || undefined,
  ...po[model]
});

const model = {
  blackbox: {},
  'llama-3.1-405b': { mode: true, id: 'llama-3.1-405b' },
  'llama-3.1-70b': { mode: true, id: 'llama-3.1-70b' },
  'gemini-1.5-flash': { mode: true, id: 'Gemini' }
};

const defaultModel = {
  'gpt-4o': 'gpt-4o',
  'claude-3.5-sonnet': 'claude-sonnet-3.5',
  'gemini-pro': 'gemini-pro'
};

const po = {
  'gpt-4o': { maxTokens: 4096 },
  'claude-3.5-sonnet': { maxTokens: 8192 },
  'gemini-pro': { maxTokens: 8192 }
};

const clear = (response) => {
  return response.replace(/\$~~~\$(.*?)\$~~~\$/g, '').trim();
};

const BlackBox = {
  async generate(chat, options, { max_retries = 5 } = {}) {
    const random_id = rhex(16);
    const random_user_id = uuid();
    chat = request(chat);

    const data = {
      messages: chat,
      id: random_id,
      userId: random_user_id,
      previewToken: null,
      codeModelMode: true,
      agentMode: {},
      ...config(options.model),
      isMicMode: false,
      isChromeExt: false,
      githubToken: null,
      webSearchMode: true,
      userSystemPrompt: null,
      mobileClient: false,
      maxTokens: 100000,
      playgroundTemperature: parseFloat(options.temperature) || 0.7,
      playgroundTopP: 0.9,
      validated: "69783381-2ce4-4dbd-ac78-35e9063feabc",
    };

    try {
      const response = await fetch(api, { method: 'POST', headers, body: JSON.stringify(data) });
      if (!response.ok) {
        throw new Error(`${await response.text()}`);
      }

      let tc = await response.text();
      let tr = clear(tc);


      if (tr.includes("$~~~$")) {
        data.mode = 'continue';
        if (!data.messages.some(msg => msg.content === tr)) {
          data.messages.push({ content: tr, role: 'assistant' });
        }

        const cor = await fetch(api, { method: 'POST', headers, body: JSON.stringify(data) });
        let ctc = await cor.text();
        tr += clear(ctc);
      }

      return tr; 

    } catch (err) {
      if (max_retries > 0) {
        console.error(err, "Intentando de nuevo...");
        return this.generate(chat, options, { max_retries: max_retries - 1 });
      } else {
        throw err;
      }
    }
  }
};

let handler = async (m, { text, usedPrefix, command, conn }) => {
  let { key } = await conn.sendMessage(m.chat, { text: "..." });
  try {
    if (!text) {
      throw new Error("¡Ingresa una pregunta para responder!\n\n*Ejemplo:* ¿Quién es el presidente de Venezuela?");
    }

    const chatMessages = [{ role: 'user', content: text }];
    const options = { model: 'blackbox', temperature: 0.7 };

    const responseMessage = await BlackBox.generate(chatMessages, options);

    await conn.sendMessage(m.chat, {
      text: responseMessage,
      edit: key,
    });
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
      edit: key,
    });
  }
};

handler.help = ['blackbox <pregunta>'];
handler.tags = ['ai'];
handler.command = /^(blackbox)$/i;

handler.limit = true;
handler.premium = false;
handler.register = true;

export default handler;