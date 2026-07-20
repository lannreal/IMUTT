<div align="center">
  
  <br>
  <h1>⚡ NEXUS AI</h1>
  
  <!-- Subtle, professional typing animation -->
  <a href="#"><img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=500&size=16&pause=2000&color=A9A9A9&center=true&vCenter=true&width=600&lines=Advanced+DeepAI+Reverse-Engineering+Client;Bypassing+Token+Limitations+Dynamically;Providing+HD+Image+Generation+%26+Vision+AI;Built+for+CLI+and+REST+API+Integrations" alt="Typing SVG" /></a>

  <br>

  <!-- Clean, professional badges -->
  <a href="#"><img src="https://img.shields.io/badge/Runtime-Node.js%20v16+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Architecture-CLI%20%7C%20REST%20API-007ACC?style=flat-square" alt="Architecture"></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/Status-Active%20%26%20Stable-success?style=flat-square" alt="Status"></a>

</div>

<br>

---

## 📖 Overview

**NEXUS AI** (`dp.js`) is an advanced, unofficial client and backend server for DeepAI. Engineered with dynamic token-generation algorithms, it seamlessly bypasses standard platform limitations, granting developers untethered access to premium AI models, high-definition image generation, and native Vision AI capabilities.

Designed with enterprise-grade stability, NEXUS AI operates in two robust environments:
1. **Interactive CLI** for personal terminal usage with graceful fallback rendering.
2. **REST API Daemon** for seamless integration into third-party web backends, Discord bots, and mobile applications.

---

## ✨ Core Features

| Feature | Description | Status |
| :--- | :--- | :---: |
| 🛡️ **Dynamic Token Generation** | Reverse-engineered `generateIslandKey` payload that generates a fresh cryptographic signature per request, preventing 401/403 blocks. | ✅ |
| 🖼️ **HD Image Synthesis** | Programmatic access to DeepAI's High-Definition Text-to-Image pipeline with Negative Prompt support. | ✅ |
| 🧠 **Premium Neural Chat** | Bypassed access to 10 world-class LLMs (including GPT-4, Llama 3.3, and DeepSeek) with full conversation history retention. | ✅ |
| 👁️ **Vision AI (Image Input)** | Native file-upload support mapped to Vision-capable models for deep visual analysis. | ✅ |
| 🔌 **Headless REST API** | A built-in Express.js daemon mapping complex CLI flows into standard HTTP JSON endpoints. | ✅ |

---

## 📦 Supported Models

The architecture currently supports and intercepts 10 distinct AI models. Models tagged with `[Vision]` natively support image attachments and visual reasoning.

- `standard` (Default)
- `deepseek-v3.2`
- `gpt-oss-120b`
- `llama-4-scout` **`[Vision]`**
- `llama-3.3-70b-instruct`
- `llama-3.1-8b-instant`
- `gemini-2.5-flash-lite` **`[Vision]`**
- `gemma-4` **`[Vision]`**
- `gpt-4.1-nano`
- `gpt-5-nano` **`[Vision]`**

---

## 🚀 Usage Guide

### 1. Interactive CLI Mode

Launch the unified CLI interface directly from your terminal:
```bash
node dp.js
```
*Select Module 1 for Image Generation, Module 2 for API Server, or Module 3 for Neural Chat.*

> **💡 Pro-Tip: Using Vision AI in CLI**
> To analyze a local image, select a `[Vision]` supported model and prepend your prompt with the `[image]` tag followed by the absolute file path:
> ```text
> USER  > [image] "C:\Path\To\Your\Image.png" Please analyze the contents of this image.
> ```

<br>

### 2. REST API Daemon

Run the architecture as a headless background server:
```bash
node dp.js --api
```
The daemon will initialize and listen on `http://localhost:3000`.

#### A. Generate Image (`POST /api/generate`)
```json
{
  "prompt": "Cyberpunk city at night, neon lights, highly detailed 4k",
  "isQuality": true,
  "style": "hd",
  "negativePrompt": "blurry, distorted, low resolution"
}
```

#### B. Text Completion (`POST /api/chat`)
```json
{
  "model": "deepseek-v3.2",
  "messages": [
    { "role": "user", "content": "Explain quantum computing in simple terms." }
  ]
}
```

#### C. Vision AI Analysis (`POST /api/chat`)
*Note: Ensure your image is uploaded via the `/chat_attachments/upload` protocol to obtain the UUID prior to executing this request.*
```json
{
  "model": "gemini-2.5-flash-lite",
  "messages": [
    { 
      "role": "user", 
      "content": "Extract the text from this document.",
      "attachment_uuids": ["df99118c-8bdb-4bd9-8bb5-f783e27db59a"]
    }
  ]
}
```

---

<div align="center">
  <br>
  <p><b>Designed & Engineered by lanncodex</b></p>
  <i>Strictly for Educational and Research Purposes. Use Responsibly.</i>
</div>
