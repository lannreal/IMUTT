const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// 1. Fungsi Generator Token (Hasil Reverse Engineering dari JS DeepAI)
function generateIslandKey(userAgent) {
    let myrandomstr = Math.round((Math.random() * 100000000000)) + "";
    
    const myhashfunction = (function() {
        const a = [];
        for (let b = 0; 64 > b;)
            a[b] = 0 | 4294967296 * Math.sin(++b % Math.PI);
        return function(input) {
            let d, e, f, g = [d = 1732584193, e = 4023233417, ~d, ~e],
                h = [],
                l = unescape(encodeURI(input)) + "\u0080",
                k = l.length;
            let c = --k / 4 + 2 | 15;
            for (h[--c] = 8 * k; ~k;)
                h[k >> 2] |= l.charCodeAt(k) << 8 * k--;
            for (let b = 0, l = 0; b < c; b += 16) {
                for (k = g; 64 > l; k = [f = k[3], d + ((f = k[0] + [d & e | ~d & f, f & d | ~f & e, d ^ e ^ f, e ^ (d | ~f)][k = l >> 4] + a[l] + ~~h[b | [l, 5 * l + 1, 3 * l + 5, 7 * l][k] & 15]) << (k = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * k + l++ % 4]) | f >>> -k), d, e])
                    d = k[1] | 0, e = k[2];
                for (l = 4; l;)
                    g[--l] += k[l];
            }
            let result = "";
            for (let l = 0; 32 > l;)
                result += (g[l >> 3] >> 4 * (1 ^ l++) & 15).toString(16);
            return result.split("").reverse().join("");
        };
    })();

    // DeepAI menggunakan navigator.userAgent (string browser asli) + salt untuk enkripsi
    const tryitApiKey = 'tryit-' + myrandomstr + '-' + myhashfunction(userAgent + myhashfunction(userAgent + myhashfunction(userAgent + myrandomstr + 'hackers_become_a_little_stinkier_every_time_they_hack')));
    return tryitApiKey;
}

async function generateImage(promptText, isQualityMode, style, negativePrompt) {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
    
    // 2. Generate API Key segar setiap kali script dijalankan!
    const apiKey = generateIslandKey(userAgent);
    // console.log("Menciptakan API Key baru:", apiKey);

    const form = new FormData();
    form.append('text', promptText);
    if (negativePrompt && negativePrompt.trim() !== '') {
        form.append('negative_prompt', negativePrompt);
    }
    form.append('width', '640');
    form.append('height', '640');
    form.append('image_generator_version', style || 'hd');
    form.append('use_new_model', 'false');
    form.append('use_old_model', 'false');
    form.append('quality', isQualityMode ? 'true' : 'false');
    form.append('generation_source', 'img');

    const headers = {
        ...form.getHeaders(),
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9,id;q=0.8',
        'api-key': apiKey,
        'User-Agent': userAgent,
        'sec-ch-ua': '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'Origin': 'https://deepai.org',
        'Referer': 'https://deepai.org/machine-learning-model/text2img'
    };

    try {
        const response = await axios.post('https://api.deepai.org/api/text2img', form, { 
            headers: headers 
        });

        const outputUrl = response.data.output_url;
        
        return {
            status: "success",
            prompt: promptText,
            style: style || 'hd',
            quality_mode: isQualityMode,
            negative_prompt: negativePrompt || null,
            download_url: outputUrl
        };
        
    } catch (error) {
        const errorResult = {
            status: "error",
            message: error.message,
            details: error.response ? error.response.data : null
        };
        throw errorResult;
    }
}

async function uploadAttachment(filePath) {
    if (!fs.existsSync(filePath)) throw new Error("Berkas tidak ditemukan: " + filePath);
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    
    const headers = {
        ...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Origin': 'https://deepai.org',
        'Referer': 'https://deepai.org/chat'
    };

    try {
        const response = await axios.post('https://api.deepai.org/chat_attachments/upload', form, { headers });
        if (response.data && response.data.success && response.data.attachment) {
            return response.data.attachment.uuid;
        }
        throw new Error("Gagal mengunggah gambar.");
    } catch (e) {
        throw new Error(e.response ? JSON.stringify(e.response.data) : e.message);
    }
}

async function generateChat(messages, model = 'standard', attachmentUuids = []) {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
    const apiKey = generateIslandKey(userAgent);
    
    // Fallback uuid in case crypto isn't available
    const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    
    const sessionId = uuid();
    const requestId = uuid();

    const form = new FormData();
    form.append('chat_style', 'chat');
    form.append('chatHistory', JSON.stringify(messages));
    form.append('model', model);
    form.append('session_uuid', sessionId);
    form.append('sensitivity_request_id', requestId);
    form.append('hacker_is_stinky', 'very_stinky');
    form.append('enabled_tools', JSON.stringify(["image_generator","image_editor"]));
    
    // Kumpulkan semua attachment_uuids dari histori pesan
    let allAttachmentUuids = [];
    messages.forEach(msg => {
        if (msg.attachment_uuids && Array.isArray(msg.attachment_uuids)) {
            allAttachmentUuids.push(...msg.attachment_uuids);
        }
    });
    
    // Gabungkan dengan attachmentUuids yang dipasangkan langsung
    if (attachmentUuids && attachmentUuids.length > 0) {
        allAttachmentUuids.push(...attachmentUuids);
    }
    
    if (allAttachmentUuids.length > 0) {
        form.append('attachment_uuids', JSON.stringify([...new Set(allAttachmentUuids)]));
    }

    const headers = {
        ...form.getHeaders(),
        'api-key': apiKey,
        'User-Agent': userAgent,
        'Origin': 'https://deepai.org',
        'Referer': 'https://deepai.org/chat'
    };

    try {
        const response = await axios.post('https://api.deepai.org/hacking_is_a_serious_crime', form, { headers });
        return {
            status: "success",
            response: response.data,
            history: [...messages, { role: "assistant", content: response.data }]
        };
    } catch (error) {
        const errorResult = {
            status: "error",
            message: error.message,
            details: error.response ? error.response.data : null
        };
        throw errorResult;
    }
}

// =========================================================================
// DUAL MODE: CLI INTERFACE & REST API
// =========================================================================

const express = require('express');
const cors = require('cors');

function runRestApi() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post('/api/generate', async (req, res) => {
      try {
          const { prompt, isQuality, style, negativePrompt } = req.body;
          if (!prompt) return res.status(400).json({ error: "Prompt is required" });
          
          const isQualityMode = isQuality !== false; 
          console.log(`[+] API Request received: "${prompt}"`);
          
          const result = await generateImage(prompt, isQualityMode, style, negativePrompt);
          return res.json(result);
      } catch (error) {
          console.error("[-] Request failed:", error.message || error);
          return res.status(500).json(error);
      }
  });

  app.post('/api/chat', async (req, res) => {
      try {
          const { messages, model, attachment_uuids } = req.body;
          if (!messages || !Array.isArray(messages)) {
              return res.status(400).json({ error: "Messages array is required. Format: [{role: 'user', content: 'hello'}]" });
          }
          
          console.log(`[+] Chat Request received. Messages count: ${messages.length}, Model: ${model || 'standard'}`);
          const result = await generateChat(messages, model || 'standard', attachment_uuids || []);
          return res.json(result);
      } catch (error) {
          console.error("[-] Chat Request failed:", error.message || error);
          return res.status(500).json(error);
      }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`\n==================================================`);
      console.log(` 🚀 NEXUS REST API IS RUNNING ON PORT ${PORT} 🚀`);
      console.log(`==================================================`);
      console.log(`- Endpoint 1 (Image): POST http://localhost:${PORT}/api/generate`);
      console.log(`- Endpoint 2 (Chat):  POST http://localhost:${PORT}/api/chat`);
      console.log(`==================================================\n`);
  });
}

// =========================================================================
// UI UTILITIES
// =========================================================================

const colors = { 
  reset: "\x1b[0m", 
  bold: "\x1b[1m", 
  dim: "\x1b[2m",
  cyan: "\x1b[36m", 
  green: "\x1b[32m", 
  yellow: "\x1b[33m", 
  red: "\x1b[31m",
  magenta: "\x1b[35m" 
};

function createSpinner(text) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  if (process.stdout.write) process.stdout.write('\x1b[?25l'); 
  const timer = setInterval(() => {
    if (process.stdout.clearLine) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`${colors.cyan}${frames[i]}${colors.reset} ${text}`);
    } else {
        // Fallback for non-TTY
        if (i === 0) console.log(`${colors.cyan}⏳${colors.reset} ${text}`);
    }
    i = (i + 1) % frames.length;
  }, 80);

  return () => {
    clearInterval(timer);
    if (process.stdout.clearLine) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write('\x1b[?25h');
    }
  };
}
async function typeWriter(text, speed = 10) {
  for (let i = 0; i < text.length; i++) {
    process.stdout.write(text[i]);
    await new Promise(r => setTimeout(r, speed));
  }
  console.log();
}

function runCliImage() {
  const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
  
  console.log(); // Blank line for spacing

  
  readline.question(` ${colors.cyan}▪${colors.reset} Mode Eksekusi [1: Speed, 2: Quality] (Def: 2): `, (mode) => {
    const isQuality = mode.trim() !== '1';
    
    readline.question(` ${colors.cyan}▪${colors.reset} Deskripsi Visual (Prompt): `, async (prompt) => {
      if (!prompt) {
        console.log(`\n${colors.red}✖ Kesalahan: Prompt wajib diisi.${colors.reset}\n`);
        readline.close();
        return;
      }
      
      console.log("");
      const stopSpinner = createSpinner('Memproses sintesis gambar...');
      
      try {
        const result = await generateImage(prompt, isQuality);
        stopSpinner();
        
        console.log(`${colors.green}✔ Proses Selesai${colors.reset}\n`);
        console.log(`${colors.dim}Format     :${colors.reset} ${isQuality ? 'High-Definition' : 'Standard'}`);
        console.log(`${colors.dim}Resolusi   :${colors.reset} ${isQuality ? 'Tinggi (Lebih Lambat)' : 'Rendah (Cepat)'}`);
        console.log(`${colors.dim}Tautan Web :${colors.reset} ${colors.cyan}${colors.bold}${result.download_url}${colors.reset}\n`);
        
      } catch (err) {
        stopSpinner();
        console.log(`${colors.red}✖ Gagal memproses gambar:${colors.reset} ${err.message}\n`);
      }
      
      readline.close();
    });
  });
}

function runCliChat() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(); // Blank line for spacing
  
  const chatModels = [
    { id: 'standard', name: 'Standard' },
    { id: 'deepseek-v3.2', name: 'DeepSeek V3.2' },
    { id: 'gpt-oss-120b', name: 'GPT OSS 120B' },
    { id: 'llama-4-scout', name: 'Llama 4 Scout', vision: true },
    { id: 'llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant' },
    { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite', vision: true },
    { id: 'gemma-4', name: 'Gemma 4', vision: true },
    { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano' },
    { id: 'gpt-5-nano', name: 'GPT-5 Nano', vision: true }
  ];

  console.log(` ${colors.dim}Katalog Model Kecerdasan Buatan:${colors.reset}`);
  chatModels.forEach((model, index) => {
      const visionTag = model.vision ? ` ${colors.dim}[Vision]${colors.reset}` : '';
      console.log(`   ${colors.cyan}${String(index + 1).padStart(2, ' ')}.${colors.reset} ${model.name}${visionTag}`);
  });
  
  readline.question(`\n ${colors.cyan}▪${colors.reset} Konfigurasi Model [Def: 1]: `, (modelInput) => {
    const modelIndex = parseInt(modelInput.trim()) - 1;
    const selectedModel = (modelIndex >= 0 && modelIndex < chatModels.length) ? chatModels[modelIndex].id : 'standard';
    const modelName = chatModels.find(m => m.id === selectedModel).name;
    
    console.log(`${colors.dim}────────────────────────────────────────────────────────${colors.reset}`);
    console.log(` ${colors.dim}Sesi aktif   :${colors.reset} ${modelName}`);
    console.log(` ${colors.dim}Koneksi      :${colors.reset} Stabil (By-pass Token)`);
    console.log(` ${colors.dim}Perintah     :${colors.reset} Ketik 'exit' untuk mengakhiri sesi`);
    console.log(`${colors.dim}────────────────────────────────────────────────────────${colors.reset}\n`);

    let messages = [];

    const chatLoop = () => {
      readline.question(`${colors.bold}USER${colors.reset}  > `, async (input) => {
        const text = input.trim();
        if (text.toLowerCase() === 'exit' || text.toLowerCase() === 'quit') {
          console.log(`\n${colors.dim}Sesi diakhiri. Sampai jumpa.${colors.reset}\n`);
          readline.close();
          return;
        }
        if (!text) return chatLoop();

        let attachmentUuids = [];
        let promptText = text;
        
        // Regex untuk menangkap command [image] <path> [prompt]
        // Contoh: [image] C:\foto.jpg Tolong jelaskan
        const imgMatch = text.match(/^\[image\]\s*(?:"([^"]+)"|'([^']+)'|([^\s]+))(.*)/i);
        if (imgMatch) {
            const filePath = (imgMatch[1] || imgMatch[2] || imgMatch[3]).trim();
            const remainingText = imgMatch[4].trim();
            promptText = remainingText || "Tolong jelaskan gambar ini.";
            
            const supportedModels = ['gemini-2.5-flash-lite', 'gemma-4', 'gpt-5-nano', 'llama-4-scout'];
            if (!supportedModels.includes(selectedModel)) {
                console.log(`\n${colors.red}SYS${colors.reset}   > Kesalahan: Model '${selectedModel}' tidak mendukung input gambar!`);
                console.log(`         Gunakan model: Gemini 2.5 Flash Lite, Gemma 4, GPT-5 Nano, atau Llama 4 Scout.\n`);
                return chatLoop();
            }
            
            const stopUploadSpinner = createSpinner(`Mengunggah gambar...`);
            try {
                const uuid = await uploadAttachment(filePath);
                attachmentUuids.push(uuid);
                stopUploadSpinner();
                console.log(`${colors.green}SYS${colors.reset}   > Gambar terkirim: ${filePath}`);
            } catch (err) {
                stopUploadSpinner();
                console.log(`${colors.red}SYS${colors.reset}   > Gagal mengunggah gambar: ${err.message}\n`);
                return chatLoop();
            }
        }

        const newMessage = { role: "user", content: promptText };
        if (attachmentUuids.length > 0) {
            newMessage.attachment_uuids = attachmentUuids;
        }
        messages.push(newMessage);
        
        const stopSpinner = createSpinner('Menganalisis respons...');

        try {
          const result = await generateChat(messages, selectedModel, attachmentUuids);
          stopSpinner();
          
          process.stdout.write(`${colors.cyan}${colors.bold}AI${colors.reset}    > `);
          await typeWriter(result.response, 15);
          console.log("");
          messages = result.history;
        } catch (err) {
          stopSpinner();
          console.log(`${colors.red}SYS${colors.reset}   > Kesalahan Jaringan: ${err.message}\n`);
          messages.pop(); // Hapus pesan yang gagal dikirim
        }
        
        chatLoop();
      });
    };

    chatLoop();
  });
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--api')) {
    runRestApi();
  } else if (args.includes('--cli') || args.includes('--image')) {
    runCliImage();
  } else if (args.includes('--chat')) {
    runCliChat();
  } else {
    const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
    
    console.log(`\n ${colors.dim}Modul Tersedia:${colors.reset}`);
    console.log(`   ${colors.cyan}1.${colors.reset} Text-to-Image Generator`);
    console.log(`   ${colors.cyan}2.${colors.reset} REST API Server Daemon`);
    console.log(`   ${colors.cyan}3.${colors.reset} Neural Chat Interface\n`);
    readline.question(` ${colors.cyan}▪${colors.reset} Pilih Modul [Def: 1]: `, (answer) => {
      readline.close();
      const choice = answer.trim();
      if (choice === '2') {
        runRestApi();
      } else if (choice === '3') {
        runCliChat();
      } else {
        runCliImage();
      }
    });
  }
}

module.exports = {
  generateIslandKey,
  generateImage,
  generateChat
};
